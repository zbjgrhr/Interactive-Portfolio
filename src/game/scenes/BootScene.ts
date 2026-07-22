import * as Phaser from "phaser";
import { getGameBridge } from "@/game/bridge/GameBridge";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  create() {
    getGameBridge().emit({ type: "loading", progress: 0.25 });
    this.scene.start("WorldScene");
  }
}
