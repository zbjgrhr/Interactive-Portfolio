import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  caseStudyProjectIds,
  projectCaseStudies,
} from "@/data/projectCaseStudies";

describe("project case studies", () => {
  it("provides ordered bilingual chapters for every project", () => {
    for (const projectId of caseStudyProjectIds) {
      for (const locale of ["en", "zh"] as const) {
        const sections = projectCaseStudies[projectId][locale];
        const expectedCount = projectId === "pixel-seed" ? 8 : 4;
        expect(sections).toHaveLength(expectedCount);
        expect(sections.map((section) => section.step)).toEqual(
          Array.from({ length: expectedCount }, (_, index) =>
            String(index + 1).padStart(2, "0"),
          ),
        );
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
          const images =
            section.visual.kind === "image"
              ? [section.visual]
              : section.visual.kind === "gallery"
                ? section.visual.images
                : [];
          for (const image of images) {
            const relativePath = image.src.replace(/^\/+/, "");
            expect(
              existsSync(path.resolve(process.cwd(), "public", relativePath)),
              `${projectId}/${locale}/${section.step}: ${image.src}`,
            ).toBe(true);
            expect(image.alt.trim()).not.toBe("");
          }
        }
      }
    }
  });

  it("uses the current Pixel World multi-agent product captures", () => {
    for (const locale of ["en", "zh"] as const) {
      const imagePaths = projectCaseStudies["pixel-seed"][locale]
        .flatMap((section) =>
          section.visual.kind === "image"
            ? [section.visual.src]
            : section.visual.kind === "gallery"
              ? section.visual.images.map((image) => image.src)
              : [],
        );

      expect(imagePaths).not.toHaveLength(0);
      expect(imagePaths).toContain(
        "/portfolio/pixel-world-v5-asset-system.png",
      );
      expect(imagePaths.every((src) => src.includes("pixel-world-v5-"))).toBe(
        true,
      );
    }
  });
});
