# Design Research — Rohin Pidathala Personal Site

Research date: 2026-11-25
Status: research only. No app scaffolded, no dependencies installed.

---

## 0. Method, evidence labels, access report

### How the research was done

- Each reference was loaded in Chrome (DevTools protocol, isolated profile) at **1440×900, DPR 2**.
- A probe script on every page read: computed typography (family, size, weight, line-height, tracking), page and text colors, loaded web fonts, heading outline, framework fingerprints, counts of canvas/video/SVG elements, running CSS animations and transitions, `prefers-reduced-motion` and `prefers-color-scheme` rules in readable stylesheets, skip links, DOM size, and transferred bytes.
- A viewport screenshot was taken of each site. Rauno's site was also scrolled to test its scroll behavior.
- Mobile behavior was checked at **390×844 (mobile + touch emulation)** on two portfolios with very different layouts: brittanychiang.com and rauno.me.
- The Kokonut UI Activity Terrain source was downloaded from its public registry entry (`https://kokonutui.com/r/activity-terrain.json`) and read in full. It was **not** installed.
- The GitHub GraphQL contribution schema was checked with schema introspection and two test queries against the public `octocat` account.

### Evidence labels used throughout

| Label | Meaning |
|---|---|
| **[V]** | Verified this session: measured in the browser, read in source, or returned by an API. |
| **[A]** | Assumption or inference: a reasoned guess that was not directly measured. |
| **[K]** | Prior knowledge: believed correct but not re-checked this session. |

### Measurement caveats

- Transfer sizes are **lower bounds**. Browsers report `transferSize = 0` for cached resources and for cross-origin resources without `Timing-Allow-Origin`. Linear reported 0 KB of JS for this reason.
- LCP was not captured. Buffered LCP entries were not exposed to the probe. No Core Web Vitals claims below come from this session.
- Hover, drag, and click interactions were **not** exercised, except scrolling on rauno.me. Hover effects are described from computed `transition` values only.
- Several sites rendered in dark mode, likely because they follow the OS color scheme **[A]**.
- Three sites showed Black Friday promotions on the research date. Those are temporary and not part of their design systems.

### Access report

| Site | Result |
|---|---|
| rauno.me, brittanychiang.com, emilkowal.ski, leerob.com, paco.me, joshwcomeau.com, rishaan.cc, linear.app, kokonutui.com, motion.dev, magicui.design, ui.aceternity.com, ui.shadcn.com | Loaded and probed. |
| **bruno-simon.com** | **Not accessible.** Chrome hit a 30 s navigation timeout, then `net::ERR_CONNECTION_TIMED_OUT` on a 60 s retry. `curl` also timed out after 20 s. The analysis below uses the site's public source repo (`github.com/brunosimon/folio-2025`, `package.json` read via the GitHub API **[V]**) plus prior knowledge **[K]**. |

---

## 1. Reference website analysis

### 1.1 rauno.me — Rauno Freiberg

- **Layout [V]:** a horizontal gallery of large white cards on a light grey page (`#EDEDED`). On desktop, vertical scroll drives horizontal movement: after scrolling 1800 px, the gallery track had `transform: translateX(-1800px) scale(0.6)`. Page height was 5884 px for a 900 px viewport.
- **Mobile [V]:** scroll-jacking is dropped. Page height equals the viewport, and the gallery overflows horizontally for native swiping.
- **Typography [V]:** a single custom grotesk (exposed under the alias `X`). The H1 is 32 px, weight 500, on a 579 px measure. Lines of the hero statement alternate between flush and indented (visual).
- **Details [V, visual]:** a row of tick marks at the top works as a position indicator. Inside one card, a crosshair marker sits at the pointer position. Each card's content is one oversized glyph or icon ("D", "Craft", a pixel hand cursor).
- **Engineering [V]:** Next.js, 134 DOM nodes, about 639 KB transferred, 569 KB of it JS. No `prefers-reduced-motion` rules in readable stylesheets (it may be handled in JS **[A]**). No skip link.
- **Takeaway:** extreme restraint around one strong interaction idea. The interaction is the identity, which is why copying the mechanic would read as a clone.

### 1.2 brittanychiang.com — Brittany Chiang

- **Layout [V]:** a two-column split. On desktop the left column (name, role, one-line pitch, section nav, social icons) is `lg:sticky`, and the right column scrolls.
- **Mobile [V]:** the nav is hidden (`display: none`) and the section labels become sticky headers instead (`ABOUT`, `EXPERIENCE`, `PROJECTS`, `WRITING`). There is no horizontal overflow.
- **Typography [V]:** Inter via `next/font`. H1 48/48 px at 700 with −1.2 px tracking (about −0.025em). Body 16/24 px.
- **Color [V]:** slate scale. Background `#0F172A`, body text `#94A3B8`, headings `#E2E8F0`.
- **Signature [V]:** a fixed overlay with `radial-gradient(600px circle at <x> <y>, rgba(29,78,216,0.15), …)`, a pointer-following spotlight. The active nav item shows as a longer rule plus a brighter label (visual).
- **Content pattern [V]:** experience rows with a small-caps date column (`2024 — PRESENT`) and a title with ↗.
- **Accessibility [V]:** skip link present, 3 reduced-motion rules. Color transitions use 150 ms `cubic-bezier(0.4, 0, 0.2, 1)`.
- **Takeaway:** persistent wayfinding and scannable experience rows. The spotlight is her signature and has been widely copied, so avoid it.

