/**
 * Cena de "pôr do sol na reta" — pôster full-bleed do hero.
 * Céu em gradiente, sol retrô listrado, estrelas, morros em camadas,
 * uma reta em perspectiva com faixas correndo e lanternas traseiras.
 * Camadas leem `--ps` (progresso suavizado da seção) pra paralaxe.
 * Tudo CSS + SVG, sem imagem externa.
 */
export function SunsetScene() {
  return (
    <div aria-hidden className="lx-scene absolute inset-0 overflow-hidden">
      <div className="lx-sky absolute inset-0" />
      <div className="lx-stars absolute inset-x-0 top-0 h-[55%]" />

      <div className="lx-sun absolute left-1/2 top-[34%] aspect-square w-[min(62vw,520px)] -translate-x-1/2 rounded-full" />

      {/* morros em 3 camadas */}
      <svg
        className="lx-layer lx-layer-far absolute inset-x-0 bottom-[30%] h-[22%] w-full"
        viewBox="0 0 1600 200"
        preserveAspectRatio="none"
      >
        <path
          d="M0 200 L0 120 C120 90 220 60 340 84 S560 40 700 70 S940 110 1060 64 S1320 40 1460 90 L1600 80 L1600 200 Z"
          fill="#5a1d5e"
          opacity="0.85"
        />
      </svg>
      <svg
        className="lx-layer lx-layer-mid absolute inset-x-0 bottom-[26%] h-[18%] w-full"
        viewBox="0 0 1600 200"
        preserveAspectRatio="none"
      >
        <path
          d="M0 200 L0 140 C160 110 260 150 420 120 S700 90 820 130 S1100 160 1240 118 S1480 100 1600 130 L1600 200 Z"
          fill="#2c0f3d"
        />
        {/* passarela genérica sobre a pista */}
        <g fill="none" stroke="#12061d" strokeWidth="9">
          <path d="M640 200 C700 70 900 70 960 200" />
          <path d="M640 120 L960 120" strokeWidth="14" />
        </g>
      </svg>

      {/* reta em perspectiva */}
      <svg
        className="lx-road absolute inset-x-0 bottom-0 h-[30%] w-full"
        viewBox="0 0 1600 300"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lx-ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1b0a2a" />
            <stop offset="1" stopColor="#07030c" />
          </linearGradient>
          <linearGradient id="lx-asphalt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3a1844" />
            <stop offset="1" stopColor="#0d0612" />
          </linearGradient>
        </defs>
        <rect width="1600" height="300" fill="url(#lx-ground)" />
        <path d="M770 0 L830 0 L1500 300 L100 300 Z" fill="url(#lx-asphalt)" />
        <path d="M770 0 L100 300" stroke="#ff8a5c" strokeOpacity="0.55" strokeWidth="2" />
        <path d="M830 0 L1500 300" stroke="#ff8a5c" strokeOpacity="0.55" strokeWidth="2" />
        <path
          className="lx-lane"
          d="M800 0 L800 300"
          stroke="#ffd9a0"
          strokeWidth="6"
          strokeDasharray="18 26"
          vectorEffect="non-scaling-stroke"
          pathLength={300}
        />
        {/* lanternas — dois carros se afastando */}
        <g className="lx-taillights">
          <circle cx="760" cy="60" r="3" fill="#ff2a3d" />
          <circle cx="776" cy="60" r="3" fill="#ff2a3d" />
        </g>
        <g className="lx-taillights lx-taillights-b">
          <circle cx="826" cy="34" r="2" fill="#ff2a3d" />
          <circle cx="836" cy="34" r="2" fill="#ff2a3d" />
        </g>
      </svg>

      {/* granulação + vinheta, deixa com cara de pôster */}
      <div className="lx-grain absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_45%,transparent_55%,rgba(8,3,14,0.75))]" />
    </div>
  );
}
