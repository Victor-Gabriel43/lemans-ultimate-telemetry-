import type { Prisma } from "@prisma/client";
import { db } from "./db";

export type LiveryFilters = { q?: string; year?: string; team?: string; number?: string; championship?: string; kind?: string; variations?: string };

export async function findLiveries(f: LiveryFilters, vehicleId?: string) {
  const and: Prisma.LiveryWhereInput[] = [];
  if (vehicleId) and.push({ vehicleId });
  if (f.q) and.push({ OR: [{ name: { contains: f.q } }, { sponsors: { contains: f.q } }, { event: { contains: f.q } }, { inspiration: { contains: f.q } }] });
  if (f.year) and.push({ year: Number(f.year) });
  if (f.team) and.push({ team: { slug: f.team } });
  if (f.championship) and.push({ championship: { slug: f.championship } });
  if (f.kind) and.push({ kind: f.kind });
  if (f.variations === "hide") and.push({ isVariation: false });
  let rows = await db.livery.findMany({
    where: { AND: and },
    include: { team: true, championship: true, vehicle: true },
    orderBy: [{ year: "asc" }, { firstUsed: "asc" }],
  });
  // Car numbers are stored as a list ("5, 6, 75"); match whole numbers only.
  if (f.number) rows = rows.filter((l) => l.carNumbers.split(",").map((n) => n.trim()).includes(f.number!));
  return rows;
}

export async function liveryFacets(vehicleId?: string) {
  const all = await db.livery.findMany({ where: vehicleId ? { vehicleId } : {}, include: { team: true, championship: true } });
  const uniq = <T,>(a: T[]) => [...new Set(a)];
  return {
    years: uniq(all.map((l) => l.year)).sort(),
    teams: [...new Map(all.filter((l) => l.team).map((l) => [l.team!.slug, l.team!.name])).entries()],
    championships: [...new Map(all.filter((l) => l.championship).map((l) => [l.championship!.slug, l.championship!.shortName])).entries()],
    numbers: uniq(all.flatMap((l) => l.carNumbers.split(",").map((n) => n.trim()).filter(Boolean))).sort((a, b) => Number(a) - Number(b)),
    kinds: uniq(all.map((l) => l.kind)),
  };
}
