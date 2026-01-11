"use client";

import styles from "./Projects.module.css";
import { resumeData } from "@/data/resume";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { projectsData } from "@/data/projects";
import { getSkillIcon } from "@/constants/skills";

export default function Projects() {
  // Helper to find slug from project name since resumeData doesn't have it
  const getProjectSlug = (name: string) => {
    // This is a simple mapping based on the known structure.
    // Ideally resumeData and projectsData should be unified.
    const slugMap: Record<string, string> = {
      "Lynx API": "lynx-api",
      "Codebase Tracker": "codebase-tracker",
      "Chat-Mine": "chat-mine",
    };
    return slugMap[name] || name.toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.container}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.heading}
        >
          Featured Projects
        </motion.h2>

        <div className={styles.grid}>
          {resumeData.projects.map((project, index) => {
            const slug = getProjectSlug(project.name);
            const hasDetails = projectsData[slug];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={styles.card}
              >
                <div className={styles.cardContent}>
                  <div className={styles.topRow}>
                    <h3 className={styles.title}>{project.name}</h3>
                    <div className={styles.links}>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visit Site"
                      >
                        <FaExternalLinkAlt />
                      </a>
                    </div>
                  </div>
                  <p className={styles.description}>{project.description}</p>
                  <div className={styles.tags}>
                    {project.tech.map((tag, i) => {
                      const Icon = getSkillIcon(tag);
                      return (
                        <span key={i} className={styles.tag}>
                          <Icon style={{ marginRight: "0.25rem" }} />
                          {tag}
                        </span>
                      );
                    })}
                  </div>

                  {hasDetails && (
                    <div className={styles.footer}>
                      <Link
                        href={`/projects/${slug}`}
                        className={styles.detailsLink}
                      >
                        View Details <FaArrowRight />
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
