import type { Locale, ProjectId } from "@/types";

export type ProjectCaseStudyVisual =
  | {
      kind: "image";
      src: string;
      alt: string;
      fit?: "contain" | "cover";
    }
  | {
      kind: "gallery";
      images: Array<{
        src: string;
        alt: string;
        fit?: "contain" | "cover";
      }>;
    }
  | {
      kind: "flow";
      eyebrow: string;
      nodes: string[];
      note?: string;
    }
  | {
      kind: "code";
      eyebrow: string;
      lines: string[];
      note?: string;
    };

export interface ProjectCaseStudySection {
  step: string;
  title: string;
  body: string;
  visual: ProjectCaseStudyVisual;
  layout?: "standard" | "wide";
}

type LocalizedCaseStudy = Record<Locale, ProjectCaseStudySection[]>;

export const caseStudyProjectIds = [
  "pixel-seed",
  "browser-tools",
  "auto-reply",
  "emotion-chatbot",
  "multimodal-research",
] as const satisfies readonly ProjectId[];

export const projectCaseStudies: Record<ProjectId, LocalizedCaseStudy> = {
  "pixel-seed": {
    en: [
      {
        step: "01",
        title: "Keep the premise. Structure the production.",
        body: "The maker begins with a name, story, level count, and non-negotiable creative rules. Pixel World fills missing production fields without replacing the premise, then turns the result into an inspectable GameSpec V3 contract for story, mechanics, art, assets, levels, and runtime behavior.",
        visual: {
          kind: "gallery",
          images: [
            {
              src: "/portfolio/pixel-world-v5-creative-brief.png",
              alt: "Pixel World game name, story, and structured creative brief editor",
              fit: "contain",
            },
            {
              src: "/portfolio/pixel-world-v5-structured-spec.png",
              alt: "Pixel World structured GameSpec fields and level planning controls",
              fit: "contain",
            },
          ],
        },
        layout: "wide",
      },
      {
        step: "02",
        title: "Ten agents work as one visible studio",
        body: "Director, Narrative, Mechanics, Art Director, Level Designer, Integrator, Consistency Critic, Engine QA, Revision, and Asset Coordinator run as a visible cluster. Each specialist exposes status, reasoning, structured output, and review progress instead of disappearing inside one long prompt.",
        visual: {
          kind: "gallery",
          images: [
            {
              src: "/portfolio/pixel-world-v5-agent-studio.png",
              alt: "Pixel World Agent Studio showing ten specialist agents in progress",
              fit: "contain",
            },
            {
              src: "/portfolio/pixel-world-v5-agent-review.png",
              alt: "Completed narrative agent review alongside the remaining specialist agents",
              fit: "contain",
            },
          ],
        },
        layout: "wide",
      },
      {
        step: "03",
        title: "Cross-review catches conflicts without restarting the run",
        body: "Agents review one another against the same engine contract. Blocking failures remain explicit, optional improvements remain optional, and a failed task can be retried independently while completed work stays intact. The creator receives a decision surface—not a mysterious final answer.",
        visual: {
          kind: "gallery",
          images: [
            {
              src: "/portfolio/pixel-world-v5-agent-recovery.png",
              alt: "Pixel World Agent Studio showing a local agent failure and independent recovery path",
              fit: "contain",
            },
            {
              src: "/portfolio/pixel-world-v5-engine-qa.png",
              alt: "Pixel World engine QA output separating validated constraints from optional recommendations",
              fit: "contain",
            },
          ],
        },
        layout: "wide",
      },
      {
        step: "04",
        title: "Choose intelligence, cost, and region in the open",
        body: "Eight image-provider routes and three direct Agent platforms expose model strengths, pricing patterns, credentials, and regional limits. Text reasoning and image generation stay separable, while each project locks one visual model so dozens of assets still belong to the same world.",
        visual: {
          kind: "gallery",
          images: [
            {
              src: "/portfolio/pixel-world-v5-image-providers.png",
              alt: "Pixel World image provider cards for OpenRouter, OpenAI, Alibaba DashScope, and Cloudflare Workers AI",
              fit: "contain",
            },
            {
              src: "/portfolio/pixel-world-v5-agent-providers.png",
              alt: "Pixel World Agent Studio provider configuration and regional API guidance",
              fit: "contain",
            },
          ],
        },
        layout: "wide",
      },
      {
        step: "05",
        title: "An approved GameSpec becomes a recoverable generation plan",
        body: "After creator approval, the specification expands into editable asset cards, per-level assignments, reusable action sets, sound and behavior rules, and a parallel generation queue. The project can generate many tasks through one locked model, preserve completed items, and retry only what needs repair.",
        visual: {
          kind: "gallery",
          images: [
            {
              src: "/portfolio/pixel-world-v5-parallel-generation.png",
              alt: "Pixel World generating dozens of selected assets through a four-way parallel queue",
              fit: "contain",
            },
            {
              src: "/portfolio/pixel-world-v5-level-assets.png",
              alt: "Successfully generated level backgrounds, music, and effects assigned to individual game levels",
              fit: "contain",
            },
          ],
        },
        layout: "wide",
      },
      {
        step: "06",
        title: "The generated game takes over the product’s cover",
        body: "Once a new world is created, its own game cover and background replace the default Pixel World hero image. The builder stops looking like a static tool and becomes a living archive of the world currently being made—bright, specific, and immediately recognizable.",
        visual: {
          kind: "image",
          src: "/portfolio/pixel-world-v5-dynamic-home.png",
          alt: "Pixel World homepage automatically restyled with the newly generated Darabangba game background",
          fit: "cover",
        },
        layout: "wide",
      },
      {
        step: "07",
        title: "Playable—not merely generated—is the quality bar",
        body: "The same approved contract drives the custom 2D runtime: player actions, melee and ranged combat, enemies, collectibles, collision, level rules, HUD, music, and touch controls. The result is a game the creator can enter, not a folder of attractive but disconnected images.",
        visual: {
          kind: "image",
          src: "/portfolio/pixel-world-v5-gameplay-level-1.png",
          alt: "Bright completed first level of the generated Darabangba pixel action game",
          fit: "cover",
        },
        layout: "wide",
      },
      {
        step: "08",
        title: "Creative rules survive a second act and a boss",
        body: "Levels can carry distinct backgrounds, music, weather, effects, enemies, pacing, and narrative reversals while sharing one coherent visual language. Darabangba proves the range with a bright fairy-tale opening, melee and ranged play, collectibles, escalating enemies, and a final Prince boss.",
        visual: {
          kind: "image",
          src: "/portfolio/pixel-world-v5-gameplay-boss.png",
          alt: "Completed second level and final boss battle in the generated Darabangba game",
          fit: "cover",
        },
        layout: "wide",
      },
      {
        step: "09",
        title: "Save it locally. Carry it away.",
        body: "The workflow ends in ownership: the creator can test the campaign, save and reload it locally, reopen the generated world, and export a playable offline ZIP. Prompt-to-game is complete only when the result survives the browser session and can leave the platform.",
        visual: {
          kind: "flow",
          eyebrow: "PROMPT → OWNED GAME",
          nodes: ["Creative premise", "Approved GameSpec", "Generated assets", "Playable local save", "Offline ZIP"],
          note: "The downloadable package carries the game, levels, assets, rules, and runtime together rather than exporting a visual mock-up.",
        },
        layout: "wide",
      },
    ],
    zh: [
      {
        step: "01",
        title: "保留创意原点，再把生产结构化",
        body: "创作者先写下游戏名称、故事、关卡数与不可妥协的创意规则。Pixel World 只补足缺失的生产字段，不替换核心设定，再将其整理成可检查的 GameSpec V3，统一约束叙事、玩法、美术、素材、关卡与运行行为。",
        visual: {
          kind: "gallery",
          images: [
            {
              src: "/portfolio/pixel-world-v5-creative-brief.png",
              alt: "Pixel World 游戏名称、故事与结构化创意简报编辑器",
              fit: "contain",
            },
            {
              src: "/portfolio/pixel-world-v5-structured-spec.png",
              alt: "Pixel World 结构化 GameSpec 字段与关卡规划控件",
              fit: "contain",
            },
          ],
        },
        layout: "wide",
      },
      {
        step: "02",
        title: "十个 Agent，组成一间看得见的工作室",
        body: "总控、叙事、玩法、美术总监、关卡设计、规格整合、一致性评审、引擎检查、修订与素材统筹以集群方式协作。每个 Agent 的状态、推理、结构化结果与评审进度都能被看见，不再藏在一条冗长提示词背后。",
        visual: {
          kind: "gallery",
          images: [
            {
              src: "/portfolio/pixel-world-v5-agent-studio.png",
              alt: "Pixel World Agent Studio 中十个专业 Agent 的运行状态",
              fit: "contain",
            },
            {
              src: "/portfolio/pixel-world-v5-agent-review.png",
              alt: "完成的叙事 Agent 评审与其余专业 Agent 列表",
              fit: "contain",
            },
          ],
        },
        layout: "wide",
      },
      {
        step: "03",
        title: "交叉评审发现冲突，但不让整条流程重来",
        body: "各个 Agent 围绕同一份引擎契约彼此复核：阻断问题明确显示，可选改进依然保持可选；单个任务失败时可以独立重试，已完成结果不会丢失。创作者面对的是清楚的决策界面，而不是一个来历不明的最终答案。",
        visual: {
          kind: "gallery",
          images: [
            {
              src: "/portfolio/pixel-world-v5-agent-recovery.png",
              alt: "Pixel World Agent Studio 中局部失败与独立恢复入口",
              fit: "contain",
            },
            {
              src: "/portfolio/pixel-world-v5-engine-qa.png",
              alt: "Pixel World 引擎 QA 将已验证约束与可选建议分开显示",
              fit: "contain",
            },
          ],
        },
        layout: "wide",
      },
      {
        step: "04",
        title: "把智能、成本与地区选择放到明处",
        body: "8 条图片平台路线与 3 个 Agent 直连平台会说明模型优势、计费特征、密钥格式与地区限制。文字推理与图片生成可以分别选择，同时每个项目锁定统一视觉模型，让几十项素材仍然像属于同一个世界。",
        visual: {
          kind: "gallery",
          images: [
            {
              src: "/portfolio/pixel-world-v5-image-providers.png",
              alt: "Pixel World 中 OpenRouter、OpenAI、阿里云百炼与 Cloudflare Workers AI 图片平台卡片",
              fit: "contain",
            },
            {
              src: "/portfolio/pixel-world-v5-agent-providers.png",
              alt: "Pixel World Agent Studio 的平台配置与地区 API 指引",
              fit: "contain",
            },
          ],
        },
        layout: "wide",
      },
      {
        step: "05",
        title: "获批 GameSpec，展开为可恢复的生成计划",
        body: "创作者批准后，规格会展开成可编辑素材卡、逐关分配、可复用动作、音效与行为规则，以及并行生成队列。项目通过一套锁定模型批量生产，保存已完成素材，只重试真正需要修复的部分。",
        visual: {
          kind: "gallery",
          images: [
            {
              src: "/portfolio/pixel-world-v5-parallel-generation.png",
              alt: "Pixel World 以四路并行队列批量生成已选择素材",
              fit: "contain",
            },
            {
              src: "/portfolio/pixel-world-v5-level-assets.png",
              alt: "成功生成并分配至独立关卡的背景、音乐与特效素材",
              fit: "contain",
            },
          ],
        },
        layout: "wide",
      },
      {
        step: "06",
        title: "新游戏生成后，作品封面接管产品首页",
        body: "一个新世界完成后，它自己的游戏封面与背景会替换 Pixel World 默认的顶部主视觉。创作工具因此不再像一张静态表单，而会变成正在制作的世界本身：鲜亮、有辨识度，也让每次生成都拥有独特的第一印象。",
        visual: {
          kind: "image",
          src: "/portfolio/pixel-world-v5-dynamic-home.png",
          alt: "Pixel World 首页自动换成新生成的达拉崩吧游戏背景",
          fit: "cover",
        },
        layout: "wide",
      },
      {
        step: "07",
        title: "质量标准不是生成完成，而是真正可玩",
        body: "同一份获批契约继续驱动自研 2D 运行时：角色动作、近战与远程、敌人、收集品、碰撞、关卡规则、HUD、音乐与触控操作。最终结果是创作者能够走进去的游戏，而不是一组好看却彼此断开的图片。",
        visual: {
          kind: "image",
          src: "/portfolio/pixel-world-v5-gameplay-level-1.png",
          alt: "已完成且画面鲜亮的达拉崩吧像素动作游戏第一关",
          fit: "cover",
        },
        layout: "wide",
      },
      {
        step: "08",
        title: "创意规则经得住第二幕与最终 Boss",
        body: "每关可以拥有不同背景、音乐、天气、特效、敌人、节奏与剧情反转，同时维持统一画风。《达拉崩吧》以明亮童话开场，组合近战、远程、收集与逐步升级的敌人，并在第二关进入王子 Boss 战。",
        visual: {
          kind: "image",
          src: "/portfolio/pixel-world-v5-gameplay-boss.png",
          alt: "生成游戏第二关中已经完成的最终王子 Boss 战",
          fit: "cover",
        },
        layout: "wide",
      },
      {
        step: "09",
        title: "保存在本地，也把完整游戏带走",
        body: "工作流最终交付的是所有权：创作者可以试玩、在本地保存与载入、重新打开生成世界，并导出可离线运行的 ZIP。只有当结果能够离开当前浏览器会话，Prompt 到完整游戏的链条才真正闭合。",
        visual: {
          kind: "flow",
          eyebrow: "PROMPT → 属于创作者的游戏",
          nodes: ["创意原点", "获批 GameSpec", "生成素材", "本地可玩存档", "离线 ZIP"],
          note: "下载包会一起携带游戏、关卡、素材、规则与运行时，而不是只导出一张视觉预览。",
        },
        layout: "wide",
      },
    ],
  },
  "browser-tools": {
    en: [
      {
        step: "01",
        title: "The page becomes the workspace",
        body: "Select, translate, highlight, annotate, and save without breaking the reading flow or leaving the source page.",
        visual: {
          kind: "image",
          src: "/portfolio/web-study-workspace.webp",
          alt: "Web Study Assistant working inside a live article",
          fit: "contain",
        },
      },
      {
        step: "02",
        title: "Highlights that survive the DOM",
        body: "A layered recovery strategy restores annotations after refreshes, asynchronous rendering, and node replacement.",
        visual: {
          kind: "flow",
          eyebrow: "HIGHLIGHT RECOVERY PIPELINE",
          nodes: ["Range", "DOM path", "Storage", "Text fallback", "Observe"],
          note: "MutationObserver batches late page changes before restoration runs again.",
        },
      },
      {
        step: "03",
        title: "Reading becomes knowledge structure",
        body: "Saved words, sentences, notes, and branches remain connected to the page they came from and can be reopened later.",
        visual: {
          kind: "image",
          src: "/portfolio/web-study-map.webp",
          alt: "Web Study Assistant mind map for page-linked notes",
          fit: "contain",
        },
      },
      {
        step: "04",
        title: "One identity across difficult pages",
        body: "Shadow DOM isolates the interface while a stable page key keeps web pages, local files, PDF, and DOCX reader state consistent.",
        visual: {
          kind: "code",
          eyebrow: "SYSTEM STRUCTURE — NOT SOURCE CODE",
          lines: [
            "host page  →  shadow root  →  isolated study UI",
            "http(s)    →  origin + path + query",
            "file://    →  normalized file URL",
            "reader     →  ext-viewer:{stable file hash}",
          ],
          note: "Visible, reversible changes without leaking styles into the host page.",
        },
      },
    ],
    zh: [
      {
        step: "01",
        title: "把当前页面变成学习工作区",
        body: "划词、翻译、高亮、备注与保存都留在阅读现场，不打断原本的学习路径。",
        visual: {
          kind: "image",
          src: "/portfolio/web-study-workspace.webp",
          alt: "网页学习助手在文章页面中的真实工作界面",
          fit: "contain",
        },
      },
      {
        step: "02",
        title: "让高亮穿过不断变化的 DOM",
        body: "通过多层恢复策略，在刷新、异步渲染和节点替换后重新找到原始标注。",
        visual: {
          kind: "flow",
          eyebrow: "高亮恢复流程",
          nodes: ["Range", "DOM 路径", "本地存储", "文本回退", "变更观察"],
          note: "MutationObserver 合并页面的延迟变化，再安全地触发恢复。",
        },
      },
      {
        step: "03",
        title: "把阅读结果组织成知识结构",
        body: "生词、生句、笔记与分支始终保留来源页面关系，之后仍能重新打开和继续整理。",
        visual: {
          kind: "image",
          src: "/portfolio/web-study-map.webp",
          alt: "网页学习助手中与页面关联的思维导图",
          fit: "contain",
        },
      },
      {
        step: "04",
        title: "在复杂页面间维持同一身份",
        body: "Shadow DOM 隔离插件界面，统一 pageKey 则让网页、本地文件、PDF 与 DOCX 阅读状态保持一致。",
        visual: {
          kind: "code",
          eyebrow: "系统结构 — 非源代码",
          lines: [
            "宿主页面   →  Shadow Root  →  隔离的学习界面",
            "http(s)    →  origin + path + query",
            "file://    →  规范化文件地址",
            "阅读器     →  ext-viewer:{稳定文件哈希}",
          ],
          note: "所有页面改动保持可见、可撤回，同时不污染原网页样式。",
        },
      },
    ],
  },
  "auto-reply": {
    en: [
      {
        step: "01",
        title: "Three platforms, one control center",
        body: "Facebook Web, X Web, and Instagram Web share one legible queue, schedule, platform state, and emergency stop.",
        visual: {
          kind: "image",
          src: "/portfolio/auto-reply-facebook-en.png",
          alt: "Auto Reply extension reviewing an English draft inside Facebook Messenger",
          fit: "cover",
        },
      },
      {
        step: "02",
        title: "One workflow, more than one language",
        body: "The same review, queue, and scheduling controls support a Chinese conversation in X, while Instagram remains available through the shared platform switcher.",
        visual: {
          kind: "image",
          src: "/portfolio/auto-reply-x-zh.png",
          alt: "Auto Reply extension reviewing a Chinese draft inside X direct messages",
          fit: "cover",
        },
      },
      {
        step: "03",
        title: "Human control is part of the state machine",
        body: "Review, pause, resume, delay, and stop are first-class states rather than emergency features added after automation.",
        visual: {
          kind: "flow",
          eyebrow: "CONTROLLED DELIVERY STATE",
          nodes: ["Observe", "Draft", "Review", "Timer", "Send"],
          note: "Pause and Stop remain reachable before every irreversible action.",
        },
      },
      {
        step: "04",
        title: "Adapters absorb platform differences",
        body: "Platform-specific selectors and lifecycle changes stay at the edge while the queue, review rules, and delivery states remain shared.",
        visual: {
          kind: "code",
          eyebrow: "SYSTEM STRUCTURE — NOT SOURCE CODE",
          lines: [
            "Facebook adapter ┐",
            "X adapter        ├→ shared conversation state",
            "Instagram adapter┘     ↓",
            "draft → human review → scheduled delivery",
          ],
          note: "A shared model reduces duplicated logic without hiding platform-specific failure states.",
        },
      },
    ],
    zh: [
      {
        step: "01",
        title: "三个平台，一个控制中心",
        body: "Facebook 网页端、X 网页端与 Instagram 网页端共用清晰的队列、计时、平台状态和紧急停止入口。",
        visual: {
          kind: "image",
          src: "/portfolio/auto-reply-facebook-en.png",
          alt: "Auto Reply 在 Facebook Messenger 中复核英文回复草稿",
          fit: "cover",
        },
      },
      {
        step: "02",
        title: "同一套流程，不止一种语言",
        body: "同样的复核、队列与定时控制可以处理 X 中的中文对话，并通过统一的平台切换继续支持 Instagram。",
        visual: {
          kind: "image",
          src: "/portfolio/auto-reply-x-zh.png",
          alt: "Auto Reply 在 X 私信中复核中文回复草稿",
          fit: "cover",
        },
      },
      {
        step: "03",
        title: "把人的控制权写进状态机",
        body: "复核、暂停、继续、延迟与停止都是正式状态，而不是自动化完成后才补上的紧急功能。",
        visual: {
          kind: "flow",
          eyebrow: "受控发送状态",
          nodes: ["观察", "起草", "人工复核", "计时", "发送"],
          note: "每个不可逆动作之前，暂停与停止都始终可用。",
        },
      },
      {
        step: "04",
        title: "用适配层吸收平台差异",
        body: "不同平台的选择器与页面生命周期留在边缘层，队列、复核规则和发送状态则保持共享。",
        visual: {
          kind: "code",
          eyebrow: "系统结构 — 非源代码",
          lines: [
            "Facebook 适配器 ┐",
            "X 适配器        ├→ 共享对话状态",
            "Instagram 适配器┘      ↓",
            "草稿 → 人工复核 → 定时发送",
          ],
          note: "共享模型减少重复逻辑，同时保留各平台真实的失败状态。",
        },
      },
    ],
  },
  "emotion-chatbot": {
    en: [
      {
        step: "01",
        title: "Emotion stays inside its context",
        body: "Conversation, emotional state, intent, relationship context, and risk remain visible together instead of collapsing into one label.",
        visual: {
          kind: "image",
          src: "/portfolio/innerseed-conversation-v2.png",
          alt: "InnerSeed conversation and emotional context interface",
          fit: "cover",
        },
      },
      {
        step: "02",
        title: "A state system before a response",
        body: "Mixed emotion, intensity, confidence, intent, relationship, and risk are structured before the dialogue policy selects a response mode.",
        visual: {
          kind: "image",
          src: "/portfolio/innerseed-state-inspector.png",
          alt: "InnerSeed state inspector for conversation turns and response strategy",
          fit: "cover",
        },
      },
      {
        step: "03",
        title: "Strategy and memory remain inspectable",
        body: "The response policy can listen, reflect, clarify, reframe, or offer action while a user-editable summary carries only necessary context forward.",
        visual: {
          kind: "code",
          eyebrow: "RESPONSE SCHEMA — SYSTEM STRUCTURE",
          lines: [
            "affect: { label, intensity, confidence }",
            "intent: vent | advice | reflect | decide",
            "strategy: listen | clarify | reframe | action",
            "memory: { relation, goal, boundary, open_issue }",
            "risk: normal | vulnerable | high",
          ],
          note: "Uncertainty can route to clarification instead of forcing a confident interpretation.",
        },
      },
      {
        step: "04",
        title: "Safety must be reviewable",
        body: "Risk routing, memory cards, strategy history, and qualitative evaluation are replayed together so safety is tested rather than merely claimed.",
        visual: {
          kind: "image",
          src: "/portfolio/innerseed-review-v2.png",
          alt: "InnerSeed dialogue review, safety check, memory, and evaluation dashboard",
          fit: "cover",
        },
      },
    ],
    zh: [
      {
        step: "01",
        title: "让情绪留在真实语境里",
        body: "对话、情绪状态、意图、关系语境与风险同时可见，而不是被压缩成一个简单标签。",
        visual: {
          kind: "image",
          src: "/portfolio/innerseed-conversation-v2.png",
          alt: "InnerSeed 对话与情绪语境界面",
          fit: "cover",
        },
      },
      {
        step: "02",
        title: "先建立状态，再选择回答",
        body: "系统先组织混合情绪、强度、置信度、意图、关系和风险，再由对话策略选择响应方式。",
        visual: {
          kind: "image",
          src: "/portfolio/innerseed-state-inspector.png",
          alt: "InnerSeed 对话轮次、状态与响应策略检查台",
          fit: "cover",
        },
      },
      {
        step: "03",
        title: "让策略与记忆始终可以检查",
        body: "响应策略可以倾听、复述、澄清、重构或提供行动；用户可编辑的摘要只把必要语境带入下一轮。",
        visual: {
          kind: "code",
          eyebrow: "响应 Schema — 系统结构",
          lines: [
            "情绪: { 标签, 强度, 置信度 }",
            "意图: 倾诉 | 求建议 | 反思 | 决策",
            "策略: 倾听 | 澄清 | 重构 | 行动",
            "记忆: { 关系, 目标, 边界, 未解决问题 }",
            "风险: 正常 | 脆弱 | 高风险",
          ],
          note: "当理解不确定时，系统可以先澄清，而不是强行给出确定判断。",
        },
      },
      {
        step: "04",
        title: "安全必须能够被复盘",
        body: "风险路由、记忆卡片、策略历史与质性评估被放在同一次回放中，让安全真正可测试。",
        visual: {
          kind: "image",
          src: "/portfolio/innerseed-review-v2.png",
          alt: "InnerSeed 对话回放、安全检查、记忆与评估面板",
          fit: "cover",
        },
      },
    ],
  },
  "multimodal-research": {
    en: [
      {
        step: "01",
        title: "Alignment comes before modeling",
        body: "EEG and eye tracking are paired around shared experimental events so the model cannot mistake clock drift for a meaningful relationship.",
        visual: {
          kind: "flow",
          eyebrow: "EVENT ALIGNMENT PIPELINE",
          nodes: ["Stimulus", "Trigger", "EEG window", "Eye window", "Paired sample"],
          note: "Subject ID, quality flags, delay, and missing-window policy travel with every sample.",
        },
      },
      {
        step: "02",
        title: "Quality control before classification",
        body: "Bad-channel handling, filtering, re-referencing, artifact separation, and event segmentation precede interpretable EEG features.",
        visual: {
          kind: "image",
          src: "/portfolio/eeg-qc-workstation.png",
          alt: "EEG preprocessing and quality-control research workstation",
          fit: "cover",
        },
      },
      {
        step: "03",
        title: "Eye behavior becomes controlled features",
        body: "Fixation, saccade, pupil, transitions, calibration error, blinks, and tracking loss are interpreted within the same stimulus window.",
        visual: {
          kind: "image",
          src: "/portfolio/eye-tracking-workstation.png",
          alt: "Eye-tracking fixation, AOI, pupil, and calibration analysis workstation",
          fit: "cover",
        },
      },
      {
        step: "04",
        title: "Fusion has to prove its value",
        body: "EEG-only, eye-only, and fusion models are compared with subject-wise validation, modality ablation, confidence intervals, and interpretable feature plots.",
        visual: {
          kind: "image",
          src: "/portfolio/multimodal-evaluation-workstation.png",
          alt: "Multimodal EEG and eye-tracking experiment comparison dashboard",
          fit: "cover",
        },
      },
    ],
    zh: [
      {
        step: "01",
        title: "先对齐事件，再讨论模型",
        body: "EEG 与眼动围绕共享实验事件配对，避免模型把时钟漂移误当成有意义的模态关系。",
        visual: {
          kind: "flow",
          eyebrow: "事件对齐流程",
          nodes: ["刺激", "统一 Trigger", "EEG 窗口", "眼动窗口", "配对样本"],
          note: "受试者 ID、质量标记、延迟和缺失窗口策略始终伴随每个样本。",
        },
      },
      {
        step: "02",
        title: "分类之前先保证信号可靠",
        body: "坏导处理、滤波、重参考、伪迹分离和事件分段先于可解释 EEG 特征与分类实验。",
        visual: {
          kind: "image",
          src: "/portfolio/eeg-qc-workstation.png",
          alt: "EEG 预处理与信号质量控制研究工作台",
          fit: "cover",
        },
      },
      {
        step: "03",
        title: "把注视行为变成质量可控的特征",
        body: "注视、扫视、瞳孔、区域转移、校准误差、眨眼与追踪丢失都在同一刺激窗口中解释。",
        visual: {
          kind: "image",
          src: "/portfolio/eye-tracking-workstation.png",
          alt: "包含注视、AOI、瞳孔与校准质量的眼动分析工作台",
          fit: "cover",
        },
      },
      {
        step: "04",
        title: "融合必须证明自己更有价值",
        body: "比较 EEG-only、Eye-only 与 Fusion，并使用按受试者验证、模态消融、置信区间和可解释特征图检验互补性。",
        visual: {
          kind: "image",
          src: "/portfolio/multimodal-evaluation-workstation.png",
          alt: "EEG 与眼动多模态实验对比和消融评估面板",
          fit: "cover",
        },
      },
    ],
  },
};

export function getProjectCaseStudy(projectId: ProjectId, locale: Locale) {
  return projectCaseStudies[projectId][locale];
}
