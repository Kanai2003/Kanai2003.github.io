/**
 * Photos shown on the About page.
 *
 * How to add a photo:
 *   1. Put the file in /public/gallery/ (JPG or WebP, about 1600px on the long side).
 *   2. Add or edit an entry below with the same file name.
 *   3. Commit and push. The site rebuilds automatically.
 *
 * Entries whose file does not exist yet are shown as labelled empty frames while
 * you run `npm run dev`, and are hidden in the published site.
 *
 * shape: "wide" (3:2), "tall" (4:5) or "square".
 */
export interface GalleryPhoto {
  src: string;
  alt: string;
  caption: string;
  shape: "wide" | "tall" | "square";
}

export const gallery: GalleryPhoto[] = [
  {
    src: "/gallery/workspace.jpg",
    alt: "My desk setup with two monitors",
    caption: "Where most of the shipping happens",
    shape: "wide",
  },
  {
    src: "/gallery/team.jpg",
    alt: "With the Datachecks team",
    caption: "With the team at Datachecks",
    shape: "tall",
  },
  {
    src: "/gallery/hackathon.jpg",
    alt: "Presenting at a hackathon",
    caption: "Demo day at a hackathon",
    shape: "square",
  },
  {
    src: "/gallery/talk.jpg",
    alt: "Speaking at a tech meetup",
    caption: "Talking about AI agents at a meetup",
    shape: "wide",
  },
  {
    src: "/gallery/graduation.jpg",
    alt: "Graduation day at Techno International New Town",
    caption: "B.Tech graduation, 2025",
    shape: "tall",
  },
  {
    src: "/gallery/outside.jpg",
    alt: "Outdoors on a weekend trip",
    caption: "Away from the keyboard",
    shape: "square",
  },
];
