import { church, partners } from '../data/site';
import { MapPin } from 'lucide-react';
import { href } from '../lib/router';
import { formatDay, upcomingMonthly } from '../lib/schedule';
import { Arrow, Figure, Lines, SectionHead } from '../components/Bits';
import { Ribbons } from '../components/Ribbons';
import { SundayStatus } from '../components/SundayStatus';

const RECORD = [
  { figure: '1966', label: 'Founded by 21 adults and 9 kids' },
  { figure: '2002', label: 'First same-sex union blessed here' },
  { figure: '40+ yrs', label: 'Serving with the SOS Food Bank' },
  { figure: '$63K+', label: 'Lent through Kiva, in 85 countries' },
];

const VALUES = [
  'Doubt is welcome',
  'The table is open',
  'All families welcome',
  'Questions over certainty',
  'Justice for all creation',
  'Come as you are',
  'God is still speaking',
];

export function Home() {
  const upcoming = upcomingMonthly().slice(0, 4);

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy relative z-10 pb-4">
            <p className="eyebrow fade-in" style={{ ['--d' as string]: '0.05s' }}>
              New Braunfels, Texas · Since 1966
            </p>
            <h1 className="display-xl mt-5">
              <Lines lines={['Come as', 'you are.', <em key="q" className="font-light italic text-clay">Bring your</em>, <em key="q2" className="font-light italic text-clay">questions.</em>]} />
            </h1>
            <p className="lede hero-lede fade-in" style={{ ['--d' as string]: '0.75s' }}>
              Faith is a progressive, Open and Affirming church on Loop 337. Every person, every family, every honest doubt has a seat here.
            </p>
            <div className="btn-row fade-in" style={{ ['--d' as string]: '0.95s' }}>
              <a href={href('visit')} className="btn-primary">
                Plan your first Sunday <Arrow />
              </a>
              <a href={church.zoomUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                Watch on Zoom
              </a>
            </div>
            <div className="hero-status fade-in" style={{ ['--d' as string]: '1.1s' }}>
              <SundayStatus />
              <a className="hero-chip" href={church.mapsUrl} target="_blank" rel="noopener noreferrer">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <span>{church.address.street}, {church.address.city}</span>
              </a>
            </div>
          </div>

          <div className="hero-media">
            <div className="hero-photo photo">
              <img
                src="/photos/choir.webp"
                alt="Faith's sanctuary on a Sunday, with rainbow ribbons strung across the wooden rafters and the choir singing at the front"
                fetchPriority="high"
              />
            </div>
            <p className="caption fade-in" style={{ ['--d' as string]: '1.3s' }}>
              Sunday morning in the sanctuary. The ribbons are ours.
            </p>
          </div>
        </div>
        <Ribbons className="hero-ribbons" sag={0.7} />
      </section>

      {/* ---------------- Values marquee ---------------- */}
      <div className="marquee-wrap" aria-hidden="true">
        <p className="marquee-label">Be the<br />Church</p>
        <div className="marquee">
          <div className="marquee-track">
          {[...VALUES, ...VALUES].map((v, i) => (
            <span key={i} className="marquee-item">
              {v}
              <span className="marquee-dot" />
            </span>
          ))}
          </div>
        </div>
      </div>

      {/* ---------------- Track record ---------------- */}
      <section className="wrap section">
        <SectionHead eyebrow="Not a slogan. A record." title={<>We were saying yes before it was easy.</>}>
          <p>
            Lots of churches say “all are welcome.” Here’s what it’s looked like at Faith: blessing same-sex couples in 2002, voting to become Open and
            Affirming in 2009, and cheering when two of our members became the first couple legally married in Comal County in 2015.
          </p>
          <a href={href('about', 'history')} className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-ink">
            <span className="link-underline">Read the whole story</span> <Arrow />
          </a>
        </SectionHead>

        <dl className="stats">
          {RECORD.map((r, i) => (
            <div
              key={r.figure}
              className="stat reveal"
              style={{ ['--i' as string]: i }}
            >
              <dt>{r.figure}</dt>
              <dd>{r.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---------------- Photo spread ---------------- */}
      <section className="wrap section">
        <div className="spread">
          <Figure
            className="reveal spread-main"
            src="/photos/clergy.webp"
            alt="Clergy in rainbow stoles gathered around the communion table with members of the congregation"
            caption="Clergy and friends around the table."
            ratio="aspect-[5/4]"
          />
          <div className="spread-side">
            <Figure
              className="reveal"
              src="/photos/childrens-sermon.webp"
              alt="Children gathered at the front of the sanctuary for the children’s message"
              caption="The children’s message."
              ratio="aspect-[4/3]"
            />
            <blockquote className="mission reveal" style={{ ['--i' as string]: 1 }}>
              <p>“{church.missionCore}”</p>
              <cite>Our mission statement, minus the name.</cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ---------------- Find your way in ---------------- */}
      <section className="wrap section">
        <SectionHead eyebrow="Start anywhere" title="However you got here, there’s a way in." />
        <div className="ways">
          {[
            { to: href('visit'), k: 'Thinking about visiting?', v: 'What Sunday’s like, what to wear, where the kids go.' },
            { to: href('about'), k: 'Burned by church before?', v: 'What Open and Affirming means here, and what we believe.' },
            { to: href('community'), k: 'Want to do something?', v: 'Food bank shifts, literacy tutoring, housing families.' },
            { to: href('community', 'gatherings'), k: 'Just want to meet people?', v: 'Theology on Tap, game night, book group.' },
          ].map((x, i) => (
            <a
              key={x.k}
              href={x.to}
              className="way reveal group"
              style={{ ['--i' as string]: i }}
            >
              <div>
                <p className="display-md way-title">{x.k}</p>
                <p className="muted">{x.v}</p>
              </div>
              <span className="circle-btn circle-btn-lg">
                <Arrow />
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ---------------- Coming up ---------------- */}
      <section className="band band-deep">
        <div className="wrap band-grid">
          <div className="reveal">
            <p className="eyebrow">Coming up</p>
            <h2 className="display-lg">Sunday is just the start.</h2>
            <p className="lede">
              Every week there’s worship, Sunday school, and book group. Every month there’s more.
            </p>
            <a href={href('community', 'gatherings')} className="btn btn-ghost">
              Everything we do <Arrow />
            </a>
          </div>
          <ol className="date-list">
            {upcoming.map((u, i) => (
              <li key={u.gathering.id} className="date-row reveal" style={{ ['--i' as string]: i }}>
                <div>
                  <p className="date-day">{formatDay(u.date, { day: 'numeric' })}</p>
                  <p className="date-mon">{formatDay(u.date, { month: 'short', weekday: 'short' })}</p>
                </div>
                <div>
                  <p className="date-title">{u.gathering.title}</p>
                  <p className="muted">{u.gathering.blurb}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- Out in town ---------------- */}
      <section className="wrap section">
        <div className="split">
          <Figure
            className="reveal split-media"
            src="/photos/big-serve-crowd.webp"
            alt="A crowd of volunteers in matching shirts gathered inside a food bank warehouse"
            caption="Volunteers at a Big Serve NB day."
            ratio="aspect-[4/3]"
          />
          <div>
            <p className="eyebrow reveal">Love is a verb</p>
            <h2 className="display-lg reveal mt-4" style={{ ['--i' as string]: 1 }}>
              Faith happens on Loop 337. It doesn’t stay there.
            </h2>
            <ul className="pills">
              {partners.map((p, i) => (
                <li key={p.id} className="pill reveal" style={{ ['--i' as string]: i + 2 }}>
                  {p.name}
                </li>
              ))}
            </ul>
            <a href={href('community')} className="btn btn-primary reveal" style={{ ['--i' as string]: 3 }}>
              See what we’re part of <Arrow />
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- Pastor note ---------------- */}
      <section className="wrap section">
        <div className="pastor-note">
          <Figure
            className="reveal"
            src="/photos/pastor-carla.webp"
            alt="Pastor Carla Cheatham smiling outdoors"
            ratio="aspect-[4/5]"
          />
          <div className="reveal" style={{ ['--i' as string]: 1 }}>
            <p className="eyebrow">Our pastor</p>
            <p className="display-md mt-4 max-w-[30ch]">
              Rev. Dr. Carla Cheatham spent a decade as a hospice chaplain and grief counselor before becoming Faith’s pastor in 2021.
            </p>
            <a href={href('about', 'pastor')} className="mt-6 inline-flex items-center gap-2 font-semibold">
              <span className="link-underline">Meet Pastor Carla</span> <Arrow />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
