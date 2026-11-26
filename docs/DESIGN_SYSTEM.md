# Design System — "Datum"

Status: final design, not yet implemented. Date: 2026-11-25.

This document owns visual decisions: tokens, type, grid, components, and motion. It refines [DESIGN_RESEARCH.md](DESIGN_RESEARCH.md) §4–§7 and [ARCHITECTURE.md](ARCHITECTURE.md) §5. Where they differ, this document wins on visual matters, and ARCHITECTURE wins on technical and quality gates.

Every contrast ratio below was computed with the WCAG 2.x formula. Font licences were read from the licence texts on 2026-11-25 (§3).

---

## 1. Concept

**A datum** is the reference line every engineering measurement starts from. The site is built on visible datum lines: hairlines that start in a narrow left rail, run under each heading, and continue past the text to the right edge of the viewport. Content hangs off them like annotations on a technical drawing.

- **Black and white** carry everything structural.
- **Signal blue** marks what you can act on or read as data.
- **Probe red** marks the one thing currently being inspected.

Nothing else carries colour.

**Originality guardrails.** The reference sites were studied for principles only. This system deliberately avoids their signatures:

- No pointer spotlight, scroll-driven horizontal gallery, or indented staggered headline.
- No italic-serif accent phrase, three-column link index, or bio-length tabs.
- No sound, no 3D world, no tick-ruler progress bar, no stack chip wall, no terminal prompt.
- Geist and Inter are not used.

The motifs here (datum lines, hanging index numerals, the margin readout, probe-red selection, metric numerals with mono units) are specific to this site's measurement theme.

## 2. Brand colour

### 2.1 Roles

| Role | Meaning | Allowed uses | Never |
| --- | --- | --- | --- |
| **Ink** (black / white) | Structure | Text, rules, borders, surfaces | — |
| **Signal** (electric blue) | Actionable or data | Links, focus ring, active nav, data cells, hover state of controls | Decoration, large fills, body text |
| **Probe** (crimson) | Inspected or current | Current-section marker, inspected data cell or day, text selection, negative values, the "live" status mark | Decoration, headings, buttons, error-only meaning |

Crimson covers less than 2% of any viewport. Blue and crimson have near-equal luminance (1.02:1), so they are never the only difference between two data states; pair them with shape, position, or a label.

### 2.2 Tokens

Defined once in `app/globals.css`. Hex values everywhere, because the terrain component parses hex only.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--bg` | `#FAFAFA` | `#0A0A0B` | Page |
| `--surface` | `#FFFFFF` | `#141417` | Figures, inputs |
| `--text` | `#0A0A0B` | `#EDEDF0` | Primary text |
| `--text-2` | `#52525B` | `#A1A1AA` | Secondary text, captions |
| `--text-3` | `#71717A` | `#71717A` | Tertiary text. **Dark: large or non-essential only** |
| `--rule` | `rgba(10,10,11,0.10)` | `rgba(237,237,240,0.10)` | Datum lines and dividers (decorative) |
| `--rule-strong` | `rgba(10,10,11,0.18)` | `rgba(237,237,240,0.18)` | Figure frames (decorative) |
| `--control` | `#8A8A93` | `#71717A` | Borders of interactive controls (must be ≥ 3:1) |
| `--signal` | `#0047FF` | `#5B8CFF` | Links, focus, data |
| `--signal-fill` | `#0047FF` | `#2F6BFF` | Filled signal marks (no text on them in dark mode) |
| `--probe` | `#C8102E` | `#FF4D6D` | Probe text and marks |
| `--probe-mark` | `#C8102E` | `#DC143C` | Small non-text probe marks; selection background |
| `--terrain-0…4` | `#EEEEF0 #C9D8FF #8AAEFF #2F6BFF #0A2A8A` | `#17181C #172447 #1D3C8F #2F6BFF #A9C4FF` | Activity grid and terrain levels |
| `--terrain-accent` | `#C8102E` | `#FF4D6D` | Inspected day |
| `--terrain-text` | `#52525B` | `#A1A1AA` | Terrain canvas labels (11 px, so they must meet 4.5:1; `#71717A` failed in dark) |
| `--on-probe` | `#FFFFFF` | `#FFFFFF` | Text on probe-red (selection) |

