import { projectsData } from "@/data/projects";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from "react-icons/fa";
import { notFound } from "next/navigation";
import { getSkillIcon } from "@/constants/skills";

export function generateStaticParams() {
  return Object.keys(projectsData).map((slug) => ({
    slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectsData[slug];

  if (!project) {
    notFound();
  }

  return (
    <main className={styles.container}>
      <Link href="/#projects" className={styles.backLink}>
        <FaArrowLeft /> Back to Projects
      </Link>

      <section className={styles.hero}>
        <Image
          src={project.heroMedia.url}
          alt={project.heroMedia.alt}
          fill
          priority
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>{project.title}</h1>
            <p className={styles.shortDescription}>
              {project.shortDescription}
            </p>
          </div>
        </div>
      </section>

      <div className={styles.contentContainer}>
        <div className={styles.mainContent}>
          <section>
            <h2 className={styles.sectionTitle}>Overview</h2>
            <p className={styles.text}>{project.fullDescription}</p>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>Key Features</h2>
            <ul className={styles.featureList}>
              {project.features.map((feature, index) => (
                <li key={index} className={styles.featureItem}>
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>Learnings & Challenges</h2>
            <ul className={styles.learningList}>
              {project.learnings.map((learning, index) => (
                <li key={index} className={styles.learningItem}>
                  {learning}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>Gallery</h2>
            <div className={styles.gallery}>
              {project.gallery.map((item, index) => {
                const isYouTube = item.type === "video";

                let videoId = "";
                if (isYouTube) {
                  try {
                    const urlObj = new URL(item.url);
                    if (item.url.includes("youtube.com")) {
                      videoId = urlObj.searchParams.get("v") || "";
                    } else if (item.url.includes("youtu.be")) {
                      videoId = urlObj.pathname.slice(1);
                    }
                  } catch (e) {
                    console.error("Invalid YouTube URL:", item.url);
                  }
                }

                return (
                  <div key={index} className={styles.galleryItem}>
                    {isYouTube && videoId ? (
                      <div className={styles.videoWrapper}>
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`}
                          title={item.caption}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className={styles.iframe}
                        ></iframe>
                      </div>
                    ) : (
                      <Image
                        src={item.url}
                        alt={item.caption}
                        width={800}
                        height={600}
                        className={styles.galleryImage}
                      />
                    )}
                    <div className={styles.galleryCaption}>{item.caption}</div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarSection}>
            <h3 className={styles.sidebarTitle}>Tech Stack</h3>
            <div className={styles.techTags}>
              {project.techStack.map((tech, index) => {
                const Icon = getSkillIcon(tech);
                return (
                  <span key={index} className={styles.techTag}>
                    <Icon
                      style={{
                        marginRight: "0.25rem",
                        verticalAlign: "middle",
                      }}
                    />{" "}
                    {tech}
                  </span>
                );
              })}
            </div>
          </div>

          <div className={styles.sidebarSection}>
            <h3 className={styles.sidebarTitle}>Links</h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkButton}
                >
                  <FaExternalLinkAlt /> Live Demo
                </a>
              )}
              {project.links.repo && (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.linkButton} ${styles.secondary}`}
                >
                  <FaGithub /> View Code
                </a>
              )}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
