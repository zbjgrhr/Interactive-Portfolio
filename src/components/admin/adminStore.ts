import { create } from "zustand";
import type { ContentDocument, ContentFrame, ContentLayer } from "@/types/content";
import { cloneDocument, newId, defaultTransform } from "@/lib/content/schema";
import {
  DEFAULT_FILTERS,
  DEFAULT_TEXT_STYLE,
  MEMORY_CANVAS,
} from "@/types/content";

const UNDO_LIMIT = 40;

interface AdminState {
  document: ContentDocument | null;
  selectedFrameId: string | null;
  selectedLayerId: string | null;
  dirty: boolean;
  previewTime: number;
  undoStack: ContentDocument[];
  redoStack: ContentDocument[];
  setDocument: (doc: ContentDocument, markClean?: boolean) => void;
  pushHistory: () => void;
  undo: () => void;
  redo: () => void;
  selectFrame: (id: string | null) => void;
  selectLayer: (id: string | null) => void;
  setPreviewTime: (t: number) => void;
  updateFrame: (frameId: string, patch: Partial<ContentFrame>) => void;
  updateLayer: (
    frameId: string,
    layerId: string,
    patch: Partial<ContentLayer>,
  ) => void;
  /** Live update without pushing undo (e.g. drag). */
  patchLayerLive: (
    frameId: string,
    layerId: string,
    patch: Partial<ContentLayer>,
  ) => void;
  addFrame: () => string;
  deleteFrame: (id: string) => void;
  addLayer: (frameId: string, type: ContentLayer["type"]) => void;
  deleteLayer: (frameId: string, layerId: string) => void;
  markClean: () => void;
}

function withHistory(
  set: (fn: (s: AdminState) => Partial<AdminState>) => void,
  get: () => AdminState,
  mutator: (doc: ContentDocument) => ContentDocument,
) {
  const current = get().document;
  if (!current) return;
  const snapshot = cloneDocument(current);
  const next = mutator(cloneDocument(current));
  set((s) => ({
    document: next,
    dirty: true,
    undoStack: [...s.undoStack.slice(-UNDO_LIMIT + 1), snapshot],
    redoStack: [],
  }));
}

export const useAdminStore = create<AdminState>((set, get) => ({
  document: null,
  selectedFrameId: null,
  selectedLayerId: null,
  dirty: false,
  previewTime: 0,
  undoStack: [],
  redoStack: [],
  setDocument: (doc, markClean = true) =>
    set({
      document: doc,
      dirty: markClean ? false : true,
      undoStack: [],
      redoStack: [],
    }),
  pushHistory: () => {
    const doc = get().document;
    if (!doc) return;
    set((s) => ({
      undoStack: [...s.undoStack.slice(-UNDO_LIMIT + 1), cloneDocument(doc)],
      redoStack: [],
    }));
  },
  undo: () => {
    const { undoStack, document, redoStack } = get();
    if (!document || undoStack.length === 0) return;
    const prev = undoStack[undoStack.length - 1];
    set({
      document: prev,
      undoStack: undoStack.slice(0, -1),
      redoStack: [...redoStack, cloneDocument(document)],
      dirty: true,
    });
  },
  redo: () => {
    const { redoStack, document, undoStack } = get();
    if (!document || redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    set({
      document: next,
      redoStack: redoStack.slice(0, -1),
      undoStack: [...undoStack, cloneDocument(document)],
      dirty: true,
    });
  },
  selectFrame: (id) => set({ selectedFrameId: id, selectedLayerId: null }),
  selectLayer: (id) => set({ selectedLayerId: id }),
  setPreviewTime: (previewTime) => set({ previewTime }),
  updateFrame: (frameId, patch) =>
    withHistory(set, get, (doc) => ({
      ...doc,
      frames: doc.frames.map((f) => (f.id === frameId ? { ...f, ...patch } : f)),
    })),
  updateLayer: (frameId, layerId, patch) =>
    withHistory(set, get, (doc) => ({
      ...doc,
      frames: doc.frames.map((f) =>
        f.id !== frameId
          ? f
          : {
              ...f,
              layers: f.layers.map((l) =>
                l.id === layerId ? { ...l, ...patch } : l,
              ),
            },
      ),
    })),
  patchLayerLive: (frameId, layerId, patch) =>
    set((s) => {
      if (!s.document) return {};
      return {
        document: {
          ...s.document,
          frames: s.document.frames.map((f) =>
            f.id !== frameId
              ? f
              : {
                  ...f,
                  layers: f.layers.map((l) =>
                    l.id === layerId ? { ...l, ...patch } : l,
                  ),
                },
          ),
        },
        dirty: true,
      };
    }),
  addFrame: () => {
    const id = newId("frame");
    withHistory(set, get, (doc) => ({
      ...doc,
      frames: [
        ...doc.frames,
        {
          id,
          name: "New Frame",
          trigger: "reveal",
          canvas: { ...MEMORY_CANVAS },
          layers: [],
        },
      ],
    }));
    set({ selectedFrameId: id, selectedLayerId: null });
    return id;
  },
  deleteFrame: (id) =>
    withHistory(set, get, (doc) => ({
      ...doc,
      frames: doc.frames.filter((f) => f.id !== id),
    })),
  addLayer: (frameId, type) => {
    const layer: ContentLayer = {
      id: newId("layer"),
      type,
      name: type,
      transform: defaultTransform(60, 60, type === "text" ? 240 : 180, type === "text" ? 48 : 120, 1),
      visible: true,
      text: type === "text" ? "New text" : undefined,
      textStyle: type === "text" ? { ...DEFAULT_TEXT_STYLE } : undefined,
      src: type === "image" ? "/projects/pixel-seed-placeholder.svg" : undefined,
      objectFit: type === "image" ? "cover" : undefined,
      filters: type === "image" ? { ...DEFAULT_FILTERS } : undefined,
      fill: type === "frame" ? "rgba(26,16,48,0.7)" : undefined,
      stroke: type === "frame" ? "#5eead4" : undefined,
      strokeWidth: type === "frame" ? 1 : undefined,
      radius: type === "frame" ? 4 : undefined,
    };
    withHistory(set, get, (doc) => ({
      ...doc,
      frames: doc.frames.map((f) =>
        f.id === frameId ? { ...f, layers: [...f.layers, layer] } : f,
      ),
    }));
    set({ selectedLayerId: layer.id });
  },
  deleteLayer: (frameId, layerId) =>
    withHistory(set, get, (doc) => ({
      ...doc,
      frames: doc.frames.map((f) =>
        f.id !== frameId
          ? f
          : { ...f, layers: f.layers.filter((l) => l.id !== layerId) },
      ),
    })),
  markClean: () => set({ dirty: false }),
}));
