import { ArrowUpRight } from 'lucide-react';
import { church } from '../data/site';
import { Figure, Lines, PageIntro, SectionHead, WhereNext } from '../components/Bits';

const WHERE = [
  { title: 'An open door on Sundays', body: 'The sanctuary, the lights, and the Zoom stream for everyone who can’t be in the room.' },
  { title: 'Neighbors in need', body: 'Our work with SOS Food Bank, Family Promise, LEAP, Kiva, and MLK New Braunfels.' },
  { title: 'A pastor who shows up', body: 'Pastoral care for weddings, funerals, hospital rooms, and the hard conversations in between.' },
];

export function Give() {
  return (
    <>
      <PageIntro
        eyebrow="Give"
        title={<Lines lines={['Keep the', <em key="d" className="font-light italic text-clay">doors open.</em>]} />}
        lede="Faith runs on the generosity of the people who love it. In 2010, when the sanctuary note was called with 45 days’ notice, this congregation raised the money and burned the mortgage. That’s who we are."
      >
        <div className="fade-in mt-10 flex flex-wrap gap-3" style={{ ['--d' as string]: '0.85s' }}>
          <a href={church.giveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Give online <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a href={church.pledgeUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            Make a pledge
          </a>
        </div>
        <p className="fade-in mt-4 text-sm text-ink-mute" style={{ ['--d' as string]: '1s' }}>
          Online gifts are handled securely by Realm, our church management platform.
        </p>
      </PageIntro>

      <section className="wrap mt-10">
        <SectionHead eyebrow="Where it goes" title="What your gift does." />
        <div className="mt-14 grid gap-px overflow-hidden rounded-sm bg-paper-line md:grid-cols-3">
          {WHERE.map((w, i) => (
            <div key={w.title} className="reveal bg-paper p-8" style={{ ['--i' as string]: i }}>
              <p className="font-display text-5xl text-clay">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-6 text-xl font-semibold">{w.title}</h3>
              <p className="mt-2 text-ink-soft">{w.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap mt-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Figure className="reveal" src="/photos/clergy.webp" alt="Clergy in rainbow stoles gathered around the communion table" ratio="aspect-[5/4]" />
          <div className="reveal" style={{ ['--i' as string]: 1 }}>
            <p className="eyebrow">Other ways to give</p>
            <ul className="mt-6 divide-y divide-paper-line border-y border-paper-line">
              <li className="py-5">
                <p className="text-lg font-semibold">In person on Sunday</p>
                <p className="mt-1 text-ink-soft">The offering is part of worship every week.</p>
              </li>
              <li className="py-5">
                <p className="text-lg font-semibold">Bring food for SOS</p>
                <p className="mt-1 text-ink-soft">Shelf-stable groceries go straight to neighbors through the Spirit of Sharing food bank.</p>
              </li>
              <li className="py-5">
                <p className="text-lg font-semibold">Give your time</p>
                <p className="mt-1 text-ink-soft">
                  Tutor with LEAP, host with Family Promise, or ask what’s needed:{' '}
                  <a className="link-underline font-semibold text-ink" href={`mailto:${church.email}?subject=Volunteering`}>
                    email the office
                  </a>
                  .
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <WhereNext
        links={[
          { page: 'community', label: 'In the community', note: 'See the work you fund', photo: '/photos/big-serve-crowd.webp' },
          { page: 'about', section: 'history', label: 'Our story', note: 'Including the mortgage burning', photo: '/photos/building.webp' },
          { page: 'visit', label: 'Your first Sunday', note: 'Come see for yourself', photo: '/photos/choir.webp' },
        ]}
      />
    </>
  );
}
