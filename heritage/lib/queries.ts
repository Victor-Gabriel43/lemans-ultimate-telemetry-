import { cache } from "react";
import type { Prisma } from "@prisma/client";
import { db } from "./db";

/** Sources cited by a set of records, grouped by entity id. */
export async function sourcesFor(entityType: string, ids: string[]) {
  if (!ids.length) return new Map<string, SourceRow[]>();
  const refs = await db.sourceRef.findMany({ where: { entityType, entityId: { in: ids } }, include: { source: true } });
  const map = new Map<string, SourceRow[]>();
  for (const r of refs) {
    const list = map.get(r.entityId) ?? [];
    list.push(r.source);
    map.set(r.entityId, list);
  }
  return map;
}
export type SourceRow = Prisma.SourceGetPayload<object>;

export const getVehicle = cache(async (slug: string) =>
  db.vehicle.findUnique({
    where: { slug },
    include: {
      manufacturer: true,
      specs: { orderBy: { order: "asc" } },
      photos: { orderBy: { order: "asc" } },
      entries: {
        include: { team: true, championship: true, drivers: { include: { driver: true } } },
        orderBy: [{ season: "asc" }, { carNumber: "asc" }],
      },
      results: {
        include: { event: { include: { championship: true } }, entry: { include: { team: true, drivers: { include: { driver: true } } } } },
        orderBy: { event: { date: "asc" } },
      },
      liveries: { include: { team: true, championship: true, photos: true }, orderBy: [{ year: "asc" }, { firstUsed: "asc" }] },
    },
  }),
);
export type VehicleFull = NonNullable<Awaited<ReturnType<typeof getVehicle>>>;

export const getLivery = cache(async (slug: string) =>
  db.livery.findUnique({
    where: { slug },
    include: {
      vehicle: { include: { manufacturer: true } },
      team: true,
      championship: true,
      parent: true,
      variants: { orderBy: { year: "asc" } },
      drivers: { include: { driver: true } },
      photos: { orderBy: { order: "asc" } },
      timeline: { orderBy: { date: "asc" } },
    },
  }),
);

export const getTimeline = cache(async (vehicleId: string) =>
  db.timelineEntry.findMany({ where: { vehicleId }, include: { team: true, livery: { include: { photos: true } }, photos: true }, orderBy: { date: "asc" } }),
);

export type CatalogFilters = {
  q?: string; manufacturer?: string; category?: string; year?: string; championship?: string; team?: string; country?: string; era?: string; sort?: string;
};

export async function searchVehicles(f: CatalogFilters) {
  const where: Prisma.VehicleWhereInput = { AND: [] };
  const and = where.AND as Prisma.VehicleWhereInput[];
  if (f.q) and.push({ OR: [{ fullName: { contains: f.q } }, { model: { contains: f.q } }, { category: { contains: f.q } }, { manufacturer: { name: { contains: f.q } } }] });
  if (f.manufacturer) and.push({ manufacturer: { slug: f.manufacturer } });
  if (f.category) and.push({ category: f.category });
  if (f.era) and.push({ era: f.era });
  if (f.country) and.push({ country: f.country });
  if (f.year) {
    const y = Number(f.year);
    and.push({ debutYear: { lte: y }, OR: [{ retiredYear: null }, { retiredYear: { gte: y } }] });
  }
  if (f.championship) and.push({ entries: { some: { championship: { slug: f.championship } } } });
  if (f.team) and.push({ entries: { some: { team: { slug: f.team } } } });

  const orderBy: Prisma.VehicleOrderByWithRelationInput[] =
    f.sort === "oldest" ? [{ debutYear: "asc" }] : f.sort === "name" ? [{ fullName: "asc" }] : f.sort === "recent" ? [{ createdAt: "desc" }] : [{ status: "desc" }, { debutYear: "desc" }];

  return db.vehicle.findMany({
    where,
    orderBy,
    include: { manufacturer: true, _count: { select: { liveries: true, timeline: true, results: true } } },
  });
}

export async function catalogFacets() {
  const [manufacturers, championships, teams, vehicles] = await Promise.all([
    db.manufacturer.findMany({ orderBy: { name: "asc" } }),
    db.championship.findMany({ orderBy: { name: "asc" } }),
    db.team.findMany({ orderBy: { name: "asc" } }),
    db.vehicle.findMany({ select: { category: true, country: true, debutYear: true } }),
  ]);
  const uniq = <T,>(a: T[]) => [...new Set(a)].sort();
  return {
    manufacturers, championships, teams,
    categories: uniq(vehicles.map((v) => v.category)),
    countries: uniq(vehicles.map((v) => v.country)),
    years: uniq(vehicles.map((v) => v.debutYear)).reverse(),
  };
}

export async function globalSearch(q: string) {
  const term = q.trim();
  if (term.length < 2) return null;
  const [vehicles, liveries, teams, drivers, timeline, events] = await Promise.all([
    db.vehicle.findMany({ where: { OR: [{ fullName: { contains: term } }, { category: { contains: term } }, { summary: { contains: term } }] }, include: { manufacturer: true }, take: 20 }),
    db.livery.findMany({ where: { OR: [{ name: { contains: term } }, { sponsors: { contains: term } }, { inspiration: { contains: term } }, { event: { contains: term } }, { carNumbers: { contains: term } }] }, include: { vehicle: true, team: true }, take: 30 }),
    db.team.findMany({ where: { name: { contains: term } }, take: 10 }),
    db.driver.findMany({ where: { name: { contains: term } }, take: 20 }),
    db.timelineEntry.findMany({ where: { OR: [{ title: { contains: term } }, { description: { contains: term } }] }, include: { vehicle: true }, take: 20, orderBy: { date: "asc" } }),
    db.event.findMany({ where: { OR: [{ name: { contains: term } }, { circuit: { contains: term } }] }, include: { results: { include: { vehicle: true } } }, take: 20, orderBy: { date: "asc" } }),
  ]);
  return { vehicles, liveries, teams, drivers, timeline, events };
}