### 1.3 emilkowal.ski — Emil Kowalski

- **Layout [V]:** a single narrow column (about 600 px), very generous vertical whitespace, 69 DOM nodes.
- **Typography [V]:** one sans family (aliased `Sans`) at **14 px / 23.1 px (1.65)**. Hierarchy comes entirely from two tones: primary `#21201C` and grey secondary text. There are no size jumps.
- **Color [V]:** warm off-white `#FDFDFC`, not pure white. A class-based dark mode exists (76 `.dark` selectors, 2 color-scheme media rules).
- **Semantics [V]:** **no `<h1>` and no headings in the DOM.** Section titles are styled text. This is an accessibility gap.
- **Takeaway:** hierarchy without size, warm neutrals, and the confidence to show very little. It is famous for motion craft, yet the homepage has 0 running animations and 0 transitions. Motion is saved for where it earns its place.

### 1.4 leerob.com — Lee Robinson

- **Typography [V]:** **Iowan Old Style loaded as a local system font**, so no web-font download. H1 42.4 px at 600 with −0.02em tracking. Body 17/27.2 px (1.6). Measure is 600 px.
- **Color [V]:** warm near-black `#1B1A19` with warm off-white text `#E8E5DF`. Links use a soft underline.
- **Pattern [V]:** a **"Bio: Default / Long" tab toggle** that lets the reader choose depth. Notes are a two-column list of short essay links. A single large illustration sits on the right.
- **Engineering [V]:** Next.js, 46 `:root` custom properties, 2 reduced-motion rules.
- **Takeaway:** the depth toggle is a strong pattern for audiences with different time budgets, such as recruiters vs. engineers. Warm neutrals and a serif signal "writer". A system font stack costs nothing to load.

### 1.5 paco.me — Paco Coursey

- **Layout [V]:** a 640 px column. The intro paragraph is followed by a **three-column index** (Building / Projects / Writing) with small grey labels, underlined titles, and grey one-line descriptions.
- **Typography [V]:** Söhne for text and Inter for the H1, both 16/28 px (1.75). One italic serif phrase uses Newsreader as an accent.
- **Microinteraction [V]:** links transition `text-decoration-color 0.24s`. External links carry a small ↗.
- **Color [V]:** `#1A1A1A` background, `#E5E5E5` text, `#A0A0A0` secondary.
- **Takeaway:** an index layout lets you take in the whole body of work in one glance. The underline-color transition is the quietest possible hover. The italic-serif accent is now a widely copied move.

### 1.6 joshwcomeau.com — Josh W. Comeau

- **Typography [V]:** custom Wotfard (sans) plus Cartograph CF (mono). Body 18/27 px. Section headings are uppercase with 2 px tracking in hot pink `#FF1A81`.
- **Color [V]:** deep navy `#111B27`. Rainbow and yellow illustration accents, plus a 3D mascot.
- **Interaction [V, visual]:** header controls for search, a **sound on/off toggle**, a theme toggle, and RSS. There is one canvas (the animated rainbow).
- **Accessibility [V]:** **27 reduced-motion rules**, the most of any personal site tested. Skip link present. A **visually hidden H1** ("Josh W Comeau homepage", rendered 1 px wide), which keeps the outline correct without showing a title. Links announce "(opens in new tab)".
- **Takeaway:** playful but rigorously accessible. Opt-in sound and thorough reduced-motion handling are worth borrowing. The whimsical art direction is not.

### 1.7 bruno-simon.com — Bruno Simon (not accessible; see §0)

- **Stack [V, from repo `package.json`]:** `three` 0.187, `@dimforge/rapier3d` (WASM physics), `gsap`, `howler` (audio), `camera-controls`, `@gltf-transform/*` (3D asset compression), `tweakpane` (debug UI), and Vite 8 with `vite-plugin-wasm`. Last push 2026-11-04.
- **Experience [K]:** the portfolio is a drivable 3D world. You steer a vehicle through the scene to reach projects.
- **Takeaway:** a portfolio can be the proof of skill. But the cost is a heavy first load (which also stopped this session from reaching it), poor scannability for time-pressed reviewers, and difficult accessibility. One small, real, interactive artifact gets most of the "this person can build" signal without these costs.

### 1.8 rishaan.cc — Rishaan Jain

- **Layout [V]:** a 704 px column. Top row of links, H1 "hey, i'm rishaan" (lowercase voice), then an italic serif subtitle.
- **Typography [V]:** Geist + Geist Mono + Caveat. H1 36 px at 600 with **−0.05em** tracking. Body 14/22.75 px with −3% tracking.
- **Components [V, visual]:**
  - An **`ssh` command with a copy button** ("or open in terminal").
  - A **2D GitHub contribution heatmap** in orange ("1541 contributions in 2026").
  - Tech-stack chips grouped by category.
  - A floating light/dark/system toggle on the left edge.
  - A "hire me $RISH ▼0.12%" stock-ticker joke pill on the right.
  - A faint background grid with a blue radial glow.
- **Engineering [V]:**
  - Content below the stack section was **blank in a full-page capture**. 380 elements carry inline transforms, which points to scroll-triggered reveals: content stays hidden until it scrolls into view **[A]**.
  - **About 6,072 KB transferred**, mostly images, the heaviest page tested.
  - 0 reduced-motion rules found.
