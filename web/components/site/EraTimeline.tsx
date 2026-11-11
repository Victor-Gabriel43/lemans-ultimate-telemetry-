"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Era } from "@/lib/f1/eras";
import { TONES } from "./tones";

/**
 * Interactive history timeline: select an era on the track (click or arrow
 * keys) to preview it, then open the full chapter.
 */
export function EraTimeline({ eras, dark = false }: { eras: Era[]; dark?: boolean }) {
  const [i, setI] = useState(0);
  const era = eras[i];
  const go = (n: number) => setI((n + eras.length) % eras.length);

  return (
    <div>
      <div
        className="tl-track"
        role="tablist"
        aria-label="Formula 1 eras"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(i + 1);
          if (e.key === "ArrowLeft") go(i - 1);
        }}
      >
        {eras.map((e, n) => (
          <button
            key={e.id}
            type="button"
            role="tab"
            className="tl-seg"
            aria-selected={n === i}
            tabIndex={n === i ? 0 : -1}
            onClick={() => setI(n)}
          >
            <span className="tl-seg-year">{e.decade}</span>
            <span className="tl-seg-name">{e.name}</span>
          </button>
        ))}
      </div>

      <div key={era.id} className="tab-panel grid grid-2" style={{ marginTop: 40, gap: "clamp(24px,4vw,56px)", alignItems: "center" }}>
        <div className="plate ratio-photo" style={{ background: TONES[era.tone] }}>
          <div className="plate-art">
            <span className="plate-tag">
              {era.start}–{Math.min(era.end, 2026)}
            </span>
            <span className="plate-glyph">{era.decade.slice(0, 4)}</span>
          </div>
        </div>
        <div>
          <p className={dark ? "kicker" : "kicker"}>{era.themes.join(" · ")}</p>
          <h3 className="title-1 mt-xs balance">{era.name}</h3>
          <p className={`mt-s ${dark ? "muted" : ""}`} style={{ fontSize: 19, lineHeight: 1.5 }}>
            {era.tagline}
          </p>
          <p className="mt-s muted pretty" style={{ fontSize: 15 }}>
            {era.intro}
          </p>
          <div className="flex-row mt-m">
            <Link href={`/history/${era.slug}`} className="btn btn-primary btn-sm">
              Read the {era.decade}
            </Link>
            <Link href={`/seasons?decade=${era.start}`} className="btn btn-ghost btn-sm">
              Seasons
            </Link>
            <span style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
              <button type="button" className="icon-btn" aria-label="Previous era" onClick={() => go(i - 1)} style={{ color: "inherit" }}>
                <ChevronLeft size={20} />
              </button>
              <button type="button" className="icon-btn" aria-label="Next era" onClick={() => go(i + 1)} style={{ color: "inherit" }}>
                <ChevronRight size={20} />
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
