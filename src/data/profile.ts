import type { Locale } from "@/types";

export interface ExperienceItem {
  organization: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  evidence: string[];
}

interface ProfileCopy {
  role: string;
  headline: string;
  summary: string;
  proofLabel: string;
  experienceLabel: string;
  experienceIntro: string;
  availability: string;
  focus: string;
  capabilityLabel: string;
  capabilityIntro: string;
  capabilities: CapabilityGroup[];
  experiences: ExperienceItem[];
}

export interface CapabilityGroup {
  title: string;
  skills: string[];
}

const profileCopy: Record<Locale, ProfileCopy> = {
  en: {
    role: "AI Product Builder · Creative Technologist",
    headline: "We take our time untangling the tedious parts, so players are left with confidence and the joy of discovery.",
    summary:
      "My work moves between product strategy, full-stack prototyping, game systems, conversational AI, and multimodal research — always with a focus on making the invisible logic of a system tangible.",
    proofLabel: "Selected proof",
    experienceLabel: "Experience",
    experienceIntro:
      "Product work, digital cultural experiences, and research collaboration ground the independent projects in real delivery contexts.",
    availability: "Open to AI product, creative technology, web product, and research-assistant roles.",
    focus: "AI & multimodal models · Product strategy · Game systems · Full-stack software",
    capabilityLabel: "Four connected directions",
    capabilityIntro:
      "I move between models, products, games, and software—not as separate labels, but as one continuous path from research to something people can actually use.",
    capabilities: [
      {
        title: "Model Development",
        skills: ["Machine learning", "Model training", "Model evaluation", "Multimodal learning", "Prompt engineering"],
      },
      {
        title: "Product Development",
        skills: ["User research", "Requirements analysis", "Product strategy", "Product design", "Product validation"],
      },
      {
        title: "Game Development",
        skills: ["Unity", "C#", "GameMaker", "GML", "Game systems", "Level design", "Narrative design", "Game balancing"],
      },
      {
        title: "Software Development",
        skills: ["Full-stack development", "Python", "Databases", "Data analysis", "Data visualization"],
      },
    ],
    experiences: [
      {
        organization: "Yassir",
        role: "AI Product Manager",
        period: "2023–2024",
        location: "Abu Dhabi, UAE",
        summary:
          "Translated customer-service and operations pain points into schedulable AI product requirements, interaction flows, acceptance criteria, and reviewable releases.",
        evidence: [
          "Organized 180+ valid requirements into an eight-feature MVP",
          "Designed 35+ scenario prompt templates and business-rule structures",
          "Three release iterations across 150+ internal test users",
          "Reported 18% lower handling time and 86% internal test satisfaction",
        ],
      },
      {
        organization: "Gansu Jiandu Museum",
        role: "Digital Exhibition Technical Support",
        period: "2022–2023",
        location: "Gansu, China",
        summary:
          "Connected curatorial content, artefact images, audio, interactive questions, and mobile presentation across online exhibitions and a mini-program.",
        evidence: [
          "Supported four digital exhibition launches and updates",
          "Maintained artefact pages, image viewing, audio, and navigation",
          "Tracked and verified 30+ display, content, and interaction issues",
        ],
      },
      {
        organization: "Lanzhou University",
        role: "Research Assistant",
        period: "2025–present",
        location: "Lanzhou, China",
        summary:
          "Supports EEG and eye-tracking multimodal data work, depression-recognition experiments, model evaluation, visualization, literature analysis, and teaching cases under supervisor guidance.",
        evidence: [
          "Data cleaning and feature organization in Python and Pandas",
          "Tree-model training, tuning, and evaluation support",
          "Research documentation, literature synthesis, and visual reporting",
        ],
      },
    ],
  },
  zh: {
    role: "AI 产品构建者 · 创意技术实践者",
    headline: "无聊的部分我们慢慢拆解；留给玩家的，是安心和探索的乐趣。",
    summary:
      "我的工作横跨产品策略、全栈原型、游戏系统、对话式 AI 与多模态研究；共同目标，是让系统背后不可见的逻辑变得具体、可感知、可讨论。",
    proofLabel: "关键证据",
    experienceLabel: "职业与研究经历",
    experienceIntro:
      "企业产品、数字文化体验与研究协作，让独立项目建立在真实交付场景之上。",
    availability: "关注 AI 产品、创意技术、Web 产品与研究助理相关机会。",
    focus: "AI 与多模态模型 · 产品策略 · 游戏系统 · 全栈软件",
    capabilityLabel: "四个彼此连接的方向",
    capabilityIntro:
      "我在模型、产品、游戏与软件之间来回工作。它们不是分散的标签，而是一条从研究走向真实使用体验的完整路径。",
    capabilities: [
      {
        title: "模型开发",
        skills: ["机器学习", "模型训练", "模型评估", "多模态学习", "提示工程"],
      },
      {
        title: "产品开发",
        skills: ["用户研究", "需求分析", "产品策略", "产品设计", "产品验证"],
      },
      {
        title: "游戏开发",
        skills: ["Unity", "C#", "GameMaker", "GML", "游戏系统设计", "关卡设计", "叙事设计", "游戏平衡"],
      },
      {
        title: "软件开发",
        skills: ["全栈开发", "Python", "数据库", "数据分析", "数据可视化"],
      },
    ],
    experiences: [
      {
        organization: "Yassir",
        role: "AI 产品经理",
        period: "2023–2024",
        location: "阿布扎比，阿联酋",
        summary:
          "把客服与运营痛点转化为可排期、可验收的 AI 产品需求、交互流程和迭代版本。",
        evidence: [
          "梳理 180+ 条有效需求并形成 8 项核心 MVP 能力",
          "设计 35+ 场景化提示模板和业务规则结构",
          "覆盖 150+ 内测用户并推动三轮版本迭代",
          "项目记录显示平均处理时长下降 18%，内测满意度 86%",
        ],
      },
      {
        organization: "甘肃简牍博物馆",
        role: "数字展览技术支持",
        period: "2022–2023",
        location: "甘肃，中国",
        summary:
          "协同策展、视觉与技术团队，把简牍文物、展签、图片和音频组织成线上展览与小程序体验。",
        evidence: [
          "支持四套数字展览上线与更新",
          "维护文物详情、图片浏览、音频播放和页面跳转",
          "记录并回归验证 30+ 项展示、内容与交互问题",
        ],
      },
      {
        organization: "兰州大学",
        role: "研究助理",
        period: "2025–至今",
        location: "兰州，中国",
        summary:
          "在导师指导下参与 EEG / 眼动多模态数据、抑郁识别实验、模型评估、可视化、文献分析与教学案例支持。",
        evidence: [
          "使用 Python 与 Pandas 进行数据清洗和特征整理",
          "参与树模型训练、调参与评价",
          "支持研究文档、文献综述与结果可视化",
        ],
      },
    ],
  },
};

export function getProfileCopy(locale: Locale) {
  return profileCopy[locale];
}

export const publicLinks = {
  email: "hxz439@alumni.bham.ac.uk",
  github: "https://github.com/zbjgrhr",
  cv: "/downloads/Huaxin_Zhang_CV.docx",
  portfolio: "/downloads/Zhang_Huaxin_Creative_Portfolio.pdf",
} as const;
