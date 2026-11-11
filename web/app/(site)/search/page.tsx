import { Suspense } from "react";
import type { Metadata } from "next";
import { buildSearchIndex } from "@/lib/f1/search";
import { SearchPage } from "@/components/site/SearchPage";
import { Breadcrumbs } from "@/components/site/ui";

export const metadata: Metadata = { title: "Search" };

export default function Search() {
  const index = buildSearchIndex();
  return (
    <section className="tone-paper" style={{ paddingTop: 28, paddingBottom: 96 }}>
      <div className="wrap-text">
        <Breadcrumbs items={[{ label: "Search" }]} />
        <h1 className="title-1" style={{ margin: "48px 0 24px" }}>
          Search
        </h1>
        <Suspense fallback={<p className="muted">Loading…</p>}>
          <SearchPage index={index} />
        </Suspense>
      </div>
    </section>
  );
}
