export interface ProjectDetails {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  heroMedia: {
    type: "image" | "video";
    url: string;
    alt: string;
  };
  techStack: string[];
  features: string[];
  learnings: string[];
  links: {
    repo?: string;
    live?: string;
    docs?: string;
  };
  gallery: {
    type: "image" | "video";
    url: string;
    caption: string;
  }[];
}

export const projectsData: Record<string, ProjectDetails> = {
  "lynx-api": {
    id: "lynx-api",
    title: "Lynx API",
    shortDescription:
      "A high-performance API testing platform. Integrated React Flow to visualize complex API request/response graph workflows.",
    fullDescription:
      "Lynx API is a cutting-edge platform designed to revolutionize the way developers test and visualize API workflows. Built with performance and usability in mind, it allows users to chain API requests together and visualize them as interactive graphs. This visual approach helps in understanding complex data flows between different endpoints and simplifies debugging. The platform supports various authentication methods and provides real-time feedback on request status.",
    heroMedia: {
      type: "image",
      url: "/projects/lynxapi-landing.png",
      alt: "Lynx API Dashboard Interface",
    },
    techStack: ["Rust", "TypeScript", "Next.js", "React Flow", "Tailwind CSS"],
    features: [
      "Visual API Workflow Builder using node-based graphs",
      "Real-time request execution and response visualization",
      "Support for REST, GraphQL, and WebSocket protocols",
      "Environment variable management for different deployment stages",
      "Export/Import workflows as JSON configurations",
    ],
    learnings: [
      "Mastered Rust's ownership model for high-performance backend logic.",
      "Implemented complex state management for the interactive graph editor.",
      "Optimized rendering performance for large graphs with hundreds of nodes.",
    ],
    links: {
      live: "https://thelynxapi.vercel.app/",
    },
    gallery: [
      {
        type: "image",
        url: "/projects/lynxapi-landing.png",
        caption: "Lynx API Landing page",
      },
      {
        type: "video",
        url: "https://youtu.be/N6RANalyynI",
        caption: "Lynx API Demo",
      },
      {
        type: "image",
        url: "/projects/lynxapi-req-res.png",
        caption: "Lynx API Request/Response Dashboard",
      },
      {
        type: "image",
        url: "/projects/lynxapi-flow.png",
        caption: "Lynx API Flow Management",
      },
      {
        type: "image",
        url: "/projects/lynxapi-settings.png",
        caption: "Lynx API Settings",
      },
    ],
  },
  "codebase-tracker": {
    id: "codebase-tracker",
    title: "Codebase Tracker",
    shortDescription:
      "A CLI tool for static code analysis that uses file system parsing to map function calls and component usage.",
    fullDescription:
      "Codebase Tracker is a powerful CLI utility built for developers who need to get a high-level overview of their codebase's architecture. It statically analyzes project files to generate dependency graphs, function call maps, and component usage statistics. This tool is particularly useful for auditing large legacy codebases or onboarding new team members by providing a clear map of how different parts of the application interact.",
    heroMedia: {
      type: "image",
      url: "/projects/codebase-track-npm.png",
      alt: "Codebase Tracker CLI Output",
    },
    techStack: ["Node.js", "CLI", "AST Parsing", "TypeScript", "NPM", "Git"],
    features: [
      "Fast file system traversal and parsing",
      "Generation of visual dependency graphs",
      "Support for JavaScript, TypeScript, and Python files",
      "Customizable ignore patterns (.gitignore support)",
      "Export reports in .txt format with proper styling to understand the data",
    ],
    learnings: [
      "Deep dive into Abstract Syntax Trees (AST) for code analysis.",
      "Building robust CLI interfaces with intuitive user feedback.",
      "Handling large file systems efficiently using Node.js streams.",
    ],
    links: {
      repo: "https://github.com/Kanai2003/codebase-tracker",
      live: "https://www.npmjs.com/package/codebase-tracker",
    },
    gallery: [
      {
        type: "image",
        url: "/projects/codebase-track-npm.png",
        caption: "NPM page of Codebase Tracker",
      },
    ],
  },
  "chat-mine": {
    id: "chat-mine",
    title: "Chat-Mine",
    shortDescription:
      "A data analytics engine using Python to parse and analyze large volumes of unstructured chat logs and visualize trends.",
    fullDescription:
      "Chat-Mine turns unstructured chat logs into actionable insights. Whether it's analyzing customer support conversations or community discord channels, Chat-Mine processes raw text data to extract sentiment, identifying trending topics, and map user interactions. It features an interactive dashboard built with Streamlit that allows users to filter data by date, user, or keyword and see real-time visualizations of the analysis.",
    heroMedia: {
      type: "image",
      url: "/projects/chat-mine-dashboard.png",
      alt: "Chat-Mine Analytics Dashboard",
    },
    techStack: ["Python", "Streamlit", "Pandas", "NLTK", "Matplotlib"],
    features: [
      "Parsing support for WhatsApp, Telegram, and Discord export formats",
      "Sentiment analysis using NLTK and VADER",
      "Word cloud generation and frequency analysis",
      "User activity heatmaps and interaction graphs",
      "Exportable data summaries",
    ],
    learnings: [
      "Data cleaning and preprocessing for unstructured text data.",
      "Optimizing Python dataframes for speed with large datasets.",
      "Creating interactive web apps purely with Python using Streamlit.",
    ],
    links: {
      live: "https://chat-mine.streamlit.app/",
      repo: "https://github.com/Kanai2003/whatsapp-chat-analyzer",
    },
    gallery: [
      {
        type: "image",
        url: "/projects/chat-mine-dashboard.png",
        caption: "Chat-Mine Analytics Dashboard",
      },
    ],
  },
};
