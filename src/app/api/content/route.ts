import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readDocument, writeDocument } from "@/lib/content/repository";
import { isContentDocument, validateDocument } from "@/lib/content/schema";
import {
  getAdminCookieName,
  verifySessionToken,
} from "@/lib/content/auth";
import type { ContentDocument } from "@/types/content";

export const runtime = "nodejs";

async function isAuthed() {
  const jar = await cookies();
  const token = jar.get(getAdminCookieName())?.value;
  return verifySessionToken(token);
}

export async function GET() {
  try {
    const doc = await readDocument();
    return NextResponse.json(doc);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to read content" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await request.json()) as unknown;
    if (!isContentDocument(body)) {
      return NextResponse.json({ error: "Invalid document shape" }, { status: 400 });
    }
    const errors = validateDocument(body);
    if (errors.length) {
      return NextResponse.json({ error: errors.join("; ") }, { status: 400 });
    }
    const saved = await writeDocument(body as ContentDocument);
    return NextResponse.json(saved);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to save" },
      { status: 500 },
    );
  }
}