- **Takeaway:** the closest peer (student developer). It shows that a contribution heatmap plus stack chips is fast becoming the standard student-portfolio kit. Rohin's terrain has to go further than this to stand out (see §8).

### 1.9 linear.app — Linear

- **Typography [V]:** Inter Variable at **weight 510** (fine-tuned variable weight), plus Berkeley Mono. H1 64/64 px with −1.408 px tracking (−0.022em). H2 48/48 px. Body 15/24 px with −0.165 px tracking.
- **Color [V]:** background `#08090A`, primary text `#F7F8F8`, secondary `#8A8F98`. Section headings mix white and grey within one sentence, so emphasis comes from tone, not weight.
- **Content [V]:** the product UI in the hero is **live DOM, not a screenshot** (231 SVGs, 4,538 nodes).
- **Accessibility [V]:** skip link and **49 reduced-motion rules**. Link transitions use `filter 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94)`.
- **Takeaway:** a tight type system (one family, precise weights, negative tracking at display sizes only) and near-black with cool greys. Showing real product UI beats mock-ups.

### 1.10 kokonutui.com — Kokonut UI

- **Visual system [V]:** pure black `#000` with Geist + Geist Mono. Hero H1 112 px with line-height 0.9 and −0.06em tracking. Docs navigation uses mono item codes (`CD-10 Activity Terrain`).
- **Activity Terrain demo [V]:** a card with title, readout ("402 contributions in the last 26 weeks"), a Flat/Terrain segmented toggle, an isometric canvas of extruded columns, and a Less→More legend. The docs say "no extra packages". Full analysis in §8.
- **Takeaway:** mono catalogue codes are a nice engineering touch. The terrain itself is the reason this library is in scope.

### 1.11 motion.dev — Motion

- **Visual system [V]:** colors defined in **OKLCH**, with a dark green-black background `#0E1312`. TASA Orbiter for display and Geist Mono for nav labels (uppercase, tracked). Buttons are square-cornered. A canvas renders a particle sphere, and there are 5 videos.
- **Pattern [V]:** an install command (`npm install motion && npx motion-ai`) in a copyable field next to the main CTA. 23 reduced-motion rules.
- **Takeaway:** OKLCH tokens for perceptually even palettes. Copyable commands make the product tangible. Library choice: Motion (formerly Framer Motion) is the standard React animation library **[K]**. Use it only where CSS can't do the job (§7).

### 1.12 magicui.design — Magic UI

- **Visual system [V]:** white background, Geist. H1 72/72 px with −0.05em tracking. Announcement banner, "Introducing …" pill above a centred hero, CTA buttons with rainbow glow, ⌘K search, GitHub star count.
- **Takeaway:** this is the canonical "AI-generated landing page" composition. It is useful as a catalogue of effects, and it is exactly what this site must not look like (§11).

### 1.13 ui.aceternity.com — Aceternity UI

- **Visual system [V]:** black background, local sans, OKLCH neutrals. Changelog pill, left-aligned hero, a blue glow CTA, an avatar stack with star rating, and a wall of 112 images. About 1.3 MB across 250 requests.
- **Takeaway:** effect-first components (beams, spotlights, 3D cards) are recognisable at a glance. Using them signals "assembled from a kit", the opposite of the goal.

### 1.14 ui.shadcn.com — shadcn/ui

- **Visual system [V]:** Geist. Semantic tokens on `:root` in `lab()` (`--background`, `--foreground`, `--primary`, `--muted-foreground`, `--border` as 10%-alpha white, `--ring`) and `--radius: .625rem`. The hero shows a grid of real components instead of marketing art.
- **Engineering [K]:** copy-in source (you own the code) and a CLI registry system. This is how the Activity Terrain gets installed.
- **Takeaway:** use shadcn's **token architecture and CLI**, not its default look (Geist + zinc + 10 px radius). Left as-is, that look is now generic.

### 1.15 Cross-site comparison (measured)

| Site | Body size / line-height | Measure | Background | Families loaded | Reduced-motion rules | Skip link |
|---|---|---|---|---|---|---|
| rauno.me | 16 px / normal | n/a (cards) | `#EDEDED` | 1 | 0 | no |
| brittanychiang.com | 16 / 24 | ~560 px right col | `#0F172A` | 1 | 3 | yes |
| emilkowal.ski | 14 / 23.1 | ~600 px | `#FDFDFC` | 1 | 1 | no |
| leerob.com | 17 / 27.2 | 600 px | `#1B1A19` | 1 (local) | 2 | no |
| paco.me | 16 / 28 | 640 px | `#1A1A1A` | 3 | 1 | no |
| joshwcomeau.com | 18 / 27 | ~555 px | `#111B27` | 2 | 27 | yes |
| rishaan.cc | 14 / 22.75 | 704 px | ≈`#0A0A0A` | 3 | 0 | no |
| linear.app | 15 / 24 | n/a | `#08090A` | 2 | 49 | yes |

All eight personal or product sites above are built on Next.js (`/_next/` scripts detected) **[V]**.

---

## 2. Strongest transferable principles

