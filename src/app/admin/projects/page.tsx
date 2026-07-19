"use client";

import { useEffect, useState } from "react";
import type { ContentDocument, ProjectContent } from "@/types/content";
import { UploadButton } from "@/components/admin/UploadButton";

export default function AdminProjectsPage() {
  const [doc, setDoc] = useState<ContentDocument | null>(null);
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    void fetch("/api/content")
      .then((r) => r.json())
      .then((d: ContentDocument) => setDoc(d));
  }, []);

  const patchProject = (id: string, patch: Partial<ProjectContent>) => {
    if (!doc) return;
    setDoc({
      ...doc,
      projects: doc.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    });
    setDirty(true);
  };

  const save = async () => {
    if (!doc) return;
    const res = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doc),
    });
    if (!res.ok) {
      setStatus("Save failed");
      return;
    }
    setDoc(await res.json());
    setDirty(false);
    setStatus("Saved");
  };

  if (!doc) return <p className="muted">Loading projects…</p>;

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <h1>Projects</h1>
        <button type="button" className="btn-primary" onClick={() => void save()}>
          {dirty ? "Save *" : "Saved"}
        </button>
      </div>
      {status && <p className="muted">{status}</p>}
      <div className="admin-projects">
        {doc.projects.map((p) => (
          <article key={p.id} className="admin-project-card">
            <h2>{p.id}</h2>
            <label className="admin-field">
              Title
              <input
                value={p.title}
                onChange={(e) => patchProject(p.id, { title: e.target.value })}
              />
            </label>
            <label className="admin-field">
              One-liner
              <input
                value={p.oneLiner}
                onChange={(e) => patchProject(p.id, { oneLiner: e.target.value })}
              />
            </label>
            <label className="admin-field">
              Context
              <textarea
                rows={3}
                value={p.context}
                onChange={(e) => patchProject(p.id, { context: e.target.value })}
              />
            </label>
            <label className="admin-field">
              Outcome
              <textarea
                rows={2}
                value={p.outcome}
                onChange={(e) => patchProject(p.id, { outcome: e.target.value })}
              />
            </label>
            <UploadButton
              label="Upload cover"
              onUploaded={(url) =>
                patchProject(p.id, {
                  coverSrc: url,
                  gallery: [url, ...p.gallery.filter((g) => g !== url)],
                })
              }
            />
            <div className="admin-gallery">
              {p.gallery.map((src) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={src} src={src} alt="" width={120} height={72} />
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
