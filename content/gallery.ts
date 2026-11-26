import type { Figure } from "../lib/types.ts";
import { projects } from "./projects.ts";

/** One real screen on the homepage gallery. `project` is a slug in content/projects.ts; the screen links to its case study. */
export type GalleryScreen = Omit<Figure, "caption"> & { readonly project: string };

const ledgerScreens = projects.find(({ slug }) => slug === "ledger")?.gallery?.images ?? [];
const ledger = (src: string): GalleryScreen[] =>
  ledgerScreens.filter((screen) => screen.src === src).map((screen) => ({ ...screen, project: "ledger" }));

/**
 * Homepage "A Closer Look" gallery. Every screen is a capture of the real project:
 * AccessForge from its local development build (2026-11-26), RiskLens charts from the live Streamlit demo
 * analysing its default 50/50 AAPL and MSFT portfolio (2026-11-26), and Ledger from its repository's docs/ folder.
 */
export const closerLook: readonly GalleryScreen[] = [
  { project: "accessforge", src: "/work/accessforge/overview-map.jpg", width: 1600, height: 1220, alt: "AccessForge overview: the headline “Fix the barriers that reconnect the most routes” beside a 3D map of Fremont and counts of places people travel to." },
  ...ledger("/work/ledger/home.png"),
  { project: "risklens", src: "/work/risklens/monte-carlo.jpg", width: 1600, height: 736, alt: "RiskLens Monte Carlo chart: a year of hypothetical portfolio wealth paths with the median and 25th–75th and 5th–95th percentile bands." },
  { project: "accessforge", src: "/work/accessforge/barrier-map.jpg", width: 1440, height: 1240, alt: "AccessForge barrier map: Fremont streets and buildings in 3D, destinations shaded by type, with a barrier details panel." },
  { project: "risklens", src: "/work/risklens/var-histogram.jpg", width: 1600, height: 654, alt: "RiskLens histogram of historical daily portfolio returns with the 95% value-at-risk cutoff marked." },
  ...ledger("/work/ledger/market.png"),
  { project: "risklens", src: "/work/risklens/efficient-frontier.jpg", width: 1600, height: 736, alt: "RiskLens efficient frontier: expected return against volatility, marking the current, minimum-volatility, and maximum-Sharpe portfolios." },
  ...ledger("/work/ledger/scam.png"),
  { project: "accessforge", src: "/work/accessforge/planner-story.jpg", width: 1190, height: 790, alt: "AccessForge repair planner story: a wheelchair user’s short trip to Washington Hospital blocked by a raised curb." },
  { project: "risklens", src: "/work/risklens/vs-spy.jpg", width: 1600, height: 736, alt: "RiskLens chart comparing the portfolio’s cumulative return with the S&P 500 (SPY) over the same dates." },
  ...ledger("/work/ledger/portfolio.png"),
  { project: "risklens", src: "/work/risklens/drawdown.jpg", width: 1600, height: 622, alt: "RiskLens drawdown chart: how far the portfolio sat below its previous peak on each day, reaching about −20%." },
  ...ledger("/work/ledger/battle.png"),
  ...ledger("/work/ledger/lesson.png"),
];
