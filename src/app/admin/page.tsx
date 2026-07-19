"use client";

import Link from "next/link";
import { useContentDocument } from "@/hooks/useContentDocument";

export default function AdminHomePage() {
  const { doc, loading, error } = useContentDocument();

  if (loading) return <p className="muted">Loading content…</p>;
  if (error || !doc) return <p className="admin-error">{error ?? "No document"}</p>;

  return (
    <div className="admin-page">
      <h1>Overview</h1>
      <p className="muted">Updated {new Date(doc.updatedAt).toLocaleString()}</p>
      <div className="admin-stats">
        <div>
          <strong>{doc.frames.length}</strong>
          <span>Frames</span>
        </div>
        <div>
          <strong>{doc.projects.length}</strong>
          <span>Projects</span>
        </div>
        <div>
          <strong>{Object.keys(doc.narratives ?? {}).length}</strong>
          <span>Narratives</span>
        </div>
      </div>
      <div className="entry-actions" style={{ justifyContent: "flex-start" }}>
        <Link href="/admin/frames" className="btn-primary">
          Edit frames
        </Link>
        <Link href="/admin/projects" className="btn-secondary">
          Edit projects
        </Link>
      </div>
    </div>
  );
}
