import { Suspense, type CSSProperties, type ReactNode } from "react";
import { PerspectiveCrawl } from "@/components/editorial/perspective-crawl";
import { CENTERED_COLUMN, SectionHeading } from "@/components/editorial/section-heading";
import { HeroLines } from "@/components/editorial/hero-lines";
import Magnet from "@/components/reactbits/magnet";
import { SelectedWork } from "@/components/editorial/project-card";
import { Activity, ActivityFrame } from "@/components/sections/activity";
import { LogoAssembly } from "@/components/sections/logo-assembly";
import { StackExplorer } from "@/components/sections/stack-explorer";
import { SectionNavigation } from "@/components/site/section-navigation";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { JournalList } from "@/components/journal/journal-list";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";
import { journal } from "@/content/journal";
import { Leadership } from "@/components/sections/leadership";
import { certifications } from "@/content/certifications";
import { leadership } from "@/content/leadership";
import { workAccents, workScreens } from "@/content/gallery";
import { projects } from "@/content/projects";
import { research } from "@/content/research";
import { githubProfile, site } from "@/content/site";
import { featuredStack, stack, type StackId } from "@/content/stack";
import { projectHref, projectsByStack } from "@/lib/content";

// Dark values are the brief's; light values are darker steps of the same hues so they hold contrast on #fafafa.
const IDENTITIES = [
  { text: "SOFTWARE DEVELOPER", color: "light-dark(#0a0a0b, #fafafa)" },
  { text: "AI ENGINEER", color: "light-dark(#2563eb, #3b82f6)" },
  { text: "QUANTITATIVE RESEARCH", color: "light-dark(#dc2626, #ef4444)" },
];

