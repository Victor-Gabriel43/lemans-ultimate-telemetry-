import type { SourceRow } from "@/lib/queries";
import { formatDate } from "@/lib/format";

export function SourceList({ sources, title = "Sources & references" }: { sources: SourceRow[]; title?: string }) {
  const uniq = [...new Map(sources.map((s) => [s.id, s])).values()];
  if (!uniq.length)
    return <p className="font-mono text-xs text-signal">No source attached — this record cannot be considered verified.</p>;
  return (
    <div>
      <h3 className="eyebrow mb-3">{title}</h3>
      <ol className="space-y-2.5">
        {uniq.map((s, i) => (
          <li key={s.id} className="flex gap-3 text-sm">
            <span className="font-mono text-xs text-mute tabular-nums">[{i + 1}]</span>
            <span>
              <a href={s.url} target="_blank" rel="noreferrer noopener" className="text-paper underline decoration-line underline-offset-4 hover:decoration-amber">
                {s.title}
              </a>
              <span className="block text-xs text-mute">
                {s.publisher}
                {s.published ? ` · ${formatDate(s.published)}` : ""} · accessed {formatDate(s.accessed)}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Inline footnote markers, e.g. [1][2]. */
export function Cite({ sources }: { sources?: SourceRow[] }) {
  if (!sources?.length) return null;
  return (
    <span className="ml-1 inline-flex gap-0.5 align-super text-[10px]">
      {sources.map((s) => (
        <a key={s.id} href={s.url} target="_blank" rel="noreferrer noopener" title={`${s.publisher} — ${s.title}`} className="font-mono text-mute hover:text-amber">
          ↗
        </a>
      ))}
    </span>
  );
}
