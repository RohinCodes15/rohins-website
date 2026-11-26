// Development-only design QA page. The .dev.tsx extension keeps it out of production builds (next.config.ts).
// Specimen text below is labelled sample copy, not portfolio content.
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ProjectCard } from "@/components/editorial/project-card";
import { SectionHeading } from "@/components/editorial/section-heading";
import { ArrowUpRight } from "@/components/ui/arrow-up-right";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { Separator } from "@/components/ui/separator";
import { TechnologyBadge } from "@/components/ui/technology-badge";
import { Certifications } from "@/components/sections/certifications";
import { Leadership } from "@/components/sections/leadership";
import { ArticleBody } from "@/components/journal/article-body";
import { JournalList } from "@/components/journal/journal-list";
import type { Certification, JournalEntry, Leadership as LeadershipEntry, Project } from "@/lib/types";
import { ActivityFixture } from "./activity-fixture";
import { MotionDemo } from "./motion-demo";

export const metadata: Metadata = { title: "Showcase (development)", robots: { index: false, follow: false } };

const TYPE_SCALE = [
  ["display", "text-display", "Rohin Pidathala"],
  ["h1", "text-h1", "Heading one sets a page title"],
  ["h2", "text-h2", "Heading two opens a section"],
  ["h3", "text-h3", "Heading three names a project"],
  ["lead", "text-lead text-text-2", "Lead text introduces a page in one or two plain sentences."],
  ["body", "text-body", "Body text carries running prose at a comfortable measure of about sixty-six characters per line."],
  ["small", "text-small text-text-2", "Small text holds secondary detail such as sidenotes."],
  ["meta", "font-mono text-meta text-text-2", "role · stack · 2026"],
  ["index", "font-mono text-index text-text-2", "01"],
  ["metric", "font-mono text-metric", "42 ms"],
] as const;

const SWATCHES = [
  ["bg", "bg-bg"],
  ["surface", "bg-surface"],
  ["text", "bg-text"],
  ["text-2", "bg-text-2"],
  ["text-3", "bg-text-3"],
  ["rule", "bg-rule"],
  ["rule-strong", "bg-rule-strong"],
  ["control", "bg-control"],
  ["signal", "bg-signal"],
  ["signal-fill", "bg-signal-fill"],
  ["probe", "bg-probe"],
  ["probe-mark", "bg-probe-mark"],
  ["terrain-0", "bg-terrain-0"],
  ["terrain-1", "bg-terrain-1"],
  ["terrain-2", "bg-terrain-2"],
  ["terrain-3", "bg-terrain-3"],
  ["terrain-4", "bg-terrain-4"],
  ["terrain-accent", "bg-terrain-accent"],
] as const;

// Layout specimens only: this page is development-only and the sample text says so.
const SAMPLE_LEADERSHIP: LeadershipEntry[] = [
  { org: "Sample organization", role: "Sample role", start: "2025-09", summary: "Sample summary, shown only to check the leadership layout.", outcomes: ["Sample outcome one.", "Sample outcome two."] },
  { org: "Second sample organization", role: "Earlier sample role", start: "2024-01", end: "2025-06", summary: "Sample summary for an ended role.", outcomes: [] },
];

const SAMPLE_CERTIFICATIONS: Certification[] = [
  { name: "Sample certification", issuer: "Sample issuer", issued: "2026-03", verifyUrl: "https://example.com/verify", expires: "2029-03" },
];

const SAMPLE_JOURNAL: JournalEntry = {
  slug: "sample-entry",
  title: "Sample journal entry",
  summary: "Sample summary, shown only to check the journal layout.",
  published: "2026-11-25",
  topics: ["Sample topic"],
  body: [
    { type: "paragraph", text: "Sample paragraph for checking measure and rhythm." },
    { type: "heading", text: "Sample heading" },
    { type: "list", items: ["Sample item one.", "Sample item two."] },
    { type: "code", language: "TypeScript", code: "const sample = \"layout check\";" },
  ],
};

const SAMPLE_PROJECT: Project = {
  slug: "sample-project",
  title: "Sample project title",
  summary: "Sample summary. One plain sentence describing the outcome, shown here only to check the card layout.",
  role: "Sample role",
  year: 2026,
  status: "in-development",
  statusNote: "Sample status note.",
  stack: [],
  outcomes: [],
  links: [],
  featured: false,
};

function Specimen({ label, children }: { label: string; children: ReactNode }) {
  return (
    <>
      <p className="grid-rail self-baseline font-mono text-meta text-text-2">{label}</p>
      <div className="grid-figure min-w-0 self-baseline">{children}</div>
    </>
  );
}

