import Link from "next/link";
import type { Project } from "@/data/projects";
import Rich from "./Rich";
import s from "./ProjectCard.module.css";

/** "feature" = large with image, "row" = compact list entry for the index page. */
export default function ProjectCard({ p, variant = "feature" }: { p: Project; variant?: "feature" | "row" }) {
  if (variant === "row") {
    return (
      <Link href={`/projects/${p.slug}`} className={s.row}>
        <span className={s.rowYear}>{p.year}</span>
        <span className={s.rowMain}>
          <span className={s.rowTitle}>{p.title}</span>
          <span className={s.rowTag}>{p.tagline}</span>
        </span>
        <span className={s.rowStack}>{p.stack.slice(0, 3).join(", ")}</span>
        <span className={s.rowCat}>{p.category}</span>
      </Link>
    );
  }

  return (
    <Link href={`/projects/${p.slug}`} className={s.card}>
      <div className={s.media}>
        {p.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.cover} alt="" loading="lazy" />
        ) : (
          <span className={s.noMedia} aria-hidden>
            <span className={s.coverHost}>{p.links.live ? new URL(p.links.live).host : p.title}</span>
            <span className={s.coverRole}>{p.role}</span>
            <span className={s.coverStack}>
              {p.stack.slice(0, 5).map((t) => (
                <i key={t}>{t}</i>
              ))}
            </span>
          </span>
        )}
      </div>
      <div className={s.body}>
        <div className={s.meta}>
          <span>{p.category === "Professional work" ? p.role : p.category}</span>
          <span>{p.year}</span>
        </div>
        <h3 className={s.title}>{p.title}</h3>
        <p className={s.tag}>{p.tagline}</p>
        {p.outcome[0] && (
          <p className={s.result}>
            <Rich text={p.outcome[0]} />
          </p>
        )}
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
