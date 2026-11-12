import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { lp, type Lang } from "@/lib/i18n/config";
import { fmt, getDict } from "@/lib/i18n/dict";
import { circuit as getCircuit, continentOf, countryName, ctorName, db, driver, formatNumber, gpName } from "@/lib/f1/db";
import { circuitPhoto } from "@/lib/f1/media";
import { circuitEditorial } from "@/lib/f1/content";
import { BlockHead, Breadcrumbs, DataNotice, Milestones, Plate, Specs, StatusBadge } from "@/components/site/ui";
import { toneFor } from "@/components/site/cards";
import { LocalNav } from "@/components/site/LocalNav";
import type { Tone } from "@/lib/f1/types";

export async function generateMetadata({ params }: PageProps<"/[lang]/circuits/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const c = getCircuit(slug);
  return c ? { title: c.full, description: circuitEditorial(slug, lang as Lang)?.summary } : {};
}

const yearsLabel = (ys: number[]) => {
  if (!ys.length) return "—";
  const out: string[] = [];
  let start = ys[0];
  let prev = ys[0];
  for (const y of [...ys.slice(1), Infinity]) {
    if (y === prev + 1) {
      prev = y;
      continue;
    }
    out.push(start === prev ? String(start) : `${start}–${prev}`);
    start = prev = y;
  }
  return out.join(", ");
};

