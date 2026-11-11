import { Suspense } from "react";
import type { Metadata } from "next";
import type { Lang } from "@/lib/i18n/config";
import { fmt, getDict } from "@/lib/i18n/dict";
import { chassis, ctorName, db, engine, engineMfrName } from "@/lib/f1/db";
import { chassisPhoto } from "@/lib/f1/media";
import { landmarkCarIds } from "@/lib/f1/content";
import { GENERATION_DEFS, generationOf } from "@/lib/f1/generations";
import { CarBrowser, type CarRow } from "@/components/site/CarBrowser";
import { CarCard } from "@/components/site/cards";
import { BlockHead, DataNotice, PageIntro } from "@/components/site/ui";

export async function generateMetadata({ params }: PageProps<"/[lang]/cars">): Promise<Metadata> {
  const t = getDict((await params).lang as Lang);
  return { title: t.cars.metaTitle };
}

export default async function CarsPage({ params }: PageProps<"/[lang]/cars">) {
  const lang = (await params).lang as Lang;
  const t = getDict(lang);
  const i = db();
  const rows: CarRow[] = i.chassis.map((c) => {
    const mfrs = [...new Set(c.engines.map((e) => engine(e)?.m).filter(Boolean) as string[])];
    return {
      id: c.id,
      name: c.full ?? `${ctorName(c.c)} ${c.name}`,
      c: c.c,
      cName: ctorName(c.c),
      years: c.years,
      wins: c.wins,
      engines: mfrs.map((m) => ({ id: m, name: engineMfrName(m) })),
      gen: generationOf(c.years[0]).id,
      photo: chassisPhoto(c.id)?.src,
    };
  });
  const gens = GENERATION_DEFS.map((g) => ({ id: g.id, name: g.name[lang], years: g.to > 2030 ? `${g.from}–` : `${g.from}–${g.to}`, text: g.text[lang] }));

  return (
    <>
      <PageIntro lang={lang} crumbs={[{ label: t.nav.cars }]} eyebrow={t.cars.eyebrow} title={t.cars.title} lede={fmt(t.cars.lede, { n: i.chassis.length })} />

      <section className="section tone-paper" id="landmark">
        <div className="wrap-wide">
          <BlockHead eyebrow={t.cars.landmark} title={t.cars.landmarkLede} />
          <div className="grid grid-4 keep-2">
            {landmarkCarIds().map((id) => chassis(id) && <CarCard key={id} ch={chassis(id)!} lang={lang} />)}
          </div>
        </div>
      </section>

      <section className="section-tight tone-night" id="generations">
        <div className="wrap">
          <p className="kicker">{t.cars.generations}</p>
          <ol className="grid grid-3 mt-s" style={{ gap: 12 }}>
            {gens.map((g, n) => (
              <li key={g.id}>
                <a href={`?by=generation&v=${g.id}#archive`} className="tile" style={{ background: "var(--night-3)", height: "100%" }}>
                  <span className="tile-body" style={{ padding: 20 }}>
                    <span className="caption" style={{ color: "var(--on-night-2)" }}>
                      {String(n + 1).padStart(2, "0")} · {g.years}
                    </span>
                    <span className="title-3">{g.name}</span>
                    <span className="small muted">{g.text}</span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section tone-off" id="archive">
        <div className="wrap-wide">
          <BlockHead eyebrow={t.cars.allModels} title={t.cars.browseBy} />
          <Suspense fallback={<p className="muted">…</p>}>
            <CarBrowser cars={rows} gens={gens} lang={lang} t={t} />
          </Suspense>
          <div className="mt-xl">
            <DataNotice title={t.status.legend}>
              {lang === "pt"
                ? "Modelos de chassi, motores e pilotos: registros de inscrição da F1DB (CC BY 4.0). Um modelo só aparece separado quando foi inscrito com designação própria — atualizações aerodinâmicas não viram carros novos."
                : "Chassis models, engines and drivers: F1DB entry records (CC BY 4.0). A model is listed separately only when it was entered under its own designation — aerodynamic updates are not treated as new cars."}
            </DataNotice>
          </div>
        </div>
      </section>
    </>
  );
}
