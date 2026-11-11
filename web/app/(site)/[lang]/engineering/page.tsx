import Link from "next/link";
import type { Metadata } from "next";
import { lp, type Lang } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dict";
import { techArticles } from "@/lib/f1/content";
import { LinkArrow, PageIntro, Plate } from "@/components/site/ui";
import { chassisPhoto } from "@/lib/f1/media";

export async function generateMetadata({ params }: PageProps<"/[lang]/engineering">): Promise<Metadata> {
  const t = getDict((await params).lang as Lang);
  return { title: t.engineering.metaTitle, description: t.engineering.lede };
}

export default async function EngineeringPage({ params }: PageProps<"/[lang]/engineering">) {
  const lang = (await params).lang as Lang;
  const t = getDict(lang);
  const items = techArticles(lang, "engineering");
  // A distinct car photograph per topic (first illustrating car not used by an earlier card).
  const used = new Set<string>();
  const pics = items.map((a) => {
    const id = a.cars.find((c) => !used.has(c) && chassisPhoto(c));
    if (id) used.add(id);
    return id ? chassisPhoto(id) : undefined;
  });
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
                <Plate linked lang={lang} alt={a.title} photo={pics[i]} tone={a.tone} ratio="ratio-square" flat tag={String(i + 1).padStart(2, "0")} glyph={a.title} glyphSize="sm" />
                <div className="card-body">
                  <p className="card-title">{a.title}</p>
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
