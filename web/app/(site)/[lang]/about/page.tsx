import Link from "next/link";
import type { Metadata } from "next";
import { lp, type Lang } from "@/lib/i18n/config";
import { fmt, getDict } from "@/lib/i18n/dict";
import { crosscheck, db, formatDate } from "@/lib/f1/db";
import { allPhotos } from "@/lib/f1/media";
import { catalog, indexedDocs } from "@/lib/f1/regs";
import { PageIntro, StatusBadge } from "@/components/site/ui";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const t = getDict((await params).lang as Lang);
  return { title: t.about.metaTitle, description: t.about.lede };
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const lang = (await params).lang as Lang;
  const t = getDict(lang);
  const A = t.about;
  const m = db().meta;
  const cc = crosscheck();
  const cat = catalog();
  const photos = allPhotos();
  const pt = lang === "pt";

  const sources = [
    {
      name: "F1DB",
      url: m.url,
      license: m.license,
      text: pt
        ? `Base aberta com todas as temporadas, corridas, resultados, classificações, inscrições, pilotos, construtores, chassis, motores e circuitos (com traçados e desenhos). Versão ${m.release}, de ${formatDate(m.commitDate.slice(0, 10), lang)}.`
        : `Open dataset covering every season, race, result, standing, entry, driver, constructor, chassis, engine and circuit (with layouts and drawings). Release ${m.release}, dated ${formatDate(m.commitDate.slice(0, 10), lang)}.`,
    },
    {
      name: "Jolpica F1 API",
      url: cc.url,
      license: pt ? "Fonte independente de conferência" : "Independent cross-check source",
      text: pt
        ? `Usada para conferir o vencedor de cada corrida e os campeões de cada temporada: ${cc.summary.racesAgree} corridas coincidem, ${cc.summary.racesDisputed} divergem.`
        : `Used to cross-check the winner of every race and the champions of every season: ${cc.summary.racesAgree} races agree, ${cc.summary.racesDisputed} disagree.`,
    },
    {
      name: "FIA",
      url: cat.source,
      license: pt ? "Documentos oficiais" : "Official documents",
      text: pt
        ? `${cat.documents.length} documentos de regulamento listados pela FIA; ${indexedDocs().length} edições com texto indexado artigo por artigo. Catálogo obtido em ${formatDate(cat.harvestedAt.slice(0, 10), lang)}.`
        : `${cat.documents.length} regulation documents listed by the FIA; ${indexedDocs().length} issues indexed article by article. Catalogue taken on ${formatDate(cat.harvestedAt.slice(0, 10), lang)}.`,
    },
    {
      name: "Wikimedia Commons",
      url: "https://commons.wikimedia.org",
      license: "CC0 / PD / CC BY / CC BY-SA",
      text: pt
        ? "Fotografias: somente a imagem principal do artigo da Wikipédia sobre o próprio assunto, com licença livre verificada no arquivo original."
        : "Photographs: only the lead image of the subject's own Wikipedia article, with a free licence verified on the original file.",
    },
  ];

  const statuses: [string, string][] = pt
    ? [
        ["official", "Texto extraído de um documento publicado pela FIA, com link para o PDF original."],
        ["cross-checked", "O dado coincide em duas fontes independentes (F1DB e Jolpica)."],
        ["provisional", "Temporada em andamento: classificações e estatísticas podem mudar."],
        ["single-source", "Dado de uma única fonte, ainda não conferido em outra."],
        ["editorial", "Texto escrito pelo Paddock; não é citação oficial."],
        ["incomplete", "Informação parcial; o que falta é indicado na página."],
        ["disputed", "As fontes divergem; ambas as versões são mostradas."],
      ]
    : [
        ["official", "Text extracted from a document published by the FIA, linked to the original PDF."],
        ["cross-checked", "The data matches in two independent sources (F1DB and Jolpica)."],
        ["provisional", "Season in progress: standings and statistics may change."],
        ["single-source", "Data from a single source, not yet checked against another."],
        ["editorial", "Text written by Paddock; not an official quotation."],
        ["incomplete", "Partial information; what is missing is indicated on the page."],
        ["disputed", "Sources disagree; both versions are shown."],
      ];

  return (
    <>
      <PageIntro lang={lang} crumbs={[{ label: t.footer.about }]} eyebrow={A.eyebrow} title={A.title} lede={A.lede} />

      <section className="section tone-off" id="data">
        <div className="wrap">
          <p className="eyebrow-f1">{A.dataEyebrow}</p>
          <h2 className="headline">{A.dataTitle}</h2>
          <div className="grid grid-2 mt-l">
            {sources.map((s) => (
              <div key={s.name} className="tile" style={{ background: "var(--paper)" }}>
                <div className="tile-body">
                  <p className="title-3">
                    <a href={s.url} target="_blank" rel="noreferrer" className="inline-link">
                      {s.name}
                    </a>
                  </p>
                  <span className="badge" style={{ alignSelf: "flex-start" }}>
                    {s.license}
                  </span>
                  <p className="small muted pretty">{s.text}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="title-2 mt-xl">{A.statusTitle}</h3>
          <ul className="mt-s" style={{ display: "grid", gap: 10 }}>
            {statuses.map(([s, text]) => (
              <li key={s} className="flex-row" style={{ gap: 12, flexWrap: "nowrap", alignItems: "flex-start" }}>
                <span style={{ minWidth: 220 }}>
                  <StatusBadge lang={lang} status={s} />
                </span>
                <span className="small">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section tone-paper" id="images">
        <div className="wrap-text prose">
          <p className="eyebrow-f1" style={{ fontSize: 17 }}>
            {A.imagesEyebrow}
          </p>
          <h2 className="title-1" style={{ color: "var(--ink)" }}>
            {A.imagesTitle}
          </h2>
          {pt ? (
            <>
              <p>Toda fotografia precisa mostrar o carro, a equipe, o piloto e a época corretos, e precisa ter licença livre e crédito. Por isso o Paddock usa somente a imagem principal do artigo da Wikipédia sobre o próprio assunto — a imagem que a enciclopédia escolheu para representá-lo — e confere a licença no arquivo original do Wikimedia Commons.</p>
              <p>Imagens com uso restrito, logotipos de equipes e imagens sem licença clara são rejeitados. Quando não há foto verificada, a página mostra uma placa tipográfica — nunca uma foto substituta. Os traçados dos circuitos vêm da F1DB, um desenho por configuração.</p>
            </>
          ) : (
            <>
              <p>Every photograph must show the correct car, team, driver and period, and must be freely licensed and credited. Paddock therefore uses only the lead image of the subject’s own Wikipedia article — the image the encyclopedia chose to depict it — and verifies its licence on the original Wikimedia Commons file.</p>
              <p>Restricted images, team logos and images without a clear licence are rejected. Where no verified photograph exists, the page shows a typographic plate — never a substitute photo. Circuit layouts come from F1DB, one drawing per configuration.</p>
            </>
          )}
        </div>
      </section>

      <section className="section tone-off" id="credits">
        <div className="wrap">
          <h2 className="title-1">{A.creditsTitle}</h2>
          <p className="lede mt-s">{fmt(A.creditsLede, { n: photos.length })}</p>
          <div className="table-wrap mt-m">
            <table className="dtable compact">
              <thead>
                <tr>
                  <th scope="col">{t.common.photo}</th>
                  <th scope="col">{pt ? "Autor" : "Author"}</th>
                  <th scope="col">{pt ? "Licença" : "Licence"}</th>
                </tr>
              </thead>
              <tbody>
                {photos.map((p) => {
                  const [kind, ...rest] = p.id.split("-");
                  const id = rest.join("-");
                  const href = kind === "driver" ? `/drivers/${id}` : kind === "circuit" ? `/circuits/${id}` : `/cars/${id}`;
                  return (
                    <tr key={p.id}>
                      <td className="small">
                        <Link href={lp(lang, href)}>{id}</Link> ·{" "}
                        <a href={p.sourceUrl} target="_blank" rel="noreferrer" className="muted">
                          Commons
                        </a>
                      </td>
                      <td className="small">{p.credit}</td>
                      <td className="small">{p.license}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
