import { church, partners } from '../data/site';
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
      <section className="relative pt-28 sm:pt-32">
        <div className="wrap grid items-end gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div className="relative z-10 pb-4 lg:pb-16">
            <p className="eyebrow fade-in" style={{ ['--d' as string]: '0.05s' }}>
              New Braunfels, Texas · Since 1966
            </p>
            <h1 className="display-xl mt-5">
              <Lines lines={['Come as', 'you are.', <em key="q" className="font-light italic text-clay">Bring your</em>, <em key="q2" className="font-light italic text-clay">questions.</em>]} />
            </h1>
            <p className="lede fade-in mt-8 max-w-[34ch]" style={{ ['--d' as string]: '0.75s' }}>
              Faith is a progressive, Open and Affirming church on Loop 337. Every person, every family, every honest doubt has a seat here.
            </p>
            <div className="fade-in mt-9 flex flex-wrap items-center gap-3" style={{ ['--d' as string]: '0.95s' }}>
              <a href={href('visit')} className="btn-primary">
                Plan your first Sunday <Arrow />
              </a>
              <a href={church.zoomUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                Watch on Zoom
              </a>
            </div>
            <div className="fade-in mt-8" style={{ ['--d' as string]: '1.1s' }}>
              <SundayStatus />
            </div>
          </div>

          <div className="relative">
            <div className="hero-photo photo aspect-[4/5] rounded-sm sm:aspect-[5/4] lg:aspect-[4/5]">
              <img
                src="/photos/choir.webp"
                alt="Faith's sanctuary on a Sunday, with rainbow ribbons strung across the wooden rafters and the choir singing at the front"
                fetchPriority="high"
              />
            </div>
            <p className="fade-in mt-3 text-sm text-ink-mute" style={{ ['--d' as string]: '1.3s' }}>
              Sunday morning in the sanctuary. The ribbons are ours.
            </p>
          </div>
        </div>
        <Ribbons className="pointer-events-none relative -mt-6 h-24 w-full sm:-mt-10 sm:h-36" sag={0.7} />
      </section>

      {/* ---------------- Values marquee ---------------- */}
      <div className="marquee overflow-hidden border-y border-paper-line py-5" aria-hidden="true">
        <div className="marquee-track flex w-max gap-12 whitespace-nowrap">
          {[...VALUES, ...VALUES].map((v, i) => (
            <span key={i} className="flex items-center gap-12 font-display text-2xl italic text-ink-soft sm:text-3xl">
              {v}
              <span className="text-clay">,</span>
            </span>
          ))}
        </div>
      </div>

      {/* ---------------- Track record ---------------- */}
      <section className="wrap mt-28 sm:mt-36">
        <SectionHead eyebrow="Not a slogan. A record." title={<>We were saying yes before it was easy.</>}>
          <p>
            Lots of churches say “all are welcome.” Here’s what it’s looked like at Faith: blessing same-sex couples in 2002, voting to become Open and
            Affirming in 2009, and cheering when two of our members became the first couple legally married in Comal County in 2015.
          </p>
          <a href={href('about', 'history')} className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-ink">
            <span className="link-underline">Read the whole story</span> <Arrow />
          </a>
        </SectionHead>

        <dl className="mt-16 grid grid-cols-2 border-t border-paper-line lg:grid-cols-4">
          {RECORD.map((r, i) => (
            <div
              key={r.figure}
              className={`reveal border-b border-paper-line py-8 pr-6 lg:border-b-0 ${i % 2 === 1 ? 'pl-6 border-l' : ''} ${i > 0 ? 'lg:border-l lg:pl-8' : ''}`}
              style={{ ['--i' as string]: i }}
            >
              <dt className="font-display text-[clamp(2.4rem,4.5vw,4rem)] leading-none tracking-tight text-clay">{r.figure}</dt>
              <dd className="mt-3 max-w-[20ch] text-sm text-ink-soft">{r.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---------------- Photo spread ---------------- */}
      <section className="wrap mt-28 sm:mt-36">
        <div className="grid gap-5 md:grid-cols-12">
          <Figure
            className="reveal md:col-span-7"
            src="/photos/clergy.webp"
            alt="Clergy in rainbow stoles gathered around the communion table with members of the congregation"
            caption="Clergy and friends around the table."
            ratio="aspect-[5/4]"
          />
          <div className="grid gap-5 md:col-span-5">
            <Figure
              className="reveal"
              src="/photos/childrens-sermon.webp"
              alt="Children gathered at the front of the sanctuary for the children’s message"
              caption="The children’s message."
              ratio="aspect-[4/3]"
            />
            <div className="reveal rounded-sm bg-clay p-8 text-paper" style={{ ['--i' as string]: 1 }}>
              <p className="font-display text-2xl leading-snug sm:text-3xl">“{church.missionCore}”</p>
              <p className="mt-4 text-sm text-paper/80">Our mission statement, minus the name.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Find your way in ---------------- */}
      <section className="wrap mt-28 sm:mt-36">
        <SectionHead eyebrow="Start anywhere" title="However you got here, there’s a way in." />
        <div className="mt-14 grid border-t border-paper-line md:grid-cols-2">
          {[
            { to: href('visit'), k: 'Thinking about visiting?', v: 'What Sunday’s like, what to wear, where the kids go.' },
            { to: href('about'), k: 'Burned by church before?', v: 'What Open and Affirming means here, and what we believe.' },
            { to: href('community'), k: 'Want to do something?', v: 'Food bank shifts, literacy tutoring, housing families.' },
            { to: href('community', 'gatherings'), k: 'Just want to meet people?', v: 'Theology on Tap, game night, book group.' },
          ].map((x, i) => (
            <a
              key={x.k}
              href={x.to}
              className={`reveal group flex items-start justify-between gap-6 border-b border-paper-line py-8 md:py-10 ${i % 2 === 0 ? 'md:pr-10' : 'md:border-l md:pl-10'}`}
              style={{ ['--i' as string]: i }}
            >
              <div>
                <p className="display-md transition-colors duration-300 group-hover:text-clay">{x.k}</p>
                <p className="mt-2 text-ink-soft">{x.v}</p>
              </div>
              <span className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink/20 transition-all duration-300 group-hover:border-clay group-hover:bg-clay group-hover:text-paper">
                <Arrow />
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ---------------- Coming up ---------------- */}
      <section className="mt-28 bg-paper-deep py-24 sm:mt-36">
        <div className="wrap grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="reveal">
            <p className="eyebrow">Coming up</p>
            <h2 className="display-lg mt-4">Sunday is just the start.</h2>
            <p className="lede mt-6 max-w-[36ch]">
              Every week there’s worship, Sunday school, and book group. Every month there’s more.
            </p>
            <a href={href('community', 'gatherings')} className="btn-ghost mt-8">
              Everything we do <Arrow />
            </a>
          </div>
          <ol className="border-t border-ink/15">
            {upcoming.map((u, i) => (
              <li key={u.gathering.id} className="reveal grid grid-cols-[5.5rem_1fr] gap-6 border-b border-ink/15 py-6" style={{ ['--i' as string]: i }}>
                <div>
                  <p className="font-display text-4xl leading-none">{formatDay(u.date, { day: 'numeric' })}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-ink-mute">{formatDay(u.date, { month: 'short', weekday: 'short' })}</p>
                </div>
                <div>
                  <p className="text-lg font-semibold">{u.gathering.title}</p>
                  <p className="mt-1 text-ink-soft">{u.gathering.blurb}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- Out in town ---------------- */}
      <section className="wrap mt-28 sm:mt-36">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Figure
            className="reveal order-2 lg:order-1"
            src="/photos/big-serve-crowd.webp"
            alt="A crowd of volunteers in matching shirts gathered inside a food bank warehouse"
            caption="Volunteers at a Big Serve NB day."
            ratio="aspect-[4/3]"
          />
          <div className="order-1 lg:order-2">
            <p className="eyebrow reveal">Love is a verb</p>
            <h2 className="display-lg reveal mt-4" style={{ ['--i' as string]: 1 }}>
              Faith happens on Loop 337. It doesn’t stay there.
            </h2>
            <ul className="mt-8 flex flex-wrap gap-2">
              {partners.map((p, i) => (
                <li key={p.id} className="reveal rounded-full border border-ink/20 px-4 py-2 text-sm font-medium" style={{ ['--i' as string]: i + 2 }}>
                  {p.name}
                </li>
              ))}
            </ul>
            <a href={href('community')} className="btn-primary reveal mt-9" style={{ ['--i' as string]: 3 }}>
              See what we’re part of <Arrow />
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- Pastor note ---------------- */}
      <section className="wrap mt-28 sm:mt-36">
        <div className="grid items-center gap-10 border-y border-paper-line py-14 md:grid-cols-[minmax(0,280px)_1fr] md:gap-16">
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
