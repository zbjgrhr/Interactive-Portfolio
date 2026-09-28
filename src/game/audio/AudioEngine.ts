import { SongClock } from "@/game/rhythm/SongClock";
import type { LevelDifficulty } from "@/data/gameLevels";
import type { OnsetPeak } from "@/game/beatmap/reactive";

export class AudioEngine {
  private ctx: AudioContext | null = null;
  private buffer: AudioBuffer | null = null;
  private source: AudioBufferSourceNode | null = null;
  private gain: GainNode | null = null;
  private clock = new SongClock();
  private muted = false;
  private startedFrom = 0;
  private silentStartedAt: number | null = null;
  private silentStartedFrom = 0;
  private loadedUrl: string | null = null;

  getClock() {
    return this.clock;
  }

  getContext() {
    return this.ctx;
  }

  isReady() {
    return !!this.buffer && !!this.ctx;
  }

  async unlock(): Promise<AudioContext> {
    if (!this.ctx) {
      this.ctx = new AudioContext();
      this.gain = this.ctx.createGain();
      this.gain.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      await this.ctx.resume();
    }
    this.clock.attach(this.ctx);
    return this.ctx;
  }

  async load(url: string, onProgress?: (p: number) => void): Promise<void> {
    const ctx = await this.unlock();
    onProgress?.(0.1);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load audio: ${url}`);
    onProgress?.(0.4);
    const arr = await res.arrayBuffer();
    onProgress?.(0.7);
    this.buffer = await ctx.decodeAudioData(arr.slice(0));
    this.loadedUrl = url;
    onProgress?.(1);
  }

  isLoaded(url: string) {
    return this.loadedUrl === url && !!this.buffer;
  }

  /**
   * Lightweight onset analysis over the decoded recording. Piano attacks create
   * clear positive energy changes, so the generated chart follows the actual
   * performance—including rubato—instead of assuming a fixed metronome.
   */
  analyzeOnsets(difficulty: LevelDifficulty): OnsetPeak[] {
    const buffer = this.buffer;
    if (!buffer) return [];

    const hop = 1024;
    const frame = 2048;
    const stride = 4;
    const channels = Math.min(2, buffer.numberOfChannels);
    const channelData = Array.from({ length: channels }, (_, index) =>
      buffer.getChannelData(index),
    );
    const energies: number[] = [];

    for (let start = 0; start + frame < buffer.length; start += hop) {
      let sum = 0;
      let count = 0;
      for (let sample = start; sample < start + frame; sample += stride) {
        let mixed = 0;
        for (const data of channelData) mixed += data[sample] ?? 0;
        mixed /= channels;
        sum += mixed * mixed;
        count += 1;
      }
      energies.push(Math.sqrt(sum / Math.max(1, count)));
    }

    const flux = energies.map((energy, index) => {
      if (index === 0) return 0;
      const from = Math.max(0, index - 6);
      const history = energies.slice(from, index);
      const baseline = history.reduce((sum, value) => sum + value, 0) /
        Math.max(1, history.length);
      return Math.max(0, energy - baseline);
    });
    const positive = flux.filter((value) => value > 0).sort((a, b) => a - b);
    if (!positive.length) return [];

    const median = positive[Math.floor(positive.length / 2)];
    const maximum = positive[positive.length - 1];
    const thresholdFactor: Record<LevelDifficulty, number> = {
      casual: 1.85,
      hard: 1.45,
      expert: 1.2,
      nightmare: 1.02,
    };
    const minGap: Record<LevelDifficulty, number> = {
      casual: 0.38,
      hard: 0.28,
      expert: 0.22,
      nightmare: 0.16,
    };
    const threshold = Math.max(
      median * thresholdFactor[difficulty],
      maximum * 0.028,
    );
    const candidates: OnsetPeak[] = [];

    for (let index = 2; index < flux.length - 2; index += 1) {
      const value = flux[index];
      if (value < threshold) continue;
      if (value < flux[index - 1] || value < flux[index + 1]) continue;
      candidates.push({
        time: (index * hop) / buffer.sampleRate,
        strength: Math.min(1, Math.max(0.1, value / maximum)),
      });
    }

    const peaks: OnsetPeak[] = [];
    for (const candidate of candidates) {
      const last = peaks[peaks.length - 1];
      if (!last || candidate.time - last.time >= minGap[difficulty]) {
        peaks.push(candidate);
      } else if (candidate.strength > last.strength) {
        peaks[peaks.length - 1] = candidate;
      }
    }
    return peaks;
  }

  setOffset(offset: number) {
    this.clock.setOffset(offset);
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    if (this.gain) this.gain.gain.value = muted ? 0 : 1;
  }

  play(fromTime = 0) {
    if (!this.ctx || !this.buffer || !this.gain) {
      throw new Error("AudioEngine not ready");
    }
    this.stopSource();
    this.silentStartedAt = null;
    this.source = this.ctx.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.connect(this.gain);
    this.gain.gain.value = this.muted ? 0 : 1;
    const startAt = Math.max(0, fromTime);
    this.startedFrom = startAt;
    this.source.start(0, startAt);
    this.clock.start(startAt);
  }

  startSilent(fromTime = 0) {
    this.stopSource();
    this.clock.pause();
    this.silentStartedFrom = Math.max(0, fromTime);
    this.startedFrom = this.silentStartedFrom;
    this.silentStartedAt = performance.now();
  }

  pause() {
    const t = this.getCurrentTime();
    this.stopSource();
    this.clock.pause();
    this.silentStartedAt = null;
    this.silentStartedFrom = t;
    this.startedFrom = t;
    return t;
  }

  resume() {
    const t = this.silentStartedFrom || this.clock.getPausedAt() || this.startedFrom;
    if (this.isReady()) {
      this.play(t);
    } else {
      this.startSilent(t);
    }
  }

  stop() {
    this.stopSource();
    this.clock.pause();
    this.silentStartedAt = null;
    this.silentStartedFrom = 0;
    this.startedFrom = 0;
  }

  getCurrentTime() {
    if (this.silentStartedAt !== null) {
      return this.silentStartedFrom + (performance.now() - this.silentStartedAt) / 1000;
    }
    return this.clock.getTime();
  }

  getDuration() {
    return this.buffer?.duration ?? 0;
  }

  private stopSource() {
    if (this.source) {
      try {
        this.source.stop();
      } catch {
        /* already stopped */
      }
      this.source.disconnect();
      this.source = null;
    }
  }
}
