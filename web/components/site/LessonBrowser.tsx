"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Clock } from "lucide-react";
import type { Lesson, Level } from "@/lib/f1/learn";

export function LessonBrowser({ lessons, levels }: { lessons: Lesson[]; levels: { id: Level; description: string }[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const level = levels.find((l) => l.id === params.get("level"))?.id ?? null;

  const choose = (l: Level | null) => {
    const sp = new URLSearchParams(params.toString());
    if (l) sp.set("level", l);
    else sp.delete("level");
    router.replace(`${pathname}${sp.toString() ? `?${sp}` : ""}`, { scroll: false });
  };

  const shown = levels.filter((l) => !level || l.id === level);

  return (
    <div>
      <div className="tabs-list" role="tablist" aria-label="Difficulty">
        <button type="button" role="tab" className="tab" aria-selected={level === null} onClick={() => choose(null)}>
          All levels
        </button>
        {levels.map((l) => (
          <button key={l.id} type="button" role="tab" className="tab" aria-selected={level === l.id} onClick={() => choose(l.id)}>
            {l.id}
          </button>
        ))}
      </div>

      <div className="tab-panel" key={level ?? "all"}>
        {shown.map((l, li) => (
          <section key={l.id} style={{ marginTop: 48 }} aria-label={`${l.id} lessons`}>
            <div className="flex-row" style={{ alignItems: "baseline", gap: 14, marginBottom: 18 }}>
              <h2 className="title-2">
                <span className="muted num" style={{ marginRight: 10 }}>
                  0{levels.findIndex((x) => x.id === l.id) + 1}
                </span>
                {l.id}
              </h2>
              <p className="small muted">{l.description}</p>
            </div>
            <div className="grid grid-3">
              {lessons
                .filter((x) => x.level === l.id)
                .map((x, i) => (
                  <Link key={x.slug} href={`/learn/${x.slug}`} className="card">
                    <div className="card-body" style={{ padding: 24, gap: 8 }}>
                      <span className="flex-row caption" style={{ gap: 6 }}>
                        Lesson {li + 1}.{i + 1} · <Clock size={12} aria-hidden /> {x.minutes} min
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
        ))}
      </div>
    </div>
  );
}
