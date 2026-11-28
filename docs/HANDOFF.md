# Portfolio handoff

Updated November 26, 2026, after the final visual acceptance audit. The site is feature-complete for launch content and passes every configured check locally and in GitHub Actions. It is **not deployed**: see Production readiness. Source: https://github.com/RohinCodes15/rohins-website (public, branch `main`).

## Implementation

- `app/page.tsx`, `app/work/[slug]/page.tsx`, `components/site/section-navigation.tsx`, and `components/sections/stack-explorer.tsx` render the Datum homepage, section rail, keyboard accessible category filters, and the portfolio project detail. The rail wraps on mobile, tracks the current section, and retains the existing three-state theme toggle. Motion is tied to interaction and respects reduced motion.
- `content/site.ts`, `content/stack.ts`, `content/projects.ts`, and the existing research and leadership registries own homepage copy and inventory. Five projects are featured: AccessForge AI, RiskLens Quant, Ledger, Rotation Index, and this portfolio. Empty leadership and research inventories do not create placeholder achievements or write-ups. Contact is email, GitHub, and LinkedIn, linked from both the hero and the Contact section.
- `lib/github/activity.ts` and the existing GraphQL adapter use a fixed account, server-only credentials, strict validation, a three-second timeout, hourly freshness, and a 24-hour cap on last-good data. Vercel Runtime Cache stores validated results and cooldowns. Concurrent refreshes share one fetch per runtime instance. Rate limits and permission failures can suppress refresh or publication. Cache sharing across regions is best effort.
- `components/sections/activity*.tsx` renders the HTML heatmap, date/count lists, real zero handling, derived statistics, and the unavailable state behind a Suspense boundary. With JavaScript disabled, the static shell links to the GitHub profile. Next.js needs its streaming script to reveal request-time HTML.
- `components/kokonutui/activity-terrain.tsx` came from `shadcn@latest add @kokonutui/activity-terrain`. It retains its MIT notice and stock canvas projection. The adaptation removes demo values, uses semantic theme tokens and GitHub colour levels, and adds live reduced motion, Home/End, and a renderer failure callback. `components/terrain/terrain-activation.tsx` imports it after activation, with a 26-week mobile view. The HTML date/count view remains available throughout.
- `app/showcase/activity-fixture.tsx` provides labeled synthetic zero and nonzero fixtures. They are exclusive to the development showcase. The production smoke suite verifies that `/showcase` returns 404.

## Visual pass (2026-11-25)

- Hero: display token raised to `clamp(2.75rem, 0.5rem + 8vw, 8rem)`. The name sits on a full-bleed datum line (`hero-datum` in `app/globals.css`). Role line is primary text. The readout drops its duplicate rule at ≥ 1024 px.
- Removed double hairlines under the Selected work and Research datum lines.
- Navigation and stack filters get 140 ms colour transitions. A hovered or focused nav link shows an ink square where the probe marker sits. Unpressed filters are `--text-2`.
- Checks: lint, typecheck, 42 unit tests, build with secret scan, 33 smoke checks (axe included). Screenshots at 390 and 1440 px in both themes, plus overflow at 320, 1024 and 2560 px, all 0.

## Inventory, footer, deterministic activity tests (2026-11-26)

- `content/stack.ts`: the 34 owner-confirmed technologies plus the 10 project-referenced ones (44), in five filters. `components/site/site-footer.tsx` is in `app/layout.tsx`. The portfolio has a real homepage figure, which is also its stack cover. The Rotation Index panel sets its status note large in place of a screen.
- Fixed:
  - Footer overflow at 320 px.
  - Clipped 2D month labels in the terrain (`activity-terrain.tsx` fit).
  - Missing favicon (`app/icon.svg`).
  - WebKit failing to load any asset from a local production build: `upgrade-insecure-requests` is now sent only on Vercel (`next.config.ts`).
- Tests:
  - The suite blanks the GitHub token.
  - `tests/activity-states.spec.ts` covers the success states on the dev showcase. Outside CI it reuses a running `next dev` on port 3000.
  - The stack test follows `CSS.supports`.
- Checks: lint, typecheck, 76 unit, build with secret scan, Chromium 73 passed and 3 skipped, WebKit 35 passed with 2 harness or engine failures, Firefox blocked (does not launch), 0 audit vulnerabilities, Lighthouse accessibility 100.
- Details: [FINAL_AUDIT.md](FINAL_AUDIT.md).

## Featured project stack (2026-11-26)

- Added Skiper 16 (card stack scroll) in place of the Selected work rows. The files are `components/editorial/project-card.tsx` (`ProjectStack`) and `.project-stack` in `app/globals.css`. It is a CSS scroll timeline with no new dependency and no Skiper code.
- Each panel's cover is the project's first real screen from `content/gallery.ts`. Rotation Index and Developer portfolio have no screens, so they get none.
- Stacking runs only from 1024 × 700 px up. Below that, and under reduced motion, the panels form a plain list.
- Checks: lint, typecheck, 75 unit tests, build with secret scan, 71 smoke passed with 1 skipped (token blank). A new smoke test covers the stack. Chromium screenshots at 1440, 1280, 768, 390, and 320 px in both themes showed 0 overflow and 0 console errors.
- Full status and deviations: [FINAL_AUDIT.md](FINAL_AUDIT.md).

## Project screen gallery (2026-11-26)

- Owner request: add Skiper UI's Skiper 30 (a parallax image gallery). As shipped it uses Lenis smooth scrolling (scroll hijacking), 13 stock images that are not included, and `framer-motion` plus `lenis`, which would breach the JS budget. The owner chose to adapt it instead: `components/editorial/parallax-gallery.tsx` plus `.parallax-gallery` in `app/globals.css`, a CSS scroll timeline with no JavaScript and no new dependency. No Skiper code is used; the component comment credits the idea.
- Data: optional `Project.gallery` (`lib/types.ts`). The project page adds a Screens section when it is set. Ledger uses it with nine real screens from its repository (`public/work/ledger/`, 460 × 780 PNG), each with alt text written from the image.
- Verified in Chromium at 1440 and 390 px: columns drift at different speeds and the middle one against the others, no column end shows inside the frame, all nine images load, no overflow, no console errors. Under reduced motion the static grid shows every screen. Smoke test added (`tests/portfolio.spec.ts`).

## Production readiness audit (2026-11-26)

Scope: dependencies, dead code, duplicated logic, TypeScript, hydration, and the GitHub data layer. Method: per-dependency import search, an export-usage scan over `app/`, `components/`, `lib/`, `content/`, an unused-CSS-utility scan, a search for TODOs, lint suppressions, and `any`, a review of `lib/github/` and `lib/env.ts`, and every route loaded in `next dev` in both themes with console warnings and errors captured. A knip run was not possible: fetching it through `npx` was blocked.

Fixed:

- **Console warning on every page.** `Permissions-Policy` listed `browsing-topics`, which current Chromium rejects as unrecognized. Removed from `next.config.ts`.
- **Duplicated status labels.** `command-palette.tsx` had its own loosely typed (`Record<string, string>`) copy of the labels in `status-mark.tsx`. Both now use `PROJECT_STATUS_LABELS` (`lib/content.ts`), typed by `ProjectStatus`.
- **Duplicated route building.** `/work/${encodeURIComponent(slug)}` was built in four places. `projectHref` (`lib/content.ts`) now owns it; unit test added.
- **Dead code and dependency.** `components/ui/tooltip.tsx` was used only by the development showcase, and it was the only user of `@base-ui/react`. Both removed.

Reviewed, no change needed: every remaining dependency has a production import; all custom CSS utilities are used; `strict` TypeScript with no suppressions or `any`; `lib/github/` turns every failure (timeout, network, HTTP status, malformed JSON, rate limit, validation) into an `unavailable` result, with unit tests. Exports flagged as unused are types or constants used inside their own module, or test-only integrity checks (`duplicateSlugs`, `createActivityReader`).

