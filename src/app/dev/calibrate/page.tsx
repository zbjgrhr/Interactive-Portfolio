"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { NoteAction } from "@/types";

/**
 * Dev calibration: play audio, pick lane + action, tap to record notes, export JSON.
 */
export default function CalibratePage() {
  const [times, setTimes] = useState<
    { time: number; lane: number; action: NoteAction }[]
  >([]);
  const [offset, setOffset] = useState(0.05);
  const [lane, setLane] = useState(2);
  const [action, setAction] = useState<NoteAction>("step");
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const bufferRef = useRef<AudioBuffer | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const startCtxRef = useRef(0);
  const pausedAtRef = useRef(0);
  const rafRef = useRef<number>(0);

  const load = useCallback(async () => {
    const ctx = new AudioContext();
    ctxRef.current = ctx;
    const res = await fetch("/audio/portfolio-theme.mp3");
    const arr = await res.arrayBuffer();
    bufferRef.current = await ctx.decodeAudioData(arr);
  }, []);

  useEffect(() => {
    void load();
    return () => {
      cancelAnimationFrame(rafRef.current);
      sourceRef.current?.stop();
      void ctxRef.current?.close();
    };
  }, [load]);

  const tick = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx || !playing) return;
    setCurrent(ctx.currentTime - startCtxRef.current + offset);
    rafRef.current = requestAnimationFrame(tick);
  }, [offset, playing]);

  useEffect(() => {
    if (playing) rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing, tick]);

  const play = async (from = 0) => {
    const ctx = ctxRef.current;
    const buffer = bufferRef.current;
    if (!ctx || !buffer) return;
    if (ctx.state === "suspended") await ctx.resume();
    sourceRef.current?.stop();
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start(0, from);
    sourceRef.current = source;
    startCtxRef.current = ctx.currentTime - from;
    pausedAtRef.current = from;
    setPlaying(true);
  };

  const pause = () => {
    const t = current;
    sourceRef.current?.stop();
    sourceRef.current = null;
    pausedAtRef.current = t;
    setPlaying(false);
  };

  const tap = () => {
    setTimes((prev) => [
      ...prev,
      { time: +current.toFixed(3), lane, action },
    ]);
  };

  const exportJson = () => {
    const events = times.map((t, i) => ({
      id: `tap-${i}`,
      time: t.time,
      duration: t.action === "hold" ? 0.8 : 0.35,
      lane: t.lane,
      action: t.action,
      eventType: "note",
      intensity: t.action === "chord" ? 0.9 : 0.55,
    }));
    const payload = {
      metadata: {
        title: "Calibrated",
        artist: "dev",
        bpm: 132,
        offset,
        duration: bufferRef.current?.duration ?? 140,
        audio: "/audio/portfolio-theme.mp3",
      },
      events,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "calibrated-beatmap.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="explore-page">
      <Link href="/" className="btn-ghost">
        ← Back
      </Link>
      <h1>Beatmap Calibrate</h1>
      <p className="muted">
        Select lane (0–4) and action, play, tap beats, export into{" "}
        <code>public/beatmaps/</code>.
      </p>
      <p>
        Time: <strong>{current.toFixed(3)}s</strong>
      </p>
      <label>
        Offset{" "}
        <input
          type="number"
          step="0.01"
          value={offset}
          onChange={(e) => setOffset(Number(e.target.value))}
        />
      </label>
      <label>
        Lane{" "}
        <input
          type="number"
          min={0}
          max={4}
          value={lane}
          onChange={(e) => setLane(Number(e.target.value))}
        />
      </label>
      <label>
        Action{" "}
        <select
          value={action}
          onChange={(e) => setAction(e.target.value as NoteAction)}
        >
          <option value="step">step</option>
          <option value="leap">leap</option>
          <option value="hold">hold</option>
          <option value="chord">chord</option>
        </select>
      </label>
      <div className="entry-actions" style={{ justifyContent: "flex-start" }}>
        <button
          type="button"
          className="btn-primary"
          onClick={() => play(pausedAtRef.current)}
        >
          Play
        </button>
        <button type="button" className="btn-secondary" onClick={pause}>
          Pause
        </button>
        <button type="button" className="btn-secondary" onClick={tap}>
          Tap note
        </button>
        <button type="button" className="btn-ghost" onClick={() => setTimes([])}>
          Clear
        </button>
        <button type="button" className="btn-primary" onClick={exportJson}>
          Export JSON
        </button>
      </div>
      <ul className="plain-list">
        {times.map((t) => (
          <li key={`${t.time}-${t.lane}-${t.action}`}>
            {t.time.toFixed(3)} · L{t.lane} · {t.action}
          </li>
        ))}
      </ul>
    </main>
  );
}
