"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  HelpCircle,
  Gamepad2,
  BarChart3,
  Recycle,
  Info,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { GlassCard } from "@/components/shared/GlassCard";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { IconMap } from "@/components/shared/IconMap";
import { useGameification } from "@/hooks/useGameification";
import { funFacts } from "@/data/polystyrene-data";
import { cn } from "@/lib/utils";

// Hero Stats
const heroStats = [
  { value: 25, suffix: "B", label: "foam cups used/year in the US", icon: "☕" },
  { value: 88, suffix: "%", label: "less energy when recycled", icon: "⚡" },
  { value: 500, suffix: "+", label: "years to decompose in landfill", icon: "⏳" },
  { value: 1000, suffix: "+", label: "drop-off locations nationwide", icon: "📍" },
];

// Beginner Guide Steps
const guideSteps = [
  {
    number: 1,
    title: "What is Polystyrene?",
    short: "That white foam stuff in your coffee cup and take-out boxes.",
    content:
      "Polystyrene is a type of plastic with the recycling code #6. The white beaded foam you see in coffee cups and packaging is called EPS (Expanded Polystyrene). It is lightweight, insulating, and 100% recyclable. Most people think foam trash is unrecyclable - that is a myth.",
    icon: "Atom",
    color: "from-blue-500/20 to-blue-600/10",
    badge: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  },
  {
    number: 2,
    title: "Why Does It Matter?",
    short: "Foam in landfills = 500+ years of pollution. Recycling = 88% less energy.",
    content:
      "When polystyrene ends up in a landfill, it sits there for over 500 years and breaks into tiny microplastics that enter our water and food chain. But when it is recycled, it uses 88% less energy than making new plastic - and it can be turned into picture frames, insulation, and rulers. The problem is not the material. It is that most people do not know how to recycle it.",
    icon: "Leaf",
    color: "from-emerald-500/20 to-emerald-600/10",
    badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  },
  {
    number: 3,
    title: "How to Recycle It",
    short: "Look for the #6 symbol. Clean it. Find a drop-off near you.",
    content:
      "Most curbside bins do NOT accept polystyrene - you need a specialized drop-off location. Here is the simple process: (1) Look for the #6 recycling symbol on the bottom of the item. (2) Remove any food residue and rinse it clean. (3) Find your nearest drop-off at earth911.com or the EPS Industry Alliance locator. There are over 1,000 locations in the US alone.",
    icon: "Recycle",
    color: "from-green-500/20 to-green-600/10",
    badge: "bg-green-500/15 text-green-400 border-green-500/20",
  },
  {
    number: 4,
    title: "Spread the Word",
    short: "Every person you educate multiplies the impact.",
    content:
      "The biggest barrier to polystyrene recycling is awareness, not technology. The recycling technology exists. The drop-off locations exist. What is missing is knowledge. Share a fact with a friend, post it on Instagram, or advocate for a drop-off location in your area. When more people recycle foam, more businesses invest in collection infrastructure - creating a positive cycle.",
    icon: "Sparkles",
    color: "from-purple-500/20 to-purple-600/10",
    badge: "bg-purple-500/15 text-purple-400 border-purple-500/20",
  },
];

// Explore links
const exploreLinks = [
  {
    title: "About Polystyrene",
    description: "What it is, where it comes from, and the science behind it.",
    href: "/about",
    icon: Info,
    gradient: "from-blue-500/20 to-blue-600/5",
    iconBg: "bg-blue-500/20 text-blue-400",
    badge: "Science",
  },
  {
    title: "How to Recycle",
    description: "Step-by-step guide with drop-off location finder.",
    href: "/how-to-recycle",
    icon: Recycle,
    gradient: "from-emerald-500/20 to-emerald-600/5",
    iconBg: "bg-emerald-500/20 text-emerald-400",
    badge: "Guide",
  },
  {
    title: "Fun Facts",
    description: "50+ surprising stats you can share on Instagram.",
    href: "/fun-facts",
    icon: Sparkles,
    gradient: "from-amber-500/20 to-amber-600/5",
    iconBg: "bg-amber-500/20 text-amber-400",
    badge: "Shareable",
  },
  {
    title: "Take the Quiz",
    description: "Test your knowledge and earn XP. Most people fail question 3.",
    href: "/quiz",
    icon: HelpCircle,
    gradient: "from-purple-500/20 to-purple-600/5",
    iconBg: "bg-purple-500/20 text-purple-400",
    badge: "Interactive",
  },
  {
    title: "Play Games",
    description: "Learn by doing with the polystyrene sorting challenge.",
    href: "/games",
    icon: Gamepad2,
    gradient: "from-orange-500/20 to-orange-600/5",
    iconBg: "bg-orange-500/20 text-orange-400",
    badge: "Fun",
  },
  {
    title: "Environmental Impact",
    description: "Real data: how recycling changes the numbers.",
    href: "/environmental-impact",
    icon: BarChart3,
    gradient: "from-cyan-500/20 to-cyan-600/5",
    iconBg: "bg-cyan-500/20 text-cyan-400",
    badge: "Data",
  },
];

