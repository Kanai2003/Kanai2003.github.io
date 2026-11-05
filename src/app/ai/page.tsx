import type { Metadata } from "next";
import Link from "next/link";
import s from "./ai.module.css";

export const metadata: Metadata = {
  title: "AI systems",
  description:
    "How Kanailal Manna designs and ships AI features: agents with LangGraph, tool calling, retrieval, streaming interfaces and production guardrails.",
};

const architecture = [
  {
    zone: "Interface",
    nodes: [
      { name: "Next.js app", note: "Streaming chat, review queues, citations" },
      { name: "Feedback capture", note: "Thumbs, edits and corrections saved for evals" },
    ],
  },
  {
    zone: "API",
    nodes: [
      { name: "FastAPI gateway", note: "Auth, rate limits, request validation" },
      { name: "Job queue", note: "Long runs move off the request path" },
    ],
  },
  {
    zone: "Agent",
    nodes: [
      { name: "LangGraph planner", note: "Plan → act → observe loop with step limits" },
      { name: "Tools", note: "Your database, internal APIs, search, email" },
      { name: "Retrieval", note: "Chunked docs in a vector index, re-ranked" },
    ],
  },
  {
    zone: "Operate",
    nodes: [
      { name: "Tracing & cost", note: "Every step logged with tokens and latency" },
      { name: "Eval set", note: "Golden questions run on every prompt change" },
    ],
  },
];

type Status = "Shipped" | "Built" | "Exploring";
const patterns: { title: string; body: string; status: Status; where: string }[] = [
  {
    title: "Content generation pipelines",
    body: "Pull source material, have a model draft from it, and route drafts to a person for approval.",
    status: "Shipped",
    where: "Buzzli: an agent that turns news articles into LinkedIn-ready drafts, fed by a 25k+ record scraper.",
  },
  {
    title: "Tool-using agents",
    body: "An LLM that decides which internal API to call next, with typed tool schemas and a hard step limit.",
    status: "Shipped",
    where: "Datachecks: AI agent features alongside the data quality platform's FastAPI backend.",
  },


  {
    title: "Guardrails",
    body: "Configurable rules that check an agent's inputs, actions and answers before they reach the user.",
    status: "Shipped",
    where: "Datachecks: built the Custom Guardrails feature for the platform's AI agent.",
  },
  {
    title: "Agent memory",
    body: "Keeping the useful parts of past conversations so the agent doesn't start from zero every time.",
    status: "Shipped",
    where: "Datachecks: built the Memory feature for the platform's AI agent.",
  },
  {
    title: "Token & cost tracking",
    body: "Recording token usage for every agent and every session, so cost and behaviour can be measured.",
    status: "Shipped",
    where: "Datachecks: built per-agent, per-session token tracking.",
  },
  {
    title: "Report-generating agents",
    body: "An agent that gathers the facts and writes a structured report a person can act on.",
    status: "Shipped",
    where: "Datachecks: set up an agent that generates data migration reports.",
  },
  {
    title: "Retrieval-augmented generation",
    body: "Answering from your own documents with citations, instead of from the model's memory.",
    status: "Exploring",
    where: "Building RAG and evaluation projects as part of my current learning plan.",
  },
  {
    title: "Multimodal apps on Gemini",
    body: "Combining text and image models in one workflow.",
    status: "Built",
    where: "Google Cloud skill badge: Build Real World AI Applications with Gemini and Imagen.",
  },
];

const checklist = [
  { title: "Streaming by default", body: "Users see tokens in under a second, not a spinner for ten." },
  { title: "Structured outputs", body: "Model responses validated against a schema before any code trusts them." },
  { title: "Budgets per request", body: "Token, step and time limits so one bad prompt can't run up a bill." },
  { title: "Fallbacks", body: "A cheaper model or a plain answer when the main one fails or times out." },
  { title: "Prompts in version control", body: "Reviewed like code and tested against an eval set before release." },
  { title: "Human in the loop", body: "High-impact actions wait for approval. Edits become training data." },
];

export default function AIPage() {
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <h1>AI that works inside a real product</h1>
          <p className="lede">
            A demo calls a model. A product needs auth, data access, a usable interface, cost limits and a way to know
            when answers get worse. This is how I build the whole thing.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="sec-title">A typical architecture</h2>
            <p>The shape most of my AI features take. Each layer is something I write and deploy myself.</p>
          </div>
          <div className={s.arch} role="list">
            {architecture.map((z) => (
              <div key={z.zone} className={s.zone} role="listitem">
                <h3 className={s.zoneName}>{z.zone}</h3>
                <ul>
                  {z.nodes.map((n) => (
                    <li key={n.name} className={s.node}>
                      <strong>{n.name}</strong>
                      <span>{n.note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="sec-title">Patterns, and where I&apos;ve used them</h2>
            <p>Labelled honestly: shipped to users at a job, built in a public project, or what I&apos;m exploring now.</p>
          </div>
          <ul className={s.patterns}>
            {patterns.map((p) => (
              <li key={p.title}>
                <span className={s.status} data-status={p.status}>
                  {p.status}
                </span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <p className={s.where}>{p.where}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className={`wrap ${s.split}`}>
          <div>
            <h2 className="sec-title">What I put in before launch</h2>
            <p className="muted" style={{ marginTop: 16, maxWidth: "40ch" }}>
              The unglamorous parts are what make an AI feature something a team can rely on.
            </p>
          </div>
          <ul className={s.checklist}>
            {checklist.map((c) => (
              <li key={c.title}>
                <strong>{c.title}</strong>
                <span>{c.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className={`wrap ${s.cta}`}>
          <h2 className="sec-title">Want an AI feature in your product?</h2>
          <div className="btn-row">
            <Link href="/hire#freelance" className="btn btn-ink">
              Discuss a project
            </Link>
            <Link href="/skills" className="btn">
              See all skills
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
