import Link from "next/link";
import { lp, type Lang } from "@/lib/i18n/config";
import { fmt, getDict } from "@/lib/i18n/dict";
import { chassisName, countryName, ctor, ctorName, driver as getDriver, type Chassis, type Circuit, type Constructor, type Driver, type Result, type Pos } from "@/lib/f1/db";
import { chassisPhoto, circuitPhoto, driverPhoto } from "@/lib/f1/media";
import { carEditorial, circuitEditorial, driverEditorial, teamEditorial } from "@/lib/f1/content";
import type { Tone } from "@/lib/f1/types";
import { Plate } from "./ui";

const TONE_CYCLE: Tone[] = ["red", "navy", "green", "graphite", "gold", "teal", "purple", "orange", "blue", "silver"];
export const toneFor = (id: string): Tone => TONE_CYCLE[[...id].reduce((a, c) => a + c.charCodeAt(0), 0) % TONE_CYCLE.length];

export function DriverCard({ d, lang, note }: { d: Driver; lang: Lang; note?: string }) {
  const t = getDict(lang);
  const ed = driverEditorial(d.id, lang);
  return (
    <Link href={lp(lang, `/drivers/${d.id}`)} className="card">
      <Plate
        linked
        lang={lang}
        alt={d.name}
        photo={driverPhoto(d.id)}
        tone={(ed?.tone as Tone) ?? toneFor(d.id)}
        ratio="ratio-portrait"
        flat
        position="center 20%"
        tag={d.titles.length ? fmt(t.drivers.champion, { n: d.titles.length }) : d.active ? t.drivers.currentDriver : undefined}
        glyph={
          <span style={{ fontSize: "clamp(44px,6vw,72px)", letterSpacing: "-0.01em" }}>
            {d.first[0]}
            {d.last[0]}
          </span>
        }
      />
      <div className="card-body">
        <p className="card-meta">
          {countryName(d.nat, lang)} · {d.first_}–{d.active ? t.common.present : d.last_}
        </p>
        <p className="card-title">{d.name}</p>
        <p className="small muted">{note ?? ed?.knownFor ?? `${d.st.starts} ${t.common.starts.toLowerCase()} · ${d.st.wins} ${t.common.wins.toLowerCase()}`}</p>
      </div>
    </Link>
  );
}

export function TeamCard({ c, lang }: { c: Constructor; lang: Lang }) {
  const t = getDict(lang);
  const ed = teamEditorial(c.id, lang);
  return (
    <Link href={lp(lang, `/teams/${c.id}`)} className="card">
      <div style={{ height: 6, background: ed?.color ?? "var(--line)" }} aria-hidden />
      <div className="card-body" style={{ paddingTop: 22 }}>
        <p className="card-meta">
          {countryName(c.country, lang)} · {c.first_}–{c.active ? t.common.present : c.last_}
        </p>
        <p className="card-title">{c.name}</p>
        <p className="small muted pretty">
          {ed && !ed.isAlias ? ed.summary : `${c.st.entries} ${t.common.entries.toLowerCase()} · ${c.st.wins} ${t.common.wins.toLowerCase()}`}
        </p>
        <div className="flex-row" style={{ marginTop: "auto", paddingTop: 14, gap: 8 }}>
          {c.titles.length > 0 && <span className="badge badge-red">{fmt(t.teams.constructorTitles, { n: c.titles.length })}</span>}
          <span className="badge">{c.active ? t.teams.onGrid : t.common.historic}</span>
        </div>
      </div>
    </Link>
  );
}

export function CarCard({ ch, lang, priority = false }: { ch: Chassis; lang: Lang; priority?: boolean }) {
  const t = getDict(lang);
  const ed = carEditorial(ch.id, lang);
  const yrs = ch.years.length > 1 ? `${ch.years[0]}–${ch.years[ch.years.length - 1]}` : String(ch.years[0]);
  return (
    <Link href={lp(lang, `/cars/${ch.id}`)} className="card">
      <Plate
        linked
        lang={lang}
        alt={chassisName(ch.id)}
        photo={chassisPhoto(ch.id)}
        tone={(ed?.tone as Tone) ?? toneFor(ch.c)}
        ratio="ratio-photo"
        flat
        tag={yrs}
        glyph={ch.years[0]}
        glyphSize="sm"
        priority={priority}
      />
      <div className="card-body">
        <p className="card-meta">{ctorName(ch.c)}</p>
        <p className="card-title">{ed?.name ?? chassisName(ch.id)}</p>
        <p className="small muted pretty">{ed?.headline ?? (ch.wins ? fmt(t.cars.winsWith, { n: ch.wins }) : t.cars.noWins)}</p>
      </div>
    </Link>
  );
}

