import type { CSSProperties } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { StatusMark } from "@/components/editorial/status-mark";
import { TechnologyBadge } from "@/components/ui/technology-badge";
import { stack } from "@/content/stack";
import { projectHref, projectTitleTransition } from "@/lib/content";
import type { Figure, Project, StackEntry } from "@/lib/types";

const technologies: Readonly<Record<string, StackEntry>> = stack;

function technologyLabel(id: string): string {
  return technologies[id].label;
}

export type ProjectCover = Omit<Figure, "caption">;

/**
 * Featured projects as editorial panels that pin and stack as the reader scrolls; each earlier panel recedes
 * as the next one covers it. Pure CSS on a scroll timeline (`.project-stack` in globals.css). Phones, reduced
 * motion, and browsers without scroll timelines get the same panels as a plain list.
 * Layout idea after Skiper UI's Skiper 16 (skiper-ui.com); no Skiper code is used.
 */
export function ProjectStack({ items }: { items: readonly { project: Project; cover?: ProjectCover }[] }) {
  return (
    <Container>
      <ol className="project-stack col-span-full" style={{ "--n": items.length } as CSSProperties}>
        {items.map(({ project, cover }, index) => (
          <li key={project.slug} className="project-stack-item" style={{ "--i": index } as CSSProperties}>
            <ProjectCard project={project} cover={cover} />
          </li>
        ))}
      </ol>
    </Container>
  );
}

export function ProjectCard({ project, cover }: { project: Project; cover?: ProjectCover }) {
  return (
    <article className="project-panel group/project relative grid gap-6 rounded-sm border border-rule bg-surface p-5 sm:p-6 lg:grid-cols-12 lg:gap-8 lg:p-8">
      <div className={cover ? "lg:col-span-5" : "lg:col-span-12"}>
        <div className="flex items-baseline justify-between gap-4">
          <h3 style={{ viewTransitionName: projectTitleTransition(project.slug) }} className="text-h2 wrap-anywhere">
            <Link
              href={projectHref(project.slug)}
              roll
              className="[--roll-line:transparent] after:absolute after:inset-0 group-focus-within/project:[--roll-line:var(--signal)] group-hover/project:[--roll-line:var(--signal)]"
            >
              {project.title}
            </Link>
          </h3>
          <time dateTime={String(project.year)} className="font-mono text-meta text-text-2 tabular-nums">{project.year}</time>
        </div>
        <p className="mt-3 max-w-prose text-text-2">{project.summary}</p>
        <p className="mt-4 text-meta text-text-2">
          <StatusMark status={project.status} className="font-mono text-text" />
          {" · "}{project.role}
          {project.stack.map((id) => (
            <TechnologyBadge key={id}> · {technologyLabel(id)}</TechnologyBadge>
          ))}
        </p>
        <p aria-hidden="true" className="mt-6 font-mono text-meta text-text-2 transition-colors duration-(--duration-ui) group-hover/project:text-signal group-focus-within/project:text-signal">Read case study</p>
      </div>
      {cover && (
        <div className="overflow-hidden rounded-sm border border-rule bg-[light-dark(#f4f4f5,#18181b)] lg:col-span-7">
          <Image
            src={cover.src}
            width={cover.width}
            height={cover.height}
            alt={cover.alt}
            sizes="(min-width: 64rem) 42rem, 92vw"
            // Screens range from phone to wide chart; letterbox them so no title or axis is cropped.
            className="aspect-[16/10] h-auto w-full object-contain"
          />
        </div>
      )}
    </article>
  );
}
