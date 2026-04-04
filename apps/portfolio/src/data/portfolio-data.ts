export interface Project {
  name: string;
  description: string;
  url: string;
  category: string;
  tech: string[];
  highlight?: boolean;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
}

export const PROJECTS: Project[] = [
  // Revenue / SaaS
  {
    name: "EdgeFinder",
    description: "AI-powered trading analytics platform with real-time indicator feeds and backtesting",
    url: "https://edgefinder.vercel.app",
    category: "Trading & Finance",
    tech: ["Next.js", "TypeScript", "AI/ML", "Polygon.io"],
    highlight: true,
  },
  {
    name: "InvoiceFlow",
    description: "Automated invoicing and payment tracking for freelancers and small businesses",
    url: "https://invoiceflow-beta.vercel.app",
    category: "Revenue SaaS",
    tech: ["Next.js", "Stripe", "Supabase"],
  },
  {
    name: "WaitlistPro",
    description: "Launch page builder with waitlist management and analytics dashboard",
    url: "https://waitlistpro-three.vercel.app",
    category: "Revenue SaaS",
    tech: ["Next.js", "Supabase", "Resend"],
  },
  {
    name: "CalcStack",
    description: "Financial calculator suite for real estate, investment, and loan analysis",
    url: "https://calcstack-sigma.vercel.app",
    category: "Trading & Finance",
    tech: ["Next.js", "TypeScript", "Recharts"],
  },
  {
    name: "ReceiptVault",
    description: "AI receipt scanner and expense tracker with OCR and categorization",
    url: "https://receiptvault-peach.vercel.app",
    category: "Revenue SaaS",
    tech: ["Next.js", "AI/OCR", "Supabase"],
  },
  {
    name: "PitchDeck.ai",
    description: "AI-generated investor pitch decks from business descriptions",
    url: "https://pitchdeck-ai-weld.vercel.app",
    category: "AI Tools",
    tech: ["Next.js", "Claude API", "PDF Generation"],
    highlight: true,
  },
  {
    name: "LinkShelf",
    description: "Bookmark manager with AI tagging and smart collections",
    url: "https://linkshelf-five.vercel.app",
    category: "Productivity",
    tech: ["Next.js", "Supabase", "AI"],
  },
  {
    name: "FormForge",
    description: "Drag-and-drop form builder with analytics and webhook integrations",
    url: "https://formforge-omega.vercel.app",
    category: "Revenue SaaS",
    tech: ["Next.js", "DnD Kit", "Supabase"],
  },
  {
    name: "ContractSnap",
    description: "AI contract analyzer that highlights key terms, risks, and obligations",
    url: "https://contractsnap.vercel.app",
    category: "AI Tools",
    tech: ["Next.js", "Claude API", "PDF Parsing"],
  },
  {
    name: "FeedbackLoop",
    description: "Customer feedback collection and sentiment analysis dashboard",
    url: "https://feedbackloop-omega.vercel.app",
    category: "Revenue SaaS",
    tech: ["Next.js", "AI", "Supabase"],
  },
  {
    name: "QuickProposal",
    description: "AI-powered business proposal generator with branded templates",
    url: "https://quickproposal-lac.vercel.app",
    category: "Revenue SaaS",
    tech: ["Next.js", "Claude API", "PDF"],
  },
  {
    name: "ClipSync",
    description: "Video-to-Notion transcription with AI summaries and timestamps",
    url: "https://clipsync-chi.vercel.app",
    category: "AI Tools",
    tech: ["Next.js", "Whisper API", "Notion API"],
    highlight: true,
  },
  // AI Tools
  {
    name: "SideHustle.ai",
    description: "AI business idea generator with market analysis and revenue projections",
    url: "#",
    category: "AI Tools",
    tech: ["Next.js", "Claude API", "Recharts"],
  },
  {
    name: "Content.ai",
    description: "AI content generation platform for blogs, social media, and marketing",
    url: "#",
    category: "AI Tools",
    tech: ["Next.js", "Claude API", "OpenAI"],
  },
  {
    name: "MyCloset.ai",
    description: "AI wardrobe organizer with outfit suggestions and style matching",
    url: "#",
    category: "AI Tools",
    tech: ["Next.js", "Vision AI", "Supabase"],
  },
  {
    name: "Mentor.ai",
    description: "AI mentorship platform with personalized career guidance",
    url: "#",
    category: "AI Tools",
    tech: ["Next.js", "Claude API", "Supabase"],
  },
  {
    name: "Bible.ai",
    description: "AI-powered Bible study tool with verse analysis and devotional generation",
    url: "#",
    category: "AI Tools",
    tech: ["Next.js", "Claude API"],
  },
  {
    name: "Snap CV",
    description: "AI resume builder with job-specific optimization and ATS scoring",
    url: "#",
    category: "AI Tools",
    tech: ["Next.js", "Claude API", "PDF"],
  },
  {
    name: "CarSource AI",
    description: "AI car shopping assistant with price analysis and deal scoring",
    url: "#",
    category: "AI Tools",
    tech: ["Next.js", "Claude API", "Data APIs"],
  },
  {
    name: "History AI",
    description: "Interactive AI history tutor with timeline exploration",
    url: "#",
    category: "AI Tools",
    tech: ["Next.js", "Claude API"],
  },
  // Finance & Real Estate
  {
    name: "Orlando CRE",
    description: "Orlando commercial real estate market analytics and property dashboard",
    url: "#",
    category: "Trading & Finance",
    tech: ["Next.js", "Recharts", "Data APIs"],
    highlight: true,
  },
  {
    name: "Real Estate AI",
    description: "AI property valuation and market comparison tool",
    url: "#",
    category: "Trading & Finance",
    tech: ["Next.js", "Claude API", "Recharts"],
  },
  {
    name: "HIP M&A Analyzer",
    description: "M&A deal analyzer with financial modeling and DCF valuation",
    url: "#",
    category: "Trading & Finance",
    tech: ["Next.js", "TypeScript", "Recharts"],
  },
  {
    name: "Commodity Risk Dashboard",
    description: "Real-time commodity price tracking with risk analytics",
    url: "#",
    category: "Trading & Finance",
    tech: ["Next.js", "WebSocket", "Recharts"],
  },
  {
    name: "ADR Intelligence",
    description: "American Depositary Receipt analytics with cross-market insights",
    url: "#",
    category: "Trading & Finance",
    tech: ["Next.js", "Market APIs", "Recharts"],
  },
  {
    name: "StonEx Pro",
    description: "Professional trading dashboard with multi-asset analysis",
    url: "#",
    category: "Trading & Finance",
    tech: ["Next.js", "WebSocket", "Recharts"],
  },
  {
    name: "Global Payments",
    description: "Cross-border payment tracking and currency analytics platform",
    url: "#",
    category: "Trading & Finance",
    tech: ["Next.js", "Stripe", "FX APIs"],
  },
  {
    name: "Flux Budget",
    description: "Personal finance tracker with AI categorization and forecasting",
    url: "#",
    category: "Productivity",
    tech: ["Next.js", "Supabase", "Recharts"],
  },
  // Productivity & Lifestyle
  {
    name: "Life OS",
    description: "All-in-one life management dashboard with habits, goals, and journaling",
    url: "#",
    category: "Productivity",
    tech: ["Next.js", "Supabase", "Framer Motion"],
  },
  {
    name: "Habit Forge",
    description: "Habit tracking with streaks, analytics, and accountability features",
    url: "#",
    category: "Productivity",
    tech: ["Next.js", "Supabase", "Recharts"],
  },
  {
    name: "Meal Genie",
    description: "AI meal planning with grocery lists and nutritional analysis",
    url: "#",
    category: "Productivity",
    tech: ["Next.js", "Claude API", "Supabase"],
  },
  {
    name: "SIE Exam Prep",
    description: "Securities Industry Essentials exam prep with practice tests and scoring",
    url: "#",
    category: "Education",
    tech: ["Next.js", "Supabase", "Gamification"],
  },
  {
    name: "Pulse AI",
    description: "AI health insights dashboard with trend analysis",
    url: "#",
    category: "Productivity",
    tech: ["Next.js", "AI", "Recharts"],
  },
  // Education & Other
  {
    name: "Haven Education Hub",
    description: "Educational platform with course management and progress tracking",
    url: "#",
    category: "Education",
    tech: ["Next.js", "Supabase", "Gamification"],
  },
  {
    name: "Polystyrene Recycling",
    description: "Interactive polystyrene recycling education with quizzes, games, and a chatbot",
    url: "https://polystyrene-recycling.vercel.app",
    category: "Education",
    tech: ["Next.js", "Claude API", "Gamification"],
    highlight: true,
  },
  {
    name: "Korea Trip",
    description: "Interactive travel planner and itinerary builder for South Korea",
    url: "#",
    category: "Productivity",
    tech: ["Next.js", "Maps API", "Supabase"],
  },
  {
    name: "Alma Retreat",
    description: "Wellness retreat booking platform with scheduling and payments",
    url: "#",
    category: "Productivity",
    tech: ["Next.js", "Stripe", "Supabase"],
  },
  {
    name: "Comercial del Valle",
    description: "Business management platform for a commercial enterprise",
    url: "#",
    category: "Revenue SaaS",
    tech: ["Next.js", "Supabase", "Stripe"],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    title: "Founder",
    company: "SFIN Media",
    period: "2024 - Present",
    description: "Digital agency building websites, marketing strategies, and AI-powered tools for clients.",
    highlights: [
      "Built and deployed production web applications for business clients",
      "Managed end-to-end client relationships from proposal to delivery",
      "Developed AI-integrated marketing and content automation solutions",
    ],
  },
  {
    title: "Creator",
    company: "@PolystyreneGuy",
    period: "2025 - Present",
    description: "Educational Instagram brand focused on polystyrene recycling awareness and sustainability.",
    highlights: [
      "Created viral educational content reaching thousands of viewers",
      "Built companion web platform with interactive quizzes, games, and AI chatbot",
      "Partnered with PSRA (Polystyrene Recycling Association) for industry insights",
    ],
  },
  {
    title: "Co-Founder",
    company: "EdgeFinder / EquityEdge.ai",
    period: "2024 - Present",
    description: "AI-powered trading analytics platform with real-time market indicators and backtesting.",
    highlights: [
      "Architected full-stack trading platform with live market data feeds",
      "Built waitlist and beta program with 100+ early signups",
      "Integrated AI-driven pattern recognition for trade signals",
    ],
  },
  {
    title: "Student",
    company: "Rollins College",
    period: "2022 - May 2026",
    description: "Pursuing studies in finance and business with a focus on commercial real estate and fintech.",
    highlights: [
      "Building 40+ production web applications as a portfolio",
      "Studying for the SIE exam ahead of graduation",
      "Active in CRE networking across major brokerages (CBRE, JLL, Colliers, Cushman)",
    ],
  },
];

export const SKILLS = {
  frontend: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Framer Motion", "Shadcn/UI"],
  backend: ["Supabase", "PostgreSQL", "REST APIs", "WebSockets", "Resend", "Stripe"],
  ai: ["Claude API", "OpenAI API", "AI SDK", "Whisper", "Vision AI", "LangChain"],
  tools: ["Git", "Vercel", "Figma", "Notion", "PostHog", "Google Analytics"],
  finance: ["DCF Modeling", "Technical Analysis", "Options Pricing", "CRE Underwriting", "Market Data APIs"],
};

export const STATS = [
  { label: "Apps Built", value: 40, suffix: "+" },
  { label: "Deployed to Production", value: 32, suffix: "" },
  { label: "Revenue Apps", value: 10, suffix: "" },
  { label: "AI Integrations", value: 15, suffix: "+" },
];

export const CATEGORIES = [
  "All",
  "Trading & Finance",
  "Revenue SaaS",
  "AI Tools",
  "Productivity",
  "Education",
];

export const SOCIAL_LINKS = {
  github: "https://github.com/LoganZechella",
  linkedin: "https://linkedin.com/in/loganlisowski",
  instagram: "https://instagram.com/polystyreneguy",
  email: "logan@loganlisowski.com",
};
