import { church, faqs } from '../data/site';
import { Accordion, Arrow, Figure, PageIntro, SectionHead, WhereNext, Lines } from '../components/Bits';
import { SundayStatus } from '../components/SundayStatus';

const MORNING = [
  { time: '9:45', title: 'Find a seat', body: 'Arrive a few minutes early, or right on time. Sit wherever you like. Joining from home? Open the Zoom link a little before 10.' },
  { time: '10:00', title: 'Worship begins', body: 'Music, scripture, prayer, a sermon from Pastor Carla, and a children’s message up front for the kids.' },
  { time: '1st Sun', title: 'Communion', body: 'On the first Sunday of the month we share communion. Everyone is invited. You don’t need to be a member, or baptized, or sure.' },
  { time: '11:20', title: 'Sunday school', body: 'Kids and families head to Sunday school until 12:20.' },
  { time: '11:30', title: 'Book group', body: 'Adults gather to talk through a book together. Currently Leslie Weatherhead’s The Will of God.' },
];

export function Visit() {
  return (
    <>
      <PageIntro
        eyebrow="Plan a visit"
        title={<Lines lines={['Your first', <em key="s" className="font-light italic text-clay">Sunday.</em>]} />}
        lede="Walking into a new church can be a lot. Here’s exactly what to expect, so the only surprise is how glad we are you came."
      >
        <div className="intro-meta fade-in" style={{ ['--d' as string]: '0.8s' }}>
          <SundayStatus />
          <a href={church.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold">
            <span className="link-underline">{church.addressLine}</span>
          </a>
        </div>
      </PageIntro>

      <section className="wrap">
        <Figure
          className="reveal"
          src="/photos/sanctuary.webp"
          alt="Faith's sanctuary from the back pews, with wooden rafters and rainbow ribbons overhead"
          ratio="aspect-[16/9] sm:aspect-[21/9]"
          caption="The sanctuary, 970 Loop 337. In use since July 4, 1999."
          priority
        />
      </section>

      <section className="wrap section">
        <SectionHead eyebrow="Sunday morning" title="How the morning goes.">
          <p>Worship runs from 10:00 to 11:20. Nobody will single you out, and nobody will mind if you just watch.</p>
        </SectionHead>
        <ol className="timeline-list">
          {MORNING.map((m, i) => (
            <li key={m.title} className="tl-row reveal" style={{ ['--i' as string]: i }}>
              <p className="tl-time">{m.time}</p>
              <p className="tl-title">{m.title}</p>
              <p className="muted">{m.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="band band-moss">
        <div className="wrap split">
          <div className="reveal">
            <p className="eyebrow eyebrow-light">Not ready to walk in?</p>
            <h2 className="display-lg">Watch from your couch first.</h2>
            <p className="lede lede-light">
              Every Sunday service streams live on Zoom. Camera off, pajamas on, no one will ask you to introduce yourself.
            </p>
            <div className="btn-row">
              <a href={church.zoomUrl} target="_blank" rel="noopener noreferrer" className="btn btn-paper">
                Open the Zoom link <Arrow />
              </a>
              <span className="small light-muted">Meeting ID {church.zoomMeetingId}</span>
            </div>
          </div>
          <Figure
            className="reveal"
            src="/photos/candles.webp"
            alt="A pastor at the altar behind a table of lit candles, with a rainbow banner hanging nearby"
            ratio="aspect-[4/3]"
          />
        </div>
      </section>

      <section className="wrap section">
        <SectionHead eyebrow="Questions people ask" title="The honest answers." />
        <div className="accordion-list">
          {faqs.map((f) => (
            <Accordion key={f.q} q={f.q}>
              {f.a}
            </Accordion>
          ))}
        </div>
      </section>

      <section id="directions" className="wrap section">
        <div className="directions">
          <div className="reveal">
            <p className="eyebrow">Getting here</p>
            <h2 className="display-lg mt-4">970 Loop 337.</h2>
            <address className="directions-addr muted">
              <p>New Braunfels, TX 78130</p>
              <p>
                <a href={church.phoneHref} className="link-underline">{church.phone}</a>
              </p>
              <p>
                <a href={`mailto:${church.email}`} className="link-underline break-all">{church.email}</a>
              </p>
            </address>
            <a href={church.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Get directions <Arrow />
            </a>
            <Figure
              className="directions-photo"
              src="/photos/still-speaking-banner.webp"
              alt="The church building with a rainbow “God is still speaking” banner out front"
              ratio="aspect-[4/3]"
              caption="Look for the rainbow banner."
            />
          </div>
          <div className="map photo reveal" style={{ ['--i' as string]: 1 }}>
            <iframe
              title="Map to Faith United Church of Christ"
              src={church.mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[420px] w-full border-0"
            />
          </div>
        </div>
      </section>

      <WhereNext
        links={[
          { page: 'about', label: 'Who we are', note: 'What Open and Affirming means here', photo: '/photos/clergy.webp' },
          { page: 'community', section: 'gatherings', label: 'Gatherings', note: 'Theology on Tap, game night, socials', photo: '/photos/big-serve-crafts.webp' },
          { page: 'about', section: 'pastor', label: 'Pastor Carla', note: 'Chaplain, teacher, author', photo: '/photos/pastor-carla.webp' },
        ]}
      />
    </>
  );
}
