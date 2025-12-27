"use client";

import styles from "./Skills.module.css";
import { resumeData } from "@/data/resume";
import { motion } from "framer-motion";
import {
  FaJava,
  FaPython,
  FaDocker,
  FaGitAlt,
  FaLinux,
  FaReact,
  FaNodeJs,
  FaExternalLinkAlt,
} from "react-icons/fa";
import {
  SiTypescript,
  SiRust,
  SiFastapi,
  SiPostgresql,
  SiMongodb,
  SiNextdotjs,
  SiTailwindcss,
  SiGithubactions,
  SiJavascript,
} from "react-icons/si";
import { TbSql } from "react-icons/tb";

const iconMap: { [key: string]: React.ElementType } = {
  Java: FaJava,
  Python: FaPython,
  TypeScript: SiTypescript,
  SQL: TbSql,
  Bash: FaLinux, // Using Linux for Bash/Shell
  Rust: SiRust,
  "RESTful APIs": FaNodeJs, // Generic backend icon
  FastAPI: SiFastapi,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  "Node.js": FaNodeJs,
  Microservices: FaDocker, // Generic containerization/microservice
  Docker: FaDocker,
  "GitHub Actions": SiGithubactions,
  Git: FaGitAlt,
  "Linux (Shell Scripting)": FaLinux,
  "Next.js": SiNextdotjs,
  React: FaReact,
  "Tailwind CSS": SiTailwindcss,
  JavaScript: SiJavascript,
};

export default function Skills() {
  // Flatten skills into a single list for the grid or keep categories?
  // Categories are better.

  return (
    <section id="skills" className={styles.section}>
      <div className={styles.container}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.heading}
        >
          Technical Skills
        </motion.h2>

        <div className={styles.categories}>
          {Object.entries(resumeData.skills).map(
            ([category, skills], catIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 }}
                className={styles.category}
              >
                <h3 className={styles.catTitle}>
                  {category.replace(/([A-Z])/g, " $1").trim()}
                </h3>{" "}
                {/* CamelCase to Title Case */}
                <div className={styles.skillGrid}>
                  {skills.map((skill) => {
                    const Icon = iconMap[skill] || FaExternalLinkAlt;
                    return (
                      <div key={skill} className={styles.skillItem}>
                        <Icon className={styles.icon} />
                        <span className={styles.skillName}>{skill}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
