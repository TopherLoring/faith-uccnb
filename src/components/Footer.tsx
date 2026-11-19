import { church } from '../data/site';
import { href } from '../lib/router';
import { Wordmark } from './Header';

const UCC_COMMA = new URL('../../wordpress-theme/faith-ucc/assets/img/ucc-comma-rainbow.png', import.meta.url).href;
const UCC_LOGO = new URL('../../wordpress-theme/faith-ucc/assets/img/ucc-logo-rainbow.png', import.meta.url).href;

export function Footer() {
  return (
    <footer className="site-footer">
      <section className="still-speaking" aria-label="God is still speaking">
        <div className="wrap still-inner">
          <a className="still-comma reveal" href="https://www.ucc.org" target="_blank" rel="noopener noreferrer">
            <img src={UCC_COMMA} alt="United Church of Christ comma" loading="lazy" />
          </a>
          <div className="still-text">
            <p className="still-tagline reveal" style={{ ['--i' as string]: 1 }}>
              <span className="still-green">God is still</span> <span className="still-blue">speaking,</span>
            </p>
            <p className="still-cite reveal" style={{ ['--i' as string]: 2 }}>
              “Never place a period where God has placed a comma.” — Gracie Allen, the line behind the UCC’s comma
            </p>
          </div>
        </div>
      </section>

      <div className="wrap footer-inner">
        <div className="footer-grid">
          <div>
            <Wordmark full />
            <p className="footer-about">
              A progressive, Open and Affirming congregation of the United Church of Christ in New Braunfels since 1966.
            </p>
            <a className="footer-news" href={church.newsletterUrl} target="_blank" rel="noopener noreferrer">
              <span><strong>Newsletter</strong><span>Glimpses of Faith, monthly</span></span>
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <div>
            <p className="eyebrow">Sundays</p>
            <ul className="footer-list">
              <li>Worship · 10:00–11:20 a.m.</li>
              <li>Sunday school · 11:20 a.m.</li>
              <li>Book group · 11:30 a.m.</li>
              <li>Communion · first Sundays</li>
            </ul>
            <a className="footer-cta link-underline" href={church.zoomUrl} target="_blank" rel="noopener noreferrer">Join on Zoom →</a>
          </div>

          <div>
            <p className="eyebrow">Contact</p>
            <address className="footer-list">
              <a className="link-underline" href={church.mapsUrl} target="_blank" rel="noopener noreferrer">
                970 Loop 337<br />New Braunfels, TX 78130
              </a>
              <a className="link-underline" href={church.phoneHref}>{church.phone}</a>
              <a className="link-underline break" href={`mailto:${church.email}`}>{church.email}</a>
            </address>
          </div>

          <div>
            <p className="eyebrow">More</p>
            <ul className="footer-list">
              <li><a className="link-underline" href={href('visit')}>Plan a visit</a></li>
              <li><a className="link-underline" href={church.newsletterUrl}>News &amp; Glimpses of Faith</a></li>
              <li><a className="link-underline" href={href('community', 'gatherings')}>Events &amp; gatherings</a></li>
              <li><a className="link-underline" href={href('give')}>Give</a></li>
              <li><a className="link-underline" href={church.photosUrl} target="_blank" rel="noopener noreferrer">Photo album</a></li>
              <li><a className="link-underline" href={church.rentalUrl} target="_blank" rel="noopener noreferrer">Rent our space</a></li>
              <li><a className="link-underline" href={church.directoryUrl} target="_blank" rel="noopener noreferrer">Member directory</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-ucc">
          <a href="https://www.ucc.org" target="_blank" rel="noopener noreferrer" className="ucc-badge">
            <img src={UCC_LOGO} alt="United Church of Christ" loading="lazy" />
          </a>
          <p className="small">Faith is a congregation of the United Church of Christ, and Open and Affirming since 2009.</p>
        </div>

        <div className="footer-base">
          <p>© {new Date().getFullYear()} {church.name} · New Braunfels, Texas</p>
          <div className="footer-social">
            <a className="link-underline" href={church.facebookUrl} target="_blank" rel="noopener noreferrer">Facebook</a>
            <a className="link-underline" href={church.twitterUrl} target="_blank" rel="noopener noreferrer">X / Twitter</a>
            <a className="link-underline" href="https://www.ucc.org" target="_blank" rel="noopener noreferrer">ucc.org</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
