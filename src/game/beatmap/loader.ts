import type { Beatmap, BeatEvent, NoteAction } from "@/types";

export async function loadBeatmap(url: string): Promise<Beatmap> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load beatmap: ${url}`);
  const data = (await res.json()) as Beatmap;
  validateBeatmap(data);
  return data;
}

export function validateBeatmap(beatmap: Beatmap): void {
  if (!beatmap.metadata?.bpm || !beatmap.metadata?.duration) {
    throw new Error("Beatmap metadata incomplete");
  }
  if (!Array.isArray(beatmap.events)) {
    throw new Error("Beatmap events must be an array");
  }
}

export function eventsInRange(
  events: BeatEvent[],
  from: number,
  to: number,
): BeatEvent[] {
  return events.filter((e) => e.time >= from && e.time < to);
}

export function upcomingEvents(
  events: BeatEvent[],
  time: number,
  lookAhead: number,
): BeatEvent[] {
  return events.filter((e) => e.time >= time && e.time <= time + lookAhead);
}

export function getNoteEvents(events: BeatEvent[]): BeatEvent[] {
  return events.filter((e) => e.eventType === "note");
}

/** Rising/falling pitch melody for metronome fallback. */
export function createMetronomeBeatmap(
  bpm: number,
  duration: number,
  audio = "/audio/portfolio-theme.mp3",
): Beatmap {
  const beat = 60 / bpm;
  const events: BeatEvent[] = [];
  let i = 0;
  const pattern = [0, 1, 2, 3, 4, 3, 2, 1];
  for (let t = 0; t < duration; t += beat) {
    const lane = pattern[i % pattern.length];
    const isDownbeat = i % 4 === 0;
    const isHold = i % 8 === 7;
    const action: NoteAction = isHold
      ? "hold"
      : isDownbeat && lane >= 3
        ? "leap"
        : isDownbeat
          ? "chord"
          : "step";
    events.push({
      id: `metro-${i}`,
      time: +t.toFixed(3),
      duration: isHold ? beat * 1.5 : beat * 0.4,
      lane,
      note: ["C3", "E3", "G3", "C4", "E4"][lane],
      action,
      eventType: "note",
      intensity: isDownbeat ? 0.9 : 0.45,
    });
    i += 1;
  }
  events.push({
    id: "seg-play",
    time: 0,
    eventType: "segment",
    segment: "play",
  });
  return {
    metadata: {
      title: "Csikós Post (Arr. for Piano)",
      artist: "Forest of Piano / Hermann Necke",
      bpm,
      offset: 0,
      duration,
      audio,
    },
    events,
  };
}
