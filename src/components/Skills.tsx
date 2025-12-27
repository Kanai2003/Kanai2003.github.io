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
  FaServer,
  FaHtml5,
  FaCss3,
  FaAws,
} from "react-icons/fa";
import { FaCircleDot } from "react-icons/fa6";
import { FcScatterPlot } from "react-icons/fc";
import { GrServices } from "react-icons/gr";
import { PiFlowArrow } from "react-icons/pi";
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
  SiGnubash,
  SiExpress,
  SiRedux,
  SiMui,
  SiRecoil,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiStreamlit,
  SiFoodpanda,
  SiGooglecloud,
  SiLangchain,
} from "react-icons/si";
import { TbHexagonLetterC, TbPrompt, TbSql } from "react-icons/tb";

const iconMap: { [key: string]: React.ElementType } = {
  Java: FaJava,
  Python: FaPython,
  TypeScript: SiTypescript,
  SQL: TbSql,
  Bash: SiGnubash,
  Rust: SiRust,
  "RESTful APIs": FaServer,
  FastAPI: SiFastapi,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  "Node.js": FaNodeJs,
  Microservices: GrServices,
  Docker: FaDocker,
  "Docker Compose": FaDocker,
  "GitHub Actions": SiGithubactions,
  Git: FaGitAlt,
  "Linux (Shell Scripting)": FaLinux,
  "Next.js": SiNextdotjs,
  React: FaReact,
  "Tailwind CSS": SiTailwindcss,
  JavaScript: SiJavascript,
  C: TbHexagonLetterC,
  "Express.js": SiExpress,
  Redux: SiRedux,
  Zustand: FaCircleDot,
  HTML: FaHtml5,
  CSS: FaCss3,
  MUI: SiMui,
  Recoil: SiRecoil,
  Pandas: SiPandas,
  NumPy: SiNumpy,
  "Scikit-learn": SiScikitlearn,
  Streamlit: SiStreamlit,
  Matplotlib: FcScatterPlot,
  Seaborn: FcScatterPlot,
  GCP: SiGooglecloud,
  AWS: FaAws,
  "React Flow": PiFlowArrow,
  LangChain: SiLangchain,
  LangGraph: SiLangchain,
  "Prompt Engineering": TbPrompt,
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
