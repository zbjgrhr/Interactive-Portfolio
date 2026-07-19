import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "resonance_admin";
const MAX_AGE_SEC = 60 * 60 * 24 * 7; // 7 days

function getPassword() {
  return process.env.ADMIN_PASSWORD || "resonance-dev";
}

function getSecret() {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "resonance-dev-secret";
}

export function getAdminCookieName() {
  return COOKIE_NAME;
}

export function verifyPassword(password: string) {
  const expected = getPassword();
  if (!password || !expected) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function createSessionToken() {
  const exp = Date.now() + MAX_AGE_SEC * 1000;
  const payload = `ok.${exp}`;
  const sig = createHmac("sha256", getSecret()).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [ok, expStr, sig] = parts;
  if (ok !== "ok") return false;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || Date.now() > exp) return false;
  const payload = `${ok}.${expStr}`;
  const expected = createHmac("sha256", getSecret()).update(payload).digest("hex");
  try {
    return timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function sessionCookieOptions(token: string) {
  return {
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: MAX_AGE_SEC,
    secure: process.env.NODE_ENV === "production",
  };
}

export { MAX_AGE_SEC };
