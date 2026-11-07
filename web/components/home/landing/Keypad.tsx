"use client";

import { useEffect, useState } from "react";

/** Mesmo alfabeto do gerador de códigos do servidor (sem 0/O/1/I). */
const KEYS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789".split("");
const LEN = 6;

/**
 * Teclado 3D para o código de convite: teclas com profundidade num plano
 * inclinado, que afundam ao clicar ou ao digitar no teclado físico.
 */
export function Keypad({ onSubmit }: { onSubmit: (code: string) => void }) {
  const [code, setCode] = useState("");
  const [pressed, setPressed] = useState<string | null>(null);

  const flash = (k: string) => {
    setPressed(k);
    window.setTimeout(() => setPressed((p) => (p === k ? null : p)), 140);
  };

  const type = (k: string) => {
    flash(k);
    setCode((c) => (c.length < LEN ? c + k : c));
  };
  const del = () => {
    flash("DEL");
    setCode((c) => c.slice(0, -1));
  };
  const go = () => {
    flash("GO");
    if (code.length > 0) onSubmit(code);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "SELECT" || target.tagName === "TEXTAREA")) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      // só captura o teclado físico quando o teclado está na tela
      const r = document.getElementById("lx-keypad")?.getBoundingClientRect();
      if (!r || r.bottom < 0 || r.top > window.innerHeight) return;
      const k = e.key.toUpperCase();
      if (KEYS.includes(k)) type(k);
      else if (e.key === "Backspace") del();
      else if (e.key === "Enter" && code.length > 0) go();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div id="lx-keypad" className="flex flex-col gap-6" tabIndex={-1}>
      <label className="sr-only" htmlFor="lx-code">
        Código de convite
      </label>
      <div className="flex justify-between gap-2">
        {Array.from({ length: LEN }).map((_, i) => (
          <span
            key={i}
            className={`lx-slot flex h-14 flex-1 items-center justify-center font-display text-3xl sm:h-16 sm:text-4xl ${
              i === code.length ? "is-active" : ""
            }`}
          >
            {code[i] ?? ""}
          </span>
        ))}
      </div>
      {/* campo real (acessível / colar código); o teclado só espelha */}
      <input
        id="lx-code"
        value={code}
        onChange={(e) =>
          setCode(
            e.target.value
              .toUpperCase()
              .replace(/[^A-Z0-9]/g, "")
              .slice(0, LEN)
          )
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            go();
          }
        }}
        placeholder="Cole ou digite o código"
        autoComplete="off"
        className="lx-field w-full text-center font-mono text-sm uppercase tracking-[0.4em]"
      />

      <div className="lx-keyboard">
        <div className="lx-keyboard-plane grid grid-cols-8 gap-1.5 sm:gap-2">
          {KEYS.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => type(k)}
              className={`lx-key ${pressed === k ? "is-down" : ""}`}
              aria-label={`Tecla ${k}`}
            >
              {k}
            </button>
          ))}
          <button
            type="button"
            onClick={del}
            className={`lx-key lx-key-wide col-span-3 ${pressed === "DEL" ? "is-down" : ""}`}
          >
            ⌫ Apagar
          </button>
          <button
            type="button"
            onClick={go}
            disabled={code.length === 0}
            className={`lx-key lx-key-go col-span-5 ${pressed === "GO" ? "is-down" : ""}`}
          >
            Entrar na sala →
          </button>
        </div>
      </div>
    </div>
  );
}
