"use client";

import styles from "./Hero.module.css";
import { resumeData } from "@/data/resume";
import { motion } from "framer-motion";
import { FaDownload, FaBriefcase } from "react-icons/fa";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.content}
        >
          <span className={styles.greeting}>Hello 👋, I&apos;m</span>
          <h1 className={styles.name}>{resumeData.name}</h1>
          <h2 className={styles.title}>
            I build <span className={styles.highlight}>scalable</span> data
            platforms, <span className={styles.highlight}>AI & ML</span>{" "}
            solutions, &{" "}
            <span className={styles.highlight}>high-performance</span> web apps.
          </h2>
          {/* <p className={styles.summary}>{resumeData.summary}</p> */}

          <div className={styles.actions}>
            <a href="/Kanai_Resume.pdf" download className={styles.primaryBtn}>
              <FaDownload /> Download Resume
            </a>
            <a href="#experience" className={styles.secondaryBtn}>
              <FaBriefcase /> View Experience
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={styles.visual}
        >
          <div className={styles.circle}></div>
          <div className={styles.circle2}></div>
          <img
            src="/hero_image.png"
            width={400}
            height={400}
            alt={resumeData.name}
            className={styles.heroImage}
          />
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className={styles.bgGlow}></div>
    </section>
  );
}
