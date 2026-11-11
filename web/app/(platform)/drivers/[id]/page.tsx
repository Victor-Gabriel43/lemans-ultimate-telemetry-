import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDriver, getDriverCareer, getDriverSeasonResults, getDriverStandings, fullName, SEASON, type Driver } from "@/lib/f1/api";
import { getWikiSummary } from "@/lib/f1/wiki";
import { age, fmtDate } from "@/lib/f1/format";
import { SectionTitle, SourceNote, Stat, WikiFigure } from "@/components/f1/ui";
import { Line, Reveal } from "@/components/mi/motion";

export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps<"/drivers/[id]">): Promise<Metadata> {
  const d = await getDriver((await params).id);
  return { title: d ? `${fullName(d)} — Driver Intelligence` : "Driver — Motorsport Intelligence" };
}

export default async function DriverPage({ params, searchParams }: PageProps<"/drivers/[id]">) {
  const { id } = await params;
  const vsParam = (await searchParams).vs;
  const vsId = typeof vsParam === "string" ? vsParam : undefined;

  const driver = await getDriver(id);
  if (!driver) notFound();

  const [career, season, standings, wiki, vsDriver] = await Promise.all([
    getDriverCareer(id),
    getDriverSeasonResults(id),
    getDriverStandings(),
    getWikiSummary(driver.url),
    vsId ? getDriver(vsId) : Promise.resolve(null),
  ]);
  const vsCareer = vsDriver ? await getDriverCareer(vsDriver.driverId) : null;
  const row = standings.standings.find((s) => s.Driver.driverId === id);
  const team = season.at(-1)?.Results[0]?.Constructor.name ?? row?.Constructors.at(-1)?.name;

  const finishes = season.map((r) => ({ round: r.round, name: r.raceName, res: r.Results[0] }));
  const classified = finishes.filter((f) => /^\d+$/.test(f.res.positionText)).map((f) => Number(f.res.position));
  const avg = classified.length ? classified.reduce((a, b) => a + b, 0) / classified.length : null;

  return (
    <>
      <header className="relative overflow-hidden">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-4 pb-16 pt-32 sm:px-8 sm:pt-40 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-7">
            <Reveal className="flex items-center gap-3">
              <Link href="/drivers" className="mi-label text-text-muted hover:text-text">← Drivers</Link>
              <span className="mi-label text-text-dim">/ {driver.code ?? driver.familyName}</span>
            </Reveal>
            <Reveal fade={false} as="h1">
              <Line className="mi-serif text-[clamp(2.6rem,6vw,5.5rem)] leading-[1] text-text-muted">{driver.givenName}</Line>
              <Line delay={0.1} className="mi-display text-[clamp(2.4rem,6.4vw,7rem)] [overflow-wrap:anywhere]">{driver.familyName}</Line>
            </Reveal>
            <Reveal delay={0.2} className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-text-muted">
              {driver.permanentNumber && <span>No. <span className="text-text">{driver.permanentNumber}</span></span>}
              {team && <span>{team}</span>}
              <span>{driver.nationality}</span>
              <span>Born {fmtDate(new Date(driver.dateOfBirth), { day: "numeric", month: "long", year: "numeric" })} ({age(driver.dateOfBirth)})</span>
            </Reveal>
            {wiki?.extract && (
              <Reveal delay={0.25} className="max-w-xl leading-relaxed text-text-muted">
                <p>{wiki.extract}</p>
                <a href={wiki.url} target="_blank" rel="noreferrer" className="mi-link mt-3 inline-block text-xs text-text-dim">Biography: Wikipedia (CC BY-SA)</a>
              </Reveal>
            )}
          </div>
          <Reveal delay={0.15} className="lg:col-span-5">
            <WikiFigure wiki={wiki} priority className="aspect-[4/5] w-full rounded-[28px]" sizes="(min-width: 1024px) 40vw, 100vw" />
          </Reveal>
        </div>
      </header>

      <section className="mx-auto max-w-[1400px] px-4 pb-20 sm:px-8">
        <SectionTitle label="Career · all seasons" title={<>Career <span className="mi-serif font-normal">numbers</span></>} />
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          <Stat label="Starts" value={career.starts} />
          <Stat label="Wins" value={career.wins} accent />
          <Stat label="Podiums" value={career.podiums} />
          <Stat label="Pole positions" value={career.poles} />
          <Stat label="Seasons" value={career.seasons} />
        </div>
      </section>

      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-8">
          <SectionTitle
            label={`Season ${SEASON}`}
            title={<>Race by <span className="mi-serif font-normal">race</span></>}
            aside={
              row && (
                <span className="text-sm text-ink-muted">
                  P{row.positionText} · {row.points} pts · {row.wins} wins{avg ? ` · avg. finish ${avg.toFixed(1)}` : ""}
                </span>
              )
            }
          />
          {finishes.length ? (
            <div className="flex h-56 items-end gap-1.5 sm:gap-2">
              {finishes.map((f) => {
                const pos = /^\d+$/.test(f.res.positionText) ? Number(f.res.position) : null;
                const h = pos ? ((23 - Math.min(pos, 22)) / 22) * 100 : 6;
                return (
                  <div key={f.round} className="group relative flex flex-1 flex-col items-center gap-2" title={`${f.name}: ${f.res.positionText} (${f.res.status})`}>
                    <span className="tabular text-[0.65rem] text-ink-muted">{pos ?? f.res.positionText}</span>
                    <div className={`w-full rounded-t-md transition-colors ${pos === 1 ? "bg-ink" : pos && pos <= 3 ? "bg-ink/60" : pos ? "bg-ink/25" : "bg-status-critical/50"}`} style={{ height: `${h}%` }} />
                    <span className="font-mono text-[0.55rem] text-ink-muted">{f.round}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-ink-muted">No {SEASON} race starts.</p>
          )}
        </div>
      </section>

      <Compare driver={driver} career={career} vs={vsDriver} vsCareer={vsCareer} grid={standings.standings.map((s) => s.Driver)} />

      <div className="mx-auto max-w-[1400px] px-4 pb-24 sm:px-8">
        <SourceNote>Statistics: Jolpica F1 API (World Championship races; podiums = P1+P2+P3 classified). Biography and photo: Wikipedia.</SourceNote>
      </div>
    </>
  );
}

type Career = Awaited<ReturnType<typeof getDriverCareer>>;

function Compare({ driver, career, vs, vsCareer, grid }: { driver: Driver; career: Career; vs: Driver | null; vsCareer: Career | null; grid: Driver[] }) {
  const rows: [string, keyof Career][] = [["Starts", "starts"], ["Wins", "wins"], ["Podiums", "podiums"], ["Poles", "poles"], ["Seasons", "seasons"]];
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-8">
      <SectionTitle label="Head to head" title={<>Compare <span className="mi-serif font-normal">careers</span></>} />
      <div className="mb-10 flex flex-wrap gap-2">
        {grid.filter((d) => d.driverId !== driver.driverId).map((d) => (
          <Link
            key={d.driverId}
            href={`/drivers/${driver.driverId}?vs=${d.driverId}#compare`}
            scroll={false}
            className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${vs?.driverId === d.driverId ? "border-brand bg-brand text-brand-fg" : "border-border-strong text-text-muted hover:text-text"}`}
          >
            {d.code ?? d.familyName}
          </Link>
        ))}
      </div>
      <div id="compare">
        {vs && vsCareer ? (
          <div className="flex flex-col">
            <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-4 pb-4">
              <span className="mi-display text-[clamp(1.4rem,3vw,2.4rem)]">{driver.familyName}</span>
              <span className="mi-label text-text-dim">vs</span>
              <span className="mi-display text-right text-[clamp(1.4rem,3vw,2.4rem)]">{vs.familyName}</span>
            </div>
            {rows.map(([label, k]) => {
              const a = career[k] ?? 0, b = vsCareer[k] ?? 0, t = a + b || 1;
              return (
                <div key={k} className="grid grid-cols-[3.5rem_1fr_6rem_1fr_3.5rem] items-center gap-3 border-t border-border py-4">
                  <span className={`tabular text-lg ${a > b ? "text-brand" : ""}`}>{career[k] ?? "—"}</span>
                  <div className="flex h-1.5 justify-end overflow-hidden rounded-full bg-surface-raised"><div className={`h-full ${a >= b ? "bg-brand" : "bg-text-muted"}`} style={{ width: `${(a / t) * 100}%` }} /></div>
                  <span className="mi-label text-center text-text-muted">{label}</span>
                  <div className="h-1.5 overflow-hidden rounded-full bg-surface-raised"><div className={`h-full ${b >= a ? "bg-brand" : "bg-text-muted"}`} style={{ width: `${(b / t) * 100}%` }} /></div>
                  <span className={`tabular text-right text-lg ${b > a ? "text-brand" : ""}`}>{vsCareer[k] ?? "—"}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-text-muted">Pick a driver above to compare career numbers.</p>
        )}
      </div>
    </section>
  );
}
