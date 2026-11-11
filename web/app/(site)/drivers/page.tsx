import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { DRIVERS } from "@/lib/f1/drivers";
import { SEASONS, driverTitles } from "@/lib/f1/seasons";
import { getMedia } from "@/lib/f1/media";
import { DriverBrowser } from "@/components/site/DriverBrowser";
import { DataNotice, PageIntro } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Drivers",
  description: "Profiles of Formula One world champions and legends, with career timelines, teams and titles.",
};

export default function DriversPage() {
  const rows = DRIVERS.map((d) => ({ ...d, titles: driverTitles(d.slug), media: getMedia(`driver-${d.slug}`) }));

  // Every world champion, grouped — the roll of honour.
  const champions = new Map<string, { name: string; slug?: string; years: number[] }>();
  SEASONS.forEach((s) => {
    if (!s.champions) return;
    const e = champions.get(s.champions.driver) ?? { name: s.champions.driver, slug: s.champions.driverSlug, years: [] };
    e.years.push(s.year);
    champions.set(s.champions.driver, e);
  });
  const roll = [...champions.values()].sort((a, b) => b.years.length - a.years.length || a.years[0] - b.years[0]);

  return (
    <>
      <PageIntro
        crumbs={[{ label: "Drivers" }]}
        eyebrow="Drivers"
        title="The drivers."
        lede="Champions, legends and the stars of today. Each profile traces a career — the teams, the titles and the moments that defined it."
      />

      <section className="section-tight tone-off" style={{ paddingTop: 40 }}>
        <div className="wrap-wide">
          <Suspense fallback={<p className="muted">Loading drivers…</p>}>
            <DriverBrowser drivers={rows} />
          </Suspense>
        </div>
      </section>

      <section className="section tone-paper" id="champions">
        <div className="wrap">
          <p className="eyebrow-f1">Roll of honour</p>
          <h2 className="headline">Every world champion.</h2>
          <p className="lede mt-s">
            {roll.length} drivers have won the World Championship since 1950, ordered by number of titles.
          </p>
          <div className="table-wrap mt-l">
            <table className="dtable">
              <thead>
                <tr>
                  <th scope="col">Driver</th>
                  <th scope="col" style={{ textAlign: "right" }}>
                    Titles
                  </th>
                  <th scope="col">Seasons</th>
                </tr>
              </thead>
              <tbody>
                {roll.map((r) => (
                  <tr key={r.name}>
                    <td style={{ fontWeight: 600 }}>{r.slug ? <Link href={`/drivers/${r.slug}`}>{r.name}</Link> : r.name}</td>
                    <td className="num" style={{ textAlign: "right", fontWeight: 700 }}>
                      {r.years.length}
                    </td>
                    <td className="num">
                      {r.years.map((y, i) => (
                        <span key={y}>
                          <Link href={`/seasons/${y}`}>{y}</Link>
                          {i < r.years.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-m">
            <DataNotice>
              Career statistics such as wins, poles and starts are intentionally not shown yet. They will be added from verified
              race records in Phase 2.
            </DataNotice>
          </div>
        </div>
      </section>
    </>
  );
}
