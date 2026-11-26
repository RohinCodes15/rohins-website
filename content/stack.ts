import type { StackEntry } from "../lib/types.ts";

/** Technologies referenced by projects and research. Add an entry here before a project references it. */
export const stack = {
  nextjs: { label: "Next.js", category: "Framework" },
  react: { label: "React", category: "Framework" },
  typescript: { label: "TypeScript", category: "Language" },
  tailwind: { label: "Tailwind CSS", category: "Interface" },
  motion: { label: "Motion", category: "Interface" },
  playwright: { label: "Playwright", category: "Verification" },
  python: { label: "Python", category: "Language" },
  fastapi: { label: "FastAPI", category: "Framework" },
  postgis: { label: "PostgreSQL + PostGIS", category: "Data" },
  networkx: { label: "NetworkX", category: "Analysis" },
  maplibre: { label: "MapLibre GL JS", category: "Interface" },
} as const satisfies Record<string, StackEntry>;

export type StackId = keyof typeof stack;
