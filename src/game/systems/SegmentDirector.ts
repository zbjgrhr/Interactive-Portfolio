import type { SegmentKind } from "@/types";

export interface SegmentState {
  kind: SegmentKind;
  noteDensityScale: number;
  autoAdvance: boolean;
  showcaseMode: boolean;
}

export class SegmentDirector {
  private kind: SegmentKind = "play";

  set(kind: SegmentKind) {
    this.kind = kind;
  }

  get(): SegmentState {
    switch (this.kind) {
      case "showcase":
        return {
          kind: "showcase",
          noteDensityScale: 0.25,
          autoAdvance: true,
          showcaseMode: true,
        };
      case "climax":
        return {
          kind: "climax",
          noteDensityScale: 1.2,
          autoAdvance: false,
          showcaseMode: false,
        };
      default:
        return {
          kind: "play",
          noteDensityScale: 1,
          autoAdvance: false,
          showcaseMode: false,
        };
    }
  }

  getKind() {
    return this.kind;
  }
}
