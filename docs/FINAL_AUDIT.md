# Final audit (2026-11-26, second pass)

Scope: the seven Skiper UI placements, Kokonut Activity Terrain, the technology inventory, the footer, the project panels, and the verification items left open by the first pass. Statuses come from the code plus Chromium renders unless a row says otherwise.

Not 100% complete. See "Blocked or not verified".

## Skiper UI and Kokonut

| Component | Status | Files | Verification |
| --- | --- | --- | --- |
| Skiper 28, perspective text | Complete | `components/editorial/perspective-crawl.tsx`, `app/page.tsx` | Placed after the hero, before Selected work. The three lines are shown. Flat under reduced motion. |
| Skiper 16, card stack scroll | Complete | `components/editorial/project-card.tsx`, `app/globals.css` (`.project-stack`) | Panels pin from 1024 × 700 px with scroll timelines (Chromium). Plain list on phones, under reduced motion, and in WebKit/Firefox. The smoke test asserts sticky or static depending on `CSS.supports`. |
| Skiper 30, parallax gallery | Complete | `components/editorial/parallax-gallery.tsx`, `content/gallery.ts` | "A Closer Look", 14 real screens, each linked to its case study. |
| Skiper 31, logo scroll | Complete | `components/sections/logo-assembly.tsx`, `content/stack.ts` | The 9 required logos sit above the full inventory. Heading kept as "Tech Stack" (owner). |
| Skiper 58, text roll | Complete | `components/ui/text-roll.tsx`, `components/site/site-footer.tsx` | Used on the hero links, project titles, the section rail, and every footer link. |
| Skiper 89, scroll progress | Complete | `components/site/reading-progress.tsx` | On case studies, the lab, and journal posts; absent on the homepage. Passes in Chromium and WebKit. |
| Skiper 37, animated number | Complete | `components/ui/animated-number.tsx` | Live GitHub statistics and the lab readouts. The fixture test checks the final value (728) and the screen-reader value. |
| Kokonut Activity Terrain | Complete | `components/kokonutui/activity-terrain.tsx`, `lib/github/` | Rendered with the real token in a local production build: 2,350 contributions, working 2D/3D toggle, both themes, 0 console errors. Fixed: the 2D view clipped its month labels. |

Licensing:
- **Kokonut.** The terrain keeps its MIT header (author, licence, source).
- **Devicon.** Logos ship with `public/stack/LICENSE-devicon.txt` (MIT).
- **Skiper UI.** No Skiper code ships. Each adaptation names its Skiper source in a code comment. Skiper's licence pages (`/docs/license`, `/license`, `/docs`) returned 404 on 2026-11-26, so their terms could not be confirmed. Recheck them before copying any Skiper source in.
- **Untracked stock code.** `components/ui/skiper-ui/skiper40.tsx` is untracked stock code, imported by nothing. It was left as found.

## This pass

| Item | Status | Result |
| --- | --- | --- |
| Technology inventory | Complete | `content/stack.ts` holds all 34 owner-confirmed technologies, in five filters: Languages, Frameworks, Data, AI and quant, Tools. It also keeps the 10 technologies that project pages reference (Tailwind CSS, Flask, Streamlit, MapLibre GL JS, Plotly, Pygame, PostGIS, SciPy, NetworkX, Playwright), for 44 in total. No proficiency levels were added. Project links exist only where a project's verified stack lists the technology. "PostgreSQL + PostGIS" is now two entries, both on AccessForge. A unit test checks all 34. |
| Footer | Complete | `components/site/site-footer.tsx` is in the root layout on every page. It has one large email link, then a single row: Work, Research lab, GitHub, LinkedIn, Back to top. Every link rolls. Fixed: the email overflowed at 320 px; it is lead-sized below 640 px. |
| Text-only panels | Complete | **Developer portfolio:** a real homepage capture (`public/work/portfolio/home.jpg`, local production build, dark theme). It is the panel cover and the case study's figure. **Rotation Index:** not captured. Its local dashboard shows "No data loaded yet" until all 1,230 games validate. Instead, its panel sets the project's real status note large, beside a rule. |
| Deterministic GitHub tests | Complete | `playwright.config.ts` blanks `GITHUB_CONTRIBUTIONS_TOKEN` for the suite, so `.env.local` no longer changes results. **Unavailable:** `portfolio.spec.ts`. **Loading shell:** the no-JavaScript test in `home.spec.ts`. **Success (nonzero and all-zero):** `tests/activity-states.spec.ts`, on the development showcase's labelled synthetic responses. **Error classification:** the `lib/github/*.test.ts` unit tests; every upstream failure renders as unavailable, by design. Server-side fetches cannot be mocked from the browser without a test hook in the production server, so none was added. The showcase server reuses a running `next dev` on port 3000 outside CI, because Next.js allows one per project. |
| Favicon | Fixed | Lighthouse logged a 404 for `/favicon.ico`. `app/icon.svg` (the probe square) now serves as the icon. |
| WebKit asset loading | Fixed | The CSP sent `upgrade-insecure-requests` on every non-dev build. WebKit applied it to a local `next start` over HTTP, so every script, style, and font failed. It is now sent only on Vercel builds (`VERCEL=1`), which serve HTTPS. Deployed headers are unchanged. |

## Checks run (2026-11-26)

| Check | Result |
| --- | --- |
| `npm run lint` | pass |
| `npm run typecheck` | pass |
| `npm test` | 76 / 76, 99.64% lines, 96.82% branches on `lib/` |
| `npm run build` + secret scan | pass, 104 files, no credentials |
| Playwright, Chromium desktop + mobile (axe included) | 73 passed, 3 skipped |
| Playwright, WebKit (desktop Safari) | 35 passed, 1 skipped, 2 failed (see below) |
| Playwright, Firefox | blocked: the browser does not launch on this machine |
| `npm audit` / `--omit=dev` | 0 vulnerabilities |

The 3 skips are deliberate. The grid-width sweep runs only in the desktop project. The two activity-state tests also run only on desktop, because the development showcase does not need a second device pass.

WebKit's remaining two failures are not site defects:
- **Copy button:** Playwright's WebKit has no `clipboard-write` permission.
- **Tab order:** Safari's default is that Tab does not focus links (a macOS setting), so the keyboard-order test cannot pass there.

## Lighthouse 12 (local production build, no token)

| Page | Performance (mobile / desktop) | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| `/` | 98 / 100 (LCP 2.3 s, CLS 0, TBT 190 ms on mobile before the favicon fix) | 100 | 100 after the fix (96 before) | 63 |
| `/work/accessforge` | 95 / 100 | 100 | 96 before the fix | 63 |
| `/lab` | 93 / 100 | 100 | 96 before the fix | 60 |

The SEO scores come from `X-Robots-Tag: noindex`, which `next.config.ts` sends on purpose for any build that is not the Vercel production deployment. Only `/` was re-audited after the fix.

## External links (2026-11-26)

- **All six GitHub URLs:** 200.
- **RiskLens Streamlit demo:** 303, Streamlit's redirect while it wakes a sleeping app.
- **LinkedIn:** 999, its refusal of automated requests. Not verifiable automatically.
- **`example.com/verify`:** appears only in the development showcase.

## Blocked or not verified

- Firefox: the Playwright Firefox build fails to launch here ("Could not find profile folder"), even outside the sandbox.
- Skiper UI licence terms: the pages return 404 (above).
- The stack "All" view now lists 44 rows. It works, but it is long; a denser layout is a design follow-up.
- `/work/accessforge` and `/lab` were not re-audited after the favicon fix.
