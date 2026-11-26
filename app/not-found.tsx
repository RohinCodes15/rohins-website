import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";

export default function NotFound() {
  return (
    <main id="main" className="pb-section-sm lg:pb-section">
      <Container className="gap-y-5 pt-8 lg:gap-y-6 lg:pt-24">
        <p aria-hidden="true" className="grid-rail font-mono text-meta text-text-2 lg:row-start-1 lg:self-end lg:pb-6">404</p>
        <h1 className="grid-figure hero-datum pb-5 text-h1 lg:row-start-1 lg:pb-6">Page not found</h1>
        <p className="grid-main max-w-prose text-lead">This address has no page. It may have moved, or the link may be mistyped.</p>
        <p className="grid-main"><Link href="/">Go to the homepage</Link></p>
      </Container>
    </main>
  );
}
