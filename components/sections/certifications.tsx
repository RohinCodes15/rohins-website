import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import type { Certification } from "@/lib/types";

/** Each credential links to the issuer's own verification page: no badge images. Dates hang in the margin. */
export function Certifications({ entries }: { entries: readonly Certification[] }) {
  return (
    <ul>
      {entries.map(({ name, issuer, issued, expires, verifyUrl }) => (
        <li key={`${name}-${issued}`}>
          <Container className="pb-4">
            {/* Invisible on the first row, which the section datum already rules, so rows keep one structure. */}
            <div aria-hidden="true" className="col-span-full mb-4 h-px bg-rule in-[li:first-child]:invisible in-[li:first-child]:mb-0 lg:col-start-4" />
            <h3 className="grid-main text-h3">{name}</h3>
            <p className="grid-main text-text-2">{issuer} · <Link href={verifyUrl} external>Verify</Link></p>
            <p className="grid-main mt-1 font-mono text-meta text-text-2 tabular-nums lg:col-start-11 lg:col-span-2 lg:row-start-2 lg:mt-0 lg:self-baseline">
              <time dateTime={issued}>{issued}</time>
              {expires && <> · expires <time dateTime={expires}>{expires}</time></>}
            </p>
          </Container>
        </li>
      ))}
    </ul>
  );
}
