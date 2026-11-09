"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { NoPhoto, PhotoFrame, type PhotoData } from "./Photo";
import { VerificationBadge } from "./Verification";
import type { LiveryDesign } from "@/lib/format";

export type CompareLivery = {
  slug: string; name: string; year: number; kind: string; kindLabel: string; team: string; numbers: string[]; championship: string; event: string;
  sponsors: string[]; drivers: string[]; background: string; inspiration: string; design: LiveryDesign; verification: string; isVariation: boolean; photo: PhotoData | null;
};

const PATTERN_LABEL: Record<string, string> = {
  works: "Works band: white upper body, black lower body, red sweep", stripes: "Multi-colour stripes flowing nose to tail", camo: "Development camouflage",
  split: "Two-tone split", band: "Horizontal band", gt1: "White base with sweeping twin stripes", rainbow: "Rainbow stripe set", solid: "Single solid colour", neutral: "Not documented",
};
const MAX = 4;

function Row({ label, render, chosen, cols }: { label: string; render: (l: CompareLivery) => React.ReactNode; chosen: CompareLivery[]; cols: string }) {
  return (
    <div className="border-t rule py-4">
      <p className="mb-3 font-semibold">{label}</p>
      <div className={`grid gap-6 ${cols}`}>
        {chosen.map((l) => <div key={l.slug} className="text-[15px] text-chalk/85">{render(l)}</div>)}
      </div>
    </div>
  );
}

