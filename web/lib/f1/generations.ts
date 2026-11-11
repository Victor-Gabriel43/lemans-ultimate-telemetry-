import type { Bi } from "./weekend";

/**
 * Technical generations used to browse the car archive. Ranges are
 * non-overlapping so every chassis belongs to exactly one generation
 * (by its first season).
 */
export type GenerationDef = { id: string; from: number; to: number; name: Bi; text: Bi };

export const GENERATION_DEFS: GenerationDef[] = [
  { id: "front-engined", from: 1950, to: 1958, name: { en: "Front-engined", pt: "Motor dianteiro" }, text: { en: "Engine ahead of the driver, narrow tyres, little aerodynamic thinking.", pt: "Motor à frente do piloto, pneus estreitos, quase nenhuma aerodinâmica." } },
  { id: "rear-engined", from: 1959, to: 1967, name: { en: "Rear-engined", pt: "Motor traseiro" }, text: { en: "The engine moves behind the driver; monocoques replace space frames.", pt: "O motor vai para trás do piloto; monocoques substituem os chassis tubulares." } },
  { id: "wings-and-wedges", from: 1968, to: 1976, name: { en: "Wings and wedges", pt: "Asas e cunhas" }, text: { en: "Wings generate downforce and wedge shapes appear.", pt: "As asas geram pressão aerodinâmica e surgem as formas em cunha." } },
  { id: "ground-effect", from: 1977, to: 1982, name: { en: "Ground effect", pt: "Efeito solo" }, text: { en: "The underbody becomes an inverted wing sealed by skirts.", pt: "O fundo vira uma asa invertida vedada por saias." } },
  { id: "turbo", from: 1983, to: 1988, name: { en: "Turbo and carbon", pt: "Turbo e carbono" }, text: { en: "Flat bottoms, turbocharged engines and carbon-fibre monocoques.", pt: "Fundo plano, motores turbo e monocoques de fibra de carbono." } },
  { id: "naturally-aspirated", from: 1989, to: 2013, name: { en: "Naturally aspirated", pt: "Aspirados" }, text: { en: "V8, V10 and V12 engines, electronics, then refined aerodynamics.", pt: "Motores V8, V10 e V12, eletrônica e aerodinâmica refinada." } },
  { id: "hybrid", from: 2014, to: 2021, name: { en: "Turbo-hybrid", pt: "Turbo-híbridos" }, text: { en: "1.6-litre V6 turbo power units with energy recovery.", pt: "Unidades de potência V6 turbo de 1,6 litro com recuperação de energia." } },
  { id: "modern-ground-effect", from: 2022, to: 2025, name: { en: "Modern ground effect", pt: "Efeito solo moderno" }, text: { en: "Venturi tunnels return with simplified wings and 18-inch wheels.", pt: "Os túneis Venturi voltam, com asas simplificadas e rodas de 18 polegadas." } },
  { id: "active-aero", from: 2026, to: 2099, name: { en: "Active aerodynamics", pt: "Aerodinâmica ativa" }, text: { en: "The 2026 formula: active aero, new power units, sustainable fuel.", pt: "O regulamento de 2026: aerodinâmica ativa, novas unidades de potência, combustível sustentável." } },
];

export const generationOf = (year: number) => GENERATION_DEFS.find((g) => year >= g.from && year <= g.to)!;
