"use client";

import styles from "./Projects.module.css";
import { resumeData } from "@/data/resume";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function Projects() {
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
          {resumeData.projects.map((project, index) => (
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
                    {/* Assuming link works for both repo or live, using generic external link for now */}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View Project"
                    >
                      <FaExternalLinkAlt />
                    </a>
                  </div>
                </div>
                <p className={styles.description}>{project.description}</p>
                <div className={styles.tags}>
                  {project.tech.map((tag, i) => (
                    <span key={i} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
