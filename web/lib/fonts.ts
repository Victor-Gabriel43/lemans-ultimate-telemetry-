import { Inter, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";

// Paddock — Inter (close to SF Pro, excellent tabular figures).
export const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

// RACEOPS (LMU Race Engineer) — keeps its original typography.
export const plexSans = IBM_Plex_Sans({ variable: "--font-plex-sans", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
export const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400", "500", "600"] });
