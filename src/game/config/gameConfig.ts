import * as Phaser from "phaser";

export const GAME_WIDTH = 1280;
export const GAME_HEIGHT = 720;

export const COLORS = {
  deepBlue: 0x314653,
  midnightPurple: 0x594a42,
  cyan: 0x73b2c0,
  magenta: 0xe36d66,
  moonlight: 0xffd66b,
  keyWhite: 0xfff7e7,
  keyBlack: 0x28383e,
  keyLit: 0xf1b85a,
  player: 0xed7b67,
};

export function createGameConfig(
  parent: HTMLElement,
  scenes: Phaser.Types.Scenes.SceneType[],
): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.AUTO,
    parent,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    backgroundColor: "#314653",
    pixelArt: true,
    antialias: false,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { x: 0, y: 1200 },
        debug: false,
      },
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: scenes,
    audio: {
      disableWebAudio: true,
    },
    callbacks: {
      postBoot: (game) => {
        game.canvas.setAttribute("role", "img");
        game.canvas.setAttribute(
          "aria-label",
          "Resonance Archive（共鸣档案） · 互动钢琴世界",
        );
      },
    },
  };
}
