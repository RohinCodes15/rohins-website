import type { Metadata } from "next";
import { ThemeRestore } from "@/components/site/theme-restore";
import { site } from "@/content/site";
import { THEME_SCRIPT } from "@/lib/theme";
import { commitMono, switzer } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: site.name,
  description: site.roleLine,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: THEME_SCRIPT sets data-theme on <html> before React hydrates (this element only).
    <html lang="en" className={`${switzer.variable} ${commitMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>{children}<ThemeRestore /></body>
    </html>
  );
}
