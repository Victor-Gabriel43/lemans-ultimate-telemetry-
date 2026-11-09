import { PrismaClient } from "@prisma/client";
import { MANUFACTURERS, IN_RESEARCH } from "./data/collection";
import * as P963 from "./data/porsche-963";
import { PHOTOS } from "./data/porsche-963-photos";

const db = new PrismaClient();

async function cite(entityType: string, entityId: string, keys: string[], sourceIds: Map<string, string>) {
  for (const k of keys) {
    const sourceId = sourceIds.get(k);
    if (!sourceId) throw new Error(`Unknown source key "${k}" on ${entityType}`);
    await db.sourceRef.upsert({
      where: { sourceId_entityType_entityId: { sourceId, entityType, entityId } },
      create: { sourceId, entityType, entityId },
      update: {},
    });
  }
}

async function main() {
  // Wipe in dependency order so the seed is idempotent.
  await db.sourceRef.deleteMany();
  await db.photo.deleteMany();
  await db.timelineEntry.deleteMany();
  await db.liveryDriver.deleteMany();
  await db.livery.deleteMany();
  await db.result.deleteMany();
  await db.event.deleteMany();
  await db.entryDriver.deleteMany();
  await db.entry.deleteMany();
  await db.spec.deleteMany();
  await db.vehicle.deleteMany();
  await db.driver.deleteMany();
  await db.team.deleteMany();
  await db.championship.deleteMany();
  await db.manufacturer.deleteMany();
  await db.source.deleteMany();

  const man = new Map<string, string>();
  for (const m of MANUFACTURERS) man.set(m.slug, (await db.manufacturer.create({ data: m })).id);

  const src = new Map<string, string>();
  for (const [key, s] of Object.entries(P963.SOURCES)) {
    const row = await db.source.create({
      data: { title: s.title, publisher: s.publisher, url: s.url, kind: s.kind, published: s.published ? new Date(s.published) : null, accessed: new Date("2026-11-09") },
    });
    src.set(key, row.id);
  }

  const champ = new Map<string, string>();
  for (const c of P963.CHAMPIONSHIPS) champ.set(c.slug, (await db.championship.create({ data: c })).id);

  const team = new Map<string, string>();
  for (const t of P963.TEAMS) team.set(t.slug, (await db.team.create({ data: t })).id);

  const driver = new Map<string, string>();
  for (const [slug, name, nationality] of P963.DRIVERS) driver.set(slug, (await db.driver.create({ data: { slug, name, nationality } })).id);

  // ── Vehicle ──
  const { manufacturer, ...vData } = P963.VEHICLE;
  const vehicle = await db.vehicle.create({ data: { ...vData, manufacturerId: man.get(manufacturer)! } });
  await cite("Vehicle", vehicle.id, P963.VEHICLE_SOURCES, src);

  let order = 0;
  for (const [group, label, value, verification, keys] of P963.SPECS) {
    const s = await db.spec.create({ data: { vehicleId: vehicle.id, group, label, value, verification, order: order++ } });
    await cite("Spec", s.id, keys, src);
  }

  const entryKey = new Map<string, string>();
  for (const [t, c, season, carNumber, drivers, scope, verification, keys, notes] of P963.ENTRIES) {
    const e = await db.entry.create({
      data: {
        vehicleId: vehicle.id, teamId: team.get(t)!, championshipId: champ.get(c)!, season, carNumber, scope, verification, notes: notes ?? "",
        drivers: { create: drivers.map((d) => ({ driverId: driver.get(d)!, role: scope })) },
      },
    });
    entryKey.set(`${c}:${season}:${carNumber}`, e.id);
    await cite("Entry", e.id, keys, src);
  }

  const eventId = new Map<string, string>();
  for (const [slug, name, c, season, date, circuit, country, precision] of P963.EVENTS) {
    const ev = await db.event.create({ data: { slug, name, championshipId: champ.get(c)!, season, date: new Date(date), datePrecision: precision ?? "day", circuit, country } });
    eventId.set(slug, ev.id);
  }

  for (const [ev, key, position, headline, notes, highlight, verification, keys] of P963.RESULTS) {
    const entryId = entryKey.get(key);
    if (!entryId) throw new Error(`Result references unknown entry ${key}`);
    const r = await db.result.create({ data: { vehicleId: vehicle.id, eventId: eventId.get(ev)!, entryId, position, headline, notes, highlight, verification } });
    await cite("Result", r.id, keys, src);
  }

  const livery = new Map<string, string>();
  for (const l of P963.LIVERIES) {
    const row = await db.livery.create({
      data: {
        slug: l.slug, vehicleId: vehicle.id, name: l.name, kind: l.kind, isVariation: !!l.isVariation, year: l.year, season: l.season,
        teamId: l.team ? team.get(l.team) : null, championshipId: l.champ ? champ.get(l.champ) : null,
        carNumbers: l.carNumbers, event: l.event, firstUsed: l.firstUsed ? new Date(l.firstUsed) : null, sponsors: l.sponsors,
        background: l.background, inspiration: l.inspiration, design: JSON.stringify(l.design), verification: l.verification,
        parentId: l.parent ? livery.get(l.parent) : null,
        drivers: { create: l.drivers.map((d) => ({ driverId: driver.get(d)! })) },
      },
    });
    livery.set(l.slug, row.id);
    await cite("Livery", row.id, l.sources, src);
  }
  await db.vehicle.update({ where: { id: vehicle.id }, data: { heroLiveryId: livery.get("963-launch-livery-goodwood-2022") } });

  for (const [date, datePrecision, title, description, category, t, l, milestone, verification, keys] of P963.TIMELINE) {
    const te = await db.timelineEntry.create({
      data: {
        vehicleId: vehicle.id, date: new Date(date), datePrecision, title, description, category, milestone, verification,
        teamId: t ? team.get(t) : null, liveryId: l ? livery.get(l) : null,
      },
    });
    await cite("TimelineEntry", te.id, keys, src);
  }

  // ── Photographs (real, credited, licensed) ──
  const timelineByTitle = new Map((await db.timelineEntry.findMany({ where: { vehicleId: vehicle.id } })).map((t) => [t.title, t.id]));
  for (const [i, p] of PHOTOS.entries()) {
    const liveryId = p.livery ? livery.get(p.livery) : null;
    if (p.livery && !liveryId) throw new Error(`Photo references unknown livery ${p.livery}`);
    const timelineEntryId = p.timeline ? timelineByTitle.get(p.timeline) : null;
    if (p.timeline && !timelineEntryId) throw new Error(`Photo references unknown timeline entry ${p.timeline}`);
    await db.photo.create({
      data: {
        url: p.file.startsWith("http") ? p.file : `/photos/${p.file}`, alt: p.alt, caption: p.caption, credit: p.credit, license: p.license, licenseUrl: p.licenseUrl,
        sourceUrl: p.sourceUrl, takenAt: p.takenAt, width: p.width, height: p.height, focal: p.focal ?? "50% 50%",
        view: p.view, order: i, vehicleId: vehicle.id, liveryId, timelineEntryId,
      },
    });
  }
  if (P963.HERO_PHOTO) {
    const hero = await db.photo.findFirst({ where: { url: `/photos/${P963.HERO_PHOTO}` } });
    if (hero) await db.photo.update({ where: { id: hero.id }, data: { order: -1 } });
  }

  // ── Collection records still in research ──
  for (const [slug, m, model, fullName, category, era, debutYear, retiredYear, country, tagline] of IN_RESEARCH) {
    await db.vehicle.create({
      data: { slug, manufacturerId: man.get(m)!, model, fullName, category, era, debutYear, retiredYear, country, tagline, status: "in-research" },
    });
  }

  const counts = await Promise.all([db.vehicle.count(), db.livery.count(), db.timelineEntry.count(), db.result.count(), db.source.count(), db.sourceRef.count()]);
  console.log(`Seeded: ${counts[0]} vehicles, ${counts[1]} liveries, ${counts[2]} timeline entries, ${counts[3]} results, ${counts[4]} sources, ${counts[5]} citations`);
}

main().finally(() => db.$disconnect());
