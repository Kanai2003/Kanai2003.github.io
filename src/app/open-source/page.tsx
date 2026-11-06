import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { FiArrowUpRight, FiDownload, FiGitBranch, FiGitPullRequest, FiPackage, FiStar } from "react-icons/fi";
import ContributionGraph from "@/components/ContributionGraph";
import { getExternalContributions, getGitHubData, getNpmPackages, type GitHubRepo } from "@/lib/github";
import { profile } from "@/data/profile";
import s from "./oss.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Open source", description:
    "Live GitHub and npm stats for Kanailal Manna: contribution graph, languages, published npm packages and pull requests merged into other open-source projects.",
  path: "/open-source",
});

/** Six steps from cobalt through teal to grey: harmonised, not rainbow. */
const langColors = ["var(--accent)", "#4f8ae6", "#33a8c7", "#3cb592", "#9aa7c4", "#c7cedc"];


function timeAgo(iso: string) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days < 1) return "today";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

function RepoCard({ r, color }: { r: GitHubRepo; color?: string }) {
  return (
    <li>
      <a href={r.html_url} target="_blank" rel="noopener noreferrer" className={s.repo}>
        <span className={s.repoTop}>
          <span className={s.repoName}>{r.name}</span>
          <FiArrowUpRight aria-hidden className={s.arrow} />
        </span>
        <span className={s.repoDesc}>{r.description ?? "No description"}</span>
        <span className={s.repoMeta}>
          {r.language && (
            <span>
              <i className={s.langDot} style={{ ["--c" as string]: color ?? "var(--muted)" }} aria-hidden />
              {r.language}
            </span>
          )}
          {r.stargazers_count > 0 && (
            <span>
              <FiStar aria-hidden /> {r.stargazers_count}
              <span className="sr-only"> stars</span>
            </span>
          )}
          {r.forks_count > 0 && (
            <span>
              <FiGitBranch aria-hidden /> {r.forks_count}
              <span className="sr-only"> forks</span>
            </span>
          )}
          <span className={s.updated}>{timeAgo(r.pushed_at)}</span>
        </span>
      </a>
    </li>
  );
}

