import type { Metadata } from "next";
import Link from "next/link";
import { getDriverStandings, SEASON } from "@/lib/f1/api";
import { PageHeader, SourceNote, Unavailable } from "@/components/f1/ui";
import { Reveal } from "@/components/mi/motion";

export const metadata: Metadata = { title: `Driver Intelligence — Motorsport Intelligence` };
export const revalidate = 3600;

export default async function DriversPage() {
  const { standings } = await getDriverStandings();
  return (
    <>
      <PageHeader
        n="04"
        kicker="Driver Intelligence"
        title="The grid"
        serif={`of ${SEASON}.`}
        intro="Every driver who has started a Grand Prix this season — profiles, career numbers and head-to-head comparisons."
      />
      <section className="mx-auto max-w-[1400px] px-4 pb-32 sm:px-8">
        {!standings.length && <Unavailable what="The driver list" />}
        <ul className="grid gap-px overflow-hidden rounded-[24px] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {standings.map((s, i) => (
            <Reveal as="li" key={s.Driver.driverId} delay={(i % 4) * 0.05} className="bg-bg">
              <Link href={`/drivers/${s.Driver.driverId}`} className="group relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden p-6 transition-colors hover:bg-surface">
                <span
                  aria-hidden
                  className="mi-display mi-outline pointer-events-none absolute -right-2 -top-4 text-[7rem] opacity-60 transition-transform duration-700 group-hover:-translate-x-2"
                  style={{ ["--stroke" as string]: "rgba(245,245,240,0.12)" }}
                >
                  {s.Driver.permanentNumber}
                </span>
                <span className="mi-label flex items-center gap-2 text-text-dim">
                  <span className={i === 0 ? "text-brand" : ""}>P{s.positionText}</span> · {s.points} pts
                </span>
                <span className="relative flex flex-col gap-1">
                  <span className="mi-serif text-2xl text-text-muted">{s.Driver.givenName}</span>
                  <span className="mi-display text-[clamp(1.6rem,2.4vw,2.2rem)] transition-colors group-hover:text-brand">{s.Driver.familyName}</span>
                  <span className="mt-2 text-sm text-text-muted">
                    {s.Constructors.at(-1)?.name} · {s.Driver.nationality}
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
        <SourceNote>Source: Jolpica F1 API — {SEASON} drivers&apos; championship classification.</SourceNote>
      </section>
    </>
  );
}
