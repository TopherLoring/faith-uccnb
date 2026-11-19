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
    <div className="tl">
    <div className="wrap tl-controls">
      <div role="group" aria-label="Filter the timeline" className="chips">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`chip${filter === f.id ? ' is-on' : ''}`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="tl-arrows">
          <button onClick={() => nudge(-1)} aria-label="Scroll timeline back" className="circle-btn circle-btn-lg">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button onClick={() => nudge(1)} aria-label="Scroll timeline forward" className="circle-btn circle-btn-lg">
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={track}
        tabIndex={0}
        aria-label="Faith church history, scroll sideways"
        className="tl-track"
        style={{ paddingLeft: 'max(clamp(1.25rem, 4vw, 3.5rem), calc((100vw - 1320px) / 2 + 3.5rem))', scrollPaddingLeft: 'max(clamp(1.25rem, 4vw, 3.5rem), calc((100vw - 1320px) / 2 + 3.5rem))' }}
      >
        {items.map((m, i) => (
          <article
            key={`${filter}-${m.year}-${m.title}`}
            className={`tl-card tag-${m.tag ?? 'home'}`}
            style={{ ['--n' as string]: i }}
          >
            <p className="tl-year">{m.year}</p>
            <h3 className="tl-card-title">{m.title}</h3>
            <p className="muted">{m.body}</p>
          </article>
        ))}
      </div>

      <div className="wrap">
        <div className="tl-progress">
          <span style={{ width: `${Math.max(progress, 0.06) * 100}%` }} />
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

      <section id="ona" className="wrap">
        <div className="ona">
          <Figure
            className="reveal ona-media"
            src="/photos/still-speaking-banner.webp"
            alt="A rainbow banner reading “God is still speaking” hung outside the church"
            ratio="aspect-[4/5]"
          />
          <div className="ona-text">
            <p className="eyebrow reveal">Open and Affirming since 2009</p>
            <h2 className="display-lg reveal mt-4" style={{ ['--i' as string]: 1 }}>
              If you’re LGBTQ+, this is your church too.
            </h2>
            <div className="prose muted reveal" style={{ ['--i' as string]: 2 }}>
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

      <section className="wrap section">
        <SectionHead eyebrow="What we’re about" title="Four things we keep coming back to.">
          <p>Each one comes straight from our mission statement.</p>
        </SectionHead>
        <div className="pillars">
          {PILLARS.map((p, i) => (
            <div
              key={p.n}
              className="pillar reveal"
              style={{ ['--i' as string]: i }}
            >
              <p className="pillar-n">{p.n}</p>
              <h3 className="display-md">{p.title}</h3>
              <p className="muted">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="band band-deep">
        <div className="wrap firsts">
          <div className="reveal">
            <p className="eyebrow">The wider family</p>
            <h2 className="display-md mt-4 max-w-[22ch]">The United Church of Christ has a habit of going first.</h2>
          </div>
          <ul className="firsts-list">
            {uccFirsts.map((f, i) => (
              <li key={f.year} className="reveal" style={{ ['--i' as string]: i }}>
                <p className="firsts-year">{f.year}</p>
                <p className="muted">{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="pastor" className="wrap section">
        <div className="pastor">
          <div className="pastor-photo">
            <div className="reveal photo aspect-[4/5] rounded-sm">
              <img src={pastor.photo} alt="Rev. Dr. Carla Cheatham" loading="lazy" className="parallax" />
            </div>
          </div>
          <div>
            <p className="eyebrow reveal">Our pastor · since {pastor.since}</p>
            <h2 className="display-lg reveal mt-4" style={{ ['--i' as string]: 1 }}>
              {pastor.name}
            </h2>
            <div className="prose muted">
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

      <section id="history" className="section">
        <div className="wrap">
          <SectionHead eyebrow="Our story" title="Sixty years, one cross, a lot of casseroles.">
            <p>
              Faith started in 1966 with 30 people and no building. Rev. Robert Shock, our first pastor, built the wooden cross that still hangs in the sanctuary. Here’s the
              rest. Filter it, or just scroll sideways.
            </p>
          </SectionHead>
        </div>
        <Timeline />
        <div className="wrap tl-photo">
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
