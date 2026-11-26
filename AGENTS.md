# Portfolio agent guide

## Sources of truth

- [Architecture](docs/ARCHITECTURE.md) owns implementation decisions, design requirements, file boundaries, and quality gates. Its decisions override conflicting research.
- [Roadmap](docs/ROADMAP.md) owns sequencing, phase gates, and status. Check the active phase before editing. Create files only when their phase needs them.
- [Design research](docs/DESIGN_RESEARCH.md) and [technical research](docs/TECHNICAL_RESEARCH.md) are dated evidence. Read only the sections needed for the task or cited by the architecture. Record accepted decisions in Architecture and progress in Roadmap.

## Coding and design

- Use strict TypeScript, follow existing patterns, and keep changes scoped. Start with native HTML and Server Components. Use client code for browser behavior and add a dependency only for a named need.
- Follow the Instrument design and semantic tokens in Architecture §5. Keep content visible without animation, support both themes and reduced motion, and preserve keyboard access, visible focus, and text alternatives.
- Keep credentials and upstream calls server only. Validate external data before publishing it. Use real, verified content and contribution data. Follow the documented unavailable state when data is missing.

## File ownership

| Path | Owns |
| --- | --- |
| `app/` | Routes, layouts, metadata, and global tokens |
| `components/` | Shared UI, page sections, and isolated interactive views |
| `content/`, `public/` | Typed portfolio content and static assets |
| `lib/` | Shared logic. `lib/github/` owns GitHub fetching, validation, and cache policy |
| `docs/` | Decisions, phase status, and research in their respective documents |

Keep feature logic in its owning layer. Change the owning document when a decision changes. Link to it from other docs instead of copying it.

## Verification and handoff

- Use Architecture §10 and the active phase's exit gate to choose checks. For implementation, cover changed behavior with focused unit or browser checks as appropriate. Apply the documented build, accessibility, and performance gates before marking a phase ready. For docs only, check affected references and consistency.
- Update the Roadmap when status, blockers, or the next step changes. Handoff in one short note with changed paths, checks and results, unresolved blockers, and the next action. Mark skipped checks explicitly. Never include secrets.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
