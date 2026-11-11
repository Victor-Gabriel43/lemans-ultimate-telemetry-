import "./site.css";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { buildSearchIndex } from "@/lib/f1/search";

/**
 * Paddock — the Formula 1 encyclopedia. Light, editorial shell with the
 * global navigation, search and footer. Everything inside is scoped by `.site`.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const index = buildSearchIndex();
  return (
    <div className="site flex min-h-svh flex-1 flex-col">
      <a href="#main" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <SiteHeader index={index} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
