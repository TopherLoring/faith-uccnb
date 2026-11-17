import { useCallback, useEffect, useState } from 'react';
import { useRoute, type PageId } from './lib/router';
import { useReveal } from './lib/useReveal';
import { Header } from './components/Header';
import { MenuOverlay } from './components/MenuOverlay';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Visit } from './pages/Visit';
import { About } from './pages/About';
import { Community } from './pages/Community';
import { Give } from './pages/Give';

const TITLES: Record<PageId, string> = {
  home: 'Faith United Church of Christ · New Braunfels, TX',
  visit: 'Plan a visit · Faith UCC New Braunfels',
  about: 'Who we are · Faith UCC New Braunfels',
  community: 'In the community · Faith UCC New Braunfels',
  give: 'Give · Faith UCC New Braunfels',
};

const PAGES: Record<PageId, () => JSX.Element> = { home: Home, visit: Visit, about: About, community: Community, give: Give };

export function App() {
  const route = useRoute();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  useReveal(route.page);

  useEffect(() => {
    document.title = TITLES[route.page];
  }, [route.page]);

  const Page = PAGES[route.page];

  return (
    <>
      <a href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus(); }} className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper">
        Skip to content
      </a>
      <Header page={route.page} menuOpen={menuOpen} onMenu={() => setMenuOpen(true)} />
      <MenuOverlay open={menuOpen} onClose={closeMenu} />
      <main id="main" tabIndex={-1} className="outline-none" key={route.page}>
        <Page />
      </main>
      <Footer />
    </>
  );
}
