import type { ChapterId, ProjectId, SegmentKind } from "@/types";
import type { ContentDocument, ContentFrame } from "@/types/content";

export interface FrameQuery {
  time?: number;
  chapter?: ChapterId;
  revealLevel?: number;
  segment?: SegmentKind;
  projectId?: ProjectId;
}

/**
 * Select frames visible for a playback or preview context.
 * A frame matches if ALL specified constraints that the frame defines are satisfied.
 */
export function selectFramesAtTime(
  doc: ContentDocument,
  query: FrameQuery,
): ContentFrame[] {
  const { time, chapter, revealLevel, segment, projectId } = query;

  return doc.frames.filter((frame) => {
    if (projectId && frame.projectId && frame.projectId !== projectId) return false;
    if (chapter && frame.chapter && frame.chapter !== chapter) return false;
    if (segment && frame.segment && frame.segment !== segment) return false;

    if (frame.trigger === "manual") return false;

    if (typeof time === "number") {
      if (typeof frame.startTime === "number" && time < frame.startTime) return false;
      if (typeof frame.endTime === "number" && time > frame.endTime) return false;
    }

    if (frame.trigger === "reveal" || frame.trigger === "synthesize") {
      if (typeof revealLevel === "number" && typeof frame.revealLevel === "number") {
        if (revealLevel < frame.revealLevel) return false;
      }
    }

    // time-only frames without reveal: visible in window
    if (frame.trigger === "time") {
      if (typeof time !== "number") return false;
      if (typeof frame.startTime !== "number") return false;
    }

    return true;
  });
}

export function framesForReveal(
  doc: ContentDocument,
  projectId: ProjectId,
  level: number,
): ContentFrame[] {
  return doc.frames.filter(
    (f) =>
      f.projectId === projectId &&
      typeof f.revealLevel === "number" &&
      f.revealLevel === level &&
      (f.trigger === "reveal" || f.trigger === "synthesize" || !f.trigger),
  );
}
