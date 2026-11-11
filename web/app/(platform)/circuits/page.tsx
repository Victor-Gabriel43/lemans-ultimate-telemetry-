import type { Metadata } from "next";
import Link from "next/link";
import { getSchedule, raceStart, nextRace, SEASON } from "@/lib/f1/api";
import { getCircuitMeta, getCircuitSetting } from "@/lib/f1/circuits";
import { fmtDate, fmtKm } from "@/lib/f1/format";
import { CircuitOutline, PageHeader, SourceNote, Unavailable } from "@/components/f1/ui";
import { Reveal } from "@/components/mi/motion";

export const metadata: Metadata = { title: "Circuit Explorer — Motorsport Intelligence" };
export const revalidate = 3600;

const KIND = { street: "Street circuit", temporary: "Temporary circuit", permanent: "Permanent circuit" } as const;

export default async function CircuitsPage() {
  const schedule = await getSchedule();
  const next = nextRace(schedule);
  return (
    <>
      <PageHeader
        n="02"
        kicker="Circuit Explorer"
        title="Every corner,"
        serif="mapped in 3D."
        intro={`The ${schedule.length || ""} venues of the ${SEASON} season, drawn from real track geometry. Open any circuit to fly the lap, study sectors and corners, and watch a 2026-generation field race.`}
      />
      <section className="mx-auto max-w-[1400px] px-4 pb-32 sm:px-8">
        {!schedule.length && <Unavailable what="The circuit list" />}
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {schedule.map((r, i) => {
            const meta = getCircuitMeta(r.Circuit.circuitId);
            const set = getCircuitSetting(r.Circuit.circuitId);
            const isNext = next?.round === r.round;
            return (
              <Reveal as="li" key={r.round} delay={(i % 3) * 0.06}>
                <Link
                  href={`/circuits/${r.Circuit.circuitId}`}
                  className={`group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[24px] border p-6 transition-colors ${
                    isNext ? "border-brand bg-surface" : "border-border bg-surface/60 hover:bg-surface"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="mi-label text-text-dim">R{r.round.padStart(2, "0")} · {fmtDate(raceStart(r))}</span>
                    {set.night && <span className="mi-label rounded-full border border-border-strong px-2 py-1 text-text-muted">Night</span>}
                  </div>
                  <div className="absolute inset-x-10 top-16 bottom-36 text-text-muted transition-all duration-700 group-hover:scale-[1.04] group-hover:text-text">
                    {meta && <CircuitOutline outline={meta.outline} className="h-full w-full" width={1.6} />}
                  </div>
                  <div className="relative flex flex-col gap-1">
                    <span className="mi-label text-text-dim">{r.Circuit.Location.locality}, {r.Circuit.Location.country}</span>
                    <span className="text-xl font-semibold tracking-[-0.02em] group-hover:text-brand">{r.Circuit.circuitName}</span>
                    <span className="text-sm text-text-muted">
                      {KIND[set.kind]} · {fmtKm(meta?.lengthM)}
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ul>
        <SourceNote>Geometry: bacinger/f1-circuits (MIT) · Venue data: Jolpica F1 API.</SourceNote>
      </section>
    </>
  );
}