1. **One signature, everything else quiet.** Rauno has the scroll gallery, Brittany the spotlight, Josh the playground, Bruno the world. Each site has exactly one memorable mechanic. The rest is restrained typography. **Apply:** the Activity Terrain is the one signature, so nothing else competes with it.
2. **Hierarchy through tone, not size.** Emil (two tones at one size), Linear (white and grey in one sentence), and Paco (grey labels) all do this **[V]**. **Apply:** use three text tones and few sizes.
3. **A reading measure of 600–700 px.** Every text-led portfolio lands between about 555 and 704 px **[V]**. **Apply:** a 640–680 px text column, with figures allowed to break out wider.
4. **Generous line-height for body text, tight for display.** Body runs 1.5–1.75 and display 0.9–1.1, with negative tracking only at large sizes **[V]**.
5. **Persistent wayfinding.** Brittany's sticky index (desktop) collapsing to sticky section labels (mobile) is a responsive pattern worth adapting **[V]**.
6. **Progressive disclosure for mixed audiences.** Lee's Default/Long bio **[V]**. **Apply:** a Brief/Full depth toggle that serves a 30-second recruiter scan and a 5-minute engineer read.
7. **Show real artefacts, not pictures of them.** Linear's live-DOM product UI and shadcn's live component grid **[V]**. **Apply:** real GitHub data, real charts from real research, real code.
8. **Mono as a second voice for metadata.** Kokonut's `CD-10` codes, Motion's mono nav, and Linear's Berkeley Mono **[V]**. **Apply:** dates, counts, units, and IDs in mono with tabular figures.
9. **Accessibility as craft.** Josh and Linear show that the most polished sites also have the most reduced-motion handling (27 and 49 rules) **[V]**. Polish and accessibility are not in tension.
10. **Respect the platform on mobile.** Rauno drops scroll-jacking on touch devices **[V]**. The terrain component already uses `touch-pan-y` so vertical scrolling still works over the canvas **[V]**.

---

## 3. Three original creative directions

### Direction A — "Instrument"

The site is a precision instrument that reads out Rohin's work.

- **Look:** near-black and white, strict grid, mono numerals with units, measured spacing. Electric blue is the signal, the color of live data. Crimson is the probe, the color of whatever you are inspecting.
- **Signature:** the Activity Terrain as the hero readout. It is captioned like a lab instrument and summarised with computed statistics (total, longest streak, busiest weekday).
- **Fits:** software and AI engineering credibility, and technical leadership.
- **Risk:** it can feel cold. Counter this with a human, first-person voice in the copy.

### Direction B — "Working Paper"

The site reads like a well-typeset quant research note.

- **Look:** numbered sections (`§1 Work`, `§2 Research`), figures with captions (`Fig. 1 — 53 weeks of commits`), margin sidenotes on wide screens, an abstract-style intro, and footnotes for detail.
- **Signature:** research write-ups with real charts (equity curves, drawdowns, loss curves). Crimson marks drawdowns and errors, blue marks signal.
- **Fits:** quantitative research and AI, and shows written thinking, which leadership reviewers value.
- **Risk:** density. Scanning must still work in 30 seconds.

### Direction C — "Build Log"

Rohin's development since age 10, presented as a version history.

- **Look:** eras as releases (`v0.1 — first program, age 10` up to the present). Each era carries a short changelog of what was learned and built. The terrain becomes the metrics panel for the current release.
- **Fits:** the "programming since age 10" story, as a narrative of growth.
- **Risk:** version-number gimmicks get old fast, and childhood projects take attention away from current work.

### Recommendation

Build on **A (Instrument)**. Borrow **B's figure, caption, and sidenote conventions** for project and research pages. Reduce **C** to one compact timeline section near the end.

---

## 4. Recommended visual identity

- **Name of the system:** *Instrument*.
- **Personality:** precise, calm, data-honest, quietly confident. "Engineer who measures", not "designer who decorates".
- **Signature motifs (original):**
  1. **Captioned figures.** Every interactive or visual element is a numbered figure with a mono caption and source line, e.g. `Fig. 1 — Contributions, 53 weeks · source: GitHub GraphQL · updated hourly`. This frames the terrain as evidence, not decoration.
  2. **Signal / probe color semantics.** Blue always means data or interactive. Crimson always means the thing under inspection: the hovered terrain day, the current timeline position, a drawdown in a chart. It never appears as decoration.
  3. **Metadata rows.** Projects show a consistent mono line, `Role · Stack · Year · Outcome`, with outcomes as numbers where honest (latency, accuracy, Sharpe, users).
  4. **A wordmark, not a logo.** "Rohin Pidathala" set in the primary sans at weight 500. No monogram, no avatar (consistent with "no profile picture").
- **Voice:** first person, plain sentences, concrete numbers. No "passionate", no "hey 👋".

---

## 5. Color and typography system

### 5.1 Color tokens

Ratios were computed with the WCAG 2.x formula this session **[V]**. Hex values are given because the terrain component only parses hex (§8).

**Dark (default when the OS prefers dark)**

| Token | Hex | On `bg` | On `surface` | Use |
|---|---|---|---|---|
| `--bg` | `#0A0A0B` | — | — | page |
| `--surface` | `#141417` | — | — | cards, figures |
| `--border` | `rgba(255,255,255,0.08)` | — | — | hairlines |
| `--text` | `#EDEDF0` | 16.94 | 15.74 | primary text |
| `--text-2` | `#A1A1AA` | 7.72 | 7.17 | secondary text |
| `--text-3` | `#71717A` | 4.09 | 3.80 | **large or non-essential only** (fails 4.5:1 for body) |
| `--signal` | `#5B8CFF` | 6.26 | 5.81 | links, focus ring, data |
| `--signal-fill` | `#2F6BFF` | 4.40 | 4.09 | fills; white label on it = 4.50 (borderline, use ≥ 600 weight) |
| `--probe` | `#FF4D6D` | 6.16 | 5.72 | crimson text, active marker |
| `--probe-mark` | `#DC143C` | 3.97 | 3.68 | crimson **non-text** marks only (≥ 3:1 OK for graphics) |