export default function Showcase() {
  return (
    <main className="pb-section">
      <Container className="gap-y-4 pt-12">
        <ThemeToggle className="grid-rail" />
        <h1 className="grid-main text-h1">Component showcase</h1>
        <p className="grid-main max-w-prose text-text-2">
          Development only. Switch themes with the control above, resize the window, and turn on reduced motion to
          check every state.
        </p>
      </Container>

      <section aria-labelledby="type">
        <SectionHeading id="type" index="01">Typography</SectionHeading>
        <Container className="gap-y-6">
          {TYPE_SCALE.map(([name, className, sample]) => (
            <Specimen key={name} label={name}>
              <p className={className}>{sample}</p>
            </Specimen>
          ))}
        </Container>
      </section>

      <section aria-labelledby="colour">
        <SectionHeading id="colour" index="02">Colour</SectionHeading>
        <Container>
          <ul className="grid-figure grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3 lg:grid-cols-6">
            {SWATCHES.map(([name, className]) => (
              <li key={name} className="grid gap-1">
                <span aria-hidden="true" className={`block h-12 rounded-sm border border-rule ${className}`} />
                <span className="font-mono text-meta text-text-2">--{name}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="components">
        <SectionHeading id="components" index="03">Components</SectionHeading>
        <Container className="gap-y-8">
          <Specimen label="Button">
            <div className="flex flex-wrap gap-3">
              <Button>Default</Button>
              <Button disabled>Disabled</Button>
            </div>
          </Specimen>
          <Specimen label="Link">
            <p className="max-w-prose">
              An <Link href="/">internal link</Link> and an <Link href="https://nextjs.org" external>external link</Link>{" "}
              inside running text.
            </p>
          </Specimen>
          <Specimen label="Badge">
            <p>
              <TechnologyBadge>TypeScript</TechnologyBadge>
              <TechnologyBadge> · Python</TechnologyBadge>
            </p>
          </Specimen>
          <Specimen label="Separator">
            <Separator />
          </Specimen>
        </Container>
        <div className="mt-8">
          <ProjectCard project={SAMPLE_PROJECT} />
        </div>
        <div className="mt-8"><Leadership entries={SAMPLE_LEADERSHIP} /></div>
        <div className="mt-8"><Certifications entries={SAMPLE_CERTIFICATIONS} /></div>
        <div className="mt-8"><JournalList entries={[SAMPLE_JOURNAL]} /></div>
        <div className="mt-8"><ArticleBody blocks={SAMPLE_JOURNAL.body} /></div>
      </section>

      <section aria-labelledby="motion">
        <SectionHeading id="motion" index="04">Motion</SectionHeading>
        <Container className="gap-y-8">
          <Specimen label="Hover (CSS)">
            <div className="flex flex-wrap gap-6">
              <a href="#motion" className="group hover-underline">
                Underline and nudge <ArrowUpRight className="hover-nudge" />
              </a>
              <a href="#motion" className="group relative pb-1">
                Datum line
                <span aria-hidden="true" className="hover-datum absolute inset-x-0 bottom-0 h-px bg-signal" />
              </a>
            </div>
          </Specimen>
          <Specimen label="Primitives">
            <MotionDemo />
          </Specimen>
        </Container>
      </section>

      <section aria-labelledby="fixture">
        <SectionHeading id="fixture" index="05">Activity test fixture</SectionHeading>
        <Container className="gap-y-8"><ActivityFixture /><ActivityFixture zero /></Container>
      </section>

      <section aria-labelledby="grid">
        <SectionHeading id="grid" index="06">Responsive grid</SectionHeading>
        <Container className="gap-y-2">
          <p className="col-span-full font-mono text-meta text-text-2">
            <span className="sm:hidden">base · 4 columns</span>
            <span className="hidden sm:inline lg:hidden">sm ≥ 640px · 8 columns</span>
            <span className="hidden lg:inline">lg ≥ 1024px · 12 columns</span>
          </p>
          {Array.from({ length: 12 }, (_, index) => (
            <span
              key={index}
              aria-hidden="true"
              className={`h-16 bg-terrain-1 ${index >= 4 ? "hidden sm:block" : ""} ${index >= 8 ? "sm:hidden lg:block" : ""}`}
            />
          ))}
          <p className="grid-rail border-t-2 border-probe pt-2 font-mono text-meta">rail</p>
          <p className="grid-main border-t-2 border-signal pt-2 font-mono text-meta">main</p>
          <p className="grid-margin border-t-2 border-control pt-2 font-mono text-meta">margin</p>
        </Container>
      </section>
    </main>
  );
}
