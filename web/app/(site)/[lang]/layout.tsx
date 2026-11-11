import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../../globals.css";
import "./site.css";
import { inter, plexMono, plexSans } from "@/lib/fonts";
import { HTML_LANG, LOCALES, isLang } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dict";
import { getNav } from "@/lib/f1/nav";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = getDict(lang);
  return {
    title: { default: `Paddock — ${t.meta.tagline}`, template: "%s · Paddock" },
    description: t.meta.description,
  };
}

/**
 * Root layout of Paddock (one per language). The RACEOPS app has its own
 * root layout in the (raceops) group.
 */
export default async function SiteLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDict(lang);
  return (
    <html lang={HTML_LANG[lang]} className={`${inter.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <div className="site flex min-h-svh flex-1 flex-col">
          <a href="#main" className="sr-only focus:not-sr-only">
            {t.nav.skip}
          </a>
          <SiteHeader lang={lang} nav={getNav(lang)} t={{ nav: t.nav, search: t.search }} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter lang={lang} />
        </div>
      </body>
    </html>
  );
}
