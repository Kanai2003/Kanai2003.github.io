import type { Metadata, Viewport } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { profile } from "@/data/profile";
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
    default: `${profile.name} · ${profile.role}`,
    template: `%s · ${profile.name}`,
  },
  description: profile.headline,
  keywords: [
    ...profile.availability.roles,
    "AI engineer",
    "full stack developer",
    "contract AI developer",
    "remote software engineer India",
    "LangGraph",
    "LangChain",
    "Next.js developer",
    "FastAPI",
    "freelance AI developer India",
    profile.name,
  ],
  authors: [{ name: profile.name, url: profile.siteUrl }],
  openGraph: {
    type: "website",
    url: profile.siteUrl,
    siteName: profile.name,
    title: `${profile.name} · ${profile.role}`,
    description: profile.headline,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${profile.name}, ${profile.role}` }],
  },
  twitter: { card: "summary_large_image", creator: "@KManna16", images: ["/og.png"] },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f6f9" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1117" },
  ],
};

// Applies a saved theme before first paint so there is no flash.
const themeScript = `try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}`;

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: profile.siteUrl,
  image: `${profile.siteUrl}${profile.photo}`,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressCountry: "IN" },
  worksFor: { "@type": "Organization", name: profile.currentCompany, url: profile.currentCompanyUrl },
  alumniOf: "Techno International New Town",
  sameAs: Object.values(profile.links),
  knowsAbout: ["AI agents", "LangGraph", "LangChain", "Next.js", "FastAPI", "Python", "TypeScript", "Docker"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
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
