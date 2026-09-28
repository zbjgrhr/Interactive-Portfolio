import type { ChapterId, Locale, ProjectId } from "@/types";

export type LevelDifficulty = "casual" | "hard" | "expert" | "nightmare";
export interface LocalizedText { en: string; zh: string }
export interface LevelScrollPanel { eyebrow: LocalizedText; title: LocalizedText; body: LocalizedText; image: string }
export interface GameLevel {
  id: ProjectId; order: number; chapter: ChapterId; difficulty: LevelDifficulty;
  title: LocalizedText; shortTitle: LocalizedText; description: LocalizedText;
  track: string; artist: string; audio: string; bpm: number; duration: number;
  environment: string; accent: string; accentNumber: number; cover: string;
  mechanic: LocalizedText; narrative: LocalizedText[]; panels: LevelScrollPanel[]; ending: LocalizedText;
}
const t = (en: string, zh: string): LocalizedText => ({ en, zh });
const panel = (eyebrow: LocalizedText, title: LocalizedText, body: LocalizedText, image: string): LevelScrollPanel => ({ eyebrow, title, body, image });

export const GAME_LEVELS: GameLevel[] = [
  {
    id: "pixel-world", order: 1, chapter: "movement-i", difficulty: "hard",
    title: t("Pixel World", "PIXEL WORLD"), shortTitle: t("Agent Studio", "Agent 制作室"),
    description: t("Turn a creative premise into an inspectable, playable and portable world through a ten-agent workflow.", "通过十 Agent 工作流，把一个创意原点变成可检查、可游玩、可带走的完整世界。"),
    track: "Forest of Piano - Csikos Post (Arr. for Piano)", artist: "Forest of Piano", audio: "/audio/portfolio-theme.mp3", bpm: 132, duration: 140.539,
    environment: "pixel-world", accent: "#f472b6", accentNumber: 0xf472b6, cover: "/portfolio/pixel-world-v5-platform-overview.png",
    mechanic: t("Creative brief · agent review · playable delivery", "创意简报 · Agent 互审 · 可玩交付"),
    narrative: [
      t("The brief protects the maker's idea before production begins.", "制作开始前，创意简报先保护创作者的核心设定。"),
      t("Ten agents divide the work and expose conflicts through cross-review.", "十个 Agent 分工并交叉评审，让冲突提前显现。"),
      t("Approved rules become assets, levels and a world that can actually be played.", "获批规则会变成素材、关卡，以及一个真正可玩的世界。"),
      t("Local saves and an offline package return ownership to the creator.", "本地存档与离线包，把作品的控制权交还创作者。"),
    ],
    panels: [
      panel(t("01 / IDEA → SPEC", "01 / 构想 → 规格"), t("Start with intent, not a template", "从创作意图出发，而不是套模板"), t("A guided brief turns story, level structure and constraints into GameSpec V3 without flattening the original premise.", "引导式简报把故事、关卡结构与限制条件整理为 GameSpec V3，同时保留原始创意。"), "/portfolio/pixel-world-v5-dynamic-home.png"),
      panel(t("02 / AGENTS → REVIEW", "02 / AGENT → 互审"), t("Make the workflow visible", "让工作流被看见"), t("Ten specialists plan and review through a shared progress surface; failed tasks retry without erasing completed work.", "十个专业 Agent 在统一进度面板中规划与复核；失败任务可局部重试，不会抹掉已完成结果。"), "/portfolio/pixel-world-v5-agent-studio.png"),
      panel(t("03 / RULES → ASSETS", "03 / 规则 → 素材"), t("Generation becomes a recoverable pipeline", "让生成成为可恢复的生产管线"), t("The approved spec expands into parallel asset jobs, while the generated cover turns the builder into the entrance to that world.", "获批规格展开为并行素材任务；生成封面也会把创作器变成这个世界的真实入口。"), "/portfolio/pixel-world-v5-asset-system.png"),
      panel(t("04 / BUILD → PLAY", "04 / 构建 → 游玩"), t("A world is finished when it can be played", "能被游玩，世界才算完成"), t("Creator-defined campaigns support different structures and objectives, then save locally and export as an offline game.", "创作者可定义不同的关卡结构与目标，并在游玩后本地存档、导出离线游戏。"), "/portfolio/pixel-world-v5-gameplay-boss.png"),
    ],
    ending: t("The prompt begins the world; inspection, play and ownership complete it.", "Prompt 开启世界；检查、游玩与拥有它，才让世界完整。"),
  },
  {
    id: "rainy-arcade", order: 2, chapter: "movement-ii", difficulty: "hard",
    title: t("Rainy Night Arcade", "雨夜游戏厅"), shortTitle: t("Rainy Arcade", "雨夜游戏厅"),
    description: t("A rain-soaked narrative arcade where player behaviour becomes a private, exportable design signal.", "一座雨夜叙事街机厅：玩家行为会成为仅存本地、可自行导出的设计信号。"),
    track: "V.A. - Csikos post - 네케", artist: "V.A.", audio: "/audio/candidates/va-draw-from-classic.mp3", bpm: 122, duration: 159.033,
    environment: "rainy-arcade", accent: "#57c7ff", accentNumber: 0x57c7ff, cover: "/portfolio/rain-arcade-hero.png",
    mechanic: t("Explore · choose · reflect", "探索 · 选择 · 回望"),
    narrative: [
      t("The rain slows the player down long enough to notice a story.", "雨让玩家慢下来，刚好有时间看见一段故事。"),
      t("Two finished worlds use different rhythms, choices and emotional temperatures.", "两个已完成世界用不同节奏、选择与情绪温度展开。"),
      t("Hints, retries and time become design evidence without becoming surveillance.", "提示、重试与停留时间成为设计证据，却不变成监控。"),
      t("The player chooses whether an anonymous report ever leaves the device.", "匿名报告是否离开设备，始终由玩家自己决定。"),
    ],
    panels: [
      panel(t("01 / AUDIENCE → RHYTHM", "01 / 玩家 → 节奏"), t("Design for curious night wanderers", "为好奇的夜行玩家设计"), t("The audience model favours short sessions, discovery and emotional aftertaste over score-chasing alone.", "用户画像优先考虑短时体验、探索欲与情绪余韵，而不只追求分数。"), "/portfolio/rain-arcade-hall.png"),
      panel(t("02 / WORLD → CHOICE", "02 / 世界 → 选择"), t("Each cabinet changes the emotional rules", "每台街机都改变情绪规则"), t("Block City and Rain City pair authored narrative, interaction and sound into two distinct playable worlds.", "《积木之城》与《雨之城》把叙事、交互和声音组合成两个气质不同的可玩世界。"), "/portfolio/rain-city.png"),
      panel(t("03 / ACTION → PROFILE", "03 / 行为 → 画像"), t("Reflection, not diagnosis", "用于回望，而不是诊断"), t("A four-axis entertainment profile explains its evidence and confidence while staying explicitly non-diagnostic.", "四维娱乐画像会解释依据与置信度，并明确声明不构成心理诊断。"), "/portfolio/rain-player-profile.png"),
      panel(t("04 / EXPORT → INSIGHT", "04 / 导出 → 洞察"), t("A developer view that respects consent", "尊重同意的开发者视角"), t("Anonymous JSON is exported only on request, then imported locally for completion, duration, hint and retry analysis.", "匿名 JSON 仅在玩家主动操作时导出，再由开发者本地导入，分析完成率、时长、提示与重试。"), "/portfolio/rain-developer-analytics.png"),
    ],
    ending: t("Good telemetry helps a designer listen without making the player feel watched.", "好的数据工具，应帮助设计者倾听，而不让玩家感到被注视。"),
  },
  {
    id: "iwbtz", order: 3, chapter: "movement-iii", difficulty: "nightmare",
    title: t("I Wanna Be the Zomboy", "I Wanna Be the Zomboy"), shortTitle: t("IWBTZ", "IWBTZ"),
    description: t("A hardcore platformer about misunderstanding, persistence and learning to accept an imperfect self.", "一款关于误解、坚持与接纳不完美自我的硬核平台游戏。"),
    track: "市松寿ゞ謡 - クシコスポスト", artist: "市松寿ゞ謡", audio: "/audio/candidates/ichimatsu.mp3", bpm: 144, duration: 128.47,
    environment: "iwbtz", accent: "#d9ff45", accentNumber: 0xd9ff45, cover: "/portfolio/iwbtz-menu.png",
    mechanic: t("Precision platforming · escalating bosses", "精密跳跃 · 递进式 Boss"),
    narrative: [
      t("Seven stages turn growing-up pressures into spaces the player can cross.", "七个标准关卡，把成长压力变成玩家可以穿过的空间。"),
      t("Four bosses add attacks as their health falls, changing the answer mid-fight.", "四个 Boss 会随血量下降叠加攻击，让解法在战斗中不断改变。"),
      t("DYOC makes the difficult journey visually personal.", "DYOC 系统让这段艰难旅程拥有玩家自己的外观。"),
      t("Playtests moved story into the action and made the opening easier to understand.", "测试让叙事进入行动本身，也让开场更容易理解。"),
    ],
    panels: [
      panel(t("01 / THEME → STAGES", "01 / 主题 → 关卡"), t("Make inner conflict playable", "把内在冲突变成可玩的空间"), t("Seven standard stages map childhood, school, social pressure and self-reconciliation into platforming challenges.", "七个标准关卡把童年、校园、社会压力与自我和解映射为平台挑战。"), "/portfolio/iwbtz-stage-select.png"),
      panel(t("02 / SYSTEM → IDENTITY", "02 / 系统 → 身份"), t("DYOC: design your own character", "DYOC：设计自己的角色"), t("Local and randomised paths combine costume, body and colour decisions into a character that belongs to the player.", "本地与随机化路径把服装、身体和配色选择组合成真正属于玩家的角色。"), "/portfolio/iwbtz-dyoc-flow.png"),
      panel(t("03 / BOSS → ESCALATION", "03 / BOSS → 递进"), t("The fight rewrites itself", "战斗会重写自己"), t("Every 25% of boss health adds another attack layer, creating pressure through combination rather than raw speed alone.", "Boss 每损失 25% 血量就叠加一种攻击，通过组合变化而不只靠提速制造压力。"), "/portfolio/iwbtz-level-boss.png"),
      panel(t("04 / TEST → REWRITE", "04 / 测试 → 重写"), t("Let behaviour edit the design", "让玩家行为改写设计"), t("With 15+ testers, skipped tutorials and missed story beats led to shorter copy, embedded narrative and a clearer opening flow.", "15 位以上测试者暴露了跳过教程和错过剧情的问题，促成短文本、关卡内叙事与更清晰的开场流程。"), "/portfolio/iwbtz-level-industrial.png"),
    ],
    ending: t("Difficulty matters when every retry reveals something about the level—and the player.", "当每次重试都让玩家更理解关卡，也更理解自己时，困难才真正有意义。"),
  },
  {
    id: "auto-tune", order: 4, chapter: "movement-iv", difficulty: "casual",
    title: t("Auto Tune", "Auto Tune"), shortTitle: t("Auto Tune", "Auto Tune"),
    description: t("A browser extension that keeps multilingual social posting controls compact across three platforms.", "一款把三平台多语言发帖操作收进小型控制面板的浏览器扩展。"),
    track: "office music - Csikos Post", artist: "Office Music", audio: "/audio/candidates/office-music.mp3", bpm: 112, duration: 113.371,
    environment: "auto-tune", accent: "#ffad5b", accentNumber: 0xffad5b, cover: "/portfolio/auto-reply-control.webp",
    mechanic: t("Draft · detect · post", "草稿 · 识别 · 发布"),
    narrative: [
      t("One control panel recognises the active social surface.", "一个控制面板会识别当前社交平台。"),
      t("Chinese and English random drafts stay visible before posting.", "中英文随机草稿在发布前始终可见。"),
      t("Platform-specific selectors stay at the edge of the system.", "平台专属选择器被隔离在系统边缘。"),
      t("Small automation is useful when its boundaries are obvious.", "边界足够清楚，小型自动化才真正有用。"),
    ],
    panels: [
      panel(t("01 / TAB → CONTEXT", "01 / 标签页 → 语境"), t("Meet the user where the post happens", "在发帖发生的地方帮助用户"), t("The extension detects supported X, Facebook and Instagram tabs while keeping one compact interaction model.", "扩展识别 X、Facebook 与 Instagram 标签页，同时保持一套紧凑交互模型。"), "/portfolio/auto-reply-control.webp"),
      panel(t("02 / DRAFT → ACTION", "02 / 草稿 → 行动"), t("Keep generated text editable", "让生成内容保持可编辑"), t("Bilingual random drafts appear before START acts on the current page, so the workflow remains legible.", "中英文随机草稿会先出现，再由 START 操作当前页面，让工作流始终可理解。"), "/portfolio/auto-reply-x-zh.png"),
      panel(t("03 / SHARED → ADAPTED", "03 / 共用 → 适配"), t("Share the shell, isolate fragile parts", "共享外壳，隔离脆弱部分"), t("Common state and controls are shared; changing page selectors remain specific to each platform.", "通用状态与控件被复用；易变化的页面选择器则按平台独立维护。"), "/portfolio/auto-reply-facebook-en.png"),
      panel(t("04 / SCOPE → TRUST", "04 / 范围 → 信任"), t("Say exactly what automation does", "准确说明自动化能做什么"), t("START supports the three posting surfaces, while delayed AUTO REPLY is presented as an X-only capability.", "START 支持三个发帖界面；延时 AUTO REPLY 则被明确限定为 X 专属能力。"), "/portfolio/auto-reply-control.webp"),
    ],
    ending: t("Clear scope turns a brittle browser script into a product people can understand.", "清楚的能力边界，能把脆弱脚本变成用户可理解的产品。"),
  },
  {
    id: "study-assistant", order: 5, chapter: "movement-iv", difficulty: "expert",
    title: t("Literature Study Assistant", "文献查阅辅助工具"), shortTitle: t("Study Assistant", "文献助手"),
    description: t("Keep translation, highlights, notes, mind maps and focus time beside the source instead of across scattered tools.", "把翻译、高亮、笔记、思维导图与专注计时留在原文旁边，不再分散到多个工具。"),
    track: "Hermann Necke - Csikos Post", artist: "Hermann Necke", audio: "/audio/candidates/hermann-necke.mp3", bpm: 168, duration: 178.625,
    environment: "study-assistant", accent: "#67e8f9", accentNumber: 0x67e8f9, cover: "/portfolio/web-study-workspace.webp",
    mechanic: t("Read · connect · retain", "阅读 · 连接 · 留存"),
    narrative: [
      t("Understanding breaks when every thought requires another app.", "每个念头都要切换应用时，理解就会断裂。"),
      t("Translation and highlighting stay attached to the source context.", "翻译与高亮始终依附于原文语境。"),
      t("Notes become a mind map instead of another forgotten pile.", "笔记会生长成思维导图，而不是另一堆被遗忘的文本。"),
      t("A focus timer protects the reading loop without hiding the material.", "专注计时器保护阅读循环，却不会遮住真正的材料。"),
    ],
    panels: [
      panel(t("01 / SOURCE → CONTEXT", "01 / 原文 → 语境"), t("Read without leaving the page", "不离开页面也能读懂"), t("Selection translation and highlighting reduce the cost of checking unfamiliar passages.", "划词翻译与高亮降低了查阅陌生段落的操作成本。"), "/portfolio/web-study-workspace.webp"),
      panel(t("02 / NOTE → CONNECTION", "02 / 笔记 → 连接"), t("Turn fragments into structure", "把碎片变成结构"), t("Inline notes can be organised into a mind map, preserving how evidence and ideas relate.", "页内笔记可整理为思维导图，保留证据与观点之间的关系。"), "/portfolio/web-study-map.webp"),
      panel(t("03 / TIME → FOCUS", "03 / 时间 → 专注"), t("Protect a continuous reading session", "保护连续阅读时间"), t("An integrated timer supports deliberate sessions without moving attention away from the source.", "集成计时器支持有意识的阅读时段，同时不把注意力带离原文。"), "/portfolio/web-study-workspace.webp"),
      panel(t("04 / BROWSER → WORKSPACE", "04 / 浏览器 → 工作台"), t("One local surface for the learning loop", "一块本地界面，容纳完整学习循环"), t("The tool combines reading support and knowledge organisation into a browser-native workspace.", "工具把阅读辅助与知识整理合并为浏览器原生工作台。"), "/portfolio/web-study-map.webp"),
    ],
    ending: t("A study tool earns attention by returning it to the material.", "学习工具赢得注意力的方式，是把注意力还给材料本身。"),
  },
];

export const DEFAULT_LEVEL_ID: ProjectId = "pixel-world";
export function getGameLevel(id: ProjectId | string | null | undefined) { return GAME_LEVELS.find((level) => level.id === id) ?? GAME_LEVELS[0]; }
export function localize(text: LocalizedText, locale: Locale) { return text[locale]; }
export const DIFFICULTY_LABELS: Record<LevelDifficulty, LocalizedText> = { casual: t("CASUAL", "休闲"), hard: t("HARD", "困难"), expert: t("EXPERT", "专家"), nightmare: t("NIGHTMARE", "噩梦") };
export const DIFFICULTY_STARS: Record<LevelDifficulty, number> = { casual: 2, hard: 3, expert: 4, nightmare: 5 };
