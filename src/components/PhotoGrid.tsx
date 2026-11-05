import fs from "node:fs";
import path from "node:path";
import type { GalleryPhoto } from "@/data/gallery";
import s from "./PhotoGrid.module.css";

/**
 * Runs at build time. Photos whose file exists render normally.
 * Missing ones show a labelled frame in development (so you know what to add)
 * and are dropped from the production build.
 */
const exists = (src: string) => fs.existsSync(path.join(process.cwd(), "public", src));

export function visiblePhotos(photos: GalleryPhoto[]) {
  const isDev = process.env.NODE_ENV === "development";
  return photos.map((p) => ({ ...p, present: exists(p.src) })).filter((p) => p.present || isDev);
}

export default function PhotoGrid({ photos }: { photos: GalleryPhoto[] }) {
  const items = visiblePhotos(photos);
  if (!items.length) return null;

  return (
    <ul className={s.grid}>
      {items.map((p) => (
        <li key={p.src} className={s.item} data-shape={p.shape}>
          <figure>
            {p.present ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.src} alt={p.alt} loading="lazy" />
            ) : (
              <div className={s.empty}>
                <strong>Add a photo here</strong>
                <code>public{p.src}</code>
                <span>Only visible in development</span>
              </div>
            )}
            <figcaption>{p.caption}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
