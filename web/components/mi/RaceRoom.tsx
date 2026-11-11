"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SERVER_URL } from "@/lib/socket";
import { SystemPip } from "@/components/home/SystemPip";
import { Line, Reveal } from "./motion";

type Mode = "create" | "join";
const DURATION_HOURS = [1, 2, 4, 6, 8, 12, 24];

const input =
  "w-full rounded-xl border border-paper-line bg-white/70 px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink-muted/60 outline-none transition focus:border-ink focus:bg-white";
const cta =
  "group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[0.9rem] font-semibold text-paper transition hover:bg-black disabled:cursor-wait disabled:opacity-60";

/**
 * The Race Room: the live collaborative pit-wall tool, now presented as the
 * first product inside Motorsport Intelligence. Same backend contract as before.
 */
export function RaceRoom() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode | null>(null);
  const go = (code: string) => router.push(`/room/${code}`);

  return (
    <section id="race-room" className="relative scroll-mt-0 bg-paper text-ink">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-4 py-28 sm:px-8 sm:py-40 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-6">
          <Reveal className="flex items-center gap-3">
            <span className="mi-label text-ink-muted">Live now</span>
            <span className="rounded-full bg-ink px-2.5 py-1">
              <SystemPip />
            </span>
          </Reveal>
          <Reveal fade={false} as="h2">
            <Line className="mi-display text-[clamp(3rem,8vw,7.5rem)]">The Race</Line>
            <Line delay={0.1} className="mi-serif text-[clamp(3rem,8vw,7.5rem)] leading-[0.95]">
              Room.
            </Line>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-md text-[1.05rem] leading-relaxed text-ink-muted">
              A shared pit wall for endurance teams. Fuel, tyres, damage, driver schedule and pit
              stops, synced live across the crew. No login, no refresh.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="lg:col-span-6">
          {mode === null && (
            <div className="grid gap-3">
              <EntryCard index="01" title="Create a room" sub="Start a new race operation" dark onClick={() => setMode("create")} />
              <EntryCard index="02" title="Join a room" sub="Enter your team code" onClick={() => setMode("join")} />
            </div>
          )}
          {mode === "create" && <CreateRoomForm onBack={() => setMode(null)} onCreated={go} />}
          {mode === "join" && <JoinRoomForm onBack={() => setMode(null)} onJoin={go} />}
        </Reveal>
      </div>
    </section>
  );
}

function EntryCard({
  index,
  title,
  sub,
  onClick,
  dark = false,
}: {
  index: string;
  title: string;
  sub: string;
  onClick: () => void;
  dark?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex min-h-[200px] cursor-pointer flex-col justify-between overflow-hidden rounded-[24px] p-7 text-left transition-transform duration-500 ease-[var(--ease-out)] hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink ${
        dark ? "bg-ink text-paper" : "border border-paper-line bg-paper-2 text-ink"
      }`}
    >
      {/* lime fill sweeps up on hover */}
      <span
        aria-hidden
        className="absolute inset-0 origin-bottom scale-y-0 bg-brand transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-y-100"
      />
      <span className="relative flex items-start justify-between">
        <span className="font-mono text-xs opacity-60 transition-colors group-hover:text-ink">{index}</span>
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-current/20 transition-all duration-500 group-hover:rotate-45 group-hover:border-ink group-hover:text-ink">
          <ArrowUpRight size={18} aria-hidden />
        </span>
      </span>
      <span className="relative flex flex-col gap-1 transition-colors group-hover:text-ink">
        <span className="mi-display text-[clamp(1.8rem,3.4vw,2.8rem)]">{title}</span>
        <span className="text-[0.95rem] opacity-60">{sub}</span>
      </span>
    </button>
  );
}

function FormShell({
  heading,
  onBack,
  onSubmit,
  children,
}: {
  heading: string;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
}) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 rounded-[24px] border border-paper-line bg-paper-2 p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <h3 className="mi-display text-2xl">{heading}</h3>
        <button
          type="button"
          onClick={onBack}
          className="flex cursor-pointer items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={14} aria-hidden /> Back
        </button>
      </div>
      {children}
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="mi-label text-ink-muted">{label}</span>
      {children}
    </label>
  );
}

function CreateRoomForm({ onBack, onCreated }: { onBack: () => void; onCreated: (code: string) => void }) {
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
      // Backend contract: TIME = minutes, LAPS = laps. Hours → minutes is UX only.
      const raceDurationType = durationMode === "HOURS" ? "TIME" : "LAPS";
      const raceDurationValue =
        durationMode === "HOURS" ? Math.round(Number(hours) * 60) : Math.round(Number(laps));
      const res = await fetch(`${SERVER_URL}/rooms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, car, track: track || undefined, raceDurationType, raceDurationValue }),
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
    <FormShell heading="New operation" onBack={onBack} onSubmit={handleSubmit}>
      <Field label="Race name">
        <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="24h de Le Mans" className={input} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Car">
          <input required value={car} onChange={(e) => setCar(e.target.value)} placeholder="Porsche 963 LMDh" className={input} />
        </Field>
        <Field label="Track">
          <input value={track} onChange={(e) => setTrack(e.target.value)} placeholder="Circuit de la Sarthe" className={input} />
        </Field>
      </div>
      <Field label="Race duration">
        <div className="flex flex-wrap items-stretch gap-2">
          <div className="flex rounded-full border border-paper-line bg-white/70 p-1">
            {(["HOURS", "LAPS"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setDurationMode(m)}
                className={`cursor-pointer rounded-full px-4 py-2 font-mono text-[0.7rem] tracking-[0.14em] transition-colors ${
                  durationMode === m ? "bg-ink text-paper" : "text-ink-muted hover:text-ink"
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
              className={`${input} flex-1 cursor-pointer`}
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
              className={`${input} w-32 flex-none`}
              aria-label="Duração da corrida em voltas"
            />
          )}
        </div>
        <span className="font-mono text-[0.7rem] text-ink-muted">
          {durationMode === "HOURS" ? `≈ ${Math.round(Number(hours) * 60)} min` : `${Math.round(Number(laps))} voltas`}
        </span>
      </Field>
      {error && <p className="text-sm text-status-critical">{error}</p>}
      <button type="submit" disabled={loading} className={cta}>
        {loading ? "Creating…" : "Create race room"}
        <ArrowUpRight size={16} aria-hidden className="transition-transform group-hover:rotate-45" />
      </button>
    </FormShell>
  );
}

function JoinRoomForm({ onBack, onJoin }: { onBack: () => void; onJoin: (code: string) => void }) {
  const [code, setCode] = useState("");
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;
    onJoin(code.trim().toUpperCase());
  }
  return (
    <FormShell heading="Team code" onBack={onBack} onSubmit={handleSubmit}>
      <Field label="Invite code">
        <input
          required
          autoFocus
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="ABC123"
          maxLength={6}
          className={`${input} text-center font-mono text-3xl tracking-[0.4em]`}
        />
      </Field>
      <button type="submit" className={cta}>
        Enter race room
        <ArrowUpRight size={16} aria-hidden className="transition-transform group-hover:rotate-45" />
      </button>
    </FormShell>
  );
}
