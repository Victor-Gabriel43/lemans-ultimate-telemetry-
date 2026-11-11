import { prisma } from "../db.js";
import { ACCENT_PALETTE, colorForName, type Driver } from "@lmu/shared";

const MAX_NAME_LENGTH = 40;
const HEX_COLOR = /^#[0-9A-Fa-f]{6}$/;

function toDriver(db: { id: string; roomId: string; name: string; colorHex: string; createdAt: Date }): Driver {
  return { id: db.id, roomId: db.roomId, name: db.name, colorHex: db.colorHex, createdAt: db.createdAt.toISOString() };
}

function sanitizeName(name: unknown): string | null {
  if (typeof name !== "string") return null;
  const trimmed = name.trim().slice(0, MAX_NAME_LENGTH);
  return trimmed || null;
}

function sanitizeColor(colorHex: unknown): string | null {
  return typeof colorHex === "string" && HEX_COLOR.test(colorHex) ? colorHex.toUpperCase() : null;
}

export async function listDrivers(roomId: string): Promise<Driver[]> {
  const rows = await prisma.driver.findMany({ where: { roomId }, orderBy: { createdAt: "asc" } });
  return rows.map(toDriver);
}

/**
 * Cria um piloto no roster da sala. Sem cor explícita, usa a primeira cor da
 * paleta ainda não usada na sala (pilotos visualmente distintos na escala);
 * com a paleta esgotada, cai no hash determinístico do nome.
 */
export async function addDriver(roomId: string, name: unknown, colorHex?: unknown): Promise<void> {
  const safeName = sanitizeName(name);
  if (!safeName) return;

  let color = sanitizeColor(colorHex);
  if (!color) {
    const used = new Set(
      (await prisma.driver.findMany({ where: { roomId }, select: { colorHex: true } })).map((d) =>
        d.colorHex.toUpperCase()
      )
    );
    color = ACCENT_PALETTE.find((c) => !used.has(c.toUpperCase())) ?? colorForName(safeName);
  }

  await prisma.driver.create({ data: { roomId, name: safeName, colorHex: color } });
}

export async function updateDriver(
  roomId: string,
  driverId: string,
  patch: { name?: unknown; colorHex?: unknown }
): Promise<void> {
  const data: { name?: string; colorHex?: string } = {};
  if (patch && "name" in patch) {
    const safeName = sanitizeName(patch.name);
    if (safeName) data.name = safeName;
  }
  if (patch && "colorHex" in patch) {
    const color = sanitizeColor(patch.colorHex);
    if (color) data.colorHex = color;
  }
  if (Object.keys(data).length === 0) return;

  // updateMany com roomId no where: nunca mexe em piloto de outra sala.
  await prisma.driver.updateMany({ where: { id: driverId, roomId }, data });
}

/**
 * Remove o piloto. As linhas da escala que apontavam pra ele ficam com
 * driverId = null (onDelete: SetNull no schema) — por isso o handler do
 * socket rebroadcasta a escala também.
 */
export async function removeDriver(roomId: string, driverId: string): Promise<void> {
  await prisma.driver.deleteMany({ where: { id: driverId, roomId } });
}
