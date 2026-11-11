"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

/** Previous / next season and a direct year selector. */
export function SeasonJump({ year, first, last }: { year: number; first: number; last: number }) {
  const router = useRouter();
  const years = Array.from({ length: last - first + 1 }, (_, i) => last - i);
  return (
    <div className="flex-row" style={{ gap: 8 }}>
      {year > first ? (
        <Link href={`/seasons/${year - 1}`} className="icon-btn" aria-label={`${year - 1} season`} style={{ background: "var(--paper-2)" }}>
          <ChevronLeft size={18} />
        </Link>
      ) : null}
      <select className="select" aria-label="Choose a season" value={year} onChange={(e) => router.push(`/seasons/${e.target.value}`)}>
        {years.map((y) => (
          <option key={y} value={y}>
            {y} season
          </option>
        ))}
      </select>
      {year < last ? (
        <Link href={`/seasons/${year + 1}`} className="icon-btn" aria-label={`${year + 1} season`} style={{ background: "var(--paper-2)" }}>
          <ChevronRight size={18} />
        </Link>
      ) : null}
    </div>
  );
}
