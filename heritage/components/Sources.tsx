import type { SourceRow } from "@/lib/queries";
import { formatDate } from "@/lib/format";

export function SourceList({ sources, title = "Sources" }: { sources: SourceRow[]; title?: string }) {
  const uniq = [...new Map(sources.map((s) => [s.id, s])).values()];
  if (!uniq.length) return <p className="text-sm text-flag">No source attached. This record cannot be considered verified.</p>;
  return (
    <div>
      <h3 className="mb-3 font-semibold">{title}</h3>
      <ol className="space-y-3">
        {uniq.map((s, i) => (
          <li key={s.id} className="flex gap-3 text-[15px]">
            <span className="w-6 shrink-0 text-right text-fog tabular-nums">{i + 1}</span>
            <span>
              <a href={s.url} target="_blank" rel="noreferrer noopener" className="underline decoration-asphalt underline-offset-4 hover:decoration-chalk">{s.title}</a>
              <span className="block text-[13px] text-fog">
                {s.publisher}{s.published ? `, ${formatDate(s.published)}` : ""}. Accessed {formatDate(s.accessed)}.
              </span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Small numbered source links placed after a statement. */
export function Cite({ sources }: { sources?: SourceRow[] }) {
  if (!sources?.length) return null;
  return (
    <span className="ml-1 inline-flex gap-1 align-super text-[11px]">
      {sources.map((s, i) => (
        <a key={s.id} href={s.url} target="_blank" rel="noreferrer noopener" title={`${s.publisher}: ${s.title}`} className="text-fog underline decoration-asphalt hover:text-chalk">
          [{i + 1}]
        </a>
      ))}
    </span>
  );
}
