# Changelog

## 3.11.0 — 2026-11-18

Theme `faith-ucc` 1.11.1, plus the brand kit and the hand-off package for the church.

### Added
- `brand-kit/`, the Faith UCC Brand Kit 1.0:
  - `Faith-UCC-Brand-Guidelines.pdf`, 14 pages: voice, logo, logo versions and misuse, UCC mark rules, color, Love Is Louder and Progress Pride palettes, pride logos and the Faith comma, typography, photography, templates, and sizes.
  - `Faith-UCC-Website-Setup-and-Maintenance-Guide.pdf`, 6 pages: one-time install on GoDaddy WordPress, everyday updates, a checklist, troubleshooting and quick reference. The live editable version is a Claude Doc.
  - `Logos/Faith`: the primary logo and the New Braunfels lockup, each in color, white, one-color grey and black (SVG and PNG), plus the rainbow-ring social avatar.
  - `Logos/Pride`: two pride logos ("Faith" filled with the Love Is Louder palette, and with the Progress Pride palette) and seven marks built from the comma inside our own logo's "a". The standalone marks are stripes, Progress Pride, echo and outline; the circle marks are a Love Is Louder ring, a Progress Pride disc, and logo blue with stripes. The UCC comma is deliberately not recolored, per UCC rules.
  - `Logos/UCC`: the official UCC comma (rainbow and black), the UCC rainbow logo and "a just world for all", unaltered.
  - `Fonts`: static TTFs of Fraunces and Instrument Sans, latin subset, with their OFL licenses.
  - `Templates`: Sunday bulletin, event flyer and offering envelope (.docx); Sunday projector slides and social media posts (.pptx).
  - `Colors.txt` and `README.txt`.
- `send-to-church/` (gitignored): the brand kit, website preview and theme zips, ready to email.

### Fixed
- Church history entries now have an Order box. Before this, a new entry landed at the top of the timeline whatever its year.

## 3.10.0 — 2026-11-18

Theme `faith-ucc` 1.11.0.

### Added
- "Rent our space" page (`/rent/`), built from the church's two rental flyers:
  - Sanctuary card: $500/day, or $600/day with the Fellowship Hall.
  - Fellowship Hall card: $300/day or $75/hour, kitchen and bathrooms included.
  - $100 refundable deposit.
  - "The grounds" gallery: exterior, hall entrance, and the yard and playground.
  - "Check a date" call-to-action with call and email buttons.
- Church Info → Renting the building: every price, the deposit, the rental phone and email (default officemanager@faithuccnb.org), and an optional note. A price left blank is hidden.
- The page is created automatically on theme switch or update when it is missing.

### Changed
- "Rent our space" added to the Explore menu. The footer link now points to the new page instead of the old `/estimates/` page; the `rental_url` setting is retired.
- Visit page "Getting here" mentions renting the space.
- Test matrix and preview mirror now include `/rent/` and a search results page.

## 3.9.0 — 2026-11-17

Theme `faith-ucc` 1.10.0. Improvements adopted from a review of reallife.org and sacornerstone.org.

