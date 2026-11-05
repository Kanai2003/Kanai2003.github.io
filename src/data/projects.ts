export type ProjectCategory = "Professional work" | "Developer tools";

export interface Media {
  type: "image" | "video";
  /** Local path under /public (e.g. /projects/foo.png) or a YouTube URL for video. */
  url: string;
  caption: string;
}

export interface Project {
  slug: string;
  title: string;
  /** One sentence. What it is, for whom. */
  tagline: string;
  category: ProjectCategory;
  year: string;
  /** Your role in it. Recruiters look for this first. */
  role: string;
  featured?: boolean;
  /** Company work: the page shows a note that internal details are left out. */
  confidential?: boolean;
  cover?: string;
  stack: string[];
  problem: string;
  approach: string[];
  outcome: string[];
  learnings: string[];
  links: { live?: string; repo?: string; package?: string; video?: string };
  gallery: Media[];
}

export const projects: Project[] = [
  {
    slug: "datachecks",
    title: "Datachecks platform",
    tagline: "AI agent features, many backend and frontend product features, and deployment automation for datachecks.io.",
    category: "Professional work",
    year: "2025 – now",
    role: "SDE I at Ploutos AI: frontend, backend and CI/CD",
    featured: true,
    confidential: true,
    cover: "/projects/datachecks-hero.jpg",
    stack: [
      "AI agent implementation",
      "Agent guardrails",
      "Agent memory",
      "Token tracking",
      "FastAPI",
      "Next.js",
      "TypeScript",
      "Docker",
      "GitHub Actions",
      "Railway",
    ],
    problem:
      "Data migrations usually take months and put data integrity at risk. datachecks.io uses AI agents to automate migration work, from assessment and mapping to validation and reconciliation, and keeps a record of what changed and what was approved.",
    approach: [
      "**AI agent features, end to end.** Implemented **Custom Guardrails**, which let teams set rules on what the agent may do or say, and **Memory**, which keeps useful context across conversations.",
      "**Token tracking per agent and per session.** Built usage tracking so every agent run can be measured and compared.",
      "**Data migration report agent.** Set up an agent that generates reports to guide teams through data migrations.",
      "**Infrastructure move from Azure to Railway.** Migrated the deployment servers and connected them to CI, so a merge goes live without manual steps.",
      "**CI/CD pipeline.** GitHub Actions builds, tests and ships Docker images on merge.",
      "**Core backend and frontend product features.** Engineered many features across the platform's FastAPI backend and Next.js frontend, from API contract to shipped UI. The specifics are confidential, so they aren't listed here.",
    ],
    outcome: [
      "**Custom Guardrails and Memory** shipped as user-facing features of the platform's AI agent.",
      "**Many backend and frontend product features** shipped beyond the AI work listed here.",
      "**Token usage tracked per agent and per session** and visible to the team.",
      "Release time cut from **about 1 hour of manual steps to roughly 3 minutes**.",
      "**280+ commits** across 4 repositories.",
      "**Promoted from SDE intern to SDE I** in October 2025.",
    ],
    learnings: [
      "Guardrails and memory are what turn an LLM demo into an agent a company can trust with its data.",
      "Designing API contracts first lets frontend and backend work in parallel.",
      "Automating releases early pays off every single week after.",
    ],
    links: { live: "https://datachecks.io" },
    gallery: [{ type: "image", url: "/projects/datachecks-hero.jpg", caption: "datachecks.io public homepage" }],
  },
  {
    slug: "buzzli",
    title: "Buzzli LinkedIn copilot",
    tagline: "A LinkedIn AI agent that helps professionals build their personal brand. I built across the whole stack.",
    category: "Professional work",
    year: "2024 – 2025",
    role: "Frontend engineer, promoted to SDE",
    featured: true,
    confidential: true,
    cover: "/projects/buzzli-hero.jpg",
    stack: [
      "AI agent implementation",
      "Content generation",
      "Web scraping",
      "Next.js",
      "Node.js",
      "Express.js",
      "CosmosDB",
      "Python",
    ],
    problem:
      "Posting consistently on LinkedIn takes hours of writing every week. Buzzli's users wanted relevant, ready-to-edit drafts instead of a blank page.",
    approach: [
      "**Full-stack features** across the Next.js frontend and the Node.js/Express API on CosmosDB.",
      "**News-to-post AI agent** that reads articles and drafts LinkedIn posts from them.",
      "**Python scraper** that collected **25k+ records** to feed the content pipeline.",
      "**Responsive UI rebuild** for mobile and desktop, with SEO fixes throughout.",
    ],
    outcome: [
      "SEO score raised from **68 to 92**.",
      "**150+ pull requests** authored and merged.",
      "**Promoted from frontend engineer to SDE** in February 2025, and mentored new interns.",
    ],
    learnings: [
      "AI output is only useful when the data feeding it is clean and fresh.",
      "Reviewing other people's code made my own code clearer.",
    ],
    links: { live: "https://buzzli.io" },
    gallery: [{ type: "image", url: "/projects/buzzli-hero.jpg", caption: "buzzli.io public homepage" }],
  },
  {
    slug: "lynx-api",
    title: "Lynx API",
    tagline: "A local-first API client that lets you chain requests into visual workflows.",
    category: "Developer tools",
    year: "2025",
    role: "Frontend engineer, collaborative build",
    featured: true,
    cover: "/projects/lynxapi-landing.png",
    stack: ["Rust", "Next.js", "TypeScript", "React Flow", "Tailwind CSS", "shadcn/ui"],
    problem:
      "Tools like Postman treat requests one at a time. When an endpoint depends on the output of three others, developers end up copying tokens and IDs by hand.",
    approach: [
      "**Rust engine** executes requests locally, so secrets never leave the machine.",
      "Built the **Next.js interface**, including a **React Flow canvas** where each node is a request and each edge passes data forward.",
      "Designed **request and response panels** that stay readable with large JSON payloads.",
    ],
    outcome: [
      "Multi-step API flows can be built, run and debugged on one screen.",
      "Public demo video walking through the full workflow.",
    ],
    learnings: [
      "Managing graph state for an editor with many interactive nodes.",
      "Designing a UI contract against a Rust backend owned by another engineer.",
    ],
    links: { video: "https://youtu.be/N6RANaIyynI" },
    gallery: [
      { type: "image", url: "/projects/lynxapi-landing.png", caption: "Landing page" },
      { type: "video", url: "https://youtu.be/N6RANaIyynI", caption: "Product walkthrough" },
      { type: "image", url: "/projects/lynxapi-req-res.png", caption: "Request and response view" },
      { type: "image", url: "/projects/lynxapi-flow.png", caption: "Workflow canvas" },
      { type: "image", url: "/projects/lynxapi-settings.png", caption: "Settings" },
    ],
  },  {
    slug: "codebase-tracker",
    title: "Codebase Tracker",
    tagline: "A CLI that maps where every component and function is defined and used.",
    category: "Developer tools",
    year: "2025",
    role: "Author and maintainer",
    cover: "/projects/codebase-track-npm.png",
    stack: ["Node.js", "JavaScript", "AST parsing", "npm"],
    problem:
      "Joining a large React or Node project means weeks of guessing which components are still used and who calls what.",
    approach: [
      "Walks the file tree with **.gitignore-aware filters**.",
      "**Parses imports, definitions and call sites** for React components and Node functions.",
      "Writes a **structured report** of definitions, imports and call hierarchies.",
    ],
    outcome: ["**Published on npm** for global install.", "Reports help **spot unused components** before a refactor."],
    learnings: ["Working with abstract syntax trees.", "Designing CLI output people can scan quickly."],
    links: {
      package: "https://www.npmjs.com/package/codebase-tracker",
      repo: "https://github.com/Kanai2003/codebase-tracker",
    },
    gallery: [{ type: "image", url: "/projects/codebase-track-npm.png", caption: "npm package page" }],
  },  {
    slug: "unicode-transformer",
    title: "Unicode Transformer",
    tagline: "Convert plain text to bold, italic and script Unicode styles, and back again.",
    category: "Developer tools",
    year: "2024",
    role: "Author and maintainer",
    cover: "/projects/unicode-npm.png",
    stack: ["TypeScript", "Node.js", "npm"],
    problem:
      "Platforms like LinkedIn do not support rich text, so people paste styled Unicode characters, which are hard to generate and harder to reverse.",
    approach: [
      "Character maps for each style with a reverse lookup for normalising text.",
      "Small typed API with zero dependencies.",
    ],
    outcome: ["**Published on npm**."],
    learnings: ["How Unicode code points and surrogate pairs actually work."],
    links: {
      package: "https://www.npmjs.com/package/unicode-transformer",
      repo: "https://github.com/Kanai2003/unicode-transformer",
    },
    gallery: [{ type: "image", url: "/projects/unicode-npm.png", caption: "npm package page" }],
  },];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
