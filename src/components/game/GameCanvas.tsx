"use client";

import { useEffect, useRef } from "react";
import * as Phaser from "phaser";
import { createGameConfig } from "@/game/config/gameConfig";
import { BootScene } from "@/game/scenes/BootScene";
import { WorldScene } from "@/game/scenes/WorldScene";
import { getGameBridge, resetGameBridge } from "@/game/bridge/GameBridge";
import { useUiStore } from "@/store/uiStore";
import type { ChapterId, ProjectId } from "@/types";

/**
 * Mounts a single Phaser instance. Handles React Strict Mode double-mount
 * by destroying any previous game before creating a new one.
 */
export function GameCanvas() {
  const hostRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);
  const creatingRef = useRef(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    const bridge = resetGameBridge();

    const unsub = bridge.onEvent((event) => {
      const store = useUiStore.getState();
      switch (event.type) {
        case "ready":
          store.setLoadingProgress(1);
          bridge.sendCommand({
            type: "startLevel",
            levelId: store.selectedLevelId,
            locale: store.locale,
          });
          bridge.sendCommand({ type: "setSound", enabled: store.soundEnabled });
          bridge.sendCommand({ type: "setAssist", enabled: store.assistMode });
          bridge.sendCommand({ type: "setReducedMotion", enabled: store.reducedMotion });
          break;
        case "loading":
          store.setLoadingProgress(event.progress);
          break;
        case "audioUnlocked":
          store.setAudioReady(true);
          break;
        case "chapterChange":
          store.setChapter(event.chapter as ChapterId);
          break;
        case "unlockProject":
          store.unlockProject(event.projectId as ProjectId);
          break;
        case "openArchive":
          store.openArchive(event.projectId as ProjectId);
          store.setPaused(true);
          bridge.sendCommand({ type: "pause" });
          break;
        case "judgment":
          store.setJudgment(event.judgment);
          store.setCombo(event.combo);
          if (event.judgment === "miss") store.setPhrasePerfect(false);
          break;
        case "segmentChange":
          store.setSegment(event.segment);
          break;
        case "revealProgress":
          store.setRevealLevel(event.level);
          break;
        case "levelProgress":
          store.setLevelProgress(event.progress);
          break;
        case "phraseClear":
          store.setPhrasePerfect(event.perfect);
          break;
        case "narrativeLine": {
          store.setNarrativeLine(event.textId);
          break;
        }
        case "caption":
          if (event.text === "toggle-pause") {
            const next = !store.paused;
            store.setPaused(next);
            bridge.sendCommand({ type: next ? "pause" : "resume" });
          } else {
            store.setCaption(event.text);
          }
          break;
        case "songEnded":
          store.setChapter("coda");
          store.setPaused(true);
          break;
        default:
          break;
      }
    });

    const mount = async () => {
      if (creatingRef.current) return;
      creatingRef.current = true;

      // Destroy leftover canvas from Strict Mode remount
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
      host.replaceChildren();

      // Dynamic import already done at module level; create game
      const game = new Phaser.Game(
        createGameConfig(host, [BootScene, WorldScene]),
      );
      gameRef.current = game;
      creatingRef.current = false;

      if (cancelled) {
        game.destroy(true);
        gameRef.current = null;
      }
    };

    void mount();

    const onVisibility = () => {
      const store = useUiStore.getState();
      if (document.hidden) {
        if (!store.paused && store.mode === "play") {
          store.setPaused(true);
          getGameBridge().sendCommand({ type: "pause" });
        }
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      unsub();
      document.removeEventListener("visibilitychange", onVisibility);
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
      creatingRef.current = false;
    };
  }, []);

  // Sync settings → bridge
  useEffect(() => {
    const bridge = getGameBridge();
    return useUiStore.subscribe((state, prev) => {
      if (state.assistMode !== prev.assistMode) {
        bridge.sendCommand({ type: "setAssist", enabled: state.assistMode });
      }
      if (state.autoplay !== prev.autoplay) {
        bridge.sendCommand({ type: "setAutoplay", enabled: state.autoplay });
      }
      if (state.soundEnabled !== prev.soundEnabled) {
        bridge.sendCommand({ type: "setSound", enabled: state.soundEnabled });
      }
      if (state.reducedMotion !== prev.reducedMotion) {
        bridge.sendCommand({
          type: "setReducedMotion",
          enabled: state.reducedMotion,
        });
      }
      if (state.lightweightMode !== prev.lightweightMode) {
        bridge.sendCommand({
          type: "setLightweight",
          enabled: state.lightweightMode,
        });
      }
      if (state.locale !== prev.locale) {
        bridge.sendCommand({ type: "setLocale", locale: state.locale });
      }
    });
  }, []);

  return (
    <div
      ref={hostRef}
      className="game-host"
      data-testid="game-canvas-host"
    />
  );
}
