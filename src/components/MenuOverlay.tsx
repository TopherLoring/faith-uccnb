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
      // inert keeps closed-menu links out of the tab order
      {...(!open ? { inert: '' } : {})}
      className={`menu-overlay fixed inset-0 z-50 overflow-y-auto bg-moss text-paper ${open ? 'is-open' : ''}`}
    >
      <div className="wrap flex h-[4.75rem] items-center justify-between">
        <Wordmark light />
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 rounded-full border border-paper/30 py-2 pl-4 pr-3 text-sm font-semibold transition-colors hover:bg-paper hover:text-moss"
        >
          Close <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="wrap grid gap-12 pb-16 pt-8 lg:grid-cols-[1.25fr_1fr] lg:gap-20 lg:pt-14">
        <nav aria-label="All pages">
          <ul className="border-t border-paper/15">
            {ITEMS.map((item, i) => (
              <li key={item.label} className="menu-item border-b border-paper/15" style={{ ['--i' as string]: i }}>
                <a
                  href={href(item.page, item.section)}
                  onClick={onClose}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group flex items-baseline justify-between gap-6 py-4 sm:py-5"
                >
                  <span className="font-display text-[clamp(1.9rem,4.2vw,3.4rem)] leading-none tracking-tight transition-[color,transform] duration-500 ease-out group-hover:translate-x-2 group-hover:text-ribbon-yellow">
                    {item.label}
                  </span>
                  <span className="hidden text-right text-sm text-paper/60 sm:block">{item.note}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <aside className="flex flex-col gap-10">
          <div className="menu-preview photo relative hidden aspect-[4/3] rounded-sm lg:block">
            {ITEMS.map((item, i) => (
              <img
                key={item.photo}
                src={item.photo}
                alt=""
                loading="lazy"
                className="absolute inset-0"
                style={{ opacity: active === i ? 1 : 0, transform: active === i ? 'scale(1)' : 'scale(1.06)' }}
              />
            ))}
          </div>

          <div className="menu-item grid gap-6 text-sm sm:grid-cols-2" style={{ ['--i' as string]: ITEMS.length }}>
            <div>
              <p className="eyebrow !text-ribbon-yellow">Sunday</p>
              <div className="mt-2">
                <SundayStatus tone="light" />
              </div>
              <a href={church.zoomUrl} target="_blank" rel="noopener noreferrer" className="link-underline mt-2 inline-block text-paper/80">
                Zoom link · ID {church.zoomMeetingId}
              </a>
            </div>
            <div>
              <p className="eyebrow !text-ribbon-yellow">Find us</p>
              <a href={church.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-underline mt-2 inline-block">
                {church.addressLine}
              </a>
              <p className="mt-1 text-paper/80">
                <a href={church.phoneHref} className="link-underline">
                  {church.phone}
                </a>
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
