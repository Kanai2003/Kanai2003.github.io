import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="page-head" style={{ borderBottom: 0, minHeight: "50vh" }}>
      <div className="wrap">
        <h1>This page doesn&apos;t exist</h1>
        <p className="lede">The link may be old. Everything is still reachable from the home page.</p>
        <div className="btn-row" style={{ marginTop: 28 }}>
          <Link href="/" className="btn btn-ink">
            Go to home
          </Link>
          <Link href="/projects" className="btn">
            See my work
          </Link>
        </div>
      </div>
    </section>
  );
}
