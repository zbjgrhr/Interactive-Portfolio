import type { ChapterId, Locale, ProjectId } from "@/types";

export type LevelDifficulty = "casual" | "hard" | "expert" | "nightmare";

export interface LocalizedText {
  en: string;
  zh: string;
}

export interface LevelScrollPanel {
  eyebrow: LocalizedText;
  title: LocalizedText;
  body: LocalizedText;
  image: string;
}

export interface GameLevel {
  id: ProjectId;
  order: number;
  chapter: ChapterId;
  difficulty: LevelDifficulty;
  title: LocalizedText;
  shortTitle: LocalizedText;
  description: LocalizedText;
  track: string;
  artist: string;
  audio: string;
  bpm: number;
  duration: number;
  environment: string;
  accent: string;
  accentNumber: number;
  cover: string;
  mechanic: LocalizedText;
  narrative: LocalizedText[];
  panels: LevelScrollPanel[];
  ending: LocalizedText;
}

const t = (en: string, zh: string): LocalizedText => ({ en, zh });

export const GAME_LEVELS: GameLevel[] = [
  {
    id: "browser-tools",
    order: 1,
    chapter: "movement-i",
    difficulty: "casual",
    title: t("Web Study Assistant", "网页学习助手"),
    shortTitle: t("Study Flow", "学习流"),
    description: t(
      "Clear the noise and turn scattered browser actions into one continuous learning flow.",
      "清除信息噪音，把分散的浏览器操作串成一条连续学习流。",
    ),
    track: "office music - Csikos Post",
    artist: "Office Music",
    audio: "/audio/candidates/office-music.mp3",
    bpm: 112,
    duration: 113.371,
    environment: "browser-city",
    accent: "#67e8f9",
    accentNumber: 0x67e8f9,
    cover: "/portfolio/web-study-workspace.webp",
    mechanic: t("Wide timing · guided phrases", "宽松判定 · 引导乐句"),
    narrative: [
      t("Learning starts by clearing a path through the noise.", "学习，始于从噪音中清出一条路。"),
      t("Translation, notes, maps and focus become one continuous gesture.", "翻译、笔记、导图与专注，被连接成一个连续动作。"),
      t("A useful tool should disappear into the learner's flow.", "真正有用的工具，应该融入学习者的流程。"),
      t("The browser becomes a workspace instead of a distraction.", "浏览器不再只是干扰源，而成为真正的工作空间。"),
    ],
    panels: [
      {
        eyebrow: t("01 / CONTEXT → FRICTION", "01 / 场景 → 阻力"),
        title: t("Scattered tools break concentration", "分散工具打断专注"),
        body: t(
          "Learners repeatedly switched between translation, notes, mind maps and timers.",
          "学习者需要在翻译、笔记、思维导图和计时器之间反复切换。",
        ),
        image: "/portfolio/web-study-workspace.webp",
      },
      {
        eyebrow: t("02 / WORKSPACE → FLOW", "02 / 工作区 → 流程"),
        title: t("One surface, one learning loop", "一个界面，一条学习闭环"),
        body: t(
          "A browser-native workspace keeps reading, understanding and organizing in context.",
          "浏览器原生工作区让阅读、理解与整理始终发生在上下文中。",
        ),
        image: "/portfolio/web-study-map.webp",
      },
      {
        eyebrow: t("03 / EVIDENCE → PRIORITY", "03 / 证据 → 优先级"),
        title: t("Designed from real learner signals", "从真实学习信号出发"),
        body: t(
          "320 learner responses informed 26 prioritized product requirements.",
          "320 份学习者反馈沉淀为 26 项经过排序的产品需求。",
        ),
        image: "/portfolio/web-study-workspace.webp",
      },
      {
        eyebrow: t("04 / OUTCOME → RETENTION", "04 / 结果 → 留存"),
        title: t("Less switching, more continuity", "更少切换，更强连续性"),
        body: t(
          "Evaluation showed a 22% lift in feature use and 30% higher first-day retention.",
          "评估中功能使用率提升 22%，首日留存提升 30%。",
        ),
        image: "/portfolio/web-study-map.webp",
      },
    ],
    ending: t("A calmer interface leaves more attention for learning.", "更安静的界面，把注意力还给学习。"),
  },
  {
    id: "auto-reply",
    order: 2,
    chapter: "movement-ii",
    difficulty: "casual",
    title: t("Social Media Auto Reply", "社交媒体自动回复"),
    shortTitle: t("Reply Flow", "回复流"),
    description: t(
      "Build a controlled response rhythm where automation stays visible and editable.",
      "建立可控的回复节奏，让自动化始终可见、可调、可接管。",
    ),
    track: "V.A. - Csikos post - 네케",
    artist: "V.A.",
    audio: "/audio/candidates/va-draw-from-classic.mp3",
    bpm: 122,
    duration: 159.033,
    environment: "reply-pulse",
    accent: "#a7f3d0",
    accentNumber: 0xa7f3d0,
    cover: "/portfolio/auto-reply-control.webp",
    mechanic: t("Alternating lanes · response chains", "交替音轨 · 回复连锁"),
    narrative: [
      t("Repetition is useful only when control remains human.", "重复可以被自动化，但控制权必须留在人手中。"),
      t("Rules make the system legible before they make it fast.", "规则先让系统可理解，然后才让它更快。"),
      t("Every automatic reply needs a visible reason and an easy override.", "每一次自动回复，都需要清晰理由与便捷接管。"),
      t("Automation becomes a collaborator, not a black box.", "自动化成为协作者，而不是黑箱。"),
    ],
    panels: [
      {
        eyebrow: t("01 / CONTEXT → REPETITION", "01 / 场景 → 重复"),
        title: t("Repeated messages consume attention", "重复消息持续消耗注意力"),
        body: t(
          "The opportunity was not simply faster replies, but more deliberate control over them.",
          "机会不只是更快回复，而是让每次回复都更可控。",
        ),
        image: "/portfolio/auto-reply-control.webp",
      },
      {
        eyebrow: t("02 / RULES → CONTROL", "02 / 规则 → 控制"),
        title: t("Make automation inspectable", "让自动化可以被检查"),
        body: t(
          "Editable triggers, tone and exclusions keep the user inside the decision loop.",
          "可编辑的触发条件、语气和排除项，让用户始终处于决策回路中。",
        ),
        image: "/portfolio/auto-reply-control.webp",
      },
      {
        eyebrow: t("03 / FLOW → RESPONSE", "03 / 流程 → 回应"),
        title: t("A visible decision pipeline", "一条可见的决策管线"),
        body: t(
          "Incoming context is checked, classified and routed before a response is produced.",
          "输入语境先经过检查、分类与路由，再生成最终回应。",
        ),
        image: "/portfolio/auto-reply-flow.webp",
      },
      {
        eyebrow: t("04 / OUTCOME → TRUST", "04 / 结果 → 信任"),
        title: t("Speed without surrendering agency", "提速，但不交出主动权"),
        body: t(
          "The system demonstrates how small AI automations can remain transparent and reversible.",
          "这个系统展示了小型 AI 自动化如何保持透明、可逆与可接管。",
        ),
        image: "/portfolio/auto-reply-flow.webp",
      },
    ],
    ending: t("The best automation leaves the final decision visible.", "最好的自动化，会让最终决定始终可见。"),
  },
  {
    id: "pixel-seed",
    order: 3,
    chapter: "movement-iii",
    difficulty: "hard",
    title: t("Pixel World", "像素世界"),
    shortTitle: t("Pixel World", "像素世界"),
    description: t(
      "Turn a prompt into a playable world while the arrangement accelerates around you.",
      "在不断加速的乐句中，把一句提示转化为真正可玩的世界。",
    ),
    track: "Forest of Piano - Csikos Post (Arr. for Piano)",
    artist: "Forest of Piano",
    audio: "/audio/portfolio-theme.mp3",
    bpm: 132,
    duration: 140.539,
    environment: "pixel-world",
    accent: "#f472b6",
    accentNumber: 0xf472b6,
    cover: "/portfolio/pixel-seed-hero.webp",
    mechanic: t("Faster phrases · leaps · world burst", "高速乐句 · 跳轨 · 世界爆发"),
    narrative: [
      t("A prompt is not the destination. It is the seed of a world.", "提示词不是终点，而是一个世界的种子。"),
      t("Images become rules; rules become movement.", "图像变成规则，规则变成运动。"),
      t("A world is complete only when someone can enter and play.", "只有当人真正进入并游玩时，世界才算完成。"),
      t("From intention to interaction, the system closes the loop.", "从意图到交互，系统完成了闭环。"),
    ],
    panels: [
      {
        eyebrow: t("01 / PROMPT → WORLD", "01 / 提示 → 世界"),
        title: t("Generation should lead to play", "生成应该通向游玩"),
        body: t(
          "Pixel Seed turns natural-language intent into a coherent platform-game scene.",
          "Pixel Seed 把自然语言意图转化为连贯的平台游戏场景。",
        ),
        image: "/portfolio/pixel-seed-hero.webp",
      },
      {
        eyebrow: t("02 / ASSET → SYSTEM", "02 / 素材 → 系统"),
        title: t("A pipeline behind the magic", "魔法背后的生成管线"),
        body: t(
          "Characters, terrain, rules and layout are coordinated instead of generated in isolation.",
          "角色、地形、规则与布局被统一协调，而不是彼此孤立地生成。",
        ),
        image: "/portfolio/pixel-seed-system.webp",
      },
      {
        eyebrow: t("03 / RESEARCH → DIRECTION", "03 / 研究 → 方向"),
        title: t("Evidence shaped the interaction", "证据塑造交互方向"),
        body: t(
          "120 survey responses and 22 interviews clarified where creative control mattered most.",
          "120 份问卷与 22 次访谈明确了创作控制最关键的位置。",
        ),
        image: "/portfolio/pixel-seed-system.webp",
      },
      {
        eyebrow: t("04 / OUTCOME → COMPLETION", "04 / 结果 → 完成率"),
        title: t("A clearer route from idea to stage", "从想法到舞台的清晰路径"),
        body: t(
          "The revised flow improved generation completion by 27% with 50 seed users.",
          "在 50 位种子用户中，改版后的生成完成率提升了 27%。",
        ),
        image: "/portfolio/pixel-seed-hero.webp",
      },
    ],
    ending: t("A generated image became somewhere you could go.", "一张生成图，最终成为了可以抵达的地方。"),
  },
  {
    id: "emotion-chatbot",
    order: 4,
    chapter: "movement-iv",
    difficulty: "expert",
    title: t("InnerSeed Chatbot", "InnerSeed 对话系统"),
    shortTitle: t("InnerSeed", "InnerSeed"),
    description: t(
      "Hold the emotional thread through denser patterns, pauses and reflective dialogue.",
      "在更密集的节奏、停顿与反思性对话中，保持情绪线索。",
    ),
    track: "市松寿ゞ謡 - クシコスポスト",
    artist: "市松寿ゞ謡",
    audio: "/audio/candidates/ichimatsu.mp3",
    bpm: 144,
    duration: 128.47,
    environment: "emotion-quiet",
    accent: "#c4b5fd",
    accentNumber: 0xc4b5fd,
    cover: "/portfolio/innerseed-hero.webp",
    mechanic: t("Dense syncopation · sustained notes", "密集切分 · 长按音符"),
    narrative: [
      t("Not every difficult signal needs to be corrected immediately.", "不是每个困难信号，都需要立刻被纠正。"),
      t("Context changes what a responsible response should be.", "上下文决定了什么才是负责任的回应。"),
      t("Reflection needs space, not just another generated sentence.", "反思需要空间，而不只是又一句生成文本。"),
      t("Trust grows when the system knows when to speak—and when to pause.", "系统知道何时回应、何时停顿，信任才会生长。"),
    ],
    panels: [
      {
        eyebrow: t("01 / SIGNAL → CONTEXT", "01 / 信号 → 语境"),
        title: t("Emotion is more than a label", "情绪不只是一个标签"),
        body: t(
          "InnerSeed combines dialogue context, emotional signals and reflective prompts.",
          "InnerSeed 结合对话语境、情绪信号与反思式提示。",
        ),
        image: "/portfolio/innerseed-hero.webp",
      },
      {
        eyebrow: t("02 / DIALOGUE → REFLECTION", "02 / 对话 → 反思"),
        title: t("Respond without taking over", "回应，但不替用户做决定"),
        body: t(
          "The interaction guides reflection while keeping the user's interpretation central.",
          "交互引导用户反思，同时始终把用户自己的理解放在中心。",
        ),
        image: "/portfolio/innerseed-system.webp",
      },
      {
        eyebrow: t("03 / REVIEW → SAFETY", "03 / 审视 → 安全"),
        title: t("Responsible dialogue is designed", "负责任的对话需要被设计"),
        body: t(
          "Response review, confidence cues and boundaries make the system more accountable.",
          "回复审视、置信提示与边界设计，让系统更可追责。",
        ),
        image: "/portfolio/innerseed-review.webp",
      },
      {
        eyebrow: t("04 / OUTCOME → TRUST", "04 / 结果 → 信任"),
        title: t("Care becomes an interaction quality", "关怀成为一种交互质量"),
        body: t(
          "Testing with 50 users reached 85% reported satisfaction.",
          "50 位测试用户中，报告满意度达到 85%。",
        ),
        image: "/portfolio/innerseed-hero.webp",
      },
    ],
    ending: t("Expertise is knowing that restraint can also be a decision.", "真正的专业，也包括知道克制本身就是一种决定。"),
  },
  {
    id: "multimodal-research",
    order: 5,
    chapter: "movement-iv",
    difficulty: "nightmare",
    title: t("EEG + Eye Tracking", "EEG + 眼动研究"),
    shortTitle: t("Measured Signals", "测量信号"),
    description: t(
      "Read several streams at once as raw signals become interpretable evidence.",
      "同时读取多条信息流，让原始信号逐步成为可解释证据。",
    ),
    track: "Hermann Necke - Csikos Post",
    artist: "Hermann Necke",
    audio: "/audio/candidates/hermann-necke.mp3",
    bpm: 168,
    duration: 178.625,
    environment: "research-wave",
    accent: "#fbbf24",
    accentNumber: 0xfbbf24,
    cover: "/portfolio/eeg-processing.webp",
    mechanic: t("Tight timing · rapid chords · signal overload", "严格判定 · 快速和弦 · 信号过载"),
    narrative: [
      t("Raw signals rarely explain themselves.", "原始信号很少会自我解释。"),
      t("A pattern becomes evidence only through careful questions.", "只有经过严谨提问，模式才会成为证据。"),
      t("Several imperfect measurements can reveal a more complete picture.", "多种并不完美的测量，可以拼出更完整的图景。"),
      t("The invisible becomes legible without pretending to become simple.", "不可见之物变得可读，但不被假装成简单答案。"),
    ],
    panels: [
      {
        eyebrow: t("01 / SIGNAL → NOISE", "01 / 信号 → 噪音"),
        title: t("Measurement begins with uncertainty", "测量始于不确定性"),
        body: t(
          "EEG and eye-tracking data arrive as noisy, time-sensitive streams rather than answers.",
          "EEG 与眼动数据以嘈杂、时间敏感的信息流抵达，而不是直接给出答案。",
        ),
        image: "/portfolio/eeg-processing.webp",
      },
      {
        eyebrow: t("02 / EEG → PROCESSING", "02 / EEG → 处理"),
        title: t("Structure the electrical trace", "为电信号建立结构"),
        body: t(
          "Filtering, segmentation and feature extraction turn raw traces into comparable evidence.",
          "滤波、分段与特征提取，把原始轨迹转化为可比较证据。",
        ),
        image: "/portfolio/eeg-processing.webp",
      },
      {
        eyebrow: t("03 / GAZE → ATTENTION", "03 / 注视 → 注意"),
        title: t("See where attention moves", "看见注意力如何移动"),
        body: t(
          "Gaze paths and fixation patterns add behavioural context to the neural signal.",
          "注视路径与停留模式，为神经信号补充行为语境。",
        ),
        image: "/portfolio/eye-tracking.webp",
      },
      {
        eyebrow: t("04 / FUSION → EVIDENCE", "04 / 融合 → 证据"),
        title: t("No single stream tells the whole story", "单一信号无法讲完故事"),
        body: t(
          "Multimodal fusion connects physiology, attention and task context without erasing uncertainty.",
          "多模态融合连接生理、注意力与任务语境，同时保留不确定性。",
        ),
        image: "/portfolio/multimodal-fusion.webp",
      },
    ],
    ending: t(
      "Harder journeys still lie ahead. One day, what feels like a nightmare level today will become a road beneath my feet—and a challenge that once demanded everything will become a level I cross with ease.",
      "前方还会有更难的旅程。但今天被称作“噩梦”的关卡，终会成为我脚下的路；此刻必须全力以赴的挑战，也会成为未来旅途中从容走过的休闲章节。",
    ),
  },
];

export const DEFAULT_LEVEL_ID: ProjectId = "pixel-seed";

export function getGameLevel(id: ProjectId | string | null | undefined) {
  return GAME_LEVELS.find((level) => level.id === id) ?? GAME_LEVELS[2];
}

export function localize(text: LocalizedText, locale: Locale) {
  return text[locale];
}

export const DIFFICULTY_LABELS: Record<LevelDifficulty, LocalizedText> = {
  casual: t("CASUAL", "休闲"),
  hard: t("HARD", "困难"),
  expert: t("EXPERT", "专家"),
  nightmare: t("NIGHTMARE", "噩梦"),
};

export const DIFFICULTY_STARS: Record<LevelDifficulty, number> = {
  casual: 2,
  hard: 3,
  expert: 4,
  nightmare: 5,
};
