import {
  AcademicCapIcon,
  BoltIcon,
  BookOpenIcon,
  BriefcaseIcon,
  CalendarDaysIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  Cog6ToothIcon,
  CommandLineIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  HeartIcon,
  LightBulbIcon,
  NewspaperIcon,
  RocketLaunchIcon,
  SparklesIcon,
  StarIcon,
  TrophyIcon,
  WrenchScrewdriverIcon
} from "@heroicons/react/24/outline";
import { EnvelopeOpenIcon } from "@heroicons/react/24/solid";

export const personalInfo = {
  name: "Norman Mei",
  role: "Baruch College Student & Emerging Full-Stack Developer",
  location: "New York, USA",
  headline:
    "I craft immersive digital experiences with a focus on accessibility, performance, and emotional resonance.",
  bio: [
    "Currently pursuing a degree at Baruch College, I'm a multidisciplinary engineer blending human-centric design with robust technical execution.",
    "I love building delightful interfaces, automating workflows, and shipping products that people genuinely enjoy using."
  ],
  availability: "Open to summer 2025 internships & freelance collaborations.",
  email: "normanmei06@gmail.com",
  resumeUrl: "#",
  socialLinks: [
    {
      label: "GitHub",
      url: "https://github.com/norman-mei",
      icon: CommandLineIcon
    },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/norman-mei/",
      icon: BriefcaseIcon
    },
    {
      label: "Dev.to",
      url: "https://dev.to/",
      icon: BookOpenIcon
    }
  ]
};

export const heroHighlights = [
  {
    title: "Human-centric approach",
    description: "From research to pixel-perfect handoff, I align tech decisions with user intent.",
    icon: HeartIcon
  },
  {
    title: "Creative engineering",
    description: "Blend of motion design, system thinking, and full-stack craftsmanship.",
    icon: SparklesIcon
  },
  {
    title: "Performance first",
    description: "Progressive enhancement, Core Web Vitals, and automation baked into every build.",
    icon: RocketLaunchIcon
  }
];

export const metrics = [
  { value: "16+", label: "Projects shipped", icon: TrophyIcon },
  { value: "8", label: "Hackathons", icon: BoltIcon },
  { value: "4", label: "Design systems built", icon: LightBulbIcon },
  { value: "3", label: "Community initiatives", icon: HeartIcon }
];

export const specialization = [
  {
    title: "Experiential Web Apps",
    description: "Responsive frontends with micro-interactions and data-driven storytelling.",
    icon: DevicePhoneMobileIcon
  },
  {
    title: "Automation & Ops",
    description: "CI/CD pipelines, observability dashboards, and infrastructure-as-code.",
    icon: Cog6ToothIcon
  },
  {
    title: "Product Strategy",
    description: "Cross-functional collaboration to define product vision and measurable success.",
    icon: GlobeAltIcon
  }
];

export const experience = [
  {
    company: "Baruch Code Club",
    role: "Lead Frontend Developer",
    period: "2023 — Present",
    achievements: [
      "Built an event platform with live registration analytics and real-time updates.",
      "Mentored 12+ students on modern React patterns, testing, and accessibility best practices.",
      "Automated onboarding with reusable templates and CLI snippets, cutting setup time by 70%."
    ],
    stack: ["React", "Next.js", "Tailwind", "Supabase"]
  },
  {
    company: "CUNY Innovation Lab",
    role: "Product Engineering Intern",
    period: "Summer 2023",
    achievements: [
      "Designed a data visualization suite for city sustainability metrics with custom animations.",
      "Implemented design tokens, theming, and localization support for a multi-team microsite.",
      "Collaborated with UX researchers to translate qualitative insights into actionable product fixes."
    ],
    stack: ["TypeScript", "D3.js", "Storybook", "Figma"]
  }
];

export const education = [
  {
    school: "Baruch College, Zicklin School of Business",
    program: "BBA, Computer Information Systems",
    period: "2021 — Present",
    highlights: [
      "Presidential Scholar",
      "Dean's List",
      "Coursework: Algorithms, Data Mining, UX Psychology"
    ]
  }
];

export const projects = [
  {
    title: "CityScape Navigator",
    description:
      "An interactive map helping residents explore public services, transit, and local initiatives with personalized journey planning.",
    highlights: [
      "Geo-personalization with saved routes and predictive wait times.",
      "3D-tilted map layers with smooth motion and accessible keyboard controls.",
      "Story mode that guides newcomers through essential resources."
    ],
    stack: ["React", "Mapbox GL", "Redux Toolkit", "Tailwind"],
    liveUrl: "https://cityscape.example.com",
    repoUrl: "https://github.com/norman-mei/cityscape",
    thumbnail: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Pulseboard",
    description:
      "Analytics platform translating product telemetry into actionable insights with adaptive views for product, design, and engineering teams.",
    highlights: [
      "Composable widget builder with drag-and-drop layout and snapping guides.",
      "Scenario simulations to forecast retention and feature adoption.",
      "Automated Slack digests and Notion sync for stakeholder updates."
    ],
    stack: ["Next.js", "tRPC", "Prisma", "Tailwind"],
    liveUrl: "https://pulseboard.example.com",
    repoUrl: "https://github.com/norman-mei/pulseboard",
    thumbnail: "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Muse Forge",
    description:
      "AI-powered content ideation suite enabling marketing teams to co-create campaigns with real-time insights and brand guardrails.",
    highlights: [
      "Prompt-to-board pipeline with auto-tagging and semantic search over briefs.",
      "Guided workflows with persona switcher and iterative A/B testing suggestions.",
      "Brand-safe filters using embeddings and custom classifiers."
    ],
    stack: ["React", "FastAPI", "LangChain", "Tailwind"],
    liveUrl: "https://museforge.example.com",
    repoUrl: "https://github.com/norman-mei/museforge",
    thumbnail: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Campus Loop",
    description:
      "A campus companion app with schedule-aware suggestions, study group matchmaking, and dynamic space heatmaps.",
    highlights: [
      "Timetable parsing with auto-detection of conflicting events and smart reminders.",
      "Gamified communities encouraging academic accountability and micro-learning.",
      "Offline-first architecture with Cloudflare Worker synchronization."
    ],
    stack: ["React Native", "Expo", "Supabase", "Tailwind"],
    liveUrl: "https://campusloop.example.com",
    repoUrl: "https://github.com/norman-mei/campusloop",
    thumbnail: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80"
  }
];

