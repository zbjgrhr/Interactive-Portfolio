"use client";

import { useEffect, useState } from "react";
import type { ContentDocument } from "@/types/content";

export function useContentDocument() {
  const [doc, setDoc] = useState<ContentDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/content");
        if (!res.ok) throw new Error("Failed to load content");
        const data = (await res.json()) as ContentDocument;
        if (!cancelled) setDoc(data);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { doc, loading, error, setDoc };
}
