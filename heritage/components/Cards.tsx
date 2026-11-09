import Link from "next/link";
import LiveryArt from "./LiveryArt";
import { VerificationBadge } from "./Verification";
import { parseDesign, splitList, formatDate } from "@/lib/format";
import { LIVERY_KINDS } from "@/lib/vocab";

type VehicleCardData = {
  slug: string; fullName: string; category: string; debutYear: number; retiredYear: number | null; era: string; status: string; tagline: string;
  manufacturer: { name: string };
  _count?: { liveries: number; timeline: number; results: number };
};

const NEUTRAL = { base: "#2a2a2e", accents: ["#3a3a40"], pattern: "solid" };

export function VehicleCard({ v, design }: { v: VehicleCardData; design?: string | null }) {
  const inResearch = v.status === "in-research";
  return (
    <Link href={`/vehicles/${v.slug}`} className="group relative flex flex-col overflow-hidden rounded-sm border hairline bg-carbon transition-colors hover:border-mute">
      <div className="relative bg-gradient-to-b from-graphite to-carbon px-4 pt-8 pb-2">
        <LiveryArt design={design ? parseDesign(design) : NEUTRAL} caption={false} title={v.fullName} className={`transition-transform duration-700 group-hover:scale-[1.03] ${inResearch ? "opacity-40 grayscale" : ""}`} />
        {inResearch ? (
          <span className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.18em] text-amber uppercase">Profile in research</span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="eyebrow">{v.manufacturer.name} · {v.category}</p>
        <h3 className="display text-3xl">{v.fullName}</h3>
        <p className="text-sm text-mute">{v.tagline}</p>
        <div className="mt-auto flex items-center justify-between pt-4 font-mono text-[11px] text-mute">
          <span>
            {v.debutYear}
            {v.retiredYear ? `–${v.retiredYear}` : v.era === "modern" ? "–present" : ""}
          </span>
          {v._count && v._count.liveries ? <span>{v._count.liveries} liveries · {v._count.results} results</span> : <span className="uppercase tracking-widest">{v.era}</span>}
        </div>
      </div>
    </Link>
  );
}

type LiveryCardData = {
  slug: string; name: string; kind: string; year: number; carNumbers: string; design: string; verification: string; isVariation: boolean;
  firstUsed: Date | null; event: string;
  team: { name: string } | null;
  vehicle?: { slug: string };
};

export function LiveryCard({ l, vehicleSlug }: { l: LiveryCardData; vehicleSlug: string }) {
  const number = splitList(l.carNumbers)[0];
  return (
    <Link href={`/vehicles/${vehicleSlug}/liveries/${l.slug}`} className="group flex flex-col overflow-hidden rounded-sm border hairline bg-carbon transition-colors hover:border-mute">
      <div className="bg-gradient-to-b from-graphite to-carbon px-3 pt-6 pb-1">
        <LiveryArt design={parseDesign(l.design)} number={number} caption={false} title={l.name} className="transition-transform duration-700 group-hover:scale-[1.04]" />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="eyebrow">{l.year} · {LIVERY_KINDS[l.kind] ?? l.kind}</p>
          <VerificationBadge status={l.verification} compact />
        </div>
        <h3 className="text-lg leading-snug">{l.name}</h3>
        <p className="mt-auto pt-2 text-xs text-mute">
          {l.team?.name ?? "Manufacturer"}
          {l.carNumbers ? ` · #${splitList(l.carNumbers).join(" #")}` : ""}
          {l.isVariation ? " · seasonal variation" : ""}
        </p>
        {l.firstUsed ? <p className="font-mono text-[10px] text-mute">First seen {formatDate(l.firstUsed)}</p> : null}
      </div>
    </Link>
  );
}
