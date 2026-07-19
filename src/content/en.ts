export interface ContentShape {
  brand: string;
  brandZh: string;
  name: string;
  nameZh: string;
  tagline: string;
  profile: string;
  coreAreas: string[];
  entry: {
    play: string;
    explore: string;
    continue: string;
    soundOn: string;
    soundOff: string;
    reducedMotion: string;
    howToPlay: string;
    credits: string;
    hint: string;
  };
  howToPlay: { title: string; body: string[] };
  credits: { title: string; body: string[] };
  hud: {
    pause: string;
    resume: string;
    sound: string;
    archive: string;
    skip: string;
    assist: string;
    explore: string;
    combo: string;
    memory: string;
  };
  chapters: {
    prologue: string;
    "movement-i": string;
    "movement-ii": string;
    "movement-iii": string;
    "movement-iv": string;
    coda: string;
  };
  narrative: Record<string, string>;
  explore: {
    title: string;
    subtitle: string;
    about: string;
    projects: string;
    contact: string;
    downloadCv: string;
    playInstead: string;
  };
  contact: {
    email: string;
    github: string;
    linkedin?: string;
    cvPath: string;
    portfolioPath: string;
  };
  coda: {
    title: string;
    line: string;
    replay: string;
    explore: string;
    autoplay: string;
  };
  archive: {
    close: string;
    context: string;
    problem: string;
    role: string;
    process: string;
    decisions: string;
    tech: string;
    challenges: string;
    outcome: string;
    learned: string;
    links: string;
  };
  pauseMenu: {
    title: string;
    resume: string;
    settings: string;
    exitExplore: string;
  };
}

export const en: ContentShape = {
  brand: "Resonance Archive",
  brandZh: "共鸣档案",
  name: "Huaxin Zhang",
  nameZh: "张铧心",
  tagline: "We take our time untangling the tedious parts, so players are left with confidence and the joy of discovery.",
  profile:
    "MSc Artificial Intelligence and Computer Science graduate combining AI product thinking, full-stack prototyping, creative technology, and mentor-guided multimodal research.",
  coreAreas: [
    "AI product systems",
    "Full-stack interactive prototypes",
    "Game and creative technology",
    "Responsible multimodal research",
  ],
  entry: {
    play: "ENTER THE PERFORMANCE",
    explore: "EXPLORE THE WORK",
    continue: "Continue",
    soundOn: "Sound On",
    soundOff: "Sound Off",
    reducedMotion: "Reduced Motion",
    howToPlay: "How to Play",
    credits: "Credits",
    hint: "Five projects become five independently playable stages. Every level is unlocked from the start.",
  },
  howToPlay: {
    title: "How to Play",
    body: [
      "D / F / Space / J / K — one key directly controls each lane",
      "Press on the beat — movement is never required before a hit",
      "Hold the matching key — sustain long notes",
      "E — open a project archive during MEMORY segments",
      "Esc — pause",
      "The avatar follows successful hits as visual feedback.",
      "Misses soften the world — they never end the piece.",
      "Combo develops the memory scroll above the piano.",
    ],
  },
  credits: {
    title: "Credits",
    body: [
      "Resonance Archive — interactive portfolio by Huaxin Zhang",
      "Five selected recordings of Csikos Post shape five distinct stage styles",
      "Built with Next.js, Phaser 3, and Web Audio",
    ],
  },
  hud: {
    pause: "Pause",
    resume: "Resume",
    sound: "Sound",
    archive: "Archives",
    skip: "Skip chapter",
    assist: "Assist",
    explore: "Explore",
    combo: "Combo",
    memory: "Memory",
  },
  chapters: {
    prologue: "Prologue",
    "movement-i": "Movement I — Pixel Seed",
    "movement-ii": "Movement II — Useful Systems",
    "movement-iii": "Movement III — Responsible Dialogue",
    "movement-iv": "Movement IV — Measured Signals",
    coda: "Coda",
  },
  narrative: {
    "prologue-1": "Every project begins with a signal.",
    "prologue-2": "Some become systems.",
    "prologue-3": "Some become worlds.",
    "prologue-4": "I make complex systems tangible, playable, and accountable.",
    "pixel-1": "A blank key waits for a prompt.",
    "pixel-2": "Form gathers from intention.",
    "pixel-3": "A world is not an image — it is a place you can enter.",
    "pixel-4": "Pixel Seed: from prompt to playable stage.",
    "browser-1": "You cleared the noise.",
    "browser-2": "The useful signal was always there.",
    "browser-3":
      "I designed browser tools that turn repeated actions into intentional workflows.",
    "emotion-1": "Not every signal needs to be corrected.",
    "emotion-2": "Some need to be heard.",
    "emotion-3":
      "A thoughtful system knows when to respond — and when to leave space.",
    "research-1": "Raw signals rarely explain themselves.",
    "research-2": "Patterns emerge through careful questions.",
    "research-3": "Research taught me to look beyond the visible interface.",
    "coda-1": "Threads return to the same instrument.",
    "coda-2": "If this experience left a signal, let’s continue the conversation.",
  },
  explore: {
    title: "Selected Work",
    subtitle: "Product decisions, working systems, and the evidence behind them.",
    about: "About",
    projects: "Projects",
    contact: "Contact",
    downloadCv: "Download CV",
    playInstead: "Play the portfolio",
  },
  contact: {
    email: "hxz439@alumni.bham.ac.uk",
    github: "https://github.com/zbjgrhr",
    cvPath: "/downloads/Huaxin_Zhang_CV.docx",
    portfolioPath: "/downloads/Zhang_Huaxin_Creative_Portfolio.pdf",
  },
  coda: {
    title: "LET’S BUILD SOMETHING MEANINGFUL",
    line: "If this experience left a signal, let’s continue the conversation.",
    replay: "Replay",
    explore: "Explore Projects",
    autoplay: "Enable Autoplay Experience",
  },
  archive: {
    close: "Close archive",
    context: "Context",
    problem: "Problem",
    role: "My role",
    process: "Process",
    decisions: "Key decisions",
    tech: "Technology",
    challenges: "Challenges",
    outcome: "Outcome",
    learned: "What I learned",
    links: "Links",
  },
  pauseMenu: {
    title: "Paused",
    resume: "Resume",
    settings: "Settings",
    exitExplore: "Exit to Explore",
  },
};
