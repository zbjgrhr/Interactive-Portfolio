"use client";

import Link from "next/link";
import {
  DIFFICULTY_LABELS,
  DIFFICULTY_STARS,
  GAME_LEVELS,
  getGameLevel,
  localize,
} from "@/data/gameLevels";
import { getContent } from "@/content";
import { useUiStore } from "@/store/uiStore";

export function EntryGate() {
  const locale = useUiStore((state) => state.locale);
  const mode = useUiStore((state) => state.mode);
  const selectedLevelId = useUiStore((state) => state.selectedLevelId);
  const soundEnabled = useUiStore((state) => state.soundEnabled);
  const reducedMotion = useUiStore((state) => state.reducedMotion);
  const setMode = useUiStore((state) => state.setMode);
  const setSelectedLevel = useUiStore((state) => state.setSelectedLevel);
  const setSoundEnabled = useUiStore((state) => state.setSoundEnabled);
  const setReducedMotion = useUiStore((state) => state.setReducedMotion);
  const setShowHowToPlay = useUiStore((state) => state.setShowHowToPlay);
  const setShowCredits = useUiStore((state) => state.setShowCredits);
  const setLocale = useUiStore((state) => state.setLocale);
  const resetProgress = useUiStore((state) => state.resetProgress);
  const content = getContent(locale);
  const selected = getGameLevel(selectedLevelId);

  if (mode !== "entry") return null;

  const startLevel = () => {
    resetProgress();
    setMode("play");
  };

  return (
    <main className="level-gate" id="main-content">
      <div className="level-gate-grid" aria-hidden />
      <header className="level-gate-header">
        <Link href="/play" className="game-wordmark">
          <span className="game-wordmark-mark">RA</span>
          <span>
            <strong>RESONANCE ARCHIVE</strong>
            <small>{locale === "en" ? "A RHYTHM PORTFOLIO" : "一款节奏作品集"}</small>
          </span>
        </Link>
        <div className="level-gate-actions">
          <button
            type="button"
            className="game-utility"
            onClick={() => setLocale(locale === "en" ? "zh" : "en")}
          >
            {locale === "en" ? "中文" : "EN"}
          </button>
          <Link href="/explore" className="game-portfolio-cta">
            <span aria-hidden>↗</span>
            <span>
              <small>{locale === "en" ? "FULL PROJECT ARCHIVE" : "完整项目档案"}</small>
              <strong>{locale === "en" ? "READ THE PORTFOLIO" : "阅读完整作品集"}</strong>
            </span>
          </Link>
        </div>
      </header>

      <section className="level-intro">
        <div>
          <p className="game-kicker">SELECT YOUR MOVEMENT / 选择乐章</p>
          <h1>
            {locale === "en" ? (
              <>Five projects. Five arrangements.<br /><em>One evolving journey.</em></>
            ) : (
              <>五个项目，五种编曲。<br /><em>一段不断进化的旅程。</em></>
            )}
          </h1>
        </div>
        <div className="control-primer" aria-label="Keyboard controls">
          <span>{locale === "en" ? "DIRECT HIT CONTROLS" : "五轨直接击键"}</span>
          <div>
            {(["D", "F", "SPACE", "J", "K"] as const).map((key) => (
              <kbd key={key} className={key === "SPACE" ? "key-space" : ""}>{key}</kbd>
            ))}
          </div>
          <small>{locale === "en" ? "One key per lane. No movement required." : "一键对应一轨，无需先移动角色。"}</small>
        </div>
      </section>

      <section className="level-select-layout" aria-label={locale === "en" ? "Level selection" : "关卡选择"}>
        <div className="level-list" role="listbox" aria-label={locale === "en" ? "All levels are unlocked" : "全部关卡均已开放"}>
          {GAME_LEVELS.map((level) => {
            const active = level.id === selected.id;
            const difficulty = localize(DIFFICULTY_LABELS[level.difficulty], locale);
            return (
              <button
                key={level.id}
                type="button"
                role="option"
                aria-selected={active}
                className={`level-option level-option-${level.difficulty}`}
                data-active={active}
                style={{ "--level-accent": level.accent } as React.CSSProperties}
                onClick={() => setSelectedLevel(level.id)}
                onDoubleClick={() => {
                  setSelectedLevel(level.id);
                  resetProgress();
                  setMode("play");
                }}
              >
                <span className="level-number">0{level.order}</span>
                <span className="level-option-copy">
                  <small>{difficulty} · {level.bpm} BPM</small>
                  <strong>{localize(level.title, locale)}</strong>
                  <span>{level.track}</span>
                </span>
                <span className="level-stars" aria-label={`${DIFFICULTY_STARS[level.difficulty]} / 5`}>
                  {Array.from({ length: 5 }, (_, index) => (
                    <i key={index} data-filled={index < DIFFICULTY_STARS[level.difficulty]} />
                  ))}
                </span>
              </button>
            );
          })}
        </div>

        <article
          className={`level-preview level-preview-${selected.difficulty}`}
          style={{ "--level-accent": selected.accent } as React.CSSProperties}
        >
          <div className="level-preview-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={selected.cover} alt="" width={1555} height={818} />
            <div className="level-preview-scan" aria-hidden />
            <span className="level-preview-difficulty">
              {localize(DIFFICULTY_LABELS[selected.difficulty], locale)}
            </span>
            <span className="level-preview-order">STAGE 0{selected.order}</span>
          </div>
          <div className="level-preview-copy">
            <p>{localize(selected.mechanic, locale)}</p>
            <h2>{localize(selected.title, locale)}</h2>
            <p className="level-preview-description">{localize(selected.description, locale)}</p>
            <dl>
              <div><dt>{locale === "en" ? "TRACK" : "音乐"}</dt><dd>{selected.track}</dd></div>
              <div><dt>{locale === "en" ? "CREATOR" : "制作者"}</dt><dd>{selected.artist}</dd></div>
              <div><dt>{locale === "en" ? "LENGTH" : "时长"}</dt><dd>{formatDuration(selected.duration)}</dd></div>
              <div><dt>{locale === "en" ? "ACCESS" : "开放状态"}</dt><dd>{locale === "en" ? "UNLOCKED" : "已开放"}</dd></div>
            </dl>
            <button type="button" className="level-start" onClick={startLevel}>
              <span>
                <small>{locale === "en" ? "BEGIN STAGE" : "开始关卡"}</small>
                <strong>{localize(selected.shortTitle, locale)}</strong>
              </span>
              <i aria-hidden>▶</i>
            </button>
            <p className="level-start-hint">
              {locale === "en" ? "Headphones recommended · Every level is available now" : "建议佩戴耳机 · 所有关卡均可直接选择"}
            </p>
          </div>
        </article>
      </section>

      <footer className="level-gate-footer">
        <div>
          <button type="button" className="game-utility" onClick={() => setSoundEnabled(!soundEnabled)}>
            {soundEnabled ? content.entry.soundOn : content.entry.soundOff}
          </button>
          <button
            type="button"
            className="game-utility"
            aria-pressed={reducedMotion}
            onClick={() => setReducedMotion(!reducedMotion)}
          >
            {content.entry.reducedMotion}
          </button>
          <button type="button" className="game-utility" onClick={() => setShowHowToPlay(true)}>
            {content.entry.howToPlay}
          </button>
          <button type="button" className="game-utility" onClick={() => setShowCredits(true)}>
            {content.entry.credits}
          </button>
        </div>
        <p>{locale === "en" ? "ALL LEVELS OPEN · CHOOSE YOUR OWN ROUTE" : "全部关卡开放 · 选择你自己的路线"}</p>
      </footer>
    </main>
  );
}

function formatDuration(duration: number) {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.round(duration % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}
