import type { Locale, ProjectArchive, ProjectId } from "@/types";

type LocalizedProjectCopy = Pick<
  ProjectArchive,
  | "title"
  | "oneLiner"
  | "context"
  | "problem"
  | "role"
  | "process"
  | "keyDecisions"
  | "challenges"
  | "outcome"
  | "learned"
> & {
  category?: string;
  period?: string;
  status?: string;
  metrics?: { value: string; label: string }[];
};

const zhProjects: Record<ProjectId, LocalizedProjectCopy> = {
  "pixel-seed": {
    title: "Pixel Seed 像素世界",
    oneLiner: "把一个想法变成风格统一、能够真正进入游玩的像素世界。",
    category: "AI 产品 · 游戏系统",
    period: "2024 · 硕士项目",
    status: "独立完成 · 已上线",
    context:
      "许多生成式游戏工具停在一张图片上。Pixel Seed 继续向前：把自然语言想法带过素材生成、关卡约束、运行时组装，最终成为可以立即游玩的网页体验。",
    problem:
      "角色、背景、地形和障碍物既要共享同一种视觉语言，也要同时满足碰撞、比例、透明度与关卡设计规则。",
    role:
      "负责产品定位与全栈实现，包括用户研究、产品定义、提示词与素材管线、交互设计、游戏逻辑和上线交付。",
    process: [
      "通过问卷、访谈与竞品分析定义从提示到游玩的完整旅程",
      "按素材类型拆分生成提示，并把输出转化为可直接运行的游戏资源",
      "设计包含成长、障碍与可玩验证的五关结构",
      "结合种子用户反馈完成三轮迭代",
    ],
    keyDecisions: [
      "把生成设计成一条受约束的管线，而不是一次模型调用",
      "用可玩性证明生成质量，而不只展示图片",
      "让产品界面与游戏运行时处在同一套网页架构中",
    ],
    challenges: [
      "维持生成素材的色板、尺寸和风格一致性",
      "把自由表达的提示映射到稳定的关卡模板",
      "让不同生成服务的失败能够被恢复和继续",
    ],
    outcome:
      "已完成并上线的网页产品：用户可以描述主题、生成协调的素材组、组装关卡并立即进入游玩。",
    learned: [
      "只有像设计提示词一样认真设计约束，创意 AI 才会显得有意图",
      "一个完整的可玩循环，比生成图片画廊更快传达系统质量",
    ],
    metrics: [
      { value: "120", label: "份问卷反馈" },
      { value: "22", label: "次深度访谈" },
      { value: "50", label: "位种子用户" },
      { value: "+27%", label: "生成完成率" },
    ],
  },
  "browser-tools": {
    title: "网页学习助手",
    oneLiner: "把阅读、翻译、笔记与知识整理留在当前页面的一体化学习工作区。",
    category: "浏览器产品 · 学习工具",
    period: "2025 · 独立项目",
    status: "完整浏览器扩展",
    context:
      "深度网页阅读常被翻译工具、笔记软件、计时器、本地文档阅读器和思维导图切碎。这个扩展把这些动作重新放回同一个可撤回的工作区。",
    problem:
      "高亮和笔记必须在刷新、异步页面变化、本地文件和复杂网页样式中仍然可靠，同时不能破坏原页面。",
    role:
      "负责产品、用户研究、信息架构、交互设计、扩展架构、兼容性方案与验证。",
    process: [
      "梳理深度阅读、翻译、专注和知识收集场景",
      "用 RICE 模型对 26 项需求排序",
      "设计统一页面身份与高亮恢复策略",
      "通过两套 A/B 测试方案验证高亮工作流",
    ],
    keyDecisions: [
      "让所有页面改动保持可见、可撤回",
      "为网页、本地文件和文档阅读器建立统一页面标识",
      "使用 Shadow Root 隔离扩展界面与原网页样式",
    ],
    challenges: ["页面变化后恢复高亮", "避免 CSS 与层级冲突", "在网页、PDF 与 DOCX 之间维持状态"],
    outcome: "一个完整的学习助手，把选取、处理、保存、导图整理与再次打开连接成一条连续流程。",
    learned: ["持久化本身就是用户体验的一部分", "当用户能看见并撤回改变时，浏览器工具才会赢得信任"],
    metrics: [
      { value: "320", label: "位受访学习者" },
      { value: "26", label: "项排序需求" },
      { value: "+22%", label: "功能使用率" },
      { value: "+30%", label: "首日使用率" },
    ],
  },
  "auto-reply": {
    title: "社交媒体自动回复",
    oneLiner: "一个由人掌控的跨平台回复中心，用于起草、审核、定时与随时停止。",
    category: "自动化 · 人的控制权",
    period: "2025 · 独立项目",
    status: "已完成 · 三个平台验证",
    context:
      "当起草、发送时间、平台状态和人工审核被藏在脚本之后，跨平台沟通自动化就会变得危险。",
    problem:
      "Facebook、X 与 Instagram 的页面结构不同，但用户仍需要统一、可理解的队列、审核边界与紧急停止方式。",
    role: "负责产品设计、工作流架构、跨平台页面状态研究与产品实现。",
    process: [
      "识别当前对话，只收集完成回复所需的必要语境",
      "先生成草稿，而不是立即发送",
      "加入人工审核、延迟发送、暂停和停止控制",
      "在三个网页平台验证页面识别与状态变化",
    ],
    keyDecisions: [
      "把审核设为必要状态，而不是可有可无的补充",
      "在同一个控制中心展示队列、计时、平台与发送状态",
      "让停止按钮始终可见、随时可用",
    ],
    challenges: ["适配平台页面结构变化", "保持网页状态与后台计划一致", "为安全自动化建立清晰边界"],
    outcome: "一个已经完成的自动化产品，在支持起草和定时的同时，不会拿走人的最终控制权。",
    learned: ["最重要的自动化能力，有时是随时暂停", "跨平台产品需要共享状态模型与清晰的适配层"],
  },
  "emotion-chatbot": {
    title: "InnerSeed 情绪认知对话系统",
    oneLiner: "围绕语境、回应策略、可编辑记忆与安全边界设计的情绪认知对话系统。",
    category: "负责任 AI · 对话体验",
    period: "2026 · 独立产品",
    status: "已完成 · 评估完成",
    context:
      "支持型对话产品常常识别一个情绪就急着回答。InnerSeed 把情绪、意图、关系语境、置信度与风险视为持续变化的状态。",
    problem:
      "温暖的回答不一定安全或有用。系统还需要可解释的策略选择、明确边界、可检查记忆，以及能够被测试的升级处理。",
    role:
      "负责产品定位、用户研究、对话流程、情绪状态结构、回应策略、隐私边界与评估设计。",
    process: [
      "梳理情绪释放、困惑分享与自我成长场景",
      "设计情感状态向量与模糊语境路由",
      "拆分倾听、复述、澄清、重构、行动与边界策略",
      "定义可编辑的滚动记忆与风险感知评估矩阵",
    ],
    keyDecisions: [
      "把情绪视为语境，而不是单一标签",
      "让沉默与澄清也成为有效的互动方式",
      "记忆必须能被用户查看、编辑和删除",
    ],
    challenges: ["避免对情绪理解表现出虚假确定性", "保持温度但不暗示临床照护", "让安全行为可测试，而不是装饰"],
    outcome: "一套已经完成的产品与系统，把情绪状态、回应策略、记忆、安全检查和评估连接成可审视的完整流程。",
    learned: ["不是每个信号都需要被纠正", "体贴的系统会让不确定性与边界保持可见"],
    metrics: [
      { value: "30", label: "次深度访谈" },
      { value: "200+", label: "份问卷反馈" },
      { value: "50", label: "位评估参与者" },
      { value: "85%", label: "报告满意度" },
    ],
  },
  "multimodal-research": {
    title: "EEG + 眼动多模态研究",
    oneLiner: "把嘈杂的生理信号转化为对齐、可解释并经过负责任评估的特征。",
    category: "多模态 AI · 研究",
    period: "2025–至今 · 导师指导研究",
    status: "进行中的研究协作",
    context:
      "在兰州大学，多模态抑郁识别研究结合实验刺激下采集的 EEG 与远程眼动信号。",
    problem:
      "不同模态拥有不同的采样率、延迟、缺失片段与噪声。可靠建模必须先解决事件对齐、质量控制与按受试者验证。",
    role:
      "在导师指导下参与数据清洗、特征整理、树模型实验、调参、评估、可视化、文献综述与研究讨论。",
    process: [
      "围绕共享实验事件对齐 EEG 与注视时间窗",
      "分离伪迹并组织具有解释性的特征族",
      "比较单模态基线与多模态融合方案",
      "使用按受试者划分与模态消融进行评估",
    ],
    keyDecisions: [
      "先保证质量控制，再增加模型复杂度",
      "使用 GroupKFold 或留一受试者法避免数据泄漏",
      "报告模态消融结果并明确非临床边界",
    ],
    challenges: ["同步使用不同时间轴的模态", "避免同一参与者片段在训练与验证间泄漏", "保持派生特征可解释"],
    outcome: "一套严谨的研究流程，从原始采集、对齐与特征，走向融合、评估和可解释报告。",
    learned: ["原始信号很少会自我解释", "负责任的评估决定了模型可以声称什么"],
  },
};

export function localizeProject(project: ProjectArchive, locale: Locale): ProjectArchive {
  if (locale === "en") return project;
  const copy = zhProjects[project.id];
  return {
    ...project,
    ...copy,
    metrics: copy.metrics ?? project.metrics,
  };
}

export function localizeProjects(projects: ProjectArchive[], locale: Locale) {
  return projects.map((project) => localizeProject(project, locale));
}
