"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SERVER_URL } from "@/lib/socket";
import { useRoomStore } from "@/state/roomStore";
import { Loader } from "@/components/home/landing/Loader";
import { TopBar } from "@/components/home/landing/TopBar";
import { Hero } from "@/components/home/landing/Hero";
import { Chapters } from "@/components/home/landing/Chapters";
import { StackCards } from "@/components/home/landing/StackCards";
import { Keypad } from "@/components/home/landing/Keypad";
import { Greeting } from "@/components/home/landing/Greeting";

const DURATION_HOURS = [1, 2, 4, 6, 8, 12, 24];

const MARQUEE = ["Combustível", "Pneus", "Danos", "Escala de pilotos", "Pit planner", "Live sync", "Sem login"];

export default function Home() {
  const router = useRouter();

  // Voltar pra Home = sair de qualquer sala: limpa o estado do store pra que
  // um snapshot antigo nunca seja reaproveitado ao entrar noutra sala.
  useEffect(() => {
    useRoomStore.getState().reset();
  }, []);

  return (
    <main className="lx-root relative flex flex-1 flex-col bg-[var(--lx-night)] text-white">
      <Loader />
      <TopBar />
      <Hero />

      <Marquee />

      <Chapters />
      <StackCards />

      {/* ENTRADA — sala escura iluminada de vermelho */}
      <section id="entrar" className="lx-entry relative overflow-hidden px-5 py-28 sm:px-10">
        <div aria-hidden className="lx-redlight pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-[1400px]">
          <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-display text-[clamp(3rem,9vw,8.5rem)] uppercase leading-[0.84]">
              Luzes
              <br />
              <span className="text-[var(--lx-red)]">apagam.</span>
            </h2>
            <p className="max-w-sm font-mono text-[0.75rem] uppercase leading-relaxed tracking-[0.18em] text-white/55">
              Crie uma operação nova ou entre na da sua equipe com o código de convite.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="lx-panel p-6 sm:p-9">
              <PanelHead n="01" title="Nova operação" />
              <CreateRoomForm onCreated={(code) => router.push(`/room/${code}`)} />
            </div>
            <div className="lx-panel p-6 sm:p-9">
              <PanelHead n="02" title="Código da equipe" />
              <Keypad onSubmit={(code) => router.push(`/room/${code.trim().toUpperCase()}`)} />
            </div>
          </div>
        </div>
      </section>

      <footer className="relative overflow-hidden border-t border-white/10 px-5 pb-6 pt-20 sm:px-10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-16">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <div className="font-display text-[clamp(2.6rem,7vw,6rem)] uppercase leading-none text-[var(--lx-sun)]">
              <Greeting />
            </div>
            <div className="flex gap-10 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-white/55">
              <div className="flex flex-col gap-2">
                <a href="#sistema" className="hover:text-white">Sistema</a>
                <a href="#modulos" className="hover:text-white">Módulos</a>
                <a href="#entrar" className="hover:text-white">Entrar</a>
              </div>
              <div className="flex flex-col gap-2">
                <span>Pit wall</span>
                <span>Race control</span>
                <span>Le Mans Ultimate</span>
              </div>
            </div>
          </div>
          <div aria-hidden className="lx-footer-word font-display uppercase leading-[0.75]">
            RACEOPS
          </div>
          <div className="flex justify-between font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white/35">
            <span>Real-time endurance race control</span>
            <a href="#top" className="hover:text-white">Voltar ao grid ↑</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Marquee() {
  const row = [...MARQUEE, ...MARQUEE];
  return (
    <div className="lx-marquee relative z-10 overflow-hidden border-y border-white/10 py-5" aria-hidden>
      <div className="lx-marquee-track flex w-max gap-10">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-4xl uppercase text-white/90 sm:text-6xl">
            {t}
            <span className="inline-block h-3 w-3 rotate-45 bg-[var(--lx-sun)]" />
          </span>
        ))}
      </div>
    </div>
  );
}

function PanelHead({ n, title }: { n: string; title: string }) {
  return (
    <div className="mb-8 flex items-baseline justify-between border-b border-white/10 pb-5">
      <h3 className="font-display text-3xl uppercase sm:text-4xl">{title}</h3>
      <span className="font-mono text-xs tracking-[0.2em] text-white/40">{n}</span>
    </div>
  );
}

function CreateRoomForm({ onCreated }: { onCreated: (code: string) => void }) {
  const [name, setName] = useState("");
  const [car, setCar] = useState("");
  const [track, setTrack] = useState("");
  const [durationMode, setDurationMode] = useState<"HOURS" | "LAPS">("HOURS");
  const [hours, setHours] = useState("6");
  const [laps, setLaps] = useState("60");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // O backend continua recebendo o mesmo contrato: TIME = minutos, LAPS = voltas.
      // A conversão de horas → minutos é só de UX, aqui no frontend.
      const raceDurationType = durationMode === "HOURS" ? "TIME" : "LAPS";
      const raceDurationValue =
        durationMode === "HOURS" ? Math.round(Number(hours) * 60) : Math.round(Number(laps));

      const res = await fetch(`${SERVER_URL}/rooms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          car,
          track: track || undefined,
          raceDurationType,
          raceDurationValue,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Não foi possível criar a sala.");
      }
      const data = await res.json();
      onCreated(data.inviteCode);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Field label="Race name">
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="24h de Le Mans"
          className="lx-field w-full"
        />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Car">
          <input
            required
            value={car}
            onChange={(e) => setCar(e.target.value)}
            placeholder="Porsche 963 LMDh"
            className="lx-field w-full"
          />
        </Field>
        <Field label="Track">
          <input
            value={track}
            onChange={(e) => setTrack(e.target.value)}
            placeholder="Circuit de la Sarthe"
            className="lx-field w-full"
          />
        </Field>
      </div>

      <Field label="Race duration">
        <div className="flex flex-wrap items-stretch gap-2">
          <div className="flex border border-white/15">
            {(["HOURS", "LAPS"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setDurationMode(m)}
                className={`cursor-pointer px-3 py-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] transition-colors ${
                  durationMode === m ? "bg-[var(--lx-red)] text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {durationMode === "HOURS" ? (
            <select
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="lx-field flex-1 cursor-pointer"
              aria-label="Duração da corrida em horas"
            >
              {DURATION_HOURS.map((h) => (
                <option key={h} value={h}>
                  {h} {h === 1 ? "hour" : "hours"}
                </option>
              ))}
            </select>
          ) : (
            <input
              required
              type="number"
              min={1}
              value={laps}
              onChange={(e) => setLaps(e.target.value)}
              className="lx-field w-28"
              aria-label="Duração da corrida em voltas"
            />
          )}
        </div>
        <span className="mt-1.5 font-mono text-[0.65rem] text-white/40">
          {durationMode === "HOURS"
            ? `≈ ${Math.round(Number(hours) * 60)} min`
            : `${Math.round(Number(laps))} voltas`}
        </span>
      </Field>

      {error && <p className="text-sm text-[var(--lx-red)]">{error}</p>}
      <button type="submit" disabled={loading} className="lx-cta mt-2">
        <span>{loading ? "Criando…" : "Criar corrida"}</span>
        <span aria-hidden>→</span>
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-white/50">{label}</span>
      {children}
    </label>
  );
}
