"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { lp, type Lang } from "@/lib/i18n/config";
import type { Tone } from "@/lib/f1/types";
import { TONES } from "./tones";

export type EraLite = { id: string; slug: string; decade: string; start: number; end: number; name: string; tagline: string; intro: string; themes: string[]; tone: Tone; photo?: { src: string; credit: string; license: string; label: string } };

/** Interactive history timeline: pick an era (click or arrow keys) to preview, then open the chapter. */
export function EraTimeline({ eras, lang, labels }: { eras: EraLite[]; lang: Lang; labels: { read: string; seasons: string; prev: string; next: string; tablist: string } }) {
  const [i, setI] = useState(0);
  const era = eras[i];
  const go = (n: number) => setI((n + eras.length) % eras.length);

  return (
    <div>
      <div
        className="tl-track"
        role="tablist"
        aria-label={labels.tablist}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(i + 1);
          if (e.key === "ArrowLeft") go(i - 1);
        }}
      >
        {eras.map((e, n) => (
          <button key={e.id} type="button" role="tab" className="tl-seg" aria-selected={n === i} tabIndex={n === i ? 0 : -1} onClick={() => setI(n)}>
            <span className="tl-seg-year">{e.decade}</span>
            <span className="tl-seg-name">{e.name}</span>
          </button>
        ))}
      </div>

      <div key={era.id} className="tab-panel grid grid-2" style={{ marginTop: 40, gap: "clamp(24px,4vw,56px)", alignItems: "center" }}>
        <figure>
          <div className="plate ratio-photo" style={era.photo ? undefined : { background: TONES[era.tone] }}>
            {era.photo ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={era.photo.src} alt={era.photo.label} decoding="async" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                <span className="plate-tag" style={{ position: "absolute", top: 16, left: 16, color: "#fff" }}>
                  {era.start}–{Math.min(era.end, 2026)}
                </span>
                <span className="plate-credit">{era.photo.credit} · {era.photo.license}</span>
              </>
            ) : (
              <div className="plate-art">
                <span className="plate-tag">
                  {era.start}–{Math.min(era.end, 2026)}
                </span>
                <span className="plate-glyph">{era.decade.slice(0, 4)}</span>
              </div>
            )}
          </div>
          {era.photo && <figcaption className="caption mt-xs">{era.photo.label}</figcaption>}
        </figure>
        <div>
          <p className="kicker">{era.themes.join(" · ")}</p>
          <h3 className="title-1 mt-xs balance">{era.name}</h3>
          <p className="mt-s" style={{ fontSize: 19, lineHeight: 1.5 }}>
            {era.tagline}
          </p>
          <p className="mt-s muted pretty" style={{ fontSize: 15 }}>
            {era.intro}
          </p>
          <div className="flex-row mt-m">
            <Link href={lp(lang, `/history/${era.slug}`)} className="btn btn-primary btn-sm">
              {labels.read.replace("{d}", era.decade)}
            </Link>
            <Link href={lp(lang, `/seasons?decade=${era.start}`)} className="btn btn-ghost btn-sm">
              {labels.seasons}
            </Link>
            <span style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
              <button type="button" className="icon-btn" aria-label={labels.prev} onClick={() => go(i - 1)} style={{ color: "inherit" }}>
                <ChevronLeft size={20} />
              </button>
              <button type="button" className="icon-btn" aria-label={labels.next} onClick={() => go(i + 1)} style={{ color: "inherit" }}>
                <ChevronRight size={20} />
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
