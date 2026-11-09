import Link from "next/link";
import { db } from "@/lib/db";
import { MODELS } from "@/lib/admin-schema";
import { model } from "@/lib/admin-data";
import { VerificationBadge } from "@/components/Verification";

export default async function Dashboard() {
  const counts = await Promise.all(MODELS.map((m) => model(m.key).count()));
  const [liveries, results, entries, timeline, uncitedLiveries] = await Promise.all([
    db.livery.findMany({ where: { verification: { not: "verified" } }, select: { id: true, name: true, verification: true } }),
    db.result.findMany({ where: { verification: { not: "verified" } }, include: { event: true } }),
    db.entry.findMany({ where: { verification: { not: "verified" } }, include: { team: true, championship: true } }),
    db.timelineEntry.findMany({ where: { verification: { not: "verified" } } }),
    db.livery.findMany({ select: { id: true, name: true } }).then(async (ls) => {
      const cited = new Set((await db.sourceRef.findMany({ where: { entityType: "Livery" }, select: { entityId: true } })).map((r) => r.entityId));
      return ls.filter((l) => !cited.has(l.id));
    }),
  ]);
  const queue = [
    ...liveries.map((l) => ({ href: `/admin/livery/${l.id}`, type: "Livery", label: l.name, v: l.verification })),
    ...results.map((r) => ({ href: `/admin/result/${r.id}`, type: "Result", label: `${r.event.season} ${r.event.name} — ${r.position}`, v: r.verification })),
    ...entries.map((e) => ({ href: `/admin/entry/${e.id}`, type: "Entry", label: `${e.season} ${e.championship.shortName} #${e.carNumber} ${e.team.name}`, v: e.verification })),
    ...timeline.map((t) => ({ href: `/admin/timelineEntry/${t.id}`, type: "Timeline", label: t.title, v: t.verification })),
  ];
  return (
    <div>
      <h1 className="display text-5xl">Archive overview</h1>
      <ul className="mt-8 grid grid-cols-2 gap-px bg-asphalt sm:grid-cols-3 xl:grid-cols-4">
        {MODELS.map((m, i) => (
          <li key={m.key} className="bg-black">
            <Link href={`/admin/${m.key}`} className="block p-5 hover:bg-pit">
              <p className="display text-4xl tabular-nums">{counts[i]}</p>
              <p className="text-sm text-fog mt-1">{m.plural}</p>
            </Link>
          </li>
        ))}
      </ul>
      <h2 className="text-sm text-fog mt-14 mb-3">Research queue — {queue.length} records awaiting verification</h2>
      <ul className="divide-y divide-asphalt border-y rule">
        {queue.map((q) => (
          <li key={q.href}>
            <Link href={q.href} className="flex items-center justify-between gap-4 py-2.5 text-sm hover:text-white">
              <span><span className="mr-3 text-xs text-fog">{q.type}</span>{q.label}</span>
              <VerificationBadge status={q.v} />
            </Link>
          </li>
        ))}
      </ul>
      {uncitedLiveries.length ? (
        <>
          <h2 className="text-sm text-fog mt-10 mb-3 text-flag">Liveries without any source</h2>
          <ul className="space-y-1 text-sm">{uncitedLiveries.map((l) => <li key={l.id}><Link className="hover:underline" href={`/admin/livery/${l.id}`}>{l.name}</Link></li>)}</ul>
        </>
      ) : null}
    </div>
  );
}
