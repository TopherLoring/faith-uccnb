import { useEffect, useRef, useState } from 'react';
import { href, type PageId } from '../lib/router';
import { SundayStatus } from './SundayStatus';

const LOGO = new URL('../../wordpress-theme/faith-ucc/assets/img/faith-logo.svg', import.meta.url).href;
const FULL_LOGO = new URL('../../wordpress-theme/faith-ucc/assets/img/faith-logo-full.svg', import.meta.url).href;

const NAV: { page: PageId; label: string }[] = [
  { page: 'about', label: 'Who we are' },
  { page: 'community', label: 'Community' },
];

export function Wordmark({ full = false }: { full?: boolean }) {
  return (
    <a href={href('home')} className={`wordmark${full ? ' is-full' : ''}`} aria-label="Faith United Church of Christ, home">
      <img src={full ? FULL_LOGO : LOGO} alt="" />
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
      className={`site-header${hidden && !menuOpen ? ' is-hidden' : ''}${scrolled ? ' is-scrolled' : ''}`}
    >
      <div className="wrap site-header-inner">
        <Wordmark />

        <nav aria-label="Primary" className="nav-primary">
          {NAV.map((item) => (
            <a
              key={item.page}
              href={href(item.page)}
              aria-current={page === item.page ? 'page' : undefined}
              className={`nav-link nav-${item.page}${page === item.page ? ' is-current' : ''}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="site-header-end">
          <span className="header-status">
            <SundayStatus compact />
          </span>
          <a href={href('visit')} aria-current={page === 'visit' ? 'page' : undefined} className={`header-pill pill-visit${page === 'visit' ? ' is-current' : ''}`}>
            <span className="lbl-narrow">Visit</span>
            <span className="lbl-wide">Plan a visit</span>
          </a>
          <a href={href('give')} aria-current={page === 'give' ? 'page' : undefined} className={`header-pill pill-give${page === 'give' ? ' is-current' : ''}`}>
            Give
          </a>
          <button
            type="button"
            onClick={onMenu}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            className="menu-btn"
          >
            <span className="menu-btn-label">
              <span className="lbl-narrow">Menu</span>
              <span className="lbl-wide">Explore</span>
            </span>
            <span className="menu-btn-bars" aria-hidden="true"><span /><span /></span>
          </button>
        </div>
      </div>
    </header>
  );
}
