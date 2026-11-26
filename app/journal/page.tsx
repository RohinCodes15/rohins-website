import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JournalList } from "@/components/journal/journal-list";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { journal } from "@/content/journal";
import { site } from "@/content/site";

export const metadata: Metadata = { title: `Journal · ${site.name}`, description: "Research and engineering notes." };

export default function JournalIndex() {
  // No empty routes (ARCHITECTURE §3): the index exists only once content/journal.ts has an entry.
  if (!journal.length) notFound();
  return (
    <main id="main" className="pb-section-sm lg:pb-section">
      <Container className="gap-y-5 pt-8 lg:gap-y-6 lg:pt-24">
        <p className="grid-rail font-mono text-meta lg:row-start-1 lg:self-end lg:pb-6"><Link href="/">Back to home</Link></p>
        <h1 className="grid-figure hero-datum pb-5 text-h1 lg:row-start-1 lg:pb-6">Journal</h1>
        <p className="grid-main max-w-prose text-lead">Research and engineering notes, newest first.</p>
      </Container>
      <div className="mt-12"><JournalList entries={journal} /></div>
    </main>
  );
}
