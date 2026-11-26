import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import type { Leadership as LeadershipEntry } from "@/lib/types";

/** One hairline row per role: role and organization in the main column, dates hanging in the margin. */
export function Leadership({ entries }: { entries: readonly LeadershipEntry[] }) {
  return (
    <ol>
      {entries.map(({ org, role, start, end, summary, outcomes, link }) => (
        <li key={`${org}-${start}`}>
          <Container className="pb-5">
            {/* The section datum already rules the first row. */}
            <div aria-hidden="true" className="col-span-full mb-5 h-px bg-rule in-[li:first-child]:invisible in-[li:first-child]:mb-0 lg:col-start-4" />
            <h3 className="grid-main text-h3">{role}</h3>
            <p className="grid-main text-text-2">{org}</p>
            <p className="grid-main mt-1 font-mono text-meta text-text-2 tabular-nums lg:col-start-11 lg:col-span-2 lg:row-start-2 lg:mt-0 lg:self-baseline">
              <time dateTime={start}>{start}</time> – {end ? <time dateTime={end}>{end}</time> : "present"}
            </p>
            <p className="grid-main mt-3 max-w-prose">{summary}</p>
            {outcomes.length > 0 && (
              <ul className="grid-main mt-3 max-w-prose space-y-1 text-text-2">
                {outcomes.map((outcome) => (
                  <li key={outcome} className="grid grid-cols-[1.25rem_minmax(0,1fr)]">
                    <span aria-hidden="true" className="font-mono">–</span>
                    {outcome}
                  </li>
                ))}
              </ul>
            )}
            {link && <p className="grid-main mt-3"><Link href={link.href} external={link.href.startsWith("https://")}>{link.label}</Link></p>}
          </Container>
        </li>
      ))}
    </ol>
  );
}
