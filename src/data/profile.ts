import type { Locale } from "@/types";

export interface ExperienceItem {
  organization: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  evidence: string[];
}

export interface CapabilityGroup {
  title: string;
  skills: string[];
}

interface TimelineItem {
  period: string;
  title: string;
  detail: string;
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
  timelineLabel: string;
  timeline: TimelineItem[];
}

const profileCopy: Record<Locale, ProfileCopy> = {
  en: {
    role: "Game Designer × AI Product Builder",
    headline: "I design worlds, rules, and AI workflows people can actually enter.",
    summary:
      "My projects move from narrative and level design to multi-agent creation systems and browser tools. I care about the moment an invisible system becomes playable, legible, and useful to someone outside the team that built it.",
    proofLabel: "Evidence in the work",
    experienceLabel: "Selected experience",
    experienceIntro:
      "Cultural products, community operations, and media production ground the independent games and AI systems in real audiences and delivery constraints.",
    availability: "Open to game design, AI product, and interactive experience opportunities.",
    focus: "Game systems · AI product design · Interactive prototyping · User research",
    capabilityLabel: "One practice, four lenses",
    capabilityIntro:
      "I connect game design and product thinking through working prototypes. Research, systems, and audience operations support the same goal: experiences that communicate through use.",
    capabilities: [
      { title: "Game Design", skills: ["Systems design", "Level design", "Narrative design", "Boss patterns", "Balancing", "Playtesting"] },
      { title: "AI Products", skills: ["Multi-agent workflows", "Product architecture", "Prompt systems", "Provider routing", "Human approval", "Evaluation"] },
      { title: "Interactive Build", skills: ["GameMaker / GML", "Next.js", "TypeScript", "Browser extensions", "Local-first data", "Static delivery"] },
      { title: "Audience Insight", skills: ["User interviews", "Surveys", "Community operations", "Event design", "Content planning", "Iteration"] },
    ],
    experiences: [
      {
        organization: "Gansu Jiandu Museum",
        role: "Digital exhibition and cultural product support",
        period: "2022.12–2023.11",
        location: "Gansu, China",
        summary:
          "Worked across digital exhibitions, artefact storytelling, interaction delivery, and cultural-product ideation for a public cultural institution.",
        evidence: [
          "Supported online exhibition content and interaction delivery",
          "Contributed to an award-recognized exhibition project",
          "Designed three sticker packs; the most-used set reached 6,000+ downloads",
        ],
      },
      {
        organization: "Social Dubai",
        role: "Community operations and event design",
        period: "2023–2024",
        location: "Dubai, UAE",
        summary:
          "Built and operated Chinese-language communities around local social activity, events, and merchant collaboration.",
        evidence: [
          "Operated three communities with 700+ members",
          "Planned and delivered 30+ offline activities, with peak attendance above 80",
          "Built a Xiaohongshu audience of about 1,000 and coordinated 10+ merchant collaborations",
        ],
      },
      {
        organization: "Gansu Television",
        role: "Program planning and new-media operations",
        period: "2021.08–2022.04",
        location: "Gansu, China",
        summary:
          "Supported program planning, content production, and channel operations in a broadcast-media environment.",
        evidence: [
          "Participated in topic planning and production coordination",
          "Adapted stories and promotional material for new-media distribution",
          "Worked across editorial, production, and release timelines",
        ],
      },
    ],
    timelineLabel: "Additional practice",
    timeline: [
      { period: "2023.11–2024.08", title: "YEE AU CARRÉ DMCC · HR Specialist", detail: "Recruitment, employee coordination, and cross-cultural operations in Dubai." },
      { period: "2023–2026", title: "Independent cruise and fishing services", detail: "Lead generation, customer conversion, service coordination, and unit-economics practice in the UAE." },
    ],
  },
  zh: {
    role: "游戏策划 × AI 产品",
    headline: "我设计世界、规则和 AI 工作流，也让人真正走进去。",
    summary:
      "我的项目从叙事与关卡设计延伸到多 Agent 创作系统和浏览器工具。比起只解释一个系统，我更在意它何时真正变得可玩、可理解，也能被团队以外的人使用。",
    proofLabel: "作品中的证据",
    experienceLabel: "精选经历",
    experienceIntro:
      "文化产品、社群运营与媒体制作，让独立游戏和 AI 系统始终面对真实受众、协作关系与交付约束。",
    availability: "关注游戏策划、AI 产品与互动体验相关机会。",
    focus: "游戏系统 · AI 产品设计 · 互动原型 · 用户研究",
    capabilityLabel: "一条实践，四个观察角度",
    capabilityIntro:
      "我用可运行原型连接游戏策划与产品思维；研究、系统实现和用户运营都服务于同一件事：让体验通过使用本身完成表达。",
    capabilities: [
      { title: "游戏策划", skills: ["系统设计", "关卡设计", "叙事设计", "Boss 机制", "数值平衡", "试玩迭代"] },
      { title: "AI 产品", skills: ["多 Agent 工作流", "产品架构", "提示系统", "模型路由", "人工审批", "效果评估"] },
      { title: "互动实现", skills: ["GameMaker / GML", "Next.js", "TypeScript", "浏览器扩展", "本地数据", "静态部署"] },
      { title: "用户与市场", skills: ["用户访谈", "问卷", "社群运营", "活动策划", "内容规划", "迭代验证"] },
    ],
    experiences: [
      {
        organization: "甘肃简牍博物馆",
        role: "数字展览与文化产品支持",
        period: "2022.12–2023.11",
        location: "甘肃，中国",
        summary: "在公共文化机构中参与数字展览、文物叙事、互动交付与文创构想。",
        evidence: ["支持线上展览内容与交互上线", "参与获奖展览项目", "设计三套表情包，其中使用最高的一套下载量超过 6,000"],
      },
      {
        organization: "Social Dubai",
        role: "社群运营与活动策划",
        period: "2023–2024",
        location: "迪拜，阿联酋",
        summary: "围绕本地社交、活动与商家合作，搭建并运营中文社群。",
        evidence: ["运营 3 个社群，覆盖 700+ 成员", "策划并落地 30+ 场线下活动，单场峰值超过 80 人", "小红书积累约 1,000 名关注者，并完成 10+ 次商家合作"],
      },
      {
        organization: "甘肃电视台",
        role: "节目策划与新媒体运营",
        period: "2021.08–2022.04",
        location: "甘肃，中国",
        summary: "在广电环境中参与节目选题、内容制作与频道运营。",
        evidence: ["参与选题策划与制作协调", "将节目内容与宣传素材适配新媒体渠道", "在编辑、制作与发布时间线间协同"],
      },
    ],
    timelineLabel: "补充实践",
    timeline: [
      { period: "2023.11–2024.08", title: "YEE AU CARRÉ DMCC · HR Specialist", detail: "在迪拜负责招聘、员工协调与跨文化运营。" },
      { period: "2023–2026", title: "独立游艇与海钓服务实践", detail: "在阿联酋负责获客、转化、服务协调与单笔收益核算。" },
    ],
  },
};

export function getProfileCopy(locale: Locale) {
  return profileCopy[locale];
}

export const publicLinks = {
  email: "hxz439@alumni.bham.ac.uk",
  github: "https://github.com/zbjgrhr",
} as const;
