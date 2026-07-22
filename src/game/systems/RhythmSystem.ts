import type { BeatEvent, Judgment, NoteAction, SegmentKind } from "@/types";
import { judgeHit, isPastMiss, isInWindow } from "@/game/rhythm/JudgeWindow";

export interface RhythmState {
  combo: number;
  lastJudgment: Judgment | null;
  saturation: number;
  maxCombo: number;
}

export interface HitResult {
  judgment: Judgment;
  event: BeatEvent;
  combo: number;
}

/**
 * Input-driven rhythm: player hits against nearest note in timing window.
 * Misses never kill — they only reset combo and lower saturation.
 */
export class RhythmSystem {
  private events: BeatEvent[];
  private notes: BeatEvent[];
  private timelineCursor = 0;
  private judged = new Set<string>();
  private assist = false;
  private state: RhythmState = {
    combo: 0,
    lastJudgment: null,
    saturation: 1,
    maxCombo: 0,
  };

  constructor(events: BeatEvent[]) {
    this.events = [...events].sort((a, b) => a.time - b.time);
    this.notes = this.events.filter((e) => e.eventType === "note");
  }

  setAssist(enabled: boolean) {
    this.assist = enabled;
  }

  getState() {
    return this.state;
  }

  reset() {
    this.timelineCursor = 0;
    this.judged.clear();
    this.state = { combo: 0, lastJudgment: null, saturation: 1, maxCombo: 0 };
  }

  /** Non-note timeline events (segment, narrative, reveal…). */
  consumeDue(songTime: number): BeatEvent[] {
    const due: BeatEvent[] = [];
    while (
      this.timelineCursor < this.events.length &&
      this.events[this.timelineCursor].time <= songTime
    ) {
      const e = this.events[this.timelineCursor];
      this.timelineCursor += 1;
      if (e.eventType !== "note") due.push(e);
    }
    return due;
  }

  peekUpcomingNotes(songTime: number, lookAhead: number): BeatEvent[] {
    return this.notes.filter(
      (e) =>
        !this.judged.has(e.id) &&
        e.time > songTime - 0.05 &&
        e.time <= songTime + lookAhead,
    );
  }

  getNextNote(songTime: number): BeatEvent | null {
    return (
      this.notes.find((e) => !this.judged.has(e.id) && e.time >= songTime - 0.2) ??
      null
    );
  }

  /**
   * Attempt a hit on the current lane.
   * Returns null if nothing in window (ghost tap — no miss).
   */
  tryHit(lane: number, songTime: number): HitResult | null {
    const candidates = this.notes.filter((e) => {
      if (this.judged.has(e.id)) return false;
      if (e.lane === undefined) return false;
      if (!isInWindow(e.time, songTime, this.assist)) return false;
      return true;
    });

    if (candidates.length === 0) return null;

    // Prefer exact lane match, then nearest lane
    candidates.sort((a, b) => {
      const da = Math.abs((a.lane ?? 0) - lane);
      const db = Math.abs((b.lane ?? 0) - lane);
      if (da !== db) return da - db;
      return Math.abs(a.time - songTime) - Math.abs(b.time - songTime);
    });

    const target = candidates[0];
    const laneDist = Math.abs((target.lane ?? 0) - lane);
    // Allow adjacent lane with assist; otherwise require exact lane
    const maxLaneDist = this.assist ? 1 : 0;
    if (laneDist > maxLaneDist) return null;

    const judgment = judgeHit(target.time, songTime, this.assist);
    this.judged.add(target.id);
    this.applyJudgment(judgment);
    return { judgment, event: target, combo: this.state.combo };
  }

  /** Auto-miss notes that passed the window. */
  flushMisses(songTime: number): BeatEvent[] {
    const missed: BeatEvent[] = [];
    for (const e of this.notes) {
      if (this.judged.has(e.id)) continue;
      if (isPastMiss(e.time, songTime, this.assist)) {
        this.judged.add(e.id);
        this.applyJudgment("miss");
        missed.push(e);
      }
    }
    return missed;
  }

  isJudged(id: string) {
    return this.judged.has(id);
  }

  private applyJudgment(judgment: Judgment) {
    this.state.lastJudgment = judgment;
    if (judgment === "miss") {
      this.state.combo = 0;
      this.state.saturation = Math.max(0.35, this.state.saturation - 0.1);
    } else {
      this.state.combo += 1;
      this.state.maxCombo = Math.max(this.state.maxCombo, this.state.combo);
      this.state.saturation = Math.min(1, this.state.saturation + 0.04);
    }
  }
}

export function normalizeAction(action?: string): NoteAction {
  if (action === "leap" || action === "hold" || action === "chord") return action;
  if (action === "jump") return "leap";
  return "step";
}

export function currentSegmentFromEvents(
  events: BeatEvent[],
  songTime: number,
): SegmentKind {
  let seg: SegmentKind = "play";
  for (const e of events) {
    if (e.eventType === "segment" && e.segment && e.time <= songTime) {
      seg = e.segment;
    }
  }
  return seg;
}
