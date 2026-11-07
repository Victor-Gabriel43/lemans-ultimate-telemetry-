"use client";

import { useEffect, useState } from "react";

const GREETINGS = [
  { text: "Boa corrida", lang: "pt" },
  { text: "Bonne course", lang: "fr" },
  { text: "Good race", lang: "en" },
  { text: "Viel Erfolg", lang: "de" },
  { text: "Buona gara", lang: "it" },
  { text: "Buena carrera", lang: "es" },
  { text: "良いレースを", lang: "ja" },
];

/** Saudação do rodapé que roda em sete idiomas — o grid de Le Mans é internacional. */
export function Greeting() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % GREETINGS.length), 1800);
    return () => clearInterval(t);
  }, []);
  const g = GREETINGS[i];
  return (
    <span className="relative block overflow-hidden" aria-live="off">
      <span key={g.lang} lang={g.lang} className="lx-greet block">
        {g.text}.
      </span>
    </span>
  );
}
