import styles from "./Navbar.module.css";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { resumeData } from "@/data/resume";
import { SiLeetcode } from "react-icons/si";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            Kanai
            <span className={styles.highlight}>.Engineer</span>
          </Link>
        </div>
        <div className={styles.links}>
          <Link href="#about">About</Link>
          <Link href="#experience">Experience</Link>
          <Link href="#projects">Projects</Link>
          <Link href="#contact">Contact</Link>
        </div>
        <div className={styles.socials}>
          <a
            href={resumeData.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </a>
          <a
            href={resumeData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href={resumeData.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Leetcode"
          >
            <SiLeetcode size={20} />
          </a>
        </div>
      </div>
    </nav>
  );
}
