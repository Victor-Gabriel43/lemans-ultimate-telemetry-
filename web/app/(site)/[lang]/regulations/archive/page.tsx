import Link from "next/link";
import type { Metadata } from "next";
import { lp, type Lang } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dict";
import { FIRST_REG_YEAR, catalog, docsForYear, lastRegYear, yearsWithDocs } from "@/lib/f1/regs";
import { formatDate } from "@/lib/f1/db";
import { DataNotice, PageIntro } from "@/components/site/ui";

export async function generateMetadata({ params }: PageProps<"/[lang]/regulations/archive">): Promise<Metadata> {
  const t = getDict((await params).lang as Lang);
  return { title: t.regulations.archiveTitle, description: t.regulations.archiveLede };
}

export default async function ArchivePage({ params }: PageProps<"/[lang]/regulations/archive">) {
  const lang = (await params).lang as Lang;
  const t = getDict(lang);
  const R = t.regulations;
  const last = lastRegYear();
  const withDocs = new Set(yearsWithDocs());
  const years = Array.from({ length: last - FIRST_REG_YEAR + 1 }, (_, i) => last - i);

  return (
    <>
      <PageIntro lang={lang} crumbs={[{ label: t.nav.regulations, href: "/regulations" }, { label: R.archiveEyebrow }]} eyebrow={R.archiveEyebrow} title={R.archiveTitle} lede={R.archiveLede} />
      <section className="section-tight tone-off" style={{ paddingTop: 40 }}>
        <div className="wrap-wide">
          <p className="kicker" style={{ marginBottom: 16 }}>
            {R.yearSelector}
          </p>
          <div className="year-grid">
            {years.map((y) => {
              const n = withDocs.has(y) ? docsForYear(y).length : 0;
              return (
                <Link key={y} href={lp(lang, `/regulations/archive/${y}`)} className={`year-cell ${n ? "" : ""}`} style={n ? undefined : { background: "transparent", borderStyle: "dashed" }}>
                  <span className="year-cell-year">{y}</span>
                  <span className="year-cell-champ">{n ? `${n} PDF` : R.gapTitle}</span>
                </Link>
              );
            })}
          </div>
          <div className="mt-l">
            <DataNotice title={t.status.legend}>
              {R.catalogNote.replace("{date}", formatDate(catalog().harvestedAt.slice(0, 10), lang))}{" "}
              {lang === "pt"
                ? "Anos sem documentos on-line são mostrados como lacunas documentais — nada é reconstruído de memória."
                : "Years without online documents are shown as documentation gaps — nothing is reconstructed from memory."}
            </DataNotice>
          </div>
        </div>
      </section>
    </>
  );
}
