import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/lib/f1/categories";
import { DataNotice, PageIntro, SectionHead } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Other Formula Categories",
  description: "Karting, Formula 4, F1 Academy, Formula Regional, Formula 3 and Formula 2 — the pathway to Formula One.",
};

export default function CategoriesPage() {
  const ladder = [...CATEGORIES].sort((a, b) => b.ladderStep - a.ladderStep);
  return (
    <>
      <PageIntro
        crumbs={[{ label: "Categories" }]}
        eyebrow="Other formula categories"
        title="The ladder to Formula One."
        lede="No driver arrives in Formula One by accident. Most climb a structured pathway — from karting through Formula 4 and Formula 3 to Formula 2 — designed by the FIA to develop skill step by step."
      />

      <section className="section tone-off">
        <div className="wrap">
          <SectionHead eyebrow="The pathway" title="Step by step." lede="Each rung adds power, downforce and complexity. Select a category to learn how it works." />
          <ol style={{ display: "grid", gap: 12 }}>
            <li className="tile tile-dark">
              <div className="tile-body flex-row" style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
                <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.04em", color: "#ff5a4f", width: 96 }}>F1</span>
                <div>
                  <p className="title-3">Formula One</p>
                  <p className="small muted">The destination — requires an FIA Super Licence.</p>
                </div>
              </div>
            </li>
            {ladder.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/categories/${c.slug}`}
                  className="tile tile-link"
                  style={{ background: "var(--paper)", borderLeft: `6px solid ${c.color}` }}
                >
                  <div className="tile-body" style={{ flexDirection: "row", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.04em", color: c.color, width: 96 }}>{c.short}</span>
                    <div style={{ flex: "1 1 260px" }}>
                      <p className="title-3">{c.name}</p>
                      <p className="small muted">{c.summary}</p>
                    </div>
                    <span className="badge">{c.ageGuide}</span>
                    <ArrowRight size={18} color="var(--ink-3)" aria-hidden />
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section tone-paper">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: "clamp(32px,6vw,96px)", alignItems: "start" }}>
            <div>
              <p className="eyebrow-f1">The Super Licence</p>
              <h2 className="headline balance">The ticket to Formula One.</h2>
            </div>
            <div className="prose">
              <p>
                To race in Formula One, a driver must hold an <strong>FIA Super Licence</strong>. It is awarded on the basis of points
                earned for results in recognised championships, together with requirements on age, experience and knowledge of the
                sporting regulations.
              </p>
              <p>
                Higher categories award more points, which is why the pathway matters: the strongest results in Formula 2 and Formula 3
                carry the most weight. Typically, a driver needs 40 points accumulated over three seasons.
              </p>
              <p>
                <Link href="/categories/formula-2">How Formula 2 prepares drivers</Link>
              </p>
            </div>
          </div>
          <div className="mt-l">
            <DataNotice>Super Licence point tables and eligibility rules change over time and will be published from the current FIA regulations in Phase 2.</DataNotice>
          </div>
        </div>
      </section>
    </>
  );
}
