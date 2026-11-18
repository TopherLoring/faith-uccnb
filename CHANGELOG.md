# Changelog

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
