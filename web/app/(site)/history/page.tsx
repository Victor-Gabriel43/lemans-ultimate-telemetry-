import Link from "next/link";
import type { Metadata } from "next";
import { ERAS } from "@/lib/f1/eras";
import { SEASONS } from "@/lib/f1/seasons";
import { EraTimeline } from "@/components/site/EraTimeline";
import { LinkArrow, PageIntro, Plate, SectionHead } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "History of Formula 1",
  description: "Eight decades of Formula One, from Silverstone 1950 to the new formula of 2026.",
};

const KEY_MOMENTS = ERAS.flatMap((e) => e.developments.map((d) => ({ ...d, era: e })));

export default function HistoryPage() {
  return (
    <>
      <PageIntro
        crumbs={[{ label: "History" }]}
        eyebrow="History of Formula 1"
        title="From airfields to algorithms."
        lede="Formula One began as a championship for pre-war heroes in front-engined cars. Over eight decades it became a global sport and the world’s most advanced automotive laboratory. These are its chapters."
      />

      <section className="section-tight tone-off" id="timeline">
        <div className="wrap">
          <p className="kicker" style={{ marginBottom: 24 }}>
            The timeline · select a decade
          </p>
          <EraTimeline eras={ERAS} />
        </div>
      </section>

      <section className="section tone-paper">
        <div className="wrap">
          <SectionHead eyebrow="The eras" title="Eight chapters." lede="Each chapter introduces the context, technology, people and teams of its decade, with links to every season." />
        </div>
        <div className="wrap-wide">
          <div className="grid grid-2" style={{ gap: 24 }}>
            {ERAS.map((e, i) => (
              <Link key={e.id} href={`/history/${e.slug}`} className="tile tile-link" style={{ background: "var(--paper-2)" }}>
                <Plate alt={`The ${e.decade}`} tone={e.tone} ratio="ratio-wide" flat tag={`Chapter ${i + 1}`} glyph={e.decade} glyphSize="sm" mediaId={`era-${e.slug}`} />
                <div className="tile-body">
                  <p className="kicker">{e.themes.join(" · ")}</p>
                  <p className="title-2">{e.name}</p>
                  <p className="muted pretty">{e.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section tone-night">
        <div className="wrap">
          <SectionHead
            eyebrow="Defining moments"
            title={`${KEY_MOMENTS.length} turning points.`}
            lede="A chronological thread through the moments that changed the sport — technical, sporting and human."
            action={<LinkArrow href="/seasons">Every season</LinkArrow>}
          />
          <div className="grid grid-2" style={{ gap: "48px clamp(32px,6vw,96px)" }}>
            {ERAS.map((e) => (
              <div key={e.id}>
                <p className="title-3" style={{ marginBottom: 18 }}>
                  <Link href={`/history/${e.slug}`}>{e.decade}</Link> <span className="muted" style={{ fontWeight: 500 }}>— {e.name}</span>
                </p>
                <ol className="milestones">
                  {e.developments.map((d) => (
                    <li key={d.year + d.title} className="milestone">
                      <p className="milestone-year">
                        <Link href={`/seasons/${d.year}`}>{d.year}</Link>
                      </p>
                      <p className="milestone-title">{d.title}</p>
                      <p className="milestone-text">{d.text}</p>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          <p className="caption mt-l">
            {KEY_MOMENTS.length} moments across {SEASONS.length} seasons.
          </p>
        </div>
      </section>
    </>
  );
}
