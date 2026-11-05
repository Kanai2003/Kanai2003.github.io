/** What freelance clients can hire you for. Edit freely; the hire page renders this. */
export const services = [
  {
    title: "AI features in your product",
    body: "Chat assistants, agents that call your APIs, report generators and content pipelines, wired into your existing app with guardrails, memory and per-session cost tracking.",
    timeline: "Typically 2–4 weeks",
    deliverables: ["LangChain / LangGraph agent", "FastAPI service", "Guardrails and memory", "Token and cost tracking"],
  },
  {
    title: "Full-stack SaaS MVP",
    body: "From an idea to a deployed product: auth, database, dashboard, the AI feature at its core and the landing page.",
    timeline: "Typically 4–8 weeks",
    deliverables: ["Next.js app", "Python or Node API", "PostgreSQL schema", "Docker deploy"],
  },
  {
    title: "Frontend rebuilds",
    body: "Take a slow or dated React app and make it fast, responsive and easy to extend.",
    timeline: "Typically 2–6 weeks",
    deliverables: ["Next.js migration", "Design system", "Lighthouse and SEO fixes", "Component docs"],
  },
  {
    title: "CI/CD and release automation",
    body: "Turn a manual, hour-long release into a pipeline that runs on every merge, or move your hosting to a new provider behind CI.",
    timeline: "Typically 1–2 weeks",
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

/** Questions every client asks before the first call. Edit the answers to match how you actually work. */
export const faq = [
  {
    q: "Who owns the code?",
    a: "You do. Everything is pushed to your repository from day one, and full ownership transfers on payment.",
  },
  {
    q: "Will you sign an NDA?",
    a: "Yes. I'm used to working under confidentiality, as you can see from how my company work is described on this site.",
  },
  {
    q: "How do we communicate?",
    a: "A short written update every few days, a demo every week, and Slack, email or calls in your time zone for anything urgent.",
  },
  {
    q: "What do you need from me to start?",
    a: "A short description of the problem, who it's for and any existing code or designs. I'll reply with questions and a written proposal.",
  },
  {
    q: "Can you work with my existing team?",
    a: "Yes. I can slot into your repo, reviews and standups, or own a piece end to end and hand it over with docs.",
  },
  {
    q: "What happens after launch?",
    a: "Two weeks of fixes are included. After that, a monthly retainer or ad-hoc hours, whichever suits you.",
  },
];
