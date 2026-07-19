import type { ProjectArchive } from "@/types";

export const projects: ProjectArchive[] = [
  {
    id: "pixel-seed",
    title: "Pixel Seed",
    oneLiner: "A prompt-to-play system that turns an idea into a coherent, playable pixel world.",
    category: "AI Product · Game Systems",
    period: "2024 · MSc project",
    status: "Independent · Completed product",
    featured: true,
    context:
      "Generative game tools often stop at producing an image. Pixel Seed explores what it takes to carry a natural-language idea through asset generation, level constraints, runtime assembly, and an immediately playable browser experience.",
    problem:
      "Characters, backgrounds, terrain, and obstacles must share a visual language while also satisfying collision, scale, transparency, and level-design rules.",
    role:
      "Product owner and full-stack builder across user research, product definition, prompt and asset pipelines, interaction design, game logic, and deployment.",
    process: [
      "Defined the prompt-to-play journey through questionnaires, interviews, and competitive analysis",
      "Separated generation prompts by asset type and converted outputs into runtime-ready game assets",
      "Designed a five-level structure with progression, hazards, and playable validation",
      "Iterated through three sprints with seed-user feedback",
    ],
    keyDecisions: [
      "Treat generation as a constrained pipeline instead of a single model call",
      "Make playability the proof of generation quality",
      "Keep product UI and the game runtime in one web architecture",
    ],
    technology: ["Next.js", "React", "TypeScript", "Zustand", "Qwen-Image", "2D game runtime"],
    challenges: [
      "Maintaining palette and dimension consistency across generated assets",
      "Mapping free-form prompts into reliable level templates",
      "Keeping multi-provider generation failures recoverable",
    ],
    outcome:
      "A completed browser product where users can describe a theme, generate a coordinated asset set, assemble a level, and play the result.",
    screenshots: [
      "/portfolio/pixel-seed-hero.webp",
      "/portfolio/pixel-seed-system.webp",
    ],
    github: "https://github.com/zbjgrhr/Prompt-Play_Pixel-Game",
    liveDemo: "https://prompt-play-pixel-game.vercel.app",
    learned: [
      "Creative AI feels intentional only when constraints are designed as carefully as prompts",
      "A playable loop communicates system quality faster than a gallery of generated images",
    ],
    metrics: [
      { value: "120", label: "questionnaire responses" },
      { value: "22", label: "in-depth interviews" },
      { value: "50", label: "seed users" },
      { value: "+27%", label: "generation completion" },
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
      "/portfolio/auto-reply-control.webp",
      "/portfolio/auto-reply-flow.webp",
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
      "/portfolio/innerseed-hero.webp",
      "/portfolio/innerseed-system.webp",
      "/portfolio/innerseed-review.webp",
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
      "/portfolio/eeg-processing.webp",
      "/portfolio/eye-tracking.webp",
      "/portfolio/multimodal-fusion.webp",
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
