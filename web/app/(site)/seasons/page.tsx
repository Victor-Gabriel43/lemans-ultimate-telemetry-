import { Suspense } from "react";
import type { Metadata } from "next";
import { SEASONS, FIRST_YEAR, LAST_YEAR } from "@/lib/f1/seasons";
import { SeasonBrowser } from "@/components/site/SeasonBrowser";
import { DataNotice, PageIntro } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Seasons",
  description: `Every Formula One World Championship season from ${FIRST_YEAR} to ${LAST_YEAR}.`,
};

export default function SeasonsPage() {
  return (
    <>
      <PageIntro
        crumbs={[{ label: "Seasons" }]}
        eyebrow="Seasons"
        title={`${FIRST_YEAR} to ${LAST_YEAR}.`}
        lede="Every World Championship season has its own page: an introduction, the championship structure, the champions and the historical context. Filter by decade, search by champion, or jump straight to a year."
      />
      <section className="section-tight tone-off" style={{ paddingTop: 40 }}>
        <div className="wrap-wide">
          <Suspense fallback={<p className="muted">Loading seasons…</p>}>
            <SeasonBrowser seasons={SEASONS} />
          </Suspense>
          <div className="mt-l">
            <DataNotice title="Data status">
              Champions are shown as an editorial reference from long-established public record and will be cross-checked
              against official results in Phase 2, when full calendars, entry lists and race results are added to each season.
            </DataNotice>
          </div>
        </div>
      </section>
    </>
  );
}
