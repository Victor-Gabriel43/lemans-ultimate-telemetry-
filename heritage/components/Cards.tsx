import Link from "next/link";
import { NoPhoto, PhotoFrame, type PhotoData } from "./Photo";
import { VerificationBadge } from "./Verification";
import { splitList, formatDate } from "@/lib/format";
import { LIVERY_KINDS } from "@/lib/vocab";

type VehicleCardData = {
  slug: string; model: string; fullName: string; category: string; debutYear: number; retiredYear: number | null; era: string; status: string; tagline: string;
  manufacturer: { name: string };
  _count?: { liveries: number; timeline: number; results: number };
};

export function VehicleCard({ v, photo }: { v: VehicleCardData; photo?: PhotoData | null }) {
  const inResearch = v.status === "in-research";
  const years = `${v.debutYear}${v.retiredYear && v.retiredYear !== v.debutYear ? `–${v.retiredYear}` : v.era === "modern" && !v.retiredYear ? " to present" : ""}`;
  return (
    <Link href={`/vehicles/${v.slug}`} className="group block">
      {photo ? (
        <PhotoFrame p={photo} credit="plain" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
      ) : (
        <NoPhoto number={v.model} note={inResearch ? "Profile in research" : "No licensed photograph archived yet"} />
      )}
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="display text-4xl group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4">{v.fullName}</h3>
        <span className="text-sm whitespace-nowrap text-fog">{years}</span>
      </div>
      <p className="mt-1 text-[15px] text-fog">{v.category}</p>
      {v._count?.liveries ? <p className="mt-1 text-[15px]">{v._count.liveries} liveries, {v._count.results} results documented</p> : null}
      {inResearch ? <p className="mt-1 text-[15px] text-lamp">History still being researched</p> : null}
    </Link>
  );
}

type LiveryCardData = {
  slug: string; name: string; kind: string; year: number; carNumbers: string; verification: string; isVariation: boolean;
  firstUsed: Date | null; event: string;
  team: { name: string } | null;
};

export function LiveryCard({ l, vehicleSlug, photo }: { l: LiveryCardData; vehicleSlug: string; photo?: PhotoData | null }) {
  const numbers = splitList(l.carNumbers);
  // Only overlay a number when the livery belongs to a single car, so it always matches the photo.
  const number = numbers.length === 1 ? numbers[0] : undefined;
  const overlay = number ? (
    <span aria-hidden className="race-number pointer-events-none absolute right-3 bottom-1 text-[6.5rem] drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">{number}</span>
  ) : null;
  return (
    <Link href={`/vehicles/${vehicleSlug}/liveries/${l.slug}`} className="group block">
      {photo ? <PhotoFrame p={photo} credit="plain" overlay={overlay} sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw" /> : <NoPhoto number={number} />}
      <p className="mt-3 text-sm text-fog">
        {l.year}, {LIVERY_KINDS[l.kind]?.toLowerCase() ?? l.kind}
        {l.isVariation ? ", seasonal update" : ""}
      </p>
      <h3 className="mt-1 text-lg leading-snug font-semibold group-hover:underline group-hover:underline-offset-4">{l.name}</h3>
      <p className="mt-1 text-sm text-fog">
        {l.team?.name ?? "Manufacturer"}
        {numbers.length ? `, #${numbers.join(" #")}` : ""}
        {l.firstUsed ? `. First seen ${formatDate(l.firstUsed)}` : ""}
      </p>
      <div className="mt-1"><VerificationBadge status={l.verification} compact /></div>
    </Link>
  );
}
