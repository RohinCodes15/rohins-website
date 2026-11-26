# Technical research for a premium developer portfolio

Verified against official documentation and published package metadata on November 25, 2026. This is a recommendation for a new project, based on documented compatibility.

## Implementation roadmap

Audit date: November 25, 2026. Use the roadmap as the execution order. The versions below are a dated baseline. Refresh stable releases, security advisories, peer ranges, and Node support immediately before creating the lockfile. No combined build was verified in this audit.

| Phase | Work | Exit gate |
| --- | --- | --- |
| 1. Launchable HTML | Set up Next.js App Router, React, TypeScript, Tailwind, and Node 24 on Vercel. Add the homepage, case studies, and confirmed About and Research content. Use verified copy, plain links, and design tokens. Add canonical metadata, sitemap, and a shared OG image. | Production build passes. Indexable content works without JavaScript. Check routes, contrast, keyboard focus, and 320 CSS px reflow before adding effects. |
| 2. Visual polish | Add individual shadcn controls where native elements are insufficient. Start with CSS transitions. Add Motion where a specific interaction needs it. Add MDX, a persistent theme library, or the stack explorer only when the content or interaction requires it. | Reduced motion, keyboard navigation, both themes, and the initial JavaScript budget pass. |
| 3. Verified GitHub data | Confirm the exact read-only query and public visibility for RohinCodes15. Render verified data in an HTML summary and expose daily values through an accessible text view. Use the production secret and runtime cache with the documented timeout, cooldown, and age policy. Keep GitHub independent of the build. | Valid zeroes, partial errors, rate limits, missing credentials, stale expiry, and the unavailable state are verified. No demo data or secret reaches the browser. |
| 4. Optional Activity Terrain | Inspect the exact registry file and license. Reuse the existing Canvas 2D renderer behind explicit activation. Keep the HTML alternative. Remove the seeded fallback and test actual controls and frame timing on physical devices. | Pass the 200 KiB initial JavaScript gate, zero preactivation scene requests, reduced motion, keyboard, and mobile budgets. Ship the HTML view alone if the renderer fails a gate. |
| 5. Release | Require build, lint, focused validation tests, and browser smoke checks. Check HTTPS, preview indexing controls, the canonical domain, and production headers. Record the release checks and rollback path. | Production smoke and manual accessibility checks pass. Field Core Web Vitals stay pending until there is enough traffic. |

### Audit decisions

