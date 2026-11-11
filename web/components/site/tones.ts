import type { Tone } from "@/lib/f1/types";

/** Gradient backgrounds for typographic plates, per tone. */
export const TONES: Record<Tone, string> = {
  red: "linear-gradient(135deg, #3a0a08 0%, #9b0d06 45%, #e10600 100%)",
  graphite: "linear-gradient(135deg, #0f0f10 0%, #2a2a2d 55%, #4a4a4f 100%)",
  night: "linear-gradient(140deg, #000 0%, #121214 60%, #2b2b30 100%)",
  silver: "linear-gradient(135deg, #2c3036 0%, #6c737d 50%, #c9ced6 100%)",
  blue: "linear-gradient(135deg, #04122e 0%, #0b3b8c 55%, #2f7bf5 100%)",
  green: "linear-gradient(135deg, #031a10 0%, #0b4a2c 55%, #1d7a4b 100%)",
  gold: "linear-gradient(135deg, #1a1204 0%, #6b4a0b 50%, #c99a2e 100%)",
  orange: "linear-gradient(135deg, #2a0e02 0%, #a2400a 55%, #ff7a1a 100%)",
  teal: "linear-gradient(135deg, #011a1a 0%, #075e5b 55%, #11a39b 100%)",
  purple: "linear-gradient(135deg, #0d0620 0%, #3b1a7a 55%, #8a4bd8 100%)",
  papaya: "linear-gradient(135deg, #2a1100 0%, #b04f00 50%, #ff8a00 100%)",
  navy: "linear-gradient(135deg, #02061a 0%, #0c1f5c 55%, #2747b5 100%)",
};
