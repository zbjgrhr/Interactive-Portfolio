import * as Phaser from "phaser";
import { COLORS } from "@/game/config/gameConfig";

export class PianoKeyPlatform extends Phaser.Physics.Arcade.Sprite {
  lane: number;
  isBlack: boolean;
  lit = false;
  soft = false;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    lane: number,
    isBlack = false,
  ) {
    super(scene, x, y, isBlack ? "key-black" : "key-white");
    this.lane = lane;
    this.isBlack = isBlack;
    scene.add.existing(this);
    scene.physics.add.existing(this, true);
    this.setOrigin(0.5, 0);
    this.setDepth(10);
    this.setAlpha(0.92);
  }

  light(intensity = 0.8, reducedMotion = false) {
    this.lit = true;
    this.setTint(COLORS.keyLit);
    this.setAlpha(0.7 + intensity * 0.3);
    if (!reducedMotion) {
      scenePulse(this.scene, this);
    }
    this.scene.time.delayedCall(280, () => this.dim());
  }

  dim() {
    this.lit = false;
    this.clearTint();
    this.setAlpha(0.92);
  }
}

function scenePulse(scene: Phaser.Scene, target: Phaser.GameObjects.Sprite) {
  scene.tweens.add({
    targets: target,
    scaleY: 1.06,
    duration: 80,
    yoyo: true,
  });
}

export function generateKeyTextures(scene: Phaser.Scene) {
  if (!scene.textures.exists("key-white")) {
    const g = scene.make.graphics({ x: 0, y: 0 });
    g.fillStyle(COLORS.keyWhite, 1);
    g.fillRect(0, 0, 72, 18);
    g.fillStyle(0xb8c4d8, 1);
    g.fillRect(0, 14, 72, 4);
    g.lineStyle(1, 0x8a97ad, 1);
    g.strokeRect(0, 0, 72, 18);
    g.generateTexture("key-white", 72, 18);
    g.destroy();
  }
  if (!scene.textures.exists("key-black")) {
    const g = scene.make.graphics({ x: 0, y: 0 });
    g.fillStyle(COLORS.keyBlack, 1);
    g.fillRect(0, 0, 44, 14);
    g.fillStyle(0x2a3144, 1);
    g.fillRect(0, 10, 44, 4);
    g.generateTexture("key-black", 44, 14);
    g.destroy();
  }
  if (!scene.textures.exists("note-platform")) {
    const g = scene.make.graphics({ x: 0, y: 0 });
    g.fillStyle(COLORS.cyan, 0.85);
    g.fillRoundedRect(0, 0, 48, 12, 2);
    g.generateTexture("note-platform", 48, 12);
    g.destroy();
  }
}

export function laneToX(lane: number, originX = 120, spacing = 86) {
  return originX + lane * spacing;
}
