import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { TEAMS } from "@/lib/f1/teams";
import { constructorTitles } from "@/lib/f1/seasons";
import { TeamBrowser } from "@/components/site/TeamBrowser";
import { PageIntro } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Teams & Constructors",
  description: "The history, identity and championships of Formula One's teams, past and present.",
};

export default function TeamsPage() {
  const ranked = TEAMS.map((t) => ({ t, years: constructorTitles(t.slug) }))
    .filter((x) => x.years.length)
    .sort((a, b) => b.years.length - a.years.length);
  const max = ranked[0]?.years.length ?? 1;

  return (
    <>
      <PageIntro
        crumbs={[{ label: "Teams" }]}
        eyebrow="Teams & constructors"
        title="Built, not bought."
        lede="In Formula One every team is a constructor — designing and building its own car. Meet the teams of the 2026 grid and the great names of the past."
      />

      <section className="section-tight tone-off" style={{ paddingTop: 40 }}>
        <div className="wrap-wide">
          <Suspense fallback={<p className="muted">Loading teams…</p>}>
            <TeamBrowser teams={TEAMS} />
          </Suspense>
        </div>
      </section>

      <section className="section tone-paper">
        <div className="wrap">
          <p className="eyebrow-f1">Constructors’ championship</p>
          <h2 className="headline">Titles since 1958.</h2>
          <p className="lede mt-s">The constructors’ championship was first awarded in 1958. Each bar shows a team’s titles.</p>
          <ol className="mt-l" style={{ display: "grid", gap: 14 }}>
            {ranked.map(({ t, years }) => (
              <li key={t.slug} style={{ display: "grid", gridTemplateColumns: "minmax(110px,180px) 1fr 40px", gap: 16, alignItems: "center" }}>
                <Link href={`/teams/${t.slug}`} style={{ fontWeight: 600 }}>
                  {t.name}
                </Link>
                <div style={{ height: 10, borderRadius: 10, background: "var(--paper-3)", overflow: "hidden" }} title={years.join(", ")}>
                  <div style={{ width: `${(years.length / max) * 100}%`, height: "100%", background: t.slug === "ferrari" || t.slug === "mclaren" ? "var(--red)" : "var(--ink)", borderRadius: 10 }} />
                </div>
                <span className="num" style={{ fontWeight: 700, textAlign: "right" }}>
                  {years.length}
                </span>
              </li>
            ))}
          </ol>
          <p className="caption mt-m">Derived from the editorial season index; to be reconciled with official records in Phase 2.</p>
        </div>
      </section>
    </>
  );
}
