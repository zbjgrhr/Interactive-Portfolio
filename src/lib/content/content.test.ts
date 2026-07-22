import { describe, expect, it } from "vitest";
import { createSeedDocument } from "@/lib/content/seed";
import { validateDocument } from "@/lib/content/schema";
import {
  framesForReveal,
  selectFramesAtTime,
} from "@/lib/content/selectFramesAtTime";

describe("validateDocument", () => {
  it("accepts seed document", () => {
    const doc = createSeedDocument();
    expect(validateDocument(doc)).toEqual([]);
  });
});

describe("selectFramesAtTime", () => {
  it("filters by time window", () => {
    const doc = createSeedDocument();
    const at17 = selectFramesAtTime(doc, { time: 17.5, chapter: "movement-i" });
    expect(at17.some((f) => f.id === "frame-pixel-1")).toBe(true);
    const at10 = selectFramesAtTime(doc, { time: 10, chapter: "movement-i" });
    expect(at10.every((f) => f.id !== "frame-pixel-1")).toBe(true);
  });

  it("filters by reveal level", () => {
    const doc = createSeedDocument();
    const frames = framesForReveal(doc, "pixel-seed", 2);
    expect(frames.some((f) => f.id === "frame-pixel-2")).toBe(true);
    expect(frames.every((f) => f.revealLevel === 2)).toBe(true);
  });
});
