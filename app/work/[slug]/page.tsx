import type { ReactNode } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArchitectureDiagram } from "@/components/editorial/architecture-diagram";
import { ParallaxGallery } from "@/components/editorial/parallax-gallery";
import { SectionHeading } from "@/components/editorial/section-heading";
import { StatusMark } from "@/components/editorial/status-mark";
import { SectionNavigation } from "@/components/site/section-navigation";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { stack } from "@/content/stack";
import { findBySlug, projectTitleTransition } from "@/lib/content";
import type { CaseStudy, Project } from "@/lib/types";

// Every real case study is prerendered, so blocking on params only affects unlisted slugs, which call notFound().
export const instant = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">) {
  const project = findBySlug(projects, (await params).slug);
  if (!project) notFound();
  return { title: `${project.title} · ${site.name}`, description: project.summary };
}

type Section = { id: string; label: string; content: ReactNode };

const prose = (text: string) => <Container><p className="grid-main max-w-prose">{text}</p></Container>;

function Figures({ figures }: Pick<CaseStudy, "figures">) {
  return figures.map(({ src, width, height, alt, caption }, index) => (
    <figure key={src} className="grid-figure mt-8 min-w-0">
      <Image src={src} width={width} height={height} alt={alt} sizes="(min-width: 64rem) 75vw, 100vw" className="h-auto w-full rounded-sm border border-rule-strong" />
      <figcaption className="mt-3 max-w-prose text-small text-text-2">
        <span className="font-mono text-meta">Fig. {index + 1}</span> — {caption}
      </figcaption>
    </figure>
  ));
}

/** Only sections with content are listed, so an unfinished case study never shows an empty heading. */
function caseStudySections(project: Project): Section[] {
  const study = project.caseStudy;
  const sections: Section[] = [];
  if (study?.problem) sections.push({ id: "problem", label: "Problem", content: prose(study.problem) });
  if (study?.solution) sections.push({ id: "solution", label: "Solution", content: (
    <Container>
      <p className="grid-main max-w-prose">{study.solution}</p>
      <Figures figures={study.figures} />
    </Container>
  ) });
  if (study?.architecture.length) sections.push({ id: "architecture", label: "Architecture", content: (
    <Container>
      {study.flows.length > 0 && <div className="grid-figure mb-8"><ArchitectureDiagram flows={study.flows} components={study.architecture.map(({ name }) => name)} /></div>}
      <dl className="grid-main divide-y divide-rule">
        {study.architecture.map(({ name, detail }) => (
          <div key={name} className="grid gap-x-6 gap-y-1 py-3 first:pt-0 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)]">
            <dt className="font-mono text-meta leading-6">{name}</dt>
            <dd className="text-text-2">{detail}</dd>
          </div>
        ))}
      </dl>
    </Container>
  ) });
  if (study?.complexity.length) sections.push({ id: "complexity", label: "Technical complexity", content: (
    <Container>
      <ol className="grid-main max-w-prose divide-y divide-rule">
        {study.complexity.map((point, index) => (
          <li key={point} className="flex gap-4 py-3 first:pt-0">
            <span aria-hidden="true" className="shrink-0 font-mono text-meta leading-6 text-text-2">{String(index + 1).padStart(2, "0")}</span>
            <span>{point}</span>
          </li>
        ))}
      </ol>
    </Container>
  ) });
  if (study?.decisions.length) sections.push({ id: "decisions", label: "Engineering decisions", content: (
    <Container>
      <dl className="grid-main max-w-prose divide-y divide-rule">
        {study.decisions.map(({ decision, reason }) => (
          <div key={decision} className="py-3 first:pt-0">
            <dt className="text-h3">{decision}</dt>
            <dd className="mt-1 text-text-2">{reason}</dd>
          </div>
        ))}
      </dl>
    </Container>
  ) });
  if (project.gallery?.images.length) sections.push({ id: "screens", label: "Screens", content: <Container><ParallaxGallery gallery={project.gallery} /></Container> });
  if (project.outcomes.length) sections.push({ id: "outcomes", label: "Verified outcomes", content: (
    <Container>
      <dl className="grid-figure grid gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
        {project.outcomes.map(({ label, value, source }) => (
          <div key={label} className="flex min-w-0 flex-col">
            <dt className="order-2 mt-2 font-mono text-meta text-text-2">{label}</dt>
            <dd className="order-1 text-metric">{value}</dd>
            <dd className="order-3 mt-2 text-small text-text-2">Source: {source}</dd>
          </div>
        ))}
      </dl>
    </Container>
  ) });
  return sections;
}

