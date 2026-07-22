export const PORTFOLIO_EVENTS = {
  PIXEL_VOID: "pixel-void",
  PIXEL_GENERATE: "pixel-generate",
  PIXEL_WORLD: "pixel-world",
  BROWSER_CITY: "browser-city",
  BROWSER_CLEAR: "browser-clear",
  EMOTION_QUIET: "emotion-quiet",
  RESEARCH_WAVE: "research-wave",
  CODA_MERGE: "coda-merge",
} as const;

export type PortfolioEventId =
  (typeof PORTFOLIO_EVENTS)[keyof typeof PORTFOLIO_EVENTS];
