import type { Metadata } from "next";
import Link from "next/link";
import { depthLabel, skillGroups, type Depth } from "@/data/skills";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import CopyButton from "@/components/CopyButton";
import s from "./skills.module.css";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Skills matrix for Kanailal Manna: AI and LLM engineering, Next.js, FastAPI, Python, TypeScript, Docker and CI/CD, each linked to where it was used.",
};

/** Prefer a case study when one exists, otherwise the role on the experience page. */
function evidenceLink(id: string) {
  const role = experience.find((r) => r.id === id);
  const p = projects.find((x) => x.slug === id);
  if (p) return { label: role ? role.company.split(" (")[0] : p.title, href: `/projects/${p.slug}` };
  if (role) return { label: role.company.split(" (")[0], href: `/projects#${role.id}` };
  return null;
}

const depths: Depth[] = ["shipped", "built", "learning"];

export default function SkillsPage() {
  const all = skillGroups.flatMap((g) => g.skills);
  const counts = Object.fromEntries(depths.map((d) => [d, all.filter((x) => x.depth === d).length]));
  const keywords = all.filter((x) => x.depth !== "learning").map((x) => x.name).join(", ");

  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <h1>Skills, with the receipts</h1>
          <p className="lede">
            Every skill is marked by how deeply I&apos;ve used it and links to the job or project where I did. No
            percentage bars, no logo wall.
          </p>
          <ul className={s.legend} aria-label="Legend">
            {depths.map((d) => (
              <li key={d}>
                <span className={s.dot} data-depth={d} aria-hidden />
                {depthLabel[d]} <span className="muted">({counts[d]})</span>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <nav className={s.jump} aria-label="Skill areas">
            {skillGroups.map((g) => (
              <a key={g.id} href={`#${g.id}`} className="chip">
                {g.title}
              </a>
            ))}
          </nav>

          {skillGroups.map((g) => (
            <section key={g.id} id={g.id} className={s.group} aria-labelledby={`${g.id}-h`}>
              <div className={s.groupHead}>
                <h2 id={`${g.id}-h`}>{g.title}</h2>
                <p>{g.blurb}</p>
              </div>
              <ul className={s.list}>
                {g.skills.map((sk) => {
                  const ev = (sk.evidence ?? []).map(evidenceLink).filter(Boolean) as {
                    label: string;
                    href: string;
                  }[];
                  return (
                    <li key={sk.name} className={s.item}>
                      <span className={s.name}>
                        <span className={s.dot} data-depth={sk.depth} title={depthLabel[sk.depth]} />
                        {sk.name}
                        <span className="sr-only"> ({depthLabel[sk.depth]})</span>
                      </span>
                      <span className={s.ev}>
                        {ev.length ? (
                          ev.map((e, i) => (
                            <span key={e.href}>
                              <Link href={e.href} className="link">
                                {e.label}
                              </Link>
                              {i < ev.length - 1 ? ", " : ""}
                            </span>
                          ))
                        ) : (
                          <span className="muted">{depthLabel[sk.depth]}</span>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <section className="section">
        <div className={`wrap ${s.ats}`}>
          <div>
            <h2 className="sec-title">For recruiters</h2>
            <p className="muted" style={{ marginTop: 12, maxWidth: "44ch" }}>
              The skills I&apos;ve shipped or built with, as plain text for your ATS or job notes.
            </p>
          </div>
          <div className={s.atsBox}>
            <p>{keywords}</p>
            <CopyButton text={keywords} label="Copy skills" />
          </div>
        </div>
      </section>
    </>
  );
}
