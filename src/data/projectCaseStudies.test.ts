import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  caseStudyProjectIds,
  projectCaseStudies,
} from "@/data/projectCaseStudies";

describe("project case studies", () => {
  it("provides four ordered chapters in both languages for every project", () => {
    for (const projectId of caseStudyProjectIds) {
      for (const locale of ["en", "zh"] as const) {
        const sections = projectCaseStudies[projectId][locale];
        expect(sections).toHaveLength(4);
        expect(sections.map((section) => section.step)).toEqual([
          "01",
          "02",
          "03",
          "04",
        ]);
        for (const section of sections) {
          expect(section.title.trim()).not.toBe("");
          expect(section.body.trim()).not.toBe("");
        }
      }
    }
  });

  it("keeps English and Chinese editorial copy distinct", () => {
    for (const projectId of caseStudyProjectIds) {
      const english = projectCaseStudies[projectId].en;
      const chinese = projectCaseStudies[projectId].zh;
      for (let index = 0; index < english.length; index += 1) {
        expect(chinese[index].title).not.toBe(english[index].title);
        expect(chinese[index].body).not.toBe(english[index].body);
      }
    }
  });

  it("references image assets that exist in the public directory", () => {
    for (const projectId of caseStudyProjectIds) {
      for (const locale of ["en", "zh"] as const) {
        for (const section of projectCaseStudies[projectId][locale]) {
          if (section.visual.kind !== "image") continue;
          const relativePath = section.visual.src.replace(/^\/+/, "");
          expect(
            existsSync(path.resolve(process.cwd(), "public", relativePath)),
            `${projectId}/${locale}/${section.step}: ${section.visual.src}`,
          ).toBe(true);
          expect(section.visual.alt.trim()).not.toBe("");
        }
      }
    }
  });
});
