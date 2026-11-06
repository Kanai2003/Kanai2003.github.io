/**
 * Single source of truth for identity, links and availability.
 * Update this file first when anything about you changes.
 */
export const profile = {
  name: "Kanailal Manna",
  shortName: "Kanai",
  role: "AI Full-Stack Engineer",
  currentTitle: "Software Development Engineer I",
  currentCompany: "Ploutos AI (Datachecks)",
  currentCompanyUrl: "https://datachecks.io",
  location: "India",
  timezone: "IST (UTC+5:30)",
  email: "kanailalmanna2003@gmail.com",
  siteUrl: "https://kanai2003.github.io",
  githubUser: "Kanai2003",
  /** npm account; packages and downloads on /open-source are fetched for this user. */
  npmUser: "kanai2003",
  resume: "/Kanai_Resume.pdf",
  /** Name the file gets when someone downloads it. */
  resumeFileName: "Kanailal-Manna-Resume.pdf",
  /** Optional: a Calendly / Cal.com link. When set, "Book a call" buttons appear on the hire page. */
  bookingUrl: "",
  photo: "/mypic.jpeg",

  /** One line. Shown in the hero, meta description and social cards. */
  headline:
    "I build AI products end to end: the agent, the API behind it and the interface people use.",
  /** Search-result description for the home page (aim for 140–160 characters). */
  seoDescription:
    "Kanailal Manna is an AI full-stack engineer in India building AI agents with LangGraph, FastAPI and Next.js. Open to AI engineer roles and freelance projects.",
  /** Search engine verification tokens. Leave empty until you set up Search Console / Bing Webmaster. */
  seo: { googleVerification: "", bingVerification: "" },
  summary:
    "Software engineer with two years of shipping production software at AI startups. I work across Next.js frontends, Python/FastAPI and Node backends, CI/CD, and LLM features built with LangChain and LangGraph. Today I build AI agents for data migration at Datachecks (Ploutos AI).",

  /** Toggle these as your situation changes. They drive badges and the hire page. */
  availability: {
    fullTime: true,
    freelance: true,
    note: "Open to AI engineer and full-stack roles, plus a few freelance builds.",
    /** Titles you'd accept. Shown on the hire page and used as search keywords. */
    roles: ["AI Engineer", "Full-Stack Engineer", "Backend Engineer (Python)"],
    /** Ways a company can hire you. Remove any you don't want. */
    hireTypes: ["Full-time", "Contract-to-hire", "Contract"],
    /** e.g. "30 days" or "Immediate". Leave empty to hide the row. */
    noticePeriod: "",
  },

  links: {
    github: "https://github.com/Kanai2003",
    linkedin: "https://linkedin.com/in/kanailalmanna/",
    leetcode: "https://leetcode.com/kanai2003/",
    x: "https://x.com/KManna16",
    npm: "https://www.npmjs.com/~kanai2003",
  },

  spokenLanguages: ["English (fluent)", "Bengali (native)", "Hindi (proficient)"],
};

/** Numbers you can defend in an interview. Each one comes from the resume. */
export const proofPoints = [
  { value: "1h → 3m", label: "Release time after I automated the Datachecks pipeline" },
  { value: "2 for 2", label: "Promoted at both companies, each within a year of joining" },
  { value: "68 → 92", label: "Lighthouse SEO score after the Buzzli UI rebuild" },
  { value: "25k+", label: "Records ingested by the scraper feeding Buzzli's content AI" },
];

export const education = {
  degree: "B.Tech, Computer Science & Engineering",
  school: "Techno International New Town",
  place: "West Bengal, India",
  years: "2021 – 2025",
  grade: "CGPA 8.45",
  honors: [
    "NTSE (National Talent Search Examination) national scholarship",
    "SVMCM state merit scholarship",
  ],
};

export const certificates = [
  {
    name: "Build Real World AI Applications with Gemini and Imagen",
    issuer: "Google Cloud",
    link: "https://www.credly.com/badges/dda98f9e-c896-46f2-abad-d1a301dbea1d",
  },
  {
    name: "AWS Academy Graduate: Cloud Foundations",
    issuer: "Amazon Web Services",
    link: "https://www.credly.com/badges/18957abc-52a5-4b14-936e-3fa7f1272584",
  },
  {
    name: "Machine Learning and Deep Learning in Python",
    issuer: "Udemy",
    link: "https://udemy.com/certificate/UC-060771e8-0c75-4641-b57c-cb3544a90c59",
  },
];
