import type { Metadata } from "next";
import { SiteFooter } from "@/components/site/site-footer";
import { ThemeRestore } from "@/components/site/theme-restore";
import { site } from "@/content/site";
import { HERO_PLAYED_SCRIPT } from "@/lib/hero-entrance";
import { THEME_SCRIPT } from "@/lib/theme";
import { commitMono, switzer } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: site.name,
  description: site.roleLine,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: THEME_SCRIPT and HERO_PLAYED_SCRIPT set data attributes on <html> before React hydrates
    // (this element only).
    <html lang="en" className={`${switzer.variable} ${commitMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: HERO_PLAYED_SCRIPT }} />
      </head>
      <body>{children}<SiteFooter /><ThemeRestore /></body>
    </html>
  );
}
