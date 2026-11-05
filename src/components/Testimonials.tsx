import { testimonials } from "@/data/testimonials";
import s from "./Testimonials.module.css";

/** Renders nothing until src/data/testimonials.ts has at least one real quote. */
export default function Testimonials({ title = "What people say" }: { title?: string }) {
  if (!testimonials.length) return null;
  return (
    <section className="section">
      <div className="wrap">
        <h2 className="sec-title" style={{ marginBottom: 32 }}>
          {title}
        </h2>
        <ul className={s.list}>
          {testimonials.map((t) => (
            <li key={t.name + t.quote.slice(0, 12)}>
              <figure className={s.item}>
                <blockquote>{t.quote}</blockquote>
                <figcaption>
                  {t.link ? (
                    <a href={t.link} target="_blank" rel="noopener noreferrer" className="link">
                      {t.name}
                    </a>
                  ) : (
                    <strong>{t.name}</strong>
                  )}
                  <span>{t.role}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
