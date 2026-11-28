# Architecture — Rohin Pidathala Portfolio

Status: agreed design, not implemented. Date: 2026-11-25.

Sources: [DESIGN_RESEARCH.md](DESIGN_RESEARCH.md) (visual) and [TECHNICAL_RESEARCH.md](TECHNICAL_RESEARCH.md) (technical). Execution order is in [ROADMAP.md](ROADMAP.md).

**Precedence.** Where this document and a research report disagree, this document wins. The research reports stay unchanged as dated evidence. §11 records every contradiction and how it was resolved.

---

## 1. Goals and constraints

- **Audience.** Recruiters scanning for 30 seconds, engineers reading for 5 minutes, and leadership-program reviewers.
- **Identity.**
  - Original "Instrument" aesthetic: black, white, electric blue as the signal colour, and crimson as the probe colour.
  - Dark and light modes.
  - No profile picture.
  - No kit-generated look (DESIGN §3–§4, §11).
- **Content scope.** Project case studies, leadership experience, research demonstrations, certifications, an interactive technology stack, a timeline since age 10, and contact.
- **Engineering.** Static HTML first. One signature interaction: GitHub activity, with the Activity Terrain as an enhancement. Accessible and fast. No CMS, database, or auth.

## 2. Stack

The pinned baseline and evidence are in TECHNICAL "Recommended stack". Refresh versions right before creating the lockfile.

| Layer | Decision |
| --- | --- |
| Framework | Next.js 16.4.6 App Router, React 19.3.1, TypeScript 6.0.3, Node 24 (`engines: 24.x`); Cache Components on (starter default) |
| Styling | Tailwind CSS 4.3.5 through the `@tailwindcss/turbopack` loader (starter default), CSS-variable design tokens (§5) |
| Lint | ESLint 9.39.5 with `eslint-config-next` 16.4.6 |
| Controls | Native HTML first. Add individual shadcn/ui primitives only when native elements are insufficient |
| Animation | CSS first. Add `motion` only for a named interaction that CSS cannot do |
| Kokonut UI | **Only** `activity-terrain`. No other kit effects (DESIGN §11) |
| Content | Typed TypeScript modules and JSX pages. MDX is deferred (§11, decision D4) |
| Hosting | Vercel Git integration. GitHub Actions runs the checks only |

## 3. Routes

| Route | Content | Rendering |
| --- | --- | --- |
| `/` | Intro (Brief/Full), Fig. 1 GitHub activity, selected work, leadership highlights, contact | Static shell; the activity boundary renders at request time once enabled (§7) |
| `/work` | All case studies; stack explorer once it qualifies (§8) | Static |
| `/work/[slug]` | Case study in the "Working Paper" style: figures, captions, sidenotes at ≥ 1280 px | Static (`generateStaticParams`, `dynamicParams = false`) |
| `/research`, `/research/[slug]` | Research write-ups and demonstrations | Static; demos are client islands (§6) |
| `/journal`, `/journal/[slug]` | Research and engineering journal from `content/journal.ts` (typed `JournalBlock` bodies, D4). Returns 404 and is not linked while the registry is empty. An empty registry prerenders one placeholder slug that 404s, because Cache Components rejects an empty `generateStaticParams` (2026-11-25) | Static |
| `/lab` | Research lab: educational demonstrations (Monte Carlo GBM, two-asset portfolio risk, OLS regression) on seeded synthetic data. Kept apart from `/research` so demonstrations are never read as findings (2026-11-25) | Static shell; each demo is a client island rendered after mount (`components/lab/client-only.tsx`), because Node and browser floating-point results differ in the last bits and broke hydration |
| `/about` | Leadership, certifications, timeline | Static |
| `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, `not-found.tsx` | Discovery and errors | Static |

Create a route only when its content exists (ROADMAP Phase 0 inventory). Do not ship empty `/research` or `/about` pages.

## 4. Directory structure (end state)

Create files only when their roadmap phase starts.

```
app/
  layout.tsx  globals.css  page.tsx  not-found.tsx  sitemap.ts  robots.ts  opengraph-image.tsx
  work/page.tsx  work/[slug]/page.tsx
  research/page.tsx  research/[slug]/page.tsx
  about/page.tsx