export const skills = [
  {
    category: "Core Engineering",
    items: [
      { label: "JavaScript / TypeScript", level: 90 },
      { label: "React & Hooks", level: 92 },
      { label: "Node.js", level: 80 },
      { label: "GraphQL", level: 78 }
    ]
  },
  {
    category: "Design & Motion",
    items: [
      { label: "Design Systems", level: 88 },
      { label: "Framer Motion", level: 84 },
      { label: "Accessibility", level: 86 },
      { label: "Storytelling", level: 82 }
    ]
  },
  {
    category: "DevOps & Tooling",
    items: [
      { label: "CI/CD & GitHub Actions", level: 76 },
      { label: "Docker & Kubernetes", level: 66 },
      { label: "Infrastructure as Code", level: 70 },
      { label: "Observability", level: 68 }
    ]
  }
];

export const services = [
  {
    title: "Creative Engineering Sprints",
    description:
      "Rapid prototyping, usability testing, and polish for MVPs or new product lines.",
    icon: SparklesIcon,
    deliverables: ["Concept exploration", "Interactive prototypes", "Developer handoff kit"]
  },
  {
    title: "Design System Ops",
    description:
      "Foundation, documentation, and governance for scalable component libraries.",
    icon: WrenchScrewdriverIcon,
    deliverables: ["Token architecture", "Accessible components", "Change management workflow"]
  },
  {
    title: "Automation & Tooling",
    description:
      "Developer experience upgrades that shorten feedback loops and reduce toil.",
    icon: Cog6ToothIcon,
    deliverables: ["CI/CD pipelines", "Quality gates", "Observability dashboards"]
  }
];

export const testimonials = [
  {
    quote:
      "Norman builds with an uncommon blend of empathy and precision. Every deliverable arrives production-ready, thoughtfully documented, and infused with surprising touches.",
    name: "Clara Wu",
    title: "Product Design Lead, CUNY Innovation Lab"
  },
  {
    quote:
      "He transformed our chaotic project into a cohesive roadmap and shipped a polished experience that stakeholders still rave about.",
    name: "Jordan Smith",
    title: "Program Manager, NYC Civic Tech"
  },
  {
    quote:
      "A natural collaborator who elevates everyone around him. Norman's focus on testing and automation made our releases dramatically more reliable.",
    name: "Lisa Hernandez",
    title: "Engineering Manager, Campus Loop"
  }
];

export const timeline = [
  {
    icon: RocketLaunchIcon,
    title: "Launched first SaaS prototype",
    subtitle: "Pulseboard Beta",
    period: "Early 2024",
    description: "Shipped v1 with real customer data and onboarded 60+ beta accounts."
  },
  {
    icon: AcademicCapIcon,
    title: "Became design system maintainer",
    subtitle: "CUNY Innovation Lab",
    period: "2023",
    description: "Led token hierarchy and accessibility audits across five teams."
  },
  {
    icon: StarIcon,
    title: "Hackathon champion",
    subtitle: "NYC Civic Tech Jam",
    period: "2022",
    description: "Won best UX for an inclusive community resource finder."
  },
  {
    icon: HeartIcon,
    title: "Mentorship initiative",
    subtitle: "Baruch Code Buddies",
    period: "2021",
    description: "Established peer mentorship circles for first-year technologists."
  }
];

export const spotlight = [
  {
    title: "Crafting joyful experiences",
    description:
      "From playful micro-interactions to cinematic storytelling, I obsess over the details that make users feel seen.",
    icon: SparklesIcon
  },
  {
    title: "Scaling with systems",
    description:
      "I build for longevity with composable architectures, clean abstractions, and automated guardrails.",
    icon: WrenchScrewdriverIcon
  },
  {
    title: "Community-first mindset",
    description:
      "Hosting workshops, writing guides, and contributing to open-source keeps me grounded and inspired.",
    icon: ChatBubbleOvalLeftEllipsisIcon
  }
];

export const readingList = [
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    url: "https://dataintensive.net"
  },
  {
    title: "Creative Acts for Curious People",
    author: "Sarah Stein Greenberg",
    url: "https://dschool.stanford.edu/books"
  },
  {
    title: "Refactoring UI",
    author: "Adam Wathan & Steve Schoger",
    url: "https://refactoringui.com"
  }
];

export const contactChannels = [
  {
    label: "Email",
    value: "normanmei06@gmail.com",
    href: "mailto:normanmei06@gmail.com",
    icon: EnvelopeOpenIcon
  },
  {
    label: "Calendly",
    value: "Grab 30 minutes to jam on ideas",
    href: "https://calendly.com/",
    icon: CalendarDaysIcon
  },
  {
    label: "Newsletter",
    value: "Monthly insights on building magical products",
    href: "#",
    icon: NewspaperIcon
  }
];
