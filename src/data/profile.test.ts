import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { publicLinks } from "@/data/profile";

describe("resume downloads", () => {
  it("exposes separate English and Chinese resume files", () => {
    expect(publicLinks.resumes.en.href).not.toBe(publicLinks.resumes.zh.href);
    expect(publicLinks.resumes.en.filename).toMatch(/English\.docx$/);
    expect(publicLinks.resumes.zh.filename).toMatch(/Chinese\.pdf$/);
  });

  it.each(Object.values(publicLinks.resumes))(
    "keeps $href available in public downloads",
    ({ href }) => {
      expect(existsSync(path.join(process.cwd(), "public", href))).toBe(true);
    },
  );
});