**Light**

| Token | Hex | On `#FAFAFA` | On `#FFFFFF` | Use |
|---|---|---|---|---|
| `--bg` | `#FAFAFA` | — | — | page |
| `--surface` | `#FFFFFF` | — | — | cards |
| `--text` | `#0A0A0B` | 18.96 | 19.79 | primary |
| `--text-2` | `#52525B` | 7.41 | 7.73 | secondary |
| `--text-3` | `#71717A` | 4.63 | 4.83 | tertiary (passes AA) |
| `--signal` | `#0047FF` | 6.01 | 6.28 | links, data, fills (white on it = 6.28) |
| `--probe` | `#C8102E` | 5.64 | 5.88 | crimson text and marks |

**Rules**

- Blue and crimson have **near-identical luminance** (contrast 1.02:1 in dark mode **[V]**). Never distinguish data by these two colors alone. Pair them with shape, position, or a label.
- Crimson coverage stays under about 2% of any viewport. It is a probe, not a theme color.
- No gradients on text or buttons, and no glows. Elevation comes from `surface` vs. `bg` plus a hairline border.
- Author tokens in OKLCH for the design system. Keep the hex mirrors above for canvas consumers such as the terrain.

**Terrain ramp (hex, required by the component)**

| Level | Dark | Light |
|---|---|---|
| `--terrain-0` | `#17181C` | `#EEEEF0` |
| `--terrain-1` | `#172447` | `#C9D8FF` |
| `--terrain-2` | `#1D3C8F` | `#8AAEFF` |
| `--terrain-3` | `#2F6BFF` | `#2F6BFF` |
| `--terrain-4` | `#A9C4FF` | `#0A2A8A` |
| `--terrain-accent` (hovered day) | `#FF4D6D` | `#C8102E` |
| `--terrain-text` | `#71717A` | `#71717A` |

These ramps are proposals. Check them visually once rendered **[A]**.

### 5.2 Typography

Observed: Geist (rishaan, Kokonut, Magic UI, shadcn) and Inter (Brittany, Linear, Paco) dominate the reference set **[V]**. Defaulting to either makes the site look like the kits.

| Role | Recommendation | Why | Status |
|---|---|---|---|
| Primary sans (UI, headings, body) | **Switzer** (Fontshare, variable) | Neutral grotesk with more character than Inter, rarely seen in dev portfolios | **[K]** confirm the license allows self-hosting before use |
| Mono (metadata, numbers, code) | **Commit Mono** (OFL) | Calm and neutral; tabular by design; not the default Geist/JetBrains look | **[K]** confirm license and weights |
| Fallback stacks | `system-ui, -apple-system, "Segoe UI", sans-serif` / `ui-monospace, "SF Mono", Menlo, monospace` | Zero-cost fallback (Lee loads only a local system serif **[V]**) | — |

- **Two families maximum.** Skip the italic-serif accent: Paco and rishaan both use it **[V]**, and it is becoming a cliché.
- **Fluid type scale** (ratio about 1.25, with `clamp()`):

  | Step | Size | Line-height | Tracking | Use |
  |---|---|---|---|---|
  | `meta` | 12–13 px mono | 1.4 | +0.01em | captions, dates, counts |
  | `body` | 16 px | 1.6 | 0 | paragraphs |
  | `lead` | 18–20 px | 1.5 | −0.005em | intro statement |
  | `h3` | 20 px | 1.3 | −0.01em | project titles |
  | `h2` | 28 px | 1.15 | −0.02em | section titles |
  | `display` | clamp(36px, 5vw, 56px) | 1.05 | −0.03em | name / hero line only |

- Weights: 400 for body, 500 for emphasis and wordmark, 600 for display only. Fine-tune variable weights the way Linear does (510 **[V]**) after visual testing.
- `font-variant-numeric: tabular-nums` on every number that changes or aligns: terrain readout, metrics, dates.
- Self-host as subset WOFF2. Preload only the primary sans regular.

---

## 6. Layout and responsive strategy

### 6.1 Page structure (home)

1. **Header:** wordmark, one-line role ("Software · AI engineering · Quantitative research"), an availability line, theme toggle, GitHub, LinkedIn, résumé.
2. **Intro:** two or three sentences with a **Brief / Full** depth toggle.
3. **Fig. 1 — Activity Terrain:** real GitHub data, mono caption, three computed stats.
4. **Selected work:** 3–5 projects as rows (title, one-line outcome, metadata row, ↗). Each opens a case-study page in Working Paper style.
5. **Research:** quant and AI notes with real figures. Include only when real content exists.
6. **Timeline:** compact; starts at age 10, weighted toward recent years.
7. **Contact:** copyable email, links, résumé PDF.

### 6.2 Grid and spacing

