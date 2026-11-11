import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCircuit, getCircuitWinners, getSchedule, getSeasonResults, fullName, raceStart, SEASON } from "@/lib/f1/api";
import { getCircuitMeta, getCircuitSetting } from "@/lib/f1/circuits";
import { getWikiSummary } from "@/lib/f1/wiki";
import { fmtDate } from "@/lib/f1/format";
import { SectionTitle, SourceNote, Stat, WikiFigure } from "@/components/f1/ui";
import { Line, Reveal } from "@/components/mi/motion";
import { CircuitExperienceLoader } from "@/components/circuit3d/Loader";

export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps<"/circuits/[id]">): Promise<Metadata> {
  const c = await getCircuit((await params).id);
  return { title: c ? `${c.circuitName} — Circuit Explorer` : "Circuit — Motorsport Intelligence" };
}

const KIND = { street: "Street circuit", temporary: "Temporary circuit", permanent: "Permanent circuit" } as const;

export default async function CircuitPage({ params }: PageProps<"/circuits/[id]">) {
  const { id } = await params;
  const [circuit, schedule] = await Promise.all([getCircuit(id), getSchedule()]);
  if (!circuit) notFound();
  const meta = getCircuitMeta(id);
  const setting = getCircuitSetting(id);
  const [wiki, history, results] = await Promise.all([getWikiSummary(circuit.url), getCircuitWinners(id, 100), getSeasonResults()]);

  const idx = schedule.findIndex((r) => r.Circuit.circuitId === id);
  const race = idx >= 0 ? schedule[idx] : null;
  const prev = idx > 0 ? schedule[idx - 1] : null;
  const next = idx >= 0 && idx < schedule.length - 1 ? schedule[idx + 1] : null;
  const seasonResult = race ? results.find((r) => r.round === race.round) : null;
  const winner = seasonResult?.Results.find((x) => x.position === "1");

  // Most successful drivers at this venue, across every World Championship race held here.
  const tally = new Map<string, { name: string; n: number; id: string }>();
  for (const r of history.races) {
    const w = r.Results[0];
    if (!w) continue;
    const e = tally.get(w.Driver.driverId) ?? { name: fullName(w.Driver), n: 0, id: w.Driver.driverId };
    e.n++;
    tally.set(w.Driver.driverId, e);
  }
  const top = [...tally.values()].sort((a, b) => b.n - a.n).slice(0, 3);

  return (
    <>
      <header className="mx-auto max-w-[1400px] px-4 pb-10 pt-32 sm:px-8 sm:pt-36">
        <Reveal className="mb-6 flex flex-wrap items-center gap-3">
          <Link href="/circuits" className="mi-label text-text-muted hover:text-text">← Circuits</Link>
          {race && <span className="mi-label text-text-dim">/ Round {race.round} · {fmtDate(raceStart(race), { day: "numeric", month: "long", year: "numeric" })}</span>}
        </Reveal>
        <Reveal fade={false} as="h1">
          <Line className="mi-display text-[clamp(2.4rem,7vw,6.5rem)]">{circuit.Location.locality}</Line>
          <Line delay={0.1} className="mi-serif text-[clamp(2rem,5vw,4.5rem)] leading-[1] text-text-muted">{circuit.circuitName}</Line>
        </Reveal>
      </header>

      {meta ? (
        <section className="px-2 sm:px-4">
          <CircuitExperienceLoader id={id} name={circuit.circuitName} setting={setting} lengthM={meta.lengthM} />
        </section>
      ) : (
        <p className="mx-auto max-w-[1400px] px-4 text-text-muted sm:px-8">3D geometry for this venue is not available yet.</p>
      )}

      <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-8">
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Lap length" value={meta?.lengthM ? (meta.lengthM / 1000).toFixed(3) : null} sub="kilometres" accent />
          <Stat label="First Grand Prix" value={meta?.firstGp} sub={meta?.opened ? `Circuit opened ${meta.opened}` : undefined} />
          <Stat label="World Championship races" value={history.total || null} sub="held at this venue" />
          <Stat label="Setting" value={setting.night ? "Night" : "Day"} sub={`${KIND[setting.kind]}${meta?.altitudeM != null ? ` · ${meta.altitudeM} m altitude` : ""}`} />
        </div>
      </section>

      <section className="bg-paper text-ink">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-4 py-24 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionTitle label="Profile" title={<>The <span className="mi-serif font-normal">place</span></>} />
            {wiki?.extract ? (
              <>
                <p className="text-[1.1rem] leading-relaxed">{wiki.extract}</p>
                <a href={wiki.url} target="_blank" rel="noreferrer" className="mi-link mt-4 inline-block text-xs text-ink-muted">Text: Wikipedia (CC BY-SA)</a>
              </>
            ) : (
              <p className="text-ink-muted">{circuit.circuitName}, {circuit.Location.locality}, {circuit.Location.country}.</p>
            )}
            {top.length > 0 && (
              <div className="mt-12">
                <span className="mi-label text-ink-muted">Most wins here</span>
                <ol className="mt-4">
                  {top.map((t, i) => (
                    <li key={t.id} className="flex items-baseline justify-between border-t border-paper-line py-3">
                      <Link href={`/drivers/${t.id}`} className="hover:underline">{i + 1}. {t.name}</Link>
                      <span className="tabular font-semibold">{t.n}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-10 lg:col-span-6">
            <WikiFigure wiki={wiki} className="aspect-[16/10] w-full rounded-[24px]" />
            {race && (
              <div>
                <span className="mi-label text-ink-muted">{SEASON} · {race.raceName}</span>
                <p className="mt-3 text-2xl font-semibold tracking-[-0.02em]">
                  {winner ? <>Won by <Link className="underline decoration-1 underline-offset-4" href={`/drivers/${winner.Driver.driverId}`}>{fullName(winner.Driver)}</Link> ({winner.Constructor.name})</> : <>Race on {fmtDate(raceStart(race), { weekday: "long", day: "numeric", month: "long" })}</>}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-24 sm:px-8">
        <SectionTitle label="Roll of honour" title={<>Recent <span className="mi-serif font-normal">winners</span></>} />
        <ul className="grid gap-x-10 sm:grid-cols-2">
          {history.races.slice(0, 12).map((r) => {
            const w = r.Results[0];
            return (
              <li key={`${r.season}-${r.round}`} className="grid grid-cols-[4rem_1fr_auto] items-baseline gap-4 border-t border-border py-3.5">
                <span className="tabular font-mono text-sm text-text-muted">{r.season}</span>
                <Link href={`/drivers/${w.Driver.driverId}`} className="truncate font-medium hover:text-brand">{fullName(w.Driver)}</Link>
                <span className="truncate text-sm text-text-muted">{w.Constructor.name}</span>
              </li>
            );
          })}
        </ul>
        <nav className="mt-16 flex justify-between gap-4 border-t border-border pt-6">
          {prev ? <Link href={`/circuits/${prev.Circuit.circuitId}`} className="group flex flex-col"><span className="mi-label text-text-dim">← Round {prev.round}</span><span className="mt-1 group-hover:text-brand">{prev.raceName}</span></Link> : <span />}
          {next ? <Link href={`/circuits/${next.Circuit.circuitId}`} className="group flex flex-col text-right"><span className="mi-label text-text-dim">Round {next.round} →</span><span className="mt-1 group-hover:text-brand">{next.raceName}</span></Link> : <span />}
        </nav>
        <SourceNote>
          Track geometry: bacinger/f1-circuits (MIT). Results: Jolpica F1 API. Lap length, first GP and opening year: bacinger/f1-circuits. Text & photo: Wikipedia.
        </SourceNote>
      </section>
    </>
  );
}
