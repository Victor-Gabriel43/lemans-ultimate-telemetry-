import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { lp, type Lang } from "@/lib/i18n/config";
import { fmt, getDict } from "@/lib/i18n/dict";
import { LESSONS } from "@/lib/f1/learn";
import { LessonBrowser } from "@/components/site/LessonBrowser";
import { PageIntro } from "@/components/site/ui";

export async function generateMetadata({ params }: PageProps<"/[lang]/learn">): Promise<Metadata> {
  const t = getDict((await params).lang as Lang);
  return { title: t.learn.metaTitle };
}

export default async function LearnPage({ params }: PageProps<"/[lang]/learn">) {
  const lang = (await params).lang as Lang;
  const t = getDict(lang);
  const total = LESSONS.reduce((n, l) => n + l.minutes, 0);
  return (
    <>
      <PageIntro lang={lang} crumbs={[{ label: t.nav.learn }]} eyebrow={t.learn.eyebrow} title={t.learn.title} lede={fmt(t.learn.lede, { n: LESSONS.length, m: total })}>
        <Link href={lp(lang, `/learn/${LESSONS[0].slug}`)} className="btn btn-red">
          {t.learn.start}
        </Link>
      </PageIntro>
      <section className="section-tight tone-off" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <Suspense fallback={<p className="muted">…</p>}>
            <LessonBrowser lang={lang} t={t} lessons={LESSONS.map((l) => ({ slug: l.slug, level: l.level, minutes: l.minutes, title: l.title[lang], summary: l.summary[lang] }))} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
