"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "./db";
import { modelDef, type Field } from "./admin-schema";
import { requireAdmin, signIn, signOut } from "./auth";

type Delegate = {
  create(args: { data: Record<string, unknown> }): Promise<{ id: string }>;
  update(args: { where: { id: string }; data: Record<string, unknown> }): Promise<{ id: string }>;
  delete(args: { where: { id: string } }): Promise<unknown>;
};
const delegate = (key: string) => (db as unknown as Record<string, Delegate>)[key];
const joinDelegate = (key: string) => (db as unknown as Record<string, { deleteMany(a: object): Promise<unknown>; createMany(a: object): Promise<unknown> }>)[key];

export type ActionState = { error?: string; ok?: boolean };

function coerce(f: Field, raw: FormDataEntryValue | null): unknown {
  const s = typeof raw === "string" ? raw.trim() : "";
  switch (f.type) {
    case "boolean": return raw === "on";
    case "number": return s === "" ? null : Number(s);
    case "date": return s === "" ? null : new Date(`${s}T00:00:00Z`);
    case "relation": return s === "" ? null : s;
    case "json":
      if (!s) return "{}";
      JSON.parse(s); // throws on invalid JSON
      return s;
    default: return s;
  }
}

export async function saveRecord(model: string, id: string | null, _prev: ActionState, form: FormData): Promise<ActionState> {
  await requireAdmin();
  const def = modelDef(model);
  if (!def) return { error: "Unknown model" };
  const data: Record<string, unknown> = {};
  const multis: { f: Field; ids: string[] }[] = [];
  try {
    for (const f of def.fields) {
      if (f.type === "multi") { multis.push({ f, ids: form.getAll(f.name).map(String) }); continue; }
      const v = coerce(f, form.get(f.name));
      if (f.required && (v === null || v === "" || (typeof v === "number" && Number.isNaN(v)))) return { error: `${f.label} is required.` };
      if (typeof v === "number" && Number.isNaN(v)) return { error: `${f.label} must be a number.` };
      if (f.name === "slug" && typeof v === "string" && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v)) return { error: "Slug must be lowercase letters, numbers and hyphens." };
      data[f.name] = v;
    }
  } catch {
    return { error: "Palette must be valid JSON." };
  }

  let recordId = id;
  try {
    if (id) await delegate(model).update({ where: { id }, data });
    else recordId = (await delegate(model).create({ data })).id;
    for (const { f, ids } of multis) {
      const j = f.join!;
      await joinDelegate(j.model).deleteMany({ where: { [j.selfKey]: recordId } });
      if (ids.length) await joinDelegate(j.model).createMany({ data: ids.map((other) => ({ [j.selfKey]: recordId, [j.otherKey]: other, ...(j.extra ?? {}) })) });
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { error: msg.includes("Unique constraint") ? "A record with this slug already exists." : `Could not save: ${msg.split("\n").at(-1)}` };
  }
  revalidatePath("/", "layout");
  if (!id) redirect(`/admin/${model}/${recordId}?saved=1`);
  return { ok: true };
}

export async function deleteRecord(model: string, id: string) {
  await requireAdmin();
  const def = modelDef(model);
  if (!def) return;
  if (def.citable) await db.sourceRef.deleteMany({ where: { entityType: def.citable, entityId: id } });
  await delegate(model).delete({ where: { id } });
  revalidatePath("/", "layout");
  redirect(`/admin/${model}`);
}

export async function addCitation(entityType: string, entityId: string, model: string, form: FormData) {
  await requireAdmin();
  const sourceId = String(form.get("sourceId") ?? "");
  if (!sourceId) return;
  await db.sourceRef.upsert({
    where: { sourceId_entityType_entityId: { sourceId, entityType, entityId } },
    create: { sourceId, entityType, entityId, note: String(form.get("note") ?? "") },
    update: {},
  });
  revalidatePath("/", "layout");
  redirect(`/admin/${model}/${entityId}`);
}

export async function removeCitation(refId: string, model: string, entityId: string) {
  await requireAdmin();
  await db.sourceRef.delete({ where: { id: refId } });
  revalidatePath("/", "layout");
  redirect(`/admin/${model}/${entityId}`);
}

export async function login(_prev: ActionState, form: FormData): Promise<ActionState> {
  if (!(await signIn(String(form.get("password") ?? "")))) return { error: "Incorrect password." };
  redirect("/admin");
}

export async function logout() {
  await signOut();
  redirect("/admin/login");
}
