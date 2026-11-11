/**
 * Motorsport Intelligence mark: three slanted bars stepping up like an apex
 * kerb, closed by a lime "apex" dot. Works at 16px and at billboard size.
 */
export function Mark({ className = "", accent = true }: { className?: string; accent?: boolean }) {
  return (
    <svg viewBox="0 0 40 28" className={className} aria-hidden fill="currentColor">
      <path d="M4 26 L10 6 H15 L9 26 Z" />
      <path d="M13 26 L17 13 H22 L18 26 Z" />
      <path d="M22 26 L24 20 H29 L27 26 Z" />
      <circle cx="34" cy="7" r="4" className={accent ? "fill-brand" : ""} />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Mark className="h-[18px] w-auto" />
      <span className="flex items-baseline gap-1 leading-none">
        <span className="mi-condensed text-[0.95rem] font-bold tracking-[0.02em]">Motorsport</span>
        <span className="mi-serif text-[1.05rem]">Intelligence</span>
      </span>
    </span>
  );
}
