import "@fontsource/ibm-plex-sans-jp/400.css";
import "@fontsource/ibm-plex-sans-jp/500.css";
import "@fontsource/ibm-plex-sans-jp/700.css";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import { site } from "@/data/site";

export default function JaLayout({ children }) {
  return (
    <div lang="ja" className="[word-break:auto-phrase]">
      <SiteHeader locale="ja" />
      <main id="main">{children}</main>
      <footer className="bg-[#0a2139] text-white/70">
        <Container className="flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
          <Logo href="/ja" invert />
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a>
            <span>{site.phone}</span>
            <Link href="/" hrefLang="en" className="hover:text-white">English site</Link>
          </div>
        </Container>
        <div className="border-t border-white/10">
          <Container className="py-5 text-sm text-white/50">© {new Date().getFullYear()} {site.name}</Container>
        </div>
      </footer>
    </div>
  );
}
