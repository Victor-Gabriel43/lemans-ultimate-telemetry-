"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { lp, type Lang } from "@/lib/i18n/config";

/** Select another issue of the same regulation. */
export function IssueSelect({ lang, current, options, label }: { lang: Lang; current: string; options: { id: string; year: number; label: string }[]; label: string }) {
  const router = useRouter();
  return (
    <select className="select" aria-label={label} value={current} onChange={(e) => {
      const o = options.find((x) => x.id === e.target.value)!;
      router.push(lp(lang, `/regulations/archive/${o.year}/${o.id}`));
    }} style={{ maxWidth: 360 }}>
      {options.map((o) => (
        <option key={o.id} value={o.id}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export type IndexArticle = { num: string; title: string | null; chapter: string | null; located: boolean };

/** Article index with client-side filter by number or title. */
export function ArticleIndex({ lang, base, articles, chapters, placeholder, unlocatedLabel }: { lang: Lang; base: string; articles: IndexArticle[]; chapters: { num: string; title: string }[]; placeholder: string; unlocatedLabel: string }) {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    return query ? articles.filter((a) => a.num.toLowerCase().startsWith(query) || (a.title ?? "").toLowerCase().includes(query)) : articles;
  }, [articles, q]);
  const groups = useMemo(() => {
    const m = new Map<string, IndexArticle[]>();
    list.forEach((a) => m.set(a.chapter ?? a.num.replace(/\..*$/, ""), [...(m.get(a.chapter ?? a.num.replace(/\..*$/, "")) ?? []), a]));
    return [...m.entries()];
  }, [list]);
  const chTitle = (n: string) => chapters.find((c) => c.num === n)?.title ?? "";

  return (
    <div>
      <label className="field" style={{ maxWidth: 420 }}>
        <Search size={16} aria-hidden />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder} aria-label={placeholder} />
      </label>
      <p className="caption mt-xs">
        {list.length} / {articles.length}
      </p>
      <div className="mt-s" style={{ columns: "2 340px", columnGap: 40 }}>
        {groups.map(([ch, items]) => (
          <div key={ch} style={{ breakInside: "avoid", marginBottom: 20 }}>
            <p className="kicker" style={{ marginBottom: 6 }}>
              {ch} {chTitle(ch) && `· ${chTitle(ch)}`}
            </p>
            <ul>
              {items.map((a) => (
                <li key={a.num} style={{ borderBottom: "1px solid var(--line-soft)" }}>
                  <Link href={lp(lang, `${base}/${encodeURIComponent(a.num)}`)} className="flex-row" style={{ gap: 10, padding: "7px 0", flexWrap: "nowrap", alignItems: "baseline" }}>
                    <span className="num" style={{ fontWeight: 700, minWidth: 64, fontSize: 14 }}>
                      {a.num}
                    </span>
                    <span className="small">{a.title ?? "—"}</span>
                    {!a.located && (
                      <span className="badge status-warn" style={{ marginLeft: "auto" }}>
                        {unlocatedLabel}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
