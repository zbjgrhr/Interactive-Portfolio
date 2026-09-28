import { describe, expect, it } from "vitest";
import { SongClock } from "@/game/rhythm/SongClock";
import { judgeHit, isPastMiss } from "@/game/rhythm/JudgeWindow";
import { createMetronomeBeatmap, eventsInRange } from "@/game/beatmap/loader";
import { RhythmSystem } from "@/game/systems/RhythmSystem";

describe("SongClock", () => {
  it("tracks time from a fake AudioContext", () => {
    let now = 10;
    const ctx = {
      get currentTime() {
        return now;
      },
    } as AudioContext;
    const clock = new SongClock();
    clock.attach(ctx, 0);
    clock.start(0);
    expect(clock.getTime()).toBeCloseTo(0, 5);
    now = 12.5;
    expect(clock.getTime()).toBeCloseTo(2.5, 5);
    clock.pause();
    const paused = clock.getTime();
    now = 20;
    expect(clock.getTime()).toBeCloseTo(paused, 5);
    clock.resume();
    now = 21;
    expect(clock.getTime()).toBeCloseTo(paused + 1, 5);
  });
});

describe("JudgeWindow", () => {
  it("returns perfect/great/miss", () => {
    expect(judgeHit(1, 1.02)).toBe("perfect");
    expect(judgeHit(1, 1.1)).toBe("great");
    expect(judgeHit(1, 1.3)).toBe("miss");
  });

  it("widens with assist", () => {
    expect(judgeHit(1, 1.2, true)).not.toBe("miss");
    expect(isPastMiss(1, 1.2, true)).toBe(false);
    expect(isPastMiss(1, 1.5, true)).toBe(true);
  });
});

describe("beatmap loader helpers", () => {
  it("creates metronome note events with pitch contour", () => {
    const map = createMetronomeBeatmap(120, 4);
    expect(map.metadata.bpm).toBe(120);
    expect(map.events.some((e) => e.eventType === "note")).toBe(true);
    const notes = map.events.filter((e) => e.eventType === "note");
    expect(notes.every((e) => e.lane !== undefined && e.lane >= 0 && e.lane <= 4)).toBe(
      true,
    );
    const slice = eventsInRange(map.events, 0, 1);
    expect(slice.every((e) => e.time < 1)).toBe(true);
  });
});

describe("RhythmSystem input hits", () => {
  it("judges a tap on the correct lane", () => {
    const rhythm = new RhythmSystem([
      {
        id: "n1",
        time: 1.0,
        lane: 2,
        action: "step",
        eventType: "note",
      },
    ]);
    expect(rhythm.tryHit(2, 1.02)).toMatchObject({ judgment: "perfect", combo: 1 });
    expect(rhythm.tryHit(2, 1.03)).toBeNull();
  });

  it("misses past notes without killing further play", () => {
    const rhythm = new RhythmSystem([
      { id: "n1", time: 1.0, lane: 0, action: "step", eventType: "note" },
      { id: "n2", time: 2.0, lane: 4, action: "leap", eventType: "note" },
    ]);
    const missed = rhythm.flushMisses(1.5);
    expect(missed).toHaveLength(1);
    expect(rhythm.getState().combo).toBe(0);
    const hit = rhythm.tryHit(4, 2.0);
    expect(hit?.judgment).toBe("perfect");
    expect(rhythm.getState().combo).toBe(1);
  });
});
