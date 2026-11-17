import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

export type PageId = 'home' | 'visit' | 'about' | 'community' | 'give';

export interface Route {
  page: PageId;
  section?: string;
}

const PAGES: PageId[] = ['home', 'visit', 'about', 'community', 'give'];

export function parseHash(hash: string): Route {
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  const page = (PAGES as string[]).includes(parts[0] ?? '') ? (parts[0] as PageId) : 'home';
  return { page, section: parts[1] };
}

export const href = (page: PageId, section?: string) =>
  page === 'home' && !section ? '#/' : `#/${page}${section ? `/${section}` : ''}`;

type DocWithVT = Document & { startViewTransition?: (cb: () => void) => unknown };

function scrollToRoute(route: Route, smooth: boolean) {
  if (route.section) {
    const el = document.getElementById(route.section);
    if (el) {
      el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
      return;
    }
  }
  window.scrollTo({ top: 0, behavior: 'auto' });
}

/** Hash router. Page changes animate through the View Transitions API where supported. */
export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));
  const current = useRef(route);

  useEffect(() => {
    const onChange = () => {
      const next = parseHash(window.location.hash);
      if (current.current.page === next.page) {
        current.current = next;
        setRoute(next);
        requestAnimationFrame(() => scrollToRoute(next, true));
        return;
      }
      const apply = () => {
        current.current = next;
        flushSync(() => setRoute(next));
        scrollToRoute(next, false);
      };
      const doc = document as DocWithVT;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (doc.startViewTransition && !reduce) doc.startViewTransition(apply);
      else apply();
    };
    window.addEventListener('hashchange', onChange);
    const initial = parseHash(window.location.hash);
    if (initial.section) requestAnimationFrame(() => scrollToRoute(initial, false));
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}
