import Link from "next/link";
import { notFound } from "next/navigation";
import { modelDef } from "@/lib/admin-schema";
import { model } from "@/lib/admin-data";
import { VerificationBadge } from "@/components/Verification";

export default async function AdminList({ params, searchParams }: { params: Promise<{ model: string }>; searchParams: Promise<{ q?: string }> }) {
  const def = modelDef((await params).model);
  if (!def) notFound();
  const q = (await searchParams).q ?? "";
  const rows = await model(def.key).findMany({
    ...(q ? { where: { [def.title]: { contains: q } } } : {}),
    ...(def.orderBy ? { orderBy: def.orderBy } : {}),
    take: 500,
  });
  const fmt = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : typeof v === "boolean" ? (v ? "✓" : "") : String(v ?? ""));
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="display text-5xl">{def.plural}</h1>
        <Link href={`/admin/${def.key}/new`} className="rounded-full bg-paper px-5 py-2 text-sm text-ink hover:bg-white">+ New {def.label.toLowerCase()}</Link>
      </div>
      <form className="mt-6"><input name="q" defaultValue={q} placeholder={`Filter by ${def.title}…`} className="w-full max-w-sm border-b hairline bg-transparent py-2 text-sm focus:border-paper focus:outline-none" /></form>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead className="eyebrow"><tr className="border-b hairline">{def.list.map((c) => <th key={c} className="py-2 pr-4 font-normal">{def.fields.find((f) => f.name === c)?.label ?? c}</th>)}</tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={String(r.id)} className="border-b hairline hover:bg-carbon">
                {def.list.map((c, i) => (
                  <td key={c} className="py-2.5 pr-4">
                    {c === "verification" ? <VerificationBadge status={String(r[c])} /> : i === 0 ? <Link href={`/admin/${def.key}/${r.id}`} className="hover:underline">{fmt(r[c]) || "(untitled)"}</Link> : fmt(r[c])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 font-mono text-xs text-mute">{rows.length} records</p>
      </div>
    </div>
  );
}
