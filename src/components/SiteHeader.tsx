"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { profile } from "@/data/profile";
import { nav } from "@/data/nav";
import s from "./SiteHeader.module.css";


/** No React state: both icons render and CSS shows the right one, so there is no hydration flicker. */
function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const isDark = root.dataset.theme
      ? root.dataset.theme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    const next = isDark ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button className={`${s.icon} ${s.theme}`} onClick={toggle} aria-label="Toggle dark theme">
      <FiMoon className={s.moon} aria-hidden />
      <FiSun className={s.sun} aria-hidden />
    </button>
  );
}

export default function SiteHeader() {
  const path = usePathname();
  // Remember which page the menu was opened on; navigating closes it automatically.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === path;
  const setOpen = (fn: (o: boolean) => boolean) => setOpenOn(fn(open) ? path : null);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) => path === href || path.startsWith(href + "/");

  return (
    <header className={s.bar}>
      <div className={`wrap ${s.inner}`}>
        <Link href="/" className={s.brand} aria-label={`${profile.name}, home`}>
          <span className={s.mark} aria-hidden>
            KM
          </span>
          <span className={s.name}>{profile.name}</span>
        </Link>

        <nav className={s.nav} aria-label="Main">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className={s.link} aria-current={isActive(n.href) ? "page" : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className={s.actions}>
          <ThemeToggle />
          <Link href="/hire" className="btn btn-ink">
            Hire me
          </Link>
          <button
            className={`${s.icon} ${s.menuBtn}`}
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      <div id="mobile-nav" className={s.sheet} data-open={open} hidden={!open}>
        <nav className="wrap" aria-label="Mobile">
          {[...nav, { href: "/hire", label: "Hire me" }].map((n) => (
            <Link key={n.href} href={n.href} className={s.sheetLink} aria-current={isActive(n.href) ? "page" : undefined}>
              {n.label}
            </Link>
          ))}
          <a className={`btn ${s.sheetResume}`} href={profile.resume} download>
            Download résumé (PDF)
          </a>
        </nav>
      </div>
    </header>
  );
}
