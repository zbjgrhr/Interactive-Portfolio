import type { ProjectArchive } from "@/types";

export const projects: ProjectArchive[] = [
  {
    id: "pixel-seed",
    title: "Pixel World",
    oneLiner: "Write a world once; ten agents turn it into a reviewed, beautifully generated, locally saved game you can play and take home.",
    category: "Multi-Agent AI Product · Game Creation System",
    period: "2024–2026 · Independent product",
    status: "Live · Multi-agent edition",
    featured: true,
    context:
      "Most generative game tools stop at a prompt, a concept image, or a disconnected asset pack. Pixel World is a complete creation environment: it carries a maker's premise through a visible ten-agent studio, cross-reviewed GameSpec V3, multi-provider generation, a bright adaptive product interface, a custom playable runtime, local persistence, and offline delivery.",
    problem:
      "A free-form idea has to become one coherent game—story, mechanics, art direction, asset manifest, levels, audio, runtime rules, save state, and export—without hiding cost, failure, or creative decisions from the maker. The result must look like one authored world and work like one complete product.",
    role:
      "Independent product owner and full-stack builder across product architecture, multi-agent orchestration, provider routing, GameSpec and review contracts, asset pipelines, interaction design, the custom 2D runtime, persistence, export, and deployment.",
    process: [
      "Capture the game name, story, level count, and non-negotiable constraints, then complete structured GameSpec V3 fields without rewriting the creator's premise",
      "Run ten specialist agents for direction, narrative, mechanics, art, levels, integration, consistency, engine QA, revision, and asset coordination",
      "Cross-review every proposal, separate blockers from optional improvements, and require creator approval before generation spends credits",
      "Choose from eight image routes and three direct Agent platforms, lock one visual model per project, and generate editable level-aware asset queues in parallel",
      "Use the generated game's cover and background to transform the Pixel World homepage into the new world instead of leaving a generic builder shell",
      "Drive the custom runtime from the same specification, then play, save, reload, and export the complete game as an offline ZIP",
    ],
    keyDecisions: [
      "Separate planning models from image models while locking each project to one visual model for style consistency",
      "Treat Agent outputs as proposals under creator approval rather than allowing autonomous generation to spend credits or rewrite the premise",
      "Keep agent runs and asset tasks independently retryable so one failure does not erase completed work",
      "Make every asset, level assignment, runtime constraint, and optional QA recommendation inspectable before delivery",
      "Let each generated world's own cover replace the product's default hero so creation is reflected immediately in the interface",
      "Use playability, local save/load, and offline export—not the preview image—as the final proof of system quality",
    ],
    technology: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Ant Design",
      "Zustand",
      "Multi-agent orchestration",
      "GameSpec V3",
      "OpenRouter",
      "OpenAI",
      "Alibaba DashScope",
      "Cloudflare Workers AI",
      "FLUX.2 Klein 4B",
      "IndexedDB",
      "Local-first persistence",
      "Web Audio",
      "Custom 2D runtime",
      "Offline ZIP packaging",
    ],
    challenges: [
      "Keeping ten specialist agents aligned without turning their outputs into an opaque chain of prompts",
      "Preserving the creator's explicit decisions while agents fill gaps, resolve contradictions, and verify engine constraints",
      "Normalizing provider credentials, regions, pricing models, and response formats behind one understandable interface",
      "Maintaining visual consistency across many image tasks while preserving item-level retry and level assignment",
      "Letting generated art transform the product shell without sacrificing interface clarity or project recovery",
      "Turning generated rules and assets into a stable keyboard-and-touch runtime that still works after ZIP export",
    ],
    outcome:
      "A live prompt-to-game product that turns an approved creative premise into a reviewed specification, recoverable generation plan, visually coherent world, adaptive product cover, playable campaign, local save, and downloadable offline game. The new Darabangba project demonstrates a bright two-level inverted fairy tale with distinct scenes, melee and ranged combat, collectibles, and a final Prince boss.",
    screenshots: [
      "/portfolio/pixel-world-v5-generated-cover.png",
      "/portfolio/pixel-world-v5-dynamic-home.png",
      "/portfolio/pixel-world-v5-agent-studio.png",
      "/portfolio/pixel-world-v5-parallel-generation.png",
      "/portfolio/pixel-world-v5-gameplay-level-1.png",
      "/portfolio/pixel-world-v5-gameplay-boss.png",
    ],
    github: "https://github.com/zbjgrhr/PIXEL-WORLD",
    liveDemo: "https://pixel-world-silk.vercel.app/",
    learned: [
      "Multi-agent systems become useful when responsibility, review order, failure, and creator approval are visible",
      "Model choice is a product decision involving style, cost, region, and recovery—not a hidden implementation detail",
      "Constraints become creative controls when the maker can inspect, edit, approve, and retry them",
      "A generated cover can make the creation system itself feel alive when it remains tied to recoverable project state",
      "A generated world is complete only when it survives play, local persistence, and delivery",
    ],
    metrics: [
      { value: "10", label: "specialist agents" },
      { value: "11", label: "model-provider routes" },
      { value: "V3", label: "reviewed game specification" },
      { value: "ZIP", label: "playable offline delivery" },
    ],
  },
  {
    id: "browser-tools",
    title: "Web Study Assistant",
    oneLiner: "A cross-browser learning workspace that keeps reading, translation, notes, and structure on the page.",
    category: "Browser Product · Learning Tools",
    period: "2025 · Independent project",
    status: "Product design · Working extension",
    featured: true,
    context:
      "Deep reading on the web is fragmented across translation tools, note apps, timers, local document readers, and mind maps. The extension brings those actions into a single, reversible workspace.",
    problem:
      "Highlights and notes must survive reloads, asynchronous DOM changes, local files, and hostile page styles without breaking the host page.",
    role:
      "Product ownership, user research, information architecture, interaction design, extension architecture, compatibility planning, and validation.",
    process: [
      "Mapped intensive reading, translation, focus, and knowledge-collection scenarios",
      "Prioritized 26 requirements with a RICE model",
      "Designed a persistent page identity and highlight-restoration strategy",
      "Validated the highlight workflow through two A/B-test plans",
    ],
    keyDecisions: [
      "Keep transformations visible and reversible",
      "Use a unified page key across web pages, local files, and the document reader",
      "Isolate interface styles from host pages with a Shadow Root",
    ],
    technology: ["Browser extensions", "TypeScript", "DOM Range", "MutationObserver", "PDF.js", "Mammoth"],
    challenges: [
      "Restoring highlights after DOM mutation",
      "Preventing CSS and z-index collisions",
      "Maintaining state across web, PDF, and DOCX contexts",
    ],
    outcome:
      "A working learning assistant that connects selection, action, saving, mind-map structure, and reopening into one flow.",
    screenshots: [
      "/portfolio/web-study-workspace.webp",
      "/portfolio/web-study-map.webp",
    ],
    github: "https://github.com/zbjgrhr/web-translate-highlight-mind-map-notes-timer",
    learned: [
      "Persistence is part of the user experience, not only a storage concern",
      "Browser tools earn trust when users can see and undo what changed",
    ],
    metrics: [
      { value: "320", label: "learners surveyed" },
      { value: "26", label: "requirements prioritized" },
      { value: "+22%", label: "feature usage" },
      { value: "+30%", label: "first-day usage" },
    ],
  },
  {
    id: "auto-reply",
    title: "Social Media Auto Reply",
    oneLiner: "A human-in-the-loop control center for drafting, reviewing, scheduling, and stopping cross-platform replies.",
    category: "Automation · Human Control",
    period: "2025 · Independent project",
    status: "Completed · Verified on three web platforms",
    context:
      "Cross-platform communication automation becomes risky when drafting, timing, platform state, and human review are hidden behind a script.",
    problem:
      "Facebook, X, and Instagram expose different page structures while users still need one understandable queue, review boundary, and emergency stop.",
    role:
      "Product design, workflow architecture, cross-platform page-state research, and product implementation.",
    process: [
      "Identified the current conversation and collected only the necessary context",
      "Generated a draft rather than sending immediately",
      "Added manual review, delayed send, pause, and stop controls",
      "Tested page recognition across three web platforms",
    ],
    keyDecisions: [
      "Make review a required state instead of an optional afterthought",
      "Expose the queue, timer, platform, and send status in one control center",
      "Keep a visible stop control available at all times",
    ],
    technology: ["Browser automation", "TypeScript", "DOM adapters", "Scheduling", "Prompt workflows"],
    challenges: [
      "Platform-specific DOM changes",
      "Keeping browser state and background schedules consistent",
      "Designing safe automation boundaries",
    ],
    outcome:
      "A completed automation product that supports drafting and scheduling without removing human control.",
    screenshots: [
      "/portfolio/auto-reply-facebook-en.png",
      "/portfolio/auto-reply-x-zh.png",
    ],
    github: "https://github.com/zbjgrhr/Social-Media_Auto-Reply",
    learned: [
      "The most important automation feature can be the ability to pause",
      "Cross-platform products need a shared state model and explicit adapters",
    ],
  },
  {
    id: "emotion-chatbot",
    title: "InnerSeed",
    oneLiner: "An emotional-cognitive dialogue system designed around context, response strategy, editable memory, and safety.",
    category: "Responsible AI · Conversation UX",
    period: "2026 · Independent product",
    status: "Completed product · Evaluation complete",
    featured: true,
    context:
      "Supportive conversational products often classify an emotion and rush to answer. InnerSeed instead treats emotion, intent, relationship context, confidence, and risk as a changing state.",
    problem:
      "A warm answer is not automatically a safe or useful answer. The system needs explainable strategy selection, boundaries, reviewable memory, and testable escalation behavior.",
    role:
      "Product positioning, user research, dialogue-flow design, emotion schema, response-policy design, privacy boundaries, and evaluation planning.",
    process: [
      "Mapped emotional-release, confusion-sharing, and self-growth scenarios",
      "Designed an affective state vector and ambiguity router",
      "Separated listening, reflection, clarification, reframing, action, and boundary strategies",
      "Defined editable rolling memory and a risk-aware evaluation matrix",
    ],
    keyDecisions: [
      "Treat emotion as context rather than a single label",
      "Make silence and clarification valid interaction modes",
      "Keep memory inspectable, editable, and removable by the user",
    ],
    technology: ["Conversational AI", "Prompt engineering", "Dialogue policy", "Safety evaluation", "Privacy design"],
    challenges: [
      "Avoiding false certainty about emotional interpretation",
      "Maintaining warmth without implying clinical care",
      "Making safety behavior testable instead of decorative",
    ],
    outcome:
      "A product and system blueprint that connects emotional state, response strategy, memory, safety checks, and evaluation in one reviewable flow.",
    screenshots: [
      "/portfolio/innerseed-conversation-v2.png",
      "/portfolio/innerseed-state-inspector.png",
      "/portfolio/innerseed-review-v2.png",
    ],
    learned: [
      "Not every signal needs to be corrected",
      "A thoughtful system makes its uncertainty and boundaries visible",
    ],
    metrics: [
      { value: "30", label: "in-depth interviews" },
      { value: "200+", label: "questionnaire responses" },
      { value: "50", label: "evaluation participants" },
      { value: "85%", label: "reported satisfaction" },
    ],
  },
  {
    id: "multimodal-research",
    title: "EEG + Eye-Tracking Research",
    oneLiner: "Turning noisy biological signals into aligned, interpretable, and responsibly evaluated features.",
    category: "Multimodal AI · Research",
    period: "2025–present · Mentor-guided research",
    status: "Active research collaboration",
    featured: true,
    context:
      "At Lanzhou University, multimodal depression-recognition research combines EEG and remote eye-tracking signals collected under experimental stimuli.",
    problem:
      "The modalities differ in sampling rate, delay, missing segments, and noise. Useful modeling starts with event alignment, quality control, and subject-wise validation.",
    role:
      "Research assistance across data cleaning, feature organization, tree-model experiments, parameter tuning, evaluation, visualization, literature review, and research discussion.",
    process: [
      "Aligned EEG and gaze windows around shared experimental events",
      "Separated artifacts and organized interpretable feature families",
      "Compared single-modality baselines with multimodal fusion",
      "Evaluated with subject-wise splits and modality ablation",
    ],
    keyDecisions: [
      "Prioritize quality control before model complexity",
      "Prevent subject leakage with GroupKFold or leave-one-subject-out validation",
      "Report modality ablation and clear non-clinical boundaries",
    ],
    technology: ["Python", "Pandas", "Jupyter", "EEG", "Eye tracking", "Feature engineering", "Tree models"],
    challenges: [
      "Synchronizing modalities with different clocks",
      "Avoiding leakage across participant segments",
      "Keeping derived features interpretable",
    ],
    outcome:
      "A disciplined research workflow that moves from raw acquisition through alignment, features, fusion, evaluation, and interpretable reporting.",
    screenshots: [
      "/portfolio/eeg-qc-workstation.png",
      "/portfolio/eye-tracking-workstation.png",
      "/portfolio/multimodal-evaluation-workstation.png",
    ],
    learned: [
      "Raw signals rarely explain themselves",
      "Responsible evaluation defines what a model is allowed to claim",
    ],
  },
];

export function getProject(id: string) {
  return projects.find((project) => project.id === id);
}
