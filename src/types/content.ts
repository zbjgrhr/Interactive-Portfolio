import type { ChapterId, ProjectId, SegmentKind } from "@/types";

export type LayerType = "text" | "image" | "frame";

export type FrameTrigger = "time" | "reveal" | "synthesize" | "manual";

export interface Transform2D {
  x: number;
  y: number;
  w: number;
  h: number;
  rotation?: number;
  zIndex: number;
  opacity: number;
}

export interface ImageFilters {
  brightness: number;
  contrast: number;
  saturate: number;
  blur: number;
  grayscale: number;
}

export interface TextStyle {
  color: string;
  fontSize: number;
  fontWeight: number | string;
  align: "left" | "center" | "right";
  lineHeight?: number;
  letterSpacing?: number;
  fontFamily?: string;
}

export interface ContentLayer {
  id: string;
  type: LayerType;
  name?: string;
  transform: Transform2D;
  locked?: boolean;
  visible?: boolean;
  text?: string;
  textStyle?: TextStyle;
  src?: string;
  objectFit?: "cover" | "contain" | "fill";
  filters?: ImageFilters;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  radius?: number;
}

export interface ContentFrame {
  id: string;
  name: string;
  chapter?: ChapterId;
  projectId?: ProjectId;
  segment?: SegmentKind;
  startTime?: number;
  endTime?: number;
  revealLevel?: number;
  trigger?: FrameTrigger;
  canvas: { width: number; height: number };
  layers: ContentLayer[];
}

export interface ProjectContent {
  id: ProjectId;
  title: string;
  oneLiner: string;
  context: string;
  problem: string;
  role: string;
  process: string[];
  keyDecisions: string[];
  technology: string[];
  challenges: string[];
  outcome: string;
  learned: string[];
  github?: string;
  liveDemo?: string;
  coverSrc?: string;
  gallery: string[];
  category?: string;
  period?: string;
  status?: string;
  featured?: boolean;
  metrics?: { value: string; label: string }[];
}

export interface ContentDocument {
  version: number;
  updatedAt: string;
  localeDefaults: { en: boolean; zh: boolean };
  projects: ProjectContent[];
  frames: ContentFrame[];
  narratives?: Record<string, { en: string; zh?: string }>;
}

export const MEMORY_CANVAS = { width: 1280, height: 396 } as const;

export const DEFAULT_FILTERS: ImageFilters = {
  brightness: 1,
  contrast: 1,
  saturate: 1,
  blur: 0,
  grayscale: 0,
};

export const DEFAULT_TEXT_STYLE: TextStyle = {
  color: "#e8eef7",
  fontSize: 16,
  fontWeight: 600,
  align: "left",
  lineHeight: 1.4,
  fontFamily: "Courier New, monospace",
};
