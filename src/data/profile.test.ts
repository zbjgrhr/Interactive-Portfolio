import { describe, expect, it } from "vitest";
import { getProfileCopy, publicLinks } from "@/data/profile";

describe("public profile", () => {
  it("provides complete bilingual positioning", () => {
    for (const locale of ["en", "zh"] as const) {
      const profile = getProfileCopy(locale);
      expect(profile.headline).toBeTruthy();
      expect(profile.capabilities).toHaveLength(4);
      expect(profile.experiences).toHaveLength(3);
      expect(profile.timeline).toHaveLength(2);
    }
  });

  it("links only to current public contact destinations", () => {
    expect(publicLinks.email).toContain("@");
    expect(publicLinks.github).toBe("https://github.com/zbjgrhr");
  });
});
