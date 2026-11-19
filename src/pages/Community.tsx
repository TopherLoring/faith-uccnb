import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gatherings, partners } from '../data/site';
import { formatDay, nextOccurrence } from '../lib/schedule';
import { Figure, Lines, PageIntro, SectionHead, WhereNext } from '../components/Bits';

function Partners() {
  const [active, setActive] = useState(partners[0].id);
  return (
    <div className="partners">
      <ul className="partner-list">
        {partners.map((p, i) => {
          const open = active === p.id;
          return (
            <li key={p.id} className="reveal acc partner" data-open={open} style={{ ['--i' as string]: i }}>
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setActive(p.id)}
                onMouseEnter={() => setActive(p.id)}
                className="acc-btn partner-btn"
              >
                <span>
                  <span className="display-md partner-name">{p.name}</span>
                  <span className="small muted partner-role">{p.role}</span>
                </span>
                <span className="small strong muted">{p.since}</span>
              </button>
              <div className="acc-body">
                <div>
                  <div className="acc-inner muted">
                    <p>{p.body}</p>
                    {p.url && (
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-link">
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

      <div className="partner-aside">
        <div className="partner-sticky">
          <Figure className="partner-figure" src="/photos/sos-food-bank.webp" alt="The red SOS sign on the Spirit of Sharing food bank building" ratio="aspect-[4/5]" caption="Spirit of Sharing, New Braunfels." />
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
        <div className="trio">
          <Figure className="reveal" src="/photos/big-serve-build.webp" alt="A volunteer cutting plywood on a sawhorse table outdoors" ratio="aspect-[4/3] md:aspect-[4/5]" />
          <Figure className="reveal trio-offset" src="/photos/big-serve-crafts.webp" alt="Volunteers and kids doing crafts around a table" ratio="aspect-[4/3] md:aspect-[4/5]" />
          <Figure className="reveal" src="/photos/big-serve-crowd.webp" alt="A large group of volunteers in matching shirts inside a food bank" ratio="aspect-[4/3] md:aspect-[4/5]" />
        </div>
        <p className="reveal mt-4 text-sm text-ink-mute">Big Serve NB volunteer days.</p>
      </section>

      <section className="wrap section">
        <SectionHead eyebrow="Who we work with" title="Six places you’ll find us.">
          <p>Some of these we joined. A couple we started. Tap one to learn more, or go straight to the partner.</p>
        </SectionHead>
        <Partners />
      </section>

      <section id="gatherings" className="band band-deep">
        <div className="wrap">
          <SectionHead eyebrow="Gatherings" title="Ways to just show up.">
            <p>No sign-ups, no commitment. Dates below update automatically.</p>
          </SectionHead>
          <div className="gathering-grid">
            {gatherings.map((g, i) => {
              const next = nextOccurrence(g.rule);
              return (
                <article key={g.id} className="gathering reveal" style={{ ['--i' as string]: i % 3 }}>
                  <div className="gathering-top">
                    <p className="gathering-when">{g.when}</p>
                    <p className="small muted">Next: {formatDay(next)}</p>
                  </div>
                  <h3 className="display-md">{g.title}</h3>
                  {g.time && <p className="small strong">{g.time}</p>}
                  <p className="muted">{g.blurb}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="wrap section">
        <div className="callout">
          <div className="reveal">
            <p className="eyebrow">Stay in the loop</p>
            <h2 className="display-md mt-3 max-w-[28ch]">Glimpses of Faith, our monthly newsletter, has the details on everything above.</h2>
          </div>
          <a href="https://www.faithuccnb.org/newsletters/" target="_blank" rel="noopener noreferrer" className="btn btn-primary reveal" style={{ ['--i' as string]: 1 }}>
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
