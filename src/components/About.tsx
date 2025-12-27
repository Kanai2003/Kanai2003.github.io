"use client";

import styles from "./About.module.css";
import { resumeData } from "@/data/resume";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className={styles.container}
      >
        <h2 className={styles.heading}>About Me</h2>
        <div className={styles.content}>
          <p className={styles.text}>{resumeData.summary}</p>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>4+</span>
              <span className={styles.statLabel}>Years Coding</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>10+</span>
              <span className={styles.statLabel}>Projects</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>3</span>
              <span className={styles.statLabel}>Tech Stacks</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
