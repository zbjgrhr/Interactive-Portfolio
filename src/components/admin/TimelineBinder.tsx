"use client";

import { useAdminStore } from "@/components/admin/adminStore";
import { selectFramesAtTime } from "@/lib/content/selectFramesAtTime";
import type { ChapterId, ProjectId, SegmentKind } from "@/types";
import type { FrameTrigger } from "@/types/content";

export function TimelineBinder({ frameId }: { frameId: string }) {
  const document = useAdminStore((s) => s.document);
  const previewTime = useAdminStore((s) => s.previewTime);
  const setPreviewTime = useAdminStore((s) => s.setPreviewTime);
  const updateFrame = useAdminStore((s) => s.updateFrame);

  const frame = document?.frames.find((f) => f.id === frameId);
  if (!frame || !document) return null;

  const visible = selectFramesAtTime(document, {
    time: previewTime,
    chapter: frame.chapter,
    revealLevel: frame.revealLevel,
    segment: frame.segment,
  });
  const isVisibleNow = visible.some((f) => f.id === frame.id);

  return (
    <div className="admin-timeline">
      <h3>Timeline binding</h3>
      <div className="admin-timeline-grid">
        <label>
          Trigger
          <select
            value={frame.trigger ?? "reveal"}
            onChange={(e) =>
              updateFrame(frameId, { trigger: e.target.value as FrameTrigger })
            }
          >
            <option value="time">time</option>
            <option value="reveal">reveal</option>
            <option value="synthesize">synthesize</option>
            <option value="manual">manual</option>
          </select>
        </label>
        <label>
          Start (s)
          <input
            type="number"
            step={0.1}
            value={frame.startTime ?? ""}
            onChange={(e) =>
              updateFrame(frameId, {
                startTime: e.target.value === "" ? undefined : Number(e.target.value),
              })
            }
          />
        </label>
        <label>
          End (s)
          <input
            type="number"
            step={0.1}
            value={frame.endTime ?? ""}
            onChange={(e) =>
              updateFrame(frameId, {
                endTime: e.target.value === "" ? undefined : Number(e.target.value),
              })
            }
          />
        </label>
        <label>
          Reveal level
          <input
            type="number"
            min={0}
            max={8}
            value={frame.revealLevel ?? ""}
            onChange={(e) =>
              updateFrame(frameId, {
                revealLevel: e.target.value === "" ? undefined : Number(e.target.value),
              })
            }
          />
        </label>
        <label>
          Chapter
          <select
            value={frame.chapter ?? ""}
            onChange={(e) =>
              updateFrame(frameId, {
                chapter: (e.target.value || undefined) as ChapterId | undefined,
              })
            }
          >
            <option value="">—</option>
            {(
              [
                "prologue",
                "movement-i",
                "movement-ii",
                "movement-iii",
                "movement-iv",
                "coda",
              ] as ChapterId[]
            ).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label>
          Segment
          <select
            value={frame.segment ?? ""}
            onChange={(e) =>
              updateFrame(frameId, {
                segment: (e.target.value || undefined) as SegmentKind | undefined,
              })
            }
          >
            <option value="">—</option>
            <option value="play">play</option>
            <option value="showcase">showcase</option>
            <option value="climax">climax</option>
          </select>
        </label>
        <label>
          Project
          <select
            value={frame.projectId ?? ""}
            onChange={(e) =>
              updateFrame(frameId, {
                projectId: (e.target.value || undefined) as ProjectId | undefined,
              })
            }
          >
            <option value="">—</option>
            <option value="pixel-seed">pixel-seed</option>
            <option value="browser-tools">browser-tools</option>
            <option value="emotion-chatbot">emotion-chatbot</option>
            <option value="multimodal-research">multimodal-research</option>
          </select>
        </label>
      </div>
      <label className="admin-field">
        Preview time: {previewTime.toFixed(1)}s{" "}
        <span className={isVisibleNow ? "hud-judge-perfect" : "muted"}>
          {isVisibleNow ? "VISIBLE" : "hidden"}
        </span>
        <input
          type="range"
          min={0}
          max={140}
          step={0.1}
          value={previewTime}
          onChange={(e) => setPreviewTime(Number(e.target.value))}
        />
      </label>
    </div>
  );
}
