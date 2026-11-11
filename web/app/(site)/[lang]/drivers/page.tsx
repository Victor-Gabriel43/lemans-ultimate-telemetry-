import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { lp, type Lang } from "@/lib/i18n/config";
import { fmt, getDict } from "@/lib/i18n/dict";
import { countryName, ctorName, db } from "@/lib/f1/db";
import { driverPhoto } from "@/lib/f1/media";
import { driverEditorial } from "@/lib/f1/content";
import { DriverBrowser, type DriverRow } from "@/components/site/DriverBrowser";
import { toneFor } from "@/components/site/cards";
import { DataNotice, PageIntro } from "@/components/site/ui";
import type { Tone } from "@/lib/f1/types";

export async function generateMetadata({ params }: PageProps<"/[lang]/drivers">): Promise<Metadata> {
  const t = getDict((await params).lang as Lang);
  return { title: t.drivers.metaTitle };
}

export default async function DriversPage({ params }: PageProps<"/[lang]/drivers">) {
  const lang = (await params).lang as Lang;
  const t = getDict(lang);
  const i = db();
  const rows: DriverRow[] = i.drivers.map((d) => ({
    id: d.id,
    name: d.name,
    first: d.first,
    last: d.last,
    nat: countryName(d.nat, lang),
    natId: d.nat,
    from: d.first_,
    to: d.last_,
    active: d.active,
    titles: d.titles.length,
    wins: d.st.wins,
    starts: d.st.starts,
    podiums: d.st.podiums,
    poles: d.st.poles,
    teams: d.teams.map((c) => ({ id: c, name: ctorName(c) })),
    decades: [...new Set(d.seasons.map((s) => Math.floor(s.y / 10) * 10))],
    photo: driverPhoto(d.id)?.src,
    tone: (driverEditorial(d.id, lang)?.tone as Tone) ?? toneFor(d.id),
  }));
  const roll = i.drivers.filter((d) => d.titles.length).sort((a, b) => b.titles.length - a.titles.length || a.titles[0] - b.titles[0]);

  return (
    <>
      <PageIntro lang={lang} crumbs={[{ label: t.nav.drivers }]} eyebrow={t.drivers.eyebrow} title={t.drivers.title} lede={fmt(t.drivers.lede, { n: i.drivers.length })} />
      <section className="section-tight tone-off" style={{ paddingTop: 40 }}>
        <div className="wrap-wide">
          <Suspense fallback={<p className="muted">…</p>}>
            <DriverBrowser drivers={rows} lang={lang} t={t} />
          </Suspense>
        </div>
      </section>

      <section className="section tone-paper" id="champions">
        <div className="wrap">
          <p className="eyebrow-f1">{t.drivers.rollEyebrow}</p>
          <h2 className="headline">{t.drivers.rollTitle}</h2>
          <p className="lede mt-s">{fmt(t.drivers.rollLede, { n: roll.length })}</p>
          <div className="table-wrap mt-l">
            <table className="dtable">
              <thead>
                <tr>
                  <th scope="col">{t.common.driver}</th>
                  <th scope="col">{t.common.nationality}</th>
                  <th scope="col" className="r">
                    {t.common.titles}
                  </th>
                  <th scope="col">{t.common.seasons}</th>
                  <th scope="col" className="r">
                    {t.common.wins}
                  </th>
                </tr>
              </thead>
              <tbody>
                {roll.map((d) => (
                  <tr key={d.id}>
                    <td style={{ fontWeight: 600 }}>
                      <Link href={lp(lang, `/drivers/${d.id}`)}>{d.name}</Link>
                    </td>
                    <td className="small muted">{countryName(d.nat, lang)}</td>
                    <td className="r num" style={{ fontWeight: 700 }}>
                      {d.titles.length}
                    </td>
                    <td className="num small">
                      {d.titles.map((y, k) => (
                        <span key={y}>
                          <Link href={lp(lang, `/seasons/${y}`)}>{y}</Link>
                          {k < d.titles.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </td>
                    <td className="r num">{d.st.wins}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-m">
            <DataNotice title={t.status.legend}>
              {lang === "pt"
                ? "Estatísticas calculadas a partir dos resultados de cada corrida na F1DB (CC BY 4.0). Pole position = primeiro lugar no grid de largada; inscrições contam cada GP em que o piloto aparece no resultado, incluindo não classificados para a largada."
                : "Statistics computed from every race result in F1DB (CC BY 4.0). Pole position = first on the starting grid; entries count every Grand Prix in which the driver appears in the result, including non-qualifiers."}
            </DataNotice>
          </div>
        </div>
      </section>
    </>
  );
}
