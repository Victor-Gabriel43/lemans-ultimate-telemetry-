import { Suspense } from "react";
import type { Metadata } from "next";
import { CIRCUITS, REGIONS } from "@/lib/f1/circuits";
import { CircuitBrowser } from "@/components/site/CircuitBrowser";
import { PageIntro, Stat } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Circuits",
  description: "The circuits of the Formula One World Championship: history, character and defining moments.",
};

export default function CircuitsPage() {
  const byType = (t: string) => CIRCUITS.filter((c) => c.type === t).length;
  return (
    <>
      <PageIntro
        crumbs={[{ label: "Circuits" }]}
        eyebrow="Circuits"
        title="Every lap tells a story."
        lede="Airfields and royal parks, mountain roads and city streets. Explore the circuits that have shaped Formula One — their history, their character and the moments that made them famous."
      >
        <div className="stat-row">
          <Stat value={CIRCUITS.length} label="Circuit profiles in the archive" />
          <Stat value={byType("Permanent")} label="Permanent racetracks" />
          <Stat value={byType("Street")} label="Street circuits" />
          <Stat value={byType("Hybrid")} label="Semi-permanent circuits" />
        </div>
      </PageIntro>
      <section className="section-tight tone-off" style={{ paddingTop: 40 }}>
        <div className="wrap-wide">
          <Suspense fallback={<p className="muted">Loading circuits…</p>}>
            <CircuitBrowser circuits={CIRCUITS} regions={REGIONS} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
