import * as Phaser from "phaser";
import { COLORS } from "@/game/config/gameConfig";

export class Player extends Phaser.Physics.Arcade.Sprite {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: {
    up: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
  };
  private jumpKey!: Phaser.Input.Keyboard.Key;
  private interactKey!: Phaser.Input.Keyboard.Key;
  private speed = 220;
  private jumpVelocity = -520;
  private assist = false;
  private autoplay = false;
  private lockedControls = false;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "player");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setBounce(0.05);
    this.setDepth(20);
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(14, 22);
    body.setOffset(1, 2);

    if (scene.input.keyboard) {
      this.cursors = scene.input.keyboard.createCursorKeys();
      this.wasd = {
        up: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
        down: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
        left: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        right: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      };
      this.jumpKey = scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.SPACE,
      );
      this.interactKey = scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.E,
      );
    }
  }

  setAssist(enabled: boolean) {
    this.assist = enabled;
  }

  setAutoplay(enabled: boolean) {
    this.autoplay = enabled;
  }

  setControlsLocked(locked: boolean) {
    this.lockedControls = locked;
  }

  wantsInteract() {
    return this.interactKey && Phaser.Input.Keyboard.JustDown(this.interactKey);
  }

  wantsDrop() {
    return (
      this.cursors?.down?.isDown ||
      this.wasd?.down?.isDown
    );
  }

  /** Soft assist: nudge toward a target x while airborne or grounded. */
  assistToward(targetX: number) {
    if (!this.assist && !this.autoplay) return;
    const dx = targetX - this.x;
    if (Math.abs(dx) > 8) {
      this.setVelocityX(Math.sign(dx) * this.speed * (this.autoplay ? 1 : 0.7));
    }
  }

  updatePlayer() {
    if (this.lockedControls && !this.autoplay) {
      this.setVelocityX(0);
      return;
    }
    if (this.autoplay) return;

    const left = this.cursors?.left?.isDown || this.wasd?.left?.isDown;
    const right = this.cursors?.right?.isDown || this.wasd?.right?.isDown;
    const jump =
      this.cursors?.up?.isDown ||
      this.wasd?.up?.isDown ||
      this.jumpKey?.isDown;

    if (left) this.setVelocityX(-this.speed);
    else if (right) this.setVelocityX(this.speed);
    else this.setVelocityX(0);

    const body = this.body as Phaser.Physics.Arcade.Body;
    if (jump && body.blocked.down) {
      this.setVelocityY(this.jumpVelocity);
      this.setTint(COLORS.cyan);
      this.scene.time.delayedCall(120, () => this.clearTint());
    }
  }
}

export function generatePlayerTexture(scene: Phaser.Scene) {
  if (scene.textures.exists("player")) return;
  const g = scene.make.graphics({ x: 0, y: 0 });
  g.fillStyle(COLORS.player, 1);
  g.fillRect(2, 0, 12, 10);
  g.fillStyle(COLORS.moonlight, 1);
  g.fillRect(4, 2, 3, 3);
  g.fillRect(9, 2, 3, 3);
  g.fillStyle(COLORS.cyan, 1);
  g.fillRect(0, 10, 16, 12);
  g.fillStyle(COLORS.magenta, 1);
  g.fillRect(2, 22, 5, 4);
  g.fillRect(9, 22, 5, 4);
  g.generateTexture("player", 16, 26);
  g.destroy();
}
