"use client";

import { useAdminStore } from "@/components/admin/adminStore";

export function LayerTree({ frameId }: { frameId: string }) {
  const document = useAdminStore((s) => s.document);
  const selectedLayerId = useAdminStore((s) => s.selectedLayerId);
  const selectLayer = useAdminStore((s) => s.selectLayer);
  const addLayer = useAdminStore((s) => s.addLayer);
  const deleteLayer = useAdminStore((s) => s.deleteLayer);
  const updateLayer = useAdminStore((s) => s.updateLayer);

  const frame = document?.frames.find((f) => f.id === frameId);
  if (!frame) return null;

  const layers = [...frame.layers].sort(
    (a, b) => b.transform.zIndex - a.transform.zIndex,
  );

  return (
    <div className="admin-panel">
      <div className="admin-panel-head">
        <h3>Layers</h3>
        <div className="admin-row">
          <button type="button" className="btn-ghost" onClick={() => addLayer(frameId, "text")}>
            + Text
          </button>
          <button type="button" className="btn-ghost" onClick={() => addLayer(frameId, "image")}>
            + Image
          </button>
          <button type="button" className="btn-ghost" onClick={() => addLayer(frameId, "frame")}>
            + Frame
          </button>
        </div>
      </div>
      <ul className="admin-layer-list">
        {layers.map((layer) => (
          <li
            key={layer.id}
            className={layer.id === selectedLayerId ? "is-active" : ""}
          >
            <button
              type="button"
              className="admin-layer-item"
              onClick={() => selectLayer(layer.id)}
            >
              <span>{layer.type}</span>
              <span className="muted">{layer.name || layer.id.slice(-5)}</span>
            </button>
            <button
              type="button"
              className="btn-ghost"
              title="Toggle visibility"
              onClick={() =>
                updateLayer(frameId, layer.id, { visible: layer.visible === false })
              }
            >
              {layer.visible === false ? "○" : "●"}
            </button>
            <button
              type="button"
              className="btn-ghost"
              onClick={() => deleteLayer(frameId, layer.id)}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
