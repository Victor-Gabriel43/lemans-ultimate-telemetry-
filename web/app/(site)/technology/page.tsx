import Link from "next/link";
import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { TECH } from "@/lib/f1/technology";
import { DataNotice, PageIntro, Pending, SectionHead } from "@/components/site/ui";
import { TONES } from "@/components/site/tones";

export const metadata: Metadata = {
  title: "Regulations & Technology",
  description: "How Formula One's regulations work and how its cars are engineered — aerodynamics, power units, tyres, fuel, brakes, suspension, chassis and safety.",
};

const DOCUMENTS = [
  { title: "Formula One Sporting Regulations", body: "FIA", text: "Event format, procedures, penalties and points." },
  { title: "Formula One Technical Regulations", body: "FIA", text: "Car design, dimensions, power units and safety structures." },
  { title: "Formula One Financial Regulations", body: "FIA", text: "The cost cap and its reporting rules." },
  { title: "International Sporting Code", body: "FIA", text: "The framework that governs all FIA competitions." },
];

export default function TechnologyPage() {
  const regs = TECH.filter((t) => t.group === "Regulations");
  const systems = TECH.filter((t) => t.group === "Car systems");

  return (
    <>
      <PageIntro
        crumbs={[{ label: "Technology" }]}
        eyebrow="Regulations & technology"
        title="The rules. The machine."
        lede="Formula One is engineering inside a rulebook. Start with how the regulations work, then take the car apart system by system — each article begins with a simple explanation before going deeper."
      />

      <section className="section tone-off">
        <div className="wrap">
          <SectionHead eyebrow="Regulations" title="How the sport is governed." lede="Three pillars: how competition is run, what a car may be, and how drivers are protected." />
          <div className="grid grid-3">
            {regs.map((t) => (
              <Link key={t.slug} href={`/technology/${t.slug}`} className="tile tile-link" style={{ background: "var(--paper)" }}>
                <div style={{ height: 6, background: TONES[t.tone] }} aria-hidden />
                <div className="tile-body">
                  <p className="title-2">{t.title}</p>
                  <p className="muted small pretty">{t.summary}</p>
                  <span className="link-arrow small" style={{ marginTop: "auto", paddingTop: 12 }}>
                    Read article
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section tone-paper">
        <div className="wrap">
          <SectionHead eyebrow="Car systems" title="Inside a Formula One car." lede="From the airflow over the bodywork to the carbon brakes glowing at the end of a straight." />
          <div className="grid grid-4 keep-2">
            {systems.map((t, i) => (
              <Link key={t.slug} href={`/technology/${t.slug}`} className="card">
                <div className="plate plate-flat ratio-square" style={{ background: TONES[t.tone] }}>
                  <div className="plate-art">
                    <span className="plate-tag">{String(i + 1).padStart(2, "0")}</span>
                    <span className="plate-glyph" style={{ fontSize: "clamp(26px,2.6vw,34px)", letterSpacing: "-0.03em" }}>
                      {t.title}
                    </span>
                  </div>
                </div>
                <div className="card-body">
                  <p className="small muted pretty">{t.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section tone-night" id="documents">
        <div className="wrap">
          <SectionHead
            eyebrow="Document library"
            title="The official texts."
            lede="Formula One’s rules are published by the FIA and revised several times each year. This library will link each document, its current issue and a plain-language summary of what changed."
          />
          <div className="grid grid-2">
            {DOCUMENTS.map((d) => (
              <div key={d.title} className="tile">
                <div className="tile-body" style={{ flexDirection: "row", gap: 16, alignItems: "flex-start" }}>
                  <FileText size={26} strokeWidth={1.5} color="#ff5a4f" aria-hidden style={{ flexShrink: 0 }} />
                  <div>
                    <p className="title-3">{d.title}</p>
                    <p className="small muted mt-xs">{d.text}</p>
                    <p className="caption mt-xs" style={{ color: "var(--on-night-2)" }}>
                      Publisher: {d.body} · Issue and link pending verification
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-m">
            <Pending title="Verified document versions">
              Issue numbers, publication dates and direct links to the FIA’s published regulations, with change summaries.
            </Pending>
          </div>
        </div>
      </section>

      <section className="section-tight tone-paper">
        <div className="wrap">
          <DataNotice title="Accuracy">
            These articles explain principles for learning purposes. They are not a substitute for the official regulations, which
            change frequently. Article-to-regulation references will be verified in Phase 2.
          </DataNotice>
        </div>
      </section>
    </>
  );
}
