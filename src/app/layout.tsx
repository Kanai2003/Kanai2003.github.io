import type { Metadata, Viewport } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { education, profile } from "@/data/profile";
import { absoluteUrl, jsonLd, personId, siteTitle, websiteId } from "@/lib/seo";
// Fonts are bundled from npm (Fontsource) instead of next/font/google, so the
// build never depends on downloading from Google Fonts (that download was
// failing intermittently in CI and breaking deploys).
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: siteTitle,
    template: `%s · ${profile.name}`,
  },
  description: profile.seoDescription,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  category: "technology",
  keywords: [
    profile.name,
    ...profile.availability.roles,
    "AI engineer India",
    "AI agent developer",
    "LangGraph developer",
    "LangChain developer",
    "FastAPI developer",
    "Next.js developer",
    "freelance AI developer",
    "remote software engineer India",
  ],
  formatDetection: { email: false, telephone: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  // Paste the Google Search Console / Bing tokens into profile.ts to verify ownership.
  verification: {
    ...(profile.seo.googleVerification ? { google: profile.seo.googleVerification } : {}),
    ...(profile.seo.bingVerification ? { other: { "msvalidate.01": profile.seo.bingVerification } } : {}),
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f6f9" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1117" },
  ],
};

// Applies a saved theme before first paint so there is no flash.
const themeScript = `try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}`;

/** Site-wide structured data: who this site is about, and the site itself. */
const siteLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: profile.name,
      alternateName: profile.alternateNames,
      givenName: profile.givenName,
      familyName: profile.familyName,
      jobTitle: profile.role,
      description: profile.seoDescription,
      url: profile.siteUrl,
      image: {
        "@type": "ImageObject",
        url: absoluteUrl(profile.photo),
        width: 704,
        height: 900,
        caption: `${profile.name}, ${profile.role}`,
      },
      hasOccupation: {
        "@type": "Occupation",
        name: profile.role,
        occupationLocation: { "@type": "Country", name: "India" },
        skills: "AI agents, LangGraph, LangChain, FastAPI, Python, Next.js, TypeScript, PostgreSQL, Redis, Docker, CI/CD",
      },
      homeLocation: { "@type": "Place", name: "Kolkata, India" },
      email: `mailto:${profile.email}`,
      nationality: { "@type": "Country", name: "India" },
      address: { "@type": "PostalAddress", addressCountry: "IN" },
      worksFor: { "@type": "Organization", name: profile.currentCompany, url: profile.currentCompanyUrl },
      alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
      sameAs: Object.values(profile.links),
      knowsAbout: [
        "AI agents",
        "LangGraph",
        "LangChain",
        "Large language models",
        "Next.js",
        "React",
        "FastAPI",
        "Python",
        "TypeScript",
        "PostgreSQL",
        "Redis",
        "Docker",
        "CI/CD",
        "System design",
      ],
      knowsLanguage: ["English", "Bengali", "Hindi"],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: profile.siteUrl,
      name: profile.name,
      description: profile.seoDescription,
      inLanguage: "en",
      publisher: { "@id": personId },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(siteLd)} />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
