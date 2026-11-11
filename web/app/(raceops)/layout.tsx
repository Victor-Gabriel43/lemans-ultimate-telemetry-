import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RACEOPS — Real-Time Endurance Race Control",
  description:
    "Sala de estratégia colaborativa em tempo real para corridas de endurance no Le Mans Ultimate.",
};

/**
 * RACEOPS (LMU Race Engineer) — tema escuro próprio, isolado do site F1.
 * `.raceops` reaplica o color-scheme dark e as cores base que antes
 * ficavam no <body> global (ver app/globals.css).
 */
export default function RaceOpsLayout({ children }: { children: React.ReactNode }) {
  return <div className="raceops flex min-h-svh flex-1 flex-col font-sans">{children}</div>;
}
