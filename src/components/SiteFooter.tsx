import Link from "next/link";
import { FaGithub, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { SiLeetcode, SiNpm } from "react-icons/si";
import { profile } from "@/data/profile";
import { nav } from "@/data/nav";
import HideOn from "./HideOn";
import s from "./SiteFooter.module.css";

const socials = [
  { href: profile.links.github, label: "GitHub", Icon: FaGithub },
  { href: profile.links.linkedin, label: "LinkedIn", Icon: FaLinkedin },
  { href: profile.links.x, label: "X", Icon: FaXTwitter },
  { href: profile.links.leetcode, label: "LeetCode", Icon: SiLeetcode },
  { href: profile.links.npm, label: "npm", Icon: SiNpm },
  { href: profile.links.youtube, label: "YouTube", Icon: FaYoutube },
];

export default function SiteFooter() {
  return (
    <footer className={s.foot}>
      {/* The home page ends with its own hiring and freelance calls to action */}
      <HideOn paths={["/"]}>
        <div className={`wrap ${s.cta}`}>
          <h2 className={s.big}>Have a role or a product in mind?</h2>
          <div className={s.ctaSide}>
            <p className="muted">I reply to every message within a day.</p>
            <div className="btn-row">
              <Link href="/hire" className="btn btn-ink">
                Start a conversation
              </Link>
              <a href={`mailto:${profile.email}`} className="btn">
                {profile.email}
              </a>
            </div>
          </div>
        </div>
      </HideOn>

      <div className={`wrap ${s.bottom}`}>
        <nav className={s.links} aria-label="Footer">
          {nav.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
          <Link href="/hire">Hire me</Link>
          <a href={profile.resume} download={profile.resumeFileName}>
            Résumé
          </a>
        </nav>
        <ul className={s.socials}>
          {socials.map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="me noopener noreferrer"
                aria-label={label}
              >
                <Icon />
              </a>
            </li>
          ))}
        </ul>
        <p className={s.copy}>
          © {new Date().getFullYear()} {profile.name}. Built with Next.js,
          deployed on GitHub Pages.
        </p>
      </div>
    </footer>
  );
}
