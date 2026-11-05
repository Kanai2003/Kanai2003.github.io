import type { Metadata } from "next";
import Rich from "@/components/Rich";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiExternalLink, FiGithub, FiPackage, FiPlayCircle } from "react-icons/fi";
import { getProject, projects } from "@/data/projects";
import s from "./case.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.tagline,
    openGraph: { title: p.title, description: p.tagline, images: p.cover ? [p.cover] : undefined },
  };
}

function youTubeId(url: string) {
  const m = url.match(/(?:youtu\.be\/|v=)([\w-]{11})/);
  return m?.[1];
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug);
  if (!p) notFound();

  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];

  const links = [
    p.links.live && { href: p.links.live, label: "Open live site", Icon: FiExternalLink, primary: true },
    p.links.package && { href: p.links.package, label: "View on npm", Icon: FiPackage, primary: !p.links.live },
    p.links.repo && { href: p.links.repo, label: "Source code", Icon: FiGithub },
    p.links.video && {
      href: p.links.video,
      label: "Watch demo",
      Icon: FiPlayCircle,
      primary: !p.links.live && !p.links.package,
    },
  ].filter(Boolean) as { href: string; label: string; Icon: React.ElementType; primary?: boolean }[];

  return (
    <article>
      <header className="page-head">
        <div className="wrap">
          <Link href="/projects" className={s.back}>
            <FiArrowLeft aria-hidden /> All work
          </Link>
          <h1>{p.title}</h1>
          <p className="lede">{p.tagline}</p>
          {p.confidential && (
            <p className={s.note}>
              Company work. This page covers my role and the product&apos;s public features; internal code, data and
              architecture are left out.
            </p>
          )}
          <dl className={s.facts}>
            <div>
              <dt>Role</dt>
              <dd>{p.role}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{p.year}</dd>
            </div>
            <div>
              <dt>Area</dt>
              <dd>{p.category}</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>{p.stack.join(", ")}</dd>
            </div>
          </dl>
          {links.length > 0 && (
            <div className="btn-row" style={{ marginTop: 28 }}>
              {links.map(({ href, label, Icon, primary }) => (
                <a
                  key={href + label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn ${primary ? "btn-ink" : ""}`}
                >
                  <Icon aria-hidden /> {label}
                </a>
              ))}
            </div>
          )}
        </div>
      </header>

      {p.cover && (
        <div className={`wrap ${s.hero}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.cover} alt={`${p.title} screenshot`} />
        </div>
      )}

      <section className="section">
        <div className={`wrap ${s.body}`}>
          <div className={s.block}>
            <h2>The problem</h2>
            <div className="prose">
              <p>{p.problem}</p>
            </div>
          </div>
          <div className={s.block}>
            <h2>What I built</h2>
            <ul className="prose">
              {p.approach.map((a) => (
                <li key={a}>
                  <Rich text={a} />
                </li>
              ))}
            </ul>
          </div>
          <div className={s.block}>
            <h2>Result</h2>
            <ul className="prose">
              {p.outcome.map((a) => (
                <li key={a}>
                  <Rich text={a} />
                </li>
              ))}
            </ul>
          </div>
          <div className={s.block}>
            <h2>What I learned</h2>
            <ul className="prose">
              {p.learnings.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {p.gallery.length > 1 && (
        <section className="section">
          <div className="wrap">
            <h2 className="sec-title" style={{ marginBottom: 32 }}>
              Gallery
            </h2>
            <div className={s.gallery}>
              {p.gallery.map((g) => {
                const yt = g.type === "video" ? youTubeId(g.url) : undefined;
                return (
                  <figure key={g.url + g.caption} className={yt ? s.wide : undefined}>
                    {yt ? (
                      <div className={s.video}>
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${yt}`}
                          title={g.caption}
                          loading="lazy"
                          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : g.type === "video" ? (
                      <video src={g.url} controls preload="metadata" />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={g.url} alt={g.caption} loading="lazy" />
                    )}
                    <figcaption>{g.caption}</figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap">
          <Link href={`/projects/${next.slug}`} className={s.next}>
            <span className="muted">Next project</span>
            <span className={s.nextTitle}>{next.title}</span>
            <span className="muted">{next.tagline}</span>
          </Link>
        </div>
      </section>
    </article>
  );
}
