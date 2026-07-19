import type { BeatEvent, Beatmap, NoteAction, PitchLane } from "@/types";
import type { GameLevel, LevelDifficulty } from "@/data/gameLevels";

export interface OnsetPeak {
  time: number;
  strength: number;
}

const LANE_PATTERNS: Record<string, PitchLane[]> = {
  "browser-tools": [0, 1, 2, 3, 4, 3, 2, 1],
  "auto-reply": [0, 2, 1, 3, 2, 4, 3, 1],
  "pixel-seed": [0, 1, 3, 2, 4, 2, 0, 3, 4, 1],
  "emotion-chatbot": [1, 3, 2, 4, 0, 2, 3, 1, 4, 2],
  "multimodal-research": [0, 4, 1, 3, 2, 4, 0, 3, 1, 4, 2, 0],
};

const DENSITY_STEP: Record<LevelDifficulty, number> = {
  casual: 2,
  hard: 1,
  expert: 1,
  nightmare: 1,
};

export function createLevelBeatmap(level: GameLevel): Beatmap {
  return {
    metadata: {
      title: level.track,
      artist: level.artist,
      bpm: level.bpm,
      offset: 0,
      duration: level.duration,
      audio: level.audio,
    },
    events: createLevelTimeline(level),
  };
}

export function createLevelTimeline(level: GameLevel): BeatEvent[] {
  const duration = level.duration;
  const times = [0.12, 0.34, 0.56, 0.76].map((ratio) =>
    +(duration * ratio).toFixed(3),
  );
  const events: BeatEvent[] = [
    {
      id: `${level.id}-chapter`,
      time: 0.1,
      eventType: "chapter",
      chapter: level.chapter,
    },
    {
      id: `${level.id}-environment`,
      time: 0.2,
      eventType: "environment",
      portfolioEvent: level.environment,
    },
    {
      id: `${level.id}-segment-play`,
      time: 0.25,
      eventType: "segment",
      segment: "play",
    },
    {
      id: `${level.id}-narrative-intro`,
      time: 1.2,
      eventType: "narrative",
      textId: `${level.id}:0`,
    },
  ];

  times.forEach((time, index) => {
    events.push(
      {
        id: `${level.id}-reveal-${index + 1}`,
        time,
        eventType: "reveal",
        revealLevel: index + 1,
        projectId: level.id,
      },
      {
        id: `${level.id}-narrative-${index + 1}`,
        time: Math.min(duration - 4, time + 1.1),
        eventType: "narrative",
        textId: `${level.id}:${index}`,
      },
    );
  });

  events.push(
    {
      id: `${level.id}-segment-showcase`,
      time: +(duration * 0.72).toFixed(3),
      eventType: "segment",
      segment: "showcase",
    },
    {
      id: `${level.id}-archive`,
      time: +(duration * 0.82).toFixed(3),
      eventType: "archive",
      projectId: level.id,
    },
    {
      id: `${level.id}-segment-climax`,
      time: +(duration * 0.86).toFixed(3),
      eventType: "segment",
      segment: "climax",
    },
    {
      id: `${level.id}-synthesize`,
      time: +(duration * 0.94).toFixed(3),
      eventType: "synthesize",
      projectId: level.id,
      intensity: 1,
    },
    {
      id: `${level.id}-final-burst`,
      time: +(duration * 0.945).toFixed(3),
      eventType: "particle",
      intensity: 1,
    },
  );

  return events.sort((a, b) => a.time - b.time);
}

export function generateReactiveNotes(
  peaks: OnsetPeak[],
  level: GameLevel,
): BeatEvent[] {
  const pattern = LANE_PATTERNS[level.id] ?? LANE_PATTERNS["pixel-seed"];
  const step = DENSITY_STEP[level.difficulty];
  const usable = peaks.filter(
    (peak) => peak.time > 1.8 && peak.time < level.duration - 1,
  );
  const selected = usable.filter((_, index) => index % step === 0);

  return selected.map((peak, index) => {
    const lane = pattern[index % pattern.length];
    const previousLane = pattern[(index - 1 + pattern.length) % pattern.length];
    const next = selected[index + 1];
    const gap = next ? next.time - peak.time : 0;
    let action: NoteAction = Math.abs(lane - previousLane) >= 3 ? "leap" : "step";
    let duration = 0.18;

    if (peak.strength > 0.82 && index % 4 === 0) {
      action = "chord";
    } else if (gap > 0.8 && index % 7 === 0) {
      action = "hold";
      duration = Math.min(1.2, gap * 0.72);
    }

    return {
      id: `${level.id}-reactive-${index}`,
      time: +peak.time.toFixed(3),
      duration: +duration.toFixed(3),
      lane,
      note: ["C3", "E3", "G3", "C4", "E4"][lane],
      action,
      eventType: "note",
      intensity: 0.45 + peak.strength * 0.55,
    };
  });
}
