import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { lp, type Lang } from "@/lib/i18n/config";
import { fmt, getDict } from "@/lib/i18n/dict";
import { countryName, ctorName, db } from "@/lib/f1/db";
import { teamEditorial } from "@/lib/f1/content";
import { TeamBrowser, type TeamRow } from "@/components/site/TeamBrowser";
import { PageIntro } from "@/components/site/ui";

export async function generateMetadata({ params }: PageProps<"/[lang]/teams">): Promise<Metadata> {
  const t = getDict((await params).lang as Lang);
  return { title: t.teams.metaTitle };
}

export default async function TeamsPage({ params }: PageProps<"/[lang]/teams">) {
  const lang = (await params).lang as Lang;
  const t = getDict(lang);
  const i = db();
  const rows: TeamRow[] = i.constructors.map((c) => {
    const ed = teamEditorial(c.id, lang);
    return {
      id: c.id,
      name: c.name,
      country: countryName(c.country, lang),
      from: c.first_,
      to: c.last_,
      active: c.active,
      titles: c.titles.length,
      wins: c.st.wins,
      entries: c.st.entries,
      color: ed?.color,
      summary: ed && !ed.isAlias ? ed.summary : undefined,
      lineage: (c.chronology ?? []).map((x) => ctorName(x.c)).join(" "),
    };
  });
  const ranked = i.constructors.filter((c) => c.titles.length).sort((a, b) => b.titles.length - a.titles.length);
  const max = ranked[0]?.titles.length ?? 1;

  return (
    <>
      <PageIntro lang={lang} crumbs={[{ label: t.nav.teams }]} eyebrow={t.teams.eyebrow} title={t.teams.title} lede={fmt(t.teams.lede, { n: i.constructors.length })} />
      <section className="section-tight tone-off" style={{ paddingTop: 40 }}>
        <div className="wrap-wide">
          <Suspense fallback={<p className="muted">…</p>}>
            <TeamBrowser teams={rows} lang={lang} t={t} />
          </Suspense>
        </div>
      </section>
      <section className="section tone-paper">
        <div className="wrap">
          <p className="eyebrow-f1">{t.teams.titlesEyebrow}</p>
          <h2 className="headline">{t.teams.titlesTitle}</h2>
          <p className="lede mt-s">{t.teams.titlesLede}</p>
          <ol className="mt-l" style={{ display: "grid", gap: 14 }}>
            {ranked.map((c) => (
              <li key={c.id} style={{ display: "grid", gridTemplateColumns: "minmax(110px,180px) 1fr 40px", gap: 16, alignItems: "center" }}>
                <Link href={lp(lang, `/teams/${c.id}`)} style={{ fontWeight: 600 }}>
                  {c.name}
                </Link>
                <div style={{ height: 10, borderRadius: 10, background: "var(--paper-3)", overflow: "hidden" }} title={c.titles.join(", ")}>
                  <div style={{ width: `${(c.titles.length / max) * 100}%`, height: "100%", background: teamEditorial(c.id, lang)?.color ?? "var(--ink)", borderRadius: 10 }} />
                </div>
                <span className="num" style={{ fontWeight: 700, textAlign: "right" }}>
                  {c.titles.length}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
