import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import type { JournalEntry } from "@/lib/types";

/** Hairline rows, newest first: title, summary, then date and topics in the margin. */
export function JournalList({ entries, more = false }: { entries: readonly JournalEntry[]; more?: boolean }) {
  return (
    <Container>
      <ol className="grid-figure divide-y divide-rule">
        {entries.map(({ slug, title, summary, published, topics }) => (
          <li key={slug} className="grid gap-x-6 gap-y-1 py-4 first:pt-0 lg:grid-cols-[minmax(0,7fr)_minmax(0,2fr)]">
            <h3 className="text-h3"><Link href={`/journal/${encodeURIComponent(slug)}`}>{title}</Link></h3>
            <p className="font-mono text-meta text-text-2 lg:row-span-2 lg:pt-1"><time dateTime={published}>{published}</time></p>
            <p className="max-w-prose text-text-2">{summary}{topics.length > 0 && <span className="block text-small">{topics.join(", ")}</span>}</p>
          </li>
        ))}
      </ol>
      {more && <p className="grid-main mt-4"><Link href="/journal">All journal entries</Link></p>}
    </Container>
  );
}
