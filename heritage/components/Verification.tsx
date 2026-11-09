import { VERIFICATION, type Verification } from "@/lib/vocab";

const STYLE: Record<Verification, string> = {
  verified: "text-green",
  reported: "text-lamp",
  unverified: "text-flag",
};
const DOT: Record<Verification, string> = { verified: "bg-green", reported: "bg-lamp", unverified: "bg-flag" };

export function VerificationBadge({ status, compact = false }: { status: string; compact?: boolean }) {
  const s = (status in VERIFICATION ? status : "unverified") as Verification;
  if (compact && s === "verified") return null;
  return (
    <span title={VERIFICATION[s].hint} className={`inline-flex items-center gap-1.5 text-[13px] whitespace-nowrap ${STYLE[s]}`}>
      <span aria-hidden className={`h-2 w-2 rounded-full ${DOT[s]}`} />
      {VERIFICATION[s].label}
    </span>
  );
}

export function VerificationNotice({ status }: { status: string }) {
  if (status === "verified") return null;
  const s = (status in VERIFICATION ? status : "unverified") as Verification;
  return (
    <p className={`border-l-2 py-1 pl-4 text-[15px] ${s === "unverified" ? "border-flag" : "border-lamp"}`}>
      <VerificationBadge status={s} /> <span className="ml-1 text-fog">{VERIFICATION[s].hint}</span>
    </p>
  );
}
