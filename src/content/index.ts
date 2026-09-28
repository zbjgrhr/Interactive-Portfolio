import { en, type ContentShape } from "./en";
import { zh } from "./zh";
import type { Locale } from "@/types";

export function getContent(locale: Locale): ContentShape {
  return locale === "zh" ? (zh as ContentShape) : en;
}

export type NarrativeId = string;
