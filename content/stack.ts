import type { StackEntry } from "../lib/types.ts";
import { githubProfile } from "./site.ts";

/** Technology inventory, grouped for the stack filters. Projects reference these ids; add an entry before a project uses it. */
export const stack = {
  // Owner-confirmed inventory (2026-11-26), plus the technologies project pages reference.
  python: { label: "Python", category: "Languages" },
  javascript: { label: "JavaScript", category: "Languages" },
  cplusplus: { label: "C++", category: "Languages" },
  css: { label: "CSS", category: "Languages" },
  html: { label: "HTML", category: "Languages" },
  typescript: { label: "TypeScript", category: "Languages" },
  java: { label: "Java", category: "Languages" },
  expo: { label: "Expo", category: "Frameworks" },
  motion: { label: "Motion", category: "Frameworks" },
  nextjs: { label: "Next.js", category: "Frameworks" },
  reactnative: { label: "React Native", category: "Frameworks" },
  react: { label: "React", category: "Frameworks" },
  fastapi: { label: "FastAPI", category: "Frameworks" },
  nodejs: { label: "Node.js", category: "Frameworks" },
  tailwind: { label: "Tailwind CSS", category: "Frameworks" },
  flask: { label: "Flask", category: "Frameworks" },
  streamlit: { label: "Streamlit", category: "Frameworks" },
  maplibre: { label: "MapLibre GL JS", category: "Frameworks" },
  plotly: { label: "Plotly", category: "Frameworks" },
  pygame: { label: "Pygame", category: "Frameworks" },
  mongodb: { label: "MongoDB", category: "Data" },
  supabase: { label: "Supabase", category: "Data" },
  postgresql: { label: "PostgreSQL", category: "Data" },
  postgis: { label: "PostGIS", category: "Data" },
  pandas: { label: "pandas", category: "AI and quant" },
  pytorch: { label: "PyTorch", category: "AI and quant" },
  claudeapi: { label: "Claude API", category: "AI and quant" },
  huggingface: { label: "Hugging Face", category: "AI and quant" },
  montecarlo: { label: "Monte Carlo simulation", category: "AI and quant" },
  statmodeling: { label: "Statistical modeling", category: "AI and quant" },
  openaiapi: { label: "OpenAI API", category: "AI and quant" },
  scikitlearn: { label: "scikit-learn", category: "AI and quant" },
  numpy: { label: "NumPy", category: "AI and quant" },
  scipy: { label: "SciPy", category: "AI and quant" },
  networkx: { label: "NetworkX", category: "AI and quant" },
  git: { label: "Git", category: "Tools" },
  githubactions: { label: "GitHub Actions", category: "Tools" },
  vercel: { label: "Vercel", category: "Tools" },
  googlecloud: { label: "Google Cloud", category: "Tools" },
  figma: { label: "Figma", category: "Tools" },
  vscode: { label: "VS Code", category: "Tools" },
  github: { label: "GitHub", category: "Tools" },
  arduino: { label: "Arduino", category: "Tools" },
  playwright: { label: "Playwright", category: "Tools" },
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
  { label: "C++", logo: "/stack/cplusplus.svg", stackId: "cplusplus" },
  { label: "PyTorch", logo: "/stack/pytorch.svg", stackId: "pytorch" },
  { label: "PostgreSQL", logo: "/stack/postgresql.svg", stackId: "postgresql" },
  { label: "GitHub", logo: "/stack/github.svg", stackId: "github", href: githubProfile.href, mono: true },
  { label: "FastAPI", logo: "/stack/fastapi.svg", stackId: "fastapi" },
];