components/
  site/        header.tsx footer.tsx skip-link.tsx copy-email.tsx(client) theme-toggle.tsx(client, Phase 2)
  sections/    intro.tsx project-list.tsx leadership-list.tsx certification-list.tsx timeline.tsx
               activity.tsx (server) activity-grid.tsx (server HTML view) stack-explorer.tsx (client, conditional)
  editorial/   figure.tsx sidenote.tsx metric.tsx meta-row.tsx      # server; used by JSX case studies
  terrain/     terrain-activation.tsx (client wrapper, Phase 4)
  kokonutui/   activity-terrain.tsx (copied registry file, Phase 4)
  demos/       <demo>.tsx (client, one per research demo)
  ui/          shadcn primitives, only as needed
content/
  site.ts stack.ts leadership.ts certifications.ts timeline.ts
  projects.ts research.ts                 # ordered metadata registries
lib/
  types.ts  content.ts  utils.ts
  github/  contributions.ts (server-only: fetch, cache, policy)  validate.ts (pure)  validate.test.ts  __fixtures__/
public/  resume.pdf  fonts/  images/projects/<slug>/
```

Case-study bodies are JSX pages that import `editorial/*` components. They live in `app/work/[slug]/` through a per-slug component map in `content/projects.ts`, or as one file per slug under `content/projects/` once there are more than three. No `src/`, route groups, barrel files, or state folders.

## 5. Design system wiring

The final visual system (tokens, type scale, asymmetric grid, components, motion) is [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md). The summary below stays as the technical contract.

**Tokens.** The source is DESIGN §5.1, defined once in `app/globals.css`.

- Semantic custom properties `--bg`, `--surface`, `--border`, `--text`, `--text-2`, `--text-3`, `--signal`, `--signal-fill`, `--probe`, `--probe-mark`, mapped into Tailwind with `@theme inline`.
- Light values on `:root`. Dark values under the dark selector (§9).
- `--terrain-0…4`, `--terrain-accent`, and `--terrain-text` **must be hex**. The component's `hexToRgb` rejects `oklch()` and `lab()` (TECHNICAL "Customization surface").

**Colour rules** (from DESIGN):

- Blue is the signal colour: links, focus, data.
- Crimson is the probe colour: the inspected item, negative values. It covers less than 2% of any viewport.
- Never distinguish data by blue versus crimson alone, because their luminance is equal.
- Dark `--text-3` is allowed only for large or non-essential text.

**Typography.**

- Families: Switzer (sans) and Commit Mono, self-hosted with `next/font/local`. Switzer uses the official unmodified WOFF2; Commit Mono may be subset. Preload Switzer only.
- Use the type scale from DESIGN §5.2. Apply `tabular-nums` to changing numbers.
- **Licenses (B3 resolved 2026-11-25):** Switzer is under the ITF Free Font License v2.0, which allows self-hosting but **forbids subsetting or format conversion**: ship the official WOFF2 unmodified. Commit Mono is under OFL 1.1, where subsetting is allowed. See DESIGN_SYSTEM §3.1. The system fallback stays in place until the files land.

**Layout.**

- Text measure 640–680 px. Figures up to 960 px. Sidenote column at ≥ 1280 px.
- Spacing on a 4 px base. Breakpoints at 640, 1024, and 1280 px (DESIGN §6).
- No horizontal overflow at 320 px (TECHNICAL acceptance criteria).

**Motion.**

- Durations: micro 120–160 ms, UI state 180–240 ms, layout 280–360 ms.
- Content is visible by default. No scroll reveals or scroll-jacking.
- `prefers-reduced-motion` is honoured site-wide, including when it changes while the page is open.

## 6. Server and client boundaries

| Unit | Runs on | Receives |
| --- | --- | --- |
| Layout, pages, lists, editorial components, `activity-grid` | Server | Imports from `content/` and `lib/content.ts` |
| `sections/activity.tsx` | Server, in `<Suspense>` with a fixed-height fallback | Validated payload from `lib/github/contributions.ts` |
| `copy-email` | Client | `email` |
| `theme-toggle` (Phase 2) | Client | — |
| `stack-explorer` | Client | Public technology labels and categories from the typed registry |
| `terrain-activation` and `activity-terrain` (Phase 4) | Client, loaded only after activation | `{ data, endDate, levels? }`: plain arrays and strings |
| `demos/*` | Client; heavy ones behind "Run demo" via `next/dynamic` | Precomputed JSON props |
| Brief/Full toggle | Server HTML (`<details>`) | — |

Rules:

- Secrets are read only in modules marked `import "server-only"`.
- Client components never import `content/` or `lib/github/`.
- No `NEXT_PUBLIC_` secrets.
- `lib/github/validate.ts` stays pure: no `server-only` import, relative imports only. This keeps it testable with Node's test runner.

## 7. GitHub activity (Fig. 1)

This is the reconciled form of DESIGN §8 and TECHNICAL "GitHub contribution integration" and "Integration decision".

1. **Data.**
   - Server-only GraphQL request for the fixed login (**Blocker B2**).
   - Strict validation (non-negative integers, known level enums, unique consecutive dates, total consistency).
   - Vercel Runtime Cache: fresh for 1 h, last good payload kept for at most 24 h, with cooldown and rate-limit backoff, as specified in TECHNICAL.
   - **No committed snapshot and no third-party fallback.**
2. **Default view: an HTML grid.**
   - `activity-grid.tsx` renders the validated calendar as a server-rendered flat heatmap: CSS grid cells using the terrain colour ramp, real `<time>` labels, and a visually hidden table or monthly summary.
   - The caption follows DESIGN §4, e.g. `Fig. 1 — GitHub contributions · last updated …`.
   - Statistics (total, streaks, busiest weekday) are computed on the server from validated data only.
   - This is the default view when GitHub data is available. The request-time boundary streams the validated HTML into the prerendered homepage. With JavaScript disabled, the static shell offers a GitHub profile link because Next.js needs its stream bootstrap to reveal the dynamic HTML.
3. **Enhancement: Activity Terrain (Phase 4).**
   - A "View as terrain" control loads the Canvas 2D component on demand: zero terrain script before activation.
   - Required edits to the copied file:
     - remove the seeded demo default (make `data` required);
     - add an optional `levels` prop and height compression while keeping raw counts;
     - add a reduced-motion change listener;
     - add Home/End keys;
     - apply site tokens and hex variables;
     - cap DPR at 1.5 on coarse pointers if the mobile frame budget fails.
   - Below 640 px, pass the last 26 weeks or keep the grid.
   - If it fails any gate, ship the grid alone.
4. **Unavailable state.**
   - Shows "GitHub activity unavailable" plus a profile link.
   - Never substitutes zeros, sample data, or estimates for missing data.
   - A verified zero from GitHub is valid data.

## 8. Content model

`lib/types.ts`:

| Type | Fields |
| --- | --- |
| `Project` | `slug, title, summary, role, year, status: 'completed' \| 'in-development', statusNote, stack: StackId[], outcomes: { label, value, source }[], links, featured, caseStudy?` |
| `CaseStudy` | `problem, solution, figures: { src, width, height, alt, caption }[], architecture: { name, detail }[], complexity: string[], decisions: { decision, reason }[]`. Each case-study section renders only when it has content |
| `Research` | `slug, title, abstract, date, stack: StackId[], demo?: 'static' \| 'interactive'` |
| `Leadership` | `org, role, start, end?, summary, outcomes: string[], link?` |
| `Certification` | `name, issuer, issued, expires?, verifyUrl` (link to the issuer's verification page; no badge walls) |
| `StackId` | `keyof typeof stack` from `content/stack.ts` (`label, category`) |
| `TimelineEntry` | `year, title, detail?` |

- Registries are ordered arrays checked with `satisfies`. An unknown `StackId` or a duplicate slug fails `next build` or the unit tests.
- Every outcome number must trace to a source (DESIGN §11.9).
- **Case-study evidence (2026-11-25).** Every case-study fact traces to the project's own repository or documents. Figures are real captures stored in `public/work/`, and each caption says how the capture was made, including any missing live data. `lib/content.test.ts` fails when a project lacks a status note, an outcome lacks a source, or a figure file is missing.
- **Case-study route.** `/work/[slug]` sets `instant = false`: real slugs are prerendered, and Cache Components rejects `dynamicParams`. Known limit: the first request for an unlisted slug streams the not-found page with HTTP 200, and later requests return 404.
- **Interactive stack.** Each project's metadata row shows its stack from day one. The requested homepage technology explorer filters the portfolio’s actual stack by category. Controls use `aria-pressed` and announce the result count. Without JavaScript the full list is visible. A separate project filter still waits for six projects.

### Research lab maths (2026-11-25)

- `lib/lab/` holds pure, tested maths: a seeded mulberry32 generator with Box–Muller normals, exact-discretisation GBM, two-asset moments with normal and simulated 95% VaR and expected shortfall, and OLS with a normal-approximation 95% interval (n ≥ 30). `lib/lab/lab.test.ts` checks the closed forms, determinism, and 95% interval coverage.
- Charts are hand-written SVG drawn at their measured pixel width (`components/lab/plot.tsx`), with no chart dependency. Controls are native range inputs. Parameter changes use `useDeferredValue`, so dragging stays responsive.

### Credibility content (2026-11-25)

- `CaseStudy.flows` drives the architecture diagram (`components/editorial/architecture-diagram.tsx`, layout in `lib/diagram.ts`: rows by longest path to a sink, one barycentre ordering pass, numbered callouts keyed to a list). `Project.repository` holds hand-checked repository facts with a `checked` date; no runtime GitHub calls.
- `Site.email` (published at the owner's request), `Site.links` (GitHub, LinkedIn), and an optional `Site.resume` PDF drive the contact section and the command palette. `lib/content.test.ts` checks email format, https links, and that a listed résumé file exists.

### Command palette (2026-11-25)

- Requested by the user, which overrides the earlier "no command palette" note. The palette is a client island loaded with `next/dynamic` on first open, so pages pay only for the trigger. Items come from `content/`; matching is substring-per-word in `lib/palette.ts` with no dependency. `setTheme` is exported from `components/site/theme-toggle.tsx`, so the toggle and the palette share one writer.
- No terminal: the DESIGN_SYSTEM §1 ban stands (user choice, 2026-11-25).

## 9. Theme switching

**Implemented 2026-11-25 (D18).** Three states: System (default), Light, Dark.

- **State.** `<html data-theme="system|light|dark">`. Light and Dark persist in `localStorage["theme"]`; choosing System removes the key. Unknown stored values mean System (`lib/theme.ts` `parseTheme`).
- **No flash.** `THEME_SCRIPT` (`lib/theme.ts`) is an inline `<script>` in the root layout's `<head>`. It sets `data-theme` before the body parses. `<html suppressHydrationWarning>` covers only that attribute. The CSP keeps `'unsafe-inline'` for it (§10).
- **Colours.** Tokens in `app/globals.css` are `light-dark(<light>, <dark>)`. `:root` has `color-scheme: light dark`, which follows the OS live; `[data-theme=light|dark]` pins `color-scheme`. Native controls and scrollbars follow too. The terrain resolves each semantic token through computed element colour before converting it to a canvas RGB value. Theme and system appearance changes repaint the canvas.
- **No JavaScript.** No attribute is set, so the page follows the OS. The toggle stays `invisible` (keeping its space) because it can't work.
- **Tailwind `dark:`.** A custom variant matches `[data-theme=dark]`, or the OS dark setting when the theme isn't pinned. Components should prefer the semantic tokens over `dark:`.
- **Toggle.** `components/site/theme-toggle.tsx` (client) is a `fieldset` of three native radios (arrow keys, announced checked state). The selected style comes from `<html data-theme>` through CSS, so it's correct before hydration. React owns `checked` through `useSyncExternalStore`, with a `null` server snapshot so hydration matches. A `storage` listener syncs other tabs. If storage is blocked, the choice applies to the current page view only.
- **Not used:** `next-themes`. It adds a provider and a client-rendered script for what is about 40 lines here.

## 10. Quality gates

**Performance.** TECHNICAL thresholds are the release gates. DESIGN numbers are internal targets.

| Metric | Gate (blocks release) | Target |
| --- | --- | --- |
| Initial JS, compressed, cold home | ≤ 200 KiB | ≤ 150 KiB |
| Total home transfer | — | ≤ 500 KiB |
| LCP / CLS (lab, mobile, median of 3) | ≤ 2.5 s / ≤ 0.10 | < 2.0 s / < 0.05 |
| TBT (lab) | ≤ 200 ms | — |
| Field LCP / INP / CLS (p75) | ≤ 2.5 s / ≤ 200 ms / ≤ 0.10, pending until traffic exists | — |
| Terrain or demo assets before activation | 0 | 0 |
| Web fonts | ≤ 2 families | ≤ 120 KiB |

**Accessibility.**

- WCAG 2.2 AA, with axe on every route in both themes; any violation fails CI.
- Plus the manual protocol (keyboard walk, two screen readers, reduced motion, contrast).
- One `<h1>` per page. Skip link. Visible `:focus-visible` ring in `--signal`.
- Touch targets ≥ 24 px minimum (WCAG), 44 px for primary controls.
- External links announce "(opens in new tab)".

**Security.**

- CSP with `'unsafe-inline'` scripts (documented trade-off: static rendering, no user input), `nosniff`, `strict-origin-when-cross-origin`, a restrictive `Permissions-Policy`, and host-only HSTS once the domain is final.
- SHA-pinned actions with read-only permissions. Dependabot. Secret scanning with push protection.

**Environment variables.**

- `GITHUB_CONTRIBUTIONS_TOKEN`: Production Secret only.
- `NEXT_PUBLIC_SITE_URL`: canonical origin in every environment.
- `VERCEL_ENV`: drives `noindex` on previews.
- CI has no secrets.

**Testing.**

- Unit tests for `lib/github/validate.ts` and `lib/content.ts` with Node's built-in test runner, plus `--experimental-test-coverage` for **≥ 80% line coverage on `lib/`** (decision D5).
- Playwright (Chromium desktop and one mobile project) plus axe against a local production build.
- Production smoke checks against the canonical origin.
- Lighthouse stays manual at release.

## 11. Contradictions resolved

| # | Contradiction | DESIGN said | TECHNICAL said | Resolution |
| --- | --- | --- | --- | --- |
| D1 | GitHub fallback | Committed JSON snapshot on failure (§8.4, §10) | No snapshot; bounded 24 h last-good cache, otherwise unavailable | **TECHNICAL.** A stale committed snapshot misrepresents current activity. |
| D2 | Terrain role | Signature hero, "Must" priority | Optional Phase 4, behind activation, ship HTML alone if it fails gates | **Both:** the verified HTML grid is the default view when data is available. The terrain is an activated enhancement (§7). |
| D3 | Theme toggle | Three-state toggle, "Must" | System preference first; a persistent toggle only if required | **Yes** (user request, 2026-11-25). Three-state toggle implemented (§9, D18). |
| D4 | Case-study format | MDX with figures and sidenotes | Typed content and JSX; MDX only when multiple long-form pages need it | **TECHNICAL.** Editorial components work in JSX. Revisit MDX after 3 long-form case studies exist. |
| D5 | Unit tests and coverage | — (global rules: 80% coverage) | Node test runner preferred; skip coverage tooling | Node test runner with its built-in coverage, ≥ 80% on `lib/` only. Meets the global rule with no new dependency. Switch to Vitest if the Node runner's constraints (explicit `.ts` imports, no path aliases) become friction. |
| D6 | Performance numbers | 150 KB JS, 500 KB total, LCP < 2.0 s, CLS < 0.05 | 200 KiB JS, LCP ≤ 2.5 s, CLS ≤ 0.10 | TECHNICAL numbers gate releases; DESIGN numbers are targets (§10). |
| D7 | Kokonut usage | Terrain only; avoid effect kits | "A small number of distinctive effects" | **DESIGN.** `activity-terrain` only. |
| D8 | Motion library | CSS first | Listed in the baseline stack | Motion is installed at the user’s request. Use it only when a named interaction needs it. |
| D9 | Stack presentation | Avoid chip walls; stack in project metadata | Interactive stack explorer | Keep metadata rows and the requested technology category filter. A project filter waits for six projects (§8). |
| D10 | Terrain DPR | Component caps at 2 | Mobile budget suggests 1.5 | Keep 2; drop to 1.5 on coarse pointers only if the device frame budget fails. |
| D11 | Depth toggle | Animated Brief/Full | No-JS `<details>` | `<details>`, with CSS height animation as progressive enhancement; instant under reduced motion. |
| D12 | TypeScript version | — | TypeScript 7.0.2 baseline | **TypeScript 6.0.3.** `typescript-eslint` 8.74 (used by `eslint-config-next`) supports `typescript <6.1.0`, so TypeScript 7 breaks linting. Revisit when `typescript-eslint` supports 7. |
| D13 | ESLint version | — | ESLint CLI (latest 10.x) | **ESLint 9.39.5.** `eslint-plugin-react`, `-import`, and `-jsx-a11y` declare peers up to ESLint 9, and ESLint 10 needs npm peer overrides. npm marks 9.39.5 as deprecated: upgrade once `eslint-config-next`'s plugins support 10. |
| D14 | shadcn init output | — | Primitives only as needed | Kept `components.json`, `lib/utils.ts` (re-exports `cn` from shadcn's `cn` package), `shadcn` for build-time CSS. Removed unused `tw-animate-css` and the sample `button.tsx` and its unused dependencies. Removed the Geist Google font that init added (system fonts until B3). Dark variant uses `prefers-color-scheme` (§9). Neutral shadcn tokens are placeholders until the Phase 1 design-token step. |
| D15 | Foundations scope | — | — | `Outcome.source` is required, not optional, so every figure stays traceable (DESIGN §11.9). `timeline.ts` and the terrain adapter are deferred until a phase needs them. Phase 3 uses Vercel Runtime Cache for validated data, cooldowns, and a 24 h last-good limit. The upstream request stays uncached. Tests run on Node's runner with `--conditions=react-server`, so `server-only` modules load. `tsconfig` sets `allowImportingTsExtensions` and `erasableSyntaxOnly` so `lib/` runs under Node type stripping. |
| D16 | Security baseline | — | — | **Secrets:** `lib/env.ts` (`server-only`) is the only reader of secrets. ESLint `no-restricted-properties` blocks `process.env` everywhere else except config and scripts. The GitHub token must match the fine-grained format (`github_pat_…`); otherwise it is ignored and the widget shows unavailable. **Leak scan:** `postbuild` runs `scripts/check-secrets.mjs` over `.next/static` and prerendered HTML/RSC for token patterns and the configured token value, so Vercel builds fail on a leak. **Headers** (`next.config.ts`): CSP (`'unsafe-inline'` scripts for static rendering; `'unsafe-eval'` in dev only), `nosniff`, `strict-origin-when-cross-origin`, a restrictive `Permissions-Policy`, `X-Robots-Tag: noindex` unless `VERCEL_ENV=production`, and `poweredByHeader: false`. HSTS waits for the final domain (B4). **Personal data:** no analytics, forms, cookies, third-party origins, or web-font requests; CSP `connect-src 'self'` blocks beacons. Server logs carry failure metadata only. **Dependencies:** `shadcn` is a dev dependency for build-time CSS. Unused `tw-animate-css` was removed. |
| D17 | Visual system | DESIGN §4–§7: centred text measure, "Instrument" | — | **DESIGN_SYSTEM.md ("Datum") wins on visuals.** Asymmetric left-anchored 12-column grid (rail, main, margin, bleed), datum lines, hanging mono index numerals, margin readout, probe-red selection and current markers, 2 px maximum radius, CSS-only motion with nothing on load; the scroll-linked effects are the CSS datum-line draw and the project screen gallery (2026-11-26, DESIGN_SYSTEM §7). Adds `--rule`, `--rule-strong`, and `--control` tokens; control borders are `#8A8A93` (light) and `#71717A` (dark) to meet 3:1. |
| D18 | Theme mechanism | — | `next-themes` with a class attribute | **Inline head script plus `data-theme` and `light-dark()` tokens** (§9). No dependency, no flash, works without JavaScript, and one palette definition instead of duplicated dark blocks. |
| D19 | Motion primitives | — | CSS only; `motion` only for a named interaction | **Interaction-only primitives** in `components/motion/primitives.tsx`: `Presence` (enter and exit after an action), `StaggerList`/`StaggerItem` (filtered lists: capped 30 ms stagger with a 150 ms maximum, survivors slide via layout), `LayoutBox` (own size or position change). The homepage stack filter reflowed its rows with `StaggerList` from 2026-11-26 until D22 (2026-11-27) replaced the rows with a grid that filters through a View Transition. The primitives now appear only in the development showcase, and no production page loads Motion. `AnimatePresence initial={false}` makes first-render entrances impossible, so Motion animates nothing on load or scroll and server HTML is final without JavaScript. Springs (`lib/motion.ts`) settle in 140, 240 and 300 ms, with bounce at most 0.1. Reduced motion makes every change instant and is tracked live. `LazyMotion` plus `m` loads about 40 KB gzipped only on pages that render a primitive. Hover, press (`press`), the rail probe glide, View Transitions and the diagram trace are CSS. Hover utilities are `hover-nudge`, `hover-datum`, and `hover-underline` in `globals.css`. No `whileInView`; the only scroll-linked effects are the CSS datum-line draw and the project screen gallery drift (DESIGN_SYSTEM §7), neither using Motion. |
| D20 | Hero visual | — | — | **React Bits Floating Lines** (free registry, MIT + Commons Clause, `components/reactbits/`) as a full-height vertical braid in the right 58% of the hero from lg, beside a two-line display name, and in a band below the links under lg (owner requests 2026-11-27). This is the one ambient animation on load, an owner-approved exception to D19's no-load-motion rule. It degrades to a server-rendered SVG of the same waves: no JavaScript, reduced motion, no WebGL2, a software renderer, low core count, Data Saver, or under 30 fps. The WebGL chunk loads only at idle time. The layer is `aria-hidden` with `pointer-events: none`. Details: HANDOFF, Hero Floating Lines. |
| D21 | Hero entrance | — | React Bits Split Text (registry `SplitText-TS-TW`) | **CSS character rise** (owner decision 2026-11-27), a second owner-approved exception to D19's no-load-motion rule. The official Split Text needs `gsap` and `@gsap/react`, plus the ScrollTrigger and SplitText plugins: a second animation engine and about 45–50 KB gzipped on the homepage. It also hides the name until hydration. Instead, `app/page.tsx` renders each name character as a span. `globals.css` (Hero entrance) raises them 0.22em with a 40 ms stagger over 0.8 s. The role line, readout, introduction and links, and the lines then fade in from 0.2 opacity, for about 1.5 s in all. No React Bits code is used, so no licence notice applies. The fades start at 0.2, not 0, because a transparent introduction delayed mobile LCP from 1.2 s to 3.3 s. The entrance plays once per tab session (`lib/hero-entrance.ts`, a head script plus HeroLines) and never under reduced motion. The h1 keeps its accessible name through `aria-label`. Details: HANDOFF, Hero entrance. |
| D22 | Stack inventory | — | Rows with visible project links | **React Bits Chroma Grid** (free registry `ChromaGrid-TS-TW`, no npm dependencies, MIT + Commons Clause, adapted in `components/reactbits/chroma-grid.tsx`), owner request 2026-11-27. Logo tiles are grayscale at rest, and the brand colour shows within a pointer- or focus-driven spotlight. That spotlight is written as CSS variables from one rAF loop, so React does not re-render. Logos: Devicon v2.16.0, served locally. Entries Devicon lacks (owner decision) show their name. Project associations are on each tile's accessible description and in one detail line under the grid, which keeps real links (owner decision over tooltips, which cannot hold links). The grid is one tab stop, and arrows, Home and End move between tiles. Filters switch through a same-document View Transition, instant without support or under reduced motion. Columns follow the container width: 2, 3, 4, 6 and 8 at 18, 28, 40 and 52rem. Details: HANDOFF, Stack Chroma Grid. |
| D23 | Selected work | — | Skiper 16-style pinned panels; then a fan row (2026-11-27 morning) | **Numbered exhibition panels** (owner request 2026-11-27, variation A of three rendered and compared). Each panel has an oversized outline number and title, the summary, status, role and year, compact technology tags, and one prominent "Read the case study" text-roll link whose hit area covers the panel. Real screens take seven of twelve columns: the lead in slight perspective with up to two more overlapping it, which spread on hover or focus (after React Bits Bounce Cards). Phone screens stand in a row. Each panel's `--accent` is sampled from the project's own interface (`workAccents` in `content/gallery.ts`); Rotation Index shows real captures of its dashboard and estimates table, taken after a full season download, audit and model fit. From 1024 × 600 px, with scroll timelines and no reduced-motion preference, panels pin; the covered panel recedes with perspective, rotation and fade (after Skiper 17), and incoming screens reveal from below (after Skiper 34). Every effect is scrubbed by CSS scroll timelines, so it reverses on the way up with no scroll hijacking. Pinning needs every panel to fit the viewport, or the next panel would hide the link for good, and a smoke test measures this. No Skiper or React Bits code is used (Skiper needs `gsap`, `lenis` and `framer-motion`). There is no Magnet component in the codebase, so none was applied. A Closer Look was removed (D24). Details: HANDOFF, Selected work exhibition. |
| D24 | A Closer Look | — | Skiper 30 parallax gallery, then a captioned exhibition | **Removed** (owner request 2026-11-27). The homepage goes from Selected work straight to Tech Stack. `ParallaxGallery` remains for case-study galleries. Selected work's screens are unchanged. |
| D25 | Magnetic links | — | — | **React Bits Magnet** (free registry `Magnet-TS-TW`, no dependencies, adapted in `components/reactbits/magnet.tsx`), owner request 2026-11-27. Five placements only: the hero CTA, each Selected work case-study link, case-study project links, the contact email and the footer email. Not on navigation or technology tiles. Settings: 50 px reach, 12 px cap, critically damped spring (about 450 ms settle). Off for touch and reduced motion. Spans, so it can sit in paragraphs. Selected work's panel-wide target is a separate hidden link, because a transformed ancestor would trap a stretched pseudo-element. Details: HANDOFF, Magnet links. |
| D26 | Decrypted labels | — | React Bits Decrypted Text (needs motion@^12) | **Site-specific `DecryptedText`** (`components/ui/decrypted-text.tsx`), owner request 2026-11-27. A once-on-view, left-to-right scramble of under 800 ms on short technical labels only: section numbers, Selected work numbers and statuses, case-study metadata labels, and Activity stat labels. Drawn with a `data-scramble` `::after` overlay, so the real text node, width and accessible name never change. Off under reduced motion. Details: HANDOFF, Decrypted labels. |

## 12. Blockers

| ID | Blocker | Blocks | Owner action |
| --- | --- | --- | --- |
| B1 | **Approved content does not exist yet**: project list and case-study facts, outcome numbers with sources, leadership roles, certifications with verification URLs, research write-ups and demo data, timeline facts, résumé PDF, intro copy, availability line | Phase 1 launch (scaffolding can start) | Rohin supplies a content inventory (ROADMAP Phase 0) |
| B2 | **Live GitHub access unverified.** The user confirmed `RohinCodes15`. Signed-out visibility and the production credential remain unverified | Live public data | Configure a fine-grained Production Secret and confirm the API output matches the approved public view |
| B3 | **Resolved 2026-11-25.** Both licenses allow self-hosting. Condition: Switzer must not be subset or converted (DESIGN_SYSTEM §3.1) | — | Download the official files when implementing tokens |
| B4 | **Canonical domain not chosen** | Canonicals, HSTS, Search Console, public launch | Choose and register the domain |
| B5 | **Hosting and repository settings unconfirmed**: Vercel plan (Hobby is personal, noncommercial use), preview protection, dependency-review and CodeQL eligibility, deployment events | Making those checks mandatory | Confirm before enabling them as required gates |
| B6 | **No device evidence** for terrain touch, frame pacing, or the screen-reader flow | Phase 4 only | Test on a physical midrange Android and iOS Safari |
| B7 | **Resolved for the current foundation.** A production build passed on Node 24 | — | Reverify after frontend work |
| B8 | **Resolved 2026-11-25.** The user asked for the toggle (D3 yes) | — | — |
