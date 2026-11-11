import Link from "next/link";
import type { Driver } from "@/lib/f1/drivers";
import type { MediaAsset } from "@/lib/f1/media";
import { TONES } from "./tones";

/** Client-safe driver card (no server-only media lookup). Titles are precomputed. */
export function DriverCardClient({ d }: { d: Driver & { titles: number[]; media?: MediaAsset } }) {
  return (
    <Link href={`/drivers/${d.slug}`} className="card">
      <div className="plate plate-flat ratio-portrait" style={{ background: TONES[d.tone] }}>
        {d.media ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={d.media.src} alt={`Portrait of ${d.name}`} loading="lazy" />
        ) : (
        <div className="plate-art" role="img" aria-label={`${d.name} — illustration; licensed portrait to be added`}>
          {d.titles.length ? <span className="plate-tag">{d.titles.length}× champion</span> : d.active ? <span className="plate-tag">Current driver</span> : <span />}
          <span className="plate-glyph" style={{ fontSize: "clamp(44px,6vw,72px)", letterSpacing: "-0.01em" }}>
            {d.firstName[0]}
            {d.lastName[0]}
          </span>
        </div>
        )}
      </div>
      <div className="card-body">
        <p className="card-meta">
          {d.nationality} · {d.firstSeason}–{d.lastSeason ?? "present"}
        </p>
        <p className="card-title">{d.name}</p>
        <p className="small muted">{d.knownFor}</p>
      </div>
    </Link>
  );
}
