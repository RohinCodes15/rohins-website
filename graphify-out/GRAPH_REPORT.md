# Graph Report - Rohins Website  (2026-11-26)

## Corpus Check
- 103 files · ~64,819 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: .woff2 2, .example 1, (none) 1)

## Summary
- 667 nodes · 1453 edges · 30 communities (26 shown, 4 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 57 edges (avg confidence: 0.93)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- 1. Reference website analysis
- page.dev.tsx
- tooltip.tsx
- Testing, CI/CD, and deployment
- activity.ts
- Architecture — Rohin Pidathala Portfolio
- activity-terrain.tsx
- primitives.tsx
- react
- Design System — "Datum"
- components.json
- compilerOptions
- theme-toggle.tsx
- design-tokens.test.ts
- projectsByStack
- package.json
- devDependencies
- theme.spec.ts
- scripts
- dependencies
- eslint.config.mjs
- Portfolio handoff
- Portfolio architecture
- Technical research for a premium developer portfolio
- architecture-diagram.tsx
- Portfolio agent guide
- GitHub contribution integration for RohinCodes15
- CopyButton

## God Nodes (most connected - your core abstractions)
1. `react` - 32 edges
2. `Container()` - 31 edges
3. `Link()` - 29 edges
4. `compilerOptions` - 18 edges
5. `Showcase()` - 17 edges
6. `PortfolioDemo()` - 16 edges
7. `1. Reference website analysis` - 16 edges
8. `Home()` - 14 edges
9. `MonteCarloDemo()` - 14 edges
10. `RegressionDemo()` - 14 edges

## Surprising Connections (you probably didn't know these)
- `Architecture and tradeoffs` --references--> `useReducedMotion()`  [INFERRED]
  docs/TECHNICAL_RESEARCH.md → components/motion/primitives.tsx
- `7. Motion` --references--> `StaggerList()`  [INFERRED]
  docs/DESIGN_SYSTEM.md → components/motion/primitives.tsx
- `Command palette (2026-11-25)` --references--> `setTheme()`  [INFERRED]
  docs/ARCHITECTURE.md → components/site/theme-toggle.tsx
- `Content model` --references--> `StackId`  [INFERRED]
  docs/TECHNICAL_RESEARCH.md → content/stack.ts
- `9. Theme switching` --references--> `parseTheme()`  [INFERRED]
  docs/ARCHITECTURE.md → lib/theme.ts

## Import Cycles
- None detected.

## Communities (30 total, 4 thin omitted)

### Community 0 - "1. Reference website analysis"
Cohesion: 0.04
Nodes (48): 0. Method, evidence labels, access report, 10. Accessibility and performance, 11. Design patterns to avoid, 12. Challenges to the brief, 1.10 kokonutui.com — Kokonut UI, 1.11 motion.dev — Motion, 1.12 magicui.design — Magic UI, 1.13 ui.aceternity.com — Aceternity UI (+40 more)

### Community 1 - "page.dev.tsx"
Cohesion: 0.06
Nodes (75): JournalIndex(), metadata, generateMetadata(), instant, JournalArticle(), LabPage(), NotFound(), Home() (+67 more)

### Community 3 - "Testing, CI/CD, and deployment"
Cohesion: 0.20
Nodes (10): Accessibility checks, Browser tests (Playwright), CI commands to configure later, Environment variables, Pipeline overview, Production verification, Security, Testing, CI/CD, and deployment (+2 more)

### Community 4 - "activity.ts"
Cohesion: 0.06
Nodes (57): ActivityFixture(), levels, Activity(), ActivityFrame(), ActivityGrid(), levels, Metric(), Terrain (+49 more)

### Community 5 - "Architecture — Rohin Pidathala Portfolio"
Cohesion: 0.18
Nodes (11): 10. Quality gates, 12. Blockers, 1. Goals and constraints, 2. Stack, 3. Routes, 4. Directory structure (end state), 6. Server and client boundaries, 7. GitHub activity (Fig. 1) (+3 more)

### Community 6 - "activity-terrain.tsx"
Cohesion: 0.10
Nodes (32): ActivityTerrain(), ActivityTerrainProps, buildCells(), Cell, clamp(), easeOutBack(), formatDay(), formatMonth() (+24 more)

### Community 7 - "primitives.tsx"
Cohesion: 0.11
Nodes (31): ITEMS, MotionDemo(), itemVariants, LayoutBox(), loadFeatures(), preference(), Presence(), PresenceContent() (+23 more)

### Community 8 - "react"
Cohesion: 0.11
Nodes (49): metadata, sections, ClientOnly(), subscribe(), MonteCarloDemo(), ChartFigure(), Controls(), DemoNote() (+41 more)

### Community 9 - "Design System — "Datum""
Cohesion: 0.08
Nodes (25): 1. Concept, 2.1 Roles, 2.2 Tokens, 2.3 Verified contrast, 2. Brand colour, 3.1 Families and licences (B3 resolved, with conditions), 3.1a Implementation (2026-11-25), 3.2 Scale (+17 more)

### Community 10 - "components.json"
Cohesion: 0.09
Nodes (22): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+14 more)

