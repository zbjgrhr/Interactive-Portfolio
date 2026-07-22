"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useAdminStore } from "@/components/admin/adminStore";
import { useRouter } from "next/navigation";

export default function FramesListPage() {
  const document = useAdminStore((s) => s.document);
  const setDocument = useAdminStore((s) => s.setDocument);
  const addFrame = useAdminStore((s) => s.addFrame);
  const deleteFrame = useAdminStore((s) => s.deleteFrame);
  const router = useRouter();

  useEffect(() => {
    if (document) return;
    void fetch("/api/content")
      .then((r) => r.json())
      .then((doc) => setDocument(doc));
  }, [document, setDocument]);

  if (!document) return <p className="muted">Loading frames…</p>;

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <h1>Frames</h1>
        <button
          type="button"
          className="btn-primary"
          onClick={() => {
            const id = addFrame();
            router.push(`/admin/frames/${id}`);
          }}
        >
          New frame
        </button>
      </div>
      <ul className="admin-frame-list">
        {document.frames.map((f) => (
          <li key={f.id}>
            <Link href={`/admin/frames/${f.id}`}>
              <strong>{f.name}</strong>
              <span className="muted">
                {f.chapter ?? "—"} · {f.trigger} · L{f.revealLevel ?? "—"} ·{" "}
                {f.startTime ?? "?"}s–{f.endTime ?? "?"}s
              </span>
            </Link>
            <button
              type="button"
              className="btn-ghost"
              onClick={() => {
                if (confirm(`Delete ${f.name}?`)) deleteFrame(f.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
