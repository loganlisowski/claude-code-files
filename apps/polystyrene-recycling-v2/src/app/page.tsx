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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/shared/GlassCard";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { IconMap } from "@/components/shared/IconMap";
import { useGameification } from "@/hooks/useGameification";
import { funFacts } from "@/data/polystyrene-data";
import { cn } from "@/lib/utils";

// ─── Hero Stats ───
const heroStats = [
  { value: 25, suffix: "B", label: "cups / year" },
  { value: 88, suffix: "%", label: "energy saved" },
  { value: 500, suffix: "+", label: "years to decompose" },
  { value: 1000, suffix: "+", label: "drop-off locations" },
];

// ─── Beginner Guide Steps ───
const guideSteps = [
  {
    number: 1,
    title: "What is Polystyrene?",
    content:
      "Polystyrene is a versatile plastic identified by the resin code #6. It comes in two main forms: Expanded Polystyrene (EPS) -- the white, beaded foam in cups and packaging -- and Extruded Polystyrene (XPS) -- the denser, colored foam used in insulation. Despite common misconceptions, polystyrene is 100% recyclable and can be transformed back into new products indefinitely.",
    icon: "Atom",
  },
  {
    number: 2,
    title: "Why Recycle?",
    content:
      "Polystyrene takes over 500 years to decompose in landfills and breaks into harmful microplastics. Recycling just one ton saves 2.3 tons of CO\u2082 emissions and uses 88% less energy than producing virgin material. With 25 billion foam cups used yearly in the US alone, recycling transforms a waste problem into a valuable resource.",
    icon: "Leaf",
  },
  {
    number: 3,
    title: "How to Recycle",
    content:
      "Start by checking for the #6 resin code on your polystyrene items. Clean containers thoroughly to remove food residue. Most curbside programs do not accept polystyrene, so locate a specialized drop-off point using the EPS Industry Alliance locator. Over 1,000 drop-off sites exist across the US, with more opening every year.",
    icon: "Recycle",
  },
  {
    number: 4,
    title: "Take Action",
    content:
      "Beyond recycling your own polystyrene, you can make a real difference. Advocate for recycling programs in your community. Support businesses that use recyclable packaging. Educate friends and family about proper disposal. Every person who recycles polystyrene correctly strengthens the system and brings us closer to a circular economy.",
    icon: "Sparkles",
  },
];

// ─── Quick Links ───
const quickLinks = [
  {
    title: "About Polystyrene",
    description: "Learn about the science and types of polystyrene materials.",
    href: "/about",
    icon: Info,
    color: "text-blue-400",
  },
  {
    title: "How to Recycle",
    description: "Step-by-step guides for mechanical and chemical recycling.",
    href: "/how-to-recycle",
    icon: Recycle,
    color: "text-emerald-400",
  },
  {
    title: "Fun Facts",
    description: "Surprising statistics and data about polystyrene.",
    href: "/fun-facts",
    icon: Sparkles,
    color: "text-amber-400",
  },
  {
    title: "Take the Quiz",
    description: "Test your polystyrene recycling knowledge and earn XP.",
    href: "/quiz",
    icon: HelpCircle,
    color: "text-purple-400",
  },
  {
    title: "Play Games",
    description: "Interactive sorting and matching games to learn by doing.",
    href: "/games",
    icon: Gamepad2,
    color: "text-orange-400",
  },
  {
    title: "Environmental Impact",
    description: "Data visualizations showing polystyrene's environmental footprint.",
    href: "/data",
    icon: BarChart3,
    color: "text-cyan-400",
  },
];

// ─── Hero Word Reveal ───
function HeroTitle() {
  const words = "Polystyrene is 100% Recyclable".split(" ");

  return (
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-center">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 * i }}
          className={cn(
            "inline-block mr-[0.3em]",
            word === "100%" && "text-primary",
            word === "Recyclable" && "text-primary"
          )}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}

// ─── Fun Fact Carousel ───
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

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="overflow-hidden rounded-xl relative min-h-[220px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full"
          >
            <GlassCard className="p-8 md:p-10">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                  <IconMap
                    name={displayFacts[currentIndex].iconName}
                    className="h-7 w-7 text-primary"
                  />
                </div>
                <div>
                  <span className="text-4xl md:text-5xl font-bold text-primary">
                    {displayFacts[currentIndex].stat}
                  </span>
                  <span className="text-lg md:text-xl text-muted-foreground ml-2">
                    {displayFacts[currentIndex].unit}
                  </span>
                </div>
                <p className="text-muted-foreground max-w-2xl leading-relaxed">
                  {displayFacts[currentIndex].description}
                </p>
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goPrev}
        aria-label="Previous fact"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-10 h-10 rounded-full bg-card/80 border border-border/50 flex items-center justify-center hover:bg-card transition-colors"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={goNext}
        aria-label="Next fact"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-10 h-10 rounded-full bg-card/80 border border-border/50 flex items-center justify-center hover:bg-card transition-colors"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {displayFacts.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to fact ${i + 1}`}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all duration-300",
              i === currentIndex
                ? "bg-primary w-8"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            )}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main Home Page ───
