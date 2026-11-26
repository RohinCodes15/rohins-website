# Graph Report - Rohins Website  (2026-11-26)

## Corpus Check
- 104 files · ~81,028 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .woff2 2, .example 1)

## Summary
- 680 nodes · 1506 edges · 24 communities (21 shown, 3 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 66 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a822f6de`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- 1. Reference website analysis
- page.dev.tsx
- CommandPalette
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
- skiper40.tsx
- package.json
- devDependencies
- @playwright/test
- scripts
- dependencies
- eslint.config.mjs
- Portfolio handoff
- theme.spec.ts

## God Nodes (most connected - your core abstractions)
1. `react` - 32 edges
2. `Container()` - 31 edges
3. `Link()` - 29 edges
4. `Portfolio handoff` - 20 edges
5. `compilerOptions` - 18 edges
6. `Showcase()` - 16 edges
7. `PortfolioDemo()` - 16 edges
8. `1. Reference website analysis` - 16 edges
9. `next` - 15 edges
10. `Home()` - 14 edges

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

## Communities (24 total, 3 thin omitted)

### Community 0 - "1. Reference website analysis"
Cohesion: 0.04
Nodes (46): 0. Method, evidence labels, access report, 10. Accessibility and performance, 11. Design patterns to avoid, 12. Challenges to the brief, 1.10 kokonutui.com — Kokonut UI, 1.11 motion.dev — Motion, 1.12 magicui.design — Magic UI, 1.13 ui.aceternity.com — Aceternity UI (+38 more)

### Community 1 - "page.dev.tsx"
Cohesion: 0.06
Nodes (79): JournalIndex(), metadata, generateMetadata(), instant, JournalArticle(), LabPage(), NotFound(), Home() (+71 more)

### Community 2 - "CommandPalette"
Cohesion: 0.36
Nodes (8): CommandPalette(), onKeyDown(), run(), setTheme(), filterItems(), moveIndex(), PaletteItem, items

### Community 3 - "Testing, CI/CD, and deployment"
Cohesion: 0.05
Nodes (43): Stack, activity, leadership, certifications (2026-11-25), Phase 0 — Decisions and content (no code), Phase 1 — Launchable HTML, Phase 3 — Verified GitHub data (Fig. 1), Phase 4 — Activity Terrain (optional enhancement), Phase 5 — Release hardening (runs alongside, finalised before launch), Roadmap — Rohin Pidathala Portfolio, Accessibility checks (+35 more)

### Community 4 - "activity.ts"
Cohesion: 0.06
Nodes (57): ActivityFixture(), levels, Activity(), ActivityFrame(), ActivityGrid(), levels, Metric(), Terrain (+49 more)

### Community 5 - "Architecture — Rohin Pidathala Portfolio"
Cohesion: 0.11
Nodes (17): Coding and design, File ownership, Portfolio agent guide, Sources of truth, This is NOT the Next.js you know, Verification and handoff, 10. Quality gates, 12. Blockers (+9 more)

### Community 6 - "activity-terrain.tsx"
Cohesion: 0.11
Nodes (30): ActivityTerrain(), ActivityTerrainProps, buildCells(), Cell, easeOutBack(), formatDay(), formatMonth(), hexToRgb() (+22 more)

### Community 7 - "primitives.tsx"
Cohesion: 0.11
Nodes (31): ITEMS, MotionDemo(), itemVariants, LayoutBox(), loadFeatures(), preference(), Presence(), PresenceContent() (+23 more)

### Community 8 - "react"
Cohesion: 0.11
Nodes (49): metadata, sections, ClientOnly(), subscribe(), MonteCarloDemo(), ChartFigure(), Controls(), DemoNote() (+41 more)

### Community 9 - "Design System — "Datum""
Cohesion: 0.07
Nodes (29): clamp(), 5.1 Color tokens, 5.2 Typography, 5. Color and typography system, 1. Concept, 2.1 Roles, 2.2 Tokens, 2.3 Verified contrast (+21 more)

### Community 10 - "components.json"
Cohesion: 0.08
Nodes (23): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+15 more)

### Community 11 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowImportingTsExtensions, allowJs, erasableSyntaxOnly, esModuleInterop, incremental, isolatedModules, jsx (+12 more)

### Community 12 - "theme-toggle.tsx"
Cohesion: 0.09
Nodes (27): commitMono, switzer, metadata, RootLayout(), CommandPalette, CommandPaletteTrigger(), shortcut(), subscribe() (+19 more)

### Community 13 - "design-tokens.test.ts"
Cohesion: 0.13
Nodes (13): What the install command does, contrast(), css, dark, light, luminance(), pairs, rootSource (+5 more)

### Community 14 - "skiper40.tsx"
Cohesion: 0.43
Nodes (6): Link001(), Link002(), Link003(), Link004(), Link005(), Skiper40()

### Community 15 - "package.json"
Cohesion: 0.13
Nodes (14): engines, node, name, private, version, cn, react-dom, shadcn (+6 more)

### Community 16 - "devDependencies"
Cohesion: 0.17
Nodes (12): devDependencies, @axe-core/playwright, eslint, eslint-config-next, @playwright/test, shadcn, tailwindcss, @tailwindcss/turbopack (+4 more)

### Community 18 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, check:secrets, dev, lint, postbuild, start, test (+2 more)

### Community 19 - "dependencies"
Cohesion: 0.25
Nodes (8): dependencies, cn, motion, next, react, react-dom, server-only, @vercel/functions

### Community 20 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 22 - "Portfolio handoff"
Cohesion: 0.09
Nodes (24): ArchitectureDiagram(), NODE, CopyButton(), Button(), Audience and content audit (2026-11-26), Case studies (2026-11-25), Command palette (2026-11-25), Composition pass (2026-11-26) (+16 more)

## Knowledge Gaps
- **8 isolated node(s):** `react-dom`, `@tailwindcss/turbopack`, `@types/node`, `@types/react`, `@types/react-dom` (+3 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 294 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `page.dev.tsx`, `activity.ts`, `activity-terrain.tsx`, `primitives.tsx`, `theme-toggle.tsx`, `skiper40.tsx`, `package.json`, `Portfolio handoff`?**
  _High betweenness centrality (0.282) - this node is a cross-community bridge._
- **What connects `react-dom`, `@tailwindcss/turbopack`, `@types/node` to the rest of the system?**
  _8 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `1. Reference website analysis` be split into smaller, more focused modules?**
  _Cohesion score 0.043478260869565216 - nodes in this community are weakly interconnected._
- **Why does `Design Research — Rohin Pidathala Personal Site` connect `1. Reference website analysis` to `Design System — "Datum"`, `Architecture — Rohin Pidathala Portfolio`?**
  _High betweenness centrality (0.107) - this node is a cross-community bridge._
- **Should `page.dev.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05995423340961099 - nodes in this community are weakly interconnected._
- **Why does `Portfolio handoff` connect `Portfolio handoff` to `page.dev.tsx`, `Testing, CI/CD, and deployment`, `Architecture — Rohin Pidathala Portfolio`, `react`, `theme-toggle.tsx`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Should `Testing, CI/CD, and deployment` be split into smaller, more focused modules?**
  _Cohesion score 0.047619047619047616 - nodes in this community are weakly interconnected._