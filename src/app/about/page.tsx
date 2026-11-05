import type { Metadata } from "next";
import Link from "next/link";
import PhotoGrid, { visiblePhotos } from "@/components/PhotoGrid";
import { gallery } from "@/data/gallery";
import { FiAward } from "react-icons/fi";
import { certificates, education, profile } from "@/data/profile";
import s from "./about.module.css";

export const metadata: Metadata = {
  title: "About",
  description: "About Kanailal Manna: background, how I work, and photos.",
};

const principles = [
  {
    title: "Own the outcome, not the ticket",
    body: "I care whether the feature gets used. That means asking why, shipping something small, and checking the numbers after.",
  },
  {
    title: "Automate the second time",
    body: "If I do something by hand twice, it becomes a script or a pipeline. That habit took Datachecks releases from an hour to three minutes.",
  },
  {
    title: "Write it down",
    body: "Clear PR descriptions, short design notes and docs mean the next engineer, or me in six months, doesn't have to guess.",
  },
  {
    title: "Learn in public",
    body: "My SDE II plan, notes and practice projects are on GitHub. Progress is easier to keep when people can see it.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className={`wrap ${s.intro}`}>
        <div className={s.portrait}>
          {/* Replace /public/mypic.jpeg to change this photo. A 4:5 portrait works best. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={profile.photo} alt={`Portrait of ${profile.name}`} />
        </div>
        <div className={s.story}>
          <h1>Hi, I&apos;m {profile.shortName}.</h1>
          <div className={`prose ${s.text}`}>
            <p>
              I&apos;m a software engineer from <strong>Kolkata, India</strong>. I started writing code in 2021 as a
              computer science student, solving <strong>DSA problems in C, Java and Python</strong> and publishing my
              notes on GitHub. A few of those repositories are still the most-starred things I own.
            </p>
            <p>
              In 2024 I joined <strong>Buzzli</strong>, an AI startup building a LinkedIn copilot, as a frontend
              intern. Within a year I was working <strong>across the stack</strong>: rebuilding the UI, writing the
              scraper that fed the content pipeline, and building the <strong>AI agent that turns news into post
              drafts</strong>. I was <strong>promoted to SDE</strong> before I left.
            </p>
            <p>
              Since April 2025 I&apos;ve been at <strong>Ploutos AI</strong> building datachecks.io, an AI agent
              platform for data migration. I implement <strong>AI agent features</strong> like Custom Guardrails, Memory,
              per-session token tracking and a migration report agent, engineer <strong>backend and frontend product
              features</strong> on FastAPI and Next.js, and own the <strong>CI/CD and deployment pipeline</strong>. I was{" "}
              <strong>promoted to SDE I</strong> in October 2025.
            </p>
            <p>
              Right now I&apos;m going deeper on <strong>backend engineering, system design and production AI</strong>,
              with the goal of owning large features end to end.
            </p>
          </div>
          <div className="btn-row">
            <Link href="/projects" className="btn btn-ink">
              Work and experience
            </Link>
            <a href={profile.resume} className="btn" download={profile.resumeFileName}>
              Download résumé
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 className="sec-title" style={{ marginBottom: 32 }}>
            How I work
          </h2>
          <ul className={s.principles}>
            {principles.map((p) => (
              <li key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="education" className={`section ${s.anchor}`}>
        <div className={`wrap ${s.two}`}>
          <div>
            <h2 className="sec-title">Education</h2>
            <div className={s.edu}>
              <h3>{education.degree}</h3>
              <p>
                {education.school}, {education.place}
              </p>
              <p className="muted">
                {education.years}, {education.grade}
              </p>
              <ul className={s.honors}>
                {education.honors.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
            <h3 className={s.langTitle}>Languages</h3>
            <p className="muted">{profile.spokenLanguages.join(", ")}</p>
          </div>
          <div>
            <h2 className="sec-title">Certifications</h2>
            <ul className={s.certs}>
              {certificates.map((c) => (
                <li key={c.name}>
                  <a href={c.link} target="_blank" rel="noopener noreferrer">
                    <FiAward aria-hidden className={s.certIcon} />
                    <span>
                      <strong>{c.name}</strong>
                      <span className="muted">{c.issuer}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Hidden until at least one photo exists in /public/gallery (see src/data/gallery.ts) */}
      {visiblePhotos(gallery).length > 0 && (
      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="sec-title">Photos</h2>
            <p>Work, events and life outside the editor.</p>
          </div>
          <PhotoGrid photos={gallery} />
        </div>
      </section>
      )}
    </>
  );
}
