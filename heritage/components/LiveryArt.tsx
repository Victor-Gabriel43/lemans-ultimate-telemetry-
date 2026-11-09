import { useId } from "react";
import type { LiveryDesign } from "@/lib/format";

/**
 * Archival side-profile illustration of a prototype, painted from a livery's
 * stored palette. It stands in where licensed photography has not yet been
 * archived and is always captioned as an illustration — never a photograph.
 */

const BODY =
  "M38 206 L58 182 C118 166 196 150 290 140 C332 120 362 93 420 83 C470 74 540 74 582 87 C622 99 652 112 702 118 L858 122 L902 110 L946 108 L952 150 L944 206 Z";
const FIN = "M612 90 Q712 66 846 96 L852 121 L642 110 Z";
const GLASS = "M428 90 C470 81 536 81 572 93 L560 108 C520 101 470 101 438 106 Z";

function rng(seed: number) {
  let s = seed;
  return () => ((s = (s * 9301 + 49297) % 233280) / 233280);
}

function Pattern({ d, clip }: { d: LiveryDesign; clip: string }) {
  const [a = "#c8102e", b = "#121212"] = d.accents;
  const g = (children: React.ReactNode) => <g clipPath={`url(#${clip})`}>{children}</g>;

  switch (d.pattern) {
    case "works":
      return g(
        <>
          <path d="M0 185 C300 175 600 170 1000 160 L1000 300 L0 300 Z" fill={b} />
          <path d="M40 196 C260 160 520 132 960 112 L960 132 C560 150 300 176 40 212 Z" fill={a} />
          <path d="M520 0 L1000 0 L1000 118 C860 112 720 108 600 112 Z" fill={b} opacity="0.9" />
        </>,
      );
    case "stripes": {
      const cols = d.accents.length ? d.accents : [a, b];
      const n = 15;
      return g(
        <>
          {Array.from({ length: n }, (_, i) => {
            const y0 = 176 + i * 1.6;
            const y1 = 60 + i * 11;
            return <path key={i} d={`M30 ${y0} C300 ${y0 - 18} 620 ${y1 + 30} 1000 ${y1}`} stroke={cols[i % cols.length]} strokeWidth={2 + i * 0.55} fill="none" />;
          })}
        </>,
      );
    }
    case "camo": {
      const r = rng(7);
      const cols = [d.base, ...d.accents];
      return g(
        <>
          {Array.from({ length: 70 }, (_, i) => {
            const x = r() * 1000, y = 60 + r() * 160, w = 30 + r() * 90, h = 10 + r() * 40, k = r() * 30 - 15;
            return <polygon key={i} points={`${x},${y} ${x + w},${y + k} ${x + w - 10},${y + h} ${x - 15},${y + h - k}`} fill={cols[i % cols.length]} />;
          })}
        </>,
      );
    }
    case "split":
      return g(
        <>
          <path d="M0 170 L1000 128 L1000 300 L0 300 Z" fill={a} />
          <path d="M0 166 L1000 124 L1000 130 L0 172 Z" fill={d.base} opacity="0.6" />
        </>,
      );
    case "band":
      return g(
        <>
          <rect x="0" y="150" width="1000" height="34" fill={a} />
          <rect x="0" y="188" width="1000" height="6" fill={b} />
          <rect x="0" y="194" width="1000" height="40" fill="#141414" opacity="0.9" />
        </>,
      );
    case "gt1":
      return g(
        <>
          <path d="M60 196 C320 170 560 140 1000 104 L1000 128 C600 160 330 190 60 214 Z" fill={a} />
          <path d="M60 218 C330 196 600 168 1000 136 L1000 148 C600 182 330 208 60 230 Z" fill={b} />
          <rect x="0" y="206" width="1000" height="90" fill="#151515" />
        </>,
      );
    case "rainbow": {
      const cols = d.accents;
      return g(
        <>
          {cols.map((c, i) => (
            <path key={c} d={`M30 ${168 + i * 7} C360 ${160 + i * 7} 640 ${140 + i * 7} 1000 ${120 + i * 7} L1000 ${127 + i * 7} C640 ${147 + i * 7} 360 ${167 + i * 7} 30 ${175 + i * 7} Z`} fill={c} />
          ))}
        </>,
      );
    }
    case "solid":
      return null;
    default:
      return g(
        <>
          {Array.from({ length: 60 }, (_, i) => (
            <line key={i} x1={i * 20} y1="0" x2={i * 20 - 160} y2="300" stroke={d.accents[0] ?? "#555"} strokeWidth="1" opacity="0.5" />
          ))}
        </>,
      );
  }
}

