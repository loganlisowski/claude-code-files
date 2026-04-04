"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  ExternalLink,
  Github,
  Linkedin,
  Instagram,
  Mail,
  Send,
  ChevronRight,
  Code2,
  TrendingUp,
  Sparkles,
  Layers,
  GraduationCap,
  Building2,
  Briefcase,
  Rocket,
} from "lucide-react";
import { SectionReveal } from "@/components/shared/SectionReveal";
import {
  PROJECTS,
  EXPERIENCES,
  SKILLS,
  STATS,
  CATEGORIES,
  SOCIAL_LINKS,
} from "@/data/portfolio-data";
import { cn } from "@/lib/utils";

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 1500;
    const steps = 40;
    const stepTime = duration / steps;
    let current = 0;
    const increment = value / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [started, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "Trading & Finance": <TrendingUp className="w-3.5 h-3.5" />,
  "Revenue SaaS": <Rocket className="w-3.5 h-3.5" />,
  "AI Tools": <Sparkles className="w-3.5 h-3.5" />,
  Productivity: <Layers className="w-3.5 h-3.5" />,
  Education: <GraduationCap className="w-3.5 h-3.5" />,
};

const EXPERIENCE_ICONS: Record<string, React.ReactNode> = {
  "SFIN Media": <Building2 className="w-5 h-5" />,
  "@PolystyreneGuy": <Instagram className="w-5 h-5" />,
  "EdgeFinder / EquityEdge.ai": <TrendingUp className="w-5 h-5" />,
  "Rollins College": <GraduationCap className="w-5 h-5" />,
};

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center hero-glow overflow-hidden">
        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/30"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-muted-foreground mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Open to opportunities - Graduating May 2026
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
              <span className="text-foreground">Logan</span>{" "}
              <span className="text-gradient-blue">Lisowski</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              Full-stack developer building at the intersection of{" "}
              <span className="text-foreground font-medium">software</span>,{" "}
              <span className="text-foreground font-medium">AI</span>, and{" "}
              <span className="text-foreground font-medium">finance</span>.{" "}
              40+ production apps. Revenue-generating SaaS. Trading analytics.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="glass rounded-xl p-4"
                >
                  <div className="text-3xl font-bold text-gradient-blue">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center justify-center gap-4"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
              >
                View Projects
                <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg glass text-foreground font-medium text-sm hover:bg-accent transition-colors"
              >
                Get in Touch
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowDown className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="about" className="py-24">
        <div className="container mx-auto px-6">
          <SectionReveal>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold mb-8">
                About <span className="text-gradient-blue">Me</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    I&apos;m a senior at Rollins College graduating in May 2026, focused on
                    building production-grade software at scale. My portfolio spans 40+
                    deployed applications, from AI-powered SaaS tools to trading analytics
                    platforms.
                  </p>
                  <p>
                    I run SFIN Media, a digital agency where I build websites and marketing
                    solutions for clients. I also co-founded EdgeFinder, an AI trading
                    analytics platform, and created @PolystyreneGuy, an educational Instagram
                    brand about polystyrene recycling.
                  </p>
                  <p>
                    I&apos;m pursuing opportunities in commercial real estate and fintech,
                    combining my software engineering skills with deep finance knowledge.
                    Currently studying for the SIE exam.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="glass rounded-xl p-5">
                    <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-primary" />
                      What I Build
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-primary shrink-0" />
                        Revenue-generating SaaS applications
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-primary shrink-0" />
                        AI-powered tools with Claude and OpenAI APIs
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-primary shrink-0" />
                        Trading analytics and market data dashboards
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-primary shrink-0" />
                        Full-stack platforms with auth, payments, and real-time data
                      </li>
                    </ul>
                  </div>
                  <div className="glass rounded-xl p-5">
                    <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-primary" />
                      Current Focus
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-primary shrink-0" />
                        Commercial real estate career networking
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-primary shrink-0" />
                        SIE exam preparation
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-primary shrink-0" />
                        @PolystyreneGuy content and Japan video series
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-primary shrink-0" />
                        EdgeFinder waitlist onboarding
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ═══ PROJECTS ═══ */}
      <section id="projects" className="py-24">
        <div className="container mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Featured <span className="text-gradient-blue">Projects</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                A selection from my 40+ production applications spanning AI, finance,
                SaaS, and productivity.
              </p>
            </div>
          </SectionReveal>

          {/* Category filter */}
          <SectionReveal delay={0.1}>
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-medium transition-all",
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "glass text-muted-foreground hover:text-foreground"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </SectionReveal>

          {/* Project grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                >
                  <div
                    className={cn(
                      "glass rounded-xl p-5 h-full flex flex-col project-card",
                      project.highlight && "border-primary/30"
                    )}
                  >
                    {project.highlight && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-semibold mb-3 w-fit">
                        <Sparkles className="w-3 h-3" />
                        FEATURED
                      </div>
                    )}
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-foreground">
                        {project.name}
                      </h3>
                      {project.url !== "#" && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors shrink-0"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 flex-1">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1 text-[10px] text-primary/80 font-medium">
                        {CATEGORY_ICONS[project.category]}
                        {project.category}
                      </span>
                      <span className="text-border">|</span>
                      {project.tech.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ═══ EXPERIENCE ═══ */}
      <section id="experience" className="py-24">
        <div className="container mx-auto px-6">
          <SectionReveal>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold mb-12">
                Experience <span className="text-gradient-blue">&amp; Work</span>
              </h2>
              <div className="space-y-6">
                {EXPERIENCES.map((exp, i) => (
                  <SectionReveal key={exp.company} delay={i * 0.1}>
                    <div className="glass rounded-xl p-6 hover:border-primary/20 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                          {EXPERIENCE_ICONS[exp.company] || (
                            <Briefcase className="w-5 h-5" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                            <div>
                              <h3 className="font-semibold text-foreground">
                                {exp.title}
                              </h3>
                              <p className="text-sm text-primary">
                                {exp.company}
                              </p>
                            </div>
                            <span className="text-xs text-muted-foreground shrink-0">
                              {exp.period}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {exp.description}
                          </p>
                          <ul className="space-y-1.5">
                            {exp.highlights.map((h) => (
                              <li
                                key={h}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-primary shrink-0" />
                                {h}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ═══ SKILLS ═══ */}
      <section id="skills" className="py-24">
        <div className="container mx-auto px-6">
          <SectionReveal>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold mb-12">
                Tech <span className="text-gradient-blue">Stack</span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(SKILLS).map(([category, skills], i) => (
                  <SectionReveal key={category} delay={i * 0.1}>
                    <div className="glass rounded-xl p-5">
                      <h3 className="text-sm font-semibold text-foreground mb-3 capitalize">
                        {category === "ai" ? "AI & ML" : category}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs px-2.5 py-1 rounded-full bg-secondary text-muted-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-6">
          <SectionReveal>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Let&apos;s <span className="text-gradient-blue">Connect</span>
              </h2>
              <p className="text-muted-foreground mb-10">
                Interested in working together or have an opportunity? I&apos;d love to hear from you.
              </p>

              <div className="glass rounded-xl p-8 text-left">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    window.location.href = `mailto:${SOCIAL_LINKS.email}?subject=Portfolio Contact from ${contactForm.name}&body=${encodeURIComponent(contactForm.message)}`;
                  }}
                  className="space-y-4"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) =>
                          setContactForm((s) => ({ ...s, name: e.target.value }))
                        }
                        className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) =>
                          setContactForm((s) => ({
                            ...s,
                            email: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm((s) => ({
                          ...s,
                          message: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                      placeholder="Tell me about the opportunity..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              </div>

              <div className="flex items-center justify-center gap-6 mt-10">
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>
                <a
                  href={`mailto:${SOCIAL_LINKS.email}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </a>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
