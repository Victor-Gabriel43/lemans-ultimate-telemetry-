"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import LiveryArt from "./LiveryArt";
import { VerificationBadge } from "./Verification";
import type { LiveryDesign } from "@/lib/format";

export type TLItem = {
  id: string; date: string; dateLabel: string; year: number; title: string; description: string; category: string; categoryLabel: string;
  milestone: boolean; verification: string;
  team: { name: string; slug: string } | null;
  livery: { name: string; slug: string; design: LiveryDesign; number?: string } | null;
  photo: { url: string; alt: string; credit: string } | null;
  sources: { id: string; title: string; publisher: string; url: string }[];
};

export default function TimelineExplorer({ items, vehicleSlug }: { items: TLItem[]; vehicleSlug: string }) {
  const years = useMemo(() => [...new Set(items.map((i) => i.year))], [items]);
  const [year, setYear] = useState<number | "all">("all");
  const [cat, setCat] = useState<string>("");
  const cats = useMemo(() => [...new Map(items.map((i) => [i.category, i.categoryLabel])).entries()], [items]);

  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (hash) document.getElementById(hash)?.scrollIntoView({ block: "center" });
  }, []);

  const shown = items.filter((i) => (year === "all" || i.year === year) && (!cat || i.category === cat));
  const idx = year === "all" ? -1 : years.indexOf(year);

  return (
    <div>
      <div className="sticky top-16 z-20 -mx-4 border-y hairline bg-ink/90 px-4 py-3 backdrop-blur sm:mx-0 sm:px-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="eyebrow mr-2">Season</span>
          <button onClick={() => setYear("all")} className={`rounded-full px-3 py-1 text-sm ${year === "all" ? "bg-paper text-ink" : "text-soft hover:text-paper"}`}>All</button>
          {years.map((y) => (
            <button key={y} onClick={() => setYear(y)} aria-pressed={year === y} className={`rounded-full px-3 py-1 font-mono text-sm ${year === y ? "bg-paper text-ink" : "text-soft hover:text-paper"}`}>{y}</button>
          ))}
          <span className="mx-2 hidden h-4 w-px bg-line sm:block" />
          <select value={cat} onChange={(e) => setCat(e.target.value)} aria-label="Filter by type" className="border-b hairline bg-ink py-1 text-sm">
            <option value="">All events</option>
            {cats.map(([k, label]) => <option key={k} value={k}>{label}</option>)}
          </select>
          {year !== "all" ? (
            <span className="ml-auto flex gap-2 text-sm">
              <button disabled={idx <= 0} onClick={() => setYear(years[idx - 1])} className="rounded-full border hairline px-3 py-1 disabled:opacity-30">← {years[idx - 1] ?? ""}</button>
              <button disabled={idx >= years.length - 1} onClick={() => setYear(years[idx + 1])} className="rounded-full border hairline px-3 py-1 disabled:opacity-30">{years[idx + 1] ?? ""} →</button>
            </span>
          ) : null}
        </div>
      </div>

      <ol className="relative mt-12 border-l hairline">
        {shown.map((i, n) => {
          const newYear = n === 0 || shown[n - 1].year !== i.year;
          return (
            <li key={i.id} id={i.id} className="relative scroll-mt-40 pb-16 pl-8 md:pl-14">
              {newYear ? <p className="display -ml-8 mb-8 text-6xl text-line md:-ml-14 md:text-8xl">{i.year}</p> : null}
              <div className="relative grid gap-8 lg:grid-cols-[1fr_minmax(0,520px)]">
                <span aria-hidden className={`absolute top-1.5 -left-[37px] h-2.5 w-2.5 rounded-full md:-left-[61px] ${i.milestone ? "bg-signal" : "bg-mute"}`} />
                <div>
                  <p className="font-mono text-sm text-amber">{i.dateLabel}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="eyebrow">{i.categoryLabel}</span>
                    {i.milestone ? <span className="eyebrow text-signal">· Milestone</span> : null}
                    <VerificationBadge status={i.verification} compact />
                  </div>
                  <h2 className="display mt-3 text-3xl md:text-4xl">{i.title}</h2>
                  <p className="mt-4 max-w-xl leading-relaxed text-soft">{i.description}</p>
                  <dl className="mt-6 grid max-w-xl grid-cols-2 gap-4 text-sm">
                    <div><dt className="eyebrow">Team</dt><dd className="mt-1">{i.team ? <Link className="hover:underline" href={`/teams/${i.team.slug}`}>{i.team.name}</Link> : "—"}</dd></div>
                    <div><dt className="eyebrow">Livery used</dt><dd className="mt-1">{i.livery ? <Link className="hover:underline" href={`/vehicles/${vehicleSlug}/liveries/${i.livery.slug}`}>{i.livery.name}</Link> : "—"}</dd></div>
                  </dl>
                  <ul className="mt-5 space-y-1">
                    {i.sources.map((s) => (
                      <li key={s.id} className="text-xs">
                        <a href={s.url} target="_blank" rel="noreferrer noopener" className="text-mute hover:text-amber">↗ {s.publisher} — {s.title}</a>
                      </li>
                    ))}
                  </ul>
                </div>
                <figure className="self-start overflow-hidden rounded-sm border hairline bg-gradient-to-b from-graphite to-carbon p-4">
                  {i.photo ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={i.photo.url} alt={i.photo.alt} loading="lazy" className="w-full" />
                      <figcaption className="mt-2 font-mono text-[10px] text-mute">© {i.photo.credit}</figcaption>
                    </>
                  ) : i.livery ? (
                    <LiveryArt design={i.livery.design} number={i.livery.number} title={i.livery.name} />
                  ) : (
                    <div className="flex aspect-[10/3] items-center justify-center font-mono text-[11px] tracking-widest text-mute uppercase">Photograph not yet archived</div>
                  )}
                </figure>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
