"use client";

import { useEffect, use } from "react";
import Link from "next/link";
import { EditorCanvas } from "@/components/admin/EditorCanvas";
import { LayerTree } from "@/components/admin/LayerTree";
import { Inspector } from "@/components/admin/Inspector";
import { TimelineBinder } from "@/components/admin/TimelineBinder";
import { useAdminStore } from "@/components/admin/adminStore";

export default function FrameEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const document = useAdminStore((s) => s.document);
  const dirty = useAdminStore((s) => s.dirty);
  const setDocument = useAdminStore((s) => s.setDocument);
  const selectFrame = useAdminStore((s) => s.selectFrame);
  const updateFrame = useAdminStore((s) => s.updateFrame);
  const undo = useAdminStore((s) => s.undo);
  const redo = useAdminStore((s) => s.redo);
  const markClean = useAdminStore((s) => s.markClean);

  useEffect(() => {
    selectFrame(id);
    if (document) return;
    void fetch("/api/content")
      .then((r) => r.json())
      .then((doc) => setDocument(doc));
  }, [id, document, setDocument, selectFrame]);

  const frame = document?.frames.find((f) => f.id === id);

  const save = async () => {
    if (!document) return;
    const res = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(document),
    });
    if (!res.ok) {
      const err = (await res.json()) as { error?: string };
      alert(err.error || "Save failed");
      return;
    }
    const saved = await res.json();
    setDocument(saved, true);
    markClean();
  };

  if (!document) return <p className="muted">Loading…</p>;
  if (!frame) {
    return (
      <div className="admin-page">
        <p>Frame not found. Save after creating, or go back.</p>
        <Link href="/admin/frames">← Frames</Link>
      </div>
    );
  }

  return (
    <div className="admin-editor">
      <div className="admin-editor-toolbar">
        <Link href="/admin/frames" className="btn-ghost">
          ← Frames
        </Link>
        <input
          className="admin-frame-title"
          value={frame.name}
          onChange={(e) => updateFrame(id, { name: e.target.value })}
        />
        <button type="button" className="btn-ghost" onClick={undo}>
          Undo
        </button>
        <button type="button" className="btn-ghost" onClick={redo}>
          Redo
        </button>
        <button type="button" className="btn-primary" onClick={() => void save()}>
          {dirty ? "Save *" : "Saved"}
        </button>
      </div>
      <div className="admin-editor-grid">
        <LayerTree frameId={id} />
        <div className="admin-editor-center">
          <EditorCanvas frameId={id} />
          <TimelineBinder frameId={id} />
        </div>
        <Inspector frameId={id} />
      </div>
    </div>
  );
}
