/**
 * Circuit metadata (from the baked geometry index) plus a small curated
 * "setting" table that drives the 3D environment's look. Settings describe
 * the venue's character, not statistics.
 */
import META from "./circuit-meta.json";

export type CircuitMeta = {
  name: string;
  location: string;
  lengthM: number | null;
  opened: number | null;
  firstGp: number | null;
  altitudeM: number | null;
  center: [number, number];
  outline: [number, number][];
  hasEnv: boolean;
};

export type CircuitSetting = {
  kind: "street" | "temporary" | "permanent";
  /** Race held after sunset under floodlights. */
  night: boolean;
  biome: "urban" | "parkland" | "forest" | "desert" | "coastal" | "countryside";
};

const S = (kind: CircuitSetting["kind"], biome: CircuitSetting["biome"], night = false): CircuitSetting => ({ kind, biome, night });

export const SETTINGS: Record<string, CircuitSetting> = {
  albert_park: S("temporary", "parkland"),
  shanghai: S("permanent", "countryside"),
  suzuka: S("permanent", "forest"),
  miami: S("temporary", "urban"),
  villeneuve: S("temporary", "parkland"),
  monaco: S("street", "coastal"),
  catalunya: S("permanent", "countryside"),
  red_bull_ring: S("permanent", "forest"),
  silverstone: S("permanent", "countryside"),
  spa: S("permanent", "forest"),
  hungaroring: S("permanent", "countryside"),
  zandvoort: S("permanent", "coastal"),
  monza: S("permanent", "parkland"),
  madring: S("temporary", "urban"),
  baku: S("street", "urban"),
  sepang: S("permanent", "forest"),
  marina_bay: S("street", "urban", true),
  americas: S("permanent", "countryside"),
  rodriguez: S("permanent", "urban"),
  interlagos: S("permanent", "urban"),
  vegas: S("street", "urban", true),
  losail: S("permanent", "desert", true),
  yas_marina: S("permanent", "coastal", true),
  bahrain: S("permanent", "desert", true),
  jeddah: S("street", "coastal", true),
  imola: S("permanent", "parkland"),
};

export function getCircuitMeta(id: string): CircuitMeta | null {
  return (META as unknown as Record<string, CircuitMeta>)[id] ?? null;
}
export function getCircuitSetting(id: string): CircuitSetting {
  return SETTINGS[id] ?? S("permanent", "countryside");
}
export const hasGeometry = (id: string) => id in META;
