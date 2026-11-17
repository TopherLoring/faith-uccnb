import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { church, milestones, pastor, uccFirsts, type Milestone } from '../data/site';
import { Arrow, Figure, Lines, PageIntro, SectionHead, WhereNext } from '../components/Bits';

const PILLARS = [
  { n: '01', title: 'Embrace diversity', body: 'Every race, age, ability, background, family structure, orientation and gender identity, welcomed into full membership and participation.' },
  { n: '02', title: 'Explore the mysteries', body: 'Faith isn’t a test you pass. We read, ask, argue, and leave room for what we don’t know about God and life’s complexities.' },
  { n: '03', title: 'Serve, for real', body: 'A spirit of service that shows up as food bank shifts, literacy tutoring, and housing families, not just good intentions.' },
  { n: '04', title: 'Justice for all creation', body: 'Following Jesus means caring about who gets left out, in our town and far beyond it, and about the earth itself.' },
];

type Filter = 'all' | NonNullable<Milestone['tag']>;
const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'Everything' },
  { id: 'welcome', label: 'Welcome' },
  { id: 'service', label: 'Service' },
  { id: 'home', label: 'Our home' },
];

function Timeline() {
  const [filter, setFilter] = useState<Filter>('all');
  const [progress, setProgress] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const items = milestones.filter((m) => filter === 'all' || m.tag === filter);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 1);
    };
    el.scrollTo({ left: 0 });
    onScroll();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [filter]);

  const nudge = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 720), behavior: 'smooth' });
  };

  return (
    <div className="mt-12">
      <div className="wrap flex flex-wrap items-center justify-between gap-4">
        <div role="tablist" aria-label="Filter the timeline" className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                filter === f.id ? 'border-ink bg-ink text-paper' : 'border-ink/20 hover:border-ink'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => nudge(-1)} aria-label="Scroll timeline back" className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 transition-colors hover:bg-ink hover:text-paper">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button onClick={() => nudge(1)} aria-label="Scroll timeline forward" className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 transition-colors hover:bg-ink hover:text-paper">
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={track}
        tabIndex={0}
        aria-label="Faith church history, scroll sideways"
        className="timeline mt-8 flex gap-5 overflow-x-auto pb-4 pr-10"
        style={{ paddingLeft: 'max(clamp(1.25rem, 4vw, 3.5rem), calc((100vw - 1320px) / 2 + 3.5rem))', scrollPaddingLeft: 'max(clamp(1.25rem, 4vw, 3.5rem), calc((100vw - 1320px) / 2 + 3.5rem))' }}
      >
        {items.map((m, i) => (
          <article
            key={`${filter}-${m.year}-${m.title}`}
            className="fade-in flex w-[78vw] max-w-[340px] shrink-0 flex-col border-t-2 border-ink pt-5 sm:w-[340px]"
            style={{ ['--d' as string]: `${i * 0.05}s`, borderTopColor: m.tag === 'welcome' ? '#B4472A' : m.tag === 'service' ? '#22382C' : '#1D1B18' }}
          >
            <p className="font-display text-5xl leading-none tracking-tight">{m.year}</p>
            <h3 className="mt-5 text-lg font-semibold">{m.title}</h3>
            <p className="mt-2 text-ink-soft">{m.body}</p>
          </article>
        ))}
      </div>

      <div className="wrap mt-4">
        <div className="h-px w-full bg-paper-line">
          <div className="h-px bg-clay transition-[width] duration-200" style={{ width: `${Math.max(progress, 0.06) * 100}%` }} />
        </div>
      </div>
    </div>
  );
}

