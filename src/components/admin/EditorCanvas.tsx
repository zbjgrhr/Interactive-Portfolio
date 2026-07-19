"use client";

import { useState } from "react";
import type { ContentLayer } from "@/types/content";
import { useAdminStore } from "@/components/admin/adminStore";

function cssFilters(layer: ContentLayer) {
  const f = layer.filters;
  if (!f) return undefined;
  return `brightness(${f.brightness}) contrast(${f.contrast}) saturate(${f.saturate}) blur(${f.blur}px) grayscale(${f.grayscale})`;
}

type Handle = "nw" | "ne" | "sw" | "se" | "n" | "s" | "e" | "w";

export function EditorCanvas({ frameId }: { frameId: string }) {
  const document = useAdminStore((s) => s.document);
  const selectedLayerId = useAdminStore((s) => s.selectedLayerId);
  const selectLayer = useAdminStore((s) => s.selectLayer);
  const patchLayerLive = useAdminStore((s) => s.patchLayerLive);
  const pushHistory = useAdminStore((s) => s.pushHistory);

  const frame = document?.frames.find((f) => f.id === frameId);
  const [drag, setDrag] = useStateDrag();

  if (!frame) return <p className="muted">Frame not found</p>;

  const scale = Math.min(1, 900 / frame.canvas.width);
  const cw = frame.canvas.width * scale;
  const ch = frame.canvas.height * scale;

  const layers = [...frame.layers].sort(
    (a, b) => a.transform.zIndex - b.transform.zIndex,
  );

  const onPointerDownLayer = (
    e: React.PointerEvent,
    layer: ContentLayer,
    mode: "move" | Handle,
  ) => {
    if (layer.locked) return;
    e.stopPropagation();
    selectLayer(layer.id);
    pushHistory();
    const startX = e.clientX;
    const startY = e.clientY;
    const t = { ...layer.transform };
    setDrag({
      layerId: layer.id,
      mode,
      startX,
      startY,
      origin: t,
    });
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag) return;
    const dx = (e.clientX - drag.startX) / scale;
    const dy = (e.clientY - drag.startY) / scale;
    const o = drag.origin;
    const next = { ...o };

    if (drag.mode === "move") {
      next.x = o.x + dx;
      next.y = o.y + dy;
    } else {
      const m = drag.mode;
      if (m.includes("e")) next.w = Math.max(20, o.w + dx);
      if (m.includes("s")) next.h = Math.max(20, o.h + dy);
      if (m.includes("w")) {
        next.w = Math.max(20, o.w - dx);
        next.x = o.x + dx;
      }
      if (m.includes("n")) {
        next.h = Math.max(20, o.h - dy);
        next.y = o.y + dy;
      }
    }
    patchLayerLive(frameId, drag.layerId, { transform: next });
  };

  const onPointerUp = () => setDrag(null);

  return (
    <div
      className="admin-canvas-wrap"
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onClick={() => selectLayer(null)}
    >
      <div
        className="admin-canvas"
        style={{
          width: cw,
          height: ch,
          backgroundImage:
            "linear-gradient(rgba(94,234,212,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(94,234,212,0.08) 1px, transparent 1px)",
          backgroundSize: `${32 * scale}px ${32 * scale}px`,
        }}
      >
        {layers.map((layer) => {
          if (layer.visible === false) return null;
          const t = layer.transform;
          const selected = layer.id === selectedLayerId;
          const style: React.CSSProperties = {
            left: t.x * scale,
            top: t.y * scale,
            width: t.w * scale,
            height: t.h * scale,
            opacity: t.opacity,
            zIndex: t.zIndex + 1,
            transform: t.rotation ? `rotate(${t.rotation}deg)` : undefined,
            filter: layer.type === "image" ? cssFilters(layer) : undefined,
          };
          return (
            <div
              key={layer.id}
              className={`admin-layer ${selected ? "is-selected" : ""}`}
              style={style}
              onPointerDown={(e) => onPointerDownLayer(e, layer, "move")}
            >
              {layer.type === "frame" && (
                <div
                  className="admin-layer-frame"
                  style={{
                    background: layer.fill,
                    border: `${layer.strokeWidth ?? 1}px solid ${layer.stroke ?? "#5eead4"}`,
                    borderRadius: layer.radius ?? 0,
                  }}
                />
              )}
              {layer.type === "image" && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={layer.src || "/projects/pixel-seed-placeholder.svg"}
                  alt=""
                  draggable={false}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: layer.objectFit || "cover",
                    pointerEvents: "none",
                  }}
                />
              )}
              {layer.type === "text" && (
                <div
                  className="admin-layer-text"
                  style={{
                    color: layer.textStyle?.color,
                    fontSize: (layer.textStyle?.fontSize ?? 16) * scale,
                    fontWeight: layer.textStyle?.fontWeight,
                    textAlign: layer.textStyle?.align,
                    fontFamily: layer.textStyle?.fontFamily,
                    lineHeight: layer.textStyle?.lineHeight,
                    letterSpacing: layer.textStyle?.letterSpacing,
                  }}
                >
                  {layer.text}
                </div>
              )}
              {selected &&
                (["nw", "ne", "sw", "se", "n", "s", "e", "w"] as Handle[]).map(
                  (h) => (
                    <span
                      key={h}
                      className={`admin-handle admin-handle-${h}`}
                      onPointerDown={(e) => onPointerDownLayer(e, layer, h)}
                    />
                  ),
                )}
            </div>
          );
        })}
      </div>
      <p className="muted admin-canvas-meta">
        Canvas {frame.canvas.width}×{frame.canvas.height} · scale {scale.toFixed(2)}
      </p>
    </div>
  );
}

function useStateDrag() {
  return useState<{
    layerId: string;
    mode: "move" | Handle;
    startX: number;
    startY: number;
    origin: ContentLayer["transform"];
  } | null>(null);
}
