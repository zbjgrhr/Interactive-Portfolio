import * as Phaser from "phaser";
import { COLORS } from "@/game/config/gameConfig";
import { KEY_Y, PianoStage } from "@/game/entities/PianoStage";
import { LANE_COUNT } from "@/types";
import { normalizeAction } from "@/game/systems/RhythmSystem";
import type { BeatEvent } from "@/types";

/** Semi-auto avatar: stays on pitch lanes; auto-scrolls visually; player switches lanes. */
export class AvatarController {
  private scene: Phaser.Scene;
  private stage: PianoStage;
  sprite!: Phaser.GameObjects.Container;
  lane = 2;
  private body!: Phaser.GameObjects.Rectangle;
  private scarf!: Phaser.GameObjects.Rectangle;
  private assist = false;
  private autoplay = false;
  private holding = false;
  private scrollX = 0;

  constructor(scene: Phaser.Scene, stage: PianoStage) {
    this.scene = scene;
    this.stage = stage;
  }

  create() {
    this.body = this.scene.add.rectangle(0, 0, 14, 22, COLORS.player);
    const head = this.scene.add.rectangle(0, -14, 12, 10, COLORS.player);
    const eye = this.scene.add.rectangle(2, -15, 3, 3, COLORS.moonlight);
    this.scarf = this.scene.add.rectangle(0, -2, 16, 4, COLORS.cyan);
    this.sprite = this.scene.add
      .container(this.stage.laneToX(this.lane), KEY_Y - 48, [
        head,
        eye,
        this.body,
        this.scarf,
      ])
      .setDepth(25);
  }

  setAssist(v: boolean) {
    this.assist = v;
  }

  setAutoplay(v: boolean) {
    this.autoplay = v;
  }

  moveLane(delta: number) {
    this.lane = Phaser.Math.Clamp(this.lane + delta, 0, LANE_COUNT - 1);
    this.tweenToLane();
  }

  setLane(lane: number, leap = false) {
    const prev = this.lane;
    this.lane = Phaser.Math.Clamp(Math.round(lane), 0, LANE_COUNT - 1);
    if (leap || Math.abs(this.lane - prev) >= 2) {
      this.leapToLane();
    } else {
      this.tweenToLane();
    }
  }

  private tweenToLane() {
    this.scene.tweens.add({
      targets: this.sprite,
      x: this.stage.laneToX(this.lane),
      duration: 120,
      ease: "Sine.easeOut",
    });
  }

  private leapToLane() {
    const targetX = this.stage.laneToX(this.lane);
    this.scene.tweens.add({
      targets: this.sprite,
      x: targetX,
      y: KEY_Y - 78,
      duration: 140,
      yoyo: true,
      ease: "Quad.easeOut",
      onYoyo: () => {
        this.sprite.y = KEY_Y - 48;
      },
      onComplete: () => {
        this.sprite.y = KEY_Y - 48;
      },
    });
  }

  playAction(event: BeatEvent) {
    const action = normalizeAction(event.action as string);
    if (event.lane !== undefined && event.lane !== this.lane) {
      this.setLane(event.lane, action === "leap" || Math.abs(event.lane - this.lane) >= 2);
    }
    if (action === "hold") {
      this.holding = true;
      this.scene.tweens.add({
        targets: this.scarf,
        scaleX: 1.3,
        duration: 80,
        yoyo: true,
        repeat: 3,
      });
    } else if (action === "chord") {
      this.scene.tweens.add({
        targets: this.sprite,
        y: KEY_Y - 70,
        duration: 100,
        yoyo: true,
      });
    } else {
      this.scene.tweens.add({
        targets: this.body,
        scaleY: 0.85,
        duration: 60,
        yoyo: true,
      });
    }
  }

  endHold() {
    this.holding = false;
  }

  /** Soft auto-follow next note when assist/autoplay. */
  assistToward(next: BeatEvent | null) {
    if ((!this.assist && !this.autoplay) || !next || next.lane === undefined) return;
    if (next.lane !== this.lane) {
      this.setLane(next.lane, Math.abs(next.lane - this.lane) >= 2);
    }
  }

  /** Subtle forward scroll bob for semi-auto motion feel. */
  updateScroll(delta: number, showcase: boolean) {
    this.scrollX += delta * (showcase ? 0.01 : 0.025);
    this.sprite.y = KEY_Y - 48 + Math.sin(this.scrollX) * (this.holding ? 2 : 1);
  }
}
