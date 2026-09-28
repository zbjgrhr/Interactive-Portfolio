import * as Phaser from "phaser";
import { COLORS } from "@/game/config/gameConfig";
import { HIT_LINE_Y, PianoStage } from "@/game/entities/PianoStage";
import type { BeatEvent, Judgment } from "@/types";
import { normalizeAction } from "@/game/systems/RhythmSystem";

interface ActiveNote {
  event: BeatEvent;
  gfx: Phaser.GameObjects.GameObject;
  trail?: Phaser.GameObjects.Rectangle;
}

/** Notes approach the hit line as light trails / ribbons mapped to pitch lanes. */
export class NoteHighway {
  private scene: Phaser.Scene;
  private stage: PianoStage;
  private active = new Map<string, ActiveNote>();
  private lookAhead = 1.6;
  private reducedMotion = false;

  constructor(scene: Phaser.Scene, stage: PianoStage) {
    this.scene = scene;
    this.stage = stage;
  }

  setReducedMotion(v: boolean) {
    this.reducedMotion = v;
  }

  update(songTime: number, upcoming: BeatEvent[], judgedIds: Set<string> | ((id: string) => boolean)) {
    const isJudged =
      typeof judgedIds === "function"
        ? judgedIds
        : (id: string) => judgedIds.has(id);

    for (const event of upcoming) {
      if (isJudged(event.id) || this.active.has(event.id)) continue;
      this.spawn(event);
    }

    for (const [id, active] of this.active) {
      if (isJudged(id)) {
        this.destroyNote(id);
        continue;
      }
      const t = eventProgress(active.event.time, songTime, this.lookAhead);
      const x = this.stage.laneToX(active.event.lane ?? 2);
      const y = Phaser.Math.Linear(40, HIT_LINE_Y, t);
      if ("setPosition" in active.gfx) {
        (active.gfx as Phaser.GameObjects.Container).setPosition(x, y);
      }
      if (active.trail) {
        const top = Math.min(y, HIT_LINE_Y);
        const h = Math.abs(HIT_LINE_Y - y) + 8;
        active.trail.setPosition(x, top + h / 2);
        active.trail.setDisplaySize(8 + t * 4, h);
        active.trail.setAlpha(0.1 + t * 0.55);
      }
      if (songTime - active.event.time > 0.35) {
        this.destroyNote(id);
      }
    }
  }

  private spawn(event: BeatEvent) {
    const lane = event.lane ?? 2;
    const x = this.stage.laneToX(lane);
    const action = normalizeAction(event.action as string);
    const color =
      action === "chord"
        ? COLORS.magenta
        : action === "hold"
          ? COLORS.moonlight
          : action === "leap"
            ? COLORS.cyan
            : COLORS.keyLit;

    const w = action === "hold" ? 18 : action === "chord" ? 22 : 12;
    const h = action === "hold" ? 28 : 10;

    const halo = this.scene.add
      .ellipse(0, 0, w * 2.2, Math.max(20, h * 1.8), color, 0.12)
      .setStrokeStyle(1, color, 0.65);
    const core = this.scene.add
      .rectangle(0, 0, w, h, color, 0.98)
      .setStrokeStyle(2, COLORS.keyWhite, 0.55);
    const gfx = this.scene.add.container(x, 40, [halo, core]).setDepth(15);
    if (!this.reducedMotion) {
      this.scene.tweens.add({
        targets: halo,
        scaleX: 1.3,
        scaleY: 1.3,
        alpha: 0.02,
        duration: 420,
        yoyo: true,
        repeat: -1,
      });
    }

    let trail: Phaser.GameObjects.Rectangle | undefined;
    if (!this.reducedMotion) {
      trail = this.scene.add
        .rectangle(x, 40, 8, 20, color, 0.28)
        .setDepth(14);
    }

    this.active.set(event.id, { event, gfx, trail });
  }

  flashHit(event: BeatEvent, judgment: Judgment, combo: number) {
    const x = this.stage.laneToX(event.lane ?? 2);
    const color = judgment === "perfect" ? COLORS.moonlight : COLORS.cyan;
    const burst = this.scene.add
      .ellipse(x, HIT_LINE_Y, 34, 16, color, 0.95)
      .setDepth(20);
    const ring = this.scene.add
      .circle(x, HIT_LINE_Y, 18, color, 0)
      .setStrokeStyle(judgment === "perfect" ? 3 : 2, color, 0.9)
      .setDepth(21);
    this.scene.tweens.add({
      targets: [burst, ring],
      alpha: 0,
      scaleX: judgment === "perfect" ? 3.4 : 2.4,
      scaleY: judgment === "perfect" ? 3.4 : 2.4,
      duration: this.reducedMotion ? 80 : judgment === "perfect" ? 280 : 210,
      onComplete: () => {
        burst.destroy();
        ring.destroy();
      },
    });
    if (!this.reducedMotion && (judgment === "perfect" || combo >= 15)) {
      const sparks = Array.from({ length: combo >= 15 ? 10 : 6 }, (_, index) => {
        const angle = (Math.PI * 2 * index) / (combo >= 15 ? 10 : 6);
        const spark = this.scene.add.rectangle(x, HIT_LINE_Y, 4, 12, color, 0.9).setDepth(22);
        this.scene.tweens.add({
          targets: spark,
          x: x + Math.cos(angle) * 54,
          y: HIT_LINE_Y + Math.sin(angle) * 38,
          alpha: 0,
          rotation: angle,
          duration: 260,
          onComplete: () => spark.destroy(),
        });
        return spark;
      });
      void sparks;
    }
    this.destroyNote(event.id);
  }

  private destroyNote(id: string) {
    const active = this.active.get(id);
    if (!active) return;
    active.gfx.destroy();
    active.trail?.destroy();
    this.active.delete(id);
  }

  clear() {
    for (const id of [...this.active.keys()]) this.destroyNote(id);
  }
}

function eventProgress(eventTime: number, songTime: number, lookAhead: number) {
  const start = eventTime - lookAhead;
  if (songTime <= start) return 0;
  if (songTime >= eventTime) return 1;
  return (songTime - start) / lookAhead;
}
