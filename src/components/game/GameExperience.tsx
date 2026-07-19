"use client";

import dynamic from "next/dynamic";
import { A11yChrome } from "@/components/accessibility/A11yChrome";
import { ErrorBoundary } from "@/components/accessibility/ErrorBoundary";
import { ModalLayers } from "@/components/accessibility/ModalLayers";
import { ArchivePanel } from "@/components/archive/ArchivePanel";
import { GameHUD } from "@/components/game/GameHUD";
import { EntryGate } from "@/components/navigation/EntryGate";
import { useUiStore } from "@/store/uiStore";

const GameCanvas = dynamic(
  () => import("@/components/game/GameCanvas").then((module) => module.GameCanvas),
  { ssr: false },
);

export function GameExperience() {
  const mode = useUiStore((state) => state.mode);

  return (
    <ErrorBoundary>
      <div className="app-shell game-experience-shell">
        <A11yChrome />
        {mode === "play" && <GameCanvas />}
        <EntryGate />
        <GameHUD />
        <ArchivePanel />
        <ModalLayers />
      </div>
    </ErrorBoundary>
  );
}
