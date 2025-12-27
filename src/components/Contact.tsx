"use client";

import styles from "./Contact.module.css";
import { resumeData } from "@/data/resume";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className={styles.container}
      >
        <h2 className={styles.heading}>Get in Touch</h2>
        <p className={styles.text}>
          Looking for a passionate Software Development Engineer? <br />
          Whether you have a question or just want to say hi, I&apos;ll try my
          best to get back to you!
        </p>

        <div className={styles.contactMethods}>
          <a href={`mailto:${resumeData.email}`} className={styles.method}>
            <FaEnvelope className={styles.icon} />
            <span>{resumeData.email}</span>
          </a>
          <a href={`tel:${resumeData.phone}`} className={styles.method}>
            <FaPhone className={styles.icon} />
            <span>{resumeData.phone}</span>
          </a>
        </div>

        <div className={styles.socials}>
          <a
            href={resumeData.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <FaGithub />
          </a>
          <a
            href={resumeData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <FaLinkedin />
          </a>
        </div>

        <footer className={styles.footer}>
          <p>
            © {new Date().getFullYear()} {resumeData.name}. All Rights Reserved.
          </p>
        </footer>
      </motion.div>
    </section>
  );
}
