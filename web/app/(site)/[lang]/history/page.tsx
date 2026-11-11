import Link from "next/link";
import type { Metadata } from "next";
import { lp, type Lang } from "@/lib/i18n/config";
import { fmt, getDict } from "@/lib/i18n/dict";
import { eras } from "@/lib/f1/content";
import { chassisPhoto } from "@/lib/f1/media";
import { championChassis } from "@/lib/f1/derive";
import { EraTimeline } from "@/components/site/EraTimeline";
import { LinkArrow, PageIntro, Plate, SectionHead } from "@/components/site/ui";

export async function generateMetadata({ params }: PageProps<"/[lang]/history">): Promise<Metadata> {
  const t = getDict((await params).lang as Lang);
  return { title: t.history.metaTitle, description: t.history.lede };
}

export default async function HistoryPage({ params }: PageProps<"/[lang]/history">) {
  const lang = (await params).lang as Lang;
  const t = getDict(lang);
  const E = eras(lang);
  const moments = E.flatMap((e) => e.developments);

  return (
    <>
      <PageIntro lang={lang} crumbs={[{ label: t.nav.history }]} eyebrow={t.history.eyebrow} title={t.history.title} lede={t.history.lede} />

      <section className="section-tight tone-off" id="timeline">
        <div className="wrap">
          <p className="kicker" style={{ marginBottom: 24 }}>
            {t.history.timelineKicker}
          </p>
          <EraTimeline
            eras={E.map((e) => ({ id: e.id, slug: e.slug, decade: e.decade, start: e.start, end: e.end, name: e.name, tagline: e.tagline, intro: e.intro, themes: e.themes, tone: e.tone }))}
            lang={lang}
            labels={{ read: t.history.readDecade, seasons: t.history.seasonsLink, prev: t.common.previous, next: t.common.next, tablist: t.history.eyebrow }}
          />
        </div>
      </section>

      <section className="section tone-paper">
        <div className="wrap">
          <SectionHead eyebrow={t.history.chaptersEyebrow} title={t.history.chaptersTitle} lede={t.history.chaptersLede} />
        </div>
        <div className="wrap-wide">
          <div className="grid grid-2" style={{ gap: 24 }}>
            {E.map((e, i) => {
              // a photograph of a championship-winning car from the decade, when licensed
              const cars = Array.from({ length: Math.min(e.end, 2025) - e.start + 1 }, (_, k) => championChassis(e.start + k)).filter(Boolean) as string[];
              const pic = cars.map((c) => chassisPhoto(c)).find(Boolean);
              return (
                <Link key={e.id} href={lp(lang, `/history/${e.slug}`)} className="tile tile-link" style={{ background: "var(--paper-2)" }}>
                  <Plate linked lang={lang} alt={`${e.decade} — ${e.name}`} photo={pic} tone={e.tone} ratio="ratio-wide" flat tag={fmt(t.history.chapter, { n: i + 1 })} glyph={e.decade} glyphSize="sm" />
                  <div className="tile-body">
                    <p className="kicker">{e.themes.join(" · ")}</p>
                    <p className="title-2">{e.name}</p>
                    <p className="muted pretty">{e.tagline}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section tone-night">
        <div className="wrap">
          <SectionHead
            eyebrow={t.history.momentsEyebrow}
            title={fmt(t.history.momentsTitle, { n: moments.length })}
            lede={t.history.momentsLede}
            action={
              <LinkArrow lang={lang} href="/seasons">
                {t.nav.seasons}
              </LinkArrow>
            }
          />
          <div className="grid grid-2" style={{ gap: "48px clamp(32px,6vw,96px)" }}>
            {E.map((e) => (
              <div key={e.id}>
                <p className="title-3" style={{ marginBottom: 18 }}>
                  <Link href={lp(lang, `/history/${e.slug}`)}>{e.decade}</Link>{" "}
                  <span className="muted" style={{ fontWeight: 500 }}>
                    — {e.name}
                  </span>
                </p>
                <ol className="milestones">
                  {e.developments.map((d) => (
                    <li key={d.year + d.title} className="milestone">
                      <p className="milestone-year">
                        <Link href={lp(lang, `/seasons/${d.year}`)}>{d.year}</Link>
                      </p>
                      <p className="milestone-title">{d.title}</p>
                      <p className="milestone-text">{d.text}</p>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
