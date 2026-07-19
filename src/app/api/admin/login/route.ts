import { NextResponse } from "next/server";
import {
  createSessionToken,
  sessionCookieOptions,
  verifyPassword,
} from "@/lib/content/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { password?: string };
    if (!verifyPassword(body.password ?? "")) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
    const token = createSessionToken();
    const res = NextResponse.json({ ok: true });
    const opts = sessionCookieOptions(token);
    res.cookies.set(opts);
    return res;
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
