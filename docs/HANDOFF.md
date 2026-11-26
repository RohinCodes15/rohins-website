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

- Start with `AGENTS.md`, then `docs/ARCHITECTURE.md` (decisions D1–D19) and this file.
- Reproduce: `npm ci && npm run lint && npm run typecheck && npm test && npm run build && npm run test:smoke` (Node 24). No secrets are needed: without `GITHUB_CONTRIBUTIONS_TOKEN`, Activity renders its unavailable state.
- Highest-risk areas to review: `lib/github/` (credential handling, validation, caching), `next.config.ts` (CSP with `'unsafe-inline'` for the theme script, §10), `scripts/check-secrets.mjs`, and `content/projects.ts` (every claim names its source).
- Every published fact should trace to a repository README, `gh` data, or a dated command output recorded here. Flag any that do not.

