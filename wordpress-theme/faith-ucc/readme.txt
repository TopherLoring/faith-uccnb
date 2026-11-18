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
  traced from the church's own logo; upload the original file under Appearance → Customize → Site Identity → Logo
  to use it in the header instead.
- Colors: logo green #5EA563 (text: #36703D), logo blue #087EAA (text: #066A8F), charcoal #4D585C,
  white #FFFFFF, light grey #EAEAEA (from the current site), forest #3C4E40, UCC rainbow (#E22726 #F26B2A #FFDE16 #0B9444 #0F75BC #863695).
- UCC marks (rainbow "United Church of Christ" logo and "a just world for all" comma) are the official files from
  ucc.org and are shown unaltered, per UCC brand guidelines.

== Changelog ==

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
