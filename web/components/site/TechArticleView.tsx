import Link from "next/link";
import { Lightbulb } from "lucide-react";
import { lp, type Lang } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dict";
import type { TechArticle } from "@/lib/f1/technology";
import { techArticles } from "@/lib/f1/content";
import { chassis, chassisName } from "@/lib/f1/db";
import { chassisPhoto } from "@/lib/f1/media";
import { resolveRef } from "@/lib/f1/regs";
import { CarCard } from "./cards";
import { BlockHead, Breadcrumbs, Disclosure, LinkArrow, Milestones, Plate, Specs, StatusBadge } from "./ui";
import { LocalNav } from "./LocalNav";
import { TONES } from "./tones";

/** Shared layout for Engineering topics and Regulation explainers. */
export function TechArticleView({ a, lang }: { a: TechArticle; lang: Lang }) {
  const t = getDict(lang);
  const E = t.engineering;
  const base = a.group === "engineering" ? "/engineering" : "/regulations";
  const sectionLabel = a.group === "engineering" ? t.nav.engineering : t.nav.regulations;
  const siblings = techArticles(lang, a.group);
  const all = techArticles(lang);
  const related = a.related.map((s) => all.find((x) => x.slug === s)).filter((x) => x !== undefined);
  const cars = a.cars.map((id) => chassis(id)).filter((x) => x !== undefined);
  const hero = cars.map((c) => ({ c: c!, p: chassisPhoto(c!.id) })).find((x) => x.p);
  const refs = a.regs.map((r) => ({ r, hit: resolveRef(r) })).filter((z) => z.hit);

  return (
    <>
      <LocalNav lang={lang} title={sectionLabel} titleHref={base} links={siblings.map((s) => ({ label: s.title, href: `${base}/${s.slug}` }))} />
      <section className="tone-paper" style={{ paddingTop: 28 }}>
        <div className="wrap-text">
          <Breadcrumbs lang={lang} items={[{ label: sectionLabel, href: base }, { label: a.title }]} />
          <div style={{ padding: "clamp(40px,7vw,80px) 0 0" }}>
            <p className="eyebrow-f1">{sectionLabel}</p>
            <h1 className="display balance">{a.title}</h1>
            <p className="lede mt-s pretty">{a.summary}</p>
            <div className="mt-s">
              <StatusBadge lang={lang} status="editorial" />
            </div>
          </div>
        </div>
        <div className="wrap" style={{ padding: "clamp(40px,6vw,64px) var(--gutter)" }}>
          <Plate
            lang={lang}
            alt={hero ? chassisName(hero.c.id) : a.title}
            photo={hero?.p}
            tone={a.tone}
            ratio="ratio-cinema"
            tag={hero ? chassisName(hero.c.id) : sectionLabel}
            glyph={a.title}
            glyphSize="sm"
            priority
            caption={hero ? chassisName(hero.c.id) : undefined}
          />
        </div>
      </section>

      <section className="tone-paper" style={{ paddingBottom: "clamp(56px,8vw,96px)" }}>
        <div className="wrap-text">
          <aside className="notice" style={{ background: "var(--red-soft)", color: "var(--ink)" }}>
            <Lightbulb size={20} color="var(--red-ink)" aria-hidden />
            <div>
              <strong>{E.inSimpleTerms}</strong> {a.simple}
            </div>
          </aside>
          {a.facts.length > 0 && (
            <div className="mt-l">
              <p className="eyebrow-f1">{E.keyFacts}</p>
              <Specs rows={a.facts.map((f) => [f.label, f.value] as [string, string])} />
            </div>
          )}
          <div className="prose mt-l">
            {a.sections.map((s) => (
              <div key={s.heading}>
                <h3>{s.heading}</h3>
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {refs.length > 0 && (
        <section className="section-tight tone-night">
          <div className="wrap">
            <div className="flex-row" style={{ marginBottom: 16 }}>
              <p className="eyebrow-f1" style={{ margin: 0 }}>
                {E.relatedRegs}
              </p>
              <StatusBadge lang={lang} status="official" />
            </div>
            <div className="grid grid-2" style={{ gap: 12 }}>
              {refs.map(({ r, hit }) => (
                <Link key={`${r.kind}-${r.num}`} href={lp(lang, `/regulations/archive/${hit!.doc.year}/${hit!.doc.id}/${encodeURIComponent(r.num)}`)} className="tile tile-link">
                  <div className="tile-body" style={{ padding: "18px 22px" }}>
                    <span className="caption" style={{ color: "var(--on-night-2)" }}>
                      {t.regulations.sectionNames[hit!.doc.kind]} {hit!.doc.year} · {hit!.doc.issue ? `Iss. ${hit!.doc.issue}` : ""}
                    </span>
                    <span className="title-3">
                      {r.num} · {hit!.article.title}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section tone-off">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: "clamp(32px,6vw,96px)", alignItems: "start" }}>
            <div>
              <p className="eyebrow-f1">{E.glossary}</p>
              <p className="muted">{E.glossaryHint}</p>
              <div className="mt-m">
                {a.concepts.map((c) => (
                  <Disclosure key={c.term} title={c.term}>
                    <p>{c.definition}</p>
                  </Disclosure>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow-f1">{E.throughYears}</p>
              <div className="mt-m">
                <Milestones lang={lang} items={a.history} linkYears />
              </div>
            </div>
          </div>
        </div>
      </section>

      {cars.length > 0 && (
        <section className="section tone-paper">
          <div className="wrap-wide">
            <BlockHead eyebrow={t.nav.cars} title={E.relatedCars} />
            <div className="grid grid-4 keep-2">
              {cars.map((c) => (
                <CarCard key={c!.id} ch={c!} lang={lang} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section tone-off">
        <div className="wrap">
          <BlockHead
            eyebrow={E.relatedTopics}
            title={sectionLabel}
            action={
              <LinkArrow lang={lang} href={a.group === "engineering" ? "/regulations" : "/engineering"}>
                {a.group === "engineering" ? E.regulationsLink : t.nav.engineering}
              </LinkArrow>
            }
          />
          <div className="grid grid-3">
            {related.map((r) => (
              <Link key={r!.slug} href={lp(lang, `/${r!.group === "engineering" ? "engineering" : "regulations"}/${r!.slug}`)} className="card">
                <div style={{ height: 6, background: TONES[r!.tone] }} />
                <div className="card-body">
                  <p className="card-title">{r!.title}</p>
                  <p className="small muted">{r!.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
