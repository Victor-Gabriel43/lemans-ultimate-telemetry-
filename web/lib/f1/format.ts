const TZ = "UTC";
export const fmtDate = (d: Date, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" }) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: TZ, ...opts }).format(d);
export const fmtKm = (m: number | null | undefined) => (m ? `${(m / 1000).toFixed(3)} km` : "—");
export const age = (dob: string, now = new Date()) => {
  const b = new Date(dob);
  let a = now.getUTCFullYear() - b.getUTCFullYear();
  if (now < new Date(Date.UTC(now.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate()))) a--;
  return a;
};
/** Country → flag emoji is unreliable across platforms; use ISO-ish short codes instead. */
export const countryCode = (c: string) => c.slice(0, 3).toUpperCase();
