import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { modelDef } from "@/lib/admin-schema";
import { formOptions, loadRecord } from "@/lib/admin-data";
import { saveRecord, deleteRecord, addCitation, removeCitation } from "@/lib/admin-actions";
import RecordForm from "@/components/admin/RecordForm";

export default async function AdminRecord({ params, searchParams }: { params: Promise<{ model: string; id: string }>; searchParams: Promise<{ saved?: string }> }) {
  const { model: key, id } = await params;
  const def = modelDef(key);
  if (!def) notFound();
  const isNew = id === "new";
  const record = isNew ? {} : await loadRecord(def, id);
  if (!record) notFound();
  const options = await formOptions(def);
  const saved = (await searchParams).saved;

  const citations = !isNew && def.citable ? await db.sourceRef.findMany({ where: { entityType: def.citable, entityId: id }, include: { source: true } }) : [];
  const allSources = def.citable && !isNew ? await db.source.findMany({ orderBy: { title: "asc" } }) : [];

  return (
    <div className="max-w-3xl">
      <Link href={`/admin/${def.key}`} className="eyebrow hover:text-paper">← {def.plural}</Link>
      <h1 className="display mt-3 text-4xl">{isNew ? `New ${def.label.toLowerCase()}` : String((record as Record<string, unknown>)[def.title] ?? def.label)}</h1>
      {saved ? <p className="mt-3 text-sm text-verified">Created.</p> : null}
      <div className="mt-8">
        <RecordForm fields={def.fields} values={record as Record<string, unknown>} options={options} action={saveRecord.bind(null, def.key, isNew ? null : id)} submitLabel={isNew ? "Create" : "Save changes"} />
      </div>

      {def.citable && !isNew ? (
        <section className="mt-14 border-t hairline pt-6">
          <h2 className="eyebrow mb-3">Sources & references</h2>
          {citations.length === 0 ? <p className="mb-3 text-sm text-signal">No sources — this record cannot be marked verified.</p> : null}
          <ul className="mb-4 space-y-2">
            {citations.map((c) => (
              <li key={c.id} className="flex items-start justify-between gap-4 text-sm">
                <a href={c.source.url} target="_blank" rel="noreferrer noopener" className="hover:text-amber">{c.source.publisher} — {c.source.title}</a>
                <form action={removeCitation.bind(null, c.id, def.key, id)}><button className="eyebrow hover:text-signal">Remove</button></form>
              </li>
            ))}
          </ul>
          <form action={addCitation.bind(null, def.citable, id, def.key)} className="flex flex-wrap gap-2">
            <select name="sourceId" required className="min-w-0 flex-1 border hairline bg-carbon px-3 py-2 text-sm">
              <option value="">Attach a reference…</option>
              {allSources.map((s) => <option key={s.id} value={s.id}>{s.publisher} — {s.title}</option>)}
            </select>
            <button className="rounded-full border hairline px-4 py-2 text-sm hover:border-mute">Attach</button>
          </form>
          <p className="mt-2 text-xs text-mute">New reference? <Link href="/admin/source/new" className="underline">Create it first</Link>.</p>
        </section>
      ) : null}

      {!isNew ? (
        <form action={deleteRecord.bind(null, def.key, id)} className="mt-14 border-t hairline pt-6">
          <button className="eyebrow text-signal hover:underline">Delete this {def.label.toLowerCase()}</button>
        </form>
      ) : null}
    </div>
  );
}
