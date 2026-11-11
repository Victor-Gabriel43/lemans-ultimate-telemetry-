"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { lp, type Lang } from "@/lib/i18n/config";

/** Previous / next and a chronological selector for any year-based archive. */
export function YearJump({ year, years, base, lang, label, format = (y: number) => String(y) }: { year: number; years: number[]; base: string; lang: Lang; label: string; format?: (y: number) => string }) {
  const router = useRouter();
  const i = years.indexOf(year);
  const prev = years[i - 1];
  const next = years[i + 1];
  return (
    <div className="flex-row" style={{ gap: 8 }}>
      {prev !== undefined && (
        <Link href={lp(lang, `${base}/${prev}`)} className="icon-btn" aria-label={String(prev)} style={{ background: "var(--paper-2)" }}>
          <ChevronLeft size={18} />
        </Link>
      )}
      <select className="select" aria-label={label} value={year} onChange={(e) => router.push(lp(lang, `${base}/${e.target.value}`))}>
        {[...years].reverse().map((y) => (
          <option key={y} value={y}>
            {format(y)}
          </option>
        ))}
      </select>
      {next !== undefined && (
        <Link href={lp(lang, `${base}/${next}`)} className="icon-btn" aria-label={String(next)} style={{ background: "var(--paper-2)" }}>
          <ChevronRight size={18} />
        </Link>
      )}
    </div>
  );
}
