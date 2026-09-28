import type { Locale, ProjectId } from "@/types";

export type BridgeCommand =
  | { type: "pause" }
  | { type: "resume" }
  | { type: "skipChapter" }
  | { type: "setAssist"; enabled: boolean }
  | { type: "setAutoplay"; enabled: boolean }
  | { type: "setSound"; enabled: boolean }
  | { type: "setReducedMotion"; enabled: boolean }
  | { type: "setLightweight"; enabled: boolean }
  | { type: "startLevel"; levelId: ProjectId; locale: Locale }
  | { type: "setLocale"; locale: Locale }
  | { type: "replay" }
  | { type: "openArchiveAck" }
  | { type: "hitLane"; lane: number }
  | { type: "releaseLane"; lane: number }
  | { type: "interact" };

export type BridgeEvent =
  | { type: "ready" }
  | { type: "chapterChange"; chapter: string }
  | { type: "unlockProject"; projectId: string }
  | { type: "openArchive"; projectId: string }
  | { type: "judgment"; judgment: "perfect" | "great" | "miss"; combo: number }
  | { type: "narrativeLine"; textId: string }
  | { type: "caption"; text: string }
  | { type: "songEnded" }
  | { type: "loading"; progress: number }
  | { type: "audioUnlocked" }
  | { type: "clockTime"; time: number }
  | { type: "levelProgress"; progress: number }
  | { type: "segmentChange"; segment: "play" | "showcase" | "climax" }
  | { type: "revealProgress"; level: number; projectId: string }
  | { type: "phraseClear"; perfect: boolean };

type Handler<T> = (payload: T) => void;

/** Typed event bus between React shell and Phaser game. */
export class GameBridge {
  private commandHandlers = new Set<Handler<BridgeCommand>>();
  private eventHandlers = new Set<Handler<BridgeEvent>>();
  private pendingCommands: BridgeCommand[] = [];
  private gameReady = false;

  markReady() {
    this.gameReady = true;
    const queued = [...this.pendingCommands];
    this.pendingCommands = [];
    queued.forEach((command) => this.dispatchCommand(command));
  }

  sendCommand(command: BridgeCommand) {
    if (!this.gameReady || this.commandHandlers.size === 0) {
      this.pendingCommands.push(command);
      return;
    }
    this.dispatchCommand(command);
  }

  private dispatchCommand(command: BridgeCommand) {
    this.commandHandlers.forEach((handler) => handler(command));
  }

  onCommand(handler: Handler<BridgeCommand>) {
    this.commandHandlers.add(handler);
    return () => this.commandHandlers.delete(handler);
  }

  emit(event: BridgeEvent) {
    if (event.type === "ready") this.markReady();
    this.eventHandlers.forEach((handler) => handler(event));
  }

  onEvent(handler: Handler<BridgeEvent>) {
    this.eventHandlers.add(handler);
    return () => this.eventHandlers.delete(handler);
  }

  clear() {
    this.commandHandlers.clear();
    this.eventHandlers.clear();
    this.pendingCommands = [];
    this.gameReady = false;
  }
}

let singleton: GameBridge | null = null;

export function getGameBridge() {
  if (!singleton) singleton = new GameBridge();
  return singleton;
}

export function resetGameBridge() {
  if (singleton) singleton.clear();
  singleton = new GameBridge();
  return singleton;
}