export default async function OpenSourcePage() {
  const [gh, npm, ext] = await Promise.all([getGitHubData(), getNpmPackages(), getExternalContributions()]);
  const built = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  const since = gh.account ? new Date(gh.account.created_at).getFullYear() : 2021;
  const colorOf = (lang: string | null) => {
    const i = gh.languages.findIndex((l) => l.name === lang);
    return i >= 0 ? langColors[i % langColors.length] : undefined;
  };

  const stats = [
    { value: gh.contributionsLastYear?.toLocaleString("en") ?? "–", label: "Contributions in the last year" },
    { value: gh.account?.public_repos ?? "–", label: "Public repositories" },
    { value: gh.stars || "–", label: "Stars earned" },
    { value: ext?.mergedTotal ?? "–", label: "PRs merged into other projects" },
  ];

  return (
    <>
      <header className="page-head">
        <div className={`wrap ${s.head}`}>
          <div>
            <h1>Open source and GitHub</h1>
            <p className="lede">
              Packages I publish, projects I contribute to, and what I&apos;ve been pushing lately. Numbers come
              straight from GitHub and refresh every week.
            </p>
          </div>

          <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className={s.idCard}>
            {gh.account?.avatar_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={gh.account.avatar_url} alt="" width={52} height={52} />
            )}
            <span className={s.idText}>
              <strong>@{profile.githubUser}</strong>
              <span>
                {gh.account ? `${gh.account.followers} followers · since ${since}` : `On GitHub since ${since}`}
              </span>
            </span>
            <span className={`btn btn-ink ${s.follow}`}>Follow</span>
          </a>
        </div>
      </header>

      {/* Overview: one panel holding the numbers, the heatmap and the language mix */}
      <section className="section">
        <div className="wrap">
          <div className={s.board}>
            <ul className={s.stats}>
              {stats.map((st) => (
                <li key={st.label}>
                  <span className={s.statValue}>{st.value}</span>
                  <span className={s.statLabel}>{st.label}</span>
                </li>
              ))}
            </ul>

            <div className={s.boardBody}>
              <ContributionGraph days={gh.contributions} total={gh.contributionsLastYear} bare />

              {gh.languages.length > 0 && (
                <div className={s.langBlock}>
                  <div className={s.langHead}>
                    <h2>Languages</h2>
                    <span className="muted">across {gh.ownCount} original repositories</span>
                  </div>
                  <div className={s.bar} aria-hidden>
                    {gh.languages.map((l, i) => (
                      <span
                        key={l.name}
                        style={{ flexGrow: l.count, ["--c" as string]: langColors[i % langColors.length] }}
                      />
                    ))}
                  </div>
                  <ul className={s.langs}>
                    {gh.languages.map((l, i) => (
                      <li key={l.name}>
                        <i style={{ ["--c" as string]: langColors[i % langColors.length] }} aria-hidden />
                        {l.name}
                        <span className="muted">{Math.round(l.share * 100)}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <p className={s.boardFoot}>
              {gh.ok
                ? `Last synced from the GitHub API on ${built}.`
                : "GitHub was unreachable during the last build, so some numbers are missing. They return on the next build."}
            </p>
          </div>
        </div>
      </section>

      {/* npm packages, from the npm registry */}
      {npm.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="sec-head">
              <h2 className="sec-title">Packages on npm</h2>
              <a href={`https://www.npmjs.com/~${profile.npmUser}`} target="_blank" rel="noopener noreferrer" className="link">
                {npm.length} published package{npm.length === 1 ? "" : "s"} on npm
              </a>
            </div>
            <ul className={s.highlights}>
              {npm.map((p) => (
                <li key={p.name}>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className={s.hl}>
                    <span className={s.hlIcon} aria-hidden>
                      <FiPackage />
                    </span>
                    <span className={s.hlName}>{p.name}</span>
                    <span className={s.hlBody}>{p.description}</span>
                    <span className={s.repoMeta}>
                      <span>v{p.version}</span>
                      {p.downloadsLastMonth !== null && (
                        <span>
                          <FiDownload aria-hidden /> {p.downloadsLastMonth.toLocaleString("en")}/month
                        </span>
                      )}
                      <span className={s.updated}>{timeAgo(p.date)}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Merged PRs to other people's repositories, from GitHub search */}
      {ext && ext.repos.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="sec-head">
              <h2 className="sec-title">Contributions to other projects</h2>
              <p>
                {ext.mergedTotal} merged pull request{ext.mergedTotal === 1 ? "" : "s"} across {ext.repoCount}{" "}
                {ext.repoCount === 1 ? "repository" : "repositories"} I don&apos;t own
                {ext.octoberYears.length > 0 && `, including Hacktoberfest in ${ext.octoberYears.join(", ")}`}.
              </p>
            </div>
            <ul className={s.repos}>
              {ext.repos.slice(0, 6).map((r) => (
                <li key={r.fullName}>
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className={s.repo}>
                    <span className={s.repoTop}>
                      <span className={s.repoName}>{r.fullName}</span>
                      <FiArrowUpRight aria-hidden className={s.arrow} />
                    </span>
                    <span className={s.repoDesc}>{r.description ?? "No description"}</span>
                    <span className={s.repoMeta}>
                      <span>
                        <FiGitPullRequest aria-hidden /> {r.mergedPRs} merged
                      </span>
                      {r.stars > 0 && (
                        <span>
                          <FiStar aria-hidden /> {r.stars.toLocaleString("en")}
                          <span className="sr-only"> stars</span>
                        </span>
                      )}
                      <span className={s.updated}>{timeAgo(r.lastMerged)}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Recent repositories */}
      {gh.recent.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="sec-head">
              <h2 className="sec-title">Recently active repositories</h2>
              <a href={`${profile.links.github}?tab=repositories`} target="_blank" rel="noopener noreferrer" className="link">
                All {gh.account?.public_repos ?? ""} repositories on GitHub
              </a>
            </div>
            <ul className={s.repos}>
              {gh.recent.map((r) => (
                <RepoCard key={r.name} r={r} color={colorOf(r.language)} />
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
