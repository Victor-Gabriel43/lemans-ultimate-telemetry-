import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Check, ChevronLeft, ChevronRight, Clock, Lightbulb } from "lucide-react";
import { LESSONS, getLesson } from "@/lib/f1/learn";
import { Breadcrumbs, LinkArrow } from "@/components/site/ui";

export function generateStaticParams() {
  return LESSONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps<"/learn/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const l = getLesson(slug);
  return l ? { title: l.title, description: l.summary } : {};
}

export default async function LessonPage({ params }: PageProps<"/learn/[slug]">) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();
  const i = LESSONS.findIndex((l) => l.slug === slug);
  const prev = LESSONS[i - 1];
  const next = LESSONS[i + 1];
  const inLevel = LESSONS.filter((l) => l.level === lesson.level);
  const pos = inLevel.findIndex((l) => l.slug === slug) + 1;

  return (
    <>
      <section className="tone-paper" style={{ paddingTop: 28 }}>
        <div className="wrap-text">
          <Breadcrumbs items={[{ label: "Learn", href: "/learn" }, { label: lesson.level, href: `/learn?level=${lesson.level}` }, { label: lesson.title }]} />
          <div style={{ padding: "clamp(40px,7vw,80px) 0 clamp(32px,4vw,48px)" }}>
            <div className="flex-row" style={{ gap: 10 }}>
              <span className={`badge ${lesson.level === "Beginner" ? "badge-red" : ""}`}>{lesson.level}</span>
              <span className="caption flex-row" style={{ gap: 4 }}>
                <Clock size={12} aria-hidden /> {lesson.minutes} min read · Lesson {pos} of {inLevel.length}
              </span>
            </div>
            <h1 className="display balance mt-s" style={{ fontSize: "clamp(40px,6.4vw,80px)" }}>
              {lesson.title}
            </h1>
            <p className="lede mt-s pretty">{lesson.summary}</p>
            <div style={{ height: 4, background: "var(--paper-3)", borderRadius: 4, marginTop: 28, overflow: "hidden" }} aria-label={`Progress: lesson ${pos} of ${inLevel.length} in ${lesson.level}`} role="img">
              <div style={{ width: `${(pos / inLevel.length) * 100}%`, height: "100%", background: "var(--red)" }} />
            </div>
          </div>

          <aside className="notice" style={{ background: "var(--red-soft)", color: "var(--ink)" }}>
            <Lightbulb size={20} color="var(--red-ink)" aria-hidden />
            <div>
              <strong>The key idea.</strong> {lesson.keyIdea}
            </div>
          </aside>

          <div className="prose mt-m">
            {lesson.sections.map((s) => (
              <div key={s.heading}>
                <h3>{s.heading}</h3>
                {s.body.map((p, n) => (
                  <p key={n}>{p}</p>
                ))}
              </div>
            ))}
          </div>

          <div className="tile mt-l" style={{ background: "var(--paper-2)" }}>
            <div className="tile-body">
              <p className="kicker">Takeaways</p>
              <ul style={{ display: "grid", gap: 10, marginTop: 6 }}>
                {lesson.takeaways.map((t) => (
                  <li key={t} className="flex-row" style={{ gap: 10, flexWrap: "nowrap", alignItems: "flex-start" }}>
                    <Check size={18} color="var(--red)" aria-hidden style={{ flexShrink: 0, marginTop: 3 }} />
                    <span style={{ fontWeight: 500 }}>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {lesson.related.length > 0 && (
            <div className="mt-m">
              <p className="kicker">Go deeper</p>
              <div className="flex-row mt-xs" style={{ gap: 18 }}>
                {lesson.related.map((r) => (
                  <LinkArrow key={r.href} href={r.href}>
                    {r.label}
                  </LinkArrow>
                ))}
              </div>
            </div>
          )}
        </div>
        <div style={{ height: "clamp(56px,8vw,96px)" }} />
      </section>

      <nav className="section-tight tone-off" aria-label="Lesson navigation">
        <div className="wrap-text flex-row space-between" style={{ gap: 16 }}>
          {prev ? (
            <Link href={`/learn/${prev.slug}`} className="flex-row" style={{ gap: 8, flexWrap: "nowrap" }}>
              <ChevronLeft size={20} aria-hidden />
              <span>
                <span className="caption" style={{ display: "block" }}>
                  Previous · {prev.level}
                </span>
                <span className="title-3">{prev.title}</span>
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/learn/${next.slug}`} className="flex-row" style={{ gap: 8, textAlign: "right", flexWrap: "nowrap" }}>
              <span>
                <span className="caption" style={{ display: "block" }}>
                  Next · {next.level}
                </span>
                <span className="title-3">{next.title}</span>
              </span>
              <ChevronRight size={20} aria-hidden />
            </Link>
          ) : (
            <Link href="/learn" className="btn btn-primary btn-sm">
              Back to all lessons
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
