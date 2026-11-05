import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowRight, FiArrowUpRight, FiDownload } from "react-icons/fi";
import Rich from "@/components/Rich";
import { experience, type Role } from "@/data/experience";
import { getProject, projects, type Project } from "@/data/projects";
import { profile } from "@/data/profile";
import s from "./projects.module.css";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Work history and case studies of Kanailal Manna: AI agent and full-stack work at Datachecks and Buzzli, plus open-source developer tools.",
};

/**
 * One job. Left: what I did (summary, bold highlights, stack).
 * Right: a sticky card with the facts a recruiter scans for (company, role, dates, place, promotion)
 * and the case study link.
 */
function RoleBlock({ r }: { r: Role }) {
  const cs = getProject(r.id);
  return (
    <li id={r.id} className={s.role}>
      <aside className={s.card} aria-label={`${r.company} role details`}>
        <div className={s.cardHead}>
          <h3 className={s.company}>
            {r.companyUrl ? (
              <a href={r.companyUrl} target="_blank" rel="noopener noreferrer">
                {r.company} <FiArrowUpRight aria-hidden className={s.ext} />
              </a>
            ) : (
              r.company
            )}
          </h3>
          <p className={s.title}>{r.title}</p>
        </div>

        <dl className={s.facts}>
          <div>
            <dt>When</dt>
            <dd>
              {r.start} – {r.end}
            </dd>
          </div>
          <div>
            <dt>Where</dt>
            <dd>{r.location}</dd>
          </div>
        </dl>

        {r.promotion && <p className={s.promo}>{r.promotion}</p>}

        {cs && (
          <Link href={`/projects/${cs.slug}`} className={s.caseLink}>
            {cs.cover && (
              <span className={s.caseThumb}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cs.cover} alt="" loading="lazy" />
              </span>
            )}
            <span className={s.caseGo}>
              Read the case study <FiArrowRight aria-hidden />
            </span>
          </Link>
        )}
      </aside>

      <div className={s.what}>
        <p className={s.summary}>{r.summary}</p>
        <ul className={s.highlights}>
          {r.highlights.map((h) => (
            <li key={h}>
              <Rich text={h} />
            </li>
          ))}
        </ul>
        <ul className="chips" aria-label="Technologies">
          {r.stack.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

/** Smaller card for side projects and packages. */
function SideCard({ p }: { p: Project }) {
  return (
    <Link href={`/projects/${p.slug}`} className={s.side}>
      <div className={s.sideMedia}>
        {p.cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.cover} alt="" loading="lazy" />
        )}
      </div>
      <div className={s.sideBody}>
        <div className={s.sideMeta}>
          <span>{p.role}</span>
          <span>{p.year}</span>
        </div>
        <h3 className={s.sideTitle}>{p.title}</h3>
        <p className={s.sideTag}>{p.tagline}</p>
        <p className={s.sideResult}>
          <Rich text={p.outcome[0]} />
        </p>
        <ul className="chips" aria-label="Tech stack">
          {p.stack.slice(0, 4).map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}

export default function WorkPage() {
  const roles = experience.filter((r) => r.id !== "open-source");
  const ownWork = projects.filter((p) => p.category !== "Professional work");

  return (
    <>
      <header className="page-head">
        <div className={`wrap ${s.head}`}>
          <div>
            <h1>Work and experience</h1>
            <p className="lede">
              Two years building production software at two AI startups, promoted at both. Below is each role, what I
              shipped there and a case study, followed by the tools I publish on my own.
            </p>
          </div>
          <div className={s.headSide}>
            <nav className={s.jump} aria-label="Sections on this page">
              <a href="#experience">
                Experience <span>{roles.length} roles</span>
              </a>
              <a href="#own-work">
                Open source and side projects <span>{ownWork.length}</span>
              </a>
            </nav>
            <a href={profile.resume} download={profile.resumeFileName} className="btn btn-ink">
              <FiDownload aria-hidden /> Download résumé (PDF)
            </a>
          </div>
        </div>
      </header>

      <section id="experience" className={`section ${s.anchor}`}>
        <div className="wrap">
          <div className="sec-head">
            <h2 className="sec-title">Experience</h2>
            <p>
              Company pages describe my role and the products&apos; public features; internal details stay private.
            </p>
          </div>
          <ol className={s.timeline}>
            {roles.map((r) => (
              <RoleBlock key={r.id} r={r} />
            ))}
          </ol>
        </div>
      </section>

      <section id="own-work" className={`section ${s.anchor}`}>
        <div className="wrap">
          <div className="sec-head">
            <h2 className="sec-title">Open source and side projects</h2>
            <p>
              Tools I designed and published myself. Live GitHub and npm numbers, and my contributions to other
              projects, are on the{" "}
              <Link href="/open-source" className="link">
                open source page
              </Link>
              .
            </p>
          </div>
          <div className={s.sideGrid}>
            {ownWork.map((p) => (
              <SideCard key={p.slug} p={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className={`wrap ${s.cta}`}>
          <div>
            <h2 className="sec-title">Want the details behind this work?</h2>
            <p className="muted" style={{ marginTop: 12, maxWidth: "52ch" }}>
              I&apos;m happy to walk through architecture decisions, trade-offs and what I&apos;d do differently in an
              interview or a call. Education and certifications are on the{" "}
              <Link href="/about#education" className="link">
                about page
              </Link>
              .
            </p>
          </div>
          <div className="btn-row">
            <Link href="/hire" className="btn btn-ink">
              Talk to me
            </Link>
            <Link href="/skills" className="btn">
              See the skills behind it
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
