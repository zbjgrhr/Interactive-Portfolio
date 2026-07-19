"use client";

import { useUiStore } from "@/store/uiStore";

/** Skip link + live region for screen readers outside the canvas. */
export function A11yChrome() {
  const caption = useUiStore((s) => s.caption);
  const chapter = useUiStore((s) => s.chapter);
  const mode = useUiStore((s) => s.mode);

  return (
    <>
      <a href="/explore" className="skip-link">
        Skip to direct explore
      </a>
      <div className="sr-only" aria-live="polite">
        {mode === "play" ? `Chapter: ${chapter}. ${caption ?? ""}` : ""}
      </div>
    </>
  );
}
