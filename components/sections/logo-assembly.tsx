import Image from "next/image";
import NextLink from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type AssemblyLogo = {
  label: string;
  logo: string;
  /** Where the logo leads: a case study, or an external profile. */
  href?: string;
  /** Second line of the hover and focus label, for example the projects that use it. */
  detail?: string;
  /** Single-colour logo that inverts in dark mode. */
  mono?: boolean;
};

const LOGO_SIZE = 96;

/**
 * Technology logos that start fanned out on an arc, offset, rotated, raised, and scaled down by their distance from
 * the centre, then settle into one row as the row reaches the middle of the viewport. Pure CSS on a view timeline
 * (`.logo-assembly` in globals.css), so scrolling back reverses it. Without scroll timelines or with reduced motion
 * the row is static. Motion after Skiper UI's Skiper 31, CharacterV3 (skiper-ui.com); no Skiper code is used.
 */
export function LogoAssembly({ logos }: { logos: readonly AssemblyLogo[] }) {
  const center = (logos.length - 1) / 2;
  return (
    <ul aria-label="Featured technologies" className="logo-assembly">
      {logos.map((logo, index) => {
        const distance = index - center;
        return (
          <li key={logo.label} style={{ "--d": distance, "--ad": Math.abs(distance) } as CSSProperties}>
            <Item {...logo} />
          </li>
        );
      })}
    </ul>
  );
}

function Item({ label, logo, href, detail, mono }: AssemblyLogo) {
  const body: ReactNode = (
    <>
      <Image src={logo} alt="" width={LOGO_SIZE} height={LOGO_SIZE} unoptimized className={cn("logo-assembly-mark", mono && "dark:invert")} />
      <span className="logo-assembly-label">
        <span className="block text-text">{label}</span>
        {detail && <span className="block text-text-2">{detail}</span>}
      </span>
    </>
  );
  if (!href) return <span tabIndex={0} className="logo-assembly-item">{body}</span>;
  if (href.startsWith("/")) return <NextLink href={href} className="logo-assembly-item">{body}</NextLink>;
  return <a href={href} rel="noopener noreferrer" className="logo-assembly-item">{body}</a>;
}