export function About() {
  return (
    <>
      <PageIntro
        eyebrow="Who we are"
        title={<Lines lines={['Progressive.', 'Affirming.', <em key="c" className="font-light italic text-clay">Still asking.</em>]} />}
        lede={
          <>
            Faith is a congregation of the United Church of Christ, the denomination behind “God is still speaking.” Questions are welcome here, doubt is
            part of faith, and nobody has to hide who they are to belong.
          </>
        }
      />

      <section id="ona" className="wrap mt-6">
        <div className="grid gap-10 lg:grid-cols-12">
          <Figure
            className="reveal lg:col-span-5"
            src="/photos/still-speaking-banner.webp"
            alt="A rainbow banner reading “God is still speaking” hung outside the church"
            ratio="aspect-[4/5]"
          />
          <div className="lg:col-span-7 lg:pl-8">
            <p className="eyebrow reveal">Open and Affirming since 2009</p>
            <h2 className="display-lg reveal mt-4" style={{ ['--i' as string]: 1 }}>
              If you’re LGBTQ+, this is your church too.
            </h2>
            <div className="reveal mt-8 space-y-5 text-ink-soft" style={{ ['--i' as string]: 2 }}>
              <p>
                “Open and Affirming” is the UCC’s name for congregations that publicly, officially welcome people of every sexual orientation, gender identity, and gender
                expression. Faith voted to become one in January 2009, after a long season of listening and conversation across the whole church.
              </p>
              <p>
                Our statement goes further than that: people of every race, ethnic background, age, ability, economic situation, marital status, family structure, and faith
                background are welcomed into full membership and participation. We try to reflect the kind of love Jesus showed, which didn’t come with a guest list.
              </p>
              <p>
                It wasn’t new for us in 2009. We’d been blessing same-sex unions since 2002. In 2015, two of our members became the first couple legally married in Comal County.
              </p>
            </div>
            <a href={church.onaStatementUrl} target="_blank" rel="noopener noreferrer" className="reveal mt-8 inline-flex items-center gap-2 font-semibold" style={{ ['--i' as string]: 3 }}>
              <span className="link-underline">Read our full ONA statement</span> <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section className="wrap mt-28 sm:mt-36">
        <SectionHead eyebrow="What we’re about" title="Four things we keep coming back to.">
          <p>Each one comes straight from our mission statement.</p>
        </SectionHead>
        <div className="mt-14 grid border-t border-paper-line sm:grid-cols-2">
          {PILLARS.map((p, i) => (
            <div
              key={p.n}
              className={`reveal border-b border-paper-line py-10 ${i % 2 === 0 ? 'sm:pr-10' : 'sm:border-l sm:pl-10'}`}
              style={{ ['--i' as string]: i }}
            >
              <p className="text-sm font-semibold text-clay">{p.n}</p>
              <h3 className="display-md mt-3">{p.title}</h3>
              <p className="mt-3 max-w-[42ch] text-ink-soft">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-28 bg-paper-deep py-20 sm:mt-36">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="reveal">
            <p className="eyebrow">The wider family</p>
            <h2 className="display-md mt-4 max-w-[22ch]">The United Church of Christ has a habit of going first.</h2>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-sm bg-ink/10 sm:grid-cols-3">
            {uccFirsts.map((f, i) => (
              <li key={f.year} className="reveal bg-paper-deep p-6 sm:p-8" style={{ ['--i' as string]: i }}>
                <p className="font-display text-4xl text-clay">{f.year}</p>
                <p className="mt-3 text-ink-soft">{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="pastor" className="wrap mt-28 sm:mt-36">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="reveal photo aspect-[4/5] rounded-sm">
              <img src={pastor.photo} alt="Rev. Dr. Carla Cheatham" loading="lazy" className="parallax" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <p className="eyebrow reveal">Our pastor · since {pastor.since}</p>
            <h2 className="display-lg reveal mt-4" style={{ ['--i' as string]: 1 }}>
              {pastor.name}
            </h2>
            <div className="mt-8 space-y-5 text-ink-soft">
              {pastor.bio.map((p, i) => (
                <p key={i} className="reveal" style={{ ['--i' as string]: i + 2 }}>
                  {p}
                </p>
              ))}
            </div>
            <a href={`mailto:${church.email}?subject=For%20Pastor%20Carla`} className="btn-ghost reveal mt-9" style={{ ['--i' as string]: 5 }}>
              Reach out to Pastor Carla <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section id="history" className="mt-28 sm:mt-36">
        <div className="wrap">
          <SectionHead eyebrow="Our story" title="Sixty years, one cross, a lot of casseroles.">
            <p>
              Faith started in 1966 with 30 people and no building. Rev. Robert Shock, our first pastor, built the wooden cross that still hangs in the sanctuary. Here’s the
              rest. Filter it, or just scroll sideways.
            </p>
          </SectionHead>
        </div>
        <Timeline />
        <div className="wrap mt-16">
          <Figure
            className="reveal"
            src="/photos/building.webp"
            alt="Faith United Church of Christ’s brick building and steeple on Loop 337"
            ratio="aspect-[16/7] sm:aspect-[16/5]"
            caption="Baese Fellowship Hall and the sanctuary on Loop 337."
          />
        </div>
      </section>

      <WhereNext
        links={[
          { page: 'visit', label: 'Your first Sunday', note: 'Times, kids, communion', photo: '/photos/childrens-sermon.webp' },
          { page: 'community', label: 'In the community', note: 'Where our faith goes on weekdays', photo: '/photos/big-serve-build.webp' },
          { page: 'give', label: 'Give', note: 'Keep the doors open', photo: '/photos/candles.webp' },
        ]}
      />
    </>
  );
}
