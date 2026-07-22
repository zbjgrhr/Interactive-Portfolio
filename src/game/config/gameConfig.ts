import * as Phaser from "phaser";

export const GAME_WIDTH = 1280;
export const GAME_HEIGHT = 720;

export const COLORS = {
  deepBlue: 0x0b1a2b,
  midnightPurple: 0x1a1030,
  cyan: 0x5eead4,
  magenta: 0xe879a9,
  moonlight: 0xf5e6a8,
  keyWhite: 0xe8eef7,
  keyBlack: 0x1c1f2a,
  keyLit: 0x7dd3fc,
  player: 0xf0abfc,
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
    backgroundColor: "#0b1a2b",
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
          "Resonance Archive interactive piano world",
        );
      },
    },
  };
}
