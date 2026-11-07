import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono, Anton, VT323 } from "next/font/google";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Display condensada dos títulos da home (cartaz de corrida / trailer).
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

// Fonte bitmap do "modo 1984" da home.
const vt323 = VT323({
  variable: "--font-vt323",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "RACEOPS — Real-Time Endurance Race Control",
  description:
    "Sala de estratégia colaborativa em tempo real para corridas de endurance no Le Mans Ultimate.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${plexSans.variable} ${plexMono.variable} ${anton.variable} ${vt323.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text font-sans">
        {children}
      </body>
    </html>
  );
}