Known, not fixed (dev mode only): `/journal` logs "Could not validate `instant`" while the journal is empty, because the route calls `notFound()`; production returns 404, as the smoke suite checks. The 404 page's "script tag" warning is listed under Known limits.

After the fixes: lint and typecheck pass; 69 of 69 unit tests; build and secret scan pass; smoke 59 passed and 1 skipped; the 96-render visual sweep and interaction checks pass; no visual change.

## Visual acceptance audit (2026-11-26)

Method: a Playwright sweep of 8 routes (`/`, five project pages, `/lab`, an unknown path) at 320, 390, 768, 1024, 1440, and 2560 px in light and dark: 96 renders. Each render checks horizontal overflow, elements extending past the viewport, cumulative layout shift (fail above 0.05), console errors, and axe (390 and 1440 px). Full-page screenshots were reviewed at 390 and 1440 px in both themes. Interactive checks ran in both themes at 390 and 1440 px: command palette search and Enter, lab sliders and resampling, the architecture diagram, and the motion checks (probe glide, stack filter reflow, press, View Transition, diagram trace) with and without reduced motion.

Defects found and fixed:

- **Layout shift at 320 px on project pages (CLS 0.052).** The search shortcut hint arrives after hydration and wrapped the theme switcher onto a new line. The hint is now hidden below 640 px, where there is no keyboard shortcut (`components/site/command-palette-trigger.tsx`).
- **Overlapping arrowheads in the architecture diagram.** Two flows into one node shared one endpoint. `flowPorts` in `lib/diagram.ts` spreads each node's edge ends by the other end's position; unit test added.
- **Command palette ranking.** Typing "risk" highlighted Research lab (matched on its hint) above RiskLens Quant (matched on its title), so Enter opened the wrong page. Groups with a title match now rank first; order within a group is unchanged (`lib/palette.ts`); unit test added.
- **Inconsistent buttons.** `CopyButton` and the lab's New sample button duplicated `Button`'s classes and drifted from it. Both now use `Button`.

After the fixes: 96 of 96 renders pass (no overflow, CLS ≤ 0.05, no axe violations, no console errors). Palette, lab, diagram, and motion checks pass in both themes and both motion modes.

Not covered: Firefox and Safari (View Transitions and scroll timelines degrade to no animation there), physical devices, screen readers, and Lighthouse. Terrain was not exercised: it renders only with live activity data (B2).

## Audience and content audit (2026-11-26)

- Added RiskLens Quant, Ledger, and Rotation Index as project pages (owner-approved). Every fact comes from the repository README, `gh` repository data, or dependency files checked 2026-11-26; no outcomes were added because none are published with a source.
- Homepage order: work, stack, interests, then activity, so the activity fallback never leads. The hero now links Email, GitHub, and LinkedIn.
- Refreshed the portfolio entry (public source link, repository facts, 66 unit tests, 59 smoke checks, 186.9 KiB).
- Link audit: GitHub URLs and the RiskLens demo return 200. LinkedIn answers automated requests with 999, so it was not verified automatically.
- Leadership, certifications, research write-ups, journal, and résumé stay hidden: no verified entries yet. The role line was kept at the owner's request.

## Motion pass (2026-11-26)

