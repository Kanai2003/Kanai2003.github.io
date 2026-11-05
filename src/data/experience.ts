export interface Role {
  id: string;
  company: string;
  companyUrl?: string;
  title: string;
  /** Earlier titles at the same company, newest first. */
  promotion?: string;
  start: string;
  end: string;
  location: string;
  summary: string;
  /** Plain text. Keep each one to a single result you can explain in an interview. */
  highlights: string[];
  stack: string[];
}

export const experience: Role[] = [
  {
    id: "datachecks",
    company: "Ploutos AI Technologies (Datachecks)",
    companyUrl: "https://datachecks.io",
    title: "Software Development Engineer I",
    promotion: "Promoted from SDE intern to SDE I in Oct 2025",
    start: "Apr 2025",
    end: "Present",
    location: "Bengaluru · Remote",
    summary:
      "Building datachecks.io, a platform where AI agents automate data migration and keep data integrity intact, across its agents, product features and delivery pipeline.",
    highlights: [
      "Co-engineered the **datachecks.io** AI data migration platform, wiring Next.js frontends to **FastAPI (Python)** services.",
      "Implemented **AI agent features end to end**, including **Custom Guardrails** (rules on what the agent may do or say) and **Memory** (useful context kept across conversations).",
      "Engineered **many backend and frontend product features** across the platform, from API design to shipped UI. Details are confidential and available to discuss at a high level in interviews.",
      "Built **token usage tracking for every agent and every session**, so the team can see exactly what each agent run consumes.",
      "Set up an **AI agent that generates data migration reports**, giving teams a clear picture before and during a migration.",
      "**Migrated the deployment infrastructure from Azure to Railway** and wired it into CI, so merges deploy automatically.",
      "Built the **CI/CD pipeline** with GitHub Actions and Docker, cutting release time from **about 1 hour to roughly 3 minutes**.",
      "**280+ commits across 4 repositories**: frontend, backend, open-source packages and CI/CD.",
    ],
    stack: ["Next.js", "TypeScript", "FastAPI", "Python", "AI agents", "PostgreSQL", "Docker", "GitHub Actions", "Railway", "Azure"],
  },
  {
    id: "buzzli",
    company: "Buzzli",
    companyUrl: "https://buzzli.io",
    title: "Software Development Engineer Intern",
    promotion: "Promoted from frontend engineer to SDE in Feb 2025",
    start: "Mar 2024",
    end: "Mar 2025",
    location: "Delhi · Remote",
    summary:
      "Engineer on buzzli.io, an AI copilot for creating LinkedIn content.",
    highlights: [
      "Built the **full-stack platform** with Next.js, Node.js/Express and Azure CosmosDB.",
      "Implemented an **AI agent that turns news articles into ready-to-post drafts**.",
      "Wrote a **Python scraper that collected 25k+ records** for the content ingestion pipeline.",
      "Rebuilt the UI for mobile and desktop and **raised the SEO score from 68 to 92**.",
      "**Authored and merged 150+ PRs**; reviewed code and mentored new interns.",
    ],
    stack: ["Next.js", "React", "Node.js", "Express.js", "CosmosDB", "Python", "AI agents"],
  },
  {
    id: "open-source",
    company: "Open source",
    title: "Contributor and package author",
    start: "Oct 2021",
    end: "Present",
    location: "Remote",
    summary: "Contributing to developer tooling and publishing my own npm packages.",
    highlights: [
      "Fixed **cross-platform build issues in neutralino.js**, a lightweight desktop app framework.",
      "Published **codebase-tracker**, a CLI that maps component and function usage across React, Next.js and Node codebases.",
      "Published **unicode-transformer**, a small library for styled Unicode text.",
      "**Hacktoberfest contributor** across multiple years.",
    ],
    stack: ["TypeScript", "Node.js", "npm", "Git"],
  },
];
