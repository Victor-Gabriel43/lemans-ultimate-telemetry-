import "server-only";
import { db } from "./db";
import type { Field, ModelDef } from "./admin-schema";
import type { Option } from "@/components/admin/RecordForm";

type FindMany = { findMany(args?: object): Promise<Record<string, unknown>[]>; findUnique(args: object): Promise<Record<string, unknown> | null>; count(args?: object): Promise<number> };
export const model = (key: string) => (db as unknown as Record<string, FindMany>)[key];

/** Human-readable option labels for relation pickers. */
async function optionsFor(f: Field): Promise<Option[]> {
  const rel = f.relation!;
  if (rel.model === "entry") {
    const rows = await db.entry.findMany({ include: { team: true, championship: true, vehicle: true }, orderBy: [{ season: "asc" }, { carNumber: "asc" }] });
    return rows.map((e) => ({ value: e.id, label: `${e.season} ${e.championship.shortName} #${e.carNumber} — ${e.team.name} (${e.vehicle.model})` }));
  }
  if (rel.model === "event") {
    const rows = await db.event.findMany({ orderBy: { date: "asc" } });
    return rows.map((e) => ({ value: e.id, label: `${e.season} — ${e.name}` }));
  }
  const rows = await model(rel.model).findMany({ orderBy: { [rel.labelField]: "asc" } });
  return rows.map((r) => ({ value: String(r.id), label: String(r[rel.labelField]) }));
}

export async function formOptions(def: ModelDef) {
  const out: Record<string, Option[]> = {};
  for (const f of def.fields) if (f.relation) out[f.name] = await optionsFor(f);
  return out;
}

/** Load a record with multi-relation ids flattened for the form. */
export async function loadRecord(def: ModelDef, id: string) {
  const include: Record<string, boolean> = {};
  for (const f of def.fields) if (f.type === "multi") include[f.name] = true;
  const row = await model(def.key).findUnique({ where: { id }, ...(Object.keys(include).length ? { include } : {}) });
  if (!row) return null;
  for (const f of def.fields) {
    if (f.type === "multi") row[f.name] = ((row[f.name] as Record<string, string>[]) ?? []).map((j) => j[f.join!.otherKey]);
  }
  return row;
}
