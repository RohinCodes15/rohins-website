import type { StackId } from "../content/stack.ts";

export type { StackId };

/** Calendar date, `YYYY-MM-DD`. */
export type IsoDate = string;
/** Calendar month, `YYYY-MM`. */
export type IsoMonth = string;

export interface Link {
  readonly label: string;
  readonly href: string;
}

/** A measured result. `source` names where the figure comes from so every number stays traceable. */
export interface Outcome {
  readonly label: string;
  readonly value: string;
  readonly source: string;
}

export type ProjectStatus = "completed" | "in-development";

/** A real capture of the project. `src` is a path under `public/`; `caption` says how it was captured. */
export interface Figure {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  readonly caption: string;
}

/** Long-form sections. Each one renders only when it has content, so nothing is stubbed. */
export interface CaseStudy {
  readonly problem: string;
  readonly solution: string;
  readonly figures: readonly Figure[];
  readonly architecture: readonly { readonly name: string; readonly detail: string }[];
  readonly complexity: readonly string[];
  readonly decisions: readonly { readonly decision: string; readonly reason: string }[];
  /** Directed data flow between `architecture` names, drawn as the architecture diagram. */
  readonly flows: readonly { readonly from: string; readonly to: string; readonly label: string }[];
}

/** Repository facts checked by hand (for example with `gh repo view`), dated so readers know their age. */
export interface Repository {
  readonly url: string;
  readonly visibility: "public" | "private";
  readonly language: string;
  /** SPDX identifier, or omit when the repository has no license file. */
  readonly license?: string;
  readonly firstCommit: IsoDate;
  readonly lastPush: IsoDate;
  readonly checked: IsoDate;
}

export interface Project {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly role: string;
  readonly year: number;
  readonly status: ProjectStatus;
  /** What works and what does not yet, in one or two sentences. */
  readonly statusNote: string;
  readonly stack: readonly StackId[];
  readonly outcomes: readonly Outcome[];
  readonly links: readonly Link[];
  readonly featured: boolean;
  readonly caseStudy?: CaseStudy;
  readonly repository?: Repository;
}

export interface Research {
  readonly slug: string;
  readonly title: string;
  readonly abstract: string;
  readonly date: IsoDate;
  readonly stack: readonly StackId[];
  readonly demo?: "static" | "interactive";
}

export interface Leadership {
  readonly org: string;
  readonly role: string;
  readonly start: IsoMonth;
  /** Omit while the role is current. */
  readonly end?: IsoMonth;
  readonly summary: string;
  readonly outcomes: readonly string[];
  readonly link?: Link;
}

export interface Certification {
  readonly name: string;
  readonly issuer: string;
  readonly issued: IsoMonth;
  readonly expires?: IsoMonth;
  /** The issuer's verification page, not a badge image. */
  readonly verifyUrl: string;
}

export interface StackEntry {
  readonly label: string;
  readonly category: string;
}

export interface Site {
  readonly name: string;
  readonly roleLine: string;
  readonly intro: string;
  readonly bio?: string;
  readonly readout?: string;
  readonly interests: readonly { title: string; description: string }[];
  readonly links: readonly Link[];
  /** Published only because the owner chose to (2026-11-25). Omit to hide email everywhere. */
  readonly email?: string;
  /** A PDF under `public/`, read before publishing. Omit until one exists. */
  readonly resume?: { readonly href: string; readonly updated: IsoMonth };
}

/** Journal article body: typed blocks instead of MDX (ARCHITECTURE D4), so content files stay plain data. */
export type JournalBlock =
  | { readonly type: "paragraph"; readonly text: string }
  | { readonly type: "heading"; readonly text: string }
  | { readonly type: "list"; readonly items: readonly string[] }
  | { readonly type: "code"; readonly language: string; readonly code: string }
  | { readonly type: "figure"; readonly figure: Figure };

export interface JournalEntry {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly published: IsoDate;
  readonly updated?: IsoDate;
  readonly topics: readonly string[];
  readonly body: readonly JournalBlock[];
}
