=== Faith UCC ===

Custom WordPress theme for Faith United Church of Christ, New Braunfels, TX.
Requires WordPress 6.4+ and PHP 7.4+. No plugins required.

== Installing ==

1. Back up the site (GoDaddy Managed WordPress has one-click backups).
2. Appearance → Themes → Add New → Upload Theme → choose faith-ucc.zip → Install → Activate.
3. That's it. On activation the theme:
   - creates the pages Home, Plan a visit, Who we are, In the community, Give and News
     (existing pages are left alone; existing posts appear on the News page);
   - sets Home as the front page and News as the posts page;
   - fills in the starting content: regular gatherings, church history, partners, visitor FAQs, Sunday details.
   Switching back to the old theme restores the old front-page setting.
4. If the host caches pages (LiteSpeed), purge the cache once after activating.

== Updating the site (for staff) ==

Everything is in the left-hand menu of the dashboard. The Dashboard home has a "Update the website" box with shortcuts.

- Church Info: worship time, Zoom link, announcement bar, address, pastor bio and photo, giving links, home page numbers.
- Events: one-off events (Christmas Eve, a potluck). Past events hide themselves.
- Regular gatherings: the weekly and monthly rhythm. Dates calculate themselves.
- Church history: the timeline on Who we are.
- Community partners: SOS, Family Promise, LEAP, etc. Add a featured image to show a photo.
- Visitor FAQs: the questions on Plan a visit.
- News: posts, same editor as before. Posts from the last 120 days also appear on the home page.
- Pages: each designed page has a "Page headline" box (one line per row; *asterisks* = accent color)
  and its text becomes the intro paragraph.

== Notes ==

- Motion respects the visitor's "reduce motion" setting.
- Dates and the "Worship is live" notice are recalculated in the visitor's browser, so cached pages stay correct.
- Photos are bundled in assets/img.

== Branding ==

- Logo: Faith Church (green "Faith" with the comma, blue cross "t", grey "CHURCH"). The built-in vector version is
  traced from the church's official logo file. Header: Faith / CHURCH. Footer: full lockup with NEW BRAUNFELS, TEXAS.
- Colors (official logo values): green #5AA761 (text: #3E7443), blue #007FAC (text: #00729A), grey #585858,
  white #FFFFFF, light grey #EAEAEA (from the current site; header, menu, footer),
  rainbow from UCC Love Is Louder (#F07474 #F7A660 #FBDE45 #4AB67C #5C74B7 #B585BA), purple #7A3C87.
  The official UCC comma keeps its own colors.

== Changelog ==

= 1.10.0 — 2026-11-17 =
* Home page "Watch" section: live on Zoom every Sunday, plus last Sunday's service. YouTube links play on the page; Facebook links open in a new tab. Set under Church Info → Watch & newsletter.
* "Coming up" is now a swipeable strip of cards with arrow buttons. Events and regular gatherings show their flyer or photo (the "Flyer or photo" box on each); without one they get a dated color card.
* Header: "Plan a visit" and "Give" buttons, plus a search button that opens the menu with the search box ready.
* Search box in the Explore menu and on the search results page.
* Rotating word in the home headline: "Bring your questions. / doubts. / family. / whole self." Edit the words in the home page headline box as {questions.|doubts.|family.|whole self.}.
* Service time and address chip in the home hero.
* Glimpses of Faith newsletter sign-up on the home and News pages, and in the footer. Uses the Constant Contact form when that plugin is active, otherwise links to the sign-up page.
* Footer social icons (Facebook, Instagram, YouTube, TikTok, X); each shows once its link is filled in under Church Info → Other links. Instagram (@faithuccnb) and TikTok (@faith.ucc0) are filled in.
* Wide (landscape) flyers get a double-width card so they stay readable.
* Seeded events with flyers: Ecumenical Thanksgiving Worship (Nov 19, Peace Lutheran) and Soup Swap & Game Night (Dec 12). Added on update when missing; skipped once past.
* Rounder corners on photos, cards and panels.
* SOS Food Bank link corrected to sosnb.org.

= 1.9.0 — 2026-11-17 =
* Header, Explore menu and footer share the light grey of the "God is still speaking," band; footer flows on from the band.
* Explore menu items highlight in the soft Love Is Louder colors (color bar and tint).
* Yellow headings replaced with the logo green; forest green retired.
* Underlines appear instantly on hover (no slide).
* Visit page's Zoom band uses the logo blue.

= 1.8.0 — 2026-11-17 =
* Progress Pride colors on Who we are (Open and Affirming section), as a stripe with a short caption explaining them.

= 1.7.0 — 2026-11-17 =
* Logo re-traced from the church's official logo file; footer uses the full lockup with NEW BRAUNFELS, TEXAS.
* Rainbow switched to the UCC Love Is Louder palette (hero ribbons, nav underlines); purple #7A3C87.

= 1.6.0 — 2026-11-17 =
* Exact logo colors from the church: green #5AA761, blue #007FAC, grey #585858 (previously sampled from screenshots). Text and button shades re-derived from them to stay readable; grays are now neutral instead of blue-tinted.

= 1.5.0 — 2026-11-17 =
* Header back to white with the full-color logo. Each nav item has its own rainbow underline on hover and on the current page: Visit orange, Who we are purple, Community green, News blue, Give red.
* Full-screen menu back to forest green.
* "God is still speaking," band: light grey, official UCC rainbow comma, tagline in the logo's green and blue.

= 1.4.0 — 2026-11-17 =
* Header and full-screen menu on the logo blue (#087EAA), with a one-color white logo. On desktop the menu button reads "Explore".
* "God is still speaking," band: bold six-stripe rainbow and the official UCC rainbow comma (unaltered; registration mark shown in white on black).
* Announcement bar in UCC yellow so it stands apart from the header.
* Removed the custom-logo upload (a full-color logo can't sit on the blue header); the built-in logo is used everywhere.

= 1.3.0 — 2026-11-17 =
* News images show the whole graphic (no cropping of flyers and text).
* Faster motion: headline, fade and scroll animations about twice as quick; anything already on screen appears immediately.

= 1.2.0 — 2026-11-17 =
* Fix: Safari/iOS (WebKit) could crash on the home page; the hero photo animation no longer animates a color filter.
* Fonts (Fraunces, Instrument Sans; SIL Open Font License) are bundled with the theme; no Google Fonts requests.
* Large monitors (1800px+) scale the layout up instead of showing a narrow column.
* Tested in Chrome, Safari (iPhone 13, iPad Mini, Mac) and Firefox at 320–2560px wide.

= 1.1.0 — 2026-11-17 =
* Rebrand to Faith's own identity: church logo in the header, logo green/blue palette, white and light grey backgrounds.
* Official UCC rainbow logo in the footer and the "a just world for all" comma on Who we are, unaltered.
* "God is still speaking," band in the footer.
* Home page values strip now uses the church's "Be the Church" lines.
* Trans, intersex and nonbinary welcome stated on Who we are, with a link to UCC Love Is Louder.
* Site icon from the church's ringed logo.
* Soup Swap & Game Night (Dec 12) added as a starting event.
* Removed the custom comma graphics (UCC guidelines don't allow new comma-based marks).

= 1.0.0 — 2026-11-17 =
* First release.
