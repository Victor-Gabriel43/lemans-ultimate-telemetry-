import Link from "next/link";
import type { Metadata } from "next";
import { lp, type Lang } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dict";
import { techArticles } from "@/lib/f1/content";
import { LinkArrow, PageIntro } from "@/components/site/ui";
import { TONES } from "@/components/site/tones";

export async function generateMetadata({ params }: PageProps<"/[lang]/engineering">): Promise<Metadata> {
  const t = getDict((await params).lang as Lang);
  return { title: t.engineering.metaTitle, description: t.engineering.lede };
}

export default async function EngineeringPage({ params }: PageProps<"/[lang]/engineering">) {
  const lang = (await params).lang as Lang;
  const t = getDict(lang);
  const items = techArticles(lang, "engineering");
  return (
    <>
      <PageIntro lang={lang} crumbs={[{ label: t.nav.engineering }]} eyebrow={t.engineering.eyebrow} title={t.engineering.title} lede={t.engineering.lede}>
        <LinkArrow lang={lang} href="/regulations">
          {t.engineering.regulationsLink}
        </LinkArrow>
      </PageIntro>
      <section className="section tone-off">
        <div className="wrap">
          <div className="grid grid-4 keep-2">
            {items.map((a, i) => (
              <Link key={a.slug} href={lp(lang, `/engineering/${a.slug}`)} className="card">
                <div className="plate plate-flat ratio-square" style={{ background: TONES[a.tone] }}>
                  <div className="plate-art">
                    <span className="plate-tag">{String(i + 1).padStart(2, "0")}</span>
                    <span className="plate-glyph" style={{ fontSize: "clamp(24px,2.4vw,32px)", letterSpacing: "-0.03em" }}>
                      {a.title}
                    </span>
                  </div>
                </div>
                <div className="card-body">
                  <p className="small muted pretty">{a.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
