import type { Metadata } from "next";
import { CARS, GENERATIONS } from "@/lib/f1/cars";
import { CarBrowser } from "@/components/site/CarBrowser";
import { DataNotice, PageIntro } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Formula 1 Cars",
  description: "An editorial archive of landmark Formula One cars, organised by generation, constructor, season and regulation era.",
};

export default function CarsPage() {
  return (
    <>
      <PageIntro
        crumbs={[{ label: "Cars" }]}
        eyebrow="Formula 1 cars"
        title="Every idea has a shape."
        lede="From the supercharged Alfa Romeo 158 to the ground-effect Red Bull RB19, these are the cars that defined their generations — what they were, why they mattered, and what they changed."
      />

      <section className="section-tight tone-night" id="generations">
        <div className="wrap">
          <p className="kicker">Technical generations</p>
          <ol className="grid grid-4 keep-2 mt-s" style={{ gap: 12 }}>
            {GENERATIONS.map((g, i) => (
              <li key={g.id} className="tile" style={{ background: "var(--night-3)" }}>
                <div className="tile-body" style={{ padding: 20 }}>
                  <span className="caption" style={{ color: "var(--on-night-2)" }}>
                    {String(i + 1).padStart(2, "0")} · {g.years}
                  </span>
                  <span className="title-3">{g.name}</span>
                  <span className="small muted">{g.text}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section tone-off">
        <div className="wrap-wide">
          <CarBrowser cars={CARS} generations={GENERATIONS} />
          <div className="mt-xl">
            <DataNotice title="Specifications and photography">
              Technical overviews describe each car’s concept and engine architecture. Detailed specifications (weight, power,
              dimensions) and licensed photography will be added from verified sources in Phase 2. Interactive 3D models are
              planned for Phase 3.
            </DataNotice>
          </div>
        </div>
      </section>
    </>
  );
}
