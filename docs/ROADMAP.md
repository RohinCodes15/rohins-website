# Roadmap — Rohin Pidathala Portfolio

Status: launch content and features complete; final visual acceptance audit passed; awaiting independent engineering audit, then deployment gates B2 and B4–B5 (see [HANDOFF.md](HANDOFF.md), Production readiness). Not deployed. Date: 2026-11-26. Architecture and decisions: [ARCHITECTURE.md](ARCHITECTURE.md). This roadmap supersedes the "Implementation roadmap" section in [TECHNICAL_RESEARCH.md](TECHNICAL_RESEARCH.md). It keeps that section's phase order and adds the visual work from [DESIGN_RESEARCH.md](DESIGN_RESEARCH.md).

Blockers (`B#`) and decisions (`D#`) refer to ARCHITECTURE §11–§12. A phase may start while a blocker is open only where the table says so.

| Phase | Starts when | Blocked by |
| --- | --- | --- |
| 0. Decisions and content | Now | — |
| 1. Launchable HTML | Phase 0 inventory exists (copy can still change) | B1 for launch, B4 for public launch |
| 2. Visual polish | Phase 1 exit gate passes | — |
| 3. Verified GitHub data | Phase 1 shipped | B2 |
| 4. Activity Terrain (optional) | Phase 3 exit gate passes | B6 |
| 5. Release hardening | Phase 1 onward, finalised before public launch | B4, B5 |

---

## Phase 0 — Decisions and content (no code)

- [ ] **B1 Content inventory.**
  - Projects: title, role, year, stack, outcomes with sources, links, images. *(2026-11-25: AccessForge AI and the portfolio are in `content/projects.ts`, both with case studies. RiskLens waits on its repository.)*
  - Leadership roles.
  - Certifications with verification URLs.
  - Research topics and whether each has real data for a demo.
  - Timeline facts, starting at age 10.
  - Intro copy (Brief and Full).
  - Availability line.
  - Résumé PDF.
- [ ] **B2** Login confirmed as `RohinCodes15`. Configure the Production Secret and verify signed-out visibility before enabling live data.
- [x] **B3** Licenses verified 2026-11-25. Switzer must ship unmodified (no subsetting). See DESIGN_SYSTEM §3.1.
- [ ] **B4** Choose the canonical domain.
- [x] **B8 / D3** Manual theme toggle: yes. Implemented 2026-11-25 (ARCHITECTURE §9, D18).
- [ ] Decide which routes launch: `/research` and `/about` launch only if they have content. *(2026-11-25: `/lab` added with educational demonstrations; `/research` still waits for write-ups.)*

**Exit:** the inventory exists in writing, and B2, B3, and D3 are answered or explicitly deferred.

## Phase 1 — Launchable HTML

**Status (2026-11-25):** Foundation, tokens, fonts, themes, motion primitives, and first UI components are verified. The development-only `/showcase` (`app/showcase/page.dev.tsx`) is the visual QA page. See [HANDOFF.md](HANDOFF.md). The homepage uses verified content and this portfolio as the first project. Additional sections wait on B1.

**Dependency check (2026-11-25):** Pinned Motion 14.14.0 at the user’s request and removed unused `tw-animate-css`. The current scaffold needs no generated shadcn primitives. Activity Terrain is now integrated in Phase 4. Dependency tree and production build passed on Node 24.22.3. npm audit reported zero vulnerabilities.

**UI foundation (2026-11-25):** Shared controls and editorial rows are in place. The homepage uses the responsive container and asymmetric grid zones. Playwright verified the grid at eight widths from 320 to 2560 px with no horizontal overflow on the current homepage. Next, apply the same layout to the remaining Phase 1 sections and recheck them with approved content.

**Scaffold.**

- Create the Next.js App Router project with TypeScript, Tailwind v4, and Node 24.
- Refresh versions before the lockfile.
- Connect to Vercel through the Git integration.

