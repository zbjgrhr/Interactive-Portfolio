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
        step: "01", title: "Preserve the Creative Premise, Then Structure Production",
        body: "The creator begins with a title, story, level count, and non-negotiable rules. Pixel World fills only the missing production fields, without rewriting the core concept, then organizes the result into an inspectable GameSpec V3.",
        visual: { kind: "gallery", images: [
          { src: "/portfolio/pixel-world-v5-creative-brief.png", alt: "Pixel World Creative Brief Editor" },
          { src: "/portfolio/pixel-world-v5-structured-spec.png", alt: "Structured GameSpec V3 Fields" },
        ] }, layout: "wide",
      },
      {
        step: "02", title: "Ten Agents Put the Work on the Table Before Generation",
        body: "Direction, narrative, mechanics, art, levels, integration, consistency, engine checks, revision, and asset coordination become distinct responsibilities. Cross-review exposes conflicts, while the creator still approves the work before any credits are spent.",
        visual: { kind: "image", src: "/portfolio/pixel-world-v5-agent-studio.png", alt: "Ten-Agent Studio with Review and Recovery States" }, layout: "wide",
      },
      {
        step: "03", title: "Model Selection Becomes a Product Decision",
        body: "Text reasoning and image generation can be configured separately. The interface explains each platform’s strengths, regional availability, and key requirements. One visual model is locked per project so separately generated assets still belong to the same world.",
        visual: { kind: "gallery", images: [
          { src: "/portfolio/pixel-world-v5-image-providers.png", alt: "Image-Model Platform Routes" },
          { src: "/portfolio/pixel-world-v5-agent-providers.png", alt: "Agent Platform Configuration" },
        ] },
      },
      {
        step: "04", title: "Approved Rules Expand into a Recoverable Asset System",
        body: "The spec continues into editable characters, enemies, effects, audio, actions, and level-by-level assignments. Tasks run in parallel, can be retried independently, and always retain their relationship to the target level.",
        visual: { kind: "image", src: "/portfolio/pixel-world-v5-asset-system.png", alt: "Pixel World Asset and Level-Assignment Workspace" }, layout: "wide",
      },
      {
        step: "05", title: "The Generated World Takes Over the Product Interface",
        body: "The finished cover and background replace the product’s default visual identity. Creators return to the world they are building, while the same specification continues into a genuinely playable runtime.",
        visual: { kind: "gallery", images: [
          { src: "/portfolio/pixel-world-v5-dynamic-home.png", alt: "A Generated Game Takes Over the Pixel World Home Screen", fit: "cover" },
          { src: "/portfolio/pixel-world-v5-gameplay-level-1.png", alt: "The First Playable Level of a Generated Game", fit: "cover" },
        ] }, layout: "wide",
      },
      {
        step: "06", title: "Save It Locally—and Take the Complete Game with You",
        body: "The workflow ultimately returns ownership to the creator: playtest first, save and reopen locally, then package the assets, levels, rules, and runtime into an offline ZIP.",
        visual: { kind: "flow", eyebrow: "A Complete, Creator-Controlled Pipeline", nodes: ["Creative Premise", "Agent Review", "Approved GameSpec", "Assets & Runtime", "Local Save", "Offline ZIP"], note: "A prompt is only the beginning. The game is complete when you can take it with you." }, layout: "wide",
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
        body: "工作流最终把所有权交还给创作者：先试玩，再在本地保存和重新打开，最后把素材、关卡、规则和运行时打包成离线 ZIP。",
        visual: { kind: "flow", eyebrow: "创作者可控的完整链路", nodes: ["创意原点", "Agent 复核", "获批 GameSpec", "素材与运行时", "本地存档", "离线 ZIP"], note: "Prompt 只是开始；能带走的游戏才算完成。" }, layout: "wide",
      },
    ],
  },
  "rainy-arcade": {
    en: [
      {
        step: "01", title: "One Rainy-Night Room, Many Ways to Play",
        body: "The arcade is both an emotional center and a navigation hub. Each cabinet can change genres without breaking the continuity of the same night: Block City is about rebuilding the road home, while Rain City is about seeing through a loop built from regret and false rules.",
        visual: { kind: "gallery", images: [
          { src: "/portfolio/rain-arcade-hero.png", alt: "Rainy Night Arcade Title Screen", fit: "cover" },
          { src: "/portfolio/rain-arcade-hall.png", alt: "The Arcade with Two Playable Cabinets", fit: "cover" },
        ] }, layout: "wide",
      },
      {
        step: "02", title: "Block City Rebuilds Trust Through Objects and Space",
        body: "Players reconnect the road, identify old belongings, compare memories with physical evidence, find the right house, and complete the reconstruction in the order implied by the clues. The difficulty moves from isolation to recognition, and finally toward reunion.",
        visual: { kind: "flow", eyebrow: "Block City", nodes: ["Reconnect the Road", "Find Old Belongings", "Check the Evidence", "Recognize Home", "Complete the Reconstruction", "Reunion"], note: "Every puzzle returns the same promise: someone is still waiting." },
      },
      {
        step: "03", title: "Rain City Makes Observation the Price of Departure",
        body: "A torn ticket, a watch that runs backward, passengers trapped in ritual, and six broadcast rules form the loop. Players compare what the city says with what the scene actually shows, identify the false rule, and earn permission to leave.",
        visual: { kind: "image", src: "/portfolio/rain-city.png", alt: "Rain City Station and Train World", fit: "cover" }, layout: "wide",
      },
      {
        step: "04", title: "Player Profiles Stay Local—and Stay Modest",
        body: "Action counts, stage entries, hints, evidence checks, duration, and completion status remain in the browser. Four entertainment-oriented dimensions turn those signals into accessible play feedback while showing the evidence and stating clearly that the result is not a psychological diagnosis.",
        visual: { kind: "image", src: "/portfolio/rain-player-profile.png", alt: "Rainy Night Four-Dimension Player Profile Using Clearly Labeled Sample Data", fit: "cover" }, layout: "wide",
      },
      {
        step: "05", title: "Aggregate Playtest Reports Without Running a Server",
        body: "Players export anonymous JSON only when they choose to. The Developer Observatory can import multiple reports, validate them, deduplicate them by randomized session ID, and display completion, funnels, duration, hints, retries, and profile-code distribution entirely on-device.",
        visual: { kind: "image", src: "/portfolio/rain-developer-analytics.png", alt: "Rainy Night Developer Observatory Using Clearly Labeled Anonymous Sample Data", fit: "cover" }, layout: "wide",
      },
    ],
    zh: [
      {
        step: "01", title: "一间雨夜房间，装下不同玩法",
        body: "游戏厅既是情绪中心，也是导航中心。每台街机都可以更换玩法类型，却不会切断同一个夜晚：《积木城》讲重建回家的路，《雨城》讲看穿由遗憾和虚假规则组成的循环。",
        visual: { kind: "gallery", images: [
          { src: "/portfolio/rain-arcade-hero.png", alt: "雨夜游戏厅标题画面", fit: "cover" },
          { src: "/portfolio/rain-arcade-hall.png", alt: "拥有两台可玩街机的游戏厅", fit: "cover" },
        ] }, layout: "wide",
      },
      {
        step: "02", title: "《积木城》用物件与空间重新建立信任",
        body: "玩家先接回道路，再辨认旧物、把记忆和现场证据对照起来、找出正确房屋，并按线索顺序完成拼装。难度从隔离逐步过渡到辨认，最终通向重逢。",
        visual: { kind: "flow", eyebrow: "积木城", nodes: ["接回道路", "寻找旧物", "核对证据", "认出家", "完成拼装", "重逢"], note: "每个谜题都归还同一个承诺：仍然有人在等。" },
      },
      {
        step: "03", title: "《雨城》把观察变成离开的条件",
        body: "破碎车票、倒走的手表、困在仪式里的乘客和六条广播规则共同组成循环。玩家比较城市所说的内容与场景真正展示的证据，选出假规则后获得离站许可。",
        visual: { kind: "image", src: "/portfolio/rain-city.png", alt: "雨城车站与列车世界", fit: "cover" }, layout: "wide",
      },
      {
        step: "04", title: "玩家画像保持本地，也保持克制",
        body: "操作次数、阶段进入、提示、核对、时长与完成状态只留在浏览器。这些数据再由四个娱乐向维度整理成容易看懂的玩法反馈，同时公开依据，并明确它不是心理诊断。",
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
        step: "01", title: "Difficulty Is Part of the Narrative",
        body: "Seven standard levels move through childhood, school, social pressure, and self-acceptance. “Refusing to be defined by others” is not confined to dialogue; players experience it through jumping, traps, recovery, and repeated attempts.",
        visual: { kind: "image", src: "/portfolio/iwbtz-stage-select.png", alt: "IWBTZ Level Select Organized Around Memories", fit: "cover" }, layout: "wide",
      },
      {
        step: "02", title: "Each Level Changes Its Visual Language—and Its Movement Pressure",
        body: "Graybox prototypes, industrial ruins, neon districts, and a small town create different rhythms through platform silhouettes, sightlines, and obstacle density, while preserving one precise movement language.",
        visual: { kind: "gallery", images: [
          { src: "/portfolio/iwbtz-level-industrial.png", alt: "Industrial IWBTZ Level", fit: "cover" },
          { src: "/portfolio/iwbtz-level-city.png", alt: "Neon-City IWBTZ Level", fit: "cover" },
          { src: "/portfolio/iwbtz-level-town.png", alt: "Small-Town IWBTZ Level", fit: "cover" },
          { src: "/portfolio/iwbtz-level-prototype.png", alt: "Graybox Prototype Used to Tune Jumping", fit: "cover" },
        ] }, layout: "wide",
      },
      {
        step: "03", title: "Bosses Escalate by Layering Patterns",
        body: "All four boss battles are built on readable attack languages. Every 25% drop in health unlocks a new pattern or layers it onto existing ones, forcing players to shift attention instead of merely absorbing more damage.",
        visual: { kind: "image", src: "/portfolio/iwbtz-level-boss.png", alt: "IWBTZ Boss and Environmental Hazards", fit: "cover" },
      },
      {
        step: "04", title: "DYOC Turns AI Output into Usable Character Parts",
        body: "The randomize button supports both a fully local path and an online AI path. Generated armor, hair, facial accessories, weapons, and skin feed into the same application function, synchronize with saved indices, and refresh the same live preview.",
        visual: { kind: "gallery", images: [
          { src: "/portfolio/iwbtz-dyoc-flow.png", alt: "DYOC Random and AI Generation Flow" },
          { src: "/portfolio/iwbtz-dyoc-result.png", alt: "IWBTZ Character Customization Result", fit: "cover" },
        ] }, layout: "wide",
      },
      {
        step: "05", title: "Playtesting Changed Where the Story Appears",
        body: "More than 70% of playtesters skipped the original tutorial, causing about 30% to miss essential story context. After shortening the text, moving essential narrative into the main levels, and giving the tutorial more meaningful mechanical challenges, tutorial completion rose from about 28% to about 60%. Willingness to continue playing increased by 25%.",
        visual: { kind: "image", src: "/portfolio/iwbtz-failure.png", alt: "IWBTZ Failure and Quick-Restart Screen", fit: "cover" }, layout: "wide",
      },
    ],
    zh: [
      {
        step: "01", title: "难度本身就是叙事",
        body: "七个常规关卡沿童年、校园、社会压力与自我和解展开。“拒绝被他人定义”不只写在文本里，玩家会在跳跃、陷阱、恢复和反复尝试中亲自经历它。",
        visual: { kind: "image", src: "/portfolio/iwbtz-stage-select.png", alt: "IWBTZ 以记忆组织的关卡选择画面", fit: "cover" }, layout: "wide",
      },
      {
        step: "02", title: "每关都会更换视觉语法，也改变移动压力",
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
        body: "四场 Boss 战都建立在可读的攻击语法上。生命值每下降 25%，新的攻击模式就会解锁或与已有模式叠加，让玩家不断切换注意力，而不只是承受更高伤害。",
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
        body: "超过 70% 的试玩者跳过了原教程，约 30% 因此错过必要剧情。缩短文本、把必要叙事移进主关卡、让教程承担更真实的操作挑战后，教程完成率从约 28% 升到约 60%。愿意继续游玩的试玩者增加了 25%。",
        visual: { kind: "image", src: "/portfolio/iwbtz-failure.png", alt: "IWBTZ 失败与快速重试画面", fit: "cover" }, layout: "wide",
      },
    ],
  },
  "auto-tune": {
    en: [
      { step: "01", title: "One Extension, Three Posting Interfaces", body: "The extension identifies the current supported tab, keeps one consistent control panel, and isolates the DOM selectors required by X, Facebook, and Instagram in separate platform adapters.", visual: { kind: "image", src: "/portfolio/auto-reply-control.webp", alt: "Auto Tune Extension Control Panel", fit: "cover" } },
      { step: "02", title: "Random Drafts Always Remain Editable", body: "Random Chinese and English drafts first appear in the panel, then START acts on the current page. Local state keeps the workflow running without an external account system.", visual: { kind: "gallery", images: [{ src: "/portfolio/auto-reply-x-zh.png", alt: "Chinese Workflow on X", fit: "cover" }, { src: "/portfolio/auto-reply-facebook-en.png", alt: "English Workflow on Facebook", fit: "cover" }] } },
      { step: "03", title: "START and AUTO REPLY Are Different Capabilities", body: "START works on supported X, Facebook, and Instagram pages. AUTO REPLY has a narrower scope: it is limited to X, uses a fixed reply, and waits a random 1–30 seconds.", visual: { kind: "flow", eyebrow: "Actual Supported Scope", nodes: ["Detect the Tab", "Generate / Edit a Draft", "START: X / FB / IG", "AUTO REPLY: X Only"], note: "The portfolio states the current boundaries clearly instead of making the prototype sound more capable than it is." } },
      { step: "04", title: "Keep Platform Differences at the Edges", body: "Platform adapters handle selectors and page lifecycles, while settings, state, and storage remain shared. The architecture stays clear without assuming that every site fails in the same way.", visual: { kind: "code", eyebrow: "Extension Architecture", lines: ["Shared Panel + Local State", "        ↓", "X Adapter | Facebook Adapter | Instagram Adapter", "        ↓", "Visible State + Bounded Actions"], note: "A Manifest V3 service worker and content scripts coordinate work on the page." } },
    ],
    zh: [
      { step: "01", title: "一个扩展，三个发帖界面", body: "扩展识别当前受支持标签页，保持控制面板统一，并把 X、Facebook 与 Instagram 所需 DOM 选择器隔离在各自适配层。", visual: { kind: "image", src: "/portfolio/auto-reply-control.webp", alt: "Auto Tune 扩展控制面板", fit: "cover" } },
      { step: "02", title: "随机草稿始终可以编辑", body: "中文与英文随机草稿先出现在面板里，再由 START 操作当前页面；本地状态让工作流无需外部账号系统也能继续。", visual: { kind: "gallery", images: [{ src: "/portfolio/auto-reply-x-zh.png", alt: "X 中的中文工作流", fit: "cover" }, { src: "/portfolio/auto-reply-facebook-en.png", alt: "Facebook 中的英文工作流", fit: "cover" }] } },
      { step: "03", title: "START 与 AUTO REPLY 是两种能力", body: "START 可在受支持的 X、Facebook 与 Instagram 页面工作；AUTO REPLY 的范围更窄：仅限 X、使用固定回复，并随机延迟 1 到 30 秒。", visual: { kind: "flow", eyebrow: "真实支持范围", nodes: ["识别标签页", "生成 / 编辑草稿", "START：X / FB / IG", "AUTO REPLY：仅 X"], note: "作品集说清当前边界，不把原型描述得比实际更强。" } },
      { step: "04", title: "平台差异留在边缘层", body: "选择器与页面生命周期交给平台适配器处理，设置、状态与存储则保持共享。架构因此清晰，也不假设所有网站会以同样方式失败。", visual: { kind: "code", eyebrow: "扩展结构", lines: ["共享面板 + 本地状态", "        ↓", "X 适配器 | Facebook 适配器 | Instagram 适配器", "        ↓", "可见状态 + 有边界的动作"], note: "Manifest V3 Service Worker 与 Content Script 协调页面工作。" } },
    ],
  },
  "study-assistant": {
    en: [
      { step: "01", title: "Turn the Source Material into the Workspace", body: "Text selection, translation, highlighting, phrase collection, notes, and focus timing remain beside the material, so readers no longer need to move among separate applications.", visual: { kind: "image", src: "/portfolio/web-study-workspace.webp", alt: "Literature Research Assistant Working Inside the Source Page" } },
      { step: "02", title: "Carry Highlights Across a Changing Page", body: "Stable page identity, DOM paths, text fallback, and batched MutationObserver recovery work together across refreshes and asynchronous node replacement.", visual: { kind: "flow", eyebrow: "Annotation Recovery Flow", nodes: ["Selection Range", "DOM Path", "Local Record", "Text Fallback", "Change Recovery"], note: "Page changes remain visible and reversible, while extension styles stay contained instead of leaking into the host page." } },
      { step: "03", title: "Bring Local Documents into the Same Reading Loop", body: "The built-in reader supports PDF, DOCX, HTML, and TXT. Notes, saved phrases, and mind-map branches always remain connected to a stable source identity.", visual: { kind: "image", src: "/portfolio/web-study-map.webp", alt: "Source-Linked Mind Map and Notes" } },
      { step: "04", title: "Compatibility Is a Product Capability", body: "Chrome, Edge, and Firefox share the core workflow while accounting for differences in browser manifests and runtimes. Translation can route through MyMemory, LibreTranslate, Google, or DeepL instead of being locked to a single platform.", visual: { kind: "code", eyebrow: "Cross-Browser Architecture", lines: ["Shadow DOM Panel", "Web Page | File URL | Local Reader", "Chrome / Edge MV3 | Firefox Package", "Local Data + Optional Translation Routes"], note: "The extension protects both the host page and the reader’s saved work." } },
    ],
    zh: [
      { step: "01", title: "让原始资料本身成为工作区", body: "划词、翻译、高亮、词句收藏、笔记与专注计时都留在材料旁边，读者不必在多个独立应用之间往返。", visual: { kind: "image", src: "/portfolio/web-study-workspace.webp", alt: "文献查阅辅助工具在原始页面中工作" } },
      { step: "02", title: "让高亮穿过不断变化的页面", body: "稳定页面身份、DOM 路径、文本回退与 MutationObserver 批量恢复共同应对刷新和异步节点替换。", visual: { kind: "flow", eyebrow: "标注恢复流程", nodes: ["选区 Range", "DOM 路径", "本地记录", "文本回退", "变更恢复"], note: "页面变化保持可见与可撤回，扩展样式也不会泄漏到宿主页面。" } },
      { step: "03", title: "本地文档进入同一条阅读闭环", body: "内置阅读器支持 PDF、DOCX、HTML 与 TXT；笔记、词句收藏和导图分支始终连接到稳定来源身份。", visual: { kind: "image", src: "/portfolio/web-study-map.webp", alt: "与页面关联的思维导图与笔记" } },
      { step: "04", title: "兼容性也是产品能力", body: "Chrome、Edge 与 Firefox 共享主要工作流，同时处理各浏览器清单和运行时差异；翻译可选择 MyMemory、LibreTranslate、Google 或 DeepL，而不是锁定单一平台。", visual: { kind: "code", eyebrow: "跨浏览器结构", lines: ["Shadow DOM 面板", "网页 | 文件地址 | 本地阅读器", "Chrome / Edge MV3 | Firefox 包", "本地数据 + 可选翻译路线"], note: "扩展同时保护宿主页面和读者已经保存的工作。" } },
    ],
  },
};

export function getProjectCaseStudy(projectId: ProjectId, locale: Locale) {
  return projectCaseStudies[projectId][locale];
}
