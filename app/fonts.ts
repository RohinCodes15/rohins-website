import localFont from "next/font/local";

// Official Fontshare WOFF2, byte-for-byte unmodified: the ITF Free Font License v2.0 forbids
// subsetting, conversion, and renaming (./fonts/Switzer-LICENSE.txt, docs/DESIGN_SYSTEM.md §3.1).
export const switzer = localFont({
  src: "./fonts/Switzer-Variable.woff2",
  variable: "--font-switzer",
  weight: "100 900",
  display: "swap",
  adjustFontFallback: "Arial",
});

// Commit Mono 1.143 Regular, subset to Latin plus the symbols the design uses (SIL OFL 1.1 permits;
// ./fonts/CommitMono-LICENSE.txt). Not preloaded: it sets small metadata, never the LCP text.
export const commitMono = localFont({
  src: "./fonts/CommitMono-400-Regular-subset.woff2",
  variable: "--font-commit-mono",
  weight: "400",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});
