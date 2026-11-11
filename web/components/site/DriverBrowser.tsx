"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { lp, type Lang } from "@/lib/i18n/config";
import { fmt, type Dict } from "@/lib/i18n/dict";
import type { Tone } from "@/lib/f1/types";
import { TONES } from "./tones";

export type DriverRow = {
  id: string;
  name: string;
  first: string;
  last: string;
  nat: string;
  natId: string;
  from: number;
  to: number;
  active: boolean;
  titles: number;
  wins: number;
  starts: number;
  podiums: number;
  poles: number;
  teams: { id: string; name: string }[];
  decades: number[];
  photo?: string;
  tone: Tone;
};

const STATUS = ["all", "champions", "active", "retired"] as const;
type Status = (typeof STATUS)[number];
type Sort = "debut" | "wins" | "titles" | "starts" | "name";
const PAGE = 48;

export function DriverBrowser({ drivers, lang, t }: { drivers: DriverRow[]; lang: Lang; t: Dict }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const D = t.drivers;
  const status = (STATUS.find((s) => s === params.get("filter")) ?? "all") as Status;
  const [decade, setDecade] = useState<number | "all">("all");
  const [nation, setNation] = useState("all");
  const [team, setTeam] = useState("all");
  const [sort, setSort] = useState<Sort>("wins");
  const [q, setQ] = useState("");
  const [shown, setShown] = useState(PAGE);

  const nations = useMemo(() => [...new Map(drivers.map((d) => [d.natId, d.nat])).entries()].sort((a, b) => a[1].localeCompare(b[1])), [drivers]);
  const teams = useMemo(() => [...new Map(drivers.flatMap((d) => d.teams.map((x) => [x.id, x.name] as const))).entries()].sort((a, b) => a[1].localeCompare(b[1])), [drivers]);

  const setStatus = (id: Status) => {
    const sp = new URLSearchParams(params.toString());
    if (id === "all") sp.delete("filter");
    else sp.set("filter", id);
    router.replace(`${pathname}${sp.toString() ? `?${sp}` : ""}`, { scroll: false });
    setShown(PAGE);
  };

  const list = useMemo(() => {
    const query = q.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    const out = drivers.filter(
      (d) =>
        (status === "champions" ? d.titles > 0 : status === "active" ? d.active : status === "retired" ? !d.active : true) &&
        (decade === "all" || d.decades.includes(decade)) &&
        (nation === "all" || d.natId === nation) &&
        (team === "all" || d.teams.some((x) => x.id === team)) &&
        (!query ||
          `${d.name} ${d.nat} ${d.teams.map((x) => x.name).join(" ")}`
            .toLowerCase()
            .normalize("NFD")
            .replace(/[̀-ͯ]/g, "")
            .includes(query)),
    );
    const cmp: Record<Sort, (a: DriverRow, b: DriverRow) => number> = {
      debut: (a, b) => a.from - b.from || a.last.localeCompare(b.last),
      wins: (a, b) => b.wins - a.wins || b.titles - a.titles || b.podiums - a.podiums || b.starts - a.starts,
      titles: (a, b) => b.titles - a.titles || b.wins - a.wins,
      starts: (a, b) => b.starts - a.starts,
      name: (a, b) => a.last.localeCompare(b.last),
    };
    return out.sort(cmp[sort]);
  }, [drivers, status, decade, nation, team, sort, q]);

  const reset = () => {
    setDecade("all");
    setNation("all");
    setTeam("all");
    setQ("");
    setStatus("all");
  };
  const labels: Record<Status, string> = { all: D.statusAll, champions: D.statusChampions, active: D.statusActive, retired: D.statusRetired };

  return (
    <div>
      <div className="chip-row" role="group" aria-label={t.common.status}>
        {STATUS.map((s) => (
          <button key={s} type="button" className="chip" aria-pressed={status === s} onClick={() => setStatus(s)}>
            {labels[s]}
          </button>
        ))}
      </div>
      <div className="flex-row mt-s" style={{ gap: 10 }}>
        <label className="field" style={{ flex: "1 1 220px" }}>
          <Search size={16} aria-hidden />
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setShown(PAGE);
            }}
            placeholder={D.searchPlaceholder}
            aria-label={D.searchLabel}
          />
        </label>
        <select className="select" aria-label={t.common.decade} value={decade} onChange={(e) => (setDecade(e.target.value === "all" ? "all" : Number(e.target.value)), setShown(PAGE))}>
          <option value="all">{t.common.allDecades}</option>
          {[1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020].map((d) => (
            <option key={d} value={d}>
              {d}s
            </option>
          ))}
        </select>
        <select className="select" aria-label={t.common.nationality} value={nation} onChange={(e) => (setNation(e.target.value), setShown(PAGE))}>
          <option value="all">{t.common.allNationalities}</option>
          {nations.map(([id, name]) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        <select className="select" aria-label={t.common.team} value={team} onChange={(e) => (setTeam(e.target.value), setShown(PAGE))} style={{ maxWidth: 220 }}>
          <option value="all">{t.common.allTeams}</option>
          {teams.map(([id, name]) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        <select className="select" aria-label={t.common.sortBy} value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
          <option value="wins">{D.sortWins}</option>
          <option value="titles">{D.sortTitles}</option>
          <option value="starts">{D.sortStarts}</option>
          <option value="debut">{D.sortDebut}</option>
          <option value="name">{D.sortName}</option>
        </select>
      </div>

      <p className="caption mt-s" aria-live="polite">
        {fmt(t.common.showing, { n: Math.min(shown, list.length), total: list.length })}
      </p>

      {list.length === 0 ? (
        <div className="pending mt-m">
          <p className="pending-title">{t.common.noMatches}</p>
          <button type="button" className="btn btn-ghost btn-sm" onClick={reset}>
            {t.common.resetFilters}
          </button>
        </div>
      ) : (
        <div className="grid grid-4 keep-2 mt-m">
          {list.slice(0, shown).map((d) => (
            <Link key={d.id} href={lp(lang, `/drivers/${d.id}`)} className="card">
              <div className="plate plate-flat ratio-portrait" style={{ background: d.photo ? "var(--paper-3)" : TONES[d.tone] }}>
                {d.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={d.photo} alt={d.name} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
                ) : (
                  <div className="plate-art" role="img" aria-label={`${d.name} — ${t.common.illustration}`}>
                    {d.titles ? <span className="plate-tag">{fmt(D.champion, { n: d.titles })}</span> : d.active ? <span className="plate-tag">{D.currentDriver}</span> : <span />}
                    <span className="plate-glyph" style={{ fontSize: "clamp(44px,6vw,72px)", letterSpacing: "-0.01em" }}>
                      {d.first[0]}
                      {d.last[0]}
                    </span>
                  </div>
                )}
              </div>
              <div className="card-body">
                <p className="card-meta">
                  {d.nat} · {d.from}–{d.active ? t.common.present : d.to}
                </p>
                <p className="card-title">{d.name}</p>
                <p className="small muted num">
                  {d.starts} {t.common.starts.toLowerCase()} · {d.wins} {t.common.wins.toLowerCase()}
                  {d.titles ? ` · ${d.titles}× 🏆` : ""}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
      {shown < list.length && (
        <div className="center mt-m">
          <button type="button" className="btn btn-ghost" onClick={() => setShown((s) => s + PAGE)}>
            {fmt(D.showMore, { n: Math.min(PAGE, list.length - shown) })}
          </button>
        </div>
      )}
    </div>
  );
}
