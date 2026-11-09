import type { MetadataRoute } from "next";
import { db } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.SITE_URL ?? "http://localhost:3100";
  const [vehicles, liveries, teams, drivers] = await Promise.all([
    db.vehicle.findMany({ select: { slug: true, updatedAt: true, status: true } }),
    db.livery.findMany({ select: { slug: true, vehicle: { select: { slug: true } } } }),
    db.team.findMany({ select: { slug: true } }),
    db.driver.findMany({ select: { slug: true } }),
  ]);
  return [
    ...["", "/vehicles", "/liveries", "/teams", "/drivers", "/sources"].map((p) => ({ url: `${base}${p}` })),
    ...vehicles.flatMap((v) => [
      { url: `${base}/vehicles/${v.slug}`, lastModified: v.updatedAt },
      ...(v.status === "published" ? [{ url: `${base}/vehicles/${v.slug}/liveries` }, { url: `${base}/vehicles/${v.slug}/timeline` }] : []),
    ]),
    ...liveries.map((l) => ({ url: `${base}/vehicles/${l.vehicle.slug}/liveries/${l.slug}` })),
    ...teams.map((t) => ({ url: `${base}/teams/${t.slug}` })),
    ...drivers.map((d) => ({ url: `${base}/drivers/${d.slug}` })),
  ];
}
