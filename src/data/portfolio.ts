export type PortfolioLink = {
  label: string;
  href: string;
};

export type PortfolioProject = {
  title: string;
  description: string;
  status: "Live" | "Prototype" | "Case study";
  tags: string[];
  links: PortfolioLink[];
};

export type PortfolioExperience = {
  role: string;
  organization: string;
  period: string;
  summary: string;
  highlights: string[];
};

export type PortfolioEducation = {
  school: string;
  degree: string;
  location: string;
  expected: string;
  gpa: string;
  honors: string[];
};

export type PortfolioData = {
  osName: string;
  profile: {
    name: string;
    title: string;
    location: string;
    summary: string;
    highlights: string[];
  };
  education: PortfolioEducation;
  projects: PortfolioProject[];
  skills: {
    category: string;
    items: string[];
  }[];
  experience: PortfolioExperience[];
  contact: {
    email: string;
    phone: string;
    location: string;
    links: PortfolioLink[];
  };
  resume: {
    filename: string;
    href: string;
    summary: string;
  };
};

export const portfolioData: PortfolioData = {
  osName: "NormanOS",
  profile: {
    name: "Norman Mei",
    title: "Accountancy Student and Accounting Intern",
    location: "Brooklyn, NY",
    summary:
      "Accountancy student at Baruch College's Zicklin School of Business with hands-on accounting, tax documentation, bookkeeping, budget tracking, customer service, logistics, and administrative operations experience.",
    highlights: [
      "Maintains financial data for 100+ client accounts using QuickBooks to support monthly close and year-end reporting.",
      "Organizes tax documentation for 100+ individual returns in Drake Tax Software to improve prep speed and reduce filing errors.",
      "Co-manages a $5,160 student organization budget and maintains audit-ready financial records.",
    ],
  },
  education: {
    school: "Baruch College / CUNY, Zicklin School of Business",
    degree: "Bachelor of Business Administration, Accountancy",
    location: "New York, NY",
    expected: "Expected May 2029",
    gpa: "3.7/4.0",
    honors: ["Dean's Scholar", "Dean's List (Fall 2025)"],
  },
  projects: [
    {
      title: "Client Accounting Operations",
      description:
        "Entered and maintained financial data for 100+ client accounts, supporting accurate monthly closing and year-end reporting with QuickBooks.",
      status: "Case study",
      tags: ["QuickBooks", "Data Entry", "Financial Reporting"],
      links: [{ label: "View resume", href: "/Norman-Mei-Resume.pdf" }],
    },
    {
      title: "Tax Documentation Workflow",
      description:
        "Verified tax documents and organized source files for 100+ individual returns in Drake Tax Software, helping reduce preparation time and filing errors.",
      status: "Case study",
      tags: ["Drake Tax", "E-Filing", "Filing Systems"],
      links: [{ label: "View resume", href: "/Norman-Mei-Resume.pdf" }],
    },
    {
      title: "Budget Tracking Dashboard",
      description:
        "Helped track a $5,160 annual budget for a Baruch student organization by analyzing spending, organizing records, and keeping events within budget.",
      status: "Case study",
      tags: ["Budget Management", "Expense Reporting", "Audit Readiness"],
      links: [{ label: "View resume", href: "/Norman-Mei-Resume.pdf" }],
    },
  ],
  skills: [
    {
      category: "Accounting",
      items: [
        "Bookkeeping",
        "Account Reconciliation",
        "Bank Reconciliation",
        "Financial Reporting",
        "Book-to-tax Adjustments",
        "Payroll Compliance",
      ],
    },
    {
      category: "Tax and Office Tools",
      items: [
        "QuickBooks",
        "Drake Tax",
        "E-Filing",
        "Microsoft Office Suite",
        "Google Suite",
        "Adobe Acrobat",
      ],
    },
    {
      category: "Operations",
      items: [
        "Data Entry",
        "Filing Systems",
        "Inventory Management",
        "Logistics",
        "Expense Reporting",
        "Data Analysis",
      ],
    },
    {
      category: "Languages",
      items: ["English", "Cantonese (Intermediate)", "Mandarin (Basic)"],
    },
  ],
  experience: [
    {
      role: "Accounting Intern",
      organization: "MEI CPA, P.C.",
      period: "Jan 2019 - Present",
      summary:
        "Supports client accounting, tax preparation workflows, source-file organization, and audit-ready documentation.",
      highlights: [
        "Entered and maintained financial data for 100+ client accounts with QuickBooks.",
        "Verified tax documentation and organized source files for 100+ individual returns in Drake Tax Software.",
        "Restructured the client filing system and index, reducing average retrieval time by 25%.",
      ],
    },
    {
      role: "Employee",
      organization: "Dolinskys' Pharmacy",
      period: "Jan 2024 - Jun 2024",
      summary:
        "Handled customer service, order coordination, deliveries, and payment processing in a fast-paced pharmacy environment.",
      highlights: [
        "Delivered front-line service to 30+ customers per shift across prescriptions, insurance, and over-the-counter products.",
        "Coordinated 10 daily deliveries by preparing orders, confirming addresses, and tracking status.",
        "Processed 30+ transactions per shift with a zero-error rate across cash and electronic payments.",
      ],
    },
    {
      role: "Transit Intern",
      organization: "NYPD Transit District 2",
      period: "Jun 2023 - Aug 2023",
      summary:
        "Supported administrative records, scheduling, correspondence, and sensitive personnel documentation for transit operations.",
      highlights: [
        "Maintained and updated roll-call diaries for 100+ officers per day.",
        "Prepared schedules, logs, and correspondence for administrative staff and 50+ officers.",
        "Filed sensitive personnel records and reports for 100+ officers while maintaining privacy compliance.",
      ],
    },
    {
      role: "Treasurer",
      organization: "Conservation Partners Program at Baruch College",
      period: "Aug 2025 - Present",
      summary:
        "Manages budgeting, reimbursements, purchase orders, and financial documentation for a Baruch student organization.",
      highlights: [
        "Co-managed a $5,160 annual budget and helped build a dashboard to track balances.",
        "Reviewed and submitted reimbursements and purchase orders in MyBaruch.",
        "Organized 50+ financial documents, achieving audit readiness and reducing retrieval time by 30%.",
      ],
    },
    {
      role: "Volunteer",
      organization: "Mustard Seed Center",
      period: "Jun 2022 - Aug 2022",
      summary:
        "Supported classroom activities, tutoring, progress tracking, and lesson planning for K-6 students.",
      highlights: [
        "Assisted teachers with activities and materials for 30+ K-6 students.",
        "Tutored students in math and reading for 180+ hours.",
        "Tracked academic progress for 30+ students and reported weekly updates to supervisors.",
      ],
    },
  ],
  contact: {
    email: "norman.mei@outlook.com",
    phone: "718-200-1789",
    location: "Brooklyn, NY",
    links: [
      { label: "LinkedIn", href: "https://linkedin.com/in/norman-mei" },
      { label: "GitHub", href: "https://github.com/kirklandwaterbot" },
    ],
  },
  resume: {
    filename: "Norman-Mei-Resume.pdf",
    href: "/Norman-Mei-Resume.pdf",
    summary:
      "Resume for Norman Mei, an Accountancy student at Baruch College with accounting, tax, bookkeeping, budget management, and operations experience.",
  },
};