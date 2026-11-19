import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { church } from '../data/site';
import { href, type PageId } from '../lib/router';
import { Wordmark } from './Header';
import { SundayStatus } from './SundayStatus';

interface Item {
  label: string;
  note: string;
  page: PageId;
  section?: string;
  photo: string;
}

const ITEMS: Item[] = [
  { label: 'Your first Sunday', note: 'Times, kids, communion, what to expect', page: 'visit', photo: '/photos/childrens-sermon.webp' },
  { label: 'Who we are', note: 'Progressive, Open and Affirming, UCC', page: 'about', photo: '/photos/clergy.webp' },
  { label: 'Our story', note: 'From 30 people in 1966 to now', page: 'about', section: 'history', photo: '/photos/sanctuary.webp' },
  { label: 'Pastor Carla', note: 'Chaplain, teacher, author', page: 'about', section: 'pastor', photo: '/photos/pastor-carla.webp' },
  { label: 'In the community', note: 'SOS, Family Promise, LEAP, Kiva, MLK', page: 'community', photo: '/photos/big-serve-crowd.webp' },
  { label: 'Gatherings', note: 'Theology on Tap, game night, socials', page: 'community', section: 'gatherings', photo: '/photos/candles.webp' },
  { label: 'Give', note: 'Online giving and pledges', page: 'give', photo: '/photos/still-speaking-banner.webp' },
];

export function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [active, setActive] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => closeRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>('a[href], button');
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(t);
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <div
      id="site-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      aria-hidden={!open}
      {...(!open ? { inert: '' } : {})}
      className={`menu-overlay${open ? ' is-open' : ''}`}
    >
      <div className="wrap menu-top">
        <Wordmark />
        <button ref={closeRef} type="button" onClick={onClose} className="menu-close">
          Close <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="wrap menu-body">
        <nav aria-label="All pages">
          <ul className="menu-list">
            {ITEMS.map((item, i) => (
              <li key={item.label} className="menu-item" style={{ ['--i' as string]: i }}>
                <a
                  href={href(item.page, item.section)}
                  onClick={onClose}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <span className="menu-label">{item.label}</span>
                  <span className="menu-note">{item.note}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <aside className="menu-aside">
          <div className="menu-preview photo">
            {ITEMS.map((item, i) => (
              <img
                key={item.photo}
                src={item.photo}
                alt=""
                loading="lazy"
                className={active === i ? 'is-active' : ''}
              />
            ))}
          </div>

          <div className="menu-info">
            <div>
              <p className="eyebrow">Sunday</p>
              <SundayStatus />
              <div>
                <a href={church.zoomUrl} target="_blank" rel="noopener noreferrer" className="menu-zoom">
                  Zoom link · ID {church.zoomMeetingId}
                </a>
              </div>
            </div>
            <div>
              <p className="eyebrow">Find us</p>
              <a href={church.mapsUrl} target="_blank" rel="noopener noreferrer" className="menu-zoom">
                {church.addressLine}
              </a>
              <p><a href={church.phoneHref}>{church.phone}</a></p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