**shadcn mapping** (so primitives inherit the brand without their default look):

- `--background` = `--bg`
- `--foreground` = `--text`
- `--card` and `--popover` = `--surface`
- `--muted-foreground` = `--text-2`
- `--border` = `--rule`
- `--input` = `--control`
- `--ring` = `--signal`
- `--primary` = `--text`, and `--primary-foreground` = `--bg`
- `--destructive` = `--probe`
- `--radius: 0.125rem`

Delete the unused `sidebar-*` and `chart-*` variables when the tokens land.

### 2.3 Verified contrast

| Pair | Light | Dark | Requirement |
| --- | --- | --- | --- |
| `--text` on `--bg` | 18.96 | 16.94 | 4.5 |
| `--text-2` on `--bg` / `--surface` | 7.41 / 7.73 | 7.72 / 7.17 | 4.5 |
| `--text-3` on `--bg` / `--surface` | 4.63 / 4.83 | 4.09 / 3.80 | 4.5 for body (dark fails, so large or non-essential only) |
| `--signal` on `--bg` / `--surface` | 6.01 / 6.28 | 6.26 / 5.81 | 4.5 |
| `--probe` on `--bg` | 5.64 | 6.16 | 4.5 |
| `--control` against `--bg` | 3.28 | 4.09 | 3.0 (non-text) |
| Selection: white on `--probe-mark` | 5.88 | 4.99 | 4.5 |
| White on `--signal-fill` | 6.28 | 4.50 (borderline) | Dark: avoid text on signal fill |

Rejected: `#A1A1AA` and `#D4D4D8` as control borders in light mode (2.46, 1.42) and `#52525B` in dark mode (2.56) all fail 3:1.

## 3. Typography

### 3.1 Families and licences (B3 resolved, with conditions)

| Family | Role | Licence (verified) | Condition |
| --- | --- | --- | --- |
| **Switzer** (variable, Fontshare) | Display, headings, body | ITF Free Font License v2.0 (17 Aug 2026): free commercial use; self-hosting through `@font-face` "permitted and recommended" | **No subsetting, format conversion, or renaming** without written consent. Ship Fontshare's official WOFF2 unmodified. Do not offer it to third parties as a selectable font |
| **Commit Mono** | Index numerals, metadata, units, code | SIL OFL 1.1 (`LICENSE-FONT` in `eigilnikolajsen/commit-mono`); no Reserved Font Name stated | Subsetting allowed. Keep the licence file with the font |

- **Loading.** Use `next/font/local` with `display: "swap"`. Preload Switzer only. Store the font files and licence texts in `public/fonts/`.
- **Budget.** At most 120 KiB of fonts in total (ARCHITECTURE §10). If the official Switzer variable WOFF2 exceeds the budget, use the official static weights instead. Never subset Switzer to save bytes.
- **Fallback stacks** (already in `globals.css`):
  - `ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`
  - `ui-monospace, "SF Mono", Menlo, monospace`

### 3.1a Implementation (2026-11-25)

- **Requested alternatives rejected.** Space Grotesk, Geist, and JetBrains Mono were requested "unless research supports better alternatives". Research does: Geist is the default face of four reference sites and the component kits (DESIGN_RESEARCH §5.2, ARCHITECTURE D17), and Space Grotesk is a stock AI-landing-page face. Commit Mono replaces JetBrains Mono for a calmer, less common mono.
- **Files.**
  - `app/fonts/Switzer-Variable.woff2` (43.2 KB, `wght` 100–900) is byte-identical to the Fontshare package, as the licence requires. Its licence ships as `app/fonts/Switzer-LICENSE.txt`.
  - `app/fonts/CommitMono-400-Regular-subset.woff2` (20.3 KB) is subset from the official 1.143 OTF to Latin plus the design's symbols. Its licence ships as `app/fonts/CommitMono-LICENSE.txt`.
  - Total 63.5 KB, against a 120 KiB budget.
