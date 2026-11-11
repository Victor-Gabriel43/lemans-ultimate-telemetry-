"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Clock } from "lucide-react";
import { lp, type Lang } from "@/lib/i18n/config";
import { fmt, type Dict } from "@/lib/i18n/dict";

export type LessonRow = { slug: string; level: string; minutes: number; title: string; summary: string };
const LEVELS = ["Beginner", "Intermediate", "Advanced"];

export function LessonBrowser({ lessons, lang, t }: { lessons: LessonRow[]; lang: Lang; t: Dict }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const level = LEVELS.find((l) => l === params.get("level")) ?? null;
  const choose = (l: string | null) => {
    const sp = new URLSearchParams(params.toString());
    if (l) sp.set("level", l);
    else sp.delete("level");
    router.replace(`${pathname}${sp.toString() ? `?${sp}` : ""}`, { scroll: false });
  };
  const shown = LEVELS.filter((l) => !level || l === level);

  return (
    <div>
      <div className="tabs-list" role="tablist" aria-label={t.learn.metaTitle}>
        <button type="button" role="tab" className="tab" aria-selected={level === null} onClick={() => choose(null)}>
          {t.learn.allLevels}
        </button>
        {LEVELS.map((l) => (
          <button key={l} type="button" role="tab" className="tab" aria-selected={level === l} onClick={() => choose(l)}>
            {t.learn.levels[l]}
          </button>
        ))}
      </div>
      <div className="tab-panel" key={level ?? "all"}>
        {shown.map((l) => {
          const li = LEVELS.indexOf(l);
          return (
            <section key={l} style={{ marginTop: 48 }} aria-label={t.learn.levels[l]}>
              <div className="flex-row" style={{ alignItems: "baseline", gap: 14, marginBottom: 18 }}>
                <h2 className="title-2">
                  <span className="muted num" style={{ marginRight: 10 }}>
                    0{li + 1}
                  </span>
                  {t.learn.levels[l]}
                </h2>
                <p className="small muted">{t.learn.levelDesc[l]}</p>
              </div>
              <div className="grid grid-3">
                {lessons
                  .filter((x) => x.level === l)
                  .map((x, i) => (
                    <Link key={x.slug} href={lp(lang, `/learn/${x.slug}`)} className="card">
                      <div className="card-body" style={{ padding: 24, gap: 8 }}>
                        <span className="flex-row caption" style={{ gap: 6 }}>
                          {fmt(t.learn.lesson, { n: `${li + 1}.${i + 1}` })} · <Clock size={12} aria-hidden /> {fmt(t.common.minutesRead, { n: x.minutes })}
                        </span>
                        <span className="card-title" style={{ fontSize: 21 }}>
                          {x.title}
                        </span>
                        <span className="small muted pretty">{x.summary}</span>
                      </div>
                    </Link>
                  ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
