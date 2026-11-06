import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import Rich from "@/components/Rich";
import AgentTrace from "@/components/AgentTrace";
import ProjectCard from "@/components/ProjectCard";
import { profile, proofPoints } from "@/data/profile";
import { projects } from "@/data/projects";
import { coreStack } from "@/data/skills";
import Testimonials from "@/components/Testimonials";
import s from "./home.module.css";


export const metadata: Metadata = pageMetadata({
  description:
    "Kanailal Manna is an AI full-stack engineer in India building AI agents with LangGraph, FastAPI and Next.js. Open to AI engineer roles and freelance projects.",
  path: "/",
});

const layers = [
  {
    name: "Interface",
    body: "Next.js and React apps that make AI output usable: streaming chat, review queues, dashboards.",
  },
  {
    name: "API & data",
    body: "Typed Python and Node services, the database schema, scrapers and the jobs that keep data fresh.",
  },
  {
    name: "AI layer",
    body: "Agents that plan, call tools and hand back an answer, with prompts and guardrails you can test.",
  },
  {
    name: "Delivery",
    body: "Containers and pipelines so every merge ships in minutes, not an afternoon.",
  },
];

const values = [
  {
    title: "Fewer handoffs",
    body: "I ship **frontend, backend, AI and CI/CD** myself, so a feature doesn't wait on four people to line up.",
    proof: "280+ commits across 4 repos at Datachecks",
    href: "/projects/datachecks",
  },
  {
    title: "AI you can afford to run",
    body: "**Guardrails**, **memory** and **per-session token tracking** keep AI features safe, useful and measurable.",
    proof: "Shipped at Datachecks",
    href: "/projects/datachecks",
  },
  {
    title: "Automation that pays back",
    body: "I automate the slow parts: **CI/CD on every merge** and a full **deployment move from Azure to Railway** behind it.",
    proof: "Datachecks delivery pipeline",
    href: "/projects#datachecks",
  },
  {
    title: "A low-risk hire",
    body: "Ready to own work from week one, with **two years in production** and **code you can read on GitHub**. Open to **full-time, contract-to-hire or contract**.",
    proof: "Ways to hire me",
    href: "/hire#employers",
  },
];

export default function Home() {
  const featured = projects.filter((p) => p.featured);
  const [first, ...rest] = featured;

  return (
    <>
      {/* Hero */}
      <section className={`wrap ${s.hero}`}>
        <div className={s.heroText}>
          <p className="status">{profile.availability.note}</p>
          {/* The H1 is the name: it's what people search for. The big headline stays visually dominant. */}
          <h1 className={s.nameTitle}>
            {profile.name} <span>· {profile.role}</span>
          </h1>
          <p className={s.h1}>{profile.headline}</p>
          <p className={s.heroLede}>{profile.summary}</p>
          <div className="btn-row">
            <Link href="/projects" className="btn btn-ink">
              See my work
            </Link>
            <a href={profile.resume} className="btn" download={profile.resumeFileName}>
              Download résumé
            </a>
          </div>
          <div className={s.id}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.photo}
              alt={`${profile.name}, ${profile.role}`}
              width={56}
              height={56}
            />
            <div>
              <strong>{profile.name}</strong>
              <span>
                {profile.currentTitle} at{" "}
                <a
                  href={profile.currentCompanyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  Datachecks
                </a>{" "}
                · {profile.location}
              </span>
            </div>
          </div>
        </div>
        <div className={s.heroTrace}>
          <AgentTrace />
        </div>
      </section>

      {/* Proof */}
      <section className={s.proofBand} aria-label="Results">
        <ul className={`wrap ${s.proof}`}>
          {proofPoints.map((p) => (
            <li key={p.label}>
              <span className={s.proofValue}>{p.value}</span>
              <span className={s.proofLabel}>{p.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Why now: the pitch for a lean, post-layoff market */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="sec-title">Why teams hire me now</h2>
            <p>
              Teams are smaller and every hire has to pay off fast. This is what
              you get from the first sprint, with the proof next to each claim.
            </p>
          </div>
          <ul className={s.values}>
            {values.map((v) => (
              <li key={v.title}>
                <h3>{v.title}</h3>
                <p>
                  <Rich text={v.body} />
                </p>
                <Link href={v.href} className={s.valueProof}>
                  {v.proof}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Work */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 className="sec-title">Work and experience</h2>
              <p className="muted" style={{ marginTop: 12, maxWidth: "52ch" }}>
                Two AI startups, promoted at both, plus developer tools I
                publish on npm.
              </p>
            </div>
            <Link href="/projects" className="btn">
              See all work
            </Link>
          </div>
          <div className={s.workGrid}>
            <div className={s.workLead}>
              <ProjectCard p={first} />
            </div>
            {rest.map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="sec-title">How I build, and with what</h2>
            <p>
              Most AI features fail in the gaps between teams. I work on every
              layer, so the model, the API and the interface are designed
              together.
            </p>
          </div>
          <ul className={s.layers}>
            {layers.map((l) => (
              <li key={l.name}>
                <h3>{l.name}</h3>
                <p>{l.body}</p>
              </li>
            ))}
          </ul>
          <div className={s.core}>
            <h3 className={s.coreTitle}>Core stack</h3>
            <dl className={s.coreList}>
              {coreStack.map((g) => (
                <div key={g.area}>
                  <dt>{g.area}</dt>
                  <dd>
                    <ul className="chips">
                      {g.items.map((t) => (
                        <li key={t} className="chip">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={s.stackFoot}>
            <div className="btn-row">
              <Link href="/ai" className="btn">
                How I build AI systems
              </Link>
              <Link href="/skills" className="btn">
                Full skills matrix
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Testimonials title="From people I've worked with" />

      {/* Two audiences */}
      <section className="section">
        <div className={`wrap ${s.paths}`}>
          <div className={s.path}>
            <h2>Hiring for your team?</h2>
            <p>
              I&apos;m looking for AI engineer, full-stack or backend roles
              where I can own features end to end. Full-time, contract-to-hire
              or contract. Remote, or on-site in Bengaluru.
            </p>
            <div className="btn-row">
              <Link href="/hire#employers" className="btn btn-ink">
                For employers
              </Link>
              <a href={profile.resume} className="btn" download={profile.resumeFileName}>
                Résumé (PDF)
              </a>
            </div>
          </div>
          <div className={`${s.path} ${s.pathAlt}`}>
            <h2>Need something built?</h2>
            <p>
              AI features, SaaS MVPs and frontend rebuilds for startups and
              small teams. Start with a paid pilot, then fixed scope or monthly,
              with weekly demos.
            </p>
            <div className="btn-row">
              <Link href="/hire#freelance" className="btn btn-ink">
                Freelance services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