- **Loading.** `app/fonts.ts` uses `next/font/local`.
  - Switzer is preloaded (HTTP `Link` header) with `display: swap` and a metric-matched Arial fallback, to limit layout shift.
  - Commit Mono is not preloaded.
  - Both are served with a one-year immutable cache.
- **Glyph gaps, verified.**
  - Neither font contains `↗` (U+2197), so the external-link mark is an inline decorative SVG (`aria-hidden`, `currentColor`).
  - Commit Mono contains `← ↑ → ↓` and `−`; Switzer contains `−`, `–`, and `·`.
- **No tabular figures in Switzer** (its features are `aalt frac liga locl ordn salt sups`). Every number that must align (dates, counts, readouts, the activity grid) is set in Commit Mono, which is monospaced. Metric numerals stay in Switzer because they stand alone. This replaces the earlier `tabular-nums` rule for Switzer.
- **Fluid sizes** use `rem + vw` middle terms (for example `clamp(2.75rem, 1.5rem + 5vw, 5.5rem)`), so text still scales with browser zoom (WCAG 1.4.4). `h2` and `lead` are now fluid too.
- **Measure.** Running text uses `max-w-prose` (`--container-prose: 66ch`). Seven columns alone gave about 95 characters per line at 1440 px.
- **Wrapping.** Headings use `text-wrap: balance`; paragraphs use `text-wrap: pretty`.
- **Verified renders.** At 1440 px: display 123 px (raised from 88 px on 2026-11-25 so the name clearly out-ranks section titles), 560 weight, −0.04em tracking. 128 px cap at 2560 px. At 390 px: display 44 px, h2 24 px, lead 18 px, no overflow. Checked in both themes.

### 3.2 Scale

The ratio is about 1.25 for text, with one large display step. All sizes are in `rem`.

| Token | Size | Line-height | Tracking | Weight | Family | Use |
| --- | --- | --- | --- | --- | --- | --- |
| `display` | `clamp(2.75rem, 0.5rem + 8vw, 8rem)` | 0.9 | −0.04em | 560 | Switzer | The name, once per site |
| `h1` | `clamp(2rem, 1.25rem + 2.5vw, 3rem)` | 1.05 | −0.03em | 560 | Switzer | Page titles (case studies) |
| `h2` | `clamp(1.5rem, 1.25rem + 1vw, 1.75rem)` | 1.15 | −0.02em | 540 | Switzer | Section titles |
| `h3` | `1.25rem` | 1.3 | −0.01em | 540 | Switzer | Project titles |
| `lead` | `clamp(1.125rem, 1rem + 0.5vw, 1.25rem)` | 1.5 | −0.005em | 420 | Switzer | Intro statement |
| `body` | `1rem` | 1.6 | 0 | 400 | Switzer | Paragraphs |
| `small` | `0.875rem` | 1.5 | 0 | 400 | Switzer | Captions |
| `index` | `0.75rem` | 1 | 0.02em | 400 | Commit Mono | Hanging numerals `01`–`09` |
| `meta` | `0.8125rem` | 1.4 | 0 | 400 | Commit Mono | Metadata rows, units, readout |
| `metric` | `clamp(2rem, 1.25rem + 2.5vw, 3rem)` | 1 | −0.03em | 500 | Switzer | Outcome numerals |

Tune the variable weights (540, 560, 420) on the real font. Change them only by eye, in steps of 10.

### 3.3 Typographic rules (the distinctive part)

1. **Hanging index numerals.** Every section heading has a mono index (`01`, `02`, …) in the left rail, right-aligned against the main column at `meta` size from 1024 px (2026-11-26: left-aligned, the numeral sat about 330 px from its heading and read as stray), baseline-aligned with the heading text. The numeral is decoration (`aria-hidden`), and the heading text stands alone for assistive technology.
2. **Metric numerals.** Outcomes render as a large Switzer numeral plus a mono unit and source, for example `42` `ms p95` · `source: load test`. The number and unit sit on a shared baseline, and the source sits below in `meta`.
3. **Mono only for machine-like content:** dates (`2026-03`), counts, units, file and command names, index numerals. Never for prose or headings.
4. **Sentence case everywhere.** No all-caps labels and no letter-spaced uppercase.
5. **Separators.** Metadata uses ` · `. Ranges use an en dash (`2024–2026`). The present is "present", not "now".
6. **Numerals.** Use `tabular-nums` in data, metrics, dates, and the activity readout. Use proportional numerals in prose.
7. **Links in prose.** Underline 1px at `0.22em` offset in `--text-3`. On hover, the underline becomes `--signal`. External links end with a text `↗` and visually hidden text "(opens in new tab)".
8. **Measure.** 60–72 characters for body text. Headlines never exceed 7 grid columns, except the display name (§5.1).