- Signature: the probe-red square glides along the rail to the current section (`components/site/section-navigation.tsx`).
- Cross-document View Transitions between home and case studies; the project title carries over (`projectTitleTransition` in `lib/content.ts`). CSS only.
- Section datum lines draw in on a CSS scroll timeline; transform only, no scroll hijacking.
- Buttons dip on press via the `press` utility. (`CopyButton` and the lab's New sample button were moved onto `Button` in the visual acceptance audit; before that they copied its classes.)
- Stack filter rows reflow on Motion, loaded on intent so the cold homepage stays under budget (186.9 KiB of 200 KiB).
- Architecture diagram: pointing at a flow entry traces its edge. Hover only by design: the SVG is decorative and hidden below 640 px, and the list carries the same information.
- Reduced motion: glide, press, datum draw and view transitions all off. Verified in Chromium with Playwright in both motion modes, no console errors.
- Checks: lint, typecheck, unit tests (99.6% lines), build with secret scan, 59 smoke checks passed (1 skipped).

## Case studies (2026-11-25)

- `content/projects.ts` now holds two verified projects, both marked In development: AccessForge AI (facts from `~/Access Forge` README, ARCHITECTURE, engine README, and BENCHMARK_RESULTS) and this portfolio. `lib/types.ts` adds `status`, `statusNote`, and an optional `caseStudy`. `content/stack.ts` adds Python, FastAPI, PostgreSQL + PostGIS, NetworkX, and MapLibre GL JS.
- `app/work/[slug]/page.tsx` renders the case study. `components/editorial/status-mark.tsx` is shared by the case study and the project row.
- `public/work/access-forge-overview.jpg` was captured on 2026-11-25 from the AccessForge web app running locally without its API. The caption says so.
- Checks: lint, typecheck, 44 unit tests, build with secret scan, 37 smoke checks (axe included). Screenshots at 390 and 1440 px in both themes, with no overflow.

## Stack, activity, leadership, certifications (2026-11-25)

- `components/sections/stack-explorer.tsx`: each technology links to the projects that use it (`projectsByStack`), filters show counts, and new rows fade in with CSS after a filter click. No logos (DESIGN_SYSTEM §6 kept at the user's choice).
- `components/sections/activity-grid.tsx`: fluid heatmap with month labels (`monthColumns` in `lib/github/calendar.ts`), a legend, and a metric readout. The data path, HTML date list, and terrain activation are unchanged.
- `components/sections/leadership.tsx` and `certifications.tsx` render only when `content/leadership.ts` or `content/certifications.ts` has entries. Both registries are empty, so neither section shows. Layouts were checked with labelled samples on `/showcase`.
- Checks: see "Verified locally".

## Credibility pass (2026-11-25)

- Architecture diagrams on both case studies from typed `flows`; AccessForge repository facts checked with `gh` on 2026-11-25 (public, TypeScript, no license file, first commit 2026-11-11, last push 2026-11-25).
- Contact publishes the email with a copy button (owner's choice) and adds LinkedIn (owner-supplied URL). The palette lists both.
- Journal structure ready in `content/journal.ts`; `/journal` 404s and stays unlinked until the first entry. Layout checked with a labelled sample on `/showcase`.
- Still waiting on content: leadership, certifications, résumé PDF (`site.resume`), and journal articles. The portfolio repository is public at RohinCodes15/rohins-website (2026-11-26).

## Command palette (2026-11-25)

- `components/site/command-palette-trigger.tsx` adds "Search" to the section rail (Cmd/Ctrl+K on desktop, a visible button for touch). `components/site/command-palette.tsx` loads on first open and lists pages, projects (searchable by title, summary, status, and stack), home sections (about, activity, work, skills, research), theme choices, and contact links, all from the content registries. Search lives in `lib/palette.ts` (unit tested).
- Built on a native `<dialog>` (focus trap, Escape, inert page, and focus return come from the browser) with the combobox and listbox pattern. The highlighted option carries the probe square used by the rail. Opening drops in over 140–240 ms. Reduced motion makes it instant.
- No terminal. At the user's choice, the DESIGN_SYSTEM §1 ban on terminal prompts stays.
- Fixed during review: dev-mode effect replays closed the dialog at once; Next.js keeps the previous page mounted but hidden, so only a visible trigger answers the shortcut; a shortcut pressed before the dialog's close event could be lost (openings are now numbered sessions).

## Research lab (2026-11-25)

- `/lab` (`app/lab/page.tsx`) has three educational demonstrations on seeded synthetic data: Monte Carlo GBM paths checked against the analytic mean, two-asset portfolio risk (risk–return curve, normal and simulated 95% VaR and ES), and OLS regression with a 200-sample coverage check. Every demo is labelled "Educational demonstration · synthetic data · not research findings or investment advice". The homepage research section links to it.
- Maths in `lib/lab/` (unit tested); UI in `components/lab/`. No new dependencies.
- Rendered at 375, 768, 1440, and 2560 px in both themes with no overflow or console errors. Fixed during review: a hydration mismatch from floating-point drift (demos now render after mount), y-axis labels colliding with tick labels, a clipped "Asset A" label on phones, and formulas that scrolled sideways without keyboard access (axe).
- Initial JavaScript: `/lab` 187.7 KiB, homepage unchanged at 183.1 KiB (gzip -9, every script the HTML references).

## Final refinement pass (2026-11-25)

- Swept `/`, `/work/accessforge`, `/work/portfolio`, and an unknown slug at 375, 768, 1024, 1440, and 2560 px in light and dark: no horizontal overflow and no page errors on real routes.
- Fixed: `app/not-found.tsx` replaces the stock Next.js 404 with a Datum page. `components/site/theme-restore.tsx` restores the saved theme when Next.js re-renders the root layout on the client (the not-found path), which had dropped `data-theme` and ignored a saved Light or Dark choice (regression test in `tests/theme.spec.ts`). The stack table spans the figure columns, so its "Used in" column no longer wraps at 1024 px. Case-study outcome metrics lost a rule that doubled the section datum. Portfolio outcome figures now match today's runs.

## Phase 6 audit: research lab and command palette (2026-11-26)

Rendered `/lab` and the palette in Chromium at 375 and 1440 px, light and dark, and drove the sliders to their extremes. The maths in `lib/lab/` was reviewed against the closed forms: GBM exact step and E[S_T] = S₀e^{μT}, two-asset variance, normal VaR and ES, Cholesky correlation, OLS and its slope standard error. No formula errors were found.

Fixed (each defect seen in a render or a test first):

- **Phone overflow on first paint.** `components/lab/plot.tsx` drew at a 640 px fallback width until ResizeObserver fired, so a 375 px page was briefly 669 px wide. It now measures in a layout effect before paint.
- **Path x positions.** `simulateGbm` thinned the drawn paths by a stride but the chart spaced the kept points evenly. When the step count was not a multiple of the stride (for example T = 1.25 years, 315 steps), the last segment was drawn at the wrong time. Drawn points now carry their time: `[t, price]`.
- **Zero volatility histogram.** With identical values, `histogram` put everything in the first bin of an arbitrary 36-unit range. It now centres them in a ±1 range. The 5th, median, and 95th labels overprinted at low σ; they now step down.
- **Duplicate tick labels.** Axis labels were rounded to whole numbers or whole percents even when ticks were 0.5 apart ("107 107 108 108", "1% 1% 2%"). `Plot` passes the tick step to the formatter, and `tickNumber`/`tickPercent` in `components/lab/parts.tsx` use just enough decimals.
- **Overprinted asset labels.** With identical assets the "Asset A" and "Asset B" labels overprinted, and both sat on the curve. A now sits above its point and B below.
- **Annotation contrast.** "VaR 95%" and the percentile labels were drawn over bars on phones. They now have a surface-coloured halo (`HALO`).
- **Legend.** The regression key showed a square for round sample points. It now has a round key.

Checked and left unchanged:

- Palette: opens from the button and from Cmd/Ctrl+K, filters, wraps with arrows, keeps focus in the input, and closes on Escape with focus back on Search. No overflow at 375 px. The dialog is opaque once its 140–240 ms drop-in ends.
- Regression intervals keep the 1.96 normal value, as the page already explains. At n = 30 the exact t value is 2.05, so true coverage there is about 94%.
- Dependencies: Phase 6 added none. `motion` now ships only in the lazily loaded stack-filter chunk (ARCHITECTURE D19). `@base-ui/react` and the unused `components/ui/tooltip.tsx` were removed in the 2026-11-26 production readiness audit; `shadcn add` reinstalls Base UI if a future primitive needs it.
- New test: `tests/lab.spec.ts` "charts never paint wider than the page and keep distinct axis labels at extreme settings". The unit test in `lib/lab/lab.test.ts` now covers the uneven-stride end time and the centred flat histogram.

## Composition pass (2026-11-26)

- Changed: `app/page.tsx` (Selected work now leads, Activity second), `components/editorial/section-heading.tsx` (index numeral right-aligned against the heading at `meta` size from 1024 px), `components/editorial/project-card.tsx` (titles at `h2` size, looser row padding), `app/globals.css` (`--spacing-section` 8rem → 6rem), `tests/theme.spec.ts` (new tab order). DESIGN_SYSTEM §3.3, §4.4, §5.1, and §6 record the decisions.
- Fixed a pre-existing type error in `tests/lab.spec.ts` that blocked `next build`.
- Checks: lint and typecheck pass, 65 of 65 unit tests pass, the build passes the secret scan, and the smoke suite has 59 passed and 1 skipped. Screenshots at 390 and 1440 px in both themes. There is no overflow at 320, 1024, or 2560 px.

## Hero Floating Lines (2026-11-27)

- Owner request: React Bits Floating Lines in the right side of the homepage hero, from the free registry only. The registry item is `FloatingLines-TS-TW` (`https://reactbits.dev/r/FloatingLines-TS-TW.json`), installed with the pinned `shadcn` 4.23.1 by URL, so `components.json` is unchanged. It has no npm dependencies, so `package.json` and the lockfile are unchanged.
- `components/reactbits/floating-lines.tsx` is the registry file. It keeps the MIT + Commons Clause notice (`components/reactbits/LICENSE.md`, copyright David Haz). Local changes: an `onUnavailable` callback (no WebGL2 context, or the shader fails to link) and ref syncing moved from render into an effect (`react-hooks/refs`). Upstream already pauses off-screen (IntersectionObserver) and in hidden tabs, and frees the program, buffer, VAO and context on unmount.
- `components/editorial/hero-lines.tsx` (`HeroLines`) is rendered in the hero `<section>` in `app/page.tsx`, and `.hero-lines` is in `app/globals.css`:
  - The server HTML is a static SVG drawing of the same composition. It reserves the box, so CLS is 0. It is the fallback without JavaScript, under reduced motion (also when it turns on live), without WebGL2, on a software rasterizer (SwiftShader, llvmpipe), with 2 or fewer cores, with Data Saver, and when the page holds under 30 fps for 2 s after the intro.
  - Otherwise the WebGL chunk loads at idle time (1.2 s at most) and fades in over the drawing.
  - Layout: from lg, the right 55% of the hero behind the text, and the hero gets `min-h-[min(42rem,100svh)]`. Below lg, a full-bleed band (15rem, or 20rem from sm) under the links. Masks fade every edge into the page.
  - The layer is `aria-hidden` and `pointer-events: none`. Its pointer tracking listens on `window`, so links and the rail keep every click. Click swirl is off.
- Tuning: three waves of 8 lines each, so every line sits exactly on one stop: white and ice, five electric-blue lines, one crimson. That gives no blended purple lines and leaves crimson as one thin line per wave.
  - Desktop waves sit low and rise to the right, clear of the intro and the readout. The compact band keeps them centred.
  - Speed 0.45, depth of field 0.65, parallax 0.12, mouse damping 0.035, bend radius 4.5 at strength -0.45.
  - Dark: glow 0.55, brightness 0.7, screen blend. Light: the upstream ink mode at 0.8 opacity.
  - The theme follows `data-theme` and the OS live.
  - DPR is capped at 1.5, or 1.25 on coarse pointers.
- Checks:
  - lint and typecheck clean.
  - 76/76 unit tests.
  - Build with secret scan clean.
  - Smoke: 75 passed, 3 skipped. The new test in `tests/home.spec.ts` covers the decorative layer, link hit-testing, and the reduced-motion static path with no WebGL request.
  - Screenshots at 1440, 1024, 768 and 390 px in both themes: 0 overflow, 0 console errors. Before set, plus live (GPU Chrome), hover, pointer-exit and reduced-motion sets.
- Lighthouse 13.6 on the local production build:
  - Mobile: 93, 99, 99, 99, 98 (median 99; baseline 98). LCP 1.2 s, TBT 100–220 ms, CLS 0.
  - Desktop: 100 on all runs, including with a GPU (live lines; TBT 10 ms).
  - Accessibility 100, best practices 100. SEO 63 is the intentional non-production `noindex`.
  - Headless Lighthouse renders through SwiftShader, so its mobile and default desktop runs measure the static path.
- Found and fixed during the work:
  - SVG presentation attributes ignore `var()`, so strokes go through `style`.
  - SwiftShader stalled the main thread enough to time out the grid smoke test under parallel load. The software-renderer gate fixed it, and the suite went from 2.6 min to 60 s.
- Not covered: Safari, Firefox and physical devices, the live path on a real phone GPU, and a screen reader pass. The layer is `aria-hidden`, so nothing new is announced.

## Hero refinement: two-line name and vertical braid (2026-11-27)

- Owner request: the lines sat too low and in a corner, and too much of the hero was empty. I compared two variations in GPU Chrome at 1440, 1024 and 390 px:
  - A: single-line name with a larger visual.
  - B: two-line name with an immersive visual.
- B won. In A the single-line name is shorter than the rail's three-row span, so the grid stretched the rows (large gaps around the readout) and left about 250 px empty under the CTA. In B the name is a solid typographic mass that balances the braid, and the text rhythm stays even.
- `app/page.tsx`:
  - The name is one `<h1>` with one word per line, larger than the display token (`clamp(3.75rem, 1rem + 11vw, 11.5rem)`). A space between the spans keeps the accessible name "Rohin Pidathala".
  - The readout moves into the main column under the titles at every width; on the right it sat under the braid.
  - New "Explore my work" link to `#work`, rendered only when there are featured projects. It is full width below sm.
  - The hero is `min-h-[min(100svh,48rem)]` from lg.
- `app/globals.css`:
  - `--action` and `--action-hover` (`light-dark(#0047ff, #2563eb)` and `light-dark(#0036c2, #1d4ed8)`): AA under white in both themes. `--signal-fill` measured 4.49:1 in dark, and axe caught it.
  - `lib/design-tokens.test.ts` now asserts those pairs (written first; it failed until the tokens existed).
  - The lines box is 58% wide from lg, full height. The left fade runs from 15% to 55% of the box.
- `components/editorial/hero-lines.tsx`:
  - Desktop waves are steeply rotated (top -1.4, middle 1.2, bottom -1.8), so the lines fall the full height as a crossing braid.
  - 10 lines per wave (was 8). The line before crimson takes about 13% of its tint.
  - Depth of field 0.2 (was 0.65), glow 0.25 (was 0.55), brightness 0.75, light-mode opacity 0.9.
  - Bend radius 5 at -0.5, damping 0.04, parallax 0.15.
  - The static fallback SVG is redrawn as the same braid.
- `components/reactbits/floating-lines.tsx`: the WAVE_SHAPE top and bottom waves are brighter and sharper (light 0.6/0.55, depth 0.5/0.4; upstream 0.2/1 and 0.32/0.6). Noted in the file header.
- Checks:
  - lint and typecheck clean.
  - 76/76 unit tests.
  - Build with secret scan clean.
  - Smoke: 75 passed, 3 skipped, including the axe runs in both themes. The hero smoke test also covers the heading's accessible name and the CTA reaching `#work`.
  - Every hero control is hit-tested as clickable.
  - Screenshots at 320, 390, 768, 1024, 1280, 1440 and 2560 px in both themes: 0 overflow, 0 console errors.
- Lighthouse on the local production build:
  - Mobile: 95, 98, 100, 99, 100 (median 99; baseline 98). LCP 1.2 s, TBT 70–250 ms, CLS 0.
  - Desktop: 100 on all runs, including with a GPU.
  - Accessibility 100, best practices 100.
- Not covered: Safari, Firefox, physical devices, the live path on a phone GPU, and a screen reader pass of the split heading. The accessible name is asserted, but not heard.

## Hero entrance (2026-11-27)

- Request: React Bits Split Text on the hero name. The free registry item is `https://reactbits.dev/r/SplitText-TS-TW.json`. It depends on `gsap@^3.13.0` and `@gsap/react@^2.1.2`, registers the ScrollTrigger and SplitText plugins, and sets `visibility: hidden` on the text until hydration and font loading finish. The owner chose a CSS version of its rise effect instead, so nothing was installed: no new dependency and no registry change. With no React Bits code, no licence notice is needed (ARCHITECTURE D21).
- Implementation:
  - `app/page.tsx` splits the name into per-character `.hero-char` spans, indexed across both lines. The `h1` carries `aria-label={site.name}`, and the word spans are `aria-hidden`.
  - `.hero-follow` with `--delay` marks the role line (0.55 s), readout (0.65 s) and introduction block with its links (0.8 s).
  - `app/globals.css` (Hero entrance): characters use `hero-rise`, 0.8 s with `--ease-datum` (ease-out) and a 40 ms stagger, from opacity 0 and `translate: 0 0.22em`. That is about 40 px at the widest size, and in proportion on phones, where 40 px dropped the letters through the datum rule. Followers and the lines layer use `hero-fade` from opacity 0.2. The sequence ends at about 1.5 s. Everything sits inside `prefers-reduced-motion: no-preference`.
  - Once per tab session: `components/editorial/hero-lines.tsx` waits for its own fade, the last to finish, then stores `hero-played` in sessionStorage. `HERO_PLAYED_SCRIPT` (`lib/hero-entrance.ts`, in the layout `<head>`) sets `<html data-hero-played>` before first paint on later full loads. Home and case studies are cross-document navigations, so this is the path that counts. A later in-app mount sets the attribute in a layout effect. Blocked storage plays the entrance on every load.
- Timing choice: 40 ms × 13 + 0.8 s finishes the name at 1.32 s, inside the 1.5 s brief, as the introduction settles. 50 ms with 0.9 s ends the name at 1.55 s, after the introduction. 35 ms with 0.7 s ends it at 1.16 s, before the role line has faded in. Neither alternative was rendered side by side; the choice came from this arithmetic plus the frames at 150, 450, 900 and 1600 ms.
- Floating Lines: unchanged apart from the container fade (0.2 s delay, 1.3 s) and the session flag. Cursor response, idle loading and the static fallback are as before.
- Tests: `lib/hero-entrance.test.ts` runs the head script against a fake sessionStorage (set, unset, throwing). The homepage axe tests in `tests/home.spec.ts` and `tests/theme.spec.ts` now wait for the `hero-*` animations to finish. Before this, axe measured contrast mid-fade and failed (2.84:1 on the readout).
- Checks:
  - Lint and typecheck clean. 78/78 unit tests pass, and `hero-entrance.ts` has 100% coverage.
  - Build passes with a clean secret scan.
  - Smoke: 75 passed, 3 skipped (desktop and mobile Chromium).
  - Playwright frames at 1440 px (dark and light), 820 px, 390 px and under reduced motion: CLS ≤ 0.0003, no hydration or page errors from this change, accessible name and text "Rohin Pidathala", no animation under reduced motion.
  - The entrance does not replay after scrolling, Back from `/work/accessforge`, or reload in the same session.
- Lighthouse 13.6 on the local production build:
  - Mobile: 100 on all 5 runs (baseline median 99). LCP 1.2 s, TBT 40 ms, CLS 0.
  - Desktop: 100 on all 3 runs, LCP 0.3 s.
  - Accessibility 100, best practices 100.
  - The first attempt, with fades from opacity 0, measured mobile 91–92 and LCP 3.3 s. The LCP element is the introduction paragraph.
- Not covered: Safari, Firefox, physical devices, and a screen reader pass of the `aria-label` heading. Kerning across the per-character spans was checked only by eye at 1440 and 390 px.

## Stack Chroma Grid (2026-11-27)

- Request: React Bits Chroma Grid in place of the 44-row stack inventory, keeping the heading, intro line and logo assembly. Registry item `https://reactbits.dev/r/ChromaGrid-TS-TW.json` was installed with the pinned `shadcn` 4.23.1. The installed file matched the registry source byte for byte. It has no npm dependencies; `package.json`, `package-lock.json` and `components.json` are unchanged. The install landed at `components/ChromaGrid.tsx`; it was adapted into `components/reactbits/chroma-grid.tsx`, and the original was removed. The existing `components/reactbits/LICENSE.md` (MIT + Commons Clause) covers it, and the file header lists every local change. ARCHITECTURE D22.
- Kept from upstream: one requestAnimationFrame loop writes `--chroma-x/y/power`, so moving the pointer never re-renders React. Also kept: per-area offsets, the smoothstep falloff mask, the grayscale base layer under a masked colour layer, the accent wash and the rim.
- Changed:
  - Logo tiles are buttons (contained 32 px logo plus name), not photo cards. Colours come from site tokens instead of the built-in purple-grey themes, and the Unsplash demo items, card-reveal mode, frame and info rows are removed.
  - Keyboard focus (`:focus-visible`) aims the spotlight at the focused tile. The grid is one tab stop; arrows, Home and End move between tiles.
  - A touch lift no longer drains the colour; the tapped tile stays lit until focus leaves.
  - The base layer dims by opacity, not brightness, so white and black mono logos settle to the caption grey in both themes.
- Logos: 24 Devicon v2.16.0 SVGs added to `public/stack`. They are under the existing MIT notice, were checked for scripts and external references (none), and are all served locally. React Native reuses `react.svg` and Motion uses Devicon `framermotion`. Flask, Motion, Vercel, Next.js and GitHub are mono and invert in dark mode. Ten entries have no Devicon logo and show their name: Expo, MapLibre GL JS, Pygame, PostGIS, Claude API, Hugging Face, OpenAI API, SciPy, Monte Carlo simulation and Statistical modeling. `StackEntry` gained optional `logo`, `accent` and `mono`. Each accent is the logo's main brand colour; mono and logo-less tiles fall back to `--signal`.
- `components/sections/stack-explorer.tsx`:
  - Keeps the six filters with their counts, `aria-pressed` active state and status line.
  - The shared detail line under the grid shows the hovered, focused or tapped technology, its category and real project links. It keeps the last one shown, so the pointer can move down to the links.
  - Each tile's `aria-describedby` reads its category and projects.
  - Filtering runs inside `document.startViewTransition` with `flushSync`. `.stack-stage[data-filtering] .chroma-tile` gets a `view-transition-name` only during the change, so cross-page transitions capture nothing extra. Tiles reuse the existing 320 ms spring group timing; changes are instant without support or under reduced motion.
  - `stack-rows-motion.tsx` was removed (D19 updated).
- Columns follow the container (the 60rem centred column), not the viewport: 2, 3, 4, 6 and 8 at 18, 28, 40 and 52rem. Measured: 320 px gives 2 (137 px tiles), 390 and 412 px give 3, 768 px gives 6 (112 px), and 1024–2560 px give 8 (110–115 px). That is denser than the brief's starting points at tablet and small desktop, which keeps tile size even.
- Visual comparison at 1440 px with the pointer on the grid, both themes, by setting the variables live:
  - A: radius 160 px, grayscale 1, brightness dim 0.12. Lit about two tiles, and white mono logos stayed bright at rest.
  - B: 240 px, grayscale 0.85, dim 0.05. Read as a wash, and idle logos kept a tint.
  - C: 120 px, dim 0.25. Too tight to feel continuous.
  - Chosen: 220 px, grayscale 1, opacity dim 0.4, rim 0.6, wash 0.35 × 0.5.
  - Text-only tiles were first full-strength text and outweighed the logos; they are now muted body size.
- Before and after screenshots of the region were taken at 1440 (dark and light), 768, 390 and 320 px.
- Checks:
  - Lint and typecheck clean. 79/79 unit tests pass, including the new check that every stack logo exists locally and that accents are consistent.
  - Build passes with a clean secret scan.
  - Smoke: 75 passed, 3 skipped, axe included in both themes. `tests/portfolio.spec.ts` now focuses TypeScript, asserts its description names AccessForge AI, and checks the detail link.
  - Browser: 44 tiles, 0 overflow at 320–2560 px, and no console or page errors.
  - Keyboard: one tab stop, arrows move, focus lights the spotlight, and Tab leaves the grid.
  - Filter: Data shows 4 tiles and Languages shows 7 through a real View Transition (102 pseudo-element animations); All restores 44.
  - Touch (Pixel 7): a tap shows React's detail, and the tile stays lit.
  - No JavaScript: all 44 tiles render and the filters stay hidden.
- Lighthouse 13.6 on the local production build:
  - Mobile: 98, 99, 99, 99, 99 (median 99; previous run 100, long-standing baseline 99). LCP 1.2 s, CLS 0. TBT 110–160 ms, up from 40 ms, from hydrating 44 interactive tiles.
  - Same 17 requests (logos below the fold load lazily). Page weight 389 KiB, up from 383 KiB.
  - Desktop: 100 on all 3 runs.
  - Accessibility 100, best practices 100.
- Not covered:
  - Safari and Firefox. View Transitions there degrade to an instant change.
  - Physical touch devices and a screen reader pass.
  - pandas' navy logo is faint at rest in dark mode, a limit of grayscale on a dark ground.
  - `featuredStack` still lists its own 9 logo paths, which duplicate the new `logo` fields.
- Without JavaScript, the project links that the old rows showed are not on the stack grid. Every project is still linked from Selected work.

## Decrypted labels (2026-11-27)

- Reference: React Bits `DecryptedText-TS-TW` (free). It depends on `motion@^12`, beside the pinned `motion` 14.14.0, and is 641 lines with a Motion span per character, so it was not installed; the pins are unchanged. `components/ui/decrypted-text.tsx` is a site-specific version of the same idea, and the file header credits React Bits; no React Bits code is used.
- Behaviour:
  - The label scrambles once, left to right, when it first scrolls into view (IntersectionObserver, then disconnected).
  - One 40 ms interval; the total stays under 800 ms however long the label.
  - Glyphs are uppercase letters, digits and a few symbols (`#%/+=<>`); digit labels scramble through digits only.
  - Optional replay on pointer entry (`replayOn`).
  - The DOM keeps one real text node. The scramble is a `data-scramble` attribute drawn by `.decrypt::after` over the real glyphs, which have a transparent fill, so the width, accessible text and test text never change and React never re-renders.
  - The timer, observer and listener are cleaned up on unmount. Reduced motion shows the text still. No-JavaScript shows the server text.
- Placements:
  - Section numbers (`SectionHeading`: homepage, Research Lab, case studies).
  - Selected work outline numbers, which replay on panel hover. The outline stroke carries over because the overlay inherits it.
  - Status labels (`StatusMark`: Selected work and case studies).
  - Case-study metadata labels (Status, Role, Year, Stack, Links, Repository), which replay on hover.
  - GitHub Activity stat labels.
  - Not on the name, paragraphs, navigation or headings.
- Speed: the brief's 35–50 ms per update gives 40 ms ticks. Labels of up to 20 characters reveal one character per tick, and longer ones reveal several per tick to stay under 800 ms. Under the machine's load at the time (load average 120+), a finer side-by-side comparison of speeds was not reliable, so it was not done.
- Browser checks (dev server, 1440 × 900):
  - An in-page MutationObserver recorded "01" scrambling through digits (48, 91, 03, 04) and resolving; "In development" resolved left to right (`SR ZFJV…`, `In G3OY…`, `In de…`) with its real text unchanged throughout.
  - Hovering a panel replayed the number.
  - Width was unchanged: 92.6 px before and after.
  - Final texts were correct: section numbers 01–05, statuses, and case-study labels.
  - Reduced motion: no scramble. Pixel 7: no overflow and no errors.
  - `/` and `/work/risklens` loaded with no console or page errors.
- Checks: typecheck and lint clean; 79/79 unit tests; build passes with a clean secret scan; full smoke suite 73 passed and 3 skipped (`--workers=2`).

## Magnet links (2026-11-27)

- Registry item `https://reactbits.dev/r/Magnet-TS-TW.json`, installed with the pinned `shadcn` 4.23.1. The installed file matched the registry byte for byte. It has no npm dependencies; `package.json`, `package-lock.json` and `components.json` are unchanged. Adapted into `components/reactbits/magnet.tsx` under the existing MIT + Commons Clause `LICENSE.md`, with the changes listed in the header. Kept from upstream: one shared pointer listener, nearest-magnet arbitration, a spring solved in a requestAnimationFrame loop that writes `transform` (no React re-renders while the pointer moves), and touch pointers ignored.
- Local changes:
  - Defaults: 50 px reach, strength 4, 12 px cap.
  - Spring: stiffness 120, damping 22, which is critically damped, so there is no overshoot.
  - The settings ref syncs in an effect (react-hooks/refs).
  - Reduced motion is tracked live.
  - The wrapper and inner element are spans, not divs. The hero link row and the footer email sit in `<p>`, and a div there broke hydration on every page: the first browser run logged a hydration error and a flood of `parentNode` errors, fixed by the spans.
- Placements:
  - Hero "Explore my work" (`app/page.tsx`): full width on phones as before.
  - Selected work "Read the case study" (`project-card.tsx`): a transformed ancestor would shrink a stretched `::after` to the link, so the panel-wide target is now a separate `aria-hidden`, `tabIndex={-1}` link (`z-[5]`) under the magnetic link (`z-[6]`). Hovering the panel still rolls the link text (`.work-panel:hover .work-cta` in `globals.css`).
  - Case-study project links (Live demo, Source) in `app/work/[slug]/page.tsx`.
  - Contact email (`components/sections/contact.tsx`).
  - Footer email (`components/site/site-footer.tsx`).
  - Not applied to navigation links, technology tiles or the A Closer Look section (removed earlier today).
- Strength comparison on the hero link (pointer inside / 20 px / 45 px outside / 20 px below):
  - A, strength 5 with an 8 px cap: 8 / 8 / 2.6 / 8 px. Barely reads on a large button.
  - B, strength 4 with a 12 px cap: 11.9 / 12 / 3.3 / 10.4 px. Chosen.
  - C, strength 3 with a 16 px cap: 15.9 / 15.9 / 4.3 / 13.9 px. Above the brief's 10–12 px and loose.
  - Return to within 1 px: about 390 ms with stiffness 120 and damping 22, and about 320 ms with 170 and 26. The first was kept for the brief's roughly 450 ms full settle.
- Browser checks (dev server, 1440 × 900 unless noted):
  - Clicking mid-movement (4–6 px offset) lands on `#work`.
  - Selected work: the link moves about 11 px; there is one focusable link per panel; clicking the link or a screenshot opens the case study.
  - After six rapid sweeps over the footer email, it rests at 0 px.
  - Contact email moves about 11.7 px; a case-study Live demo link moves about 9.3 px with its href intact.
  - Tab reaches the hero link with its 2 px solid focus outline.
  - Reduced motion: 0 px. Touch (Pixel 7): a tap gives 0 px and follows the link; the hero link keeps 368 of 412 px width.
  - `/`, `/work/risklens` and `/work/ledger` load with no console or page errors.
- Checks: lint clean; typecheck; 79/79 unit tests; build passes; full smoke suite 73 passed, 3 skipped.
- Not covered: Safari, Firefox, physical devices and screen readers. The magnet moves only the visual box; the link's hit area moves with it by at most 12 px.

## A Closer Look removed (2026-11-27)

- Owner request: remove the section entirely.
- Removed:
  - The homepage section and its rail and nav entry.
  - `components/editorial/exhibition.tsx` and the `.look-*` styles.
  - `exhibits` and its `Exhibit` type from `content/gallery.ts`.
  - The two detail crops made only for it (`accessforge/destinations-detail.jpg`, `portfolio/spotlight-detail.jpg`).
  - Its unit test, home smoke test and the no-repeat check, and its entry in the theme spec's tab order.
- Kept: `ParallaxGallery` and `lib/gallery.ts` (case-study galleries) and `access-forge-overview.jpg` (AccessForge case-study figure).
- Checks:
  - Lint clean; typecheck; 79/79 unit tests; build passes.
  - Smoke: 73 passed and 3 skipped. The two fewer are the removed A Closer Look test on desktop and mobile.
  - The page's h2s are now Selected work, Tech Stack, Research and interests, Activity and Contact, with no overflow.
- The section notes below are history.

## A Closer Look exhibition (2026-11-27)

- Problem: after Selected work took 13 screens, the Skiper 30-style parallax gallery held 5 leftovers (2 RiskLens, 3 Ledger), uncaptioned, cropped to 4:5 and with ragged columns.
- References checked:
  - Skiper 30 needs `framer-motion` and `lenis`.
  - React Bits `CircularGallery-TS-TW` and `FlyingPosters-TS-TW` are WebGL; they would be a second context beside Floating Lines.
  - `PixelTransition-TS-TW` has no dependencies and no WebGL.
  - None was imported. Their ideas were tried in CSS on a temporary dev route (`app/showcase/look`, since removed).
- Variations, screenshotted at 1440 px:
  - A, an editorial bento of captioned exhibits in rows of 7 + 5 columns, alternating sides: 1,454 px.
  - B, a curved horizontal track (scroll-snap with a `view(inline)` rotateY curve): 680 px, but most exhibits sit off-screen and it needs horizontal scrolling.
  - C, one large exhibit per row with a stepped clip reveal and perspective: 3,155 px, too long.
  - Chosen: A.
- Content (`exhibits` in `content/gallery.ts`, replacing `closerLook`): six exhibits, each with project, title, caption and, where relevant, a data label. None repeats a Selected work screen, and a unit test enforces this.
  - AccessForge app shell (`access-forge-overview.jpg`, the case-study figure; the caption notes the API was stopped, so counts read 0).
  - AccessForge destination filters: a 600 × 500 detail crop from `overview-map.jpg`.
  - Ledger academy, lesson and scam screens as one phone group, labelled "Simulated market with pretend cash".
  - RiskLens value at risk and drawdown, each labelled "Example portfolio: 50/50 AAPL and MSFT".
  - Portfolio spotlight: a 720 × 360 detail crop from `stack.jpg`.
  - Ledger went from 3 of 5 items to 1 of 6.
- Implementation:
  - `components/editorial/exhibition.tsx` (`Exhibition`) and `.look-*` in `globals.css`.
  - Each exhibit's screens share a row height (`--look-h`, up to 22rem) and are bottom-aligned, so captions start level.
  - Screens show whole at their own aspect ratio: no cropping or stretching, and no frame beyond a hairline.
  - The project link (mono, ink, with an accent square) covers the exhibit and goes to the case study.
  - Restrained parallax: ±1.25rem on a view timeline, off under reduced motion. Hover or focus lifts the screens 0.375rem.
  - Layout: one column below 640 px, two to 1024 px, 7 + 5 from there.
  - `ParallaxGallery` stays for the case-study galleries (Ledger's nine screens). It is no longer on the homepage.
- Heights: 1,847 px at 1440 (before 1,118, with 5 uncaptioned screens), 1,395 px at 768 and 2,405 px at 390. No overflow and no errors.
- Fixed during checks: axe flagged the accent-coloured 13 px project labels at 4.0–4.3:1, so the labels are ink with an accent marker.
- Checks:
  - Lint and typecheck clean; 80/80 unit tests (an exhibits test replaces the `closerLook` one).
  - Build passes.
  - Full smoke suite: 75 passed, 3 skipped. The new home test checks six exhibits, case-study links, titles, alt text and the data labels.
- Before and after screenshots: scratchpad `look/before-*` and `look/after-*`.
- Lighthouse 13.6 on the local production build, with the machine quieter than earlier runs (load average 3.6–5.5), and including the Rotation Index change below:
  - Mobile: 93, 98, 97, 98, 98 (median 98; earlier baseline 99). LCP 1.2–1.3 s, TBT 150–320 ms, CLS 0, 21 requests, 434 KiB.
  - Desktop: 100 and 100, LCP 0.3 s.
  - Accessibility 100, best practices 100.

## Rotation Index screen (2026-11-27)

- Update, same day (supersedes the locked frame below):
  - The owner authorised the season download. On a fresh clone in the scratchpad I followed the repository README:
    - One raw game was fetched by hand as the storage preflight's size sample; the preflight needs at least one cached game.
    - The preflight then passed: 2.0 GB required against 30 GB free.
    - `possessions_loader.py` downloaded 1,229 more games with 0 failures.
    - `--rebuild-all` rebuilt 1,229 and left 1 unchanged.
    - `--offline` audit: 1,230 of 1,230 validated, 0 failed, complete.
    - `fit_possession_ridge()` exited 0.
  - The dashboard (`python app.py`) then showed Model Available and the estimates table.
  - Rotation Index now shows two real captures: `public/work/rotation-index/dashboard.jpg` (1440 × 900) and `estimates.jpg` (1152 × 880). The video frame `locked.jpg` was removed.
  - The status is `completed` (owner request). The status note now says all 1,230 games validate and the dashboard shows estimates; the old note said estimates stayed hidden.
  - Checks: unit tests 80/80; build passes; full smoke suite 75 passed, 3 skipped, with the home test now expecting 14 screens including the Model Available dashboard.

- Owner request: use the video in the repository. `RohinCodes15/Rotation-Index` has `media/launch.mp4` (21 s, 1920 × 1080, the same file as `brag-output/brag.mp4`) and `brag-output/brag.jpg`.
- Provenance: per `brag-output/brag-plan.md`, the video recreates the dashboard from its own markup, `style.css` and real outputs; it is not a screen recording. It shows the app at 1,229 / 1,230 · Model Locked, then dramatizes the unlock to 1,230 · Available with estimates, an audit and diagnostics.
- The site's status note says estimates stay hidden until all 1,230 games validate. The owner confirmed the season is still locked, so only the opening locked frame is used (2.2 s, cropped to 1200 × 750): `public/work/rotation-index/locked.jpg`, 53 KB. The audit frames show 0 or 1,230 validated, never the real 1,229, and later frames show estimates, so none is used.
- `workScreens["rotation-index"]` holds the frame, with alt text naming it as the launch video's recreation, and the accent is the scoreboard red `#c8102e`.
- Rotation Index now renders one lead screen instead of its status note. The status mark still reads "In development".
- Checks: typecheck and lint clean; 80/80 unit tests (the `workScreens` test covers the new file); build passes; the home smoke spec is 19 passed and 1 skipped, now asserting 13 screens and the locked frame; renders at 1440 px (both themes) and 390 px with no overflow.

## Selected work exhibition (2026-11-27, supersedes the fan below)

- Brief: a premium editorial exhibition that combines Skiper 17 (depth stacking), Skiper 34 (screenshot reveal), Skiper 30 (editorial parallax) and Bounce Cards (overlapping previews). No new research phase; findings from the fan pass were reused.
- Variations: three built on shared markup, as CSS overrides on a temporary dev-only route (`app/showcase/work`, since removed). Screenshotted at 1440 px with scroll and hover.
  - A, cinematic numbered panels pinned with depth: the clearest hierarchy, imagery in seven columns, and depth from stacking. Its two bugs are fixed (below).
  - B, screens stacked at rest that spread wide on hover: a lively hover, but at rest it repeated the fan this replaces, and the spread overflowed.
  - C, one large screenshot above the copy, tilting in: the most readable screens, but the number and title dropped to second place and each project took about 1.5 screens of scrolling.
  - Chosen: A.
- Implementation:
  - `components/editorial/project-card.tsx` (`SelectedWork` and `ProjectCard`). Each panel has three grid areas: head (outline number in the accent that fills on hover or focus, then the title), media and body. The body holds the summary; status, role and year; technology tags tinted with the accent; and the prominent "Read the case study" text-roll link (Skiper 58). That link's hit area covers the panel, and its name is "Read the case study: {title}", which contains the visible text.
  - Desktop places copy in five columns and screens in seven. Mobile orders head, screens, body, with no pinning.
- Screens (`.work-media` and `.work-shot-*` in `globals.css`):
  - No frame or letterbox; each shows at its own aspect ratio with a hairline in the accent.
  - The lead is 86% of the column in perspective (rotateY −6°); two more overlap at its lower corners. Hover or focus squares the lead and spreads the others.
  - Ledger's phone screens stand in a row with the lead raised in the middle.
  - AccessForge leads with its overview map and planner interface; RiskLens with its Monte Carlo chart over the frontier and benchmark charts.
  - Rotation Index shows its real status note as display type.
- Accents (`workAccents`, `content/gallery.ts`) were sampled from the screens with a canvas pixel count:
  - AccessForge: barrier red `#d84860`.
  - RiskLens: chart blue `#3078a8`.
  - Ledger: market green `#00a848` (`#008a3c` in light mode).
  - Portfolio: `--probe`.
  - Rotation Index: none, so it stays in ink.
- Scroll (CSS scroll timelines only, no JavaScript):
  - Pinning starts at 1024 × 600 px with no reduced-motion preference (first 800 px; lowered the same day because a 1440 × 780 laptop window only pinned when zoomed out). In pinned mode the number, title and screens also scale with viewport height (`svh`), so panels fit short windows. Each item is sticky at the top with the page background and a hairline-and-shadow edge.
  - The covered panel recedes (perspective, rotateX 5°, scale 0.9, fade) across its share of the list's timeline.
  - The incoming lead screen reveals with a clip from below, and the others follow within entry. Revealing inside entry matters: a pinned panel's screens stop moving, and the first build left the lead clipped.
  - All of it is scrubbed, so it reverses on the way up, and there is no extra scroll distance beyond the panels.
  - Pinning needs each panel to fit the viewport, or the next one covers its link for good. Measured at 1024×600, 1280×650, 1366×768, 1440×700, 1440×780, 1470×830 and 1920×1080: panels are 373–551 px, each within its budget (viewport minus padding, from 546 px). `tests/home.spec.ts` asserts it at 1440×900.
- Not applied:
  - Magnet: the codebase has no Magnet component.
  - Category labels: projects have no category field, so role and stack tags stand in.
- Before and after screenshots at 1440 (dark and light), 768 and 390 px: scratchpad `sw/before-*` and `sw/after-*`.
- Checks:
  - Lint and typecheck clean. 80/80 unit tests pass. Build passes with a clean secret scan.
  - Smoke: 75 passed, 3 skipped when run alone (`--workers=2`). A run alongside screenshot jobs on the loaded machine timed out in unrelated tests.
  - Axe found and I fixed a label-in-name mismatch on the case-study links.
  - The updated Selected work test checks 5 items, pinning, the link name and href, reduced motion (static and no animation), 12 screens and the Rotation Index note.
  - Browser at 320–1920 px: no horizontal overflow, nothing past the viewport with any panel hovered, and no console errors.
- Lighthouse 13.6 on the local production build, with another app holding about 115% CPU (load average 22–31 during the runs):
  - Mobile: 90, 96, 85, 93, 90. LCP 1.3–1.6 s, TBT 240–590 ms, CLS 0, 21 requests, 427 KiB, up from 395 KiB because lead screens are requested larger.
  - Desktop: 100 on all 3 runs, LCP 0.3–0.5 s.
  - Accessibility 100, best practices 100.
  - The mobile numbers are not comparable with the clean 99 baseline. Rerun with other apps closed. The section adds no client JavaScript.
- Not covered: Safari and Firefox (Firefox has no scroll timelines, so panels do not pin and screens do not reveal); physical devices; a screen reader pass.

## Selected work fan (2026-11-27)

- References studied, with registry items checked:
  - `skiper-ui.com/registry/skiper17.json` depends on `gsap`, `@gsap/react`, `framer-motion` and `lenis`. It pins a stage where each next card slides up from y 100% while the covered card scrubs to scale 0.7 and rotation 5°.
  - `skiper34.json` (`framer-motion`, `lenis`): sticky frames scale away and rotate while the image inside counter-rotates at 1.25× scale.
  - `skiper30.json` (`framer-motion`, `lenis`): parallax columns, already the basis of A Closer Look.
  - All three are free with "attribution to Skiper UI is required when using the free version". No Skiper code is used; the idea is credited in `project-card.tsx`.
  - React Bits `BounceCards-TS-TW`, `CircularGallery-TS-TW` and `FlyingPosters-TS-TW` have no npm dependencies (MIT + Commons Clause). None was imported.
- Concepts were built as a temporary dev-only route (`app/showcase/work`, since removed) on real content and screenshotted at 1440 px:
  - A, cinematic panels: the recede and counter-rotate worked, but each project had one screen in a grey surface box that read as a card.
  - B, large type with fanned screens: the most distinctive, and screens sit without a box. Wide charts first overflowed on hover and three cards overflowed at 390 px.
  - C, screenshot first with perspective: a large screen in a surface box, the nearest to a generic card.
  - Chosen: B, with A's scroll-driven opening and Bounce Cards' hover spread.
- Implementation:
  - `components/editorial/project-card.tsx`: `ProjectStack` became `SelectedWork`; `ProjectCard` takes `screens`. Title, link, view-transition name, status, role, year, stack and "Read case study" are kept.
  - `.work-fan` and `.work-card` in `globals.css` replace `.project-stack` and `stack-recede`.
  - Each screen is `min(58%, fan height × its aspect ratio)` wide, so phones are narrow and charts wide. Outer screens stay within the fan at full spread and hover: 50% ± 29% ± 21%.
  - The work titles use line-height 1.15, because the roll effect clips each word and 0.95 cut Ledger's descender.
- Screens (`workScreens`, `content/gallery.ts`):
  - AccessForge: overview, barrier map, planner story.
  - RiskLens: Monte Carlo, efficient frontier, vs SPY.
  - Ledger: home, market, battle.
  - Portfolio: home plus two new captures from a local production build (1440 × 900, 2026-11-27): `public/work/portfolio/stack.jpg` (Tech Stack grid with the spotlight, dark) and `case-study.jpg` (AccessForge case study, light).
  - Rotation Index: none; it shows its status note.
  - A Closer Look now shows the remaining 5 screens (RiskLens VaR histogram and drawdown; Ledger scam, portfolio and lesson) and no longer repeats any (owner decision).
- Checks:
  - Lint and typecheck clean.
  - 80/80 unit tests pass, including a new `workScreens` test (files exist, at most three per featured project, filed under their own project, alt text and size).
  - Build passes with a clean secret scan.
  - Smoke: all specs pass. Home is 19 passed and 1 skipped; the first full run was 73 passed, 3 skipped and 2 failed only on the gallery count, now updated. The new test checks 5 rows, 12 screens, the Rotation Index note, no animation under reduced motion, and no screen shared with A Closer Look.
  - Browser at 320, 390, 1024 and 1440 px in both themes and under reduced motion: no overflow and no errors. No card passes the viewport with every row hovered.
- Lighthouse 13.6 on the local production build. Runs were noisy: another app held about 110% CPU (load average 12–28).
  - Mobile: 85, 97, 92, 89, 92, then 93, 89, 92, 98, 98. The quieter runs scored 98 with TBT 170 ms, against the earlier 99 and 110 ms.
  - LCP 1.3–1.4 s, up from 1.2 s, and CLS 0.
  - Requests rose from 17 to 21 (six 4–26 KB work screens load lazily near the fold) and page weight from 389 to 395 KiB.
  - The added cost is in the existing framework chunk's script evaluation, which varied with load. The section adds no client JavaScript (server component plus CSS).
  - Desktop: 100 on all 3 runs, LCP 0.4 s.
  - Accessibility 100, best practices 100.
- Not covered:
  - A clean-machine Lighthouse rerun. Rerun with other apps closed before treating the mobile score as final.
  - Safari and Firefox; Firefox has no scroll timelines, so the fan rests open there.
  - Physical devices and a screen reader pass.
- A Closer Look's 5 screens leave two columns short until the parallax drift moves them.

## Verified locally

Results from the final run on 2026-11-26, after the production readiness audit. The same steps also run in GitHub Actions (`.github/workflows/ci.yml`) on every push to `main`.

| Check | Result |
| --- | --- |
| `npm run lint` | Pass, no warnings |
| `npm run typecheck` | Pass |
| `npm test` | 69 of 69 passed. Coverage 99.62% line, 96.89% branch, 98.10% function on `lib/` |
| `npm run build` (postbuild secret scan) | Pass. 87 files scanned, no credentials. All five project pages and `/lab` prerender statically; `/journal` returns 404 while empty |
| `npm run test:smoke` (Chromium desktop and Pixel 7, axe included) | 59 passed, 1 skipped by design (duplicate viewport sweep on mobile) |
| `npm audit` | 0 vulnerabilities |
| Initial JavaScript | Homepage 187.0 KiB, `/work/accessforge` 190.4 KiB, `/lab` 191.3 KiB: gzip -9 of every script the HTML references. Under the 200 KiB budget |
| Visual sweep | 96 of 96 renders pass (see Visual acceptance audit) |

Not run: Lighthouse and field Web Vitals, Firefox and Safari, physical devices, and manual screen-reader passes.

## Remaining release gates

- **B1, content:** Add approved leadership and certification entries (`content/leadership.ts`, `content/certifications.ts`; their sections stay hidden while empty), research write-ups, long-form case studies for RiskLens, Ledger, and Rotation Index (they have project pages, without case-study sections), a longer biography, and any additional contact links.
- **B2, live data:** Set `GITHUB_CONTRIBUTIONS_TOKEN` as a least-privilege Vercel Production Secret and compare the resulting calendar with the signed-out public profile. No live statistics were fetched or claimed. Verify the hosted Runtime Cache in the target project.
- **B4–B5, deployment:** Choose the canonical domain and verify Vercel, repository integration, preview protection, and hosted Actions. No deployment was performed.
- **B6, terrain release:** Verify midrange Android frame pacing and physical iOS Safari, plus desktop and mobile screen-reader flows, before releasing live terrain. The HTML calendar remains the fallback. Field Web Vitals need production traffic.
- **Known limits:**
  - The first request for an unlisted `/work/` slug returns HTTP 200 with the not-found page; later requests return 404 (Cache Components).
  - `next dev` logs a React "script tag" warning on the not-found page, because the root layout re-renders on the client. `ThemeRestore` covers the theme.
  - The heatmap redesign has been checked only on synthetic fixtures until B2 supplies live data.
  - Initial JavaScript leaves 13.0 KiB of headroom on the homepage and 8.7 KiB on `/lab`.
  - `tests/theme.spec.ts` "axe passes with Dark chosen on a light OS" failed once in a full run on 2026-11-25, then passed 3 times alone and in 2 further full runs. The cause was not found; watch it in CI.

## Production readiness

**Not ready to deploy.** The code is ready for review, and the content is ready except for the gaps in B1. Blocking before launch:

1. B2: production GitHub credential, so Activity shows real data instead of its unavailable state.
2. B4–B5: Vercel project, canonical domain, preview protection.
3. Manual check that the LinkedIn link resolves (LinkedIn blocks automated requests).

B1 (more content) and B6 (terrain on real devices) do not block a first launch: empty sections stay hidden, and terrain stays behind activation.

## For the independent engineering audit

- Start with `AGENTS.md`, then `docs/ARCHITECTURE.md` (decisions D1–D20) and this file.
- Reproduce: `npm ci && npm run lint && npm run typecheck && npm test && npm run build && npm run test:smoke` (Node 24). No secrets are needed: without `GITHUB_CONTRIBUTIONS_TOKEN`, Activity renders its unavailable state.
- Highest-risk areas to review: `lib/github/` (credential handling, validation, caching), `next.config.ts` (CSP with `'unsafe-inline'` for the theme script, §10), `scripts/check-secrets.mjs`, and `content/projects.ts` (every claim names its source).
- Every published fact should trace to a repository README, `gh` data, or a dated command output recorded here. Flag any that do not.