**Design system.** Implement [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) §9. Tokens done 2026-11-25 (colours, spacing, type scale, radii, no shadows, breakpoints, grid utility, motion durations, contrast test). Fonts done 2026-11-25 (Switzer unmodified plus subset Commit Mono, 63.5 KB, preloaded via `next/font/local`; DESIGN_SYSTEM §3.1a).

- Add the `globals.css` tokens (light, dark via `prefers-color-scheme`, terrain hex mirrors) from DESIGN §5.1.
- Load fonts with `next/font/local`, or the system fallback.
- Set up the type scale, spacing scale, and layout measures.

**Pages.**

- `/` with intro (`<details>` Brief/Full), selected work, leadership highlights, and contact (`copy-email`).
- `/work` and `/work/[slug]` as JSX case studies using `editorial/` figure, caption, sidenote, and meta-row components.
- `/about` and `/research` if they have content.
- The Fig. 1 frame reserves space while loading and shows the unavailable state when live access is missing.

**Content.** Typed registries in `content/`, with stack metadata rows on projects.

**Discovery.** Metadata, canonical URLs, sitemap, robots, one shared OG image, and `noindex` on previews.

**Tests.**

- Node test runner for `lib/content.ts` (unique slugs, ordering, `projectsByStack`).
- Playwright route smoke tests, including with JavaScript disabled.
- axe in both themes.

**Exit gate.**

- [x] Foundation `next build` passes (B7 resolved for the scaffold). Recheck with Phase 1 pages.
- [ ] Every route works without JavaScript.
- [ ] axe is clean in light and dark.
- [ ] Keyboard focus is visible and the tab order is logical.
- [ ] No overflow at 320 px.
- [ ] Contrast matches DESIGN §5.1.
- [ ] Initial JS is ≤ 200 KiB.

## Phase 2 — Visual polish

**Audit (2026-11-25):** Verified the current homepage and development showcase, and fixed live reduced-motion handling. Results and open gates are in [HANDOFF.md](HANDOFF.md).

- [ ] Microinteractions with CSS only (DESIGN §7): link underline colour, ↗ nudge, copy confirmation with `aria-live`, and `<details>` height animation as progressive enhancement.
- [ ] Site-wide reduced motion, including changes while the page is open.
- [x] Three-state theme toggle (done early, 2026-11-25): inline head script, `data-theme` variant, `light-dark()` tokens. `tests/theme.spec.ts` covers system (including a live OS change), Light and Dark persistence, clearing to System, no flash with bundles blocked, tampered storage, keyboard and focus, cross-tab sync, axe, and hydration errors. Move the toggle into the rail navigation when that ships.
- [ ] Add shadcn primitives individually, only where a native element falls short.
- [x] Motion primitives (done early, 2026-11-25; ARCHITECTURE D19): interaction-only `Presence`, `StaggerList`/`StaggerItem`, `LayoutBox`, plus CSS hover utilities. Add browser tests with the first production Motion consumer.
- [x] Add the requested homepage technology category filter. A separate project filter still waits for six projects (ARCHITECTURE §8).
- [ ] Add MDX only once 3 long-form case studies need it (D4).

**Exit gate.**

- [ ] Reduced motion, keyboard, both themes, and the 200 KiB JS budget all pass.
- [ ] No pattern from DESIGN §11 appears (review screenshots against the list).

## Phase 3 — Verified GitHub data (Fig. 1)

**Local implementation and tests complete.** The production homepage shows the unavailable state until a valid credential is configured. See [HANDOFF.md](HANDOFF.md).

- [ ] B2 resolved.
  - [ ] Create a fine-grained, expiring, read-only token as a Vercel Production Secret.
  - [ ] Check the production token's calendar against the signed-out profile.
- [x] `lib/github/validate.ts` (pure) and `contributions.ts` (`server-only`, Runtime Cache: fresh for 1 h, at most 24 h of last-good data, cooldown, rate-limit backoff, 3 s timeout).
- [x] `activity-grid.tsx`:
  - [x] Server-rendered HTML heatmap using the terrain colour ramp, with `<time>` labels.
  - [x] Expandable monthly summaries and a date/count list.
  - [x] A caption with source and last-updated time.
  - [x] Server-computed statistics.
