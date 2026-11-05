/** What freelance clients can hire you for. Edit freely; the hire page renders this. */
export const services = [
  {
    title: "AI features in your product",
    body: "Chat assistants, agents that call your APIs, document Q&A and content generation, wired into your existing app with guardrails and cost limits.",
    deliverables: ["LangChain / LangGraph agent", "FastAPI service", "Prompt and tool design", "Usage and cost logging"],
  },
  {
    title: "Full-stack SaaS MVP",
    body: "From an idea to a deployed product: auth, database, dashboard, payments and the landing page.",
    deliverables: ["Next.js app", "Python or Node API", "PostgreSQL schema", "Docker deploy"],
  },
  {
    title: "Frontend rebuilds",
    body: "Take a slow or dated React app and make it fast, responsive and easy to extend.",
    deliverables: ["Next.js migration", "Design system", "Lighthouse and SEO fixes", "Component docs"],
  },
  {
    title: "CI/CD and release automation",
    body: "Turn a manual, hour-long release into a pipeline that runs on every merge.",
    deliverables: ["GitHub Actions", "Dockerised builds", "Preview environments", "Release runbook"],
  },
];

/** A real sequence, so it is numbered on the page. */
export const process = [
  { title: "Discovery call", body: "30 minutes to understand the problem, users and constraints. Free." },
  { title: "Written proposal", body: "Scope, milestones, fixed price or weekly rate, within two working days." },
  { title: "Build in the open", body: "Weekly demos and a shared board. You see progress, not just invoices." },
  { title: "Launch and handover", body: "Deployed, documented and walked through with your team. Two weeks of support included." },
];

export const engagement = [
  { title: "Paid pilot, 1 to 2 weeks", body: "A small, real piece of the project first, so you can judge the work before committing to more." },
  { title: "Fixed-scope project", body: "Best for MVPs and well-defined features." },
  { title: "Monthly retainer", body: "A set number of hours each month for ongoing work." },
  { title: "Hourly", body: "For audits, reviews and short fixes." },
];
