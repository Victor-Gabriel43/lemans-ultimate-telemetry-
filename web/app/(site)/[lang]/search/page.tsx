import { Suspense } from "react";
import type { Metadata } from "next";
import type { Lang } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dict";
import { SearchPage } from "@/components/site/SearchPage";
import { Breadcrumbs } from "@/components/site/ui";

export async function generateMetadata({ params }: PageProps<"/[lang]/search">): Promise<Metadata> {
  return { title: getDict((await params).lang as Lang).search.title };
}

export default async function Search({ params }: PageProps<"/[lang]/search">) {
  const lang = (await params).lang as Lang;
  const t = getDict(lang);
  return (
    <section className="tone-paper" style={{ paddingTop: 28, paddingBottom: 96 }}>
      <div className="wrap-text">
        <Breadcrumbs lang={lang} items={[{ label: t.search.title }]} />
        <h1 className="title-1" style={{ margin: "48px 0 24px" }}>
          {t.search.title}
        </h1>
        <Suspense fallback={<p className="muted">…</p>}>
          <SearchPage lang={lang} t={t} />
        </Suspense>
      </div>
    </section>
  );
}
