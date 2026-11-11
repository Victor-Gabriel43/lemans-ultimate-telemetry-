import type { Metadata } from "next";
import Link from "next/link";
import { getSchedule, getSeasonResults, raceStart, nextRace, fullName, SEASON } from "@/lib/f1/api";
import { getCircuitMeta } from "@/lib/f1/circuits";
import { fmtDate, fmtKm } from "@/lib/f1/format";
import { CircuitOutline, PageHeader, SourceNote, Unavailable } from "@/components/f1/ui";
import { Reveal } from "@/components/mi/motion";

export const metadata: Metadata = { title: `World Calendar ${SEASON} — Motorsport Intelligence` };
export const revalidate = 3600;

export default async function CalendarPage() {
  const [schedule, results] = await Promise.all([getSchedule(), getSeasonResults()]);
  const winners = new Map(results.map((r) => [r.round, r.Results.find((x) => x.position === "1")]));
  const next = nextRace(schedule);
  const done = results.length;

  return (
    <>
      <PageHeader
        n="05"
        kicker="World Calendar"
        title={`Season ${SEASON}`}
        serif="around the world."
        intro={
          schedule.length ? (
            <>
              {schedule.length} rounds across {new Set(schedule.map((r) => r.Circuit.Location.country)).size} countries.{" "}
              <span className="text-text">{done} completed</span>
              {next ? <>, next up: {next.raceName}.</> : "."}
            </>
          ) : undefined
        }
      />

      <section className="mx-auto max-w-[1400px] px-4 pb-32 sm:px-8">
        {!schedule.length && <Unavailable what="The season calendar" />}
        <ol className="flex flex-col">
          {schedule.map((r, i) => {
            const meta = getCircuitMeta(r.Circuit.circuitId);
            const start = raceStart(r);
            const first = r.FirstPractice ? new Date(`${r.FirstPractice.date}T00:00:00Z`) : start;
            const win = winners.get(r.round);
            const isNext = next?.round === r.round;
            return (
              <Reveal as="li" key={r.round} delay={Math.min(i, 6) * 0.04}>
                <Link
                  href={`/circuits/${r.Circuit.circuitId}`}
                  className={`group grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-t py-6 transition-colors sm:grid-cols-[4rem_9rem_1fr_7rem_14rem] sm:gap-6 ${
                    isNext ? "border-brand" : "border-border hover:border-text-muted"
                  }`}
                >
                  <span className={`font-mono text-sm ${isNext ? "text-brand" : "text-text-dim"}`}>R{r.round.padStart(2, "0")}</span>
                  <span className="mi-label hidden text-text-muted sm:block">
                    {fmtDate(first)} — {fmtDate(start)}
                  </span>
                  <span className="flex min-w-0 flex-col gap-1">
                    <span className="truncate text-[clamp(1.2rem,2.4vw,1.9rem)] font-semibold tracking-[-0.025em] transition-transform duration-500 group-hover:translate-x-2">
                      {r.raceName.replace(" Grand Prix", "")} <span className="mi-serif font-normal text-text-muted">Grand Prix</span>
                    </span>
                    <span className="text-sm text-text-muted">
                      {r.Circuit.circuitName} · {r.Circuit.Location.locality}, {r.Circuit.Location.country}
                      <span className="sm:hidden"> · {fmtDate(start)}</span>
                    </span>
                    <span className="mt-1 flex flex-wrap gap-2">
                      {r.Sprint && <span className="mi-label rounded-full border border-border-strong px-2 py-1 text-text-muted">Sprint</span>}
                      {isNext && <span className="mi-label rounded-full bg-brand px-2 py-1 text-brand-fg">Next race</span>}
                    </span>
                  </span>
                  <span className="hidden h-16 w-28 text-text-muted transition-colors group-hover:text-text sm:block">
                    {meta && <CircuitOutline outline={meta.outline} className="h-full w-full" width={2.4} />}
                  </span>
                  <span className="hidden flex-col items-end gap-1 text-right sm:flex">
                    {win ? (
                      <>
                        <span className="mi-label text-text-dim">Winner</span>
                        <span className="font-medium">{fullName(win.Driver)}</span>
                        <span className="text-xs text-text-muted">{win.Constructor.name}</span>
                      </>
                    ) : (
                      <>
                        <span className="mi-label text-text-dim">Lap</span>
                        <span className="tabular font-medium">{fmtKm(meta?.lengthM)}</span>
                      </>
                    )}
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ol>
        <SourceNote>
          Schedule and results: Jolpica F1 API. Dates shown in UTC. Circuit outlines: bacinger/f1-circuits (MIT).
        </SourceNote>
      </section>
    </>
  );
}
