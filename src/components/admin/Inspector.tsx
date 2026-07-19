"use client";

import { useAdminStore } from "@/components/admin/adminStore";
import { UploadButton } from "@/components/admin/UploadButton";
import { DEFAULT_FILTERS, DEFAULT_TEXT_STYLE } from "@/types/content";

export function Inspector({ frameId }: { frameId: string }) {
  const document = useAdminStore((s) => s.document);
  const selectedLayerId = useAdminStore((s) => s.selectedLayerId);
  const updateLayer = useAdminStore((s) => s.updateLayer);

  const frame = document?.frames.find((f) => f.id === frameId);
  const layer = frame?.layers.find((l) => l.id === selectedLayerId);

  if (!layer) {
    return (
      <div className="admin-panel">
        <h3>Inspector</h3>
        <p className="muted">Select a layer to edit properties.</p>
      </div>
    );
  }

  const t = layer.transform;
  const patchT = (key: keyof typeof t, value: number) =>
    updateLayer(frameId, layer.id, { transform: { ...t, [key]: value } });

  return (
    <div className="admin-panel admin-inspector">
      <h3>Inspector · {layer.type}</h3>

      <label className="admin-field">
        Name
        <input
          value={layer.name ?? ""}
          onChange={(e) => updateLayer(frameId, layer.id, { name: e.target.value })}
        />
      </label>

      <fieldset>
        <legend>Transform</legend>
        {(["x", "y", "w", "h", "opacity", "zIndex"] as const).map((key) => (
          <label key={key} className="admin-field">
            {key}
            <input
              type="number"
              step={key === "opacity" ? 0.05 : 1}
              value={t[key] ?? 0}
              onChange={(e) => patchT(key, Number(e.target.value))}
            />
          </label>
        ))}
      </fieldset>

      {layer.type === "text" && (
        <fieldset>
          <legend>Text</legend>
          <label className="admin-field">
            Content
            <textarea
              rows={3}
              value={layer.text ?? ""}
              onChange={(e) => updateLayer(frameId, layer.id, { text: e.target.value })}
            />
          </label>
          <label className="admin-field">
            Color
            <input
              type="color"
              value={layer.textStyle?.color ?? DEFAULT_TEXT_STYLE.color}
              onChange={(e) =>
                updateLayer(frameId, layer.id, {
                  textStyle: {
                    ...(layer.textStyle ?? DEFAULT_TEXT_STYLE),
                    color: e.target.value,
                  },
                })
              }
            />
          </label>
          <label className="admin-field">
            Size
            <input
              type="number"
              value={layer.textStyle?.fontSize ?? 16}
              onChange={(e) =>
                updateLayer(frameId, layer.id, {
                  textStyle: {
                    ...(layer.textStyle ?? DEFAULT_TEXT_STYLE),
                    fontSize: Number(e.target.value),
                  },
                })
              }
            />
          </label>
          <label className="admin-field">
            Align
            <select
              value={layer.textStyle?.align ?? "left"}
              onChange={(e) =>
                updateLayer(frameId, layer.id, {
                  textStyle: {
                    ...(layer.textStyle ?? DEFAULT_TEXT_STYLE),
                    align: e.target.value as "left" | "center" | "right",
                  },
                })
              }
            >
              <option value="left">left</option>
              <option value="center">center</option>
              <option value="right">right</option>
            </select>
          </label>
          <label className="admin-field">
            Weight
            <input
              value={String(layer.textStyle?.fontWeight ?? 600)}
              onChange={(e) =>
                updateLayer(frameId, layer.id, {
                  textStyle: {
                    ...(layer.textStyle ?? DEFAULT_TEXT_STYLE),
                    fontWeight: e.target.value,
                  },
                })
              }
            />
          </label>
        </fieldset>
      )}

      {layer.type === "image" && (
        <fieldset>
          <legend>Image</legend>
          <UploadButton
            label="Upload / Replace"
            onUploaded={(url) => updateLayer(frameId, layer.id, { src: url })}
          />
          <label className="admin-field">
            Src
            <input
              value={layer.src ?? ""}
              onChange={(e) => updateLayer(frameId, layer.id, { src: e.target.value })}
            />
          </label>
          <label className="admin-field">
            Fit
            <select
              value={layer.objectFit ?? "cover"}
              onChange={(e) =>
                updateLayer(frameId, layer.id, {
                  objectFit: e.target.value as "cover" | "contain" | "fill",
                })
              }
            >
              <option value="cover">cover</option>
              <option value="contain">contain</option>
              <option value="fill">fill</option>
            </select>
          </label>
          {(["brightness", "contrast", "saturate", "blur", "grayscale"] as const).map(
            (key) => (
              <label key={key} className="admin-field">
                {key}
                <input
                  type="range"
                  min={key === "blur" ? 0 : 0}
                  max={key === "blur" ? 12 : key === "grayscale" ? 1 : 2}
                  step={0.05}
                  value={(layer.filters ?? DEFAULT_FILTERS)[key]}
                  onChange={(e) =>
                    updateLayer(frameId, layer.id, {
                      filters: {
                        ...(layer.filters ?? DEFAULT_FILTERS),
                        [key]: Number(e.target.value),
                      },
                    })
                  }
                />
              </label>
            ),
          )}
        </fieldset>
      )}

      {layer.type === "frame" && (
        <fieldset>
          <legend>Frame</legend>
          <label className="admin-field">
            Fill
            <input
              value={layer.fill ?? ""}
              onChange={(e) => updateLayer(frameId, layer.id, { fill: e.target.value })}
            />
          </label>
          <label className="admin-field">
            Stroke
            <input
              type="color"
              value={layer.stroke?.startsWith("#") ? layer.stroke : "#5eead4"}
              onChange={(e) => updateLayer(frameId, layer.id, { stroke: e.target.value })}
            />
          </label>
          <label className="admin-field">
            Radius
            <input
              type="number"
              value={layer.radius ?? 0}
              onChange={(e) =>
                updateLayer(frameId, layer.id, { radius: Number(e.target.value) })
              }
            />
          </label>
        </fieldset>
      )}
    </div>
  );
}
