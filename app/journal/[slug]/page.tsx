import { notFound } from "next/navigation";
import { ArticleBody, headingId } from "@/components/journal/article-body";
import { SectionNavigation } from "@/components/site/section-navigation";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { journal } from "@/content/journal";
import { site } from "@/content/site";
import { findBySlug } from "@/lib/content";

// Real articles are prerendered, so blocking on params only affects unlisted slugs, which call notFound().
export const instant = false;

// Cache Components rejects an empty list, so an empty journal prerenders one placeholder slug that 404s.
const EMPTY_JOURNAL_SLUG = "_empty";

export function generateStaticParams() {
  return journal.length ? journal.map(({ slug }) => ({ slug })) : [{ slug: EMPTY_JOURNAL_SLUG }];
}

export async function generateMetadata({ params }: PageProps<"/journal/[slug]">) {
  const entry = findBySlug(journal, (await params).slug);
  if (!entry) notFound();
  return { title: `${entry.title} · ${site.name}`, description: entry.summary };
}

export default async function JournalArticle({ params }: PageProps<"/journal/[slug]">) {
  const entry = findBySlug(journal, (await params).slug);
  if (!entry) notFound();
  const headings = entry.body.flatMap((block) => (block.type === "heading" ? [{ id: headingId(block.text), label: block.text }] : []));

  return (
    <main id="main" tabIndex={-1} className="pb-section-sm lg:pb-section">
      <Container className="gap-y-5 pt-8 lg:gap-y-6 lg:pt-24">
        <h1 id="overview" className="grid-figure scroll-mt-8 hero-datum pb-5 text-h1 lg:row-start-1 lg:pb-6">{entry.title}</h1>
        <SectionNavigation label="Article sections" sections={[{ id: "overview", label: "Overview" }, ...headings]}>
          <Link href="/journal" className="mb-4 inline-flex min-h-6 items-center font-mono text-meta">All journal entries</Link>
        </SectionNavigation>
        <p className="grid-main max-w-prose text-lead lg:row-start-2">{entry.summary}</p>
        <p className="grid-margin font-mono text-meta text-text-2 lg:col-start-11 lg:row-start-2">
          Published <time dateTime={entry.published}>{entry.published}</time>
          {entry.updated && <span className="block">Updated <time dateTime={entry.updated}>{entry.updated}</time></span>}
          {entry.topics.length > 0 && <span className="mt-2 block">{entry.topics.join(", ")}</span>}
        </p>
      </Container>
      <div className="mt-12"><ArticleBody blocks={entry.body} /></div>
    </main>
  );
}
