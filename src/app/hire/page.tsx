import type { Metadata } from "next";
import { FiDownload, FiLinkedin, FiMail } from "react-icons/fi";
import CopyButton from "@/components/CopyButton";
import Testimonials from "@/components/Testimonials";
import { profile, proofPoints } from "@/data/profile";
import { engagement, process, services } from "@/data/services";
import s from "./hire.module.css";

export const metadata: Metadata = {
  title: "Hire me",
  description:
    "Hire Kanailal Manna for a full-time AI engineer or full-stack role, or for freelance AI features, SaaS MVPs and frontend rebuilds.",
};

const mailto = (subject: string, body: string) =>
  `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

const roleMail = mailto(
  "Role at <company>: <title>",
  `Hi Kanai,

I'm <name>, <role> at <company>. We're hiring for <title>.

Link to the job description:
Location / remote:
Compensation range:

Would you be open to a quick call?
`,
);

const projectMail = mailto(
  "Project enquiry: <short description>",
  `Hi Kanai,

What we're building:
Who it's for:
What exists today (code, designs, nothing yet):
Ideal timeline:
Budget range:

Thanks,
<name>
`,
);

const employerFacts = [
  { k: "Roles", v: profile.availability.roles.join(", ") },
  { k: "Hire as", v: profile.availability.hireTypes.join(", ") },
  { k: "Experience", v: "2 years building production software, promoted twice" },
  { k: "Location", v: "India. Remote, or on-site in Bengaluru" },
  {
    k: "Working hours",
    v: `Based in ${profile.timezone}. I adjust my hours to overlap with teams in the US, UK, Canada, Ireland, Australia, New Zealand and other English-speaking countries.`,
  },
  { k: "Communication", v: "Fluent written and spoken English; comfortable with async updates, standups and client calls" },
  ...(profile.availability.noticePeriod ? [{ k: "Can start", v: profile.availability.noticePeriod }] : []),
];

export default function HirePage() {
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <h1>Let&apos;s work together</h1>
          <p className="lede">
            Pick the path that fits. Both end in my inbox, and I reply within one working day.
          </p>
          <div className={s.switch}>
            <a href="#employers" className={s.switchCard}>
              <strong>I&apos;m hiring</strong>
              <span>Full-time roles for my team</span>
            </a>
            <a href="#freelance" className={s.switchCard}>
              <strong>I need something built</strong>
              <span>Freelance or contract projects</span>
            </a>
          </div>
        </div>
      </header>

      {/* Employers */}
      <section id="employers" className={`section ${s.anchor}`}>
        <div className={`wrap ${s.split}`}>
          <div>
            <h2 className="sec-title">For employers</h2>
            <p className="muted" style={{ marginTop: 12, maxWidth: "40ch" }}>
              Everything you need to decide whether to talk to me, on one screen.
            </p>
            <dl className={s.facts}>
              {employerFacts.map((f) => (
                <div key={f.k}>
                  <dt>{f.k}</dt>
                  <dd>{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={s.panel}>
            <h3>In thirty seconds</h3>
            <ul className={s.bullets}>
              <li>Ship across Next.js, FastAPI/Node and CI/CD, so a feature doesn&apos;t wait on handoffs.</li>
              <li>
                Built production AI agent features at Datachecks: <strong>Custom Guardrails</strong>,{" "}
                <strong>Memory</strong>, <strong>per-session token tracking</strong> and a{" "}
                <strong>migration report agent</strong>.
              </li>
              <li>
                <strong>Moved deployment from Azure to Railway</strong> and put it behind CI.
              </li>
              {proofPoints.slice(0, 2).map((p) => (
                <li key={p.label}>
                  <strong>{p.value}</strong>: {p.label}.
                </li>
              ))}
            </ul>
            <div className="btn-row">
              <a href={profile.resume} download className="btn btn-ink">
                <FiDownload aria-hidden /> Résumé (PDF)
              </a>
              <a href={roleMail} className="btn">
                <FiMail aria-hidden /> Email about a role
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="btn">
                <FiLinkedin aria-hidden /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      <Testimonials title="References" />

      {/* Freelance */}
      <section id="freelance" className={`section ${s.anchor}`}>
        <div className="wrap">
          <div className="sec-head">
            <h2 className="sec-title">For freelance clients</h2>
            <p>
              For startups and small teams who need one engineer who can design, build and deploy, including the AI
              parts.
            </p>
          </div>

          <ul className={s.services}>
            {services.map((sv) => (
              <li key={sv.title}>
                <h3>{sv.title}</h3>
                <p>{sv.body}</p>
                <ul className="chips">
                  {sv.deliverables.map((d) => (
                    <li key={d} className="chip">
                      {d}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <div className={s.how}>
            <div>
              <h3 className={s.subTitle}>How a project runs</h3>
              <ol className={s.steps}>
                {process.map((p, i) => (
                  <li key={p.title}>
                    <span className={s.stepNo}>{i + 1}</span>
                    <div>
                      <strong>{p.title}</strong>
                      <p>{p.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h3 className={s.subTitle}>Ways to work together</h3>
              <ul className={s.engage}>
                {engagement.map((e) => (
                  <li key={e.title}>
                    <strong>{e.title}</strong>
                    <span>{e.body}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section">
        <div className={`wrap ${s.contact}`}>
          <div>
            <h2 className="sec-title">Send a message</h2>
            <p className="muted" style={{ marginTop: 12, maxWidth: "44ch" }}>
              These buttons open your email app with a short template, so you don&apos;t have to think about what to
              include.
            </p>
          </div>
          <div className={s.contactBox}>
            <div className="btn-row">
              <a href={roleMail} className="btn btn-ink">
                <FiMail aria-hidden /> Email about a role
              </a>
              <a href={projectMail} className="btn">
                <FiMail aria-hidden /> Email about a project
              </a>
            </div>
            <div className={s.addr}>
              <span>{profile.email}</span>
              <CopyButton text={profile.email} label="Copy email" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
