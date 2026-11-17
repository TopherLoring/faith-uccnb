import { useId, useState, type ReactNode } from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import { href, type PageId } from '../lib/router';

export function Arrow() {
  return <ArrowRight className="btn-arrow h-4 w-4" aria-hidden="true" />;
}

/** Large opening block for the inner pages. */
export function PageIntro({ eyebrow, title, lede, children }: { eyebrow: string; title: ReactNode; lede: ReactNode; children?: ReactNode }) {
  return (
    <section className="wrap pb-14 pt-36 sm:pt-44">
      <p className="eyebrow fade-in" style={{ ['--d' as string]: '0.1s' }}>
        {eyebrow}
      </p>
      <h1 className="display-xl mt-5 max-w-[14ch]">{title}</h1>
      <div className="lede fade-in mt-7 max-w-[46ch]" style={{ ['--d' as string]: '0.55s' }}>
        {lede}
      </div>
      {children}
    </section>
  );
}

/** Splits a headline into lines that rise in one after another. */
export function Lines({ lines }: { lines: ReactNode[] }) {
  return (
    <>
      {lines.map((l, i) => (
        <span key={i} className="line-mask">
          <span style={{ ['--i' as string]: i }}>{l}</span>
        </span>
      ))}
    </>
  );
}

export function SectionHead({ eyebrow, title, children, id }: { eyebrow: string; title: ReactNode; children?: ReactNode; id?: string }) {
  return (
    <div id={id} className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
      <div className="reveal">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="display-lg mt-4">{title}</h2>
      </div>
      {children && <div className="reveal lede self-end" style={{ ['--i' as string]: 1 }}>{children}</div>}
    </div>
  );
}

export function Accordion({ q, children }: { q: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="acc border-b border-paper-line" data-open={open}>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-6 py-6 text-left"
        >
          <span className="display-md !text-[clamp(1.2rem,1.8vw,1.6rem)]">{q}</span>
          <span className="acc-icon grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/20">
            <Plus className="h-4 w-4" aria-hidden="true" />
          </span>
        </button>
      </h3>
      <div id={id} className="acc-body" role="region">
        <div>
          <div className="max-w-[60ch] pb-7 text-ink-soft">{children}</div>
        </div>
      </div>
    </div>
  );
}

interface NextLink {
  page: PageId;
  section?: string;
  label: string;
  note: string;
  photo: string;
}

/** End-of-page cross links, so every page leads somewhere other than "back". */
export function WhereNext({ links }: { links: NextLink[] }) {
  return (
    <section className="wrap mt-32">
      <p className="eyebrow reveal">Where to next</p>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {links.map((l, i) => (
          <a key={l.label} href={href(l.page, l.section)} className="reveal group block" style={{ ['--i' as string]: i }}>
            <div className="photo aspect-[4/3] rounded-sm">
              <img src={l.photo} alt="" loading="lazy" />
            </div>
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <p className="display-md !text-2xl transition-colors group-hover:text-clay">{l.label}</p>
                <p className="mt-1 text-sm text-ink-mute">{l.note}</p>
              </div>
              <span className="mt-1.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/20 transition-all duration-300 group-hover:border-clay group-hover:bg-clay group-hover:text-paper">
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-45" aria-hidden="true" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export function Figure({ src, alt, caption, className = '', ratio = 'aspect-[4/3]', priority = false }: { src: string; alt: string; caption?: string; className?: string; ratio?: string; priority?: boolean }) {
  return (
    <figure className={className}>
      <div className={`photo rounded-sm ${ratio}`}>
        <img src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} decoding="async" />
      </div>
      {caption && <figcaption className="mt-3 text-sm text-ink-mute">{caption}</figcaption>}
    </figure>
  );
}
