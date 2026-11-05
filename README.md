# kanai2003.github.io

Personal site of **Kanailal Manna**, AI full-stack engineer. Built with Next.js (static export) and deployed to GitHub Pages on every push to `main`.

Live: https://kanai2003.github.io

## Pages

| Route | Purpose | Who it's for |
| --- | --- | --- |
| `/` | Headline, results, selected work, the full-stack AI pitch | Everyone, first 30 seconds |
| `/projects`, `/projects/[slug]` | Work and experience: each role with bold highlights and its case study, then side projects | Hiring managers, recruiters, clients |
| `/ai` | How I architect and ship AI features, with honest shipped/built/exploring labels | Technical reviewers, AI clients |
| `/skills` | Skills matrix where every skill links to the job or project that proves it, plus a copy-paste ATS list | Recruiters |
| `/experience` | Redirects to `/projects#experience` so old links keep working | n/a |
| `/open-source` | GitHub stats, contribution graph, languages and repos, fetched at build time | Engineers |
| `/about` | Story, working principles, education, certifications, photo gallery | Everyone |
| `/hire` | Two tracks (employers / freelance clients) with services, process and pre-filled emails | Employers, clients |

## Updating content

All content lives in `src/data/`. You should rarely need to touch a component.

| File | What it controls |
| --- | --- |
| `profile.ts` | Name, headline, links, email, availability note, proof numbers, education, certificates |
| `experience.ts` | Jobs and their highlights |
| `projects.ts` | Projects and case studies. Set `featured: true` to show one on the home page |
| `skills.ts` | Skills, their depth (`shipped`, `built`, `learning`) and evidence links |
| `services.ts` | Freelance services, process and engagement options on `/hire` |
| `gallery.ts` | Photos on `/about` |

### Photos

- **Portrait**: replace `public/mypic.jpeg` (4:5 crop works best). It's used on the home page, the About page and in structured data.
- **Gallery**: put images in `public/gallery/` and list them in `src/data/gallery.ts`. During `npm run dev`, entries without a file show as labelled empty frames so you can see where each photo goes. The published site hides them, and hides the whole Photos section until at least one photo exists.
- **Project screenshots**: put them in `public/projects/` and reference them in the project's `cover` and `gallery` in `projects.ts`. YouTube links in a gallery are embedded automatically.

### Résumé

Replace `public/Kanai_Resume.pdf`. Every download button points to it (path set in `profile.ts`).

### Social preview image

`public/og.png` (1200×630) is what shows when the link is shared on LinkedIn, X, Slack or email.

## GitHub and npm data

Nothing on `/open-source` is typed in by hand. `src/lib/github.ts` fetches it at build time from:

- GitHub REST API: profile, repositories, stars, languages and recently active repos
- GitHub search API: merged pull requests to repositories you don't own, grouped by repository (PR titles are never shown), plus Hacktoberfest years
- npm registry and downloads API: every package maintained by `npmUser`, with version and monthly downloads
- github-contributions-api.jogruber.de: the contribution graph

The only inputs are `githubUser` and `npmUser` in `src/data/profile.ts`. The deploy workflow passes `GITHUB_TOKEN` to avoid rate limits and rebuilds every Monday. If an API is down, the build still succeeds and that section is hidden or marked as missing.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
npm run lint
```
