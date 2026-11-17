import { church } from '../data/site';
import { href } from '../lib/router';
import { Wordmark } from './Header';
import { Ribbons } from './Ribbons';

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-moss text-paper">
      <Ribbons className="pointer-events-none absolute -top-6 left-0 h-28 w-full opacity-90" sag={0.25} strokeWidth={2.5} />
      <div className="wrap relative pb-10 pt-32">
        <p className="display-lg max-w-[16ch]">Never place a period where God has placed a comma.</p>
        <p className="mt-4 text-sm text-paper/60">— Gracie Allen, adopted by the United Church of Christ</p>

        <div className="mt-20 grid gap-12 border-t border-paper/15 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Wordmark light />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/70">
              A progressive, Open and Affirming congregation of the United Church of Christ in New Braunfels since 1966.
            </p>
          </div>

          <div className="text-sm">
            <p className="eyebrow !text-ribbon-yellow">Sundays</p>
            <ul className="mt-3 space-y-1.5 text-paper/80">
              <li>Worship · 10:00–11:20 a.m.</li>
              <li>Sunday school · 11:20 a.m.</li>
              <li>Book group · 11:30 a.m.</li>
              <li>Communion · first Sundays</li>
            </ul>
            <a href={church.zoomUrl} target="_blank" rel="noopener noreferrer" className="link-underline mt-3 inline-block font-semibold">
              Join on Zoom →
            </a>
          </div>

          <div className="text-sm">
            <p className="eyebrow !text-ribbon-yellow">Contact</p>
            <address className="mt-3 space-y-1.5 not-italic text-paper/80">
              <a href={church.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-underline block">
                970 Loop 337
                <br />
                New Braunfels, TX 78130
              </a>
              <a href={church.phoneHref} className="link-underline block">
                {church.phone}
              </a>
              <a href={`mailto:${church.email}`} className="link-underline block break-all">
                {church.email}
              </a>
            </address>
          </div>

          <div className="text-sm">
            <p className="eyebrow !text-ribbon-yellow">More</p>
            <ul className="mt-3 space-y-1.5 text-paper/80">
              <li><a className="link-underline" href={href('visit')}>Plan a visit</a></li>
              <li><a className="link-underline" href={href('give')}>Give</a></li>
              <li><a className="link-underline" href={church.newsletterUrl} target="_blank" rel="noopener noreferrer">Glimpses of Faith newsletter</a></li>
              <li><a className="link-underline" href={church.photosUrl} target="_blank" rel="noopener noreferrer">Photo album</a></li>
              <li><a className="link-underline" href={church.rentalUrl} target="_blank" rel="noopener noreferrer">Rent our space</a></li>
              <li><a className="link-underline" href={church.directoryUrl} target="_blank" rel="noopener noreferrer">Member directory</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-paper/15 pt-6 text-xs text-paper/50">
          <p>© {new Date().getFullYear()} Faith United Church of Christ · New Braunfels, Texas</p>
          <div className="flex gap-5">
            <a className="link-underline" href={church.facebookUrl} target="_blank" rel="noopener noreferrer">Facebook</a>
            <a className="link-underline" href={church.twitterUrl} target="_blank" rel="noopener noreferrer">X / Twitter</a>
            <a className="link-underline" href="https://www.ucc.org" target="_blank" rel="noopener noreferrer">ucc.org</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
