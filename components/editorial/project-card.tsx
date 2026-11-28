import type { CSSProperties } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import Magnet from "@/components/reactbits/magnet";
import { StatusMark } from "@/components/editorial/status-mark";
import { DecryptedText } from "@/components/ui/decrypted-text";
import { stack } from "@/content/stack";
import { projectHref, projectTitleTransition } from "@/lib/content";
import { cn } from "@/lib/utils";
import type { Figure, Project, StackEntry } from "@/lib/types";

const technologies: Readonly<Record<string, StackEntry>> = stack;

export type ProjectScreen = Omit<Figure, "caption">;

type WorkItem = { project: Project; screens: readonly ProjectScreen[]; accent?: string };

/**
 * Selected work as an exhibition of numbered panels. From 1024 × 700 px, with scroll timelines and no reduced-motion
 * preference, each panel pins and the one before it recedes in depth as the next covers it; incoming screens reveal
 * from below. Phones get the same panels as a plain list. Styles: `.work-*` in globals.css. Ideas after Skiper UI's
 * Skiper 17, 30 and 34 (skiper-ui.com) and React Bits Bounce Cards (reactbits.dev); no code from either is used.
 */
export function SelectedWork({ items }: { items: readonly WorkItem[] }) {
  return (
    <Container>
      <ol className="work-list col-span-full" style={{ "--n": items.length } as CSSProperties}>
        {items.map((item, index) => (
          <li key={item.project.slug} className="work-item" style={{ "--i": index } as CSSProperties}>
            <ProjectCard {...item} number={index + 1} />
          </li>
        ))}
      </ol>
    </Container>
  );
}

export function ProjectCard({ project, screens = [], accent, number }: Partial<WorkItem> & { project: Project; number?: number }) {
  const [lead, ...rest] = screens;
  const phones = lead !== undefined && lead.height > lead.width;
  return (
    <article className="work-panel group/project relative" style={accent ? ({ "--accent": accent } as CSSProperties) : undefined}>
      <header className="work-head min-w-0">
        {number !== undefined && <p aria-hidden="true" className="work-number"><DecryptedText text={String(number).padStart(2, "0")} replayOn=".work-panel" /></p>}
        <h3 style={{ viewTransitionName: projectTitleTransition(project.slug) }} className="work-title wrap-anywhere">{project.title}</h3>
      </header>
      {lead ? (
        <div className={cn("work-media", phones && "work-media-phones")}>
          {[lead, ...rest].map((screen, index) => (
            <Image
              key={screen.src}
              src={screen.src}
              width={screen.width}
              height={screen.height}
              alt={screen.alt}
              sizes={index === 0 && !phones ? "(min-width: 64rem) 46rem, 92vw" : "(min-width: 64rem) 22rem, 40vw"}
              className={cn("work-shot", `work-shot-${index}`)}
              style={{ "--ratio": screen.width / screen.height } as CSSProperties}
            />
          ))}
        </div>
      ) : (
        // No published screen: the project's own status note, set large, is the panel's image.
        <p className="work-media work-statement">{project.statusNote}</p>
      )}
      <div className="work-body min-w-0">
        <p className="max-w-prose text-text-2">{project.summary}</p>
        <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-meta text-text-2">
          <StatusMark status={project.status} className="font-mono text-text" />
          <span>{project.role}</span>
          <time dateTime={String(project.year)} className="tabular-nums">{project.year}</time>
        </p>
        <ul aria-label="Technologies" className="mt-3 flex flex-wrap gap-1.5">
          {project.stack.map((id) => <li key={id} className="work-tag">{technologies[id].label}</li>)}
        </ul>
        {/* Above the panel-wide target below, so the magnet can move it and it keeps its own focus ring. */}
        <Magnet wrapperClassName="relative z-[6] mt-7">
          <Link href={projectHref(project.slug)} roll aria-label={`Read the case study: ${project.title}`} className="work-cta">
            Read the case study
          </Link>
        </Magnet>
      </div>
      {/* The whole panel opens the case study. A separate target, because a stretched pseudo-element inside the
          magnet's moving wrapper would shrink to the link. Hidden from assistive tech and the tab order: the link
          above is the one reachable control. */}
      <a href={projectHref(project.slug)} aria-hidden="true" tabIndex={-1} className="absolute inset-0 z-[5]" />
    </article>
  );
}