export default function Home() {
  const featured = projects.filter((project) => project.featured);
  const nameLines = site.name.split(" ");
  // Index of each word's first character in the whole name, so the stagger runs across both lines.
  const nameStarts = nameLines.map((_, index) => nameLines.slice(0, index).join("").length);
  const technologies = Object.entries(stack).map(([id, entry]) => ({
    id, ...entry, usedIn: projectsByStack(projects, id as StackId).map(({ slug, title }) => ({ slug, title })),
  }));
  // A logo with projects links to the first (lead) project and lists them all on hover and focus.
  const logos = featuredStack.map(({ stackId, ...technology }) => {
    const usedIn = stackId ? projectsByStack(projects, stackId) : [];
    return {
      ...technology,
      href: technology.href ?? (usedIn[0] && projectHref(usedIn[0].slug)),
      detail: usedIn.length ? `Used in ${usedIn.map(({ title }) => title).join(", ")}` : undefined,
    };
  });
  // Work leads: it is the verified substance.
  const sections: { id: string; label: string; content: ReactNode; centered?: boolean }[] = [];
  if (featured.length) sections.push({
    // Each project fans its own work screens; one without screens shows its status note.
    id: "work", label: "Selected work", content: <SelectedWork items={featured.map((project) => ({
      project, screens: workScreens[project.slug] ?? [], accent: workAccents[project.slug],
    }))} />,
  });

  if (technologies.length) sections.push({
    id: "stack", label: "Tech Stack", centered: true, content: (
      <Container>
        <div className={`col-span-full min-w-0 ${CENTERED_COLUMN}`}>
          <p className="max-w-prose text-lead text-text-2">The technologies behind my ideas.</p>
          <div className="mt-8"><LogoAssembly logos={logos} /></div>
          <StackExplorer technologies={technologies} />
        </div>
      </Container>
    ),
  });
  if (leadership.length) sections.push({ id: "leadership", label: "Leadership", content: <Leadership entries={leadership} /> });
  if (certifications.length) sections.push({ id: "certifications", label: "Certifications", content: <Certifications entries={certifications} /> });
  if (site.interests.length || research.length) sections.push({
    id: "research", label: "Research and interests", content: <Container>
      <dl className="grid-main divide-y divide-rule">
        {site.interests.map(({ title, description }) => <div key={title} className="py-4">
          <dt className="text-h3">{title}</dt><dd className="mt-1 text-text-2">{description}</dd>
        </div>)}
      </dl>
      <p className="grid-main mt-6"><Link href="/lab">Open the research lab</Link><span className="text-text-2"> · interactive educational demonstrations on synthetic data</span></p>
      {research.length > 0 && <ul className="grid-main divide-y divide-rule">
        {research.map((entry) => <li key={entry.slug} className="py-4">
          <h3 className="text-h3">{entry.title}</h3><p className="text-text-2">{entry.abstract}</p>
        </li>)}
      </ul>}
    </Container>,
  });
  // Activity sits after work, stack and interests: its unavailable state should never be what a reviewer sees first.
  sections.push(
    { id: "activity", label: "Activity", content: (
      <Container>
        <Suspense fallback={<ActivityFrame>
          <div className="px-4 sm:px-6">
            <p className="activity-loading text-text-2">Loading GitHub activity…</p>
            <noscript><p><Link href={githubProfile.href} external>View activity on GitHub</Link></p></noscript>
          </div>
        </ActivityFrame>}>
          <Activity />
        </Suspense>
      </Container>
    ) },
  );
  if (journal.length) sections.push({ id: "journal", label: "Journal", content: <JournalList entries={journal.slice(0, 3)} more={journal.length > 3} /> });
  if (site.email || site.links.length || site.resume) sections.push({
    id: "contact", label: "Contact", content: <Contact email={site.email} links={site.links} resume={site.resume} />,
  });

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-10 focus:bg-surface focus:px-4 focus:py-2">Skip to content</a>
      <main id="main" tabIndex={-1} className="pb-section-sm lg:pb-section">
        <section aria-labelledby="intro" className="hero-entrance relative lg:min-h-[min(100svh,48rem)]">
          <Container className="relative z-1 gap-y-5 pt-8 lg:gap-y-6 lg:pt-24">
            {/* One word per line, set larger than the display token: the name is the hero's typographic mass. Each character
                is its own span for the entrance (globals.css, Hero entrance), so the label gives screen readers the name
                whole; the space keeps the text "First Last". */}
            <h1 id="intro" aria-label={site.name} className="grid-figure scroll-mt-8 hero-datum pb-5 text-display text-[length:clamp(3.75rem,1rem+11vw,11.5rem)] lg:row-start-1 lg:pb-6">
              {nameLines.map((word, index) => <span key={word} aria-hidden="true" className="block">
                {[...word].map((char, at) => <span key={at} className="hero-char" style={{ "--char": nameStarts[index] + at } as CSSProperties}>{char}</span>)}
                {index < nameLines.length - 1 && " "}
              </span>)}
            </h1>
            <SectionNavigation sections={[{ id: "intro", label: "Overview" }, ...sections.map(({ id, label }) => ({ id, label }))]} />
            <p className="hero-follow grid-main max-w-prose text-lead [--delay:0.55s] lg:self-baseline">{site.roleLine}</p>
            {site.readout && <p className="hero-follow grid-main self-start border-t border-rule pt-2 font-mono text-meta text-text-2 [--delay:0.65s] lg:row-start-3 lg:-mt-3 lg:border-t-0 lg:pt-0">{site.readout}</p>}
            <div className="hero-follow grid-main max-w-prose [--delay:0.8s] lg:row-start-4">
              <p className="text-text-2">{site.intro}</p>
              <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                {featured.length > 0 && <Magnet wrapperClassName="me-1 max-sm:w-full"><a href="#work" className="press inline-flex min-h-11 w-full items-center justify-center rounded-sm bg-action px-5 text-body font-medium text-on-probe transition-colors duration-(--duration-micro) hover:bg-action-hover">Explore my work</a></Magnet>}
                {site.email && <Link href={`mailto:${site.email}`} roll>Email</Link>}
                {site.links.map(({ label, href }) => <Link key={href} href={href} external roll>{label}</Link>)}
              </p>
              {site.bio && <details className="mt-3">
                <summary className="hover-underline cursor-pointer">Full introduction</summary>
                <p className="mt-2 text-text-2">{site.bio}</p>
              </details>}
            </div>
          </Container>
          <HeroLines />
        </section>
        {/* Repeats site.roleLine, so assistive tech skips it. */}
        <div aria-hidden="true"><PerspectiveCrawl lines={IDENTITIES} /></div>
        {sections.map(({ id, label, content, centered }, index) => (
          <section key={id} aria-labelledby={id}>
            <SectionHeading id={id} index={String(index + 1).padStart(2, "0")} centered={centered}>{label}</SectionHeading>
            {content}
          </section>
        ))}
      </main>
    </>
  );
}
