import s from "./AgentTrace.module.css";

/**
 * The hero's signature element: one agent run, printed line by line on load.
 * Each step is tagged with the layer of the stack it touches, which is the
 * point: one engineer owning the interface, the API and the model logic.
 * Pure CSS animation, so it renders fully without JavaScript.
 */
type Layer = "UI" | "API" | "LLM" | "DATA";
type Line = { kind: string; text: string; meta?: string; layer?: Layer; tone?: "ok" | "warn" | "answer" };

const run: Line[] = [
  { kind: "user", text: "Why did yesterday's orders dashboard drop 40%?", layer: "UI" },
  { kind: "plan", text: "check freshness → trace lineage → compare row counts", layer: "LLM" },
  { kind: "tool", text: "warehouse.query(orders_daily, last=2d)", meta: "212 ms", layer: "DATA" },
  { kind: "tool", text: "lineage.upstream(\"orders_daily\")", meta: "88 ms", layer: "API" },
  { kind: "found", text: "ingest job failed 02:14 UTC, 0 rows loaded", tone: "warn", layer: "LLM" },
  { kind: "tool", text: "jobs.rerun(\"orders_ingest\")", meta: "41 ms", layer: "API" },
  { kind: "reply", text: "The overnight load failed. I re-ran it and notified the owner.", tone: "answer", layer: "UI" },
];

export default function AgentTrace() {
  return (
    <figure className={s.panel} aria-label="Example of an AI agent run">
      <div className={s.top}>
        <span className={s.dots} aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span className={s.title}>agent run · data-quality-assistant</span>
        <span className={s.live}>running</span>
      </div>

      <ol className={s.lines}>
        {run.map((l, i) => (
          <li key={i} className={s.line} style={{ animationDelay: `${0.5 + i * 0.55}s` }} data-tone={l.tone}>
            <span className={s.kind}>{l.kind}</span>
            <span className={s.text}>{l.text}</span>
            {l.meta && <span className={s.meta}>{l.meta}</span>}
            {l.layer && (
              <span className={s.layer} data-layer={l.layer}>
                {l.layer}
              </span>
            )}
          </li>
        ))}
        <li className={`${s.line} ${s.done}`} style={{ animationDelay: `${0.5 + run.length * 0.55}s` }}>
          <span className={s.kind}>done</span>
          <span className={s.text}>
            4 tool calls · 1.9 s · $0.004
            <span className={s.cursor} aria-hidden />
          </span>
        </li>
      </ol>

      <figcaption className={s.caption}>
        An illustrative run of the kind of system I build: a chat interface, tool APIs and an LLM planner,
        designed and shipped by one engineer.
      </figcaption>
    </figure>
  );
}
