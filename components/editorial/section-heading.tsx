import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";

type SectionHeadingProps = {
  id?: string;
  index: string;
  children: ReactNode;
};

/** Place at the section's full width so the datum can reach the viewport edge. */
export function SectionHeading({ id, index, children }: SectionHeadingProps) {
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
