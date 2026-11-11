import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CIRCUITS, getCircuit } from "@/lib/f1/circuits";
import { CircuitCard } from "@/components/site/cards";
import { Breadcrumbs, DataNotice, LinkArrow, Milestones, Pending, Plate, Specs } from "@/components/site/ui";

export function generateStaticParams() {
  return CIRCUITS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/circuits/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCircuit(slug);
  return c ? { title: c.name, description: c.summary } : {};
}

export default async function CircuitPage({ params }: PageProps<"/circuits/[slug]">) {
  const { slug } = await params;
  const c = getCircuit(slug);
  if (!c) notFound();
  const nearby = CIRCUITS.filter((x) => x.region === c.region && x.slug !== c.slug).slice(0, 3);

  return (
    <>
      <section className="tone-paper" style={{ paddingTop: 28 }}>
        <div className="wrap">
          <Breadcrumbs items={[{ label: "Circuits", href: "/circuits" }, { label: c.shortName }]} />
          <div style={{ padding: "clamp(40px,7vw,88px) 0 clamp(32px,5vw,48px)", maxWidth: 860 }}>
            <p className="eyebrow-f1">
              {c.grandPrix} · since {c.firstGrandPrix}
            </p>
            <h1 className="display balance">{c.name}</h1>
            <p className="lede mt-s pretty">{c.summary}</p>
          </div>
        </div>
        <div className="wrap-wide">
          <Plate alt={c.name} mediaId={`circuit-${c.slug}`} tone={c.tone} ratio="ratio-cinema" tag={`${c.location}, ${c.country}`} glyph={c.shortName} glyphSize={c.shortName.length > 10 ? "sm" : undefined} priority />
        </div>
        <div style={{ height: "clamp(56px,8vw,96px)" }} />
      </section>

      <section className="section tone-off">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: "clamp(32px,6vw,96px)", alignItems: "start" }}>
            <div>
              <p className="eyebrow-f1">Circuit profile</p>
              <Specs
                rows={[
                  ["Location", `${c.location}, ${c.country}`],
                  ["Region", c.region],
                  ["Type", `${c.type} circuit`],
                  ["Event", c.grandPrix],
                  ["First World Championship race", <Link key="y" href={`/seasons/${c.firstGrandPrix}`} className="inline-link">{c.firstGrandPrix}</Link>],
                  ["Signature sections", c.landmarks.join(", ")],
                ]}
              />
            </div>
            <div className="prose">
              <p className="eyebrow-f1" style={{ fontSize: 17 }}>
                Historical background
              </p>
              {c.history.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section tone-paper">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: "clamp(32px,6vw,96px)", alignItems: "start" }}>
            <div>
              <p className="eyebrow-f1">Track characteristics</p>
              <h2 className="title-1">What makes it unique.</h2>
              <ul style={{ display: "grid", gap: 12, marginTop: 28 }}>
                {c.characteristics.map((x) => (
                  <li key={x} className="tile" style={{ background: "var(--paper-2)" }}>
                    <div className="tile-body" style={{ padding: "18px 22px" }}>
                      <span style={{ fontWeight: 600 }}>{x}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow-f1">Layout</p>
              <h2 className="title-1">Track map.</h2>
              <div className="mt-m">
                <Pending title="Layout illustration">
                  An accurate, licensed layout diagram with corner names, length and sector markers will be added from official
                  circuit data. We do not draw approximate maps.
                </Pending>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section tone-night">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: "clamp(32px,6vw,96px)", alignItems: "start" }}>
            <div>
              <p className="eyebrow-f1">Major events</p>
              <h2 className="title-1">Moments at {c.shortName}.</h2>
              <p className="muted mt-s">Historical evolution</p>
              {c.evolution.map((p, i) => (
                <p key={i} className="mt-xs" style={{ color: "var(--on-night)" }}>
                  {p}
                </p>
              ))}
            </div>
            <Milestones items={c.events} linkYears />
          </div>
        </div>
      </section>

      {nearby.length > 0 && (
        <section className="section tone-off">
          <div className="wrap">
            <div className="section-head">
              <div>
                <p className="eyebrow-f1">{c.region}</p>
                <h2 className="title-1">More circuits nearby.</h2>
              </div>
              <LinkArrow href="/circuits">All circuits</LinkArrow>
            </div>
            <div className="grid grid-3">
              {nearby.map((x) => (
                <CircuitCard key={x.slug} c={x} />
              ))}
            </div>
            <div className="mt-l">
              <DataNotice>Lap records, lengths and race-by-race winners will be added from verified data in Phase 2.</DataNotice>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
