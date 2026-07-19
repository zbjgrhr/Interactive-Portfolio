import * as Phaser from "phaser";
import { COLORS } from "@/game/config/gameConfig";

export class EnvironmentSystem {
  private scene: Phaser.Scene;
  private bg!: Phaser.GameObjects.Rectangle;
  private stars: Phaser.GameObjects.Rectangle[] = [];
  private hall: Phaser.GameObjects.Rectangle[] = [];
  private props = new Map<string, Phaser.GameObjects.GameObject>();
  private reducedMotion = false;
  private lightweight = false;
  private particles: Phaser.GameObjects.Particles.ParticleEmitter | null = null;
  private phase: string = "void";

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  setReducedMotion(v: boolean) {
    this.reducedMotion = v;
  }

  setLightweight(v: boolean) {
    this.lightweight = v;
  }

  create() {
    const { width, height } = this.scene.scale;
    this.bg = this.scene.add
      .rectangle(0, 0, width * 3, height * 2, COLORS.deepBlue)
      .setOrigin(0)
      .setScrollFactor(0)
      .setDepth(0);

    for (let i = 0; i < (this.lightweight ? 12 : 40); i++) {
      const star = this.scene.add
        .rectangle(
          Phaser.Math.Between(0, width * 2),
          Phaser.Math.Between(20, height * 0.55),
          2,
          2,
          COLORS.moonlight,
          Phaser.Math.FloatBetween(0.2, 0.7),
        )
        .setScrollFactor(0.15)
        .setDepth(1);
      this.stars.push(star);
    }

    // Distant hall silhouette
    const hallBase = this.scene.add
      .rectangle(width * 0.5, height * 0.42, 420, 120, COLORS.midnightPurple, 0.55)
      .setScrollFactor(0.25)
      .setDepth(2);
    this.hall.push(hallBase);
  }

  setSaturation(amount: number) {
    const color = Phaser.Display.Color.Interpolate.ColorWithColor(
      Phaser.Display.Color.ValueToColor(0x3a4458),
      Phaser.Display.Color.ValueToColor(COLORS.deepBlue),
      100,
      Math.floor(amount * 100),
    );
    this.bg.setFillStyle(
      Phaser.Display.Color.GetColor(color.r, color.g, color.b),
    );
  }

  pulse(intensity: number) {
    if (this.reducedMotion || this.lightweight) return;
    this.scene.cameras.main.shake(40, 0.0015 * intensity);
    this.burst(intensity);
  }

  burst(intensity: number) {
    if (this.reducedMotion || this.lightweight) return;
    if (!this.scene.textures.exists("particle-dot")) {
      const g = this.scene.make.graphics({ x: 0, y: 0 });
      g.fillStyle(0xffffff, 1);
      g.fillRect(0, 0, 3, 3);
      g.generateTexture("particle-dot", 3, 3);
      g.destroy();
    }
    const cam = this.scene.cameras.main;
    const emitter = this.scene.add.particles(
      cam.scrollX + 640,
      360,
      "particle-dot",
      {
        speed: { min: 40, max: 120 + intensity * 80 },
        scale: { start: 1, end: 0 },
        lifespan: 450,
        quantity: Math.floor(4 + intensity * 8),
        tint: [COLORS.cyan, COLORS.magenta, COLORS.moonlight],
        emitting: false,
      },
    );
    emitter.setDepth(50);
    emitter.explode();
    this.scene.time.delayedCall(600, () => emitter.destroy());
  }

  applyEnvironment(id: string) {
    this.phase = id;
    switch (id) {
      case "pixel-void":
        this.bg.setFillStyle(COLORS.deepBlue);
        break;
      case "pixel-generate":
        this.spawnProp(
          "gen-grid",
          this.scene.add
            .rectangle(900, 280, 200, 140, COLORS.cyan, 0.15)
            .setDepth(3)
            .setStrokeStyle(1, COLORS.cyan, 0.5),
        );
        break;
      case "pixel-world":
        this.spawnProp(
          "pixel-hill",
          this.scene.add
            .rectangle(1100, 480, 260, 80, 0x14532d, 0.8)
            .setDepth(3),
        );
        this.spawnProp(
          "pixel-tree",
          this.scene.add.rectangle(1040, 430, 20, 60, 0x166534).setDepth(4),
        );
        break;
      case "browser-city":
        this.bg.setFillStyle(0x101826);
        for (let i = 0; i < 5; i++) {
          this.spawnProp(
            `win-${i}`,
            this.scene.add
              .rectangle(1400 + i * 110, 360 - (i % 2) * 40, 90, 110, 0x1e293b, 0.9)
              .setStrokeStyle(2, COLORS.cyan, 0.4)
              .setDepth(3),
          );
        }
        break;
      case "browser-clear":
        this.props.forEach((obj, key) => {
          if (key.startsWith("win-")) {
            this.scene.tweens.add({
              targets: obj,
              alpha: 0.15,
              y: "-=30",
              duration: this.reducedMotion ? 0 : 600,
            });
          }
        });
        break;
      case "emotion-quiet":
        this.bg.setFillStyle(0x141028);
        this.spawnProp(
          "emotion-path",
          this.scene.add
            .rectangle(2200, 500, 400, 8, COLORS.magenta, 0.5)
            .setDepth(3),
        );
        break;
      case "research-wave":
        this.bg.setFillStyle(0x0a1622);
        this.spawnProp(
          "eeg",
          this.scene.add
            .rectangle(2800, 300, 360, 4, COLORS.cyan, 0.7)
            .setDepth(3),
        );
        break;
      case "coda-merge":
        this.bg.setFillStyle(COLORS.midnightPurple);
        break;
      default:
        break;
    }
  }

  private spawnProp(id: string, obj: Phaser.GameObjects.GameObject) {
    const existing = this.props.get(id);
    if (existing) existing.destroy();
    this.props.set(id, obj);
  }

  getPhase() {
    return this.phase;
  }
}
