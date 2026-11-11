import type { Metadata } from "next";
import Link from "next/link";
import {
  getConstructorStandings,
  getDriverStandings,
  getPitStops,
  getSchedule,
  getSeasonResults,
  fullName,
  nextRace,
  raceStart,
  SEASON,
} from "@/lib/f1/api";
import { getCircuitMeta } from "@/lib/f1/circuits";
import { fmtDate } from "@/lib/f1/format";
import { CircuitOutline, PageHeader, SectionTitle, SourceNote, Stat, Unavailable } from "@/components/f1/ui";
import { Reveal } from "@/components/mi/motion";

export const metadata: Metadata = { title: `Racing Intelligence ${SEASON} — Motorsport Intelligence` };
export const revalidate = 3600;

export default async function RacingPage() {
  const [ds, cs, results, schedule] = await Promise.all([
    getDriverStandings(),
    getConstructorStandings(),
    getSeasonResults(),
    getSchedule(),
  ]);
  const last = results.at(-1);
  const pit = last ? await getPitStops(SEASON, last.round) : [];
  const next = nextRace(schedule);

  // Season statistics — all derived from official results.
  const winCount = new Map<string, { name: string; team: string; n: number; id: string }>();
  let dnf = 0;
  let poleToWin = 0;
  for (const r of results) {
    const w = r.Results.find((x) => x.position === "1");
    if (w) {
      const k = w.Driver.driverId;
      const e = winCount.get(k) ?? { name: fullName(w.Driver), team: w.Constructor.name, n: 0, id: k };
      e.n++;
      winCount.set(k, e);
      if (w.grid === "1") poleToWin++;
    }
    dnf += r.Results.filter((x) => !/^(Finished|\+\d+ Laps?|Lapped)$/.test(x.status) && !x.Time).length;
  }
  const winners = [...winCount.values()].sort((a, b) => b.n - a.n);
  const leader = ds.standings[0];
  const second = ds.standings[1];

  // Strategy summary of the latest race: stops per driver.
  const stops = new Map<string, number>();
  for (const p of pit) stops.set(p.driverId, Math.max(stops.get(p.driverId) ?? 0, Number(p.stop)));
  const stopBuckets = [...stops.values()].reduce<Record<number, number>>((m, n) => ((m[n] = (m[n] ?? 0) + 1), m), {});
  const fastestStop = pit.reduce<null | (typeof pit)[number]>(
    (b, p) => (Number(p.duration) && (!b || Number(p.duration) < Number(b.duration)) ? p : b),
    null
  );

  return (
    <>
      <PageHeader
        n="01"
        kicker="Racing Intelligence"
        title="Racing"
        serif="intelligence."
        intro={`Standings, results and strategy from the ${SEASON} championship${ds.round ? ` — updated after round ${ds.round}` : ""}.`}
      />

      {/* Key numbers */}
      <section className="mx-auto grid max-w-[1400px] gap-x-8 gap-y-10 px-4 pb-24 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        <Stat label="Championship leader" value={leader ? leader.Driver.code ?? leader.Driver.familyName : null} sub={leader && `${fullName(leader.Driver)} · ${leader.points} pts`} accent />
        <Stat
          label="Lead"
          value={leader && second ? `+${Number(leader.points) - Number(second.points)}` : null}
          sub={second && `over ${fullName(second.Driver)}`}
        />
        <Stat label="Races completed" value={`${results.length}/${schedule.length || "—"}`} sub={`${winners.length} different winners`} />
        <Stat label="Won from pole" value={results.length ? `${poleToWin}` : null} sub={`of ${results.length} races · ${dnf} non-classified finishes`} />
      </section>

      {/* Standings */}
      <section className="bg-paper text-ink">
        <div className="mx-auto grid max-w-[1400px] gap-16 px-4 py-24 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionTitle label="Drivers' Championship" title={<>Driver <span className="mi-serif font-normal">standings</span></>} />
            {!ds.standings.length && <Unavailable what="Driver standings" />}
            <ol>
              {ds.standings.map((s) => (
                <li key={s.Driver.driverId}>
                  <Link
                    href={`/drivers/${s.Driver.driverId}`}
                    className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-t border-paper-line py-3.5 transition-colors hover:bg-paper-2 sm:grid-cols-[2.5rem_1fr_10rem_4rem_4.5rem]"
                  >
                    <span className="tabular font-mono text-sm text-ink-muted">{s.positionText.padStart(2, "0")}</span>
                    <span className="truncate font-medium transition-transform group-hover:translate-x-1">
                      {s.Driver.givenName} <span className="font-semibold uppercase">{s.Driver.familyName}</span>
                    </span>
                    <span className="hidden truncate text-sm text-ink-muted sm:block">{s.Constructors.at(-1)?.name}</span>
                    <span className="tabular hidden text-right text-sm text-ink-muted sm:block">{s.wins} W</span>
                    <span className="tabular text-right font-semibold">{s.points}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-5">
            <SectionTitle label="Constructors' Championship" title={<>Team <span className="mi-serif font-normal">standings</span></>} />
            {!cs.standings.length && <Unavailable what="Constructor standings" />}
            <ol>
              {cs.standings.map((s, i) => {
                const max = Number(cs.standings[0]?.points) || 1;
                return (
                  <li key={s.Constructor.constructorId} className="border-t border-paper-line py-3.5">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="flex items-baseline gap-4">
                        <span className="tabular font-mono text-sm text-ink-muted">{s.positionText.padStart(2, "0")}</span>
                        <span className="font-medium">{s.Constructor.name}</span>
                      </span>
                      <span className="tabular font-semibold">{s.points}</span>
                    </div>
                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-paper-line">
                      <div className={`h-full rounded-full ${i === 0 ? "bg-ink" : "bg-ink/35"}`} style={{ width: `${(Number(s.points) / max) * 100}%` }} />
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* Latest race + strategy */}
      {last && (
        <section className="mx-auto grid max-w-[1400px] gap-16 px-4 py-24 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionTitle
              label={`Round ${last.round} · ${fmtDate(raceStart(last), { day: "numeric", month: "long" })}`}
              title={<>{last.raceName.replace(" Grand Prix", "")} <span className="mi-serif font-normal">Grand Prix</span></>}
              aside={<Link href={`/circuits/${last.Circuit.circuitId}`} className="mi-link text-sm text-text-muted hover:text-text">Circuit →</Link>}
            />
            <table className="w-full text-left text-sm">
              <thead className="mi-label text-text-dim">
                <tr>
                  <th className="pb-3 font-normal">Pos</th>
                  <th className="pb-3 font-normal">Driver</th>
                  <th className="hidden pb-3 font-normal sm:table-cell">Team</th>
                  <th className="pb-3 font-normal">Grid</th>
                  <th className="pb-3 text-right font-normal">Time / Status</th>
                  <th className="pb-3 text-right font-normal">Pts</th>
                </tr>
              </thead>
              <tbody>
                {last.Results.slice(0, 10).map((x) => (
                  <tr key={x.Driver.driverId} className="border-t border-border">
                    <td className={`tabular py-3 font-mono ${x.position === "1" ? "text-brand" : "text-text-muted"}`}>{x.positionText}</td>
                    <td className="py-3 font-medium">
                      <Link href={`/drivers/${x.Driver.driverId}`} className="hover:text-brand">{fullName(x.Driver)}</Link>
                      {x.FastestLap?.rank === "1" && <span className="mi-label ml-2 rounded-full bg-brand px-1.5 py-0.5 text-brand-fg">FL</span>}
                    </td>
                    <td className="hidden py-3 text-text-muted sm:table-cell">{x.Constructor.name}</td>
                    <td className="tabular py-3 text-text-muted">{x.grid === "0" ? "PL" : x.grid}</td>
                    <td className="tabular py-3 text-right text-text-muted">{x.Time?.time ?? x.status}</td>
                    <td className="tabular py-3 text-right">{x.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-12 lg:col-span-5">
            <div>
              <SectionTitle label="Strategy" title={<>Pit <span className="mi-serif font-normal">strategy</span></>} />
              {pit.length ? (
                <div className="flex flex-col gap-4">
                  {Object.entries(stopBuckets)
                    .sort((a, b) => Number(a[0]) - Number(b[0]))
                    .map(([n, count]) => (
                      <div key={n} className="flex items-center gap-4">
                        <span className="w-20 text-sm text-text-muted">{n}-stop</span>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-raised">
                          <div className="h-full rounded-full bg-brand" style={{ width: `${(count / stops.size) * 100}%` }} />
                        </div>
                        <span className="tabular w-16 text-right text-sm">{count} cars</span>
                      </div>
                    ))}
                  {fastestStop && (
                    <p className="mt-2 text-sm text-text-muted">
                      Quickest pit-lane time: <span className="tabular text-text">{fastestStop.duration}s</span> on lap {fastestStop.lap}.
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-text-muted">Pit-stop data has not been published for this race yet.</p>
              )}
            </div>

            <div>
              <SectionTitle label="Season" title={<>Race <span className="mi-serif font-normal">winners</span></>} />
              <ul className="flex flex-col gap-3">
                {winners.map((w) => (
                  <li key={w.id} className="flex items-center gap-4">
                    <Link href={`/drivers/${w.id}`} className="w-40 truncate text-sm hover:text-brand">{w.name}</Link>
                    <div className="flex flex-1 gap-1">
                      {Array.from({ length: w.n }, (_, i) => (
                        <span key={i} className="h-3 flex-1 max-w-4 rounded-sm bg-text" />
                      ))}
                    </div>
                    <span className="tabular text-sm">{w.n}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {next && (
        <section className="border-t border-border">
          <Reveal className="mx-auto flex max-w-[1400px] flex-col justify-between gap-8 px-4 py-20 sm:px-8 md:flex-row md:items-center">
            <div className="flex flex-col gap-3">
              <span className="mi-label flex items-center gap-2 text-text-muted"><span className="mi-dot" /> Next race · Round {next.round}</span>
              <span className="mi-display text-[clamp(2.4rem,6vw,5rem)]">{next.raceName.replace(" Grand Prix", "")}</span>
              <span className="text-text-muted">
                {fmtDate(raceStart(next), { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })} UTC · {next.Circuit.circuitName}
              </span>
            </div>
            <Link href={`/circuits/${next.Circuit.circuitId}`} className="group flex items-center gap-6">
              <span className="h-28 w-44 text-text-muted transition-colors group-hover:text-brand">
                {getCircuitMeta(next.Circuit.circuitId) && <CircuitOutline outline={getCircuitMeta(next.Circuit.circuitId)!.outline} className="h-full w-full" />}
              </span>
              <span className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-brand-fg">Explore in 3D →</span>
            </Link>
          </Reveal>
        </section>
      )}

      <div className="mx-auto max-w-[1400px] px-4 pb-24 sm:px-8">
        <SourceNote>Source: Jolpica F1 API (standings, results, pit stops). Refreshed hourly.</SourceNote>
      </div>
    </>
  );
}
