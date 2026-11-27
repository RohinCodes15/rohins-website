import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";

type SectionHeadingProps = {
  id?: string;
  index: string;
  children: ReactNode;
  /** Centre the heading in the page's centred reading column (CENTERED_COLUMN) instead of the left-anchored grid. */
  centered?: boolean;
};

/**
 * A centred section's single column, shared by its heading and content: 60rem wide and centred on the window, not
 * the page grid (the grid is left-anchored on very wide screens). Narrower screens use the full grid width.
 */
export const CENTERED_COLUMN = "w-full max-w-[60rem] ms-[max(0px,calc(50vw_-_30rem_-_var(--grid-margin)))]";

/** Place at the section's full width so the datum can reach the viewport edge. */
export function SectionHeading({ id, index, children, centered = false }: SectionHeadingProps) {
  if (centered) return (
    <div className="section-heading">
      <Container>
        <div className={`col-span-full flex min-w-0 items-baseline gap-3 ${CENTERED_COLUMN}`}>
          <span aria-hidden="true" className="shrink-0 font-mono text-index text-text-2 tabular-nums lg:text-meta">{index}</span>
          <h2 id={id} className="min-w-0 scroll-mt-8 text-h2">{children}</h2>
        </div>
      </Container>
    </div>
  );
  return (
    <div className="section-heading">
      <Container>
        {/* column-gap: normal at lg lets the subgrid inherit the page gutter; gap-3 there shifted the heading off the main column. */}
        <div className="col-span-full flex min-w-0 items-baseline gap-3 lg:col-span-10 lg:grid lg:grid-cols-subgrid lg:[column-gap:normal]">
          <span aria-hidden="true" className="shrink-0 font-mono text-index text-text-2 tabular-nums lg:col-span-3 lg:justify-self-end lg:text-meta">
            {index}
          </span>
          <h2 id={id} className="min-w-0 scroll-mt-8 text-h2 lg:col-span-7">
            {children}
          </h2>
        </div>
      </Container>
    </div>
  );
}
