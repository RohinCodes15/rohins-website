import { CopyButton } from "@/components/site/copy-button";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import type { Site } from "@/lib/types";

/** Email first (the most direct route), then profiles, then the résumé once one is published. */
export function Contact({ email, links, resume }: Pick<Site, "email" | "links" | "resume">) {
  return (
    <Container>
      <div className="grid-main grid gap-6">
        {email && (
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <a href={`mailto:${email}`} className="hover-underline text-h3 wrap-anywhere">{email}</a>
            <CopyButton text={email} label="Copy email" />
          </div>
        )}
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map(({ href, label }) => <li key={href}><Link href={href} external={href.startsWith("https://")} roll>{label}</Link></li>)}
          {resume && (
            <li>
              <Link href={resume.href} roll>Résumé (PDF)</Link>
              <span className="ms-2 font-mono text-meta text-text-2">updated <time dateTime={resume.updated}>{resume.updated}</time></span>
            </li>
          )}
        </ul>
      </div>
    </Container>
  );
}
