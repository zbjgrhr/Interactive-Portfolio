"use client";

import { useRef, useState } from "react";
import { isContentDocument, validateDocument } from "@/lib/content/schema";

export default function ImportExportPage() {
  const [status, setStatus] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const exportJson = async () => {
    const res = await fetch("/api/content");
    const doc = await res.json();
    const blob = new Blob([JSON.stringify(doc, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resonance-content.json";
    a.click();
    URL.revokeObjectURL(url);
    setStatus("Exported");
  };

  const importJson = async (file: File | null) => {
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as unknown;
      if (!isContentDocument(parsed)) {
        setStatus("Invalid document shape");
        return;
      }
      const errors = validateDocument(parsed);
      if (errors.length) {
        setStatus(errors[0]);
        return;
      }
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });
      if (!res.ok) {
        const err = (await res.json()) as { error?: string };
        setStatus(err.error || "Import failed");
        return;
      }
      setStatus("Imported and saved");
    } catch {
      setStatus("Invalid JSON");
    }
  };

  return (
    <div className="admin-page">
      <h1>Import / Export</h1>
      <p className="muted">
        Backup or restore the full ContentDocument JSON (projects, frames, narratives).
      </p>
      <div className="entry-actions" style={{ justifyContent: "flex-start" }}>
        <button type="button" className="btn-primary" onClick={() => void exportJson()}>
          Export JSON
        </button>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => fileRef.current?.click()}
        >
          Import JSON
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          hidden
          onChange={(e) => void importJson(e.target.files?.[0] ?? null)}
        />
      </div>
      {status && <p className="muted">{status}</p>}
    </div>
  );
}
