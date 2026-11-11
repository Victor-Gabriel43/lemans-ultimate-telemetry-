import type { Metadata } from "next";
import { PageIntro } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "About",
  description: "How Paddock is built: editorial approach, data verification and image licensing.",
};

const PHASES = [
  { n: "01", title: "Design & content structure", status: "Current", text: "The design system, information architecture, editorial content, page templates and interactions." },
  { n: "02", title: "Verified historical data", status: "Next", text: "Official records: calendars, results, standings, entry lists, regulations, car specifications and other categories." },
  { n: "03", title: "Advanced visual experiences", status: "Later", text: "Interactive 3D cars, exploded models, scroll-driven storytelling and technical simulations." },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        crumbs={[{ label: "About" }]}
        eyebrow="About Paddock"
        title="An encyclopedia, built carefully."
        lede="Paddock is an independent, educational guide to Formula One. It is designed to be explored by newcomers and experts alike — and to be trustworthy."
      />

      <section className="section tone-off">
        <div className="wrap">
          <p className="eyebrow-f1">Roadmap</p>
          <h2 className="headline">Built in three phases.</h2>
          <div className="grid grid-3 mt-l">
            {PHASES.map((p) => (
              <div key={p.n} className={`tile ${p.status === "Current" ? "tile-dark" : ""}`} style={p.status === "Current" ? undefined : { background: "var(--paper)" }}>
                <div className="tile-body">
                  <span className="flex-row space-between">
                    <span className="stat-value" style={{ fontSize: 40 }}>
                      {p.n}
                    </span>
                    <span className={`badge ${p.status === "Current" ? "badge-red" : ""}`}>{p.status}</span>
                  </span>
                  <p className="title-3 mt-s">{p.title}</p>
                  <p className="small muted">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section tone-paper" id="data">
        <div className="wrap-text prose">
          <p className="eyebrow-f1" style={{ fontSize: 17 }}>
            Data & sources
          </p>
          <h2 className="title-1" style={{ color: "var(--ink)" }}>
            What you can rely on today.
          </h2>
          <p>
            Editorial content — era histories, profiles, explanations and lessons — summarises long-established, widely documented
            history. World champions are included as a navigational reference and are flagged for cross-checking.
          </p>
          <p>
            <strong>Record-level data is deliberately absent.</strong> Race calendars, results, standings, entry lists, career
            statistics, lap records, circuit lengths and full technical specifications will be added only after verification against
            official sources. Wherever this information will appear, the site shows a clearly labelled placeholder instead of an
            estimate.
          </p>
          <p>The current season, 2026, is shown as in progress; its results will be added once confirmed.</p>
        </div>
      </section>

      <section className="section tone-off" id="images">
        <div className="wrap-text prose">
          <p className="eyebrow-f1" style={{ fontSize: 17 }}>
            Image policy
          </p>
          <h2 className="title-1" style={{ color: "var(--ink)" }}>
            No misleading pictures.
          </h2>
          <p>
            Every photograph must show the correct car, team, driver and year, and must be properly licensed and credited. Until a
            verified image is available, pages show a designed typographic plate rather than a substitute photo.
          </p>
          <p>
            Images are registered centrally with their source, author and licence, and each one displays its credit on the page.
          </p>
        </div>
      </section>

      <section className="section-tight tone-paper">
        <div className="wrap-text">
          <p className="caption">
            Paddock is not affiliated with Formula One Group, the FIA or any team. Formula 1, F1 and related marks are trademarks of their
            respective owners.
          </p>
        </div>
      </section>
    </>
  );
}