### Added
- Home "Watch" section: Sunday live on Zoom plus last Sunday's service. YouTube links play in place (click-to-load, privacy-enhanced embed); Facebook links open in a new tab. Church Info → Watch & newsletter.
- "Coming up" as a swipeable card strip with arrow buttons. Cards show each event's or gathering's flyer/photo, or a dated Love Is Louder color tile tagged "Every month" / "Special event". Regular gatherings gain a "Flyer or photo" box; Theology on Tap ships with its artwork.
- Header "Plan a visit" (orange outline) and "Give" (green) pills; search button opens the Explore menu with the search box focused.
- Search box in the Explore menu and on the results page.
- Rotating headline word: "Bring your questions. / doubts. / family. / whole self." Editable via `{a|b|c}` in the headline box; static for reduced motion; screen readers hear the first word.
- Hero chip with the street address linking to Maps.
- Glimpses of Faith newsletter sign-up on Home and News, plus a footer link. Renders the Constant Contact form (#711) when that plugin is active, otherwise links to the sign-up page.
- Footer social icons for Facebook, Instagram, YouTube, TikTok and X, each shown once its Church Info link is filled in. YouTube defaults to the church's channel. Instagram (@faithuccnb) and TikTok (@faith.ucc0) are filled in by default.
- Wide (landscape) flyers get a double-width card so they stay readable; every card in the strip shares one height.
- Seeded events with flyers: Ecumenical Thanksgiving Worship (Nov 19, Peace Lutheran) and Soup Swap & Game Night (Dec 12). They are added on update when missing and skipped once past.

### Fixed
- 320px phones: the header and event cards no longer push the page 10px wider.

### Changed
- Rounded corners: radius tokens (8 / 14 / 22px) on photos, cards, panels, map and menu rows.
- Header nav is now Who we are / Community / News; Visit and Give moved to the pills. The compact Sunday status shows at 768–1023px and from 1360px up.
- SOS Food Bank link corrected to https://sosnb.org (seed plus a one-time upgrade of existing installs).

## 3.8.0 — 2026-11-17

Theme `faith-ucc` 1.9.0.

### Changed
- Header bar, Explore menu and footer share the light grey `#EAEAEA` of the "God is still speaking," band; the footer continues the band, separated by a rule.
- Explore menu items highlight in the soft Love Is Louder colors (left color bar plus a light tint), cycling coral, orange, yellow, green, blue, lavender.
- Yellow headings replaced with the logo green. Forest green retired from the palette.
- Underlines appear instantly on hover (no slide-in).
- Visit page's "Watch from your couch first" band uses the logo blue.

## 3.7.0 — 2026-11-17

Theme `faith-ucc` 1.8.0.

### Added
- Progress Pride colors on Who we are, in the Open and Affirming section: an 11-color stripe (white, pink, light blue, brown, black, then the rainbow), sampled from the UCC Love Is Louder heart, with a caption explaining the added colors. The softer Love Is Louder arcs stay the site's main rainbow.

## 3.6.0 — 2026-11-17

Theme `faith-ucc` 1.7.0.

### Changed
- Logo re-traced from the church's official logo file (sharper source). Header uses Faith / CHURCH; footer uses the full lockup with NEW BRAUNFELS, TEXAS.
- Rainbow palette set to UCC Love Is Louder, as directed: coral `#F07474`, orange `#F7A660`, yellow `#FBDE45`, green `#4AB67C`, blue `#5C74B7`, lavender `#B585BA`; headline purple `#7A3C87`. Used for the hero ribbons and nav underlines. The official UCC comma keeps its own colors.

## 3.5.0 — 2026-11-17

Theme `faith-ucc` 1.6.0.

### Changed
- Exact logo colors supplied by Chris: green `#5AA761`, blue `#007FAC`, grey `#585858`, white `#FFFFFF` / `#FEFEFE`. Replaces values sampled from screenshots (`#5EA563`, `#087EAA`, `#4D585C`).
- Readable text shades re-derived from the official colors: green `#3E7443` (5.5:1 on white), blue `#00729A` (5.4:1). Grays are now neutral (`#2E2E2E`, `#585858`, `#666666`) instead of blue-tinted.
- Logo vector and post editor styles updated to match.

## 3.4.0 — 2026-11-17

Theme `faith-ucc` 1.5.0. Replaces the 1.4.0 blue header and black/rainbow band, which were rejected.

### Changed
- Header: white bar, full-color Faith Church logo. Each nav item has its own rainbow underline on hover and when current: Visit orange, Who we are purple, Community green, News blue, Give red.
- Full-screen menu back to forest green.
- "God is still speaking," band: light grey, official UCC rainbow comma, tagline in the logo's green ("God is still") and blue ("speaking,").

### Removed
- Unused UCC asset files from the 1.4.0 experiments (dark comma variant, black comma, rainbow emblem).

## 3.3.0 — 2026-11-17

Theme `faith-ucc` 1.4.0.

### Changed
- Header and full-screen menu on the logo blue `#087EAA` with a one-color white logo; desktop menu button reads "Explore" (the bar holds the 5 main pages, Explore holds every destination plus Sunday details).
- "God is still speaking," band rebuilt for impact: full-width six-stripe rainbow that wipes in, and the official UCC rainbow comma at large size beside the tagline.
- Announcement bar moved to UCC yellow.

### Removed
- Custom-logo upload; the built-in logo is used everywhere.

## 3.2.0 — 2026-11-17

Theme `faith-ucc` 1.3.0.

### Fixed
- News cards cropped flyer graphics (text cut off). Images now show whole on a light grey field.
- Motion felt slow and some on-screen items waited for a scroll to appear. Animations roughly twice as fast; anything on screen at load appears immediately. Verified: nothing in view is still hidden 1.3s after load (Chrome desktop/phone, Safari).
- Preview: file names are now Windows-safe and fonts are inlined, so `preview/index.html` opens correctly from disk.

## 3.1.0 — 2026-11-17

Cross-device pass on theme `faith-ucc` 1.2.0. Tested Chrome at 320, 375, 768, 1024, 1280, 1920 and 2560px; Safari engine on iPhone 13, iPad Mini and Mac 1440; Firefox at 390 and 1366. All 9 page types per device: no sideways overflow, no header collisions, no script errors, menu opens and closes.

### Fixed
- Safari/iOS (WebKit) crashed intermittently on the home page (3 of 4 loads in testing). Cause: the hero photo animated a CSS `filter`. Now animates transform and opacity only; 0 crashes in 6 loads.

### Changed
- Fonts bundled with the theme (Fraunces, Instrument Sans; SIL OFL, license files included). No Google Fonts requests.
- Screens 1800px+ scale the layout up (larger type and wider content) instead of a narrow centered column.

## 3.0.0 — 2026-11-17

WordPress theme. The redesign now ships as a theme for the church's existing WordPress site (`wordpress-theme/faith-ucc`, installable as `wordpress-theme/faith-ucc.zip`), so staff edit everything from the dashboard. The React build in `src/` is kept as the design prototype.

### Added
- Theme `faith-ucc` 1.1.0: Home, Plan a visit, Who we are, In the community, Give, News, Events, 404.
- "Church Info" admin page: worship times, Zoom link, announcement bar, contact, pastor bio/photo, giving links, home page numbers.
- Content types with plain forms: Events (auto-hide when past), Regular gatherings (dates calculate themselves), Church history, Community partners, Visitor FAQs. Posts relabeled "News".
- Dashboard "Update the website" shortcuts.
- First-run setup creates the pages and verified starting content; switching themes restores the old front page.
- `preview/`: static snapshot for viewing locally (open `preview/index.html`). Gitignored.

### Changed (brand)
- Church's own logo (Faith Church) in the header, traced to vector from the church's TikTok avatar; site icon from the ringed logo.
- Palette from the church's materials: logo green `#5EA563` (text `#36703D`), logo blue `#087EAA` (text `#066A8F`), charcoal `#4D585C`, white with the current site's grey `#EAEAEA`, forest `#3C4E40`, UCC rainbow.
- Official UCC rainbow logo and "a just world for all" comma from ucc.org, unaltered; "God is still speaking," footer band.
- "Be the Church" lines replace invented values copy; explicit trans, intersex and nonbinary welcome with a link to UCC Love Is Louder.

### Removed
- Custom comma graphics (UCC guidelines prohibit new comma-based marks) and the rust accent color.

## 2.0.0 — 2026-11-17

Full redesign. Replaced the 1.x single-page build.

### Added
- Multi-page structure with hash routing and View Transitions: Home, Visit, Who we are, Community, Give.
- Full-screen menu with photo previews and deep links (`#/about/history`, `#/about/pastor`, `#/community/gatherings`).
- "Where to next" cross-links at the end of every page.
- Live Sunday status (next service date, communion flag, "worship is live, join on Zoom" during the service), computed in Central time.
- Auto-computed dates for first-Sunday communion and youth social, third-Sunday Theology on Tap, and last-Saturday game night.
- Filterable, scroll-snap history timeline (1966 to today).
- Real congregation photos from faithuccnb.org.
- Rainbow ribbon motif drawn from the sanctuary's actual rafter ribbons.
- Google Map embed, schema.org `Church` data, Open Graph tags.

### Fixed (factual errors in 1.x)
- Founding date: 1966, not 1975 (1975 was the first service on Loop 337).
- Open and Affirming vote: 2009, not 2004.
- Removed the "Love Choir," which isn't a real group.
- Removed six fabricated sermons whose videos all pointed to a placeholder YouTube ID.
- Removed a mistyped YouTube channel link and invented impact stats.
- Worship end time corrected to 11:20 a.m.

### Removed
- Command palette, floating action dock, countdown timer, giving "impact calculator," journey picker, dark-mode toggle, unused data files.
