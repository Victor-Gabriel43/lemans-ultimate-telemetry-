import type { Metadata } from "next";
import { db } from "@/lib/db";
import { Container, SectionHeading } from "@/components/Section";
import { VerificationBadge } from "@/components/Verification";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Research method & sources", description: "How the Racing Heritage Archive researches, verifies and attributes historical records." };

const KIND_LABEL: Record<string, string> = { official: "Manufacturer & team", "governing-body": "Governing bodies & organisers", publication: "Publications", press: "Press", results: "Results" };

export default async function Sources() {
  const sources = await db.source.findMany({ include: { _count: { select: { refs: true } } }, orderBy: [{ kind: "asc" }, { published: "asc" }] });
  const [verified, reported, unverified] = await Promise.all(
    ["verified", "reported", "unverified"].map(async (s) =>
      (await Promise.all([
        db.livery.count({ where: { verification: s } }), db.result.count({ where: { verification: s } }),
        db.entry.count({ where: { verification: s } }), db.timelineEntry.count({ where: { verification: s } }), db.spec.count({ where: { verification: s } }),
      ])).reduce((a, b) => a + b, 0)),
  );
  const kinds = [...new Set(sources.map((s) => s.kind))];
  return (
    <Container className="py-16">
      <SectionHeading eyebrow="Research & data accuracy" title="Method">
        The archive never fabricates history. Each record cites its sources and carries one of three statuses.
      </SectionHeading>
      <div className="grid gap-px bg-line md:grid-cols-3">
        {[["verified", verified, "Confirmed by an official source — manufacturer, team, FIA, ACO, IMSA — or by several independent reputable outlets."],
          ["reported", reported, "Published by one reputable source, or sources that disagree on a detail. Displayed with a notice until cross-checked."],
          ["unverified", unverified, "Plausible but unconfirmed. Kept so researchers can resolve it; always shown with a warning and never presented as fact."]].map(([s, n, text]) => (
          <div key={s as string} className="bg-ink p-6">
            <VerificationBadge status={s as string} />
            <p className="display mt-4 text-5xl tabular-nums">{n}</p>
            <p className="mt-3 text-sm text-soft">{text}</p>
          </div>
        ))}
      </div>
      <div className="prose-archive mt-12 max-w-3xl">
        <p>Source priority: official manufacturer and team archives; FIA, ACO, IMSA and WEC publications and classifications; motorsport photography agencies; then reputable motorsport publications. Encyclopaedic sources are used only for cross-checking.</p>
        <p>Liveries: a genuinely new design is its own record. Seasonal sponsor or detail updates are stored as variations linked to their parent design, so minor changes are never mistaken for new liveries.</p>
        <p>Imagery: colour illustrations are generated from each livery&apos;s recorded palette and are labelled as approximate. Photographs are published only with a recorded credit and licence.</p>
        <p>Dataset cut-off for the Porsche 963 collection: 9 November 2026.</p>
      </div>
      {kinds.map((k) => (
        <section key={k} className="mt-14">
          <h2 className="eyebrow mb-3">{KIND_LABEL[k] ?? k}</h2>
          <ul className="divide-y divide-line border-y hairline">
            {sources.filter((s) => s.kind === k).map((s) => (
              <li key={s.id} className="grid gap-1 py-3 text-sm md:grid-cols-[1fr_auto]">
                <a href={s.url} target="_blank" rel="noreferrer noopener" className="hover:text-amber">{s.title}<span className="block text-xs text-mute">{s.publisher}{s.published ? ` · ${formatDate(s.published)}` : ""}</span></a>
                <span className="font-mono text-xs text-mute">cited {s._count.refs}×</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </Container>
  );
}
