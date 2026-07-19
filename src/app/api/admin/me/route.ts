import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminCookieName, verifySessionToken } from "@/lib/content/auth";

export const runtime = "nodejs";

export async function GET() {
  const jar = await cookies();
  const token = jar.get(getAdminCookieName())?.value;
  const ok = verifySessionToken(token);
  return NextResponse.json({ authenticated: ok });
}
