/**
 * Skills with evidence. Every skill points at where you used it, so a reviewer
 * can check the claim in one click instead of trusting a logo wall.
 *
 * depth:
 *   "shipped"  – used in production at a job
 *   "built"    – used to ship a public side project or package
 *   "learning" – actively studying, not yet shipped
 *
 * evidence ids refer to experience ids (src/data/experience.ts) or project slugs
 * (src/data/projects.ts).
 */
export type Depth = "shipped" | "built" | "learning";

export interface Skill {
  name: string;
  depth: Depth;
  evidence?: string[];
}

export interface SkillGroup {
  id: string;
  title: string;
  /** What this group means in plain words for a non-technical reader. */
  blurb: string;
  skills: Skill[];
}

export const depthLabel: Record<Depth, string> = {
  shipped: "Shipped at work",
  built: "Built with",
  learning: "Learning now",
};

export const skillGroups: SkillGroup[] = [
  {
    id: "ai",
    title: "AI & LLM engineering",
    blurb: "Putting language models inside real products: agents, tool use, prompt design and the data feeding them.",
    skills: [
      { name: "AI agents", depth: "shipped", evidence: ["buzzli", "datachecks"] },
      { name: "Prompt engineering", depth: "shipped", evidence: ["buzzli"] },
      { name: "Agent guardrails", depth: "shipped", evidence: ["datachecks"] },
      { name: "Agent memory", depth: "shipped", evidence: ["datachecks"] },
      { name: "Token usage tracking", depth: "shipped", evidence: ["datachecks"] },
      { name: "Report-generating agents", depth: "shipped", evidence: ["datachecks"] },
      { name: "LangChain", depth: "shipped", evidence: ["datachecks"] },
      { name: "LangGraph", depth: "shipped", evidence: ["datachecks"] },
      { name: "OpenAI API", depth: "built" },
      { name: "Google Gemini", depth: "built" },
      { name: "RAG pipelines", depth: "learning" },
      { name: "LLM evaluation", depth: "learning" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    blurb: "Fast, accessible interfaces for data products, dashboards and developer tools.",
    skills: [
      { name: "Next.js", depth: "shipped", evidence: ["datachecks", "buzzli", "lynx-api"] },
      { name: "React", depth: "shipped", evidence: ["datachecks", "buzzli"] },
      { name: "TypeScript", depth: "shipped", evidence: ["datachecks", "lynx-api"] },
      { name: "Tailwind CSS", depth: "built", evidence: ["lynx-api"] },
      { name: "Redux", depth: "shipped" },
      { name: "Zustand", depth: "shipped" },
      { name: "Recoil", depth: "built" },
      { name: "React Flow", depth: "built", evidence: ["lynx-api"] },
      { name: "MUI", depth: "shipped", evidence: ["buzzli"] },
      { name: "SEO & Core Web Vitals", depth: "shipped", evidence: ["buzzli"] },
    ],
  },
  {
    id: "backend",
    title: "Backend & data",
    blurb: "APIs, services and the databases behind them.",
    skills: [
      { name: "Python", depth: "shipped", evidence: ["datachecks", "buzzli"] },
      { name: "FastAPI", depth: "shipped", evidence: ["datachecks", "bittrail"] },
      { name: "Node.js", depth: "shipped", evidence: ["buzzli", "codebase-tracker"] },
      { name: "Express.js", depth: "shipped", evidence: ["buzzli"] },
      { name: "REST API design", depth: "shipped", evidence: ["datachecks"] },
      { name: "PostgreSQL", depth: "shipped", evidence: ["datachecks", "bittrail"] },
      { name: "CosmosDB", depth: "shipped", evidence: ["buzzli"] },
      { name: "MongoDB", depth: "built" },
      { name: "Web scraping", depth: "shipped", evidence: ["buzzli"] },
      { name: "System design", depth: "built", evidence: ["datachecks", "bittrail"] },
      { name: "Redis (caching & streams)", depth: "built", evidence: ["bittrail"] },
      { name: "Message queues & async workers", depth: "built", evidence: ["bittrail"] },
      { name: "JWT auth & token rotation", depth: "built", evidence: ["bittrail"] },
      { name: "SQLAlchemy & Alembic", depth: "built", evidence: ["bittrail"] },
      { name: "Load testing", depth: "built", evidence: ["bittrail"] },
      { name: "Microservices", depth: "learning" },
    ],
  },
  {
    id: "devops",
    title: "DevOps & cloud",
    blurb: "Getting code from a pull request to production quickly and safely.",
    skills: [
      { name: "CI/CD", depth: "shipped", evidence: ["datachecks"] },
      { name: "GitHub Actions", depth: "shipped", evidence: ["datachecks"] },
      { name: "Docker", depth: "shipped", evidence: ["datachecks"] },
      { name: "Docker Compose", depth: "shipped", evidence: ["datachecks"] },
      { name: "Railway", depth: "shipped", evidence: ["datachecks", "bittrail"] },
      { name: "Azure", depth: "shipped", evidence: ["datachecks", "buzzli"] },
      { name: "Cloud migration", depth: "shipped", evidence: ["datachecks"] },
      { name: "Linux & Bash", depth: "shipped" },
      { name: "Git", depth: "shipped" },
      { name: "AWS", depth: "built" },
      { name: "GCP", depth: "built" },
      { name: "Kubernetes", depth: "learning" },
    ],
  },
  {
    id: "ml",
    title: "Data science & ML",
    blurb: "Analysing data and training classical models.",
    skills: [
      { name: "Pandas", depth: "built" },
      { name: "NumPy", depth: "built" },
      { name: "Scikit-learn", depth: "built" },
      { name: "Matplotlib & Seaborn", depth: "built" },
      { name: "Streamlit", depth: "built" },
    ],
  },
  {
    id: "languages",
    title: "Languages & CS",
    blurb: "The fundamentals underneath everything else.",
    skills: [
      { name: "Python", depth: "shipped", evidence: ["datachecks", "buzzli"] },
      { name: "Java", depth: "built" },
      { name: "JavaScript", depth: "shipped" },
      { name: "SQL", depth: "shipped" },
      { name: "Rust", depth: "built", evidence: ["lynx-api"] },
      { name: "C", depth: "built" },
      { name: "Data structures & algorithms", depth: "built" },
      { name: "Object-oriented design", depth: "shipped" },
    ],
  },
];

/** The short list shown on the home page. Keep it to what you most want to be hired for. */
export const coreStack: { area: string; items: string[] }[] = [
  { area: "AI", items: ["LangGraph", "LangChain", "AI agents", "Guardrails", "Prompt engineering"] },
  { area: "Backend", items: ["Python", "FastAPI", "Node.js", "Express.js", "PostgreSQL", "Redis", "MongoDB"] },
  { area: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
  { area: "Delivery", items: ["Docker", "GitHub Actions", "CI/CD", "AWS", "Railway"] },
  { area: "Engineering", items: ["System design", "REST API design", "Data structures & algorithms"] },
];
