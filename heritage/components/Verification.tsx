import { VERIFICATION, type Verification } from "@/lib/vocab";

const STYLE: Record<Verification, string> = {
  verified: "text-verified border-verified/30",
  reported: "text-amber border-amber/40",
  unverified: "text-signal border-signal/50 bg-signal/10",
};

export function VerificationBadge({ status, compact = false }: { status: string; compact?: boolean }) {
  const s = (status in VERIFICATION ? status : "unverified") as Verification;
  if (compact && s === "verified") return null;
  return (
    <span title={VERIFICATION[s].hint} className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-[0.14em] uppercase ${STYLE[s]}`}>
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />
      {VERIFICATION[s].label}
    </span>
  );
}

export function VerificationNotice({ status }: { status: string }) {
  if (status === "verified") return null;
  const s = (status in VERIFICATION ? status : "unverified") as Verification;
  return (
    <div className={`rounded-sm border px-4 py-3 text-sm ${s === "unverified" ? "border-signal/40 bg-signal/5" : "border-amber/30 bg-amber/5"}`}>
      <VerificationBadge status={s} /> <span className="ml-2 text-soft">{VERIFICATION[s].hint}</span>
    </div>
  );
}
