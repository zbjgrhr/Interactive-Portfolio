import type { ContentDocument, ContentFrame, ContentLayer } from "@/types/content";

export function isContentDocument(value: unknown): value is ContentDocument {
  if (!value || typeof value !== "object") return false;
  const doc = value as ContentDocument;
  return (
    typeof doc.version === "number" &&
    typeof doc.updatedAt === "string" &&
    Array.isArray(doc.projects) &&
    Array.isArray(doc.frames)
  );
}

export function validateDocument(doc: ContentDocument): string[] {
  const errors: string[] = [];
  if (!doc.version) errors.push("version required");
  if (!Array.isArray(doc.projects) || doc.projects.length === 0) {
    errors.push("projects must be a non-empty array");
  }
  if (!Array.isArray(doc.frames)) errors.push("frames must be an array");

  const ids = new Set<string>();
  for (const frame of doc.frames ?? []) {
    if (!frame.id) errors.push("frame missing id");
    if (ids.has(frame.id)) errors.push(`duplicate frame id: ${frame.id}`);
    ids.add(frame.id);
    if (!frame.canvas?.width || !frame.canvas?.height) {
      errors.push(`frame ${frame.id} missing canvas size`);
    }
    for (const layer of frame.layers ?? []) {
      const layerErr = validateLayer(layer, frame.id);
      errors.push(...layerErr);
    }
  }
  return errors;
}

function validateLayer(layer: ContentLayer, frameId: string): string[] {
  const errors: string[] = [];
  if (!layer.id) errors.push(`frame ${frameId}: layer missing id`);
  if (!["text", "image", "frame"].includes(layer.type)) {
    errors.push(`frame ${frameId}: invalid layer type`);
  }
  if (!layer.transform) errors.push(`frame ${frameId}/${layer.id}: missing transform`);
  if (layer.type === "text" && layer.text === undefined) {
    errors.push(`frame ${frameId}/${layer.id}: text layer needs text`);
  }
  if (layer.type === "image" && !layer.src) {
    // allow empty src as placeholder
  }
  return errors;
}

export function cloneDocument(doc: ContentDocument): ContentDocument {
  return JSON.parse(JSON.stringify(doc)) as ContentDocument;
}

export function newId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export function defaultTransform(
  x = 40,
  y = 40,
  w = 200,
  h = 80,
  zIndex = 1,
): ContentLayer["transform"] {
  return { x, y, w, h, zIndex, opacity: 1, rotation: 0 };
}

export function ensureFrameDefaults(frame: ContentFrame): ContentFrame {
  return {
    ...frame,
    layers: frame.layers ?? [],
    canvas: frame.canvas ?? { width: 1280, height: 396 },
    trigger: frame.trigger ?? "reveal",
  };
}
