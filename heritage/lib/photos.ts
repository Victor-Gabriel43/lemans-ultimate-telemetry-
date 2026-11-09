import { db } from "./db";
import type { PhotoData } from "@/components/Photo";

type Row = Awaited<ReturnType<typeof db.photo.findMany>>[number];
export const asPhoto = (p: Row): PhotoData => ({
  id: p.id, url: p.url, alt: p.alt, caption: p.caption, credit: p.credit, license: p.license, licenseUrl: p.licenseUrl,
  sourceUrl: p.sourceUrl, takenAt: p.takenAt, width: p.width, height: p.height, focal: p.focal, view: p.view,
});

const rank = (p: Row) => (p.view === "main" ? 0 : 1) * 1000 + p.order;

/** Lead photograph for each livery. */
export async function liveryCovers(liveryIds: string[]) {
  const rows = await db.photo.findMany({ where: { liveryId: { in: liveryIds } } });
  const map = new Map<string, PhotoData>();
  for (const p of rows.sort((a, b) => rank(a) - rank(b))) if (p.liveryId && !map.has(p.liveryId)) map.set(p.liveryId, asPhoto(p));
  return map;
}

/** Lead photograph for each vehicle: its own main photo, else its hero livery's. */
export async function vehicleCovers(vehicles: { id: string; heroLiveryId: string | null }[]) {
  const own = await db.photo.findMany({ where: { vehicleId: { in: vehicles.map((v) => v.id) } }, orderBy: { order: "asc" } });
  const liv = await liveryCovers(vehicles.map((v) => v.heroLiveryId).filter(Boolean) as string[]);
  const map = new Map<string, PhotoData>();
  for (const v of vehicles) {
    const o = own.find((p) => p.vehicleId === v.id);
    const c = o ? asPhoto(o) : v.heroLiveryId ? liv.get(v.heroLiveryId) : undefined;
    if (c) map.set(v.id, c);
  }
  return map;
}
