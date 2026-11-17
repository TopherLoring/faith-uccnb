import { useEffect, useRef, useState } from 'react';
import { href, type PageId } from '../lib/router';
import { CommaMark } from './Ribbons';
import { SundayStatus } from './SundayStatus';

const NAV: { page: PageId; label: string }[] = [
  { page: 'visit', label: 'Visit' },
  { page: 'about', label: 'Who we are' },
  { page: 'community', label: 'Community' },
  { page: 'give', label: 'Give' },
];

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <a href={href('home')} className="group flex items-center gap-2.5" aria-label="Faith United Church of Christ, home">
      <CommaMark className={`h-7 w-5 transition-transform duration-500 ease-out group-hover:-rotate-12 ${light ? 'text-paper' : 'text-clay'}`} />
      <span className="leading-none">
        <span className={`block font-display text-[1.45rem] tracking-tight ${light ? 'text-paper' : 'text-ink'}`}>Faith</span>
        <span className={`block text-[0.62rem] font-semibold uppercase tracking-[0.18em] ${light ? 'text-paper/70' : 'text-ink-mute'}`}>
          United Church of Christ
        </span>
      </span>
    </a>
  );
}

export function Header({ page, menuOpen, onMenu }: { page: PageId; menuOpen: boolean; onMenu: () => void }) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setHidden(y > 240 && y > lastY.current + 4);
      if (y < lastY.current - 4 || y < 240) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-40 ${hidden && !menuOpen ? 'is-hidden' : ''} ${
        scrolled ? 'bg-paper/90 shadow-[0_1px_0_#DDD1BF] backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="wrap flex h-[4.75rem] items-center justify-between gap-6">
        <Wordmark />

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.page}
              href={href(n.page)}
              aria-current={page === n.page ? 'page' : undefined}
              className={`link-underline py-1 text-[0.95rem] font-medium transition-colors ${
                page === n.page ? 'text-clay' : 'text-ink-soft hover:text-ink'
              }`}
              style={page === n.page ? { backgroundSize: '100% 1px' } : undefined}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <span className="hidden md:inline-flex xl:inline-flex">
            <SundayStatus compact />
          </span>
          <button
            type="button"
            onClick={onMenu}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            className="group inline-flex items-center gap-3 rounded-full border border-ink/20 py-2 pl-4 pr-3 text-sm font-semibold transition-colors hover:border-ink hover:bg-ink hover:text-paper"
          >
            Menu
            <span className="relative block h-3 w-4" aria-hidden="true">
              <span className="absolute left-0 top-0.5 h-[1.5px] w-full bg-current transition-transform duration-300 group-hover:translate-y-[1px]" />
              <span className="absolute bottom-0.5 left-0 h-[1.5px] w-full bg-current transition-transform duration-300 group-hover:-translate-y-[1px]" />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
