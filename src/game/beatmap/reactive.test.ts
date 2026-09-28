import { describe, expect, it } from "vitest";
import { GAME_LEVELS } from "@/data/gameLevels";
import {
  createLevelBeatmap,
  generateReactiveNotes,
  type OnsetPeak,
} from "@/game/beatmap/reactive";

describe("five-stage rhythm portfolio", () => {
  it("keeps every project in its own bilingual level and recording", () => {
    expect(GAME_LEVELS).toHaveLength(5);
    expect(new Set(GAME_LEVELS.map((level) => level.id)).size).toBe(5);
    expect(new Set(GAME_LEVELS.map((level) => level.audio)).size).toBe(5);
    expect(GAME_LEVELS.every((level) => level.panels.length === 4)).toBe(true);
    expect(
      GAME_LEVELS.every((level) =>
        level.panels.every((panel) => panel.title.en && panel.title.zh),
      ),
    ).toBe(true);
  });

  it("builds a project-only reveal timeline", () => {
    for (const level of GAME_LEVELS) {
      const beatmap = createLevelBeatmap(level);
      const revealProjects = beatmap.events
        .filter((event) => event.eventType === "reveal")
        .map((event) => event.projectId);
      expect(new Set(revealProjects)).toEqual(new Set([level.id]));
    }
  });

  it("turns real onset peaks into direct five-lane notes", () => {
    const level = GAME_LEVELS[2];
    const peaks: OnsetPeak[] = Array.from({ length: 40 }, (_, index) => ({
      time: 2 + index * 0.35,
      strength: index % 4 === 0 ? 0.92 : 0.5,
    }));
    const notes = generateReactiveNotes(peaks, level);
    expect(notes).toHaveLength(40);
    expect(notes.every((note) => note.lane !== undefined && note.lane >= 0 && note.lane <= 4)).toBe(true);
    expect(notes.some((note) => note.action === "chord")).toBe(true);
  });
});
