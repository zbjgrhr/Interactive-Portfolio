import type { ProjectId } from "@/types";
import type { MemoryScroll } from "@/game/systems/MemoryScroll";

const COMBO_THRESHOLDS = [
  { combo: 5, level: 1 },
  { combo: 10, level: 2 },
  { combo: 20, level: 3 },
  { combo: 30, level: 4 },
];

/**
 * Combo builds the memory world. Misses slow reveal but never lock content —
 * scheduled `reveal` events still fire with slow=true when combo is broken.
 */
export class ComboReveal {
  private memory: MemoryScroll;
  private unlocked = new Set<string>();
  private activeProject: ProjectId | null = null;
  private phrasePerfect = true;

  constructor(memory: MemoryScroll) {
    this.memory = memory;
  }

  reset() {
    this.unlocked.clear();
    this.activeProject = null;
    this.phrasePerfect = true;
  }

  setProject(projectId: ProjectId | null) {
    this.activeProject = projectId;
  }

  onJudgment(combo: number, miss: boolean) {
    if (miss) {
      this.phrasePerfect = false;
      return;
    }
    if (!this.activeProject) return;
    for (const t of COMBO_THRESHOLDS) {
      if (combo >= t.combo) {
        this.tryUnlock(this.activeProject, t.level, false);
      }
    }
  }

  /** Beatmap-scheduled reveal — always appears; slower if combo was broken. */
  onScheduledReveal(level: number, projectId: ProjectId, combo: number) {
    this.activeProject = projectId;
    const slow = combo < 5;
    this.tryUnlock(projectId, level, slow);
  }

  onSynthesize(projectId: ProjectId) {
    this.memory.synthesize(projectId);
  }

  getPhrasePerfect() {
    return this.phrasePerfect;
  }

  getRevealLevel(projectId: ProjectId) {
    let max = 0;
    for (const key of this.unlocked) {
      if (key.startsWith(projectId + ":")) {
        max = Math.max(max, Number(key.split(":")[1]));
      }
    }
    return max;
  }

  private tryUnlock(projectId: ProjectId, level: number, slow: boolean) {
    const key = `${projectId}:${level}`;
    if (this.unlocked.has(key)) return;
    this.unlocked.add(key);
    this.memory.reveal(level, projectId, slow);
  }
}
