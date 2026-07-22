import { describe, expect, it } from "vitest";
import { mergeProjectScreenshots } from "@/lib/content/projectsAdapter";

describe("mergeProjectScreenshots", () => {
  it("keeps static supporting media after a custom primary image", () => {
    expect(
      mergeProjectScreenshots(
        ["/portfolio/primary.webp", "/portfolio/system.webp"],
        ["/uploads/custom-primary.webp"],
      ),
    ).toEqual([
      "/uploads/custom-primary.webp",
      "/portfolio/system.webp",
    ]);
  });

  it("deduplicates media while preserving editorial order", () => {
    expect(
      mergeProjectScreenshots(
        ["/portfolio/primary.webp", "/portfolio/system.webp"],
        ["/portfolio/primary.webp", "/uploads/detail.webp"],
      ),
    ).toEqual([
      "/portfolio/primary.webp",
      "/uploads/detail.webp",
      "/portfolio/system.webp",
    ]);
  });

  it("ignores empty and placeholder-only overrides", () => {
    expect(
      mergeProjectScreenshots(
        ["/portfolio/primary.webp", "/portfolio/system.webp"],
        ["", "/images/placeholder.svg"],
      ),
    ).toEqual(["/portfolio/primary.webp", "/portfolio/system.webp"]);
  });
});
