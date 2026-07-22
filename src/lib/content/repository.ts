import { promises as fs } from "fs";
import path from "path";
import type { ContentDocument } from "@/types/content";
import { createSeedDocument } from "@/lib/content/seed";
import { isContentDocument, validateDocument } from "@/lib/content/schema";

const DOC_REL = path.join("data", "content", "document.json");

export function getDocumentPath() {
  return path.join(process.cwd(), DOC_REL);
}

export async function readDocument(): Promise<ContentDocument> {
  const filePath = getDocumentPath();
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (!isContentDocument(parsed)) {
      throw new Error("Invalid document shape");
    }
    const errors = validateDocument(parsed);
    if (errors.length) {
      console.warn("Content document warnings:", errors.slice(0, 5));
    }
    return parsed;
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (
      code === "ENOENT" ||
      code === "EACCES" ||
      code === "EROFS" ||
      err instanceof SyntaxError
    ) {
      return createSeedDocument();
    }
    throw err;
  }
}

export async function writeDocument(doc: ContentDocument): Promise<ContentDocument> {
  const errors = validateDocument(doc);
  if (errors.length) {
    throw new Error(`Invalid document: ${errors.join("; ")}`);
  }
  const next: ContentDocument = {
    ...doc,
    updatedAt: new Date().toISOString(),
  };
  const filePath = getDocumentPath();
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(next, null, 2), "utf8");
  return next;
}

/** Repository interface for future Blob/S3 backends. */
export interface ContentRepository {
  read(): Promise<ContentDocument>;
  write(doc: ContentDocument): Promise<ContentDocument>;
}

export const fileSystemRepository: ContentRepository = {
  read: readDocument,
  write: writeDocument,
};
