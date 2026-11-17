# Faith United Church of Christ — New Braunfels, TX

A redesign of [faithuccnb.org](https://www.faithuccnb.org/) for Faith UCC, a progressive, Open and Affirming congregation of the United Church of Christ at 970 Loop 337.

## Stack

Vite + React 18 + TypeScript + Tailwind CSS. No runtime dependencies beyond React and `lucide-react` icons. Static output, deployable to any host.

```bash
bun install      # or npm install
bun run dev      # http://localhost:3000
bun run build    # type-check + production build to dist/
bun run preview  # serve dist/
```

## Structure

| Path | What it is |
|---|---|
| `src/data/site.ts` | **All content.** Contact info, schedule, history, partners, pastor bio, FAQ. Edit here, not in components. |
| `src/lib/schedule.ts` | Computes the next Sunday, communion Sundays, third Sundays, last Saturdays, and the live "worship is on now" status, in Central time. |
| `src/lib/router.ts` | Hash routing (`#/visit`, `#/about/history`, …) with View Transitions between pages. |
| `src/pages/` | Home, Visit, About (ONA, pastor, history), Community (partners, gatherings), Give. |
| `src/components/` | Header, full-screen menu, footer, ribbon motif, shared building blocks. |
| `public/photos/` | Congregation photos from faithuccnb.org, resized to WebP. |

## Content rules

Every fact on the site traces to faithuccnb.org (Home, About, ONA Statement, Church History, Mission & Outreach, About our Pastor) or Pastor Carla's published bios. No invented stats, groups, or quotes. When something changes (book group title, Zoom link, pledge form), update `src/data/site.ts`.

## Motion & accessibility

- Line-by-line headline reveals, scroll-triggered fades, drawn rainbow ribbons (taken from the ribbons strung across the sanctuary rafters), page transitions, a scroll-snap history timeline with filters, an animated full-screen menu with photo previews.
- Everything respects `prefers-reduced-motion`.
- Skip link, focus-visible styles, keyboard-trapped menu with Esc to close, `aria-expanded` on accordions, alt text on every photo.

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
