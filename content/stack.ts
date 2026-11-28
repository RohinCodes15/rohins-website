import type { StackEntry } from "../lib/types.ts";
import { githubProfile } from "./site.ts";

/** Technology inventory, grouped for the stack filters. Projects reference these ids; add an entry before a project uses it. */
export const stack = {
  // Owner-confirmed inventory (2026-11-26), plus the technologies project pages reference.
  // Logos: Devicon v2.16.0 (MIT, public/stack/LICENSE-devicon.txt). Entries Devicon lacks have none; accents are
  // each logo's main brand colour, and single-colour logos have no accent (the grid falls back to the signal blue).
  python: { label: "Python", category: "Languages", logo: "/stack/python.svg", accent: "#3776ab" },
  javascript: { label: "JavaScript", category: "Languages", logo: "/stack/javascript.svg", accent: "#f0db4f" },
  cplusplus: { label: "C++", category: "Languages", logo: "/stack/cplusplus.svg", accent: "#00599c" },
  css: { label: "CSS", category: "Languages", logo: "/stack/css.svg", accent: "#1572b6" },
  html: { label: "HTML", category: "Languages", logo: "/stack/html.svg", accent: "#e44d26" },
  typescript: { label: "TypeScript", category: "Languages", logo: "/stack/typescript.svg", accent: "#3178c6" },
  java: { label: "Java", category: "Languages", logo: "/stack/java.svg", accent: "#ea2d2e" },
  expo: { label: "Expo", category: "Frameworks" },
  motion: { label: "Motion", category: "Frameworks", logo: "/stack/motion.svg", mono: true },
  nextjs: { label: "Next.js", category: "Frameworks", logo: "/stack/nextjs.svg", mono: true },
  reactnative: { label: "React Native", category: "Frameworks", logo: "/stack/react.svg", accent: "#61dafb" },
  react: { label: "React", category: "Frameworks", logo: "/stack/react.svg", accent: "#61dafb" },
  fastapi: { label: "FastAPI", category: "Frameworks", logo: "/stack/fastapi.svg", accent: "#009688" },
  nodejs: { label: "Node.js", category: "Frameworks", logo: "/stack/nodejs.svg", accent: "#3f873f" },
  tailwind: { label: "Tailwind CSS", category: "Frameworks", logo: "/stack/tailwind.svg", accent: "#38bdf8" },
  flask: { label: "Flask", category: "Frameworks", logo: "/stack/flask.svg", mono: true },
  streamlit: { label: "Streamlit", category: "Frameworks", logo: "/stack/streamlit.svg", accent: "#ff4b4b" },
  maplibre: { label: "MapLibre GL JS", category: "Frameworks" },
  plotly: { label: "Plotly", category: "Frameworks", logo: "/stack/plotly.svg", accent: "#7fcfbd" },
  pygame: { label: "Pygame", category: "Frameworks" },
  mongodb: { label: "MongoDB", category: "Data", logo: "/stack/mongodb.svg", accent: "#47a248" },
  supabase: { label: "Supabase", category: "Data", logo: "/stack/supabase.svg", accent: "#3ecf8e" },
  postgresql: { label: "PostgreSQL", category: "Data", logo: "/stack/postgresql.svg", accent: "#336791" },
  postgis: { label: "PostGIS", category: "Data" },
  pandas: { label: "pandas", category: "AI and quant", logo: "/stack/pandas.svg", accent: "#e70488" },
  pytorch: { label: "PyTorch", category: "AI and quant", logo: "/stack/pytorch.svg", accent: "#ee4c2c" },
  claudeapi: { label: "Claude API", category: "AI and quant" },
  huggingface: { label: "Hugging Face", category: "AI and quant" },
  montecarlo: { label: "Monte Carlo simulation", category: "AI and quant" },
  statmodeling: { label: "Statistical modeling", category: "AI and quant" },
  openaiapi: { label: "OpenAI API", category: "AI and quant" },
  scikitlearn: { label: "scikit-learn", category: "AI and quant", logo: "/stack/scikitlearn.svg", accent: "#f89939" },
  numpy: { label: "NumPy", category: "AI and quant", logo: "/stack/numpy.svg", accent: "#4dabcf" },
  scipy: { label: "SciPy", category: "AI and quant" },
  networkx: { label: "NetworkX", category: "AI and quant", logo: "/stack/networkx.svg", accent: "#2c7fb8" },
  git: { label: "Git", category: "Tools", logo: "/stack/git.svg", accent: "#f34f29" },
  githubactions: { label: "GitHub Actions", category: "Tools", logo: "/stack/githubactions.svg", accent: "#2088ff" },
  vercel: { label: "Vercel", category: "Tools", logo: "/stack/vercel.svg", mono: true },
  googlecloud: { label: "Google Cloud", category: "Tools", logo: "/stack/googlecloud.svg", accent: "#4285f4" },
  figma: { label: "Figma", category: "Tools", logo: "/stack/figma.svg", accent: "#a259ff" },
  vscode: { label: "VS Code", category: "Tools", logo: "/stack/vscode.svg", accent: "#007acc" },
  github: { label: "GitHub", category: "Tools", logo: "/stack/github.svg", mono: true },
  arduino: { label: "Arduino", category: "Tools", logo: "/stack/arduino.svg", accent: "#00979c" },
  playwright: { label: "Playwright", category: "Tools", logo: "/stack/playwright.svg", accent: "#2ead33" },
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
