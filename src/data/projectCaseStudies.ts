import type { Locale, ProjectId } from "@/types";

export type ProjectCaseStudyVisual =
  | { kind: "image"; src: string; alt: string; fit?: "contain" | "cover" }
  | { kind: "gallery"; images: Array<{ src: string; alt: string; fit?: "contain" | "cover" }> }
  | { kind: "flow"; eyebrow: string; nodes: string[]; note?: string }
  | { kind: "code"; eyebrow: string; lines: string[]; note?: string };

export interface ProjectCaseStudySection {
  step: string;
  title: string;
  body: string;
  visual: ProjectCaseStudyVisual;
  layout?: "standard" | "wide";
}

type LocalizedCaseStudy = Record<Locale, ProjectCaseStudySection[]>;

export const caseStudyProjectIds = [
  "pixel-world", "rainy-arcade", "iwbtz", "auto-tune", "study-assistant",
] as const satisfies readonly ProjectId[];

export const projectCaseStudies: Record<ProjectId, LocalizedCaseStudy> = {
  "pixel-world": {
    en: [
      {
        step: "01", title: "Keep the premise. Structure the production.",
        body: "The creator starts with a name, story, level count, and non-negotiable rules. Pixel World fills the missing production fields without rewriting the premise, then turns everything into an inspectable GameSpec V3.",
        visual: { kind: "gallery", images: [
          { src: "/portfolio/pixel-world-v5-creative-brief.png", alt: "Pixel World creative brief editor" },
          { src: "/portfolio/pixel-world-v5-structured-spec.png", alt: "Structured GameSpec V3 fields" },
        ] }, layout: "wide",
      },
      {
        step: "02", title: "Ten agents make the work visible before generation",
        body: "Direction, narrative, mechanics, art, level design, integration, consistency, engine QA, revision, and asset coordination become separate responsibilities. Cross-review exposes conflicts and creator approval remains the gate before credits are spent.",
        visual: { kind: "image", src: "/portfolio/pixel-world-v5-agent-studio.png", alt: "Ten-agent studio with review and recovery states" }, layout: "wide",
      },
      {
        step: "03", title: "Model choice becomes a product decision",
        body: "Text reasoning and image generation stay separable. The interface explains provider strengths, regions, and credential requirements, while one visual model stays locked per project so separately generated assets still belong to one world.",
        visual: { kind: "gallery", images: [
          { src: "/portfolio/pixel-world-v5-image-providers.png", alt: "Image provider routes" },
          { src: "/portfolio/pixel-world-v5-agent-providers.png", alt: "Agent provider configuration" },
        ] },
      },
      {
        step: "04", title: "Approved rules expand into a recoverable asset system",
        body: "The specification becomes editable characters, enemies, effects, audio, actions, and level assignments. Tasks run in parallel, remain independently retryable, and preserve their relationship to the level that needs them.",
        visual: { kind: "image", src: "/portfolio/pixel-world-v5-asset-system.png", alt: "Pixel World asset system and level assignment workspace" }, layout: "wide",
      },
      {
        step: "05", title: "The generated world becomes the interface",
        body: "A completed cover and background replace the product's generic hero. The creator returns to a workspace that looks like the world being built, while the same specification drives the playable runtime.",
        visual: { kind: "gallery", images: [
          { src: "/portfolio/pixel-world-v5-dynamic-home.png", alt: "Generated game art taking over the Pixel World homepage", fit: "cover" },
          { src: "/portfolio/pixel-world-v5-gameplay-level-1.png", alt: "Playable generated first level", fit: "cover" },
        ] }, layout: "wide",
      },
      {
        step: "06", title: "Save it locally. Carry it away.",
        body: "The chain ends with ownership: play the campaign, save and reopen it locally, then export the world as an offline ZIP that includes its assets, levels, rules, and runtime.",
        visual: { kind: "flow", eyebrow: "CREATOR-CONTROLLED PIPELINE", nodes: ["Premise", "Agent review", "Approved GameSpec", "Assets + runtime", "Local save", "Offline ZIP"], note: "A prompt begins the work; a portable playable game completes it." }, layout: "wide",
      },
    ],
    zh: [
      {
        step: "01", title: "保留创意原点，再把生产结构化",
        body: "创作者先写下名称、故事、关卡数与不可妥协的规则。Pixel World 只补足缺失的生产字段，不改写核心设定，再把结果整理为可检查的 GameSpec V3。",
        visual: { kind: "gallery", images: [
          { src: "/portfolio/pixel-world-v5-creative-brief.png", alt: "Pixel World 创意简报编辑器" },
          { src: "/portfolio/pixel-world-v5-structured-spec.png", alt: "结构化 GameSpec V3 字段" },
        ] }, layout: "wide",
      },
      {
        step: "02", title: "十个 Agent 在生成前把工作摊开",
        body: "总控、叙事、玩法、美术、关卡、整合、一致性、引擎检查、修订与素材统筹成为独立职责。交叉复核公开冲突，消耗额度前仍由创作者批准。",
        visual: { kind: "image", src: "/portfolio/pixel-world-v5-agent-studio.png", alt: "包含复核与恢复状态的十 Agent 工作室" }, layout: "wide",
      },
      {
        step: "03", title: "模型选择成为产品决策",
        body: "文字推理和图片生成可以分别选择。界面说明平台优势、地区与密钥要求；单个项目锁定统一视觉模型，让分别生成的素材仍像来自同一世界。",
        visual: { kind: "gallery", images: [
          { src: "/portfolio/pixel-world-v5-image-providers.png", alt: "图片模型平台路线" },
          { src: "/portfolio/pixel-world-v5-agent-providers.png", alt: "Agent 平台配置" },
        ] },
      },
      {
        step: "04", title: "获批规则展开为可恢复的素材系统",
        body: "规格继续成为可编辑角色、敌人、特效、音频、动作与逐关分配。任务并行执行，可以独立重试，也始终保留和目标关卡的关系。",
        visual: { kind: "image", src: "/portfolio/pixel-world-v5-asset-system.png", alt: "Pixel World 素材与逐关分配工作区" }, layout: "wide",
      },
      {
        step: "05", title: "生成世界接管产品界面",
        body: "完整封面与背景会替换产品的默认主视觉。创作者回到的是正在制作的世界；同一份规格也继续驱动真正可玩的运行时。",
        visual: { kind: "gallery", images: [
          { src: "/portfolio/pixel-world-v5-dynamic-home.png", alt: "生成游戏画面接管 Pixel World 首页", fit: "cover" },
          { src: "/portfolio/pixel-world-v5-gameplay-level-1.png", alt: "可玩的生成游戏第一关", fit: "cover" },
        ] }, layout: "wide",
      },
      {
        step: "06", title: "保存在本地，也把完整游戏带走",
        body: "工作流最终交付所有权：试玩、在本地保存与重新打开，再把素材、关卡、规则和运行时一起导出为离线 ZIP。",
        visual: { kind: "flow", eyebrow: "创作者可控的完整链路", nodes: ["创意原点", "Agent 复核", "获批 GameSpec", "素材与运行时", "本地存档", "离线 ZIP"], note: "Prompt 只是开端；可携带的游戏才是完成。" }, layout: "wide",
      },
    ],
  },
  "rainy-arcade": {
    en: [
      {
        step: "01", title: "One rainy room holds different kinds of play",
        body: "The arcade is the emotional and navigational hub. Each cabinet can change genre without breaking the night: Block City is about rebuilding a way home, while Rain City is about seeing through a loop built from grief and false rules.",
        visual: { kind: "gallery", images: [
          { src: "/portfolio/rain-arcade-hero.png", alt: "Rainy Night Arcade title screen", fit: "cover" },
          { src: "/portfolio/rain-arcade-hall.png", alt: "Arcade hall with two playable cabinets", fit: "cover" },
        ] }, layout: "wide",
      },
      {
        step: "02", title: "Block City rebuilds trust through objects and space",
        body: "The player repairs a route, recognizes belongings, compares memories with physical evidence, identifies the correct house, and assembles it in dependency order. The mechanical arc moves from distance to recognition and finally reunion.",
        visual: { kind: "flow", eyebrow: "BLOCK CITY", nodes: ["Repair route", "Find objects", "Match evidence", "Choose the home", "Assemble", "Reunion"], note: "Each puzzle returns one piece of the same promise: someone is still waiting." },
      },
      {
        step: "03", title: "Rain City turns observation into escape",
        body: "Fragmented tickets, a watch that runs backward, passengers trapped in rituals, and six broadcast rules build the loop. The player compares what the city says with what the scenes actually show, then chooses the false rules and earns departure.",
        visual: { kind: "image", src: "/portfolio/rain-city.png", alt: "Rain City station and train world", fit: "cover" }, layout: "wide",
      },
      {
        step: "04", title: "The player report stays local and modest",
        body: "Action counts, stage visits, hints, checks, duration, and completion remain in the browser. Four entertainment-only axes turn those signals into a readable playstyle reflection, with evidence and an explicit non-diagnostic boundary.",
        visual: { kind: "image", src: "/portfolio/rain-player-profile.png", alt: "Rainy Night Arcade local four-axis player report using labeled sample data", fit: "cover" }, layout: "wide",
      },
      {
        step: "05", title: "Developers can aggregate reports without a server",
        body: "Players export anonymous JSON only when they choose. The observatory imports several reports, validates and deduplicates session IDs, then shows completion, stage entry, duration, hint use, retries, and profile-code distribution entirely on-device.",
        visual: { kind: "image", src: "/portfolio/rain-developer-analytics.png", alt: "Rainy Night Arcade developer observatory using labeled anonymous sample data", fit: "cover" }, layout: "wide",
      },
    ],
    zh: [
      {
        step: "01", title: "一间雨夜房间，容纳不同玩法",
        body: "游戏厅既是情绪中心，也是导航中心。每台街机都可以更换玩法类型，却不会切断同一个夜晚：积木城讲重建回家的路，雨城讲看穿由遗憾和虚假规则组成的循环。",
        visual: { kind: "gallery", images: [
          { src: "/portfolio/rain-arcade-hero.png", alt: "雨夜游戏厅标题画面", fit: "cover" },
          { src: "/portfolio/rain-arcade-hall.png", alt: "拥有两台可玩街机的游戏厅", fit: "cover" },
        ] }, layout: "wide",
      },
      {
        step: "02", title: "积木城用物件与空间重新建立信任",
        body: "玩家先接回道路，再辨认旧物、把记忆与物理证据对照、找出正确房屋，并按依赖顺序完成拼装。机械曲线从隔离走向辨认，最终抵达重逢。",
        visual: { kind: "flow", eyebrow: "积木城", nodes: ["接回道路", "寻找旧物", "核对证据", "认出家", "完成拼装", "重逢"], note: "每个谜题都归还同一个承诺：仍然有人在等。" },
      },
      {
        step: "03", title: "雨城把观察变成离开的条件",
        body: "破碎车票、倒走的手表、困在仪式里的乘客和六条广播规则共同组成循环。玩家比较城市所说的内容与场景真正展示的证据，选出假规则后获得离站许可。",
        visual: { kind: "image", src: "/portfolio/rain-city.png", alt: "雨城车站与列车世界", fit: "cover" }, layout: "wide",
      },
      {
        step: "04", title: "玩家画像保持本地，也保持克制",
        body: "操作次数、阶段进入、提示、核对、时长与完成状态只留在浏览器。四条娱乐用途维度把这些信号变成可读的玩法反馈，同时公开证据并明确它不是心理诊断。",
        visual: { kind: "image", src: "/portfolio/rain-player-profile.png", alt: "使用明确标注样例数据的雨夜四维玩家画像", fit: "cover" }, layout: "wide",
      },
      {
        step: "05", title: "不架服务器，也能聚合试玩报告",
        body: "玩家只在主动选择时导出匿名 JSON。开发者观察室可导入多份报告，校验并按随机会话 ID 去重，再在本机展示完成、漏斗、时长、提示、重试与画像代码分布。",
        visual: { kind: "image", src: "/portfolio/rain-developer-analytics.png", alt: "使用明确标注匿名样例数据的雨夜开发者观察室", fit: "cover" }, layout: "wide",
      },
    ],
  },
  iwbtz: {
    en: [
      {
        step: "01", title: "Difficulty carries the story",
        body: "Seven regular stages move through childhood, school, social pressure, and self-reconciliation. The project's theme, refusing to be defined by others, becomes physical through jumps, traps, recovery, and repeated attempts.",
        visual: { kind: "image", src: "/portfolio/iwbtz-stage-select.png", alt: "IWBTZ memory-based stage selection screen", fit: "cover" }, layout: "wide",
      },
      {
        step: "02", title: "Levels change visual language and movement pressure",
        body: "Prototype rooms, industrial ruins, neon streets, and a compact town use different platform silhouettes, sightlines, and hazard densities while preserving the same precise movement vocabulary.",
        visual: { kind: "gallery", images: [
          { src: "/portfolio/iwbtz-level-industrial.png", alt: "Industrial IWBTZ level", fit: "cover" },
          { src: "/portfolio/iwbtz-level-city.png", alt: "Neon city IWBTZ level", fit: "cover" },
          { src: "/portfolio/iwbtz-level-town.png", alt: "Town IWBTZ level", fit: "cover" },
          { src: "/portfolio/iwbtz-level-prototype.png", alt: "Grid prototype used to tune jumps", fit: "cover" },
        ] }, layout: "wide",
      },
      {
        step: "03", title: "Bosses escalate by combining patterns",
        body: "Four boss fights are designed around readable attack grammars. At each 25% health threshold, a new pattern unlocks or stacks with the existing one, changing the player's attention rather than only increasing damage.",
        visual: { kind: "image", src: "/portfolio/iwbtz-level-boss.png", alt: "IWBTZ boss and hazard encounter", fit: "cover" },
      },
      {
        step: "04", title: "DYOC connects AI output to game-ready parts",
        body: "The random button supports a pure local path and an online AI path. Generated armor, hair, facial accessories, weapons, and skin pass through one application function, synchronize with saved indices, and refresh the same live preview.",
        visual: { kind: "gallery", images: [
          { src: "/portfolio/iwbtz-dyoc-flow.png", alt: "DYOC random and AI generation flow" },
          { src: "/portfolio/iwbtz-dyoc-result.png", alt: "IWBTZ character customization result", fit: "cover" },
        ] }, layout: "wide",
      },
      {
        step: "05", title: "Playtests changed where the story lives",
        body: "More than 70% of testers skipped the original tutorial and about 30% missed essential story. Shorter text, moving required narrative into main stages, and a more mechanically meaningful tutorial raised tutorial completion from about 28% to about 60%, with reported continuation increasing 25%.",
        visual: { kind: "image", src: "/portfolio/iwbtz-failure.png", alt: "IWBTZ failure and rapid retry screen", fit: "cover" }, layout: "wide",
      },
    ],
    zh: [
      {
        step: "01", title: "难度本身承担叙事",
        body: "七个常规关卡沿童年、校园、社会压力与自我和解展开。“拒绝被他人定义”不只写在文本里，而通过跳跃、陷阱、恢复与反复尝试变成身体经验。",
        visual: { kind: "image", src: "/portfolio/iwbtz-stage-select.png", alt: "IWBTZ 以记忆组织的关卡选择画面", fit: "cover" }, layout: "wide",
      },
      {
        step: "02", title: "关卡更换视觉语法，也改变移动压力",
        body: "灰盒原型、工业废墟、霓虹街区与小镇通过不同平台轮廓、视线关系和障碍密度形成节奏变化，同时保持统一的精准移动语言。",
        visual: { kind: "gallery", images: [
          { src: "/portfolio/iwbtz-level-industrial.png", alt: "工业环境 IWBTZ 关卡", fit: "cover" },
          { src: "/portfolio/iwbtz-level-city.png", alt: "霓虹城市 IWBTZ 关卡", fit: "cover" },
          { src: "/portfolio/iwbtz-level-town.png", alt: "小镇 IWBTZ 关卡", fit: "cover" },
          { src: "/portfolio/iwbtz-level-prototype.png", alt: "用于调整跳跃的灰盒原型", fit: "cover" },
        ] }, layout: "wide",
      },
      {
        step: "03", title: "Boss 通过叠加模式升级",
        body: "四场 Boss 战都建立在可读的攻击语法上。生命值每下降 25%，新的攻击模式就会解锁或与已有模式叠加，改变玩家的注意力分配，而不只提高伤害。",
        visual: { kind: "image", src: "/portfolio/iwbtz-level-boss.png", alt: "IWBTZ Boss 与环境危险场景", fit: "cover" },
      },
      {
        step: "04", title: "DYOC 把 AI 输出接进可用角色部件",
        body: "随机按钮既有纯本地路线，也有在线 AI 路线。生成后的护甲、头发、面部配件、武器与皮肤会进入同一应用函数，与已保存索引同步，并刷新同一个实时预览。",
        visual: { kind: "gallery", images: [
          { src: "/portfolio/iwbtz-dyoc-flow.png", alt: "DYOC 随机与 AI 生成流程" },
          { src: "/portfolio/iwbtz-dyoc-result.png", alt: "IWBTZ 角色定制结果", fit: "cover" },
        ] }, layout: "wide",
      },
      {
        step: "05", title: "试玩改变了剧情出现的位置",
        body: "原教程被超过 70% 的试玩者跳过，约 30% 因而错过必要剧情。缩短文本、把必要叙事移入主关卡，并让教程承担更真实的操作挑战后，教程完成率从约 28% 提升到约 60%，报告的继续游玩意愿提升 25%。",
        visual: { kind: "image", src: "/portfolio/iwbtz-failure.png", alt: "IWBTZ 失败与快速重试画面", fit: "cover" }, layout: "wide",
      },
    ],
  },
  "auto-tune": {
    en: [
      { step: "01", title: "One extension, three posting surfaces", body: "The extension identifies the active supported tab, keeps the control panel consistent, and isolates the DOM selectors needed by X, Facebook, and Instagram.", visual: { kind: "image", src: "/portfolio/auto-reply-control.webp", alt: "Auto Tune extension control panel", fit: "cover" } },
      { step: "02", title: "Draft generation stays editable", body: "Chinese and English random drafts appear in the panel before START operates on the active page. Local state keeps the workflow available without an external account system.", visual: { kind: "gallery", images: [{ src: "/portfolio/auto-reply-x-zh.png", alt: "Chinese workflow in X", fit: "cover" }, { src: "/portfolio/auto-reply-facebook-en.png", alt: "English workflow in Facebook", fit: "cover" }] } },
      { step: "03", title: "START and AUTO REPLY are different products", body: "START can operate on supported X, Facebook, and Instagram pages. AUTO REPLY is deliberately narrower: X only, a fixed reply, and a random delay between one and thirty seconds.", visual: { kind: "flow", eyebrow: "SUPPORTED SCOPE", nodes: ["Detect active tab", "Create / edit draft", "START: X / FB / IG", "AUTO REPLY: X only"], note: "The portfolio states the current boundary instead of advertising a broader capability." } },
      { step: "04", title: "Platform differences stay at the edge", body: "Selectors and page lifecycle remain in platform adapters, while settings, status, and storage stay shared. This keeps the architecture legible without pretending that all websites fail in the same way.", visual: { kind: "code", eyebrow: "EXTENSION STRUCTURE", lines: ["shared panel + local state", "        ↓", "X adapter | Facebook adapter | Instagram adapter", "        ↓", "visible status + bounded actions"], note: "Manifest V3 service worker and content scripts coordinate the page-specific work." } },
    ],
    zh: [
      { step: "01", title: "一个扩展，三个发帖界面", body: "扩展识别当前受支持标签页，保持控制面板统一，并把 X、Facebook 与 Instagram 所需 DOM 选择器隔离在各自适配层。", visual: { kind: "image", src: "/portfolio/auto-reply-control.webp", alt: "Auto Tune 扩展控制面板", fit: "cover" } },
      { step: "02", title: "随机草稿始终可以编辑", body: "中文与英文随机草稿先出现在面板里，再由 START 操作当前页面；本地状态让工作流无需外部账号系统也能继续。", visual: { kind: "gallery", images: [{ src: "/portfolio/auto-reply-x-zh.png", alt: "X 中的中文工作流", fit: "cover" }, { src: "/portfolio/auto-reply-facebook-en.png", alt: "Facebook 中的英文工作流", fit: "cover" }] } },
      { step: "03", title: "START 与 AUTO REPLY 是两种能力", body: "START 可在受支持的 X、Facebook 与 Instagram 页面工作；AUTO REPLY 的范围更窄：仅限 X、使用固定回复，并随机延迟 1 到 30 秒。", visual: { kind: "flow", eyebrow: "真实支持范围", nodes: ["识别标签页", "生成 / 编辑草稿", "START：X / FB / IG", "AUTO REPLY：仅 X"], note: "作品集如实说明当前边界，不把原型描述成更宽的能力。" } },
      { step: "04", title: "平台差异留在边缘层", body: "选择器与页面生命周期保留在平台适配器中，设置、状态与存储则保持共享。架构因此清晰，也不假设所有网站拥有相同失败方式。", visual: { kind: "code", eyebrow: "扩展结构", lines: ["共享面板 + 本地状态", "        ↓", "X 适配器 | Facebook 适配器 | Instagram 适配器", "        ↓", "可见状态 + 有边界的动作"], note: "Manifest V3 Service Worker 与 Content Script 协调页面工作。" } },
    ],
  },
  "study-assistant": {
    en: [
      { step: "01", title: "The source page becomes the workspace", body: "Selection, translation, highlighting, vocabulary, notes, and focus time stay beside the material instead of sending the reader through several separate apps.", visual: { kind: "image", src: "/portfolio/web-study-workspace.webp", alt: "Literature Reading Assistant inside a source page" } },
      { step: "02", title: "Highlights survive changing pages", body: "A stable page identity, DOM paths, text fallbacks, and batched MutationObserver recovery restore annotations after refreshes and asynchronous node replacement.", visual: { kind: "flow", eyebrow: "RECOVERY PIPELINE", nodes: ["Selection range", "DOM path", "Local record", "Text fallback", "Mutation recovery"], note: "Changes remain visible and reversible without leaking extension styles into the page." } },
      { step: "03", title: "Local documents join the same reading loop", body: "The built-in reader supports PDF, DOCX, HTML, and TXT. Notes, saved words, sentences, and mind-map branches remain connected to a stable source identity.", visual: { kind: "image", src: "/portfolio/web-study-map.webp", alt: "Page-linked mind map and notes" } },
      { step: "04", title: "Compatibility is part of the product", body: "Chrome, Edge, and Firefox packages share the main workflow while adapting manifest and browser differences. Translation routes can use MyMemory, LibreTranslate, Google, or DeepL instead of one locked provider.", visual: { kind: "code", eyebrow: "CROSS-BROWSER SURFACE", lines: ["Shadow DOM panel", "web page | file URL | local reader", "Chrome / Edge MV3 | Firefox package", "local data + selectable translation route"], note: "The extension protects both the host page and the reader's saved work." } },
    ],
    zh: [
      { step: "01", title: "让原始资料本身成为工作区", body: "划词、翻译、高亮、词句收藏、笔记与专注计时都留在材料旁边，读者不必在多个独立应用之间往返。", visual: { kind: "image", src: "/portfolio/web-study-workspace.webp", alt: "文献查阅辅助工具在原始页面中工作" } },
      { step: "02", title: "让高亮穿过不断变化的页面", body: "稳定页面身份、DOM 路径、文本回退与 MutationObserver 批量恢复共同应对刷新和异步节点替换。", visual: { kind: "flow", eyebrow: "标注恢复流程", nodes: ["选区 Range", "DOM 路径", "本地记录", "文本回退", "变更恢复"], note: "页面变化保持可见与可撤回，扩展样式也不会泄漏到宿主页面。" } },
      { step: "03", title: "本地文档进入同一条阅读闭环", body: "内置阅读器支持 PDF、DOCX、HTML 与 TXT；笔记、词句收藏和导图分支始终连接到稳定来源身份。", visual: { kind: "image", src: "/portfolio/web-study-map.webp", alt: "与页面关联的思维导图与笔记" } },
      { step: "04", title: "兼容性也是产品能力", body: "Chrome、Edge 与 Firefox 共享主要工作流，同时适配清单和浏览器差异；翻译可选择 MyMemory、LibreTranslate、Google 或 DeepL，而不是锁定单一平台。", visual: { kind: "code", eyebrow: "跨浏览器结构", lines: ["Shadow DOM 面板", "网页 | 文件地址 | 本地阅读器", "Chrome / Edge MV3 | Firefox 包", "本地数据 + 可选翻译路线"], note: "扩展同时保护宿主页面和读者已经保存的工作。" } },
    ],
  },
};

export function getProjectCaseStudy(projectId: ProjectId, locale: Locale) {
  return projectCaseStudies[projectId][locale];
}
