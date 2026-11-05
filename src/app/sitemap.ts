import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { nav } from "@/data/nav";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = profile.siteUrl;
  return [
    { url: base, priority: 1 },
    ...[...nav.map((n) => n.href), "/hire"].map((p) => ({ url: `${base}${p}`, priority: 0.8 })),
    ...projects.map((p) => ({ url: `${base}/projects/${p.slug}`, priority: 0.6 })),
  ];
}
