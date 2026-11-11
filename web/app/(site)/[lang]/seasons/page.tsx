import { Suspense } from "react";
import type { Metadata } from "next";
import type { Lang } from "@/lib/i18n/config";
import { fmt, getDict } from "@/lib/i18n/dict";
import { ctor, db, driver, season } from "@/lib/f1/db";
import { seasonHeadline } from "@/lib/f1/content";
import { sized } from "@/lib/f1/img";
import { seasonHero } from "@/lib/f1/derive";
import { SeasonBrowser, type SeasonRow } from "@/components/site/SeasonBrowser";
import { DataNotice, PageIntro } from "@/components/site/ui";

export async function generateMetadata({ params }: PageProps<"/[lang]/seasons">): Promise<Metadata> {
  const t = getDict((await params).lang as Lang);
  return { title: t.seasons.metaTitle, description: t.seasons.lede };
}

export default async function SeasonsPage({ params }: PageProps<"/[lang]/seasons">) {
  const lang = (await params).lang as Lang;
  const t = getDict(lang);
  const i = db();
  const rows: SeasonRow[] = i.seasons.map((s) => {
    const champ = driver(s.champion);
    const leader = driver(s.leader);
    // the team the champion drove for most that season
    let team: string | undefined;
    if (champ) {
      const counts = new Map<string, number>();
      season(s.year)?.races.forEach((r) => r.results.forEach((x) => x.d === champ.id && counts.set(x.c, (counts.get(x.c) ?? 0) + 1)));
      team = ctor([...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0])?.name;
    }
    const cc = ctor(s.constructorChampion);
    return {
      year: s.year,
      status: s.status,
      champion: champ ? { id: champ.id, name: champ.name, last: champ.last } : undefined,
      team,
      constructor: cc ? { id: cc.id, name: cc.name } : undefined,
      leader: leader ? { id: leader.id, name: leader.name, last: leader.last } : undefined,
      rounds: s.rounds,
      completed: s.completed,
      headline: seasonHeadline(s.year, lang),
      photo: (() => {
        const h = seasonHero(s.year);
        return h ? { src: sized(h.photo.src, 500), credit: h.photo.credit, license: h.photo.license, label: h.label } : undefined;
      })(),
    };
  });
  return (
    <>
      <PageIntro lang={lang} crumbs={[{ label: t.nav.seasons }]} eyebrow={t.seasons.eyebrow} title={`${i.meta.firstYear} — ${i.meta.lastYear}`} lede={t.seasons.lede} />
      <section className="section-tight tone-off" style={{ paddingTop: 40 }}>
        <div className="wrap-wide">
          <Suspense fallback={<p className="muted">…</p>}>
            <SeasonBrowser seasons={rows} lang={lang} t={t} />
          </Suspense>
          <div className="mt-l">
            <DataNotice title={t.status.legend}>
              {lang === "pt"
                ? fmt("Calendários, resultados e classificações vêm da F1DB ({r}, CC BY 4.0). Os vencedores de todas as {n} corridas e todos os campeões foram conferidos com a API Jolpica. A temporada em andamento é provisória.", {
                    r: i.meta.release,
                    n: i.seasons.reduce((a, s) => a + s.completed, 0),
                  })
                : fmt("Calendars, results and standings come from F1DB ({r}, CC BY 4.0). The winners of all {n} races and every champion were cross-checked against the Jolpica API. The season in progress is provisional.", {
                    r: i.meta.release,
                    n: i.seasons.reduce((a, s) => a + s.completed, 0),
                  })}
            </DataNotice>
          </div>
        </div>
      </section>
    </>
  );
}
