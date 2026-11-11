import Link from "next/link";
import type { Driver } from "@/lib/f1/drivers";
import type { Team } from "@/lib/f1/teams";
import type { Car } from "@/lib/f1/cars";
import type { Circuit } from "@/lib/f1/circuits";
import { driverTitles, constructorTitles } from "@/lib/f1/seasons";
import { Plate } from "./ui";

export function DriverCard({ d }: { d: Driver }) {
  const titles = driverTitles(d.slug);
  return (
    <Link href={`/drivers/${d.slug}`} className="card">
      <Plate
        alt={`Portrait of ${d.name}`}
        mediaId={`driver-${d.slug}`}
        tone={d.tone}
        ratio="ratio-portrait"
        flat
        tag={titles.length ? `${titles.length}× champion` : d.active ? "Current driver" : undefined}
        glyph={
          <span style={{ fontSize: "clamp(44px,6vw,72px)", letterSpacing: "-0.01em" }}>
            {d.firstName[0]}
            {d.lastName[0]}
          </span>
        }
      />
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

export function TeamCard({ t }: { t: Team }) {
  const titles = constructorTitles(t.slug);
  return (
    <Link href={`/teams/${t.slug}`} className="card">
      <div style={{ height: 6, background: t.color }} aria-hidden />
      <div className="card-body" style={{ paddingTop: 22 }}>
        <p className="card-meta">
          {t.base} · {t.firstSeason}–{t.active ? "present" : t.lastSeason}
        </p>
        <p className="card-title">{t.name}</p>
        <p className="small muted pretty">{t.summary}</p>
        <div className="flex-row" style={{ marginTop: "auto", paddingTop: 14, gap: 8 }}>
          {titles.length > 0 && <span className="badge badge-red">{titles.length} constructors&apos; titles</span>}
          <span className="badge">{t.active ? "On the 2026 grid" : "Historic"}</span>
        </div>
      </div>
    </Link>
  );
}

export function CarCard({ c, priority = false }: { c: Car; priority?: boolean }) {
  return (
    <Link href={`/cars/${c.slug}`} className="card">
      <Plate
        alt={`${c.name}`}
        mediaId={`car-${c.slug}`}
        tone={c.tone}
        ratio="ratio-photo"
        flat
        tag={c.seasons}
        glyph={c.year}
        glyphSize="sm"
        priority={priority}
      />
      <div className="card-body">
        <p className="card-meta">{c.team}</p>
        <p className="card-title">{c.name}</p>
        <p className="small muted pretty">{c.headline}</p>
      </div>
    </Link>
  );
}

export function CircuitCard({ c }: { c: Circuit }) {
  return (
    <Link href={`/circuits/${c.slug}`} className="card">
      <Plate
        alt={`${c.name}`}
        mediaId={`circuit-${c.slug}`}
        tone={c.tone}
        ratio="ratio-photo"
        flat
        tag={`${c.type} · since ${c.firstGrandPrix}`}
        glyph={
          <span
            style={{
              fontSize: c.shortName.length > 11 ? "clamp(24px,3vw,38px)" : "clamp(32px,4.4vw,56px)",
              letterSpacing: "-0.03em",
              display: "block",
              overflowWrap: "anywhere",
            }}
          >
            {c.shortName}
          </span>
        }
      />
      <div className="card-body">
        <p className="card-meta">
          {c.location}, {c.country}
        </p>
        <p className="card-title">{c.name}</p>
        <p className="small muted pretty">{c.summary}</p>
      </div>
    </Link>
  );
}
