import type { Metadata } from "next";
import Link from "next/link";

/**
 * Experience now lives on the Work page. This keeps old links (résumé, LinkedIn, emails)
 * working by sending visitors there. Static export can't do server redirects, so it uses
 * a meta refresh with a visible link as a fallback.
 */
export const metadata: Metadata = {
  title: "Experience",
  robots: { index: false, follow: true },
  alternates: { canonical: "/projects" },
};

export default function ExperienceRedirect() {
  return (
    <section className="page-head" style={{ borderBottom: 0, minHeight: "40vh" }}>
      {/* React hoists this into <head>. */}
      <meta httpEquiv="refresh" content="0; url=/projects#experience" />
      <div className="wrap">
        <h1>Experience has moved</h1>
        <p className="lede">
          My work history is now on the{" "}
          <Link href="/projects#experience" className="link">
            Work page
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
