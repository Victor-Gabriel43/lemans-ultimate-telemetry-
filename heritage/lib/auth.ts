import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "rha_admin";
const token = (pw: string) => createHash("sha256").update(`rha:${pw}`).digest("hex");

/** Admin is open in development when no password is configured; closed in production. */
export function authMode(): "password" | "open-dev" | "locked" {
  if (process.env.ADMIN_PASSWORD) return "password";
  return process.env.NODE_ENV === "production" ? "locked" : "open-dev";
}

export async function isAdmin() {
  const mode = authMode();
  if (mode === "open-dev") return true;
  if (mode === "locked") return false;
  const value = (await cookies()).get(COOKIE)?.value ?? "";
  const expected = token(process.env.ADMIN_PASSWORD!);
  return value.length === expected.length && timingSafeEqual(Buffer.from(value), Buffer.from(expected));
}

export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

export async function signIn(password: string) {
  if (authMode() !== "password" || password !== process.env.ADMIN_PASSWORD) return false;
  (await cookies()).set(COOKIE, token(password), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/admin", maxAge: 60 * 60 * 12 });
  return true;
}

export async function signOut() {
  (await cookies()).delete({ name: COOKIE, path: "/admin" });
}
