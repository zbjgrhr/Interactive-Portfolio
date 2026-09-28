import type { ProjectArchive } from "@/types";

export const projects: ProjectArchive[] = [
  {
    id: "pixel-world",
    title: "Pixel World",
    oneLiner: "Turn one creative premise into a reviewed specification, coherent assets, playable levels, a local save, and an offline game package.",
    category: "Multi-agent creation system · Playable AI product",
    period: "2025.09–2026.02 · Independent product",
    status: "Live product · Active iteration",
    featured: true,
    context:
      "Pixel World treats generative game creation as a production process rather than a single prompt. A creator defines the premise and constraints, ten specialist agents plan and cross-review the world, and the same approved GameSpec drives assets, levels, runtime behavior, persistence, and delivery.",
    problem:
      "A generated game has to keep story, mechanics, art direction, level structure, assets, cost, and runtime rules aligned. The creator also needs to see conflicts, approve expensive generation, retry failed tasks, and retain ownership of the result.",
    role:
      "Independent product owner and full-stack builder across user research, GameSpec V3, agent roles and review contracts, provider routing, asset orchestration, interface design, custom 2D runtime, local persistence, and offline export.",
    process: [
      "Translate the creator's name, story, level count, and non-negotiable rules into editable GameSpec V3 fields",
      "Run ten specialist agents across direction, narrative, mechanics, art, level design, integration, consistency, engine QA, revision, and asset coordination",
      "Cross-review proposals, expose blockers, and wait for creator approval before generation consumes credits",
      "Generate assets through selectable providers while locking one visual model per project for consistency",
      "Use the approved specification to assemble a playable runtime, then test save, reload, and offline ZIP delivery",
    ],
    keyDecisions: [
      "Agent output remains a proposal until the creator approves it",
      "Failed agent runs and asset tasks can retry independently without discarding completed work",
      "Planning models and image models stay separable, while each project locks a single visual route",
      "Playability, recovery, persistence, and export define completion rather than a polished preview image",
    ],
    technology: [
      "Next.js 15", "React 19", "TypeScript", "Zustand", "Multi-agent orchestration", "GameSpec V3",
      "OpenRouter", "OpenAI", "Alibaba DashScope", "Cloudflare Workers AI", "IndexedDB", "Web Audio", "Offline ZIP",
    ],
    challenges: [
      "Keeping ten agents aligned while preserving the creator's explicit decisions",
      "Normalizing model providers, regions, credentials, price patterns, and failure states",
      "Maintaining visual consistency across many independently retryable assets",
      "Turning generated rules and images into a stable keyboard-and-touch game runtime",
    ],
    outcome:
      "A live prompt-to-play environment whose workflow stays visible from brief to owned game. The generated world can change the product's own cover, run as a playable campaign, persist locally, and leave the platform as an offline ZIP.",
    screenshots: [
      "/portfolio/pixel-world-v5-platform-overview.png",
      "/portfolio/pixel-world-v5-agent-studio.png",
      "/portfolio/pixel-world-v5-asset-system.png",
      "/portfolio/pixel-world-v5-gameplay-level-1.png",
    ],
    github: "https://github.com/zbjgrhr/PIXEL-WORLD",
    liveDemo: "https://pixel-world-silk.vercel.app/",
    learned: [
      "Multi-agent workflows earn trust when responsibility, review order, cost, and failure remain visible",
      "A generated world is complete only when the creator can inspect it, play it, save it, and take it away",
    ],
    metrics: [
      { value: "10", label: "specialist agents" },
      { value: "~80", label: "survey responses" },
      { value: "~15", label: "in-depth interviews" },
      { value: "20–30", label: "playtest participants" },
    ],
  },
  {
    id: "rainy-arcade",
    title: "Rainy Night Arcade",
    oneLiner: "A story arcade where each cabinet changes genre, while player behavior quietly becomes a local, exportable playstyle report.",
    category: "Narrative game design · Local player analytics",
    period: "2026.06–09 · Independent game",
    status: "v0.7.0 · Two complete worlds",
    featured: true,
    context:
      "A rain-soaked arcade connects self-contained worlds through one nocturnal frame story. Block City combines route repair, object recognition, evidence matching, and spatial assembly. Rain City moves through ticket reconstruction, watch repair, rule deduction, failure loops, and departure.",
    problem:
      "The game needs to move between genres without losing emotional continuity. It also needs useful playtest evidence without accounts, servers, or invasive tracking, because the build must remain a static package that can open locally or deploy to Upma.",
    role:
      "Game design, world and narrative structure, puzzle systems, interaction flow, art direction, implementation review, audio integration, regression design, and the v0.7 local analytics specification and implementation.",
    process: [
      "Anchor every cabinet in the same rainy arcade, then give each world a distinct emotional question and interaction grammar",
      "Build Block City around repairing a route and reconstructing a home from objects, memories, and spatial clues",
      "Build Rain City around false rules, looping time, fragmented tickets, and an exit earned through observation",
      "Record anonymous action counts, stage visits, hints, retries, duration, and completion only in localStorage",
      "Turn those signals into an entertainment-only four-axis report and a developer dashboard that imports anonymous JSON files locally",
    ],
    keyDecisions: [
      "Keep completed scope explicit: Block City and Rain City are playable; Library City and Sea-Island City remain planned",
      "Preserve the original narrative and puzzles while adding analytics as an optional layer",
      "Collect no name, email, IP address, device identifier, or raw dialogue",
      "Make every report export user-initiated and every developer aggregation client-side",
    ],
    technology: ["HTML", "CSS", "Vanilla JavaScript", "LocalStorage", "Web Audio", "Anonymous JSON export", "CSV aggregation", "Static hosting"],
    challenges: [
      "Maintaining a coherent tone across route puzzles, evidence deduction, construction, and rule horror",
      "Making atmospheric audio support rather than obscure the reading rhythm",
      "Deriving useful playtest signals from local-only events without implying psychological certainty",
    ],
    outcome:
      "A static, locally playable two-world narrative game with persistent progress, audio, 22 regression checks, an optional player report, and an offline developer observatory for aggregated playtest evidence.",
    screenshots: [
      "/portfolio/rain-arcade-hero.png",
      "/portfolio/rain-arcade-hall.png",
      "/portfolio/rain-player-profile.png",
      "/portfolio/rain-developer-analytics.png",
    ],
    liveDemo: "https://grid-wmkf.upma.site/",
    learned: [
      "A shared frame can hold very different mechanics when each world resolves one emotional promise",
      "Analytics can help design decisions without becoming surveillance when collection stays local, minimal, and inspectable",
    ],
    metrics: [
      { value: "2", label: "complete playable worlds" },
      { value: "128", label: "confirmed Rain City lines" },
      { value: "22", label: "regression checks" },
      { value: "0", label: "personal identifiers collected" },
    ],
  },
  {
    id: "iwbtz",
    title: "I Wanna Be the Zomboy",
    oneLiner: "A hardcore platformer where traps, bosses, and character customization turn the pressure to be defined by others into something playable.",
    category: "Game design · Hardcore 2D platformer",
    period: "2025.04–09 · MSc graduation project",
    status: "Playable prototype · 7 stages + 4 bosses",
    featured: true,
    context:
      "Inspired by I Wanna Be the Guy and Plants vs. Zombies, IWBTZ follows childhood, school, social pressure, and self-reconciliation. Every jump carries mechanical risk and a narrative metaphor, while DYOC lets the player recompose the protagonist's appearance.",
    problem:
      "Hardcore platforming depends on precision, readable failure, and a fair restart rhythm. The project also explores where generative AI can support character variation without making the game dependent on a network connection.",
    role:
      "Game concept, narrative and level planning, boss behavior, progression systems, dynamic-difficulty concept, GameMaker implementation, AI-assisted DYOC flow, playtesting, and iteration.",
    process: [
      "Map seven regular stages to a narrative arc from external labels toward self-acceptance",
      "Design four bosses whose attack grammar changes as health crosses 25% thresholds",
      "Build platform, room-transition, save, settings, audio, weather, particle, and interface systems",
      "Implement DYOC with a pure random path plus an online AI path that falls back to local generation offline",
      "Use playtests to shorten text, move essential story into main levels, and raise the tutorial's mechanical relevance",
    ],
    keyDecisions: [
      "Make restart speed and attack readability part of the difficulty design",
      "Stack boss patterns at health thresholds rather than only increasing damage",
      "Keep character parts synchronized through one data model across random, AI, save, and preview states",
      "Treat AI generation as optional enrichment and preserve a working offline route",
    ],
    technology: ["GameMaker", "GML", "2D platform systems", "Boss state machines", "Particle weather", "HTTP API", "Offline fallback", "Save system"],
    challenges: [
      "Balancing precision with clarity in dense trap and bullet patterns",
      "Connecting narrative progression to mechanical escalation",
      "Keeping AI-generated parts compatible with the existing character-part library",
    ],
    outcome:
      "A playable graduation prototype with seven regular stages, four boss fights, multiple themed environments, persistent character-part selection, and an AI-assisted customization workflow that remains usable offline.",
    screenshots: [
      "/portfolio/iwbtz-menu.png",
      "/portfolio/iwbtz-stage-select.png",
      "/portfolio/iwbtz-level-city.png",
      "/portfolio/iwbtz-dyoc-result.png",
    ],
    learned: [
      "Difficulty feels fair when failure is readable and the return to agency is fast",
      "Customization becomes a system only when generation, validation, preview, and save state share one contract",
    ],
    metrics: [
      { value: "7", label: "regular stages" },
      { value: "4", label: "boss fights" },
      { value: "15+", label: "playtesters" },
      { value: "+25%", label: "reported continuation lift after iteration" },
    ],
  },
  {
    id: "auto-tune",
    title: "Auto Tune",
    oneLiner: "A Manifest V3 extension that exposes the mechanics and limits of browser-based social posting automation.",
    category: "Browser automation · Cross-platform prototype",
    period: "2026.06–09 · Independent project",
    status: "Working prototype · Chrome / Edge",
    context:
      "Auto Tune explores how one extension can operate across X, Facebook, and Instagram while keeping platform-specific page logic at the edge. It provides bilingual random draft generation, current-tab posting, local state, and an X-only delayed auto-reply mode.",
    problem:
      "Each platform exposes different editable surfaces and lifecycle behavior. Automation also becomes risky when scope and supported actions are described more broadly than the software actually performs.",
    role:
      "Product framing, extension architecture, shared state design, platform adapters, local persistence, bilingual controls, and implementation testing.",
    process: [
      "Define one shared extension core and isolate each platform's DOM selectors and activation rules",
      "Generate editable Chinese or English draft variants inside the extension panel",
      "Use START to post through the active supported tab, with explicit platform detection",
      "Limit AUTO REPLY to X and a fixed reply after a random 1–30 second delay",
    ],
    keyDecisions: [
      "Describe START and AUTO REPLY as separate capabilities instead of implying universal auto-reply support",
      "Keep preferences and working state local to the browser",
      "Expose supported platforms and current limitations in the interface and documentation",
    ],
    technology: ["Chrome Extension MV3", "JavaScript", "Content scripts", "Service worker", "DOM adapters", "Local browser storage"],
    challenges: ["Platform DOM changes", "Editable-surface detection", "Keeping background and page state synchronized", "Defining responsible product boundaries"],
    outcome:
      "A working Chrome and Edge prototype that demonstrates shared cross-platform posting logic while documenting the narrower scope of delayed reply automation.",
    screenshots: ["/portfolio/auto-reply-control.webp", "/portfolio/auto-reply-x-zh.png", "/portfolio/auto-reply-facebook-en.png"],
    github: "https://github.com/zbjgrhr/Social-Media_Auto-Reply",
    learned: [
      "Automation copy should be as precise as the capability itself",
      "Shared state reduces duplication, but platform-specific failure still needs explicit handling",
    ],
  },
  {
    id: "study-assistant",
    title: "Literature Reading Assistant",
    oneLiner: "A cross-browser workspace that keeps translation, highlights, notes, local documents, mind maps, and focus time beside the source.",
    category: "Browser product · Research workflow",
    period: "Independent project",
    status: "Working extension · Chrome / Edge / Firefox",
    context:
      "Literature reading fragments attention across translators, note apps, timers, document viewers, and mind-map tools. This extension brings the workflow into one isolated panel and preserves the relationship between saved material and its source page.",
    problem:
      "Highlights must survive refreshes and asynchronous DOM changes without damaging the host page. The same workflow must also support local PDF, DOCX, HTML, and TXT files across browser extension formats.",
    role:
      "Product definition, information architecture, browser extension implementation, highlight recovery, local document reader, translation routes, and compatibility design.",
    process: [
      "Keep selection, translation, highlighting, vocabulary, notes, and timer controls in one Shadow DOM panel",
      "Persist page-linked data locally and restore annotations through DOM paths plus text fallbacks",
      "Observe late page mutations before retrying highlight recovery",
      "Provide a local reader for PDF, DOCX, HTML, and TXT alongside a page-linked mind map",
    ],
    keyDecisions: [
      "Isolate interface styles with Shadow DOM",
      "Keep page transformations visible and reversible",
      "Use a stable page identity across web pages, file URLs, and the local document reader",
      "Support multiple translation providers rather than coupling the workflow to one endpoint",
    ],
    technology: ["Chrome / Edge / Firefox extensions", "Manifest V3", "Shadow DOM", "DOM Range", "MutationObserver", "PDF.js", "Mammoth", "Local storage"],
    challenges: ["Restoring highlights after node replacement", "Avoiding CSS and z-index collisions", "Normalizing local and remote page identities", "Maintaining cross-browser packaging"],
    outcome:
      "A working research companion that connects reading, translation, annotation, vocabulary, notes, focus time, local documents, and knowledge structure without forcing the reader to leave the source.",
    screenshots: ["/portfolio/web-study-workspace.webp", "/portfolio/web-study-map.webp"],
    github: "https://github.com/zbjgrhr/web-translate-highlight-mind-map-notes-timer",
    learned: [
      "Persistence is part of the reading experience, not only a storage concern",
      "Browser tools earn trust when users can see, undo, and recover what changed",
    ],
  },
];

export function getProject(id: string) {
  return projects.find((project) => project.id === id);
}