export default function CompareTool({ liveries, initial, vehicleSlug }: { liveries: CompareLivery[]; initial: string[]; vehicleSlug: string }) {
  const [sel, setSel] = useState<string[]>(() => {
    const valid = initial.filter((s) => liveries.some((l) => l.slug === s));
    if (valid.length >= 2) return valid.slice(0, MAX);
    const pool = liveries.filter((l) => !l.isVariation && l.verification === "verified" && l.kind !== "test");
    const defaults = [pool[0], pool[Math.floor(pool.length / 2)], pool.at(-1)].filter(Boolean).map((l) => l!.slug);
    return [...new Set([...valid, ...defaults])].slice(0, 3);
  });

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("l", sel.join(","));
    window.history.replaceState(null, "", url);
  }, [sel]);

  const chosen = sel.map((s) => liveries.find((l) => l.slug === s)!).filter(Boolean);
  const toggle = (slug: string) => setSel((cur) => (cur.includes(slug) ? cur.filter((s) => s !== slug) : cur.length >= MAX ? cur : [...cur, slug]));

  const diff = useMemo(() => {
    const colourSets = chosen.map((l) => new Set([l.design.base, ...l.design.accents].map((c) => c.toLowerCase())));
    const sharedColours = colourSets.length ? [...colourSets[0]].filter((c) => colourSets.every((s) => s.has(c))) : [];
    const sponsorSets = chosen.map((l) => new Set(l.sponsors));
    const sharedSponsors = sponsorSets.length ? [...sponsorSets[0]].filter((s) => sponsorSets.every((x) => x.has(s))) : [];
    const samePattern = new Set(chosen.map((l) => l.design.pattern)).size === 1;
    return { sharedColours, sharedSponsors, samePattern };
  }, [chosen]);

  const cols = { 1: "md:grid-cols-1", 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-2 xl:grid-cols-4" }[Math.max(1, chosen.length) as 1 | 2 | 3 | 4];


  return (
    <div>
      <fieldset className="border-y rule py-4">
        <legend className="mb-3 text-fog">Choose up to {MAX} liveries. {sel.length} chosen.</legend>
        <div className="flex flex-wrap gap-2">
          {liveries.map((l) => {
            const on = sel.includes(l.slug);
            return (
              <button key={l.slug} onClick={() => toggle(l.slug)} aria-pressed={on} disabled={!on && sel.length >= MAX}
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors disabled:opacity-30 ${on ? "border-chalk bg-chalk text-black" : "rule text-fog hover:border-fog"}`}>
                <span className="h-3 w-3 rounded-full border border-black/30" style={{ background: l.design.accents[0] ?? l.design.base }} />
                {l.year}: {l.name}
              </button>
            );
          })}
        </div>
      </fieldset>

      {chosen.length < 2 ? <p className="py-16 text-center text-fog">Select at least two liveries to compare.</p> : (
        <div className="mt-10">
          <div className={`grid gap-6 ${cols}`}>
            {chosen.map((l) => (
              <div key={l.slug}>
                {l.photo ? <PhotoFrame p={l.photo} sizes="(min-width: 1024px) 33vw, 100vw" /> : <NoPhoto number={l.numbers[0]} />}
                <p className="mt-3 text-sm text-fog">{l.year}, {l.kindLabel.toLowerCase()}</p>
                <Link href={`/vehicles/${vehicleSlug}/liveries/${l.slug}`} className="display mt-1 block text-4xl hover:underline">{l.name}</Link>
                <div className="mt-2"><VerificationBadge status={l.verification} /></div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Row chosen={chosen} cols={cols} label="Year" render={(l) => <span className="text-chalk">{l.year}</span>} />
            <Row chosen={chosen} cols={cols} label="Team" render={(l) => l.team || "–"} />
            <Row chosen={chosen} cols={cols} label="Car numbers" render={(l) => (l.numbers.length ? l.numbers.map((n) => `#${n}`).join(", ") : "–")} />
            <Row chosen={chosen} cols={cols} label="Championship and event" render={(l) => <>{l.championship || "–"}<span className="block text-xs text-fog">{l.event}</span></>} />
            <Row chosen={chosen} cols={cols} label="Sponsors" render={(l) => (l.sponsors.length ? (
              <ul className="flex flex-wrap gap-1.5">
                {l.sponsors.map((s) => (
                  <li key={s} className={`rounded-full border px-2 py-0.5 text-xs ${diff.sharedSponsors.includes(s) ? "rule text-fog" : "border-lamp/50 text-lamp"}`}>{s}</li>
                ))}
              </ul>
            ) : "Not documented")} />
            <Row chosen={chosen} cols={cols} label="Main colours (approximate)" render={(l) => (
              <div className="flex flex-wrap gap-2">
                {[l.design.base, ...l.design.accents].map((c, i) => (
                  <span key={`${c}${i}`} title={c} className={`h-7 w-7 rounded-full border ${diff.sharedColours.includes(c.toLowerCase()) ? "rule" : "border-lamp"}`} style={{ background: c }} />
                ))}
              </div>
            )} />
            <Row chosen={chosen} cols={cols} label="Visual differences" render={(l) => (
              <>
                <p>{PATTERN_LABEL[l.design.pattern] ?? l.design.pattern}</p>
                <p className="mt-1 text-xs text-fog">
                  {diff.samePattern ? "Same layout as the others" : "Different layout"},{" "}
                  {[l.design.base, ...l.design.accents].filter((c) => !diff.sharedColours.includes(c.toLowerCase())).length} colours not shared
                  {l.isVariation ? ", a seasonal update of an earlier design" : ""}
                </p>
              </>
            )} />
            <Row chosen={chosen} cols={cols} label="Drivers" render={(l) => (l.drivers.length ? l.drivers.join(", ") : "Not documented")} />
            <Row chosen={chosen} cols={cols} label="Historical background" render={(l) => <p className="leading-relaxed">{l.background}</p>} />
            <Row chosen={chosen} cols={cols} label="Inspiration" render={(l) => <p className="leading-relaxed">{l.inspiration}</p>} />
          </div>
          <p className="mt-6 text-sm text-fog">Sponsors and colours outlined in amber are not shared by every selected livery. Colour swatches are approximations taken from photographs.</p>
        </div>
      )}
    </div>
  );
}
