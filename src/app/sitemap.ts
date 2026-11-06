import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { nav } from "@/data/nav";

export const dynamic = "force-static";

/** Every indexable page, with the build date as last-modified and the key images. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = profile.siteUrl;
  const lastModified = new Date();
  return [
    { url: base, lastModified, changeFrequency: "weekly", priority: 1, images: [`${base}${profile.photo}`] },
    ...[...nav.map((n) => n.href), "/hire"].map((p) => ({
      url: `${base}${p}`,
      lastModified,
      changeFrequency: (p === "/open-source" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: p === "/projects" || p === "/hire" ? 0.9 : 0.7,
    })),
    ...projects.map((p) => ({
      url: `${base}/projects/${p.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: p.featured ? 0.8 : 0.6,
      images: p.cover ? [`${base}${p.cover}`] : undefined,
    })),
  ];
}