function Metadata({ project }: { project: Project }) {
  const rows: { label: string; value: ReactNode }[] = [
    { label: "Status", value: <StatusMark status={project.status} /> },
    { label: "Role", value: project.role },
    { label: "Year", value: <time dateTime={String(project.year)}>{project.year}</time> },
    { label: "Stack", value: <ul>{project.stack.map((id) => <li key={id}>{stack[id].label}</li>)}</ul> },
  ];
  if (project.links.length) rows.push({ label: "Links", value: <ul>{project.links.map(({ href, label }) => (
    <li key={href}><Link href={href} external={href.startsWith("https://")}>{label}</Link></li>
  ))}</ul> });
  const repo = project.repository;
  if (repo) rows.push({ label: "Repository", value: (
    <ul className="text-text-2">
      <li className="text-text">{repo.visibility === "public" ? "Public" : "Private"} · {repo.language}</li>
      <li>{repo.license ?? "No license file"}</li>
      <li>First commit <time dateTime={repo.firstCommit}>{repo.firstCommit}</time></li>
      <li>Last push <time dateTime={repo.lastPush}>{repo.lastPush}</time></li>
      <li>Checked <time dateTime={repo.checked}>{repo.checked}</time></li>
    </ul>
  ) });

  return (
    <dl className="grid-margin grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-2 self-start border-t border-rule pt-3 font-mono text-meta lg:col-start-11 lg:row-start-2 lg:grid-cols-1 lg:gap-y-0 lg:border-t-0 lg:pt-0">
      {rows.map(({ label, value }) => (
        <div key={label} className="contents lg:block lg:pb-3">
          <dt className="text-text-2">{label}</dt>
          <dd className="min-w-0 text-text">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const project = findBySlug(projects, (await params).slug);
  if (!project) notFound();
  const sections = caseStudySections(project);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-10 focus:bg-surface focus:px-4 focus:py-2">Skip to content</a>
      <main id="main" tabIndex={-1} className="pb-section-sm lg:pb-section">
        <section aria-labelledby="overview">
          <Container className="gap-y-5 pt-8 lg:gap-y-6 lg:pt-24">
            <h1 id="overview" className="grid-figure scroll-mt-8 hero-datum pb-5 text-h1 lg:row-start-1 lg:pb-6"><span className="inline-block" style={{ viewTransitionName: projectTitleTransition(project.slug) }}>{project.title}</span></h1>
            <SectionNavigation label="Case study sections" sections={[{ id: "overview", label: "Overview" }, ...sections.map(({ id, label }) => ({ id, label }))]}>
              <Link href="/#work" className="mb-4 inline-flex min-h-6 items-center font-mono text-meta">Back to selected work</Link>
            </SectionNavigation>
            <div className="grid-main max-w-prose lg:row-start-2">
              <p className="text-lead">{project.summary}</p>
              <p className="mt-4 text-text-2">{project.statusNote}</p>
            </div>
            <Metadata project={project} />
          </Container>
        </section>
        {sections.map(({ id, label, content }, index) => (
          // The tall metadata column already spaces the overview from the first section.
          <section key={id} aria-labelledby={id} className={index === 0 ? "lg:[&>.section-heading]:pt-8" : undefined}>
            <SectionHeading id={id} index={String(index + 1).padStart(2, "0")}>{label}</SectionHeading>
            {content}
          </section>
        ))}
      </main>
    </>
  );
}
