import type { ContributionDay } from "@/lib/github";
import s from "./ContributionGraph.module.css";

/** GitHub-style heatmap rendered as SVG at build time. Columns are weeks. */
export default function ContributionGraph({
  days,
  total,
  bare = false,
}: {
  days: ContributionDay[];
  total: number | null;
  /** Drop the card chrome when placed inside another panel. */
  bare?: boolean;
}) {
  if (!days.length) return null;

  const cell = 11;
  const gap = 3;
  const firstDow = new Date(days[0].date + "T00:00:00Z").getUTCDay();
  const weeks = Math.ceil((days.length + firstDow) / 7);
  const width = weeks * (cell + gap);
  const height = 7 * (cell + gap);

  const months: { x: number; label: string }[] = [];
  let lastMonth = -1;
  days.forEach((d, i) => {
    const date = new Date(d.date + "T00:00:00Z");
    const col = Math.floor((i + firstDow) / 7);
    if (date.getUTCDate() <= 7 && date.getUTCMonth() !== lastMonth) {
      lastMonth = date.getUTCMonth();
      months.push({ x: col * (cell + gap), label: date.toLocaleString("en", { month: "short", timeZone: "UTC" }) });
    }
  });

  return (
    <figure className={bare ? s.bare : s.fig}>
      <div className={s.scroll}>
        <svg
          viewBox={`0 -16 ${width} ${height + 16}`}
          width={width}
          height={height + 16}
          role="img"
          aria-label={`${total ?? "Many"} GitHub contributions in the last year`}
        >
          {months.map((m) => (
            <text key={m.x} x={m.x} y={-5} className={s.month}>
              {m.label}
            </text>
          ))}
          {days.map((d, i) => {
            const idx = i + firstDow;
            return (
              <rect
                key={d.date}
                x={Math.floor(idx / 7) * (cell + gap)}
                y={(idx % 7) * (cell + gap)}
                width={cell}
                height={cell}
                rx={2.5}
                className={s.cell}
                data-level={d.level}
              >
                <title>{`${d.count} contribution${d.count === 1 ? "" : "s"} on ${d.date}`}</title>
              </rect>
            );
          })}
        </svg>
      </div>
      <figcaption className={s.cap}>
        <span>{total !== null ? `${total.toLocaleString("en")} contributions in the last year` : "Last 12 months"}</span>
        <span className={s.key} aria-hidden>
          Less
          {[0, 1, 2, 3, 4].map((l) => (
            <i key={l} data-level={l} />
          ))}
          More
        </span>
      </figcaption>
    </figure>
  );
}
