/**
 * GitHub data, fetched at build time (the site is a static export).
 * The deploy workflow also rebuilds on a schedule so these numbers stay fresh.
 * Every fetch fails soft: if GitHub is unreachable the page still builds.
 */
import { profile } from "@/data/profile";

const API = "https://api.github.com";

export interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  avatar_url: string;
  html_url: string;
}

export interface GitHubRepo {
  name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  pushed_at: string;
  topics?: string[];
  homepage?: string | null;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

async function getJSON<T>(url: string): Promise<T | null> {
  try {
    const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
    // Optional: set GITHUB_TOKEN in CI to avoid the 60 requests/hour anonymous limit.
    if (process.env.GITHUB_TOKEN && url.startsWith(API)) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }
    const res = await fetch(url, { headers, cache: "force-cache" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getGitHubData() {
  const user = profile.githubUser;
  const [account, repos, contrib] = await Promise.all([
    getJSON<GitHubUser>(`${API}/users/${user}`),
    getJSON<GitHubRepo[]>(`${API}/users/${user}/repos?per_page=100&sort=pushed`),
    getJSON<{ total: Record<string, number>; contributions: ContributionDay[] }>(
      `https://github-contributions-api.jogruber.de/v4/${user}?y=last`,
    ),
  ]);

  const own = (repos ?? []).filter((r) => !r.fork && r.name.toLowerCase() !== user.toLowerCase());
  const forks = (repos ?? []).filter((r) => r.fork);

  const stars = own.reduce((n, r) => n + r.stargazers_count, 0);

  const langCount = new Map<string, number>();
  for (const r of own) {
    if (r.language) langCount.set(r.language, (langCount.get(r.language) ?? 0) + 1);
  }
  const languages = [...langCount.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count, share: count / Math.max(1, own.length) }));

  const recent = [...own].sort((a, b) => b.pushed_at.localeCompare(a.pushed_at)).slice(0, 6);
  const popular = [...own].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6);

  return {
    ok: Boolean(account && repos),
    account,
    ownCount: own.length,
    forkCount: forks.length,
    forks: forks.sort((a, b) => b.pushed_at.localeCompare(a.pushed_at)).slice(0, 6),
    stars,
    languages,
    recent,
    popular,
    contributions: contrib?.contributions ?? [],
    contributionsLastYear: contrib?.total?.lastYear ?? null,
  };
}

export type GitHubData = Awaited<ReturnType<typeof getGitHubData>>;

/* ------------------------------------------------------------------
   Open-source signals beyond your own repos. All fetched, nothing typed in.
   ------------------------------------------------------------------ */

export interface NpmPackage {
  name: string;
  version: string;
  description: string;
  date: string;
  url: string;
  repo?: string;
  downloadsLastMonth: number | null;
}

/** Every package the npm user maintains, with last-30-day downloads. */
export async function getNpmPackages(): Promise<NpmPackage[]> {
  const search = await getJSON<{
    objects: { package: { name: string; version: string; description?: string; date: string; links: Record<string, string> } }[];
  }>(`https://registry.npmjs.org/-/v1/search?text=maintainer:${profile.npmUser}&size=50`);
  const pkgs = search?.objects.map((o) => o.package) ?? [];
  if (!pkgs.length) return [];

  // Bulk endpoint returns { name: { downloads } } for several packages at once (unscoped only).
  const dl = await getJSON<Record<string, { downloads: number } | null>>(
    `https://api.npmjs.org/downloads/point/last-month/${pkgs.map((p) => p.name).join(",")}`,
  );
  const downloadsOf = (name: string) => {
    if (!dl) return null;
    if (pkgs.length === 1) return (dl as unknown as { downloads?: number }).downloads ?? null;
    return dl[name]?.downloads ?? null;
  };

  return pkgs
    .map((p) => ({
      name: p.name,
      version: p.version,
      description: p.description ?? "",
      date: p.date,
      url: p.links.npm ?? `https://www.npmjs.com/package/${p.name}`,
      repo: p.links.repository?.replace(/^git\+/, "").replace(/\.git$/, ""),
      downloadsLastMonth: downloadsOf(p.name),
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export interface ExternalRepo {
  fullName: string;
  url: string;
  description: string | null;
  stars: number;
  language: string | null;
  mergedPRs: number;
  lastMerged: string;
}

/**
 * Merged pull requests to repositories you don't own, grouped by repository.
 * Only repository-level facts are shown (name, stars, PR count), never PR titles,
 * so internal ticket IDs in titles are never published.
 */
export async function getExternalContributions() {
  const user = profile.githubUser;
  const res = await getJSON<{
    total_count: number;
    items: { repository_url: string; closed_at: string; created_at: string }[];
  }>(`${API}/search/issues?q=${encodeURIComponent(`type:pr author:${user} -user:${user} is:merged`)}&per_page=100&sort=updated`);
  if (!res) return null;

  const byRepo = new Map<string, { count: number; last: string }>();
  for (const it of res.items) {
    const name = it.repository_url.replace(`${API}/repos/`, "");
    const cur = byRepo.get(name) ?? { count: 0, last: "" };
    byRepo.set(name, { count: cur.count + 1, last: it.closed_at > cur.last ? it.closed_at : cur.last });
  }

  const repos = (
    await Promise.all(
      [...byRepo.entries()].map(async ([fullName, v]): Promise<ExternalRepo> => {
        const meta = await getJSON<GitHubRepo>(`${API}/repos/${fullName}`);
        return {
          fullName,
          url: meta?.html_url ?? `https://github.com/${fullName}`,
          description: meta?.description ?? null,
          stars: meta?.stargazers_count ?? 0,
          language: meta?.language ?? null,
          mergedPRs: v.count,
          lastMerged: v.last,
        };
      }),
    )
  ).sort((a, b) => b.stars - a.stars || b.mergedPRs - a.mergedPRs);

  // Years with merged PRs opened in October, i.e. Hacktoberfest participation.
  const octoberYears = [
    ...new Set(res.items.filter((i) => new Date(i.created_at).getUTCMonth() === 9).map((i) => i.created_at.slice(0, 4))),
  ].sort();

  return { mergedTotal: res.total_count, repoCount: byRepo.size, repos, octoberYears };
}
