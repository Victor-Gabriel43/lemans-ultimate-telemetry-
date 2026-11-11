import type { Metadata } from "next";
import "../globals.css";
import { plexMono, plexSans } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "RACEOPS — Real-Time Endurance Race Control",
  description: "Sala de estratégia colaborativa em tempo real para corridas de endurance no Le Mans Ultimate.",
};

/**
 * Root layout of the RACEOPS (LMU Race Engineer) app — its own dark theme,
 * isolated from the Paddock encyclopedia (which has its own root layout).
 */
export default function RaceOpsLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${plexSans.variable} ${plexMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <div className="raceops flex min-h-svh flex-1 flex-col font-sans">{children}</div>
      </body>
    </html>
  );
}
