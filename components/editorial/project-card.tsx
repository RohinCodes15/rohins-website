import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { Separator } from "@/components/ui/separator";
import { StatusMark } from "@/components/editorial/status-mark";
import { TechnologyBadge } from "@/components/ui/technology-badge";
import { stack } from "@/content/stack";
import { projectHref, projectTitleTransition } from "@/lib/content";
import type { Project, StackEntry } from "@/lib/types";

const technologies: Readonly<Record<string, StackEntry>> = stack;

function technologyLabel(id: string): string {
  return technologies[id].label;
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group/project relative">
      <Container>
        <div aria-hidden="true" className="col-span-full grid grid-cols-subgrid">
          <Separator decorative className="col-span-full col-start-1 row-start-1 in-[article:first-of-type]:invisible" />
          <span className="col-span-full col-start-1 row-start-1 h-px origin-left scale-x-0 bg-signal transition-transform duration-(--duration-ui) ease-datum group-focus-within/project:scale-x-100 group-hover/project:scale-x-100 lg:col-start-4 lg:col-span-7" />
        </div>
        <h3 style={{ viewTransitionName: projectTitleTransition(project.slug) }} className="col-span-3 justify-self-start self-baseline pt-5 text-h2 wrap-anywhere sm:col-span-7 lg:col-start-4">
          <Link
            href={projectHref(project.slug)}
            roll
            className="[--roll-line:transparent] after:absolute after:inset-0 group-focus-within/project:[--roll-line:var(--signal)] group-hover/project:[--roll-line:var(--signal)]"
          >
            {project.title}
          </Link>
        </h3>
        <time
          dateTime={String(project.year)}
          className="col-span-1 justify-self-end self-baseline pt-5 font-mono text-meta text-text-2 tabular-nums lg:col-start-11 lg:col-span-2 lg:justify-self-start"
        >
          {project.year}
        </time>
        <p className="grid-main mt-2 max-w-prose text-text-2">
          {project.summary}
        </p>
        <p className="grid-main mt-3 pb-6 text-meta text-text-2">
          <StatusMark status={project.status} className="font-mono text-text" />
          {" · "}{project.role}
          {project.stack.map((id) => (
            <TechnologyBadge key={id}> · {technologyLabel(id)}</TechnologyBadge>
          ))}
        </p>
      </Container>
    </article>
  );
}
