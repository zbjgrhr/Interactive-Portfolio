"use client";

import { useEffect } from "react";
import { useUiStore } from "@/store/uiStore";

export function LocaleBootstrap() {
  const setLocale = useUiStore((state) => state.setLocale);

  useEffect(() => {
    const saved = window.localStorage.getItem("resonance-locale");
    const locale = saved === "zh" || saved === "en"
      ? saved
      : navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
    setLocale(locale);
  }, [setLocale]);

  return null;
}
