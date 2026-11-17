import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gatherings, partners } from '../data/site';
import { formatDay, nextOccurrence } from '../lib/schedule';
import { Figure, Lines, PageIntro, SectionHead, WhereNext } from '../components/Bits';

function Partners() {
  const [active, setActive] = useState(partners[0].id);
  return (
    <div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
      <ul className="border-t border-paper-line">
        {partners.map((p, i) => {
          const open = active === p.id;
          return (
            <li key={p.id} className="reveal acc border-b border-paper-line" data-open={open} style={{ ['--i' as string]: i }}>
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setActive(p.id)}
                onMouseEnter={() => setActive(p.id)}
                className="grid w-full grid-cols-[1fr_auto] items-baseline gap-4 py-6 text-left"
              >
                <span>
                  <span className={`display-md block transition-colors duration-300 ${open ? 'text-clay' : ''}`}>{p.name}</span>
                  <span className="mt-1 block text-sm text-ink-mute">{p.role}</span>
                </span>
                <span className="text-right text-sm font-semibold text-ink-soft">{p.since}</span>
              </button>
              <div className="acc-body">
                <div>
                  <div className="max-w-[52ch] pb-7 text-ink-soft">
                    <p>{p.body}</p>
                    {p.url && (
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 font-semibold text-ink">
                        <span className="link-underline">{p.url.replace(/^https?:\/\/(www\.)?/, '')}</span>
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="relative hidden lg:block">
        <div className="sticky top-28 grid gap-5">
          <Figure src="/photos/sos-food-bank.webp" alt="The red SOS sign on the Spirit of Sharing food bank building" ratio="aspect-[4/5]" caption="Spirit of Sharing, New Braunfels." />
        </div>
      </div>
    </div>
  );
}

export function Community() {
  return (
    <>
      <PageIntro
        eyebrow="In the community"
        title={<Lines lines={['Love is', <em key="v" className="font-light italic text-clay">a verb.</em>]} />}
        lede="Sunday is where we gather. The rest of the week is where it counts: feeding neighbors, teaching adults to read, housing families, and marching when it matters."
      />

      <section className="wrap">
        <div className="grid gap-5 md:grid-cols-3">
          <Figure className="reveal" src="/photos/big-serve-build.webp" alt="A volunteer cutting plywood on a sawhorse table outdoors" ratio="aspect-[4/3] md:aspect-[4/5]" />
          <Figure className="reveal md:mt-16" src="/photos/big-serve-crafts.webp" alt="Volunteers and kids doing crafts around a table" ratio="aspect-[4/3] md:aspect-[4/5]" />
          <Figure className="reveal" src="/photos/big-serve-crowd.webp" alt="A large group of volunteers in matching shirts inside a food bank" ratio="aspect-[4/3] md:aspect-[4/5]" />
        </div>
        <p className="reveal mt-4 text-sm text-ink-mute">Big Serve NB volunteer days.</p>
      </section>

      <section className="wrap mt-28 sm:mt-36">
        <SectionHead eyebrow="Who we work with" title="Six places you’ll find us.">
          <p>Some of these we joined. A couple we started. Tap one to learn more, or go straight to the partner.</p>
        </SectionHead>
        <Partners />
      </section>

      <section id="gatherings" className="mt-28 bg-paper-deep py-24 sm:mt-36">
        <div className="wrap">
          <SectionHead eyebrow="Gatherings" title="Ways to just show up.">
            <p>No sign-ups, no commitment. Dates below update automatically.</p>
          </SectionHead>
          <div className="mt-14 grid gap-px overflow-hidden rounded-sm bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {gatherings.map((g, i) => {
              const next = nextOccurrence(g.rule);
              return (
                <article key={g.id} className="reveal group flex flex-col bg-paper-deep p-7 transition-colors duration-500 hover:bg-paper" style={{ ['--i' as string]: i % 3 }}>
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-clay">{g.when}</p>
                    <p className="text-xs text-ink-mute">Next: {formatDay(next)}</p>
                  </div>
                  <h3 className="display-md mt-5">{g.title}</h3>
                  {g.time && <p className="mt-1 text-sm font-semibold">{g.time}</p>}
                  <p className="mt-3 text-ink-soft">{g.blurb}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="wrap mt-28 sm:mt-36">
        <div className="grid items-center gap-10 rounded-sm border border-paper-line p-8 sm:p-12 lg:grid-cols-[1fr_auto]">
          <div className="reveal">
            <p className="eyebrow">Stay in the loop</p>
            <h2 className="display-md mt-3 max-w-[28ch]">Glimpses of Faith, our monthly newsletter, has the details on everything above.</h2>
          </div>
          <a href="https://www.faithuccnb.org/newsletters/" target="_blank" rel="noopener noreferrer" className="btn-primary reveal" style={{ ['--i' as string]: 1 }}>
            Read the newsletter <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>

      <WhereNext
        links={[
          { page: 'visit', label: 'Your first Sunday', note: 'What to expect', photo: '/photos/choir.webp' },
          { page: 'about', section: 'history', label: 'Our story', note: 'Sixty years on Loop 337', photo: '/photos/sanctuary.webp' },
          { page: 'give', label: 'Give', note: 'Fund the work', photo: '/photos/still-speaking-banner.webp' },
        ]}
      />
    </>
  );
}
