/**
 * One place that builds page metadata, so every page gets the same SEO basics:
 * a unique title and description, a canonical URL, and Open Graph / Twitter
 * tags that describe *that* page (not the home page) when a link is shared.
 */
import type { Metadata } from "next";
import { profile } from "@/data/profile";

interface PageSeo {
  /** Short page name; the layout template appends " · Kanailal Manna". Omit for the home page. */
  title?: string;
  /** 120–160 characters, written for a person reading search results. */
  description: string;
  /** Route path starting with "/", e.g. "/skills". */
  path: string;
  /** Social image path under /public. Defaults to the site card. */
  image?: string;
  imageAlt?: string;
  type?: "website" | "article" | "profile";
  noindex?: boolean;
}

export const siteTitle = `${profile.name} · ${profile.role}`;

export function absoluteUrl(path: string) {
  return new URL(path, profile.siteUrl).toString();
}

export function pageMetadata({
  title,
  description,
  path,
  image = "/og.png",
  imageAlt,
  type = "website",
  noindex,
}: PageSeo): Metadata {
  const fullTitle = title ? `${title} · ${profile.name}` : siteTitle;
  const images = [{ url: image, alt: imageAlt ?? fullTitle, ...(image === "/og.png" ? { width: 1200, height: 630 } : {}) }];
  return {
    // Home uses an absolute title so the template isn't applied twice.
    title: title ? title : { absolute: siteTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: profile.name,
      locale: "en_US",
      title: fullTitle,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      creator: "@KManna16",
      title: fullTitle,
      description,
      images: images.map((i) => i.url),
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Serialises JSON-LD safely for a <script> tag. */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

export const personId = `${profile.siteUrl}/#person`;
export const websiteId = `${profile.siteUrl}/#website`;

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}