### Community 11 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowImportingTsExtensions, allowJs, erasableSyntaxOnly, esModuleInterop, incremental, isolatedModules, jsx (+12 more)

### Community 12 - "theme-toggle.tsx"
Cohesion: 0.07
Nodes (39): commitMono, switzer, metadata, RootLayout(), buildItems(), CommandPalette(), onKeyDown(), run() (+31 more)

### Community 13 - "design-tokens.test.ts"
Cohesion: 0.13
Nodes (13): What the install command does, contrast(), css, dark, light, luminance(), pairs, rootSource (+5 more)

### Community 14 - "projectsByStack"
Cohesion: 0.20
Nodes (10): Stack, activity, leadership, certifications (2026-11-25), Phase 0 — Decisions and content (no code), Phase 1 — Launchable HTML, Phase 3 — Verified GitHub data (Fig. 1), Phase 4 — Activity Terrain (optional enhancement), Phase 5 — Release hardening (runs alongside, finalised before launch), Roadmap — Rohin Pidathala Portfolio, Focused unit tests (+2 more)

### Community 15 - "package.json"
Cohesion: 0.13
Nodes (14): engines, node, name, private, version, cn, react-dom, shadcn (+6 more)

### Community 16 - "devDependencies"
Cohesion: 0.17
Nodes (12): devDependencies, @axe-core/playwright, eslint, eslint-config-next, @playwright/test, shadcn, tailwindcss, @tailwindcss/turbopack (+4 more)

### Community 17 - "theme.spec.ts"
Cohesion: 0.18
Nodes (3): @axe-core/playwright, @playwright/test, consoleErrors

### Community 18 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, check:secrets, dev, lint, postbuild, start, test (+2 more)

### Community 19 - "dependencies"
Cohesion: 0.22
Nodes (9): dependencies, @base-ui/react, cn, motion, next, react, react-dom, server-only (+1 more)

### Community 20 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 22 - "Portfolio handoff"
Cohesion: 0.18
Nodes (10): Case studies (2026-11-25), Command palette (2026-11-25), Composition pass (2026-11-26), Credibility pass (2026-11-25), Final refinement pass (2026-11-25), Implementation, Portfolio handoff, Research lab (2026-11-25) (+2 more)

### Community 23 - "Portfolio architecture"
Cohesion: 0.22
Nodes (9): Activity widget rendering, Candidate directory structure, Content model, Deliberately excluded, Interactive technology stack, Portfolio architecture, Principles, Server and client boundaries (+1 more)

### Community 24 - "Technical research for a premium developer portfolio"
Cohesion: 0.22
Nodes (9): Architecture and tradeoffs, Audit decisions, Implementation roadmap, Performance and accessibility acceptance criteria, Recommended stack, Technical research for a premium developer portfolio, Unresolved blockers, Verification limits (+1 more)

### Community 25 - "architecture-diagram.tsx"
Cohesion: 0.43
Nodes (5): ArchitectureDiagram(), NODE, Flow, layoutFlows(), PlacedNode

### Community 27 - "Portfolio agent guide"
Cohesion: 0.33
Nodes (6): Coding and design, File ownership, Portfolio agent guide, Sources of truth, This is NOT the Next.js you know, Verification and handoff

### Community 28 - "GitHub contribution integration for RohinCodes15"
Cohesion: 0.40
Nodes (5): Cache and rate limits, Credentials and visibility, Failure behavior and acceptance criteria, GitHub contribution integration for RohinCodes15, Retrieve and validate GitHub's calendar

## Knowledge Gaps
- **8 isolated node(s):** `react-dom`, `@tailwindcss/turbopack`, `@types/node`, `@types/react`, `@types/react-dom` (+3 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 292 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `page.dev.tsx`, `tooltip.tsx`, `activity.ts`, `activity-terrain.tsx`, `primitives.tsx`, `theme-toggle.tsx`, `package.json`, `CopyButton`?**
  _High betweenness centrality (0.294) - this node is a cross-community bridge._
- **What connects `react-dom`, `@tailwindcss/turbopack`, `@types/node` to the rest of the system?**
  _8 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `1. Reference website analysis` be split into smaller, more focused modules?**
  _Cohesion score 0.041666666666666664 - nodes in this community are weakly interconnected._
- **Why does `Design Research — Rohin Pidathala Personal Site` connect `1. Reference website analysis` to `ROADMAP.md`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Should `page.dev.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.059716430358632194 - nodes in this community are weakly interconnected._
- **Why does `8. Signature component — Kokonut UI Activity Terrain` connect `1. Reference website analysis` to `activity-terrain.tsx`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **Should `activity.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05639097744360902 - nodes in this community are weakly interconnected._