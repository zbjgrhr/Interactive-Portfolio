import { create } from "zustand";
import type {
  AppMode,
  ChapterId,
  Judgment,
  Locale,
  ProjectId,
  SegmentKind,
} from "@/types";

interface UiState {
  mode: AppMode;
  selectedLevelId: ProjectId;
  locale: Locale;
  soundEnabled: boolean;
  reducedMotion: boolean;
  assistMode: boolean;
  autoplay: boolean;
  paused: boolean;
  chapter: ChapterId;
  segment: SegmentKind;
  combo: number;
  revealLevel: number;
  phrasePerfect: boolean;
  lastJudgment: Judgment | null;
  narrativeLine: string | null;
  caption: string | null;
  unlockedProjects: ProjectId[];
  openArchiveId: ProjectId | null;
  showHowToPlay: boolean;
  showCredits: boolean;
  beatDebug: boolean;
  lightweightMode: boolean;
  audioReady: boolean;
  loadingProgress: number;
  levelProgress: number;
  maxCombo: number;
  setSelectedLevel: (id: ProjectId) => void;
  setMode: (mode: AppMode) => void;
  setLocale: (locale: Locale) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setReducedMotion: (enabled: boolean) => void;
  setAssistMode: (enabled: boolean) => void;
  setAutoplay: (enabled: boolean) => void;
  setPaused: (paused: boolean) => void;
  setChapter: (chapter: ChapterId) => void;
  setSegment: (segment: SegmentKind) => void;
  setCombo: (combo: number) => void;
  setRevealLevel: (level: number) => void;
  setPhrasePerfect: (v: boolean) => void;
  setJudgment: (judgment: Judgment | null) => void;
  setNarrativeLine: (line: string | null) => void;
  setCaption: (caption: string | null) => void;
  unlockProject: (id: ProjectId) => void;
  openArchive: (id: ProjectId | null) => void;
  setShowHowToPlay: (show: boolean) => void;
  setShowCredits: (show: boolean) => void;
  setBeatDebug: (enabled: boolean) => void;
  setLightweightMode: (enabled: boolean) => void;
  setAudioReady: (ready: boolean) => void;
  setLoadingProgress: (progress: number) => void;
  setLevelProgress: (progress: number) => void;
  resetProgress: () => void;
}

const initialProgress = {
  chapter: "prologue" as ChapterId,
  segment: "play" as SegmentKind,
  combo: 0,
  revealLevel: 0,
  phrasePerfect: true,
  lastJudgment: null as Judgment | null,
  narrativeLine: null as string | null,
  caption: null as string | null,
  unlockedProjects: [] as ProjectId[],
  openArchiveId: null as ProjectId | null,
  paused: false,
};

export const useUiStore = create<UiState>((set) => ({
  mode: "entry",
  selectedLevelId: "pixel-seed",
  locale: "en",
  soundEnabled: true,
  reducedMotion: false,
  assistMode: false,
  autoplay: false,
  beatDebug: false,
  lightweightMode: false,
  audioReady: false,
  loadingProgress: 0,
  levelProgress: 0,
  maxCombo: 0,
  showHowToPlay: false,
  showCredits: false,
  ...initialProgress,
  setSelectedLevel: (selectedLevelId) => set({ selectedLevelId }),
  setMode: (mode) => set({ mode }),
  setLocale: (locale) => set({ locale }),
  setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  setAssistMode: (assistMode) => set({ assistMode }),
  setAutoplay: (autoplay) => set({ autoplay }),
  setPaused: (paused) => set({ paused }),
  setChapter: (chapter) => set({ chapter }),
  setSegment: (segment) => set({ segment }),
  setCombo: (combo) =>
    set((state) => ({ combo, maxCombo: Math.max(state.maxCombo, combo) })),
  setRevealLevel: (revealLevel) => set({ revealLevel }),
  setPhrasePerfect: (phrasePerfect) => set({ phrasePerfect }),
  setJudgment: (lastJudgment) => set({ lastJudgment }),
  setNarrativeLine: (narrativeLine) => set({ narrativeLine }),
  setCaption: (caption) => set({ caption }),
  unlockProject: (id) =>
    set((state) => ({
      unlockedProjects: state.unlockedProjects.includes(id)
        ? state.unlockedProjects
        : [...state.unlockedProjects, id],
    })),
  openArchive: (openArchiveId) => set({ openArchiveId }),
  setShowHowToPlay: (showHowToPlay) => set({ showHowToPlay }),
  setShowCredits: (showCredits) => set({ showCredits }),
  setBeatDebug: (beatDebug) => set({ beatDebug }),
  setLightweightMode: (lightweightMode) => set({ lightweightMode }),
  setAudioReady: (audioReady) => set({ audioReady }),
  setLoadingProgress: (loadingProgress) => set({ loadingProgress }),
  setLevelProgress: (levelProgress) => set({ levelProgress }),
  resetProgress: () =>
    set({ ...initialProgress, levelProgress: 0, maxCombo: 0, loadingProgress: 0 }),
}));
