/**
 * /llms.txt: a plain-text summary of this site for AI assistants and AI search
 * (ChatGPT, Perplexity, Claude, Gemini). Generated from the same data as the pages,
 * so it never goes out of date. See https://llmstxt.org
 */
import { profile, proofPoints, education } from "@/data/profile";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { coreStack } from "@/data/skills";
import { plain } from "@/components/Rich";

export const dynamic = "force-static";

export function GET() {
  const u = (p: string) => `${profile.siteUrl}${p}`;
  const lines = [
    `# ${profile.name}`,
    "",
    `> ${profile.role} based in ${profile.location}. ${profile.seoDescription}`,
    "",
    plain(profile.summary),
    "",
    `Availability: ${profile.availability.note} Roles: ${profile.availability.roles.join(", ")}. Hire as: ${profile.availability.hireTypes.join(", ")}.`,
    `Contact: ${profile.email} | ${profile.links.linkedin} | ${profile.links.github}`,
    "",
    "## Key results",
    ...proofPoints.map((p) => `- ${p.value}: ${p.label}`),
    "",
    "## Experience",
    ...experience
      .filter((r) => r.id !== "open-source")
      .flatMap((r) => [
        `### ${r.title}, ${r.company} (${r.start} – ${r.end})`,
        ...r.highlights.map((h) => `- ${plain(h)}`),
        "",
      ]),
    "## Projects",
    ...projects.map((p) => `- [${p.title}](${u(`/projects/${p.slug}`)}): ${p.tagline}`),
    "",
    "## Core stack",
    ...coreStack.map((g) => `- ${g.area}: ${g.items.join(", ")}`),
    "",
    "## Education",
    `- ${education.degree}, ${education.school} (${education.years}), ${education.grade}`,
    "",
    "## Pages",
    `- [Work and experience](${u("/projects")})`,
    `- [Skills with evidence](${u("/skills")})`,
    `- [How I build AI systems](${u("/ai")})`,
    `- [Open source and GitHub](${u("/open-source")})`,
    `- [About](${u("/about")})`,
    `- [Hire me](${u("/hire")})`,
    `- [Résumé (PDF)](${u(profile.resume)})`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
