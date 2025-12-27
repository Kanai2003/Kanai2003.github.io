"use client";

import styles from "./Experience.module.css";
import { resumeData } from "@/data/resume";
import { motion } from "framer-motion";

export default function Experience() {
  return (
    <section id="experience" className={styles.section}>
      <div className={styles.container}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.heading}
        >
          Work Experience
        </motion.h2>

        <div className={styles.timeline}>
          {resumeData.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={styles.item}
            >
              <div className={styles.marker}></div>
              <div className={styles.content}>
                <div className={styles.header}>
                  <h3 className={styles.role}>{exp.role}</h3>
                  <span className={styles.date}>{exp.date}</span>
                </div>
                <h4 className={styles.company}>
                  {exp.company} | {exp.location}
                </h4>
                <ul className={styles.description}>
                  {exp.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
