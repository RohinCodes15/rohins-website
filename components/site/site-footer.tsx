import Magnet from "@/components/reactbits/magnet";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { site } from "@/content/site";

const PAGES = [
  { label: "Work", href: "/#work" },
  { label: "Research lab", href: "/lab" },
] as const;

/** Site-wide footer: the email address as the one large link, then pages and profiles on a single quiet row. */
export function SiteFooter() {
  return (
    <footer className="border-t border-rule pt-10 pb-12 lg:pt-14 lg:pb-16">
      <Container className="gap-y-6">
        {site.email && (
          <p className="grid-main text-lead sm:text-h2">
            <Magnet><Link href={`mailto:${site.email}`} roll>{site.email}</Link></Magnet>
          </p>
        )}
        <nav aria-label="Footer" className="grid-main">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {PAGES.map(({ label, href }) => <li key={href}><Link href={href} roll>{label}</Link></li>)}
            {site.links.map(({ label, href }) => <li key={href}><Link href={href} external roll>{label}</Link></li>)}
            <li><Link href="#main" roll>Back to top</Link></li>
          </ul>
        </nav>
        <p className="grid-main font-mono text-meta text-text-2">{site.name}</p>
      </Container>
    </footer>
  );
}
