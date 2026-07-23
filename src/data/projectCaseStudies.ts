import type { Locale, ProjectId } from "@/types";

export type ProjectCaseStudyVisual =
  | {
      kind: "image";
      src: string;
      alt: string;
      fit?: "contain" | "cover";
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
        title: "Idea → GameSpec V3",
        body: "Structure the story, combat, levels, environments, and difficulty before generation.",
        visual: {
          kind: "image",
          src: "/portfolio/pixel-world-spec.png",
          alt: "Pixel World structured GameSpec V3 editor",
        },
      },
      {
        step: "02",
        title: "GameSpec → Asset system",
        body: "Review and assign 38 visual, audio, behavioral, and level-specific asset categories.",
        visual: {
          kind: "image",
          src: "/portfolio/pixel-world-assets.png",
          alt: "Pixel World asset review and level assignment system",
        },
      },
      {
        step: "03",
        title: "Assets → Repairable actions",
        body: "Generate seven character actions independently and repair only the motion that needs attention.",
        visual: {
          kind: "image",
          src: "/portfolio/pixel-world-actions.png",
          alt: "Pixel World independent character action generation",
        },
      },
      {
        step: "04",
        title: "Rules → Five-level game",
        body: "Test combat, traversal, enemies, collectibles, portals, and the final boss in the playable runtime.",
        visual: {
          kind: "image",
          src: "/portfolio/pixel-world-water.png",
          alt: "Pixel World playable water level",
        },
      },
    ],
    zh: [
      {
        step: "01",
        title: "构想 → GameSpec V3",
        body: "生成前先整理故事、战斗、关卡、环境与难度。",
        visual: {
          kind: "image",
          src: "/portfolio/pixel-world-spec.png",
          alt: "Pixel World 的 GameSpec V3 结构化编辑界面",
        },
      },
      {
        step: "02",
        title: "规格 → 素材系统",
        body: "审核并分配 38 类视觉、声音、行为与关卡素材。",
        visual: {
          kind: "image",
          src: "/portfolio/pixel-world-assets.png",
          alt: "Pixel World 素材审核与关卡分配系统",
        },
      },
      {
        step: "03",
        title: "素材 → 可修复动作",
        body: "七种角色动作独立生成，只修复真正需要调整的动作。",
        visual: {
          kind: "image",
          src: "/portfolio/pixel-world-actions.png",
          alt: "Pixel World 角色动作独立生成界面",
        },
      },
      {
        step: "04",
        title: "规则 → 五关游戏",
        body: "在运行时验证战斗、移动、敌人、收集品、传送门与最终 Boss。",
        visual: {
          kind: "image",
          src: "/portfolio/pixel-world-water.png",
          alt: "Pixel World 可游玩的水域关卡",
        },
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
