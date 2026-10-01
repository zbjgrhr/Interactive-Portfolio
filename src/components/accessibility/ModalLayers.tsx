"use client";

import { useUiStore } from "@/store/uiStore";
import { GAME_LEVELS } from "@/data/gameLevels";

const KEYS = ["D", "F", "SPACE", "J", "K"];

const TRACKS = GAME_LEVELS.map(({ track, artist }) => ({ title: track, creator: artist }));

export function ModalLayers() {
  const showHowToPlay = useUiStore((state) => state.showHowToPlay);
  const showCredits = useUiStore((state) => state.showCredits);
  const locale = useUiStore((state) => state.locale);
  const setShowHowToPlay = useUiStore((state) => state.setShowHowToPlay);
  const setShowCredits = useUiStore((state) => state.setShowCredits);

  if (!showHowToPlay && !showCredits) return null;

  const close = () => {
    setShowHowToPlay(false);
    setShowCredits(false);
  };

  return (
    <div className="game-modal-backdrop" role="presentation" onMouseDown={close}>
      {showHowToPlay && (
        <section
          className="game-modal game-howto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="howto-title"
          onMouseDown={(event) => event.stopPropagation()}
        >
          <ModalClose onClick={close} label={locale === "en" ? "Close Instructions" : "关闭玩法说明"} />
          <p className="game-modal-kicker">HOW TO PLAY / 如何游玩</p>
          <h2 id="howto-title">
            {locale === "en" ? "Hear the beat, then let your fingers fall." : "先听见节拍，再让手指落下。"}
          </h2>
          <p className="game-modal-lead">
            {locale === "en"
              ? "Use either the keyboard or mouse. The five lanes are five piano keys—there is no separate character movement."
              : "键盘和鼠标都可以。五条轨道就是五枚琴键，不需要另外控制角色移动。"}
          </p>
          <div className="howto-keys" aria-label={locale === "en" ? "Rhythm keys—use the keyboard or click with the mouse" : "节奏按键，可用键盘或鼠标点击"}>
            {KEYS.map((key) => <kbd key={key} data-wide={key === "SPACE"}>{key}</kbd>)}
          </div>
          <div className="howto-steps">
            <HowToStep
              number="01"
              title={locale === "en" ? "Watch the Lane" : "看准轨道"}
              body={locale === "en" ? "When a note reaches the judgment line, press its matching key or click the piano key in the same lane." : "音符抵达判定线时，按下对应按键，或直接点击同一轨道的琴键。"}
            />
            <HowToStep
              number="02"
              title={locale === "en" ? "Hold Long Notes" : "长音要按住"}
              body={locale === "en" ? "When you see a glowing tail, hold the key until the tail passes through." : "看见发光的长尾时，持续按住琴键，直到尾部通过。"}
            />
            <HowToStep
              number="03"
              title={locale === "en" ? "Let the Work Unfold" : "让作品展开"}
              body={locale === "en" ? "Combos gradually reveal the project scroll. A miss only fades the image; it never interrupts the music." : "连击会逐步展开项目长卷；失误只会让画面变淡，不会打断音乐。"}
            />
          </div>
          <div className="howto-shortcuts">
            <span><kbd>E</kbd>{locale === "en" ? "Open the Project Archive" : "打开项目档案"}</span>
            <span><kbd>ESC</kbd>{locale === "en" ? "Pause" : "暂停"}</span>
          </div>
          <button type="button" className="game-modal-action" onClick={close}>
            {locale === "en" ? "Start by Choosing a Level" : "开始选择关卡"}
          </button>
        </section>
      )}

      {showCredits && (
        <section
          className="game-modal game-credits"
          role="dialog"
          aria-modal="true"
          aria-labelledby="credits-title"
          onMouseDown={(event) => event.stopPropagation()}
        >
          <ModalClose onClick={close} label={locale === "en" ? "Close Credits" : "关闭制作名单"} />
          <p className="game-modal-kicker">MUSIC & MAKING / 音乐与制作</p>
          <h2 id="credits-title">{locale === "en" ? "Five pieces. Five watercolor memories." : "五首乐曲，五段水彩记忆。"}</h2>
          <p className="game-modal-lead">
            {locale === "en" ? "Resonance Archive is an interactive portfolio created by Huaxin Zhang." : "《共鸣档案》是张铧心创作的互动作品集。"}
          </p>
          <ol className="credit-tracklist">
            {TRACKS.map((track, index) => (
              <li key={track.title}>
                <span>0{index + 1}</span>
                <div>
                  <strong>{track.title}</strong>
                  <small>{locale === "en" ? "Creator / Performer" : "制作者 / 演奏者"} · {track.creator}</small>
                </div>
              </li>
            ))}
          </ol>
          <p className="credit-license">
            {locale === "en"
              ? "All five recordings are sourced from public-domain or CC0 collections. Source details are documented with the project."
              : "五首录音均来自公共领域或 CC0 曲库，详细出处已随项目记录。"}
          </p>
          <p className="credit-tech">Next.js · Phaser 3 · Web Audio</p>
          <button type="button" className="game-modal-action" onClick={close}>
            {locale === "en" ? "Back to Level" : "返回关卡"}
          </button>
        </section>
      )}
    </div>
  );
}

function HowToStep({ number, title, body }: { number: string; title: string; body: string }) {
  return (
    <article>
      <span>{number}</span>
      <div><strong>{title}</strong><p>{body}</p></div>
    </article>
  );
}

function ModalClose({ onClick, label }: { onClick: () => void; label: string }) {
  return <button type="button" className="game-modal-close" aria-label={label} onClick={onClick}>×</button>;
}
