import * as Phaser from "phaser";

export const GAME_WIDTH = 1280;
export const GAME_HEIGHT = 720;

export const COLORS = {
  deepBlue: 0x6f5266,
  midnightPurple: 0x8d6680,
  cyan: 0xf19abb,
  magenta: 0xe96f9d,
  moonlight: 0xfff4c9,
  keyWhite: 0xfff9ef,
  keyBlack: 0x725468,
  keyLit: 0xffb8d0,
  player: 0xffcadc,
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
    backgroundColor: "#6f5266",
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