export default async function CircuitPage({ params }: PageProps<"/[lang]/circuits/[slug]">) {
  const { lang: l, slug } = await params;
  const lang = l as Lang;
  const t = getDict(lang);
  const CI = t.circuits;
  const c = getCircuit(slug);
  if (!c) notFound();
  const ed = circuitEditorial(c.id, lang);
  const held = c.editions.filter((e) => !e.scheduled);
  const scheduled = c.editions.filter((e) => e.scheduled);
  const winCount = new Map<string, number>();
  held.forEach((e) => e.w && winCount.set(e.w, (winCount.get(e.w) ?? 0) + 1));
  const topWinners = [...winCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
  const gpNames = [...new Set(held.map((e) => gpName(e.gp, lang)))];
  const region = continentOf(c.country);
  const nearby = db()
    .circuits.filter((x) => x.id !== c.id && continentOf(x.country) === region)
    .sort((a, b) => Math.hypot(a.lat - c.lat, a.lng - c.lng) - Math.hypot(b.lat - c.lat, b.lng - c.lng))
    .slice(0, 6);

  return (
    <>
      <LocalNav
        lang={lang}
        title={c.name}
        titleHref={`/circuits/${c.id}`}
        links={[
          { label: CI.profile, href: "#profile" },
          { label: CI.layoutsTitle, href: "#layouts" },
          { label: CI.editionsTitle.split(" ").slice(0, 3).join(" "), href: "#editions" },
        ]}
      />
      <section className="tone-paper" style={{ paddingTop: 28 }}>
        <div className="wrap">
          <Breadcrumbs lang={lang} items={[{ label: t.nav.circuits, href: "/circuits" }, { label: c.name }]} />
          <div style={{ padding: "clamp(40px,7vw,88px) 0 clamp(32px,5vw,48px)", maxWidth: 860 }}>
            <p className="eyebrow-f1">
              {c.place}, {countryName(c.country, lang)} · {c.first_}–{c.onCalendar ? t.common.present : c.last_}
            </p>
            <h1 className="display balance">{c.full}</h1>
            {ed && <p className="lede mt-s pretty">{ed.summary}</p>}
            <div className="flex-row mt-s" style={{ gap: 8 }}>
              <span className={`badge ${c.onCalendar ? "badge-red" : ""}`}>{c.onCalendar ? CI.current : CI.historicVenue}</span>
              <span className="badge">{fmt(CI.hosted, { n: held.length })}</span>
              <span className="badge">{CI.typeLong[c.type]}</span>
            </div>
          </div>
        </div>
        <div className="wrap-wide">
          <Plate lang={lang} alt={c.full} photo={circuitPhoto(c.id)} tone={(ed?.tone as Tone) ?? toneFor(c.id)} ratio="ratio-cinema" tag={`${c.place}, ${countryName(c.country, lang)}`} glyph={c.name} glyphSize={c.name.length > 10 ? "sm" : undefined} priority />
        </div>
        <div style={{ height: "clamp(56px,8vw,96px)" }} />
      </section>

      <section className="section tone-off" id="profile">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: "clamp(32px,6vw,96px)", alignItems: "start" }}>
            <div>
              <p className="eyebrow-f1">{CI.profile}</p>
              <Specs
                rows={[
                  [CI.officialName, c.full],
                  ...(c.prev?.length ? ([[CI.previousNames, c.prev.join(", ")]] as [string, string][]) : []),
                  [CI.location, `${c.place}, ${countryName(c.country, lang)}`],
                  [t.common.circuit, `${CI.typeLong[c.type]}${c.dir ? ` · ${CI.direction[c.dir]}` : ""}`],
                  [t.common.length, c.length ? `${formatNumber(c.length, lang, 3)} km${c.turns ? ` · ${c.turns} ${t.common.turns.toLowerCase()}` : ""}` : "—"],
                  [t.common.firstGrandPrix, held[0] ? <Link key="f" href={lp(lang, `/seasons/${held[0].y}/${held[0].s}`)} className="inline-link">{held[0].y} · {gpName(held[0].gp, lang)}</Link> : "—"],
                  [t.common.lastGrandPrix, held.length ? <Link key="l" href={lp(lang, `/seasons/${held[held.length - 1].y}/${held[held.length - 1].s}`)} className="inline-link">{held[held.length - 1].y} · {gpName(held[held.length - 1].gp, lang)}</Link> : "—"],
                  [t.common.grandPrix, gpNames.join(" · ")],
                  ...(scheduled.length ? ([[t.status.scheduled, scheduled.map((e) => `${e.y} · ${gpName(e.gp, lang)}`).join(", ")]] as [string, string][]) : []),
                ]}
              />
              {topWinners.length > 0 && (
                <div className="mt-m">
                  <p className="kicker" style={{ marginBottom: 8 }}>
                    {CI.mostWins}
                  </p>
                  <ol>
                    {topWinners.map(([d, n]) => (
                      <li key={d} className="flex-row space-between small" style={{ padding: "6px 0", borderBottom: "1px solid var(--line-soft)", flexWrap: "nowrap" }}>
                        <Link href={lp(lang, `/drivers/${d}`)}>{driver(d)?.name ?? d}</Link>
                        <span className="num" style={{ fontWeight: 700 }}>
                          {n}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
            <div className="prose">
              <p className="eyebrow-f1" style={{ fontSize: 17 }}>
                {CI.history}
              </p>
              {ed ? (
                <>
                  {ed.history.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  <h3>{CI.characteristics}</h3>
                  <ul>
                    {ed.characteristics.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                  <h3>{CI.evolution}</h3>
                  {ed.evolution.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  {ed.landmarks.length > 0 && (
                    <p>
                      <strong>{CI.landmarks}:</strong> {ed.landmarks.join(", ")}
                    </p>
                  )}
                </>
              ) : (
                <p className="muted">{CI.noEditorial}</p>
              )}
            </div>
          </div>
          {ed && ed.events.length > 0 && (
            <div className="mt-xl" style={{ maxWidth: 720 }}>
              <p className="eyebrow-f1">{CI.events}</p>
              <Milestones lang={lang} items={ed.events} linkYears />
            </div>
          )}
        </div>
      </section>

      <section className="section tone-paper" id="layouts">
        <div className="wrap-wide">
          <BlockHead eyebrow={`${c.layouts.length} ${t.common.layouts.toLowerCase()}`} title={CI.layoutsTitle} />
          <div className="grid grid-4 keep-2">
            {c.layouts.map((x, n) => (
              <figure key={x.id} className="card" style={{ padding: 0 }}>
                {x.svg ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={`/media/circuits/${x.id}.svg`} alt={fmt(CI.layoutDrawing, { id: x.id })} className="layout-drawing" style={{ background: "var(--paper-2)", borderRadius: 0 }} />
                ) : (
                  <div className="layout-drawing" style={{ background: "var(--paper-2)", display: "grid", placeItems: "center", borderRadius: 0 }}>
                    <span className="caption">{t.status.incomplete}</span>
                  </div>
                )}
                <figcaption className="card-body">
                  <p className="card-meta">
                    {t.common.layout} {n + 1}
                  </p>
                  <p className="card-title num">
                    {x.length ? `${formatNumber(x.length, lang, 3)} km` : "—"}
                    {x.turns ? <span className="muted small"> · {x.turns} {t.common.turns.toLowerCase()}</span> : null}
                  </p>
                  <p className="small muted">
                    {CI.layoutYears}: {yearsLabel(x.years)}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section tone-off" id="editions">
        <div className="wrap">
          <div className="flex-row" style={{ marginBottom: 20 }}>
            <h2 className="title-1">{CI.editionsTitle}</h2>
            <StatusBadge lang={lang} status="cross-checked" />
          </div>
          <div className="table-wrap">
            <table className="dtable compact">
              <thead>
                <tr>
                  <th scope="col">{t.common.year}</th>
                  <th scope="col">{t.common.grandPrix}</th>
                  <th scope="col">{t.common.layout}</th>
                  <th scope="col">{t.common.winner}</th>
                  <th scope="col">{t.common.constructor}</th>
                </tr>
              </thead>
              <tbody>
                {[...c.editions].reverse().map((e) => {
                  const li = c.layouts.findIndex((x) => x.id === e.l);
                  return (
                    <tr key={`${e.y}-${e.s}`} className={e.scheduled ? "muted-row" : ""}>
                      <td className="num" style={{ fontWeight: 700 }}>
                        <Link href={lp(lang, `/seasons/${e.y}`)}>{e.y}</Link>
                      </td>
                      <td>
                        <Link href={lp(lang, `/seasons/${e.y}/${e.s}`)}>{gpName(e.gp, lang)}</Link>
                        {e.name && <span className="caption" style={{ display: "block" }}>{e.name}</span>}
                      </td>
                      <td className="small num">{li >= 0 ? `${li + 1}${c.layouts[li].length ? ` · ${formatNumber(c.layouts[li].length, lang, 3)} km` : ""}` : "—"}</td>
                      <td>{e.w ? <Link href={lp(lang, `/drivers/${e.w}`)}>{driver(e.w)?.name}</Link> : e.scheduled ? CI.scheduledEdition : "—"}</td>
                      <td className="small">{e.wc ? <Link href={lp(lang, `/teams/${e.wc}`)}>{ctorName(e.wc)}</Link> : ""}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {nearby.length > 0 && (
        <section className="section-tight tone-paper">
          <div className="wrap">
            <p className="kicker" style={{ marginBottom: 12 }}>
              {CI.nearby}
            </p>
            <div className="flex-row" style={{ gap: 8 }}>
              {nearby.map((x) => (
                <Link key={x.id} href={lp(lang, `/circuits/${x.id}`)} className="chip">
                  {x.name}
                </Link>
              ))}
            </div>
            <div className="mt-m">
              <DataNotice title={t.status.legend}>
                {lang === "pt"
                  ? "Edições, vencedores, traçados e extensões: F1DB (CC BY 4.0); vencedores conferidos com a API Jolpica. Histórico e características: texto editorial do Paddock."
                  : "Editions, winners, layouts and lengths: F1DB (CC BY 4.0); winners cross-checked against the Jolpica API. History and characteristics: Paddock editorial."}
              </DataNotice>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
