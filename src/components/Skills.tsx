"use client";

import styles from "./Skills.module.css";
import { resumeData } from "@/data/resume";
import { motion } from "framer-motion";
import { getSkillIcon } from "@/constants/skills";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function Skills() {
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
                    const Icon = getSkillIcon(skill);
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
