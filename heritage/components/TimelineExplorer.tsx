"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Credit, type PhotoData } from "./Photo";
import { VerificationBadge } from "./Verification";

export type TLItem = {
  id: string; dateLabel: string; year: number; title: string; description: string; category: string; categoryLabel: string;
  milestone: boolean; verification: string;
  team: { name: string; slug: string } | null;
  livery: { name: string; slug: string } | null;
  photo: PhotoData | null;
  sources: { id: string; title: string; publisher: string; url: string }[];
};

export default function TimelineExplorer({ items, vehicleSlug }: { items: TLItem[]; vehicleSlug: string }) {
  const years = useMemo(() => [...new Set(items.map((i) => i.year))], [items]);
  const [year, setYear] = useState<number | "all">("all");
  const [cat, setCat] = useState("");
  const cats = useMemo(() => [...new Map(items.map((i) => [i.category, i.categoryLabel])).entries()], [items]);

  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (hash) document.getElementById(hash)?.scrollIntoView({ block: "start" });
  }, []);

  const shown = items.filter((i) => (year === "all" || i.year === year) && (!cat || i.category === cat));
  const idx = year === "all" ? -1 : years.indexOf(year);
  const pill = (on: boolean) => `rounded-full px-4 py-1.5 text-[15px] ${on ? "bg-chalk text-black" : "text-fog hover:text-chalk"}`;

  return (
    <div>
      <div className="sticky top-14 z-20 -mx-4 border-y rule bg-black/90 px-4 py-3 backdrop-blur sm:mx-0 sm:px-0">
        <div className="flex flex-wrap items-center gap-1">
          <button onClick={() => setYear("all")} className={pill(year === "all")}>All years</button>
          {years.map((y) => <button key={y} onClick={() => setYear(y)} aria-pressed={year === y} className={pill(year === y)}>{y}</button>)}
          <select value={cat} onChange={(e) => setCat(e.target.value)} aria-label="Show only one kind of event" className="ml-2 rounded-full border rule bg-black px-3 py-1.5 text-[15px]">
            <option value="">Every kind of event</option>
            {cats.map(([k, label]) => <option key={k} value={k}>{label}</option>)}
          </select>
          {year !== "all" ? (
            <span className="ml-auto flex gap-2">
              <button disabled={idx <= 0} onClick={() => setYear(years[idx - 1])} className="rounded-full border rule px-4 py-1.5 disabled:opacity-30">Previous season</button>
              <button disabled={idx >= years.length - 1} onClick={() => setYear(years[idx + 1])} className="rounded-full border rule px-4 py-1.5 disabled:opacity-30">Next season</button>
            </span>
          ) : null}
        </div>
      </div>

      <ol className="mt-12">
        {shown.map((i, n) => {
          const newYear = n === 0 || shown[n - 1].year !== i.year;
          return (
            <li key={i.id} id={i.id} className="scroll-mt-32">
              {newYear ? <p className="display mt-16 mb-8 border-b rule pb-2 text-[clamp(5rem,12vw,10rem)] text-asphalt">{i.year}</p> : null}
              <div className={`grid gap-8 pb-16 ${i.photo ? "lg:grid-cols-[minmax(0,1.25fr)_1fr]" : "lg:grid-cols-[minmax(0,1.25fr)_1fr] lg:[&>div]:col-start-2"}`}>
                {i.photo ? (
                  <figure className="min-w-0">
                    <div className="relative aspect-[3/2] overflow-hidden bg-pit">
                      <Image src={i.photo.url} unoptimized={i.photo.url.startsWith("http")} alt={i.photo.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" style={{ objectPosition: i.photo.focal }} />
                    </div>
                    <figcaption className="mt-2"><Credit p={i.photo} /></figcaption>
                  </figure>
                ) : null}
                <div className="min-w-0 lg:pt-2">
                  <p className="text-lamp">{i.dateLabel}</p>
                  <p className="mt-1 text-sm text-fog">{i.categoryLabel}{i.milestone ? ", milestone" : ""}</p>
                  <h2 className="display mt-3 text-[clamp(2.5rem,4vw,3.75rem)]">{i.title}</h2>
                  <p className="essay mt-4">{i.description}</p>
                  <dl className="mt-6 grid grid-cols-2 gap-4 text-[15px]">
                    <div><dt className="text-fog">Team</dt><dd className="mt-0.5">{i.team ? <Link className="underline underline-offset-4" href={`/teams/${i.team.slug}`}>{i.team.name}</Link> : "–"}</dd></div>
                    <div><dt className="text-fog">Livery</dt><dd className="mt-0.5">{i.livery ? <Link className="underline underline-offset-4" href={`/vehicles/${vehicleSlug}/liveries/${i.livery.slug}`}>{i.livery.name}</Link> : "–"}</dd></div>
                  </dl>
                  <div className="mt-4"><VerificationBadge status={i.verification} compact /></div>
                  <ul className="mt-4 space-y-1">
                    {i.sources.map((s) => (
                      <li key={s.id} className="text-sm"><a href={s.url} target="_blank" rel="noreferrer noopener" className="text-fog underline decoration-asphalt underline-offset-2 hover:text-chalk">{s.publisher}: {s.title}</a></li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