// Fun fact carousel
function FunFactCarousel() {
  const displayFacts = funFacts.slice(0, 6);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayFacts.length);
    }, 5000);
  }, [displayFacts.length]);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoPlay]);

  const goTo = (index: number) => {
    setCurrentIndex(index);
    startAutoPlay();
  };
  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayFacts.length);
    startAutoPlay();
  };
  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + displayFacts.length) % displayFacts.length);
    startAutoPlay();
  };

  const fact = displayFacts[currentIndex];

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="overflow-hidden rounded-2xl relative min-h-[240px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="instagram-card p-8 md:p-12">
              <div className="flex flex-col items-center text-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/20 flex items-center justify-center">
                  <IconMap name={fact.iconName} className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl md:text-6xl font-black text-gradient-green">
                      {fact.stat}
                    </span>
                    <span className="text-2xl md:text-3xl text-muted-foreground font-light">
                      {fact.unit}
                    </span>
                  </div>
                </div>
                <p className="text-muted-foreground max-w-2xl leading-relaxed text-base md:text-lg">
                  {fact.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground/60 font-medium uppercase tracking-wider">
                  <span className="w-8 h-px bg-border" />
                  PolyRecycle Fact #{currentIndex + 1} of {displayFacts.length}
                  <span className="w-8 h-px bg-border" />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={goPrev}
        aria-label="Previous fact"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-5 w-10 h-10 rounded-full glass border border-border/50 flex items-center justify-center hover:border-primary/40 transition-colors"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={goNext}
        aria-label="Next fact"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-5 w-10 h-10 rounded-full glass border border-border/50 flex items-center justify-center hover:border-primary/40 transition-colors"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="flex justify-center gap-2 mt-6">
        {displayFacts.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to fact ${i + 1}`}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === currentIndex
                ? "bg-primary w-8"
                : "bg-muted-foreground/25 w-2 hover:bg-muted-foreground/50"
            )}
          />
        ))}
      </div>
    </div>
  );
}

// Hero title with animated reveal
function HeroTitle() {
  return (
    <div className="text-center space-y-3">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight"
      >
        <span className="text-foreground">That foam cup</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight"
      >
        <span className="text-gradient-green">is 100% recyclable.</span>
      </motion.div>
    </div>
  );
}

// Main page
export default function HomePage() {
  const { recordGuideStep } = useGameification();
  const [activeStep, setActiveStep] = useState<number | null>(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set([1]));

  const handleStepClick = (stepNumber: number) => {
    setActiveStep(stepNumber);
    if (!completedSteps.has(stepNumber)) {
      setCompletedSteps((prev) => new Set([...Array.from(prev), stepNumber]));
      recordGuideStep(stepNumber);
    }
  };

  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 -z-10 hero-glow"
        />

        {/* Floating particles */}
        <div className="absolute inset-0 -z-[5] overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/10"
              initial={{ x: `${10 + i * 12}%`, y: "110%" }}
              animate={{
                y: "-10%",
                x: `${10 + i * 12 + Math.sin(i * 0.8) * 8}%`,
              }}
              transition={{
                duration: 12 + i * 2.5,
                repeat: Infinity,
                ease: "linear",
                delay: i * 2,
              }}
              style={{ width: 4 + i * 2, height: 4 + i * 2 }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 py-24 flex flex-col items-center gap-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse-green" />
            Free Recycling Education Platform
          </motion.div>

          <HeroTitle />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground text-center max-w-xl leading-relaxed"
          >
            Most people throw it away. Learn why that is a mistake, and how to fix it in 5 minutes.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-sm text-muted-foreground/60"
          >
            Created by{" "}
            <a href="https://instagram.com/PolystyreneGuy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
              @PolystyreneGuy
            </a>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button asChild size="lg" className="gap-2 text-base px-8 h-14 glow-primary">
              <Link href="/how-to-recycle">
                <BookOpen className="h-5 w-5" />
                Start Learning Free
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 text-base px-8 h-14 border-border/60 hover:border-primary/50"
            >
              <Link href="/quiz">
                <HelpCircle className="h-5 w-5" />
                Take the Quiz
              </Link>
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-6 w-full max-w-5xl"
          >
            {heroStats.map((stat, i) => (
              <div key={i} className="stat-card text-center">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  className="text-3xl md:text-4xl font-black text-primary block"
                />
                <p className="text-xs text-muted-foreground mt-1 leading-snug">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-1 text-muted-foreground/40">
            <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-muted-foreground/30 to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* BEGINNER GUIDE */}
      <section className="py-20 md:py-28">
        <SectionReveal className="container mx-auto px-4">
          <div className="text-center mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              Start Here
            </span>
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              Understand it in{" "}
              <span className="text-gradient-green">4 steps</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              No prior knowledge needed. Click each step to learn and earn XP.
            </p>
          </div>

          {/* Step tabs */}
          <div className="flex justify-center flex-wrap gap-2 mb-8 mt-10">
            {guideSteps.map((step) => (
              <button
                key={step.number}
                onClick={() => handleStepClick(step.number)}
                className={cn(
                  "flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200",
                  activeStep === step.number
                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
                    : completedSteps.has(step.number)
                    ? "bg-primary/10 text-primary border-primary/30"
                    : "bg-muted/50 text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
                )}
              >
                <span
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-xs font-black",
                    activeStep === step.number ? "bg-primary-foreground/20" : "bg-current/10"
                  )}
                >
                  {completedSteps.has(step.number) && activeStep !== step.number ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    step.number
                  )}
                </span>
                {step.title}
              </button>
            ))}
          </div>

          {/* Step content */}
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              {activeStep !== null &&
                (() => {
                  const step = guideSteps[activeStep - 1];
                  return (
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, y: 16, scale: 0.99 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -16, scale: 0.99 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <GlassCard className={cn("p-8 md:p-10 bg-gradient-to-br", step.color)}>
                        <div className="flex items-start gap-5">
                          <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/20 flex items-center justify-center flex-shrink-0">
                            <IconMap name={step.icon} className="h-7 w-7 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <span
                                className={cn(
                                  "text-xs font-bold px-2.5 py-1 rounded-lg border",
                                  step.badge
                                )}
                              >
                                Step {step.number} of 4
                              </span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold mb-2">{step.title}</h3>
                            <p className="text-sm text-primary/80 font-semibold mb-3 italic">
                              {step.short}
                            </p>
                            <p className="text-muted-foreground leading-relaxed">{step.content}</p>
                            <div className="mt-5 flex flex-wrap gap-3">
                              {activeStep < guideSteps.length && (
                                <Button
                                  onClick={() => handleStepClick(activeStep + 1)}
                                  variant="ghost"
                                  className="gap-2 text-primary hover:text-primary hover:bg-primary/10"
                                >
                                  Next: {guideSteps[activeStep].title}
                                  <ArrowRight className="h-4 w-4" />
                                </Button>
                              )}
                              {activeStep === guideSteps.length && (
                                <Button asChild className="gap-2">
                                  <Link href="/how-to-recycle">
                                    Find Locations Near Me
                                    <ArrowRight className="h-4 w-4" />
                                  </Link>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </GlassCard>
                    </motion.div>
                  );
                })()}
            </AnimatePresence>
          </div>
        </SectionReveal>
      </section>

      {/* FUN FACTS CAROUSEL */}
      <section className="py-20 md:py-28 relative">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 70% 40% at 50% 50%, hsl(var(--primary) / 0.07), transparent)",
          }}
        />
        <SectionReveal className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
              Share-Worthy Facts
            </span>
            <h2 className="text-3xl md:text-5xl font-black mb-4">Did You Know?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Surprising facts about polystyrene and recycling. Perfect for your next Instagram post.
            </p>
          </div>
          <FunFactCarousel />
          <div className="text-center mt-10">
            <Button
              asChild
              variant="outline"
              className="gap-2 border-primary/30 hover:border-primary/60 text-primary hover:bg-primary/5"
            >
              <Link href="/fun-facts">
                <Sparkles className="h-4 w-4" />
                See All 50+ Facts
              </Link>
            </Button>
          </div>
        </SectionReveal>
      </section>

      {/* EXPLORE GRID */}
      <section className="py-20 md:py-28">
        <SectionReveal className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Explore Everything</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Interactive content that makes learning about recycling actually fun.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {exploreLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <Link href={link.href} className="block h-full">
                  <div
                    className={cn(
                      "h-full p-6 rounded-2xl border border-border/50 bg-gradient-to-br transition-all duration-300",
                      "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:scale-[1.02] group cursor-pointer",
                      link.gradient
                    )}
                  >
                    <div className="flex flex-col gap-4 h-full">
                      <div className="flex items-start justify-between">
                        <div
                          className={cn(
                            "w-11 h-11 rounded-xl flex items-center justify-center",
                            link.iconBg
                          )}
                        >
                          <link.icon className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-background/50 border border-border/50 text-muted-foreground">
                          {link.badge}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-bold mb-1.5 group-hover:text-primary transition-colors duration-200">
                          {link.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {link.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-medium">
                        Explore
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </SectionReveal>
      </section>

      {/* CONTACT CTA */}
      <section className="py-20 md:py-28 relative">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 70% 40% at 50% 50%, hsl(var(--primary) / 0.07), transparent)",
          }}
        />
        <SectionReveal className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-5">
                Get in Touch
              </span>
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                Ready to Make a Difference?
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Whether you are looking for recycling solutions for your business, a partnership, or
                just want to say hi - we would love to hear from you.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="outline" className="gap-2">
                  <Link href="/contact">
                    <MessageSquare className="h-4 w-4" />
                    Full Contact Page
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="gap-2 text-primary hover:bg-primary/5">
                  <Link href="/how-to-recycle">
                    <Recycle className="h-4 w-4" />
                    Find Drop-Off Near Me
                  </Link>
                </Button>
              </div>
            </div>
            <ContactForm condensed />
          </div>
        </SectionReveal>
      </section>
    </main>
  );
}
