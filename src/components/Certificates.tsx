"use client";

import styles from "./Certificates.module.css";
import { resumeData } from "@/data/resume";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function Certificates() {
  return (
    <section id="certificates" className={styles.section}>
      <div className={styles.container}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.heading}
        >
          Certificates
        </motion.h2>

        <div className={styles.grid}>
          {resumeData.certificates.map((cert, index) => (
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
                  <h3 className={styles.title} style={{ fontSize: "1.25rem" }}>
                    {cert.name}
                  </h3>
                  <div className={styles.links}>
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View Certificate"
                    >
                      <FaExternalLinkAlt />
                    </a>
                  </div>
                </div>
                <p className={styles.description} style={{ marginBottom: 0 }}>
                  Issued by:{" "}
                  <span style={{ color: "var(--primary)", fontWeight: 500 }}>
                    {cert.issuer}
                  </span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
