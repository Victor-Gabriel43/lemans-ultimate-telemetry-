import type { Metadata } from "next";
import { Archivo, Instrument_Serif, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

/*
 * Motorsport Intelligence — type system.
 * Archivo (variable, wdth 62–125): display + UI. Expanded for headlines,
 *   condensed for labels — one family, two personalities.
 * Instrument Serif italic: the expressive "human" counterpoint in headlines.
 * IBM Plex Mono: data, indices, technical labels.
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const serif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Motorsport Intelligence",
  description:
    "Racing intelligence, circuits, editorial and drivers — a new way to read endurance racing.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${archivo.variable} ${serif.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text font-sans">{children}</body>
    </html>
  );
}