- Text measure **640–680 px**. Figures break out to **960 px**.
- At ≥ 1280 px, a right margin column (about 240 px) holds sidenotes on case-study pages.
- A 12-column grid only at ≥ 1024 px. Below that, a single column.
- Spacing scale on a 4 px base: `4 8 12 16 24 32 48 64 96 128`. Sections are 96–128 px apart on desktop and 64 px on mobile.
- Hairline dividers (`--border`) instead of cards, wherever a divider is enough.

### 6.3 Breakpoints and behavior

| Width | Behavior |
|---|---|
| < 640 px | Single column. Section labels become sticky headers (Brittany's mobile pattern **[V]**, restyled in mono). Terrain shows the last **26 weeks**, defaults to **Flat**, and the toggle is still available. |
| 640–1023 px | Single column, wider measure. Terrain shows the full 53 weeks, starting in Terrain view. |
| ≥ 1024 px | Optional sticky section index on the left (numbered, mono). Figures break out wider. |
| ≥ 1280 px | Sidenote column on case-study pages. |

- Why 26 weeks on mobile: 53 columns in about 350 px leaves roughly 5 px per column, too dense to read or tap **[A]**. Test on a device.
- No horizontal page scrolling and no scroll-jacking at any width.

---

## 7. Animation and microinteraction strategy

**Principle:** motion explains change. It never decorates and never hides content.

| Category | Duration | Easing | Examples |
|---|---|---|---|
| Micro (color, underline) | 120–160 ms | `ease-out` | link underline color (Paco uses 0.24 s **[V]**), button tone |
| UI state | 180–240 ms | `cubic-bezier(0.2, 0, 0, 1)` | depth toggle, theme toggle, copy-confirmation |
| Layout | 280–360 ms | spring or ease-in-out | project row expanding into case-study preview |
| Signature | component-defined | springs | terrain tilt, drag, flick spin (built in **[V]**) |

**Rules**

- **Content visible by default.** No staggered fade-up of every section. rishaan's page rendered blank below the fold in a full-page capture **[V]**: that is the failure mode to avoid.
- Animate only `transform`, `opacity`, `filter`, and color.
- No animation on actions repeated often via keyboard, such as navigating the terrain with arrow keys.
- `prefers-reduced-motion: reduce` removes all non-essential motion. The terrain already checks this and skips its animations **[V]**.
- Theme switches are instant, with transitions disabled during the swap to avoid a color flash **[K]**.
- Tooling: CSS first. Add **Motion** only if layout or shared-element transitions are needed for project expansion **[K]**. The terrain needs no library **[V]**.
- Sound: none by default. If added later, it must be opt-in like Josh's toggle **[V]**.

**Microinteractions worth building**

- Copy email: the button label changes to `Copied` for 1.5 s, announced through `aria-live`.
- External links: ↗ nudges 1–2 px on hover (transform only).
- Terrain hover/keyboard: the readout updates in mono with tabular figures, and the day is highlighted in crimson.
- Depth toggle: animate the text height (`grid-template-rows: 0fr → 1fr`), with no layout jump below.

---

## 8. Signature component — Kokonut UI Activity Terrain

### 8.1 What it is [V — read from registry source]

- **Install command:** `npx shadcn@latest add @kokonutui/activity-terrain`. This copies **one file** to `components/kokonutui/activity-terrain.tsx` (902 lines). The docs say "no extra packages". It imports only React and `cn` from `@/lib/utils`.
- **Metadata:** MIT license; author @dorianbaffier; v1.0.0 dated 2026-10-14.
- **Rendering:** Canvas 2D, not WebGL. It hand-projects isometric columns: pitch 56°, yaw 18°, tallest column 4.2 cells. Device pixel ratio is capped at 2.
- **Props:** `data?: number[]` (counts per day, oldest first), `endDate?: "YYYY-MM-DD"`, `title?`, `defaultFlat?`, `className?`. The default `endDate` is hard-coded to `"2026-10-11"`, so **always pass it**.
- **Interaction:** drag rotates with springs and rubber-band limits; a flick keeps spinning with a 0.16 s half-life; columns rise in a wave from the grab point; a Flat/Terrain toggle (`aria-pressed`) switches views.
- **Accessibility:**
  - The canvas is `role="img"` with `tabIndex=0` and an `aria-label` that includes the total.
  - **Arrow keys** move between days.
  - The readout uses `aria-live="polite"`.
  - It respects `prefers-reduced-motion`.
- **Performance:**
  - Pauses rendering offscreen (`IntersectionObserver`) and in hidden tabs (`visibilitychange`).
  - Redraws on resize (`ResizeObserver`).
- **Theming:**
  - Colors come from CSS variables `--terrain-0…4`, `--terrain-accent`, and `--terrain-text`, read with `getComputedStyle`.
  - It **repaints when `class`, `style`, or `data-theme` changes on `<html>`**, and on `prefers-color-scheme` changes, so class-based theme toggles work.

### 8.2 Integration issues found in the source

| # | Issue | Evidence | Fix |
|---|---|---|---|
| 1 | Heights and colors are normalised by **max count** (`norm = count / max`). One outlier day (a bulk import, a 90-commit day) flattens the rest. | `buildCells` **[V]** | Edit the owned file: add an optional `levels?: number[]` prop (GitHub's quartile levels) for color, and compress height with `sqrt` or a p95 cap. **Do not** clip counts before passing them in: the readout displays `cell.count`, so it would show false numbers. |
| 2 | `hexToRgb` parses **hex only**. OKLCH or `lab()` tokens produce wrong colors. | `readPalette` / `hexToRgb` **[V]** | Define `--terrain-*` as hex (ramp in §5.1). |
| 3 | Card chrome is hard-coded: `rounded-3xl`, zinc borders, emerald accent, `max-w-2xl`. | root `className` **[V]** | Edit the file to use site tokens. It is owned code, so editing is cheaper than overriding through `className`. |
| 4 | Rows run Monday→Sunday; GitHub's calendar runs Sunday→Saturday. | `buildCells` comment **[V]**; GitHub weeks start Sunday **[V]** | Harmless, because the component computes its own offset. Mention it in the caption only if it confuses readers. |
| 5 | Keyboard support covers the 4 arrow keys only (no Home/End/PageUp). | `handleKeyDown` **[V]** | Optional: add Home/End for first and last day. |
| 6 | `role="img"` on a focusable, interactive element is semantically loose. The live region may also chatter on pointer hover. | **[A]** | Add a visually hidden summary (monthly totals table) next to it. Consider limiting live updates to keyboard focus. |

### 8.3 Real GitHub data — verified API contract

GitHub GraphQL (`POST https://api.github.com/graphql`). Introspected and tested this session **[V]**:

- `ContributionCalendarDay` fields: `date`, `contributionCount`, `contributionLevel`, `color`, `weekday`.
- `ContributionLevel`: `NONE`, `FIRST_QUARTILE`, `SECOND_QUARTILE`, `THIRD_QUARTILE`, `FOURTH_QUARTILE`.
- `ContributionsCollection` also exposes `restrictedContributionsCount`, `hasAnyRestrictedContributions`, `startedAt`, `endedAt`.
- The default window (no `from`/`to`) returned **53 weeks / 368 contiguous days**, starting on a Sunday and ending today.
- A window over one year fails with: `The total time spanned by 'from' and 'to' must not exceed 1 year`. Multi-year history needs one query per year.
- `endedAt` came back as `…T07:59:59Z`, so calendar boundaries were computed in a UTC−8 zone for that request. Pass the `date` strings through unchanged: the component parses and formats in UTC **[V]**, so they display as given.

Facts not re-checked this session:

- Every GraphQL request requires a token **[K]**.
- Private work appears only as anonymous counts, and only if the profile setting "Include private contributions on my profile" is on **[K]**.
- GraphQL rate limits are far above what an hourly revalidation uses **[K]**.

### 8.4 Recommended data flow

```
GitHub GraphQL ──(server, token in env)──▶ fetch + validate ──▶ cache (revalidate hourly)
                                                 │                       │
                                                 ▼                       ▼
                                   committed JSON snapshot ◀── fallback on error
                                                 │
                                                 ▼
                     <ActivityTerrain data endDate levels title />  (client island)
```

- Fetch **server-side only**, in a server component or at build time with hourly revalidation. The token never reaches the browser.
- Validate the response before use. GraphQL can return HTTP 200 with an `errors` array. Check that days are contiguous and that counts are non-negative integers.
- **Fallback:** if the fetch or validation fails, render the last committed snapshot and log the error server-side. The page must never break or show an empty figure.
- Compute caption stats on the server: total, longest streak, current streak, busiest weekday. The client only renders.
- Token: a fine-grained personal access token with no repository permissions should be enough for public contribution data **[A — verify when implementing]**. Store it as a server environment variable and never commit it.
- Third-party "contributions API" services and scraping `github.com/users/<login>/contributions` both avoid the token. Both add a fragile dependency, so use them only as a last-resort fallback.

Sketch only, not implementation:

```ts
// server-only
const query = `query($login:String!){ user(login:$login){ contributionsCollection{
  contributionCalendar{ totalContributions weeks{ contributionDays{ date contributionCount contributionLevel } } } } } }`;

const days = calendar.weeks.flatMap((w) => w.contributionDays); // 368 contiguous days, oldest first
const props = {
  data: days.map((d) => d.contributionCount),
  endDate: days.at(-1)!.date,
  levels: days.map((d) => LEVEL_INDEX[d.contributionLevel]), // needs fix #1 in §8.2
};
```

### 8.5 Making it more than the standard student heatmap

rishaan.cc already shows a 2D GitHub heatmap **[V]**. To make the terrain stand out:

- **Annotate it.** Mark two or three real events on the terrain or in its caption, such as a project launch or a research sprint. Data plus story beats data alone.
- **Caption it like evidence** (§4): source, window, last updated.
- **Be honest about quiet periods.** A flat stretch is real data. Explain it in the caption (exams, internship under NDA) rather than hiding it. Don't inflate counts.
- **Consider a second dataset later** (quant backtest activity, model training runs) using the same component and the same color semantics. Only do this if the data is real.

---

## 9. Recommended interactive components

| Component | Purpose | Build from | Priority |
|---|---|---|---|
| Activity Terrain (Fig. 1) | Signature; proof of consistent building | Kokonut registry file, edited (§8) | Must |
| Theme toggle (light / dark / system) | Required dark and light modes | small custom component; 3-state like rishaan and Kokonut **[V]** | Must |
| Depth toggle (Brief / Full) | Serves recruiter and engineer audiences | small custom component; pattern from Lee **[V]** | Must |
| Project rows → case-study pages | Scannable work index with deep detail | custom; metadata row in mono | Must |
| Copy-email button | Low-friction contact | custom + `navigator.clipboard` + `aria-live` | Must |
| Sticky section labels (mobile) / index (desktop) | Wayfinding | CSS `position: sticky` | Should |
| Captioned figures with real charts | Quant and AI research evidence | static SVG charts generated from real results | Should, once content exists |
| Compact timeline (since age 10) | Growth story | semantic `<ol>` | Should |
| ⌘K command menu | Fast navigation | `cmdk` **[K]** | **Defer.** Not justified for a site of about 6 sections; revisit if writing grows. |

---

## 10. Accessibility and performance

### Accessibility (gaps observed in references → requirements here)

- One visible or visually hidden **`<h1>`** per page. Emil's homepage has no headings at all **[V]**; Josh uses a visually hidden H1 **[V]**.
- A **skip link** as the first focusable element. Present on Brittany, Josh, and Linear; absent on Rauno, Emil, Lee, Paco, and rishaan **[V]**.
- **Content never gated on scroll animations** (rishaan failure mode **[V]**).
- Contrast meets WCAG AA using the §5.1 ratios. `--text-3` in dark mode is restricted to large or non-essential text.
- Focus ring: 2 px `--signal` outline with 2 px offset, `:focus-visible` only.
- The terrain gets a text alternative: a visually hidden monthly summary or table next to the canvas, beyond its built-in `aria-label` and arrow-key readout.
- Reduced motion handled site-wide, not just in the terrain.
- Touch targets ≥ 44×44 px. Correct `lang`. External links announce "(opens in new tab)" (Josh **[V]**).
- Never encode meaning by blue vs. crimson alone (equal luminance, §5.1).

### Performance budget

Measured reference points **[V, lower bounds]**: Paco 371 KB total; Rauno 639 KB; Brittany 150 KB of JS; rishaan 6,072 KB (avoid).

| Metric | Budget |
|---|---|
| Home page JS (compressed) | ≤ 150 KB |
| Total home transfer | ≤ 500 KB |
| Web fonts | ≤ 2 families, subset WOFF2, ≤ 120 KB total |
| LCP (4G, mid-range phone) | < 2.0 s |
| CLS | < 0.05 (reserve the terrain's fixed height) |
| WebGL / video / Lottie on home | none |

- Static rendering for everything. Only the terrain is a client island.
- GitHub data is cached server-side with hourly revalidation and a committed fallback snapshot.
- Images: AVIF/WebP with explicit dimensions and lazy loading below the fold.

---

## 11. Design patterns to avoid

Each item was seen during this research, as noted.

1. **Announcement pill above a centred hero, glowing or rainbow CTA buttons, gradient promo banners.** Present on Magic UI, Aceternity, and shadcn **[V]**. This is the generic AI landing-page template.
2. **Avatar stacks, star ratings, "trusted by" logo walls.** Aceternity **[V]**. Not credible for a personal site.
3. **Effect-kit components used as decoration:** beams, spotlights, particle spheres, 3D tilt cards, meteor or shimmer borders. Motion and Aceternity **[V]**.
4. **Copying another portfolio's signature:** the cursor spotlight (Brittany **[V]**), the scroll-driven horizontal gallery (Rauno **[V]**), the italic-serif tagline (Paco, rishaan **[V]**), a drivable 3D world (Bruno **[K]**).
5. **Defaulting to Geist or Inter with the zinc palette and 10 px radius.** The default kit look across the reference set **[V]**.
6. **Tech-stack logo chip walls and skill bars.** rishaan **[V]**. Show the stack inside each project's metadata instead.
7. **Fake terminals, typing-effect headlines, "hey, I'm X 👋" openers, all-lowercase voice.** These read as student-template. The audience includes leadership reviewers.
8. **Scroll-triggered reveals on every section and scroll-jacking.** They hide content, hurt accessibility, and frustrate skimmers.
9. **Fabricated or decorative data:** demo heatmaps, made-up metrics, stock-ticker jokes. Every number on the site should trace to a source.
10. **Heavy first loads:** multi-MB image walls or WebGL scenes on the home page. rishaan transferred about 6 MB **[V]**, and bruno-simon.com could not be reached at all this session.
11. **Bento grids of unrelated cards and glassmorphism.** These are common kit layouts with no information structure.

---

## 12. Challenges to the brief

These parts of the brief deserve a deliberate decision before implementation.

1. **Two accent colors compete.** Electric blue and crimson have equal luminance (§5.1). Recommendation: blue is the primary accent; crimson is reserved for one semantic role (the "probe" or active marker, and negative values in charts). Otherwise the palette looks like a sports team.
2. **The component libraries in the reference list are the main source of the generic look.** Magic UI, Aceternity, and default shadcn styling should be treated as interaction references only. Use shadcn's CLI and token structure, but not its visuals. Install no other kit wholesale.
3. **A contribution graph alone no longer stands out** among student portfolios (rishaan **[V]**). The terrain only works as a signature if it is annotated, honestly captioned, and fed real data (§8.5). If GitHub activity is sparse or mostly private, reconsider featuring it at the top.
4. **"Programming since age 10"** works best as the first entry of the timeline and a single clause in the intro. As a headline it puts the focus on age instead of current ability.
5. **⌘K, sound, a 3D world, and a blog** are not needed for launch (§9). Add them only when content justifies them.
