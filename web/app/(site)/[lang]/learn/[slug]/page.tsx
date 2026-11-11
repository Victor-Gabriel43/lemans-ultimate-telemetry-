import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Check, ChevronLeft, ChevronRight, Clock, Lightbulb } from "lucide-react";
import { lp, type Lang } from "@/lib/i18n/config";
import { fmt, getDict } from "@/lib/i18n/dict";
import { LESSONS, getLesson } from "@/lib/f1/learn";
import { Breadcrumbs, LinkArrow } from "@/components/site/ui";

export function generateStaticParams() {
  return LESSONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/learn/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const l = getLesson(slug);
  return l ? { title: l.title[lang as Lang], description: l.summary[lang as Lang] } : {};
}

export default async function LessonPage({ params }: PageProps<"/[lang]/learn/[slug]">) {
  const { lang: lg, slug } = await params;
  const lang = lg as Lang;
  const t = getDict(lang);
  const L = t.learn;
  const lesson = getLesson(slug);
  if (!lesson) notFound();
  const i = LESSONS.findIndex((l) => l.slug === slug);
  const prev = LESSONS[i - 1];
  const next = LESSONS[i + 1];
  const inLevel = LESSONS.filter((l) => l.level === lesson.level);
  const pos = inLevel.findIndex((l) => l.slug === slug) + 1;
  const levelName = L.levels[lesson.level];

  return (
    <>
      <section className="tone-paper" style={{ paddingTop: 28 }}>
        <div className="wrap-text">
          <Breadcrumbs lang={lang} items={[{ label: t.nav.learn, href: "/learn" }, { label: levelName, href: `/learn?level=${lesson.level}` }, { label: lesson.title[lang] }]} />
          <div style={{ padding: "clamp(40px,7vw,80px) 0 clamp(32px,4vw,48px)" }}>
            <div className="flex-row" style={{ gap: 10 }}>
              <span className={`badge ${lesson.level === "Beginner" ? "badge-red" : ""}`}>{levelName}</span>
              <span className="caption flex-row" style={{ gap: 4 }}>
                <Clock size={12} aria-hidden /> {fmt(t.common.minutesRead, { n: lesson.minutes })} · {fmt(L.lessonOf, { n: pos, total: inLevel.length })}
              </span>
            </div>
            <h1 className="display balance mt-s" style={{ fontSize: "clamp(40px,6.4vw,80px)" }}>
              {lesson.title[lang]}
            </h1>
            <p className="lede mt-s pretty">{lesson.summary[lang]}</p>
            <div style={{ height: 4, background: "var(--paper-3)", borderRadius: 4, marginTop: 28, overflow: "hidden" }} aria-label={fmt(L.progress, { n: pos, total: inLevel.length, level: levelName })} role="img">
              <div style={{ width: `${(pos / inLevel.length) * 100}%`, height: "100%", background: "var(--red)" }} />
            </div>
          </div>

          <aside className="notice" style={{ background: "var(--red-soft)", color: "var(--ink)" }}>
            <Lightbulb size={20} color="var(--red-ink)" aria-hidden />
            <div>
              <strong>{L.keyIdea}</strong> {lesson.keyIdea[lang]}
            </div>
          </aside>

          <div className="prose mt-m">
            {lesson.sections[lang].map((s) => (
              <div key={s.heading}>
                <h3>{s.heading}</h3>
                {s.body.map((p, n) => (
                  <p key={n}>{p}</p>
                ))}
              </div>
            ))}
          </div>

          <div className="tile mt-l tile-dark">
            <div className="tile-body">
              <p className="kicker">{L.example}</p>
              <p style={{ fontSize: 19, lineHeight: 1.5 }}>{lesson.example.text[lang]}</p>
              <LinkArrow lang={lang} href={lesson.example.href}>
                {lesson.example.label[lang]}
              </LinkArrow>
            </div>
          </div>

          <div className="tile mt-m" style={{ background: "var(--paper-2)" }}>
            <div className="tile-body">
              <p className="kicker">{L.takeaways}</p>
              <ul style={{ display: "grid", gap: 10, marginTop: 6 }}>
                {lesson.takeaways[lang].map((x) => (
                  <li key={x} className="flex-row" style={{ gap: 10, flexWrap: "nowrap", alignItems: "flex-start" }}>
                    <Check size={18} color="var(--red)" aria-hidden style={{ flexShrink: 0, marginTop: 3 }} />
                    <span style={{ fontWeight: 500 }}>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-m">
            <p className="kicker">{L.goDeeper}</p>
            <div className="flex-row mt-xs" style={{ gap: 18 }}>
              {lesson.related.map((r) => (
                <LinkArrow key={r.href} lang={lang} href={r.href}>
                  {r.label[lang]}
                </LinkArrow>
              ))}
            </div>
          </div>
        </div>
        <div style={{ height: "clamp(56px,8vw,96px)" }} />
      </section>

      <nav className="section-tight tone-off" aria-label={t.nav.learn}>
        <div className="wrap-text flex-row space-between" style={{ gap: 16 }}>
          {prev ? (
            <Link href={lp(lang, `/learn/${prev.slug}`)} className="flex-row" style={{ gap: 8, flexWrap: "nowrap" }}>
              <ChevronLeft size={20} aria-hidden />
              <span>
                <span className="caption" style={{ display: "block" }}>
                  {t.common.previous} · {L.levels[prev.level]}
                </span>
                <span className="title-3">{prev.title[lang]}</span>
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={lp(lang, `/learn/${next.slug}`)} className="flex-row" style={{ gap: 8, textAlign: "right", flexWrap: "nowrap" }}>
              <span>
                <span className="caption" style={{ display: "block" }}>
                  {t.common.next} · {L.levels[next.level]}
                </span>
                <span className="title-3">{next.title[lang]}</span>
              </span>
              <ChevronRight size={20} aria-hidden />
            </Link>
          ) : (
            <Link href={lp(lang, "/learn")} className="btn btn-primary btn-sm">
              {L.backToAll}
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
