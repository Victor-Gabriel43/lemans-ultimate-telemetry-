import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getSeasonResults, fullName, raceStart, SEASON } from "@/lib/f1/api";
import { getWikiSummary } from "@/lib/f1/wiki";
import { fmtDate } from "@/lib/f1/format";
import { PageHeader, SectionTitle, SourceNote, Unavailable } from "@/components/f1/ui";
import { Line, Reveal } from "@/components/mi/motion";

export const metadata: Metadata = { title: "Cinematic Editorial — Motorsport Intelligence" };
export const revalidate = 3600;

/** Landmark races — editorial selection; all text comes from the linked Wikipedia articles. */
const MOMENTS = [
  "1950 British Grand Prix",
  "1976 Japanese Grand Prix",
  "1984 Monaco Grand Prix",
  "1989 Japanese Grand Prix",
  "2008 Brazilian Grand Prix",
  "2011 Canadian Grand Prix",
  "2021 Abu Dhabi Grand Prix",
];

export default async function EditorialPage() {
  const results = await getSeasonResults();
  const recent = [...results].reverse();
  const [stories, moments] = await Promise.all([
    Promise.all(recent.map((r) => getWikiSummary(r.url))),
    Promise.all(MOMENTS.map((t) => getWikiSummary(t))),
  ]);
  const lead = recent[0];
  const leadStory = stories[0];

  return (
    <>
      <PageHeader
        n="03"
        kicker="Cinematic Editorial"
        title="Stories"
        serif="from the paddock."
        intro={`Every ${SEASON} Grand Prix so far, told through race reports and the numbers behind them — plus the races that shaped the sport.`}
      />

      {!lead && <div className="mx-auto max-w-[1400px] px-4 sm:px-8"><Unavailable what="This season's stories" /></div>}

      {lead && (
        <section className="px-2 sm:px-4">
          <article className="relative isolate overflow-hidden rounded-[28px] bg-surface text-white">
            <div className="absolute inset-0 -z-10">
              {leadStory?.image && <Image unoptimized src={leadStory.image.src} alt="" fill priority sizes="100vw" className="object-cover opacity-70" />}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
            </div>
            <div className="flex min-h-[78svh] flex-col justify-end gap-6 p-6 sm:p-12">
              <span className="mi-label flex items-center gap-2 text-white/70"><span className="mi-dot" /> Latest · Round {lead.round} · {fmtDate(raceStart(lead), { day: "numeric", month: "long" })}</span>
              <Reveal fade={false} as="h2">
                <Line className="mi-display text-[clamp(2.4rem,7vw,6.5rem)]">{lead.raceName.replace(" Grand Prix", "")}</Line>
                <Line delay={0.1} className="mi-serif text-[clamp(2rem,5vw,4.5rem)] leading-[1]">Grand Prix</Line>
              </Reveal>
              {leadStory && <p className="max-w-2xl text-[1.05rem] leading-relaxed text-white/80">{leadStory.extract}</p>}
              <Podium race={lead} light />
              {leadStory && <a href={leadStory.url} target="_blank" rel="noreferrer" className="mi-link w-fit text-xs text-white/60">Report & photo: Wikipedia (CC BY-SA)</a>}
            </div>
          </article>
        </section>
      )}

      {recent.length > 1 && (
        <section className="mx-auto max-w-[1400px] px-4 py-24 sm:px-8">
          <SectionTitle label={`Season ${SEASON}`} title={<>Race <span className="mi-serif font-normal">reports</span></>} />
          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {recent.slice(1).map((r, i) => {
              const s = stories[i + 1];
              return (
                <Reveal as="article" key={r.round} delay={(i % 3) * 0.06} className="group flex flex-col gap-4">
                  <Link href={`/circuits/${r.Circuit.circuitId}`} className="relative block aspect-[4/3] overflow-hidden rounded-[20px] bg-surface">
                    {s?.image ? (
                      <Image unoptimized src={s.image.src} alt={s.title} fill sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out)] group-hover:scale-105" />
                    ) : (
                      <span className="mi-display absolute inset-0 flex items-center justify-center text-6xl text-surface-raised">R{r.round}</span>
                    )}
                  </Link>
                  <span className="mi-label text-text-dim">Round {r.round} · {fmtDate(raceStart(r), { day: "numeric", month: "short" })}</span>
                  <h3 className="text-2xl font-semibold tracking-[-0.02em]">{r.raceName}</h3>
                  {s?.extract && <p className="line-clamp-4 text-sm leading-relaxed text-text-muted">{s.extract}</p>}
                  <Podium race={r} />
                  {s && <a href={s.url} target="_blank" rel="noreferrer" className="mi-link w-fit text-xs text-text-dim">Read the full report ↗</a>}
                </Reveal>
              );
            })}
          </div>
        </section>
      )}

      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-[1400px] px-4 py-24 sm:px-8">
          <SectionTitle label="Archive" title={<>Moments that <span className="mi-serif font-normal">shaped the sport</span></>} />
          <div className="flex snap-x gap-6 overflow-x-auto pb-6">
            {moments.map((m, i) =>
              m ? (
                <article key={i} className="flex w-[min(80vw,360px)] shrink-0 snap-start flex-col gap-4">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[20px] bg-paper-2">
                    {m.image && <Image unoptimized src={m.image.src} alt={m.title} fill sizes="360px" className="object-cover grayscale transition duration-700 hover:grayscale-0" />}
                  </div>
                  <h3 className="mi-serif text-3xl">{m.title}</h3>
                  <p className="line-clamp-5 text-sm leading-relaxed text-ink-muted">{m.extract}</p>
                  <a href={m.url} target="_blank" rel="noreferrer" className="mi-link w-fit text-xs text-ink-muted">Wikipedia ↗</a>
                </article>
              ) : null
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-4 pb-24 sm:px-8">
        <SourceNote>Race reports, archive texts and photography: Wikipedia contributors (CC BY-SA). Results: Jolpica F1 API.</SourceNote>
      </div>
    </>
  );
}

function Podium({ race, light = false }: { race: Awaited<ReturnType<typeof getSeasonResults>>[number]; light?: boolean }) {
  const top = race.Results.filter((x) => ["1", "2", "3"].includes(x.position)).sort((a, b) => Number(a.position) - Number(b.position));
  const fl = race.Results.find((x) => x.FastestLap?.rank === "1");
  return (
    <ol className={`flex flex-wrap gap-x-6 gap-y-2 text-sm ${light ? "text-white/85" : "text-text-muted"}`}>
      {top.map((x) => (
        <li key={x.position}>
          <span className={x.position === "1" ? "text-brand" : ""}>P{x.position}</span>{" "}
          <Link href={`/drivers/${x.Driver.driverId}`} className="hover:underline">{fullName(x.Driver)}</Link>
        </li>
      ))}
      {fl && <li>Fastest lap {fl.Driver.code ?? fl.Driver.familyName} · {fl.FastestLap?.Time.time}</li>}
    </ol>
  );
}
