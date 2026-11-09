import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getLivery, sourcesFor } from "@/lib/queries";
import { Container } from "@/components/Section";
import LiveryArt from "@/components/LiveryArt";
import Gallery, { type GalleryItem } from "@/components/Gallery";
import { SourceList } from "@/components/Sources";
import { VerificationBadge, VerificationNotice } from "@/components/Verification";
import { formatDate, parseDesign, splitList } from "@/lib/format";
import { LIVERY_KINDS, PHOTO_VIEWS } from "@/lib/vocab";

type Params = { params: Promise<{ slug: string; livery: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug, livery } = await params;
  const l = await getLivery(livery);
  if (!l || l.vehicle.slug !== slug) return {};
  return {
    title: `${l.name} — ${l.vehicle.fullName} (${l.year})`,
    description: `${l.background.slice(0, 155)}`,
    alternates: { canonical: `/vehicles/${slug}/liveries/${l.slug}` },
  };
}

export async function generateStaticParams() {
  return (await db.livery.findMany({ select: { slug: true, vehicle: { select: { slug: true } } } })).map((l) => ({ slug: l.vehicle.slug, livery: l.slug }));
}

export default async function LiveryPage({ params }: Params) {
  const { slug, livery } = await params;
  const l = await getLivery(livery);
  if (!l || l.vehicle.slug !== slug) notFound();
  const sources = (await sourcesFor("Livery", [l.id])).get(l.id) ?? [];
  const design = parseDesign(l.design);
  const numbers = splitList(l.carNumbers);
  const siblings = await db.livery.findMany({ where: { vehicleId: l.vehicleId }, orderBy: [{ year: "asc" }, { firstUsed: "asc" }], select: { slug: true, name: true, year: true } });
  const idx = siblings.findIndex((s) => s.slug === l.slug);
  const prev = siblings[idx - 1];
  const next = siblings[idx + 1];

  const photoByView = new Map(l.photos.map((p) => [p.view, p]));
  const gallery: GalleryItem[] = [
    ...l.photos.map((p) => ({ kind: "photo" as const, id: p.id, url: p.url, alt: p.alt, caption: p.caption, credit: p.credit, view: p.view })),
    ...numbers.length > 1
      ? numbers.map((n) => ({ kind: "art" as const, id: `art-${n}`, design, number: n, title: `${l.name} — #${n}` }))
      : [{ kind: "art" as const, id: "art", design, number: numbers[0], title: l.name }],
  ];

  const facts: [string, React.ReactNode][] = [
    ["Year", l.year],
    ["Season", l.season || "—"],
    ["Team", l.team ? <Link href={`/teams/${l.team.slug}`} className="hover:underline">{l.team.name}</Link> : "—"],
    ["Car number", numbers.length ? numbers.map((n) => `#${n}`).join(", ") : "—"],
    ["Championship", l.championship?.name ?? "—"],
    ["Race or event", l.event || "—"],
    ["First seen", formatDate(l.firstUsed)],
    ["Type", LIVERY_KINDS[l.kind] ?? l.kind],
  ];

  return (
    <article>
      <header className="grain relative overflow-hidden border-b hairline">
        <div aria-hidden className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 80%, ${design.accents[0] ?? design.base}22, transparent 60%)` }} />
        <Container className="relative pt-12 pb-10">
          <nav aria-label="Breadcrumb" className="eyebrow">
            <Link href={`/vehicles/${slug}`} className="hover:text-paper">{l.vehicle.fullName}</Link> /{" "}
            <Link href={`/vehicles/${slug}/liveries`} className="hover:text-paper">Liveries</Link> / {l.year}
          </nav>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="eyebrow text-amber">{LIVERY_KINDS[l.kind] ?? l.kind}</span>
            <VerificationBadge status={l.verification} />
            {l.isVariation ? <span className="rounded-full border hairline px-2 py-0.5 font-mono text-[10px] tracking-widest text-soft uppercase">Seasonal variation</span> : null}
          </div>
          <h1 className="display rise mt-4 max-w-5xl text-[clamp(2.6rem,7vw,6.5rem)]">{l.name}</h1>
          <LiveryArt design={design} number={numbers[0]} title={l.name} className="mx-auto mt-6 max-w-6xl" />
          {design.note ? <p className="mt-2 text-center font-mono text-[11px] text-mute">{design.note}</p> : null}
        </Container>
      </header>

      <Container className="grid gap-16 py-16 lg:grid-cols-[1fr_360px] [&>*]:min-w-0">
        <div className="space-y-14">
          <VerificationNotice status={l.verification} />
          {l.parent ? (
            <p className="rounded-sm border hairline p-4 text-sm text-soft">
              Recorded as a {l.isVariation ? "seasonal variation" : "derivative"} of{" "}
              <Link className="text-paper underline underline-offset-4" href={`/vehicles/${slug}/liveries/${l.parent.slug}`}>{l.parent.name}</Link>{" "}
              — not a new design.
            </p>
          ) : null}
          <section>
            <h2 className="eyebrow mb-4">Historical background</h2>
            <div className="prose-archive"><p>{l.background}</p></div>
          </section>
          <section>
            <h2 className="eyebrow mb-4">Inspiration</h2>
            <div className="prose-archive"><p>{l.inspiration}</p></div>
          </section>
          <section>
            <h2 className="eyebrow mb-4">Palette (illustrative)</h2>
            <div className="flex flex-wrap gap-3">
              {[design.base, ...design.accents].map((c, i) => (
                <div key={`${c}-${i}`} className="flex items-center gap-2">
                  <span className="h-8 w-8 rounded-full border hairline" style={{ background: c }} />
                  <span className="font-mono text-xs text-mute">{c}</span>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="eyebrow mb-4">Photographs — front, rear, side, top</h2>
            <ul className="mb-8 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {(["front", "rear", "side", "top"] as const).map((view) => (
                <li key={view} className={`rounded-sm border p-3 text-center font-mono text-[10px] break-words uppercase ${photoByView.has(view) ? "border-verified/40 text-verified" : "border-dashed hairline text-mute"}`}>
                  {view} {photoByView.has(view) ? "· archived" : "· not yet archived"}
                </li>
              ))}
            </ul>
            <Gallery items={gallery} columns={2} />
            <p className="mt-3 text-xs text-mute">
              Accepted photo views: {PHOTO_VIEWS.join(", ")}. Only images with a recorded credit and licence are published.
            </p>
          </section>
          {l.timeline.length ? (
            <section>
              <h2 className="eyebrow mb-4">Appears in the timeline</h2>
              <ul className="divide-y divide-line border-y hairline">
                {l.timeline.map((t) => (
                  <li key={t.id}>
                    <Link href={`/vehicles/${slug}/timeline#${t.id}`} className="flex gap-6 py-3 hover:text-white">
                      <span className="w-36 shrink-0 font-mono text-xs text-amber">{formatDate(t.date, t.datePrecision)}</span>
                      <span>{t.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {l.variants.length ? (
            <section>
              <h2 className="eyebrow mb-4">Seasonal variations of this design</h2>
              <ul className="space-y-2">
                {l.variants.map((vr) => (
                  <li key={vr.id}><Link className="hover:underline" href={`/vehicles/${slug}/liveries/${vr.slug}`}>{vr.year} — {vr.name}</Link></li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <aside className="space-y-10 lg:sticky lg:top-24 lg:h-fit">
          <dl className="divide-y divide-line border-y hairline">
            {facts.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[120px_1fr] gap-4 py-3 text-sm">
                <dt className="eyebrow pt-0.5">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
            <div className="grid grid-cols-[120px_1fr] gap-4 py-3 text-sm">
              <dt className="eyebrow pt-0.5">Drivers</dt>
              <dd>{l.drivers.length ? l.drivers.map((d) => <Link key={d.driverId} href={`/drivers/${d.driver.slug}`} className="block hover:underline">{d.driver.name}</Link>) : "Not documented"}</dd>
            </div>
            <div className="grid grid-cols-[120px_1fr] gap-4 py-3 text-sm">
              <dt className="eyebrow pt-0.5">Sponsors</dt>
              <dd>{splitList(l.sponsors).join(", ") || "Not documented"}</dd>
            </div>
          </dl>
          <SourceList sources={sources} />
          <div className="flex gap-2">
            <Link href={`/vehicles/${slug}/compare?l=${l.slug}`} className="rounded-full bg-paper px-4 py-2 text-sm text-ink hover:bg-white">Compare this livery</Link>
          </div>
        </aside>
      </Container>

      <Container>
        <nav aria-label="Livery navigation" className="grid grid-cols-2 border-t hairline pt-6 text-sm">
          {prev ? <Link href={`/vehicles/${slug}/liveries/${prev.slug}`} className="text-soft hover:text-paper">← {prev.year} · {prev.name}</Link> : <span />}
          {next ? <Link href={`/vehicles/${slug}/liveries/${next.slug}`} className="text-right text-soft hover:text-paper">{next.year} · {next.name} →</Link> : <span />}
        </nav>
      </Container>
    </article>
  );
}