## 4. Grid and asymmetric layout

### 4.1 Grid

| Width | Columns | Gutter | Outer margin | Container |
| --- | --- | --- | --- | --- |
| < 640 px | 4 | 16 px | 20 px | fluid |
| 640–1023 px | 8 | 20 px | 32 px | fluid |
| ≥ 1024 px | 12 | 24 px | `clamp(32px, 5vw, 64px)` | max 1320 px, **left-anchored** |

At ≥ 1024 px the container is left-anchored inside the viewport, not centred. Extra width on large screens goes to the right, where the datum lines run out to the viewport edge. This is the main asymmetric move.

### 4.2 Zones (≥ 1024 px)

```
cols  1 ── 3 │ 4 ──────────────── 10 │ 11 ─ 12 │ → viewport edge
      RAIL   │ MAIN (text measure)   │ MARGIN  │ BLEED (datum lines only)
      index, │ headings, prose,      │ readout,│
      current│ lists                 │ sidenotes
      marker │ FIGURE spans 4 ─────────── 12 ──┤
```

- **Rail (cols 1–3).**
  - Holds the hanging index numerals and the page navigation.
  - On case-study pages it also holds a sticky section list with the probe-red current marker: a 6 × 6 px square paired with `aria-current`.
- **Main (cols 4–10).** All prose and headings.
- **Margin (cols 11–12).** The readout on home, and sidenotes and metadata on case studies.
- **Figures** span cols 4–12, wider than the text and pushing right. This keeps every figure asymmetric.
- **Bleed.** Datum lines extend from col 1 to the viewport's right edge. Content never enters the bleed.

### 4.3 Responsive

| Width | Behaviour |
| --- | --- |
| < 1024 px | The rail collapses. Index numerals sit inline before headings (`01 Work`). Navigation becomes an inline `meta` row under the wordmark. The margin readout moves below the intro as a `meta` list. Figures go full width. Datum lines span the container and bleed to both edges. |
| < 640 px | Same as above, plus the activity grid shows 26 weeks (ARCHITECTURE §7). No horizontal overflow at 320 px. |
| ≥ 1280 px | Case studies enable the sidenote column. |

### 4.4 Spacing

The base is 4 px. Steps: `4 8 12 16 24 32 48 64 96 128 192`.

- Section rhythm: 96 px above a datum line on desktop (reduced from 128 px on 2026-11-26; sections read as disconnected), 64 px on mobile, and 32 px between the datum line and the first content.
- Vertical rhythm follows the 4 px grid. Line-heights × sizes round to multiples of 4 where possible.

## 5. Page compositions

### 5.1 Home

```
 RAIL            MAIN                                   MARGIN
 nav (meta)      Rohin Pidathala                        (display spans cols 4–12)
 ───────────────────────────────────────────────────────────────────────── →
                 Software · AI engineering ·            readout
                 Quantitative research   (lead)         ───────
                 Intro paragraph (Brief) + Full         Programming since age 10
                                                        Status   <B1>
 01 ───────────── Selected work ───────────────────────────────────────── →
                 Project title                    2026  ↗
                 One-line outcome
                 role · stack · year (meta)
 02 ───────────── Activity ────────────────────────────────────────────── →
                 Fig. 1  [ contribution grid spans 4–12 ]
                 caption · source · last updated
 03 ───────────── Leadership ──────────────────────────────────────────── →
 04 ───────────── Contact ─────────────────────────────────────────────── →
                 email (copy) · GitHub ↗ · LinkedIn ↗ · Résumé (PDF)
```

