# Changelog

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