export function CircuitCard({ c, lang }: { c: Circuit; lang: Lang }) {
  const t = getDict(lang);
  const ed = circuitEditorial(c.id, lang);
  const held = c.editions.filter((e) => !e.scheduled).length;
  return (
    <Link href={lp(lang, `/circuits/${c.id}`)} className="card">
      <Plate
        linked
        lang={lang}
        alt={c.full}
        photo={circuitPhoto(c.id)}
        tone={(ed?.tone as Tone) ?? toneFor(c.id)}
        ratio="ratio-photo"
        flat
        tag={`${t.circuits.types[c.type]} · ${c.first_}–${c.onCalendar ? t.common.present : c.last_}`}
        glyph={
          <span style={{ fontSize: c.name.length > 11 ? "clamp(24px,3vw,38px)" : "clamp(32px,4.4vw,56px)", letterSpacing: "-0.03em", display: "block", overflowWrap: "anywhere" }}>
            {c.name}
          </span>
        }
      />
      <div className="card-body">
        <p className="card-meta">
          {c.place}, {countryName(c.country, lang)}
        </p>
        <p className="card-title">{c.full}</p>
        <p className="small muted pretty">{ed?.summary ?? `${fmt(t.circuits.hosted, { n: held })} · ${c.onCalendar ? t.circuits.current : t.circuits.historicVenue}`}</p>
      </div>
    </Link>
  );
}

/* ---------------------------------------------------------------------------
 * Tables
 * ------------------------------------------------------------------------- */
export function posLabel(p: Pos, lang: Lang) {
  if (typeof p === "number") return String(p);
  const r = getDict(lang).race;
  const map: Record<string, string> = { DNF: r.dnf, DNS: r.dns, DSQ: r.dsq, DNQ: r.dnq, DNPQ: r.dnpq, NC: r.nc, EX: r.ex, DNP: r.dnp };
  return map[p] ?? p;
}

export function ResultsTable({ rows, lang, showGrid = true }: { rows: Result[]; lang: Lang; showGrid?: boolean }) {
  const t = getDict(lang);
  return (
    <div className="table-wrap">
      <table className="dtable compact">
        <thead>
          <tr>
            <th scope="col">{t.common.position}</th>
            <th scope="col">{t.common.driver}</th>
            <th scope="col">{t.common.constructor}</th>
            <th scope="col" className="r">
              {t.common.laps}
            </th>
            <th scope="col">{t.common.time}</th>
            {showGrid && (
              <th scope="col" className="r">
                {t.common.grid}
              </th>
            )}
            <th scope="col" className="r">
              {t.common.points}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const d = getDriver(r.d);
            const classified = typeof r.pos === "number";
            return (
              <tr key={`${r.d}-${i}`} className={classified ? "" : "muted-row"}>
                <td className={`pos-cell ${r.pos === 1 ? "pos-1" : ""}`} title={classified ? undefined : posLabel(r.pos, lang)}>
                  {classified ? r.pos : r.pos}
                </td>
                <td style={{ fontWeight: 600 }}>
                  {d ? <Link href={lp(lang, `/drivers/${d.id}`)}>{d.name}</Link> : r.d}
                  {r.shared && <span className="caption"> *</span>}
                </td>
                <td>{ctor(r.c) ? <Link href={lp(lang, `/teams/${r.c}`)}>{ctorName(r.c)}</Link> : r.c}</td>
                <td className="r num">{r.laps ?? "—"}</td>
                <td className="num small">{r.time ? (r.pos === 1 ? r.time : r.gap ?? r.time) : r.why ?? (classified ? r.gap ?? "" : posLabel(r.pos, lang))}</td>
                {showGrid && <td className="r num">{r.grid ?? "—"}</td>}
                <td className="r num" style={{ fontWeight: r.pts ? 600 : 400 }}>
                  {r.pts ?? ""}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