- **Name.** Display size, spanning cols 4–12, sitting directly on the first datum line (`hero-datum` utility: col 4 to the viewport's right edge at ≥ 1024 px, edge to edge below). The readout hangs off the same line, baseline-aligned with the role line, with no second rule. It is the page's `<h1>` and the only display-size text on the site.
- **Readout.** A `meta` block in the margin listing only verified facts. Its lines are content-gated by B1: show only those Rohin supplies. "Programming since age 10" comes from the brief. No computed years, no location unless supplied.
- **Navigation.** No conventional top navigation bar. Page links are a vertical `meta` list in the rail at ≥ 1024 px (inline row below that). On inner pages a small `h3`-size wordmark at the top of the rail links home. The theme toggle sits at the end of the navigation list: a `meta` mono radio row (System, Light, Dark). The selected option is `--text` with a 2 px probe underline; the others are `--text-2`. Every target is at least 24 px tall. Until the navigation exists it sits alone at the top of the page.
- **Section order.** Selected work leads, then Activity (2026-11-26: the unavailable activity frame should not be the first thing after the name). Order otherwise follows content availability: sections without B1 content are omitted, and the remaining sections are renumbered.

### 5.2 Case study (`/work/[slug]`)

- **Head.** The rail holds the index and the sticky section list with the probe marker. Main holds the `h1` title and lead. The margin holds the metadata stack (role, year, stack, links) as `meta` lines.
- **Body.** Main holds the prose. Figures span cols 4–12 with mono captions (`Fig. 2 — …`). Sidenotes sit in the margin at ≥ 1280 px and inline as `small` text below that.
- **Outcomes.** A row of metric numerals with units and sources (§3.3.2).

- **Implemented (2026-11-25).** Sections in order: Problem, Solution (with figures), Architecture (mono path or component name and its role), Technical complexity (numbered), Engineering decisions (decision and reason), Verified outcomes (§3.3.2). Sections without content are omitted. The rail holds the back link, the section list, and the theme toggle. It is not sticky, because a sticky list in the rail would collide with the hanging index numerals.

### 5.3 Index pages (`/work`, `/research`, `/about`)

These are lists of rows. Each row sits on its own hairline: title (`h3`), one-line summary, and a `meta` line. The whole row is clickable: the link is on the title, and its hit area covers the row through a pseudo-element.

## 6. Components (visual specification)

| Component | Spec |
| --- | --- |
| **Datum line** | 1px `--rule`, from col 1 to the viewport's right edge. Section headings sit 12 px above it. Decorative (`aria-hidden`), drawn with a pseudo-element |
| **Section heading** | Index numeral (rail, `index`, `--text-3`, decorative) and `h2` (main) on one baseline |
| **Project row** | Hairline above. Title (an `h3` element set at `h2` size since 2026-11-26, so the work out-ranks its metadata) and year (`meta`, in the margin). Summary `body` `--text-2`. Meta row. Hover and focus-within: a `--signal` line draws over the row's hairline from col 4 (§7), and the title underline appears |
| **Metric** | `metric` numeral `--text`, unit in `meta` `--text-2`, source in `meta` `--text-2` |
| **Figure** | `--surface` with a 1px `--rule-strong` frame, radius 2 px, no shadow. Caption: `Fig. n —` in mono plus text in `small` `--text-2`. Images have explicit dimensions |
| **Activity grid** | Fluid square cells that fill the figure width (one column per week, 26 weeks below 640 px), 2 px gap, radius 1 px, colours `--terrain-0…4`. Mono month labels above, a Less–More legend below, and a metric readout (total, longest streak, busiest days) above the range line (2026-11-25). The inspected cell gets a 1px `--terrain-accent` inset outline plus a mono readout line (`7 contributions · Tue, Mar 3`). A visually hidden table lists monthly totals |
| **Stack row** | Technology (`body`), "Used in" links to the real case studies that list it (`small` `--text-2`), category (`meta`). Filters show each category's count in `index` mono, hidden from assistive technology, because the status line announces the result count. No logos, chips, or proficiency levels |
| **Leadership row** | Hairline (invisible on the first row, under the section datum). Role `h3`, organization `--text-2`, dates `start – end` or `start – present` in mono in the margin, summary, outcomes with mono en-dash markers |
| **Certification row** | Name `h3`, issuer and an external "Verify" link to the issuer's page, issue and expiry dates in mono in the margin. No badge images |
| **Lab chart** | `--surface` figure with a `--rule-strong` frame. Simulated data in `--signal` or `--signal-fill`; analytic or true references as 2 px dashed `--text`; the inspected point and the loss tail in `--probe-mark`, always named in a legend with its mark shape. Grid lines `--rule`, mono tick labels in `--text-2`, the y label above the plot. Native SVG `<title>` tooltips on bars and the inspected point. Every chart has an `aria-label` summary and a numeric readout below |
| **Command palette** | Native modal `<dialog>` on `--surface`, 1px `--rule-strong` frame, radius 2 px, no shadow; the backdrop is `--text` at 24%. A `lead`-size input over a bottom rule. Mono `meta` group names (sentence case). Options: label in `body`, hint in `small` `--text-2`; the highlighted option gets the 6 px probe square and a `--bg` row. Mono key hints in the footer from 640 px. Trigger: mono "Search" plus a `kbd` shortcut in the rail |
| **Architecture diagram** | SVG in a `--surface` figure: solid `--text` boxes for project components, dashed `--text-2` boxes for outside systems, `--text-2` arrows, 18 px numbered callouts at edge midpoints keyed to a mono list below. Below 640 px only the list shows |
| **Contact** | Email as an `h3`-size link with a "Copy email" text button (text swap to "Copied", 1.5 s), then external profile links, then the résumé link with its mono update date |
| **Journal** | Index rows: title `h3` link, summary `--text-2`, mono date in the margin. Articles: `h1` on the hero datum, headings in the rail, prose in main, code blocks and figures across the figure columns |
| **Status mark** | Mono text paired with a 6 px square: filled `--text` for Completed, 1px `--text` outline for In development. Shape and text carry the state, never colour. Shown in the project row's meta line and the case-study metadata |
| **Readout** | `meta` lines: label in `--text-2`, value in `--text`. A 6 px probe square marks a live value (e.g., availability), always paired with text |
| **Button** | Text button: `body` 500, 1px `--control` border, radius 2 px, padding 8 × 14 px, minimum 44 px target. Hover: border `--signal`. Pressed: background `--surface`. No filled colour buttons |
| **Link** | §3.3.7 |
| **Focus ring** | 2px solid `--signal`, 2px offset, `:focus-visible` only, on every interactive element, never removed |
| **Selection** | `::selection { background: var(--probe-mark); color: #FFFFFF }` |
| **Unavailable state** | Fig. 1 keeps its frame and height. Inside: `GitHub activity unavailable` (`body` `--text-2`) and `View profile on GitHub ↗`. No zeros, skeletons, or shimmer |
| **Details (Brief/Full)** | A `summary` styled as a link with a mono `+`/`−` glyph. Content animates height (§7) |

Excluded: cards with shadows, gradients, glows, glass, pills or chips, avatars, emoji, icon sets (text glyphs `↗ ↓ + −` only), and rounded corners above 2 px.

## 7. Motion

**Principle:** motion confirms an action or shows a measurement. Nothing moves on load. Two effects are scroll-linked (revised 2026-11-26): the section datum line drawing in, and the project screen gallery's column drift. Both move `transform` only on CSS scroll timelines, never hide content, and never take over scrolling.

| Interaction | Property | Duration | Easing |
| --- | --- | --- | --- |
| Link underline colour | `text-decoration-color` | 140 ms | `ease-out` |
| Project row datum line | `transform: scaleX(0→1)` of a `--signal` overlay line, origin left | 240 ms | `cubic-bezier(0.2, 0, 0, 1)` |
| `↗` nudge on hover | `transform: translate(2px, -2px)` | 140 ms | `ease-out` |
| Details open/close | `grid-template-rows: 0fr → 1fr` | 240 ms | `cubic-bezier(0.2, 0, 0, 1)` |
| Stack rows after a filter | Motion `StaggerList`: survivors slide to their new place, new rows enter with a capped stagger. Motion loads only when the reader points at, focuses or touches the filters; before that, rows change instantly | 240–300 ms | spring (`lib/motion.ts`) |
| Section datum line | `transform: scaleX(0→1)` on the heading rule, heading settles `translateY(0.5rem→0)`; CSS scroll timeline (`animation-timeline: view()`), skipped where unsupported | scroll-linked | `linear` |
| Current-section probe | one 6 px probe square glides along the rail to the current section | 320 ms | `--ease-spring` |
| Button press | `transform: scale(0.97)` on press, springs back on release (`press` utility) | 60 ms in, 320 ms out | `--ease-spring` |
| Page transition (home ↔ case study) | cross-document View Transition: the project title carries over into the case-study heading, the rest cross-fades | 180 ms fade, 320 ms title | `--ease-spring` |
| Project screen gallery | three columns of real screens drift at different speeds inside a 4:3 frame (the middle one against the others) while the gallery crosses the viewport; CSS scroll timeline. Without support or with reduced motion, a static grid shows every screen | scroll-linked | `linear` |
| Architecture diagram trace | pointing at a flow entry draws its edge in `--signal` (`stroke-dashoffset`) | 320 ms | `--ease-spring` |
| Copy confirmation | text swap, then revert after 1.5 s (no animation) | — | — |
| Activity cell inspect | outline appears instantly; the readout updates instantly | 0 ms | — |
| Terrain (Phase 4) | component springs, after activation only | — | — |

- Animate only `transform`, `opacity`, and colours. No layout-property animation except the `grid-template-rows` details pattern.
- `prefers-reduced-motion: reduce`: every transition above becomes an instant state change, and the details content shows or hides without height animation. Honour changes while the page is open.
- Theme changes are instant: no cross-fade.
- **Spring.** `--ease-spring` is a CSS `linear()` curve sampled from a damped spring (about 2% overshoot), with `--duration-spring` 320 ms. CSS uses it where Motion is not loaded, so the two feel the same.
- **Reduced motion.** All durations become 0 ms; press scale, the datum draw, and view transitions are off entirely, not just instant.
- **Hover utilities (CSS).** `hover-nudge` (the ↗ nudge), `hover-datum` (signal line drawn from the left), and `hover-underline` (rule to current colour). Put `group` on the interactive element. Hover applies only on devices that can hover; keyboard focus gets the same feedback.
- **Motion library.** Used only for what CSS cannot do: list reflow after filtering, and content that enters or leaves after an interaction (ARCHITECTURE D19, `components/motion/primitives.tsx`). These primitives never animate on page load or scroll. Any new use of `motion` is recorded in ARCHITECTURE first.

## 8. Voice and content presentation

- First person, plain sentences, concrete numbers with sources. No superlatives, no "passionate", no emoji.
- Every figure, metric, and readout value comes from the B1 content inventory. **No placeholder text ships.** Sections without content are omitted, not stubbed.
- Use "programming since age 10" once, in the readout, not as a headline (DESIGN §12.4).

## 9. Implementation notes for Phase 1

**Status (2026-11-25):** Steps 1 and 3 are done in `app/globals.css`. Tailwind's default colours, shadows, radii, type sizes, and breakpoints are reset, so only token utilities compile (`bg-red-500`, `shadow-lg`, `text-sm`, and `md:` do not). The page grid is the `grid-page` utility. `lib/design-tokens.test.ts` parses the CSS and asserts every §2.3 pair; a deliberate regression made it fail. Step 2 (font files) is pending; `--font-switzer` and `--font-commit-mono` fall back to system stacks.

1. Replace the neutral shadcn tokens in `app/globals.css` with §2.2, plus the shadcn mapping. Dark and light now come from `light-dark()` tokens driven by `<html data-theme>` (ARCHITECTURE §9).
2. Add the fonts per §3.1: official files plus licence texts in `public/fonts/`, loaded with `next/font/local`.
3. Express the grid as CSS grid utilities on a single container. Datum lines and index numerals belong to the section heading component (`components/editorial/`), not to page code.
4. Verify on build:
   - axe in both themes
   - contrast of any new pair against §2.3
   - no overflow at 320 px
   - crimson below 2% of each viewport (screenshot check)
   - no transition runs under reduced motion
