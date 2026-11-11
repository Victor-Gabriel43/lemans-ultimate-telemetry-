import type { Metadata } from "next";
import { RACE_TOPICS, SPRINT_WEEKEND, STANDARD_WEEKEND, type WeekendStep } from "@/lib/f1/weekend";
import { Tabs } from "@/components/site/Tabs";
import { Disclosure, LinkArrow, PageIntro, SectionHead } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Race Weekends",
  description: "How a Formula One weekend works: practice, qualifying, sprints, the Grand Prix, pit stops, Safety Cars, race control and penalties.",
};

function Schedule({ steps }: { steps: WeekendStep[] }) {
  return (
    <div>
      <ol className="grid" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(180px, 1fr))`, gap: 12 }}>
        {steps.map((s, i) => (
          <li key={s.id + i} className="tile" style={{ background: "var(--paper)" }}>
            <div className="tile-body" style={{ padding: 22 }}>
              <span className="caption">
                {String(i + 1).padStart(2, "0")} · {s.day}
              </span>
              <span className="title-3">{s.title}</span>
              <span className="small muted pretty">{s.short}</span>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-l">
        {steps.map((s, i) => (
          <Disclosure key={s.id + i} title={`${s.title} — ${s.day}`} open={i === 0}>
            {s.body.map((p, n) => (
              <p key={n}>{p}</p>
            ))}
            <div className="flex-row mt-s" style={{ gap: 8 }}>
              {s.facts.map((f) => (
                <span key={f} className="badge">
                  {f}
                </span>
              ))}
            </div>
          </Disclosure>
        ))}
      </div>
    </div>
  );
}

const FAQ = [
  { q: "How long is a Grand Prix?", a: "Most Grands Prix cover the fewest laps that exceed 305 kilometres, typically lasting around an hour and a half. Monaco is shorter. A time limit applies if a race is delayed." },
  { q: "Why do drivers weave behind the Safety Car?", a: "To keep heat in their tyres and brakes, which lose temperature — and therefore grip — at reduced speed." },
  { q: "What happens if it rains?", a: "Teams switch to intermediate or full wet tyres. In very heavy rain the race may start behind the Safety Car or be suspended with a red flag." },
  { q: "What is parc fermé?", a: "From the start of qualifying, cars are under parc fermé conditions: teams may only make limited, approved changes until the race." },
];

export default async function RaceWeekendPage({ searchParams }: PageProps<"/race-weekend">) {
  const { format } = await searchParams;
  return (
    <>
      <PageIntro
        crumbs={[{ label: "Race Weekends" }]}
        eyebrow="Race weekends"
        title="Three days. One Grand Prix."
        lede="A Formula One event builds from Friday practice to Sunday’s race. Here is how it works — explained for someone watching for the very first time."
      />

      <section className="section tone-off">
        <div className="wrap">
          <SectionHead
            eyebrow="The format"
            title="Two kinds of weekend."
            lede="Most events follow the standard format. Selected events use the sprint format, which adds a short Saturday race."
          />
          <Tabs
            key={format === "sprint" ? "sprint" : "standard"}
            label="Weekend format"
            initial={format === "sprint" ? "sprint" : "standard"}
            items={[
              { id: "standard", label: "Standard weekend", content: <Schedule steps={STANDARD_WEEKEND} /> },
              { id: "sprint", label: "Sprint weekend", content: <Schedule steps={SPRINT_WEEKEND} /> },
            ]}
          />
        </div>
      </section>

      <section className="section tone-paper">
        <div className="wrap">
          <SectionHead eyebrow="During the race" title="What you are watching." lede="The essential ideas behind every Grand Prix." />
          <div className="grid grid-2" style={{ gap: 20 }}>
            {RACE_TOPICS.map((t) => (
              <article key={t.id} id={t.id} className="tile" style={{ background: "var(--paper-2)", scrollMarginTop: 80 }}>
                <div className="tile-body">
                  <h3 className="title-2">{t.title}</h3>
                  <p style={{ fontWeight: 600 }}>{t.summary}</p>
                  {t.body.map((p, i) => (
                    <p key={i} className="muted pretty">
                      {p}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section tone-night">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: "clamp(32px,6vw,96px)", alignItems: "start" }}>
            <div>
              <p className="eyebrow-f1">Common questions</p>
              <h2 className="headline">Still curious?</h2>
              <p className="lede mt-s">Short answers to the questions new viewers ask most.</p>
              <p className="mt-m">
                <LinkArrow href="/learn/reading-a-race">How to follow a race</LinkArrow>
              </p>
            </div>
            <div>
              {FAQ.map((f) => (
                <Disclosure key={f.q} title={f.q}>
                  <p>{f.a}</p>
                </Disclosure>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
