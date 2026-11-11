import type { Experience } from "./experiences";

/**
 * Art-directed visuals for each experience, built from SVG/gradients, which
 * stand in for photography. Each one sets that experience's personality:
 * lime/analytical, paper/cartographic, ember/cinematic, steel/human.
 */
export function ExperienceArt({ tone, className = "" }: { tone: Experience["tone"]; className?: string }) {
  return (
    <div className={`mi-grain relative isolate overflow-hidden ${className}`}>
      {tone === "lime" && <Strategy />}
      {tone === "paper" && <Topo />}
      {tone === "ember" && <Night />}
      {tone === "steel" && <Signal />}
    </div>
  );
}

function Strategy() {
  // Stint blocks + fuel curve: analytical, lime on black.
  const stints = [0.22, 0.2, 0.24, 0.18, 0.16];
  let x = 6;
  return (
    <div className="absolute inset-0 bg-[#0e1012]">
      <svg viewBox="0 0 100 125" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {Array.from({ length: 11 }, (_, i) => (
          <line key={i} x1="6" x2="94" y1={20 + i * 9} y2={20 + i * 9} stroke="#f5f5f0" strokeOpacity="0.06" strokeWidth="0.2" />
        ))}
        {stints.map((s, i) => {
          const w = s * 88;
          const r = (
            <g key={i}>
              <rect x={x + 0.4} y={98} width={w - 0.8} height={7} fill={i === 2 ? "#d2ff00" : "#f5f5f0"} fillOpacity={i === 2 ? 1 : 0.12} />
              <path
                d={`M${x + 0.4} 30 L${x + w - 0.8} ${78 - i * 3}`}
                stroke={i === 2 ? "#d2ff00" : "#f5f5f0"}
                strokeOpacity={i === 2 ? 1 : 0.35}
                strokeWidth="0.5"
                fill="none"
              />
            </g>
          );
          x += w;
          return r;
        })}
      </svg>
      <div className="absolute left-[6%] top-[7%] font-mono text-[0.6rem] tracking-[0.2em] text-text-muted">STINT 03 / 05</div>
      <div className="absolute bottom-[22%] right-[6%] mi-display text-[clamp(3rem,7vw,6rem)] text-brand">P1</div>
    </div>
  );
}

function Topo() {
  // Contour lines of a circuit: cartographic, ink on paper.
  const rings = Array.from({ length: 9 }, (_, i) => i);
  return (
    <div className="absolute inset-0 bg-paper">
      <svg viewBox="0 0 100 125" className="absolute inset-0 h-full w-full">
        {rings.map((i) => {
          const s = 1 - i * 0.09;
          return (
            <path
              key={i}
              transform={`translate(52 52) scale(${s * 0.82}) translate(-50 -62)`}
              d="M18 40 C 22 18, 48 14, 60 26 S 86 30, 84 52 S 70 74, 78 92 S 52 112, 34 100 S 12 84, 22 66 S 14 54, 18 40 Z"
              fill="none"
              stroke="#0b0c0e"
              strokeOpacity={i === 0 ? 0.9 : 0.16}
              strokeWidth={i === 0 ? 0.7 : 0.3}
            />
          );
        })}
        <circle cx="60" cy="26" r="1.6" fill="#0b0c0e" />
        <circle cx="78" cy="92" r="1.6" fill="#0b0c0e" />
      </svg>
      <div className="absolute left-[6%] top-[7%] font-mono text-[0.6rem] tracking-[0.2em] text-ink-muted">T1 — 2.3G — 92 KM/H</div>
      <div className="absolute bottom-[6%] left-[6%] mi-serif text-[clamp(2rem,4vw,3.4rem)] text-ink">the long right</div>
    </div>
  );
}

function Night() {
  // Long-exposure night scene: horizon glow, light trails, cinematic bars.
  return (
    <div className="absolute inset-0 bg-[linear-gradient(180deg,#07080a_0%,#141018_42%,#3a1a12_63%,#0b0c0e_64%,#050506_100%)]">
      <div className="absolute inset-x-0 top-[50%] h-[22%] bg-[radial-gradient(60%_100%_at_50%_100%,rgba(255,120,40,0.55),transparent)] blur-xl" />
      <svg viewBox="0 0 100 125" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <defs>
          <filter id="mi-blur"><feGaussianBlur stdDeviation="0.6" /></filter>
        </defs>
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M-5 ${118 - i * 4} C 30 ${100 - i * 3}, 60 ${84 - i * 2}, 105 ${80 + i * 1.5}`}
            stroke={i % 2 ? "#ff3b1f" : "#fff2d6"}
            strokeWidth={i % 2 ? 0.8 : 0.5}
            fill="none"
            filter="url(#mi-blur)"
            opacity={0.85 - i * 0.12}
          />
        ))}
      </svg>
      <div className="absolute inset-x-0 top-0 h-[9%] bg-black" />
      <div className="absolute inset-x-0 bottom-0 h-[9%] bg-black" />
      <div className="absolute bottom-[12%] left-[6%] font-mono text-[0.6rem] tracking-[0.2em] text-white/60">HOUR 14 — 03:12 AM</div>
    </div>
  );
}

function Signal() {
  // Radial "fingerprint" of a driver's rhythm: steel, human, precise.
  const lines = Array.from({ length: 72 }, (_, i) => i);
  return (
    <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_45%,#2a2e35,#0b0c0e)]">
      <svg viewBox="-50 -62 100 125" className="absolute inset-0 h-full w-full">
        {lines.map((i) => {
          const a = (i / lines.length) * Math.PI * 2;
          const r = 20 + 9 * Math.abs(Math.sin(i * 0.7)) + 4 * Math.sin(i * 0.23);
          return (
            <line
              key={i}
              x1={(Math.cos(a) * 14).toFixed(3)}
              y1={(Math.sin(a) * 14).toFixed(3)}
              x2={(Math.cos(a) * r).toFixed(3)}
              y2={(Math.sin(a) * r).toFixed(3)}
              stroke={i === 9 ? "#d2ff00" : "#f5f5f0"}
              strokeOpacity={i === 9 ? 1 : 0.4}
              strokeWidth="0.35"
            />
          );
        })}
        <circle r="10" fill="none" stroke="#f5f5f0" strokeOpacity="0.25" strokeWidth="0.3" />
      </svg>
      <div className="absolute left-[6%] top-[7%] font-mono text-[0.6rem] tracking-[0.2em] text-text-muted">RHYTHM / CONSISTENCY</div>
      <div className="absolute bottom-[6%] right-[6%] mi-display text-[clamp(2.4rem,5vw,4.5rem)] text-text">#07</div>
    </div>
  );
}
