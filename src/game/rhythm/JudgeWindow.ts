import type { Judgment } from "@/types";

export interface JudgeConfig {
  perfectWindow: number;
  greatWindow: number;
  assistScale: number;
}

const DEFAULT: JudgeConfig = {
  perfectWindow: 0.07,
  greatWindow: 0.15,
  assistScale: 1.6,
};

export function judgeHit(
  eventTime: number,
  songTime: number,
  assist = false,
  config: JudgeConfig = DEFAULT,
): Judgment {
  const scale = assist ? config.assistScale : 1;
  const delta = Math.abs(songTime - eventTime);
  if (delta <= config.perfectWindow * scale) return "perfect";
  if (delta <= config.greatWindow * scale) return "great";
  return "miss";
}

export function isInWindow(
  eventTime: number,
  songTime: number,
  assist = false,
  config: JudgeConfig = DEFAULT,
): boolean {
  const scale = assist ? config.assistScale : 1;
  return Math.abs(songTime - eventTime) <= config.greatWindow * scale;
}

export function isPastMiss(
  eventTime: number,
  songTime: number,
  assist = false,
  config: JudgeConfig = DEFAULT,
): boolean {
  const scale = assist ? config.assistScale : 1;
  return songTime - eventTime > config.greatWindow * scale;
}