- **Data integrity.** Removed the conflicting committed snapshot and third-party fallback suggestions. Use the bounded last good cache or an unavailable state. Count a real zero as data. The observed calendar size is evidence from one response and cannot size every calendar.
- **Rendering.** Activity Terrain uses Canvas 2D. WebGL, Three.js, and WebGL-specific checks are only relevant to a separate demo that uses them. The HTML view loads first and the renderer loads only after activation.
- **Dependencies.** Keep `@vercel/functions` scoped to the live widget if Runtime Cache is selected. Its cache is regional and evictable. Use Node's test runner for isolated pure functions if its TypeScript constraints fit. Add Vitest only if the project needs its tooling. Keep Playwright and axe for browser and accessibility checks. Skip coverage tooling, extra animation and 3D libraries, CMS, and analytics packages until justified. [Node TypeScript support](https://nodejs.org/api/typescript.html), [Vercel Runtime Cache API](https://vercel.com/docs/functions/functions-api-reference/vercel-functions-package)
- **Release safeguards.** Check preview indexing via metadata or HTTP headers and use deployment protection for access control. Verify Git event delivery before making post-deploy automation a gate. Start with a manual rollback decision. An inline script allowance is a CSP tradeoff, so verify the policy against the production build and document the exception. Keep HSTS preload out of the initial launch. [Next.js CSP guide](https://nextjs.org/docs/app/guides/content-security-policy), [Vercel response headers](https://vercel.com/docs/headers/response-headers)

### Unresolved blockers

| Blocker | Scope and next decision |
| --- | --- |
| Approved public content and canonical domain | Confirm the copy, assets, claims, and final HTTPS host before public launch. Core scaffolding can proceed without the final domain. |
| GitHub credential and visibility | The exact token and signed-out parity have not been verified. Blocks live contributions only. Leave the widget unavailable until confirmed. |
| Registry source and physical device evidence | The final copy, mobile frame pacing, touch behavior, and assistive tech flow remain unverified. Blocks optional terrain only. |
| Hosting and repository settings | Confirm Vercel plan, preview protection, GitHub feature eligibility, and deployment event delivery before making those checks mandatory. |
| Integrated build and field metrics | Version compatibility is documented, with production build and smoke verification pending. Field metrics require real traffic and do not block initial launch if the lab and accessibility gates pass. |

## Recommended stack

Use Next.js App Router with TypeScript and Tailwind CSS. Build a distinct visual identity through typography, layout, and project imagery. Use shadcn/ui for shared controls, Motion for purposeful interactions, and Kokonut UI for a small number of distinctive effects. Deploy on Vercel with Node.js 24 LTS.

| Layer | Recommended baseline | Evidence and role |
| --- | --- | --- |
| Next.js | **16.4.6**, App Router | Stable npm release checked. The package requires Node.js ≥20.9 and accepts React and React DOM `^19.0.0`. Use it for routes, prerendering, and metadata. [Published package](https://registry.npmjs.org/next/latest), [installation docs](https://nextjs.org/docs/app/getting-started/installation) |
| React and React DOM | **19.3.1** for both | Matching stable releases satisfy Next.js and Motion peer ranges. Declare both as app dependencies. The App Router uses a framework managed React build internally. [React releases](https://github.com/react/react/releases), [React DOM versions](https://www.npmjs.com/package/react-dom?activeTab=versions), [Next.js installation docs](https://nextjs.org/docs/app/getting-started/installation) |
| TypeScript | **7.0.2** | Stable npm release checked. Next.js documents TypeScript 7 support through the project local `tsc` CLI used by default in builds. Keep that default because TypeScript 7 lacks the JavaScript compiler API. Check that any future add-on using the compiler API supports TypeScript 7 before adopting it. [Published package](https://registry.npmjs.org/typescript/latest), [Next.js TypeScript docs](https://nextjs.org/docs/app/api-reference/config/typescript#using-typescript-7) |
| Tailwind CSS | **4.3.5**, with matching `@tailwindcss/postcss` | Use the v4 PostCSS integration and CSS theme tokens. shadcn/ui documents Tailwind v4 with React 19. Tailwind v4 targets modern browsers, with a documented floor of Safari 16.4, Chrome 111, and Firefox 128. [Stable release](https://github.com/tailwindlabs/tailwindcss/releases/tag/v4.3.5), [Next.js integration](https://tailwindcss.com/docs/installation/framework-guides/nextjs), [browser compatibility](https://tailwindcss.com/docs/compatibility), [shadcn/ui v4 guide](https://ui.shadcn.com/docs/tailwind-v4) |
| shadcn/ui | **4.23.1** CLI, latest stable release found upstream | The version identifies the `shadcn` CLI. Generated UI components are source files owned by the project. Use the CLI to select only the primitives the portfolio needs and review generated changes before accepting updates. [Official releases](https://github.com/shadcn-ui/ui/releases), [CLI docs](https://ui.shadcn.com/docs/cli), [introduction](https://ui.shadcn.com/docs) |
| Motion | **14.14.0**, package `motion` | Latest stable npm version checked. The package declares React and React DOM peers `^18.0.0 \|\| ^19.0.0`. Motion's React guide specifies React ≥18.2 and covers both App Router imports. [npm versions](https://www.npmjs.com/package/motion?activeTab=versions), [upstream manifest](https://github.com/motiondivision/motion/blob/main/packages/motion/package.json), [React installation guide](https://motion.dev/docs/react-installation) |
| Kokonut UI | **Public `@kokonutui` registry**, selected items | The official setup distributes source per item through the shadcn CLI. There is no sitewide runtime version to pin for this workflow. Registry items can bring Motion, icons, or shadcn primitives. Review each item's source and dependency list. [Installation docs](https://kokonutui.com/docs), [upstream registry](https://github.com/kokonut-labs/kokonutui/blob/main/registry.json) |
| Vercel | **Managed Next.js integration**, Node.js **24.x LTS** | Vercel lists 24.x as supported for builds and functions. Use the same major locally and on Vercel. The managed Git workflow supports preview deployments and needs no Vercel CLI version in the app. [Node.js support](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions), [Next.js integration](https://vercel.com/docs/frameworks/full-stack/nextjs), [deployment environments](https://vercel.com/docs/deployments/environments) |

## Architecture and tradeoffs

- **Rendering and content.** Prerender the homepage and project case studies where content is known at build time. Keep content and layouts in Server Components. Put interaction in small Client Components. Start with source controlled project content. A CMS or database would add maintenance without a current editing or data requirement. Use the Next.js Metadata API, sitemap, and Open Graph images for discovery and sharing. [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components), [metadata and OG images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- **Design system.** Use one set of semantic color, spacing, and typography tokens in Tailwind and shadcn/ui. Use shadcn primitives for interactive controls. Consider one Kokonut effect for the hero or project showcase. Check its required registry items, CSS changes, extra packages, and keyboard behavior before adoption. Track the copied code in version control so updates can be reviewed as source diffs. [shadcn/ui theming](https://ui.shadcn.com/docs/theming), [Kokonut installation docs](https://kokonutui.com/docs)
- **Animation and accessibility.** Use CSS for simple hover and focus transitions. Use `motion/react` inside Client Components for hooks, gestures, or layout animation. Motion also documents `motion/react-client` for declarative components imported from Server Components. Respect reduced motion through `MotionConfig` or `useReducedMotion`, and keep content and navigation usable with effects suppressed. [Motion installation](https://motion.dev/docs/react-installation), [Motion accessibility](https://motion.dev/docs/react-accessibility)
- **Performance.** Keep the default Next.js deployment on Vercel and let eligible routes prerender. Use responsive `next/image` assets and `next/font`. Limit large or continuous visual effects on the first screen, especially on mobile. A later preview should verify LCP, INP, CLS, reduced motion, and keyboard navigation before launch. [Next.js images](https://nextjs.org/docs/app/getting-started/images), [fonts](https://nextjs.org/docs/app/getting-started/fonts), [Vercel Speed Insights](https://vercel.com/docs/speed-insights)
- **Hosting and updates.** Use Git previews to review dependency updates and registry source diffs. Commit the lockfile when the app is created and recheck current patched releases then. Vercel Hobby is for personal, noncommercial use. Choose the plan based on the site's actual use. [Next.js support policy](https://nextjs.org/support-policy), [Vercel environments](https://vercel.com/docs/deployments/environments), [Hobby terms](https://vercel.com/docs/plans/hobby)

## Verification limits

Package metadata and official docs support the baseline. A combined install, production build, browser check, and deployment remain untested. Kokonut compatibility must be checked against the exact registry items selected during implementation.

## Kokonut UI Activity Terrain

Researched on November 25, 2026. The component was not installed. Its source was read from the public registry entry that the CLI uses, `https://kokonutui.com/r/activity-terrain.json`. The live demo was inspected in Chrome at `https://kokonutui.com/docs/cards/activity-terrain`. The GitHub API contract was checked with schema introspection and test queries.

Labels: **[V]** verified in source, the browser, or an API response. **[A]** inference, not tested. **[K]** prior knowledge, not rechecked.

### What the install command does

`npx shadcn@latest add @kokonutui/activity-terrain` resolves the `@kokonutui` namespace to `https://kokonutui.com/r/{name}.json` and copies a single file into the project.

| Item | Finding |
| --- | --- |
| Files | One file: `components/kokonutui/activity-terrain.tsx`, 902 lines, `"use client"` **[V]** |
| Registry metadata | Only `name`, `type: registry:component`, and `files`. There are **no** `dependencies` and no `registryDependencies` entries **[V]** |
| Imports | `react` and `cn` from `@/lib/utils` **[V]** |
| Hidden prerequisite | `@/lib/utils` is not declared, so provide the existing shadcn `cn` helper, or omit that import if a standalone adaptation has no class merging requirement |
| Styling dependency | Tailwind utility classes, arbitrary CSS-variable classes such as `[--terrain-0:#f4f4f5]`, and `dark:` variants **[V]** |
| Runtime packages | None beyond React. The docs page states "no extra packages" **[V]** |

### Licensing

- The file header states MIT, author `@dorianbaffier`, version 1.0.0, dated 2026-10-14 **[V]**.
- The upstream repository `kokonut-labs/kokonutui` reports SPDX `MIT` on GitHub. Its LICENSE file begins "MIT License, Copyright (c) 2025 kokonutUI" **[V]**.
- Requirement: MIT allows modification and commercial use. The copyright and permission notice must stay with the copied code. Keep the file header, and add a third-party notices entry if the header is ever removed.

### Implementation and 3D rendering

The "3D" view is hand-written 2D canvas math. There is no WebGL and no 3D library **[V]**.

- **Data model.** `buildCells` turns `data[]` and `endDate` into cells. Each cell holds column (week), row (Monday to Sunday), count, color level 0 to 4, height, and a UTC date. Level is `ceil(count / max × 4)`. Height is `0.06 + (count / max)^0.85 × 4.2` **[V]**.
- **Projection.** `project()` applies a yaw rotation around the vertical axis, then a pitch tilt, with orthographic scaling. The terrain view rests at pitch 56° and yaw 18°. Drag is limited to ±38° yaw and 66° pitch, with exponential "rubber-band" resistance past the limits **[V]**.
- **Fit to container.** Every frame, `pose()` projects the board's eight bounding corners at the current angle. It then computes the scale and centre that fit the board inside the canvas minus 28 px padding **[V]**.
- **Visibility and draw order.** Painter's algorithm: cells are sorted back to front by rotated depth on every frame. `visibleFaces()` emits only the walls that face the camera plus the top face. Walls are darkened 22% and 38% for shading. A 0.6 px stroke in the fill color hides seams **[V]**.
- **Hit testing.** Ray-casting point-in-polygon over the visible faces, front to back **[V]**.
- **Animation.**
  - Semi-implicit Euler springs: pitch stiffness 140, critically damped; edge stiffness 180; hover "bump" stiffness 400.
  - Flick spin decays with a 0.16 s half-life.
  - Columns rise in a wave outward from the grab point, with `easeOutBack` overshoot.
  - `dt` is capped at 1/30 s **[V]**.
- **Render loop.** It runs only while there is motion. `requestAnimationFrame` stops once the system's energy falls below `0.0005`, so the idle animation loop stops scheduling frames. It also stops when offscreen (`IntersectionObserver`) or when the tab is hidden **[V]**.
- **Cost.** Each frame sorts every cell. Each pointer move re-sorts and hit-tests. The cost at full calendar density needs a physical mobile trace **[A]**.
- **Colors.** Read from CSS variables `--terrain-0` to `--terrain-4`, `--terrain-accent`, and `--terrain-text` with `getComputedStyle`, then cached. They are re-read when a `MutationObserver` sees `class`, `style`, or `data-theme` change on `<html>`, or when `prefers-color-scheme` changes **[V]**.

### Customization surface

| Prop | Type | Default | Note |
| --- | --- | --- | --- |
| `data` | `number[]`, oldest first | 26 weeks of seeded demo data | **Risk:** an `undefined` value silently renders fake data **[V]** |
| `endDate` | `"YYYY-MM-DD"` | `"2026-10-11"` hard-coded | Always pass it **[V]** |
| `title` | `string` | `"Activity"` | Also used in the canvas `aria-label` **[V]** |
| `defaultFlat` | `boolean` | `false` | Start as a 2D heatmap **[V]** |
| `className` | `string` | none | Merged last via `cn` **[V]** |

Customization beyond props means editing the owned file. That is the intended shadcn model.

- **Theme.** Override the `--terrain-*` variables. **They must be hex.** `hexToRgb` parses only `#rgb` and `#rrggbb`, so `oklch()` or `lab()` values produce wrong colors **[V]**.
- **Card chrome.** Hard-coded: `rounded-3xl`, zinc border and background, emerald accent, `max-w-2xl`, canvas `h-72` **[V]**. Edit these to the site tokens.
- **Dark mode coupling.** Terrain colors switch through `dark:` classes **[V]**. Tailwind v4's default `dark:` variant follows `prefers-color-scheme`. A class-based theme toggle needs a custom variant such as `@custom-variant dark (&:where(.dark, .dark *));` **[K]**. Without it, the toggle and the terrain disagree.
- **Labels.** Fixed `11px` text in the inherited font. Month and weekday labels lie on the ground and fade out as the terrain rises **[V]**.

### Responsiveness

- Width is fluid (`w-full`, capped at `max-w-2xl`). Height is fixed at 288 px (`h-72`). A `ResizeObserver` resizes the backing store at `devicePixelRatio`, capped at 2, and redraws **[V]**.
- The board auto-fits any width. With 53 weeks on a roughly 350 px phone screen, each column is about 5 px wide, too small to read or tap **[A]**. Default to the HTML view on narrow screens. Consider a labeled shorter range only if device testing shows it helps.
- Touch: the canvas uses `touch-pan-y`, so vertical page scroll keeps working over it **[V]**. One consequence: a vertical drag on touch is likely claimed by the browser for scrolling. Touch users can probably turn the terrain left and right but not tilt it; the Flat/Terrain buttons still work **[A]**. Test on a device.
- Pointer input uses pointer capture, a 4 px drag threshold, and throw velocity from the last 5 samples. A throw lands on whichever view (flat or terrain) it is heading toward **[V]**. Tapping a column highlights it and updates the readout **[V]**.

### Accessibility

Already present **[V]**:

- The canvas is focusable (`tabIndex=0`) with `role="img"` and an `aria-label` giving the total and keyboard instructions.
- Arrow keys move between days. Leaving focus clears the highlight.
- The readout updates through `aria-live="polite"` and uses tabular numerals.
- The Flat/Terrain buttons are real `<button>` elements with `aria-pressed` and `focus-visible` rings.
- With `prefers-reduced-motion: reduce`, there is no intro spin, no springs, and no bumps. Every state change lands instantly.

Gaps to fix when integrating:

| Gap | Evidence | Fix |
| --- | --- | --- |
| Reduced-motion is read once at mount; there is no change listener | `motion.matches` only, no `addEventListener` **[V]** | Add a `change` listener, as already done for `prefers-color-scheme` |
| Only the 4 arrow keys are supported | `handleKeyDown` **[V]** | Add Home/End, and optionally PageUp/PageDown by month |
| An interactive element exposed as `role="img"` | **[V]**; impact **[A]** | Keep it, and add a visually hidden table or monthly summary as the real text alternative |
| The live region also updates on mouse hover | `hover()` sets the readout state **[V]**; chatter **[A]** | Optionally announce only during keyboard interaction |
| Labels at 11 px and default `--terrain-text` contrast | **[V]** | Check against site tokens; labels are supplementary because the readout carries the information |

### Input validation risks

`buildCells` does not validate its input **[V]**:

- A negative count gives a negative level. `palette.levels[-1]` is then `undefined`, and `shade()` throws when it destructures it. The canvas render crashes.
- `NaN` produces `NaN` geometry.
- One outlier day sets `max`, which flattens every other column.
- Clipping counts before passing them in would make the readout show false numbers, because it displays `cell.count`.

Validate on the server: integers ≥ 0, contiguous days, and a valid `endDate`. To handle outliers, edit the component to take an optional `levels` prop for colors, and compress heights with `sqrt` or a p95 cap.

### Integration decision

Use the GitHub integration and roadmap below. Calendar length and date boundaries vary. The Canvas 2D component has no `levels` prop in the inspected source. If Activity Terrain is adopted, add support for GitHub levels only where needed for consistency with the HTML view. Remove its seeded demo default before enabling it on the public site. Keep raw counts intact even if heights are visually compressed.

## GitHub contribution integration for RohinCodes15

Architecture recommendation researched November 25, 2026. No authenticated request was made for RohinCodes15. Derive calendar bounds from the validated response.

### Retrieve and validate GitHub's calendar

- From a Next.js Node.js server module marked `server-only`, send a JSON POST to `https://api.github.com/graphql` with `Authorization: Bearer <token>`. Fix the operation and the `RohinCodes15` login on the server. Use GraphQL variables and accept no visitor supplied query, login, date range, or force refresh. Read `user(login: $login) { login contributionsCollection { startedAt endedAt contributionCalendar { totalContributions weeks { contributionDays { date contributionCount contributionLevel } } } } }`. Use GitHub's default past year for the rolling view. The calendar's nested weeks and days are lists and need no pagination. [GitHub GraphQL requests](https://docs.github.com/en/graphql/guides/forming-calls-with-graphql), [GitHub Users schema](https://docs.github.com/en/graphql/reference/users), [Next.js server and client boundaries](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- Require successful HTTP status, valid JSON, no GraphQL errors, a matching non-null user, and a complete calendar. Validate nonnegative integer counts and total, known level enums, valid date strings, and unique consecutive dates after normalization. Reject an inconsistent total or unexplained gaps rather than inserting zeroes. Preserve GitHub date strings and derive the display range from the returned dates. Keep the HTML summary independent of the terrain. If adopted, pass the terrain explicit `data` and `endDate`, plus `levels` if the reviewed adaptation supports it. Use GitHub's `totalContributions` for the full calendar and sum validated daily counts only for any displayed subset. Label counts as GitHub contributions, which include activity beyond commits. [Calendar schema](https://docs.github.com/en/graphql/reference/users#contributioncalendar), [profile contribution rules](https://docs.github.com/en/account-and-profile/reference/profile-contributions-reference)

### Credentials and visibility

- Start with an expiring, fine-grained PAT and the minimum repository access the UI allows. Add no write or private repository access. Keep it in Vercel as a Production Secret such as `GITHUB_CONTRIBUTIONS_TOKEN`, with no `NEXT_PUBLIC_` prefix. Keep it out of Git, build output, logs, browser props, and client requests. Use a separate credential only for trusted previews that need live data. Other previews can show the unavailable state. Revoke and rotate on exposure. GitHub documents fine-grained PAT support for GraphQL and public repositories. Confirm the exact query with the final token before launch since field access can vary. [GitHub authentication](https://docs.github.com/en/graphql/guides/forming-calls-with-graphql#authenticating-with-graphql), [PAT management](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens), [Vercel Secret variables](https://vercel.com/changelog/environment-variables-now-use-config-and-secret-types)
- Treat the site as a public viewer. Publish only aggregates the account owner has approved for public display, and check the production token's calendar against the signed-out profile before launch. GitHub can display anonymized private activity when the owner enables it, and the schema documents optional `read:user` access for private and internal contributions. Do not broaden access, query private repository details, or add `restrictedContributionsCount` to the calendar total. If the token exposes a wider view than intended, withhold the widget. Purge cached data when visibility changes or publication is revoked. [GitHub Users schema](https://docs.github.com/en/graphql/reference/users#contributionscollection), [profile visibility settings](https://docs.github.com/en/account-and-profile/how-tos/contribution-settings/manage-visibility-settings-for-private-contributions-and-achievements)

### Cache and rate limits

- Keep the rest of the portfolio independent of GitHub. Load the widget at runtime within its own boundary so a missing secret or outage does not block a build or render. Use Vercel Runtime Cache for the validated public payload, keyed by login, visibility policy, and schema version. Make it fresh for **1 hour** and retain the last good payload for at most **24 hours** from retrieval. Store the actual UTC retrieval timestamp and range with it. Use an uncached upstream fetch and replace the cached payload only after validation. Check age on every read and label an older payload “Last updated …”. Cache eviction or a cold deployment can leave no fallback. [Vercel Runtime Cache API](https://vercel.com/docs/functions/functions-api-reference/vercel-functions-package)
- Refresh on demand after the fresh window. Coalesce overlapping refreshes within each runtime instance and reuse the cached entry on ordinary page loads. A regional cache is not a global refresh lock. Keep a separate cooldown entry in the runtime cache so rejected refreshes do not trigger an upstream call on every visit. Use a short upstream timeout, such as 3 seconds, with no inline retry. No scheduler or database is required for this design. [Vercel Runtime Cache API](https://vercel.com/docs/functions/functions-api-reference/vercel-functions-package)
- GitHub's standard user budget is **5,000 GraphQL points per hour**. Other requests under the same user budget can consume it, and secondary limits apply separately. Use response headers for remaining points and reset time. On primary exhaustion, including HTTP 200 with GraphQL errors and `x-ratelimit-remaining: 0`, suppress refresh until after `x-ratelimit-reset` (UTC epoch seconds). On secondary throttling, honor `Retry-After` when present and any applicable later primary reset. If neither gives a wait, allow at least one minute before another attempt and increase the delay on repeated throttling. Continue serving an eligible cached payload while waiting. [GitHub GraphQL rate limits](https://docs.github.com/en/graphql/overview/rate-limits-and-query-limits-for-the-graphql-api)

### Failure behavior and acceptance criteria

| Condition | Behavior |
| --- | --- |
| Valid GitHub response | Publish the verified calendar and update the last successful timestamp. A verified zero count is valid. |
| Timeout, network error, 5xx, malformed JSON, partial GraphQL data, invalid calendar, or throttle | Keep the last validated public payload within its age limit. Back off before the next refresh. Never cache a failed response as calendar data. |
| Missing secret, invalid credential, insufficient permissions, or user missing | Avoid repeated requests, record a sanitized configuration or access error, and show the unavailable state if no eligible cached data exists. Withhold data immediately if visibility is in doubt. |
| No valid payload, or fallback has expired | Show “GitHub activity unavailable” and link to the [GitHub profile](https://github.com/RohinCodes15). Do not mount the terrain or show zeroes, sample data, or estimated statistics. |

Log only diagnostic metadata such as the failure category, HTTP status, GitHub request ID, rate limit headers, and cache age. Never log credentials or raw responses. Before launch, verify the exact production query and signed-out visibility, then check cache hits, stale and expired fallback, HTTP 200 with GraphQL errors, 401/403/429, timeout, verified zeroes, and absence of token or demo data from browser output.

## Portfolio architecture

Designed November 25, 2026. This builds on the stack above (Next.js 16 App Router, React 19, TypeScript, Tailwind v4, shadcn/ui) and the GitHub section above. Labels: **[V]** checked during the original research, **[K]** prior knowledge to confirm when scaffolding.

### Principles

- **Static by default.** Prerender core routes from repository content. Add GitHub activity as a request-time boundary only when the widget is enabled.
- **Server Components by default.** A component becomes a Client Component only when it needs browser state, events, or browser APIs. Each client island receives small, serializable props.
- **Content lives in Git.** Start with typed content and JSX. Use MDX when multiple long-form pages need reusable editorial components. Structured lists are typed TypeScript modules. TypeScript checks the content at build time, so there is no CMS, database, or runtime validation for trusted content.
- **One source of truth per fact.** The tech stack is defined once and referenced by projects, so the stack explorer can never drift from the case studies.

### Candidate directory structure

This is an end state sketch. Create files only as the roadmap enables their feature.

```
app/
  layout.tsx                 # html/body, fonts, ThemeProvider, header, footer, skip link
  globals.css                # Tailwind v4, design tokens, @custom-variant dark
  page.tsx                   # home: intro, activity, selected work, leadership highlights
  not-found.tsx
  sitemap.ts                 # generated from the content registries
  robots.ts
  opengraph-image.tsx        # one default OG image; per-page images only if needed
  work/
    page.tsx                 # all case studies + stack explorer
    [slug]/page.tsx          # case study: generateStaticParams, dynamicParams = false
  research/
    page.tsx                 # research index
    [slug]/page.tsx          # write-up with embedded demos
  about/
    page.tsx                 # leadership, certifications, timeline (since age 10)
components/
  ui/                        # shadcn-generated primitives, only those used
  kokonutui/
    activity-terrain.tsx     # copied registry file, edited per the sections above
  site/
    header.tsx  footer.tsx  skip-link.tsx
    theme-provider.tsx       # client
    theme-toggle.tsx         # client
    copy-email.tsx           # client
  sections/
    intro.tsx                # uses <details> for the Brief/Full depth toggle (no JS)
    activity.tsx             # server: fetches GitHub, renders HTML summary or unavailable state
    project-list.tsx  leadership-list.tsx  certification-list.tsx  timeline.tsx
    stack-explorer.tsx       # client: filter projects by technology
  mdx/
    figure.tsx  sidenote.tsx  metric.tsx   # server components used inside MDX
  demos/
    <demo-name>.tsx          # client, one file per research demonstration
content/
  site.ts                    # name, role line, links, email, availability
  stack.ts                   # technologies: id, label, category
  leadership.ts  certifications.ts  timeline.ts
  projects/
    index.ts                 # ordered registry of project metadata
    <slug>.mdx
  research/
    index.ts
    <slug>.mdx
    <slug>/data.json         # precomputed demo data, if a demo needs it
lib/
  types.ts                   # Project, Research, Leadership, Certification, StackId
  content.ts                 # getProjects(), getProject(slug), projectsByStack(), ...
  github/
    contributions.ts         # server-only fetch + cache (see GitHub section)
    validate.ts              # pure validation + adaptation to terrain props
    validate.test.ts
  utils.ts                   # cn() from shadcn init
mdx-components.tsx           # required at the project root by @next/mdx [K]
public/
  resume.pdf
  images/projects/<slug>/…
```

No `src/` folder, route groups, barrel files, or `hooks/` and `store/` folders until something needs them.

### Content model

| Content | Format | Shape (in `lib/types.ts`) | Shown on |
| --- | --- | --- | --- |
| Project case studies | MDX in `content/projects/`, metadata in `index.ts` | `slug, title, summary, role, year, stack: StackId[], outcomes: { label, value }[], links, featured` | home (featured), `/work`, `/work/[slug]` |
| Research demonstrations | MDX in `content/research/`, metadata in `index.ts` | `slug, title, abstract, date, stack: StackId[], hasDemo` | `/research`, `/research/[slug]`, optional home teaser |
| Leadership experience | `content/leadership.ts` | `org, role, start, end?, summary, outcomes: string[], link?` | home (top 2), `/about` |
| Certifications | `content/certifications.ts` | `name, issuer, issued, expires?, verifyUrl` | `/about` |
| Technology stack | `content/stack.ts` | `id, label, category` with `StackId` derived from the keys | `/work` explorer, project metadata rows |
| Timeline | `content/timeline.ts` | `year, title, detail?` | `/about` |

- **Optional MDX setup.** Use the official `@next/mdx` (16.4.6, matching Next.js **[V]**) with `@mdx-js/loader`, `@mdx-js/react`, and `@types/mdx` **[K]**. Do not add a frontmatter parser.
- **Registries.** Each `index.ts` is an explicit, ordered array of metadata objects typed with `satisfies`. The `[slug]` page loads the body with `await import(\`@/content/projects/${slug}.mdx\`)` **[K]**. An explicit registry keeps order and the "featured" flag in one place and avoids filesystem scanning.
- **Stack typing.** `StackId` is `keyof typeof stack`, so a project referencing an unknown technology fails the type check.
- **Certifications.** Link each one to the issuer's verification page instead of embedding badge images. List only certifications relevant to the target roles.
- **When to scale up.** Revisit the registries only if maintaining them becomes a measured problem or the editing workflow changes.

### Server and client boundaries

| Component | Runs on | Why | Props or data |
| --- | --- | --- | --- |
| Layouts, pages, section lists, MDX bodies, `figure`/`sidenote`/`metric` | Server | Static content, zero client JS | Imports from `content/` and `lib/content.ts` |
| `sections/activity.tsx` | Server, inside `<Suspense>` | Holds the GitHub token and cache; must not block the rest of the page | Passes validated `{ data, levels, endDate, total, retrievedAt }` to the terrain |
| `kokonutui/activity-terrain.tsx` | Client | Canvas, pointer, keyboard | Plain arrays and strings only |
| `site/theme-provider.tsx`, `site/theme-toggle.tsx` | Client | `localStorage`, `matchMedia`, class on `<html>` | None |
| `sections/stack-explorer.tsx` | Client | Filter state | Server precomputes `{ categories, technologies, projects: { slug, title, stack }[] }`. Full MDX and metadata are not shipped |
| `site/copy-email.tsx` | Client | Clipboard API and `aria-live` feedback | `email` |
| `demos/*` | Client | Interactive research visualisations | Precomputed JSON imported on the server and passed as props, or loaded on demand |
| Brief/Full depth toggle | Server (HTML) | Native `<details>`/`<summary>` is accessible and needs no JS | — |

Rules:

- Mark modules that read secrets with `import "server-only"`. Never use a `NEXT_PUBLIC_` prefix for tokens.
- Client islands import from `components/ui` and their own props only, never from `content/` or `lib/github/`. This keeps content and secrets out of the client bundle.
- A heavy demo (WebGL, WASM, large data) mounts behind a "Run demo" button using `next/dynamic` with `ssr: false` inside a client wrapper. Its static figure and caption render first, so the page works without running it.

### Activity widget rendering

- Recommended: render `sections/activity.tsx` inside `<Suspense>`, with a fixed-height fallback to avoid layout shift. With Next.js 16 Cache Components the page shell stays prerendered and only this boundary renders at request time **[K, confirm when scaffolding]**. Use an explicit request-time boundary for external I/O and verify that the build works without a token and produces a prerendered shell. Cache, refresh, and failure behaviour follow the GitHub section above. [Cache Components](https://nextjs.org/docs/app/getting-started/cache-components)
- Fallback, if Cache Components is not used: keep the page fully static and have the terrain fetch from one `app/api/activity/route.ts` handler that applies the same cache and validation. This costs a client request and removes the live summary from HTML. Prefer leaving the widget disabled if this would fail the accessibility gate.

### Theme switching

- **Library.** Start with system color preference in CSS. If a persistent manual theme switch is required, evaluate `next-themes` (0.4.6 was researched). Its peer range includes React 19 **[V]**. It provides the pre-hydration script that prevents a flash of the wrong theme, follows the system theme, syncs across tabs, and can disable transitions during a switch **[K]**.
  - Risk: the package was last published in March 2025 **[V]**. If it ever conflicts with a framework upgrade, replace it with an inline `<head>` script plus a small toggle, about 40 lines.
- **Configuration.** Use `attribute="class"`, `defaultTheme="system"`, `enableSystem`, and `disableTransitionOnChange`. Add `suppressHydrationWarning` on `<html>` **[K]**.
- **Tailwind wiring.** Add `@custom-variant dark (&:where(.dark, .dark *));` in `globals.css` so `dark:` follows the class instead of the OS setting **[K]**. Without it, the Activity Terrain's `dark:` variables and the toggle disagree (see the terrain section above).
- **Toggle UI.** Three states (light, dark, system), built as a radio group or toggle group. Render a placeholder of the same size until mounted to avoid a hydration mismatch **[K]**.

### Interactive technology stack

- **Approach.** The stack is a way into the case studies, not a logo wall. The explorer lists technologies grouped by category. Selecting one filters the project list to the projects that used it and shows a count per technology. Everything comes from `stack.ts` plus each project's `stack` field.
- **Accessibility.** Filter buttons use `aria-pressed`. The result count is announced through `aria-live="polite"`. With JavaScript off, every project still shows, because the server-rendered list is the default.
- **State.** Local React state only. Put the filter in the URL query string only if shareable filtered views become a requirement; doing so makes the route dynamic or needs client-side URL handling.

### Testing (proportionate)

- Focused unit tests for `lib/github/validate.ts` and `lib/content.ts` helpers (`projectsByStack`, sorting, unique slugs). These are the only non-trivial logic.
- One Playwright smoke run covering:
  - every route renders;
  - theme toggle persists across reload with no flash;
  - stack filter works with the keyboard;
  - the activity unavailable state renders when the token is missing.
- `next build` doubles as the content check: type errors in registries and a missing MDX slug both fail the build.

### Deliberately excluded

These are excluded until a concrete need appears:

- CMS, database, or auth.
- Global state library.
- i18n.
- Monorepo.
- Custom API layer beyond the one optional activity route.
- Zod for repository content. A hand-written, tested validator covers the single external payload; adopt a schema library only if more external data sources arrive.
- Per-page OG image generation.
- Analytics beyond Vercel's built-in options.
- ⌘K command menu.
- Blog infrastructure: research pages cover long-form writing for now.


## Performance and accessibility acceptance criteria

Research checked November 25, 2026. Treat 3D as an enhancement to an HTML portfolio. Project details, navigation, contact links, and any verified contribution data should remain usable without the scene. The numeric transfer and rendering budgets below are project targets. Core Web Vitals and WCAG thresholds come from the cited standards.

| Area | Recommended approach | Acceptance criteria |
| --- | --- | --- |
| Core Web Vitals | Render the hero and main content in HTML. Prioritize the actual LCP asset, reserve dimensions for media and the 3D placeholder, and keep heavy work off the interaction path. | Field p75 **LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.10**, evaluated separately for mobile and desktop once sufficient data exists. Check the home page and project routes where samples permit. Record insufficient field data as pending. [Google Web Vitals](https://web.dev/articles/vitals) |
| Lazy loading | Reserve the scene's aspect ratio before load. Render a lightweight static preview and load the renderer, models, and textures only after explicit activation. Use a dynamic import from a Next.js Client Component. Apply `ssr: false` there if the renderer needs browser APIs during initialization. | On a cold home page load, **zero scene scripts, models, or textures** transfer before activation. Initial JavaScript transfer stays **≤200 KiB compressed** through 5 seconds after load with no interaction. The initial layout and preview remain intact if the scene download fails. [Next.js lazy loading](https://nextjs.org/docs/app/guides/lazy-loading) |
| Reduced motion | Respect `prefers-reduced-motion` in CSS and scene code, and set Motion's `reducedMotion` to `"user"`. Motion's setting disables transform and layout animation but can leave other animated values active. Use a static view or immediate state changes for nonessential effects. | With reduced motion enabled before load or changed while open, **zero automatic rotations, parallax effects, scroll reveals, or camera tweens** run. Content and controls remain available. Any automatic movement that lasts **more than 5 seconds** alongside other content has a keyboard accessible pause, stop, or hide control, unless essential. [Motion accessibility](https://motion.dev/docs/react-accessibility), [WCAG 2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) |
| Keyboard and assistive tech | Use labeled HTML controls for activation, reset, and any meaningful scene action. Offer single pointer alternatives for drag or pinch actions. Keep any data shown in the scene available in a text view or table. | Keyboard alone can reach and operate **every meaningful action** and leave the viewer using standard keys. Focus follows a logical order, stays visible and unobscured, and returns to the trigger if a modal viewer closes. Verify the same data and control names with a screen reader. [WCAG 2.2](https://www.w3.org/TR/WCAG22/) |
| Mobile 3D | Start with a static preview. Use a smaller render buffer, cap mobile device pixel ratio at **1.5** as a starting budget, and reduce effects before dropping the HTML fallback. Render on demand where possible and stop drawing when idle, offscreen, or in a hidden tab. | At **320 CSS px** the page has no horizontal overflow and touch scroll works around the viewer. Use **≥24 × 24 CSS px** for custom viewer controls. On a physical midrange Android device, a repeatable **10 s** session using the actual scene controls (for Activity Terrain, drag and switch Flat/Terrain) has p95 frame intervals **≤33.3 ms** after load on the 3D path. If it cannot meet budget after reducing quality, serve the static view for that tier. Verify the static view on iOS Safari and when canvas initialization fails. Simulate WebGL context loss only if a later demo uses WebGL. [MDN WebGL best practices](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices), [WCAG 2.2 reflow and target size](https://www.w3.org/TR/WCAG22/) |
| SEO | Prerender indexable portfolio copy, headings, and links in Next.js. Put scene descriptions and relevant project details in HTML. Use Next.js metadata, sitemap, and robots conventions. | With JavaScript disabled, **every indexable route** returns HTTP 200 and exposes its main content and crawlable links with `href`. Check distinct titles and descriptions, one correct canonical per route, working Open Graph assets, and a sitemap with only canonical production URLs. Verify production pages are crawlable and preview deployments stay out of indexing. Use Search Console URL Inspection once deployed. [Google JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics), [Next.js metadata files](https://nextjs.org/docs/app/api-reference/file-conventions/metadata) |
| Color contrast | Use semantic tokens and solid backplates or scrims where text overlaps moving scenes. Give charts a text or labeled alternative so color alone carries no information. | In light and dark themes, normal text is **≥4.5:1**, large text is **≥3:1** (at least 18 pt regular or 14 pt bold), and required control boundaries, focus indicators, and meaningful graphic cues are **≥3:1** against adjacent colors. Measure the lowest contrast across expected backgrounds and interactive states. [WCAG 2.2 contrast and use of color](https://www.w3.org/TR/WCAG22/) |

### Verification protocol

1. On a production build, run three cold Lighthouse mobile navigations each for the homepage and a representative case study. Record browser version, throttling preset, and medians. Use **LCP ≤ 2.5 s, CLS ≤ 0.10, and TBT ≤ 200 ms** as lab gates. TBT helps diagnose main thread blocking. Field INP remains a separate measure.
2. Use the browser network panel to confirm the initial transfer cap and deferred scene assets. Record the mobile rendering trace on a named device with the same scene and interaction sequence. Block the renderer or simulate a renderer failure and check that the static view and surrounding page still work.
3. Walk the keyboard flow from page load through scene entry, controls, and exit. Repeat with one desktop and one mobile screen reader, both themes, and reduced motion enabled. Check contrast manually over gradients and moving backgrounds. Treat automated scans as a supplement to those checks.
4. Inspect production HTML, response headers, metadata, and sitemap. Review field data by device using CrUX when available or real user monitoring. Record routes with insufficient traffic as pending.

These criteria are proposed gates for a future build. No performance, accessibility, or indexing results are claimed here.

## Testing, CI/CD, and deployment

Recommended November 25, 2026. This section turns the test scope in "Portfolio architecture" and the gates in "Performance and accessibility acceptance criteria" into a pipeline. Versions were checked against npm and GitHub releases during the original research **[V]**. Platform behaviour marked **[K]** should be confirmed during setup.

### Pipeline overview

```
PR opened ──▶ GitHub Actions "ci": lint, types, unit, build, browser + axe ──┐
         └──▶ Vercel preview deployment (Git integration)                    ├─▶ merge to main (checks required)
                                                                              │
main ──▶ Vercel production deployment ──▶ Actions "verify-production" smoke ──▶ manual rollback decision if it fails
```

- **Vercel deploys through its Git integration, not from Actions.** No Vercel token is stored in GitHub, and previews and production need no deploy scripts **[K]**.
- **Actions run only the checks**, on `pull_request` and on pushes to `main`. A `concurrency` group cancels superseded runs.
- **Cost.** Measure job duration after the first few runs before setting a time budget. Actions minutes are free for public repositories, and private repositories have a monthly free allowance **[K]**.

### Tooling

| Purpose | Tool | Version checked |
| --- | --- | --- |
| Unit tests and coverage | `vitest` if native tests are insufficient | 5.1.2 **[V]** |
| Browser tests | `@playwright/test` | 1.65.1 **[V]** |
| Automated accessibility | `@axe-core/playwright` | 4.14.1 **[V]** |
| Actions | `actions/checkout` v7.0.1, `actions/setup-node` v7.1.0, `actions/upload-artifact` v7.0.2, `actions/dependency-review-action` v5.0.1 | **[V]** |
| Lint | ESLint CLI with the Next.js config. `next lint` was removed in Next.js 16, so call `eslint` directly **[K]** | — |

Do not add Jest, Cypress, Storybook, visual-regression services, or a Lighthouse CI server. Lab performance runs stay a manual release step, per the verification protocol above, because shared CI runners make timings noisy.

### Focused unit tests

- **Scope.** Pure logic in `lib/`:
  - `lib/github/validate.ts`: valid payload, GraphQL `errors` with HTTP 200, null user, gaps, duplicate dates, negative or non-integer counts, unknown level enum, total mismatch, and adaptation to terrain props.
  - `lib/content.ts`: unique slugs, `projectsByStack`, sort order, featured selection.
  - Any filter logic extracted from `stack-explorer.tsx` into a pure function.
- **Environment.** Node, no DOM. Do not mock Next.js internals. Fixtures are small JSON files in `lib/github/__fixtures__/`.
- **Coverage.** Gate on the named failure cases. Add a coverage reporter only if the project has a concrete reporting requirement.

### Browser tests (Playwright)

They run in CI against a production build (`next build && next start`), started by Playwright's `webServer` option. CI has no GitHub token, which deliberately exercises the activity "unavailable" path.

| Test | Proves |
| --- | --- |
| Every route in the sitemap returns 200 and has one `<h1>` | Routing and content registries are intact |
| Same routes with `javaScriptEnabled: false` show main content and `href` links | SEO and progressive-enhancement criteria |
| Theme: stored `dark` applies the `dark` class before hydration; the toggle persists across reload | No theme flash and toggle works |
| `reducedMotion: 'reduce'` shows no running CSS animations on load | Reduced-motion criterion (automated part) |
| Stack filter is operable by keyboard; `aria-pressed` and the live result count update | Interactive stack accessibility |
| Activity section shows "GitHub activity unavailable" with a profile link, and no terrain or zero counts | Failure behaviour from the GitHub section |
| Cold home load transfers ≤ 200 KiB of compressed JS and no scene or demo assets before activation | Initial-transfer budget. Read sizes from `request.sizes()` **[K]** |

- **Projects.** Chromium desktop plus one mobile-emulation project (for example `Pixel 7`). Add WebKit on a weekly schedule only if Safari issues appear.
- **Artifacts.** Traces and the HTML report are uploaded on failure.
- **Real GitHub data.** The success path is not tested end to end: the GitHub fetch runs on the server, where `page.route` cannot intercept it. Unit tests cover the adapter. No test-only switches are added to production code.

### Accessibility checks

- Run axe on every route, in light and dark themes, with tags `wcag2a`, `wcag2aa`, `wcag21aa`, and `wcag22aa`. **Any violation fails CI.** Exceptions need an inline comment and an issue link.
- axe catches only part of WCAG. The manual steps in "Verification protocol" (keyboard walk, two screen readers, both themes, reduced motion, contrast over backgrounds) remain a release gate. Record them in the release PR description.

### Security

- **Workflow permissions.** `permissions: contents: read` at workflow level. Pin third-party actions to full commit SHAs, with the version in a comment. No `pull_request_target`.
- **Dependencies.**
  - Dependabot runs weekly for `npm` and `github-actions`, grouped into one PR each.
  - Use dependency review on PRs only after confirming repository and plan eligibility. If available, configure it to flag high-severity advisories or disallowed licenses. [GitHub dependency review](https://docs.github.com/en/code-security/supply-chain-security/understanding-your-software-supply-chain/about-dependency-review) The allowlist includes MIT, ISC, BSD-2/3-Clause, Apache-2.0, and OFL-1.1 for fonts.
  - Use `npm ci` with the committed lockfile.
- **Repository settings** (no workflow files): enable secret scanning with push protection, and CodeQL default setup for JavaScript/TypeScript **[K]**. Protect `main` with a ruleset: PRs required, the `ci` checks required, no force-push, no deletion.
- **Secret leak check.** Inspect generated static assets, HTML, and browser responses for obvious leaks using token pattern checks without exposing the credential to CI. This is a smoke check. The server-only boundary, least privilege, and production-only secret scope provide the main protection.
- **Response headers** set in `next.config.ts` `headers()`, and asserted by the production smoke test:
  - `Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'`. Add origins only for services actually used, such as Vercel Speed Insights.
    - Trade-off: `'unsafe-inline'` for scripts covers Next.js inline bootstrap scripts and the theme pre-hydration script on statically rendered pages. Nonce-based CSP would force dynamic rendering of every page **[K]**. That is a poor trade for a site with no user input, authentication, or third-party scripts. Revisit if any of those are added.
  - Start with a short host-only HSTS policy on the final HTTPS host. Consider subdomain coverage or preload separately after verifying every affected host and the [preload requirements](https://hstspreload.org/).
  - `X-Content-Type-Options: nosniff`.
  - `Referrer-Policy: strict-origin-when-cross-origin`.
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`.

### Environment variables

| Variable | Where | Scope | Notes |
| --- | --- | --- | --- |
| `GITHUB_CONTRIBUTIONS_TOKEN` | Vercel | Production only, type Secret | Fine-grained, expiring, read-only, as defined in the GitHub section. Never set in CI or ordinary previews; those show the unavailable state. Add a calendar reminder before expiry |
| `NEXT_PUBLIC_SITE_URL` | Vercel and CI | All | Canonical origin used for metadata, sitemap, and Open Graph. Previews also use the production origin so canonicals never point at preview URLs |
| `VERCEL_ENV` | Set by Vercel **[K]** | — | Metadata or an HTTP header emits `noindex` on previews. `robots.ts` controls crawling and advertises the production sitemap. Verify response headers on both environments. |

- Commit `.env.example` with variable names only. Ignore `.env*.local` in `.gitignore`.
- Read secrets only in `server-only` modules. A missing token produces the unavailable state, not a build or render failure, consistent with the GitHub section.
- Never print environment values in Actions logs. CI needs **no repository secrets**.

### Vercel configuration

- **Framework and runtime.** Next.js preset, Node.js 24.x, as in the stack table. Production branch is `main`; every PR gets a preview URL.
- **Deployment Protection.** Keep Vercel Authentication on previews **[K]**, so previews stay private and unindexed. CI tests a local production build instead of previews, so no protection bypass secret is needed.
- **Domain.** Add a custom domain and redirect the `www` and apex variants to a single canonical host.
- **Monitoring.** Enable Vercel Speed Insights for field Core Web Vitals, if CrUX lacks enough traffic and first-party monitoring is needed for the field criteria. Count its client payload against the transfer budget.

### Production verification

Run smoke checks against the configured canonical production origin. Automate after confirming which Vercel deployment event the repository receives and that it represents the promoted production deployment. [Vercel GitHub Actions guidance](https://vercel.com/guides/how-can-i-run-end-to-end-tests-after-my-vercel-preview-deployment)

1. Home and one case study return 200 with the expected `<h1>`.
2. The security headers listed above are present.
3. `robots.txt` allows crawling; `sitemap.xml` lists only canonical production URLs.
4. No token patterns appear in client scripts.
5. If enabled, the activity section shows verified GitHub data or the unavailable state. Zero counts are valid only if GitHub returned them.

If the smoke test finds a release regression, assess impact, roll back in Vercel if warranted, and fix forward through a PR.

Per release, the manual steps (record results in the PR):

- The Lighthouse runs and the keyboard, screen-reader, and contrast walk from "Verification protocol".
- Check Search Console once the domain is live.
- Review Speed Insights after enough traffic accumulates.

### CI commands to configure later

Use the committed lockfile and pinned action SHAs. Run lint, a production build with Next.js type checking enabled, focused data tests, and browser smoke checks. Run an additional standalone type check only if it covers files the build omits. Verify repository feature availability before making optional security jobs required.
