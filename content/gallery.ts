import type { Figure } from "../lib/types.ts";
import { projects } from "./projects.ts";

/** One real screen on the homepage gallery. `project` is a slug in content/projects.ts; the screen links to its case study. */
export type GalleryScreen = Omit<Figure, "caption"> & { readonly project: string };

const ledgerScreens = projects.find(({ slug }) => slug === "ledger")?.gallery?.images ?? [];
const ledger = (src: string): GalleryScreen[] =>
  ledgerScreens.filter((screen) => screen.src === src).map((screen) => ({ ...screen, project: "ledger" }));

const screen = (project: string, src: string, width: number, height: number, alt: string): GalleryScreen => ({ project, src, width, height, alt });

/**
 * Selected work: up to three real screens per featured project, lead screen first. Portfolio stack and case-study
 * screens were captured from a local production build on 2026-11-27 (1440 × 900 px). Rotation Index's screens were
 * captured on 2026-11-27 from its own dashboard (`python app.py`) after following its README on a fresh clone:
 * download the 2025–26 play-by-play, rebuild, audit offline (1,230 of 1,230 validated, none failed), and fit the model.
 */
export const workScreens: Readonly<Record<string, readonly GalleryScreen[]>> = {
  accessforge: [
    screen("accessforge", "/work/accessforge/overview-map.jpg", 1600, 1220, "AccessForge overview: the headline “Fix the barriers that reconnect the most routes” beside a 3D map of Fremont and counts of places people travel to."),
    screen("accessforge", "/work/accessforge/barrier-map.jpg", 1440, 1240, "AccessForge barrier map: Fremont streets and buildings in 3D, destinations shaded by type, with a barrier details panel."),
    screen("accessforge", "/work/accessforge/planner-story.jpg", 1190, 790, "AccessForge repair planner story: a wheelchair user’s short trip to Washington Hospital blocked by a raised curb."),
  ],
  risklens: [
    screen("risklens", "/work/risklens/monte-carlo.jpg", 1600, 736, "RiskLens Monte Carlo chart: a year of hypothetical portfolio wealth paths with the median and 25th–75th and 5th–95th percentile bands."),
    screen("risklens", "/work/risklens/efficient-frontier.jpg", 1600, 736, "RiskLens efficient frontier: expected return against volatility, marking the current, minimum-volatility, and maximum-Sharpe portfolios."),
    screen("risklens", "/work/risklens/vs-spy.jpg", 1600, 736, "RiskLens chart comparing the portfolio’s cumulative return with the S&P 500 (SPY) over the same dates."),
  ],
  ledger: [...ledger("/work/ledger/home.png"), ...ledger("/work/ledger/market.png"), ...ledger("/work/ledger/battle.png")],
  "rotation-index": [
    screen("rotation-index", "/work/rotation-index/dashboard.jpg", 1440, 900, "Rotation Index dashboard: the 2025–26 masthead reading 1,230 of 1,230 games validated and Model Available, audit cards for validated, waiting, failed and fresh games, and “Possession cache complete”."),
    screen("rotation-index", "/work/rotation-index/estimates.jpg", 1152, 880, "Rotation Index possession-level player estimates: 450 players with at least 1,000 possessions ranked by net impact per 100 possessions, led by S. Gilgeous-Alexander at +10.43 and K. Leonard at +10.35."),
  ],
  portfolio: [
    screen("portfolio", "/work/portfolio/home.jpg", 1440, 900, "Portfolio homepage in the dark theme: the name Rohin Pidathala, the role line, contact links, and the section rail."),
    screen("portfolio", "/work/portfolio/stack.jpg", 1440, 900, "Portfolio Tech Stack section in the dark theme: featured logos above a grid of 44 technology tiles, with React, CSS and Plotly lit in colour by the pointer spotlight."),
    screen("portfolio", "/work/portfolio/case-study.jpg", 1440, 900, "Portfolio case-study page in the light theme: AccessForge AI’s solution text above its overview screenshot and caption, with the reading-progress ring at 27%."),
  ],
};

/**
 * Selected work accents, each sampled from the project's own screens (2026-11-27): AccessForge's barrier red on
 * its map, RiskLens's chart blue, Ledger's market green (darker in light mode for contrast), and the portfolio's
 * own probe red, and Rotation Index's scoreboard red.
 */
export const workAccents: Readonly<Record<string, string>> = {
  accessforge: "#d84860",
  "rotation-index": "#c8102e",
  risklens: "#3078a8",
  ledger: "light-dark(#008a3c, #00a848)",
  portfolio: "var(--probe)",
};
