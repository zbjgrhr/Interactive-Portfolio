/**
 * SongClock — single time source for audio + game events.
 * Never use setInterval as the beat source; always read AudioContext.currentTime.
 */
export class SongClock {
  private ctx: AudioContext | null = null;
  private startedAtCtx = 0;
  private offset = 0;
  private pausedAt: number | null = null;
  private running = false;

  attach(ctx: AudioContext, offset = 0) {
    this.ctx = ctx;
    this.offset = offset;
  }

  setOffset(offset: number) {
    this.offset = offset;
  }

  start(fromTime = 0) {
    if (!this.ctx) throw new Error("SongClock: AudioContext not attached");
    this.startedAtCtx = this.ctx.currentTime - fromTime;
    this.pausedAt = null;
    this.running = true;
  }

  pause() {
    if (!this.running || !this.ctx) return;
    this.pausedAt = this.getTime();
    this.running = false;
  }

  resume() {
    if (this.pausedAt === null || !this.ctx) return;
    this.startedAtCtx = this.ctx.currentTime - this.pausedAt;
    this.pausedAt = null;
    this.running = true;
  }

  /** Recalibrate after tab focus / audio glitch. */
  recalibrate(expectedSongTime: number) {
    if (!this.ctx) return;
    this.startedAtCtx = this.ctx.currentTime - expectedSongTime;
    this.pausedAt = null;
    this.running = true;
  }

  getTime(): number {
    if (!this.ctx) return 0;
    if (!this.running) return this.pausedAt ?? 0;
    return Math.max(0, this.ctx.currentTime - this.startedAtCtx + this.offset);
  }

  isRunning() {
    return this.running;
  }

  getPausedAt() {
    return this.pausedAt;
  }
}
