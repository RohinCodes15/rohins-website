import type { StackEntry } from "../lib/types.ts";
import { githubProfile } from "./site.ts";

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
  streamlit: { label: "Streamlit", category: "Interface" },
  plotly: { label: "Plotly", category: "Interface" },
  pandas: { label: "pandas", category: "Data" },
  numpy: { label: "NumPy", category: "Analysis" },
  scipy: { label: "SciPy", category: "Analysis" },
  flask: { label: "Flask", category: "Framework" },
  pygame: { label: "Pygame", category: "Interface" },
} as const satisfies Record<string, StackEntry>;

export type StackId = keyof typeof stack;

/** A logo in the stack section's opening animation. `stackId` links it to projects; `mono` logos invert in dark mode. */
export type FeaturedTechnology = {
  readonly label: string;
  readonly logo: string;
  readonly stackId?: StackId;
  readonly href?: string;
  readonly mono?: boolean;
};

/** Logos from Devicon v2.16.0 (MIT, public/stack/LICENSE-devicon.txt). Display order; the middle entry sits at the centre. */
export const featuredStack: readonly FeaturedTechnology[] = [
  { label: "Python", logo: "/stack/python.svg", stackId: "python" },
  { label: "TypeScript", logo: "/stack/typescript.svg", stackId: "typescript" },
  { label: "React", logo: "/stack/react.svg", stackId: "react" },
  { label: "Next.js", logo: "/stack/nextjs.svg", stackId: "nextjs", mono: true },
  { label: "C++", logo: "/stack/cplusplus.svg" },
  { label: "PyTorch", logo: "/stack/pytorch.svg" },
  { label: "PostgreSQL", logo: "/stack/postgresql.svg", stackId: "postgis" },
  { label: "GitHub", logo: "/stack/github.svg", href: githubProfile.href, mono: true },
  { label: "FastAPI", logo: "/stack/fastapi.svg", stackId: "fastapi" },
];