function Wheel({ cx }: { cx: number }) {
  return (
    <g>
      <circle cx={cx} cy={206} r={56} fill="#060607" />
      <circle cx={cx} cy={206} r={49} fill="#0d0d0f" stroke="#1d1d21" strokeWidth="3" />
      <circle cx={cx} cy={206} r={33} fill="#1b1b1f" />
      {Array.from({ length: 10 }, (_, i) => {
        const t = (i / 10) * Math.PI * 2;
        return <line key={i} x1={cx} y1={206} x2={cx + Math.cos(t) * 31} y2={206 + Math.sin(t) * 31} stroke="#2e2e34" strokeWidth="4" />;
      })}
      <circle cx={cx} cy={206} r={8} fill="#3a3a40" />
    </g>
  );
}

export default function LiveryArt({
  design, number, className = "", caption = true, title,
}: { design: LiveryDesign; number?: string; className?: string; caption?: boolean; title?: string }) {
  const id = useId().replace(/:/g, "");
  const clip = `body-${id}`;
  const shade = `shade-${id}`;
  return (
    <figure className={`relative ${className}`}>
      <svg viewBox="0 0 1000 300" role="img" aria-label={title ? `Illustration of ${title}` : "Livery illustration"} className="h-auto w-full">
        <defs>
          <clipPath id={clip}>
            <path d={BODY} />
            <path d={FIN} />
          </clipPath>
          <linearGradient id={shade} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.22" />
            <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity="0.45" />
          </linearGradient>
        </defs>
        <ellipse cx="500" cy="262" rx="470" ry="14" fill="#000" opacity="0.55" />
        {/* rear wing */}
        <rect x="862" y="70" width="104" height="12" rx="2" fill={design.accents[1] ?? "#141414"} />
        <rect x="900" y="80" width="8" height="34" fill="#141414" />
        <path d={BODY} fill={design.base} />
        <path d={FIN} fill={design.base} />
        <Pattern d={design} clip={clip} />
        <g clipPath={`url(#${clip})`}>
          <rect x="0" y="0" width="1000" height="300" fill={`url(#${shade})`} />
        </g>
        <path d={GLASS} fill="#0b0d10" />
        <path d="M440 92 C480 86 530 86 560 95" stroke="#fff" strokeOpacity="0.18" strokeWidth="2" fill="none" />
        {/* splitter & diffuser */}
        <path d="M30 208 L300 208 L300 214 L26 214 Z" fill="#0c0c0d" />
        <path d="M700 208 L950 206 L956 214 L700 214 Z" fill="#0c0c0d" />
        {number ? (
          <g>
            <circle cx="500" cy="152" r="23" fill="#f6f6f4" stroke="#111" strokeWidth="2" />
            <text x="500" y="161" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="26" fontWeight="700" fill="#111">
              {number}
            </text>
          </g>
        ) : null}
        <Wheel cx={218} />
        <Wheel cx={776} />
      </svg>
      {caption ? (
        <figcaption className="pointer-events-none absolute bottom-1 right-2 font-mono text-[9px] tracking-[0.18em] text-white/35 uppercase">
          Archival illustration · colours approximate
        </figcaption>
      ) : null}
    </figure>
  );
}
