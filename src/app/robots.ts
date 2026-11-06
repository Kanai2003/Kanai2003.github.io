import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    // /experience is not blocked here on purpose: crawlers need to reach it to see its
    // noindex tag and canonical pointing at /projects.
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${profile.siteUrl}/sitemap.xml`,
  };
}
