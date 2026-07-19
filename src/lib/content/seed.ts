import { projects } from "@/data/projects";
import { en } from "@/content/en";
import type { ContentDocument, ContentFrame, ProjectContent } from "@/types/content";
import {
  DEFAULT_FILTERS,
  DEFAULT_TEXT_STYLE,
  MEMORY_CANVAS,
} from "@/types/content";
import { defaultTransform, newId } from "@/lib/content/schema";

function toProjectContent(): ProjectContent[] {
  return projects.map((p) => ({
    id: p.id,
    title: p.title,
    oneLiner: p.oneLiner,
    context: p.context,
    problem: p.problem,
    role: p.role,
    process: [...p.process],
    keyDecisions: [...p.keyDecisions],
    technology: [...p.technology],
    challenges: [...p.challenges],
    outcome: p.outcome,
    learned: [...p.learned],
    github: p.github,
    liveDemo: p.liveDemo,
    coverSrc: p.screenshots[0],
    gallery: [...p.screenshots],
    category: p.category,
    period: p.period,
    status: p.status,
    featured: p.featured,
    metrics: p.metrics,
  }));
}

function narrativesFromEn(): ContentDocument["narratives"] {
  const out: NonNullable<ContentDocument["narratives"]> = {};
  for (const [key, value] of Object.entries(en.narrative)) {
    out[key] = { en: value };
  }
  return out;
}

function makeTextLayer(
  text: string,
  x: number,
  y: number,
  w = 280,
  h = 40,
  z = 2,
  color = "#5eead4",
) {
  return {
    id: newId("layer"),
    type: "text" as const,
    name: "Text",
    transform: defaultTransform(x, y, w, h, z),
    visible: true,
    text,
    textStyle: { ...DEFAULT_TEXT_STYLE, color, fontSize: 14 },
  };
}

function makeImageLayer(src: string, x: number, y: number, w: number, h: number, z = 1) {
  return {
    id: newId("layer"),
    type: "image" as const,
    name: "Image",
    transform: defaultTransform(x, y, w, h, z),
    visible: true,
    src,
    objectFit: "cover" as const,
    filters: { ...DEFAULT_FILTERS },
  };
}

function makeFrameLayer(x: number, y: number, w: number, h: number, z = 0) {
  return {
    id: newId("layer"),
    type: "frame" as const,
    name: "Frame",
    transform: defaultTransform(x, y, w, h, z),
    visible: true,
    fill: "rgba(26,16,48,0.75)",
    stroke: "#5eead4",
    strokeWidth: 1,
    radius: 4,
  };
}

/** Default frames aligned roughly with beatmap reveal events. */
function seedFrames(): ContentFrame[] {
  return [
    {
      id: "frame-pixel-1",
      name: "Pixel Seed — Title",
      chapter: "movement-i",
      projectId: "pixel-seed",
      revealLevel: 1,
      trigger: "reveal",
      startTime: 17,
      endTime: 37,
      canvas: { ...MEMORY_CANVAS },
      layers: [
        makeFrameLayer(120, 60, 320, 100, 0),
        makeTextLayer("PIXEL SEED", 140, 80, 280, 36, 2, "#e879a9"),
        makeTextLayer("from prompt to playable stage", 140, 115, 280, 30, 2),
      ],
    },
    {
      id: "frame-pixel-2",
      name: "Pixel Seed — Draft",
      chapter: "movement-i",
      projectId: "pixel-seed",
      revealLevel: 2,
      trigger: "reveal",
      startTime: 20.5,
      endTime: 37,
      canvas: { ...MEMORY_CANVAS },
      layers: [
        makeFrameLayer(430, 30, 400, 250, 0),
        makeImageLayer("/portfolio/pixel-seed-hero.webp", 450, 50, 360, 185, 1),
        makeTextLayer("prompt-to-world interface", 450, 242, 360, 24, 2, "#8fa0b8"),
      ],
    },
    {
      id: "frame-pixel-3",
      name: "Pixel Seed — Pipeline",
      chapter: "movement-i",
      projectId: "pixel-seed",
      revealLevel: 3,
      trigger: "reveal",
      startTime: 24.2,
      endTime: 37,
      canvas: { ...MEMORY_CANVAS },
      layers: [
        makeTextLayer("prompt → assets → stage", 160, 220, 360, 30, 2),
      ],
    },
    {
      id: "frame-pixel-4",
      name: "Pixel Seed — World",
      chapter: "movement-i",
      projectId: "pixel-seed",
      revealLevel: 4,
      trigger: "reveal",
      startTime: 29.5,
      endTime: 39,
      canvas: { ...MEMORY_CANVAS },
      layers: [
        makeFrameLayer(760, 35, 430, 260, 0),
        makeImageLayer("/portfolio/pixel-seed-system.webp", 780, 55, 390, 200, 1),
        makeTextLayer("playable world system", 780, 262, 390, 24, 2, "#f5e6a8"),
      ],
    },
    {
      id: "frame-browser-1",
      name: "Browser Tools — Tabs",
      chapter: "movement-ii",
      projectId: "browser-tools",
      revealLevel: 1,
      trigger: "reveal",
      startTime: 43,
      endTime: 58,
      canvas: { ...MEMORY_CANVAS },
      layers: [
        makeImageLayer("/portfolio/web-study-workspace.webp", 100, 50, 360, 165, 1),
        makeTextLayer("tabs → signal", 100, 220, 260, 28, 2),
      ],
    },
    {
      id: "frame-emotion-1",
      name: "Emotion — Space",
      chapter: "movement-iii",
      projectId: "emotion-chatbot",
      revealLevel: 1,
      trigger: "reveal",
      startTime: 65,
      endTime: 80,
      canvas: { ...MEMORY_CANVAS },
      layers: [
        makeTextLayer("Some signals need to be heard.", 200, 120, 400, 40, 2, "#e879a9"),
        makeImageLayer("/portfolio/innerseed-hero.webp", 660, 45, 420, 190, 1),
      ],
    },
    {
      id: "frame-research-1",
      name: "Research — Wave",
      chapter: "movement-iv",
      projectId: "multimodal-research",
      revealLevel: 1,
      trigger: "reveal",
      startTime: 86,
      endTime: 101,
      canvas: { ...MEMORY_CANVAS },
      layers: [
        makeImageLayer("/portfolio/eeg-processing.webp", 160, 40, 400, 205, 1),
        makeTextLayer("raw signals → structure", 160, 240, 320, 28, 2, "#f5e6a8"),
      ],
    },
  ];
}

export function createSeedDocument(): ContentDocument {
  return {
    version: 2,
    updatedAt: new Date().toISOString(),
    localeDefaults: { en: true, zh: true },
    projects: toProjectContent(),
    frames: seedFrames(),
    narratives: narrativesFromEn(),
  };
}