export default function HomePage() {
  const { recordGuideStep } = useGameification();
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const handleStepClick = (stepNumber: number) => {
    if (activeStep === stepNumber) {
      setActiveStep(null);
      return;
    }
    setActiveStep(stepNumber);
    if (!completedSteps.has(stepNumber)) {
      setCompletedSteps((prev) => new Set([...Array.from(prev), stepNumber]));
      recordGuideStep(stepNumber);
    }
  };

  return (
    <main className="min-h-screen">
      {/* ═══════════ HERO SECTION ═══════════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Gradient Mesh Background */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% -20%, hsla(160, 84%, 39%, 0.3), transparent),
              radial-gradient(ellipse 60% 60% at 20% 60%, hsla(170, 70%, 30%, 0.2), transparent),
              radial-gradient(ellipse 50% 50% at 80% 50%, hsla(150, 60%, 25%, 0.2), transparent),
              radial-gradient(ellipse 100% 80% at 50% 100%, hsla(155, 40%, 10%, 0.4), transparent),
              linear-gradient(180deg, hsl(155, 30%, 5%) 0%, hsl(160, 25%, 8%) 50%, hsl(155, 30%, 5%) 100%)
            `,
          }}
        />

        {/* Animated floating particles */}
        <div className="absolute inset-0 -z-[5] overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/20"
              initial={{
                x: `${20 + i * 15}%`,
                y: "110%",
              }}
              animate={{
                y: "-10%",
                x: `${20 + i * 15 + Math.sin(i) * 10}%`,
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 1.5,
              }}
              style={{
                width: 3 + i * 1.5,
                height: 3 + i * 1.5,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 py-20 flex flex-col items-center gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium"
          >
            <Recycle className="h-4 w-4" />
            Recycling Education Platform
          </motion.div>

          <HeroTitle />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl"
          >
            Discover the science, methods, and impact of polystyrene recycling.
            Learn how to make a difference through interactive guides, quizzes, and real data.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 mt-2"
          >
            <Button asChild size="lg" className="gap-2 text-base px-8">
              <Link href="/how-to-recycle">
                <BookOpen className="h-5 w-5" />
                Start Learning
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2 text-base px-8">
              <Link href="/quiz">
                <HelpCircle className="h-5 w-5" />
                Take the Quiz
              </Link>
            </Button>
          </motion.div>

          {/* Animated Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mt-10 w-full max-w-4xl"
          >
            {heroStats.map((stat, i) => (
              <div key={i} className="text-center">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  className="text-3xl md:text-4xl font-bold text-primary"
                />
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
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
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* ═══════════ BEGINNER GUIDE SECTION ═══════════ */}
      <section className="py-20 md:py-28">
        <SectionReveal className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your Recycling Journey Starts Here
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Follow these four steps to become a polystyrene recycling expert. Click each step to
              learn more and earn experience points.
            </p>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-center items-center gap-0 mb-10">
            {guideSteps.map((step, i) => (
              <div key={step.number} className="flex items-center">
                <button
                  onClick={() => handleStepClick(step.number)}
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 border-2",
                    activeStep === step.number
                      ? "bg-primary text-primary-foreground border-primary scale-110"
                      : completedSteps.has(step.number)
                      ? "bg-primary/20 text-primary border-primary/50"
                      : "bg-muted text-muted-foreground border-border hover:border-primary/50"
                  )}
                >
                  {completedSteps.has(step.number) && activeStep !== step.number ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.number
                  )}
                </button>
                {i < guideSteps.length - 1 && (
                  <div
                    className={cn(
                      "w-12 sm:w-20 md:w-28 h-0.5 transition-colors duration-300",
                      completedSteps.has(step.number)
                        ? "bg-primary/50"
                        : "bg-border"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              {activeStep !== null && (
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <GlassCard className="p-8 md:p-10">
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <IconMap
                          name={guideSteps[activeStep - 1].icon}
                          className="h-6 w-6 text-primary"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-3">
                          Step {activeStep}: {guideSteps[activeStep - 1].title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {guideSteps[activeStep - 1].content}
                        </p>
                        {activeStep < guideSteps.length && (
                          <Button
                            onClick={() => handleStepClick(activeStep + 1)}
                            variant="ghost"
                            className="mt-4 gap-2 text-primary hover:text-primary"
                          >
                            Next Step
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        )}
                        {activeStep === guideSteps.length && (
                          <Button asChild className="mt-4 gap-2" variant="default">
                            <Link href="/how-to-recycle">
                              Start Recycling Guide
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>

            {activeStep === null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-10"
              >
                <p className="text-muted-foreground">
                  Click a step above to begin your journey.
                </p>
              </motion.div>
            )}
          </div>
        </SectionReveal>
      </section>

      {/* ═══════════ FUN FACTS CAROUSEL ═══════════ */}
      <section className="py-20 md:py-28 relative">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 70% 40% at 50% 50%, hsla(160, 84%, 39%, 0.06), transparent)",
          }}
        />
        <SectionReveal className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Did You Know?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Surprising facts about polystyrene, recycling technology, and environmental impact.
            </p>
          </div>
          <FunFactCarousel />
        </SectionReveal>
      </section>

      {/* ═══════════ QUICK LINKS GRID ═══════════ */}
      <section className="py-20 md:py-28">
        <SectionReveal className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore & Learn</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Dive deeper into polystyrene recycling through interactive content, data
              visualizations, and fun challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {quickLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={link.href} className="block h-full">
                  <GlassCard className="p-6 h-full group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20">
                    <div className="flex flex-col gap-4">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center bg-muted/50 group-hover:bg-primary/20 transition-colors duration-300",
                          link.color
                        )}
                      >
                        <link.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors duration-300">
                          {link.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {link.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-auto">
                        Explore
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </SectionReveal>
      </section>
    </main>
  );
}
