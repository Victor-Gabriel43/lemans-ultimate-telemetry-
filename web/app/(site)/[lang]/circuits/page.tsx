import { Suspense } from "react";
import type { Metadata } from "next";
import type { Lang } from "@/lib/i18n/config";
import { fmt, getDict } from "@/lib/i18n/dict";
import { continentOf, countryName, db } from "@/lib/f1/db";
import { circuitPhoto } from "@/lib/f1/media";
import { CircuitBrowser, type CircuitRow } from "@/components/site/CircuitBrowser";
import { DataNotice, PageIntro, Stat } from "@/components/site/ui";

export async function generateMetadata({ params }: PageProps<"/[lang]/circuits">): Promise<Metadata> {
  const t = getDict((await params).lang as Lang);
  return { title: t.circuits.metaTitle };
}

export default async function CircuitsPage({ params }: PageProps<"/[lang]/circuits">) {
  const lang = (await params).lang as Lang;
  const t = getDict(lang);
  const i = db();
  const rows: CircuitRow[] = i.circuits.map((c) => {
    const lastLayout = [...c.layouts].reverse().find((l) => l.svg);
    return {
      id: c.id,
      name: c.name,
      full: c.full,
      place: c.place,
      country: countryName(c.country, lang),
      continent: continentOf(c.country) ?? "",
      type: c.type,
      from: c.first_,
      to: c.last_,
      current: c.onCalendar,
      hosted: c.editions.filter((e) => !e.scheduled).length,
      layout: lastLayout?.id,
      photo: circuitPhoto(c.id)?.src,
    };
  });
  const current = rows.filter((r) => r.current).length;
  return (
    <>
      <PageIntro lang={lang} crumbs={[{ label: t.nav.circuits }]} eyebrow={t.circuits.eyebrow} title={t.circuits.title} lede={fmt(t.circuits.lede, { n: rows.length })}>
        <div className="stat-row">
          <Stat value={rows.length} label={t.circuits.eyebrow} />
          <Stat value={current} label={t.circuits.current} />
          <Stat value={rows.length - current} label={t.circuits.historicVenue} />
          <Stat value={rows.filter((r) => r.type === "STREET").length} label={t.circuits.typeLong.STREET} />
        </div>
      </PageIntro>
      <section className="section-tight tone-off" style={{ paddingTop: 40 }}>
        <div className="wrap-wide">
          <Suspense fallback={<p className="muted">…</p>}>
            <CircuitBrowser circuits={rows} lang={lang} t={t} />
          </Suspense>
          <div className="mt-l">
            <DataNotice title={t.status.legend}>
              {lang === "pt"
                ? "Circuitos, traçados, extensões e edições: F1DB (CC BY 4.0). Desenhos dos traçados: F1DB, um por configuração. “No calendário de 2026” indica apenas os circuitos com etapa em 2026."
                : "Circuits, layouts, lengths and editions: F1DB (CC BY 4.0). Layout drawings: F1DB, one per configuration. “On the 2026 calendar” marks only circuits with a 2026 round."}
            </DataNotice>
          </div>
        </div>
      </section>
    </>
  );
}