- [x] The production build confirms the activity boundary streams into a prerendered shell.
- [ ] Optional: two or three real annotations (DESIGN §8.5), if Rohin supplies them.

**Exit gate.** Unit tests cover all of the following, with ≥ 80% line coverage on `lib/`:

- [x] valid data
- [x] verified zeroes
- [x] HTTP 200 with GraphQL errors
- [x] 401, 403, and 429
- [x] timeout
- [x] gaps and duplicates
- [x] stale data and expiry
- [x] missing token

Also:

- [x] No token or demo data in the browser output.
- [x] The build succeeds without a token.

## Phase 4 — Activity Terrain (optional enhancement)

**Locally verified with labeled development fixtures.** Physical devices and screen readers remain release gates. See [HANDOFF.md](HANDOFF.md).

- [x] Re-inspect the current registry file and MIT notice. Install `@kokonutui/activity-terrain` and review the diff.
- [x] Edit the copied file:
  - [x] Make `data` required (no demo default).
  - [x] Add the optional `levels` prop and height compression that keeps raw counts.
  - [x] Add a reduced-motion change listener.
  - [x] Add Home/End keys.
  - [x] Apply site tokens.
- [x] Add a "View as terrain" activation control that loads the component through dynamic import. The grid stays the default and the fallback. Below 640 px, use 26 weeks or the grid only.
- [ ] Test on physical devices: midrange Android (p95 frame interval ≤ 33.3 ms over a 10 s interaction) and iOS Safari. If the budget fails, set the DPR cap to 1.5 on coarse pointers.
- [ ] Check the screen-reader flow on desktop and mobile.

**Exit gate.**

- [x] Zero terrain requests before activation.
- [ ] JS budget, reduced motion, keyboard, and mobile budgets pass.

If any gate fails, **ship the grid alone** and drop Phase 4.

## Phase 5 — Release hardening (runs alongside, finalised before launch)

- [x] Configure CI on PRs and `main`: SHA-pinned actions, `contents: read`, clean install, lint, typecheck, Node unit tests with coverage, production build, and Playwright plus axe. Upload browser artifacts on failure.
- [ ] Confirm the first hosted CI run once the workflow is in the GitHub repository. Local Node 24 verification passed all stages, including 16 unit tests and 6 browser smoke checks.
- [ ] Repository: ruleset on `main`, Dependabot (npm and actions), secret scanning with push protection, CodeQL and dependency review **if eligible (B5)**.
- [ ] Headers in `next.config.ts`: CSP with the documented `'unsafe-inline'` trade-off, `nosniff`, referrer policy, permissions policy, and host-only HSTS after B4.
- [ ] Vercel: Node 24, preview protection, canonical host redirect, `NEXT_PUBLIC_SITE_URL` set everywhere, token in Production only.
- [ ] Production smoke checks against the canonical origin:
  - [ ] routes return 200 with the expected `<h1>`
  - [ ] headers present
  - [ ] robots and sitemap correct
  - [ ] no token patterns in client scripts
  - [ ] activity is either verified or unavailable
- [ ] Make the post-deploy smoke check an automated gate only after deployment-event delivery is confirmed (B5).
- [ ] Manual release checks, recorded in the PR:
  - [ ] 3× Lighthouse mobile on home and one case study
  - [ ] keyboard walk
  - [ ] two screen readers
  - [ ] both themes
  - [ ] reduced motion
  - [ ] contrast over every background
- [ ] Rollback: manual decision, using Vercel instant rollback. Fix forward through a PR.

**Launch gate.**

- [ ] B1 and B4 resolved.
- [ ] All Phase 1 gates, plus the gates of any later phase shipped, pass in production.
- [ ] Field Core Web Vitals marked pending until there is enough traffic.
