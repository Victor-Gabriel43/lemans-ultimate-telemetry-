import Link from "next/link";
import type { Metadata } from "next";
import { lp, type Lang } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dict";
import { RACE_TOPICS, SPRINT_WEEKEND, STANDARD_WEEKEND, WEEKEND_FAQ, type WeekendStep } from "@/lib/f1/weekend";
import { resolveRef } from "@/lib/f1/regs";
import { Tabs } from "@/components/site/Tabs";
import { Disclosure, LinkArrow, PageIntro, SectionHead } from "@/components/site/ui";

export async function generateMetadata({ params }: PageProps<"/[lang]/race-weekend">): Promise<Metadata> {
  const t = getDict((await params).lang as Lang);
  return { title: t.weekend.metaTitle, description: t.weekend.lede };
}

function Schedule({ steps, lang }: { steps: WeekendStep[]; lang: Lang }) {
  return (
    <div>
      <ol className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
        {steps.map((s, i) => (
          <li key={s.id + i} className="tile" style={{ background: "var(--paper)" }}>
            <div className="tile-body" style={{ padding: 22 }}>
              <span className="caption">
                {String(i + 1).padStart(2, "0")} · {s.day[lang]}
              </span>
              <span className="title-3">{s.title[lang]}</span>
              <span className="small muted pretty">{s.short[lang]}</span>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-l">
        {steps.map((s, i) => (
          <Disclosure key={s.id + i} title={`${s.title[lang]} — ${s.day[lang]}`} open={i === 0}>
            {s.body[lang].map((p, n) => (
              <p key={n}>{p}</p>
            ))}
            <div className="flex-row mt-s" style={{ gap: 8 }}>
              {s.facts[lang].map((f) => (
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

export default async function RaceWeekendPage({ params, searchParams }: PageProps<"/[lang]/race-weekend">) {
  const lang = (await params).lang as Lang;
  const { format } = await searchParams;
  const t = getDict(lang);
  const W = t.weekend;
  return (
    <>
      <PageIntro lang={lang} crumbs={[{ label: t.nav.weekend }]} eyebrow={W.eyebrow} title={W.title} lede={W.lede}>
        <nav className="chip-row" aria-label={W.duringEyebrow}>
          {RACE_TOPICS.map((x) => (
            <a key={x.id} href={`#${x.id}`} className="chip">
              {x.title[lang]}
            </a>
          ))}
        </nav>
      </PageIntro>

      <section className="section tone-off">
        <div className="wrap">
          <SectionHead eyebrow={W.formatEyebrow} title={W.formatTitle} lede={W.formatLede} />
          <Tabs
            key={format === "sprint" ? "sprint" : "standard"}
            label={W.formatEyebrow}
            initial={format === "sprint" ? "sprint" : "standard"}
            items={[
              { id: "standard", label: W.standard, content: <Schedule steps={STANDARD_WEEKEND} lang={lang} /> },
              { id: "sprint", label: W.sprint, content: <Schedule steps={SPRINT_WEEKEND} lang={lang} /> },
            ]}
          />
        </div>
      </section>

      <section className="section tone-paper">
        <div className="wrap">
          <SectionHead eyebrow={W.duringEyebrow} title={W.duringTitle} lede={W.duringLede} />
          <div className="grid grid-2" style={{ gap: 20 }}>
            {RACE_TOPICS.map((x) => {
              const refs = x.regs.map((r) => ({ r, hit: resolveRef(r) })).filter((z) => z.hit);
              return (
                <article key={x.id} id={x.id} className="tile" style={{ background: "var(--paper-2)", scrollMarginTop: 80 }}>
                  <div className="tile-body">
                    <h3 className="title-2">{x.title[lang]}</h3>
                    <p style={{ fontWeight: 600 }}>{x.summary[lang]}</p>
                    {x.body[lang].map((p, i) => (
                      <p key={i} className="muted pretty">
                        {p}
                      </p>
                    ))}
                    {x.changed && (
                      <div style={{ borderTop: "1px solid var(--line)", paddingTop: 12, marginTop: 4 }}>
                        <p className="kicker">{W.howChanged}</p>
                        {x.changed[lang].map((p, i) => (
                          <p key={i} className="small muted pretty mt-xs">
                            {p}
                          </p>
                        ))}
                      </div>
                    )}
                    {(refs.length > 0 || x.learn) && (
                      <div className="flex-row" style={{ gap: 8, marginTop: "auto", paddingTop: 12 }}>
                        {refs.map(({ r, hit }) => (
                          <Link key={r.num} href={lp(lang, `/regulations/archive/${hit!.doc.year}/${hit!.doc.id}/${encodeURIComponent(r.num)}`)} className="chip" title={hit!.article.title ?? ""}>
                            {r.num} · {hit!.article.title}
                          </Link>
                        ))}
                        {x.learn && (
                          <LinkArrow lang={lang} href={`/learn/${x.learn}`} className="small">
                            {t.nav.learn}
                          </LinkArrow>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section tone-night">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: "clamp(32px,6vw,96px)", alignItems: "start" }}>
            <div>
              <p className="eyebrow-f1">{W.faqEyebrow}</p>
              <h2 className="headline">{W.faqTitle}</h2>
              <p className="lede mt-s">{W.faqLede}</p>
              <p className="mt-m">
                <LinkArrow lang={lang} href="/learn/reading-a-race">
                  {W.followRace}
                </LinkArrow>
              </p>
            </div>
            <div>
              {WEEKEND_FAQ.map((f) => (
                <Disclosure key={f.q.en} title={f.q[lang]}>
                  <p>{f.a[lang]}</p>
                </Disclosure>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
