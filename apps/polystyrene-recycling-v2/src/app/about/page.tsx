"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/shared/GlassCard";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { IconMap } from "@/components/shared/IconMap";
import {
  polystyreneTypes,
  environmentalStats,
} from "@/data/polystyrene-data";
import { cn } from "@/lib/utils";

// ─── Timeline Events ───
const timelineEvents = [
  {
    year: "1839",
    title: "Discovered by Accident",
    description:
      "A German pharmacist named Eduard Simon stumbles onto polystyrene while experimenting with tree resin. He has no idea what to do with it. Nobody does, for about a hundred years.",
  },
  {
    year: "1941",
    title: "Goes Big for the Military",
    description:
      "Dow Chemical starts mass-producing polystyrene for World War II. Turns out it&apos;s perfect for radar parts and military packaging because it&apos;s incredibly light and a great insulator.",
  },
  {
    year: "1960s",
    title: "Foam Takes Over",
    description:
      "EPS foam packaging explodes into everyday life. Coffee cups, takeout boxes, packing peanuts. The food and shipping industries are completely transformed. The convenience is incredible. The waste problem? Nobody&apos;s thinking about that yet.",
  },
  {
    year: "1988",
    title: "Gets Its Own Number",
    description:
      "The plastics industry creates the resin code system. Polystyrene gets #6. For the first time, consumers and recyclers have a standard way to identify and sort it. Look for that little triangle on the bottom of your cup.",
  },
  {
    year: "2000s",
    title: "Recycling Gets Real",
    description:
      "Industrial compactors and densifiers arrive that can crush EPS foam down to 1/50th its original size. Suddenly, recycling polystyrene becomes economically viable. Specialized facilities start popping up across North America.",
  },
  {
    year: "2020s",
    title: "The Game Changes",
    description:
      "Chemical recycling hits commercial scale. For the first time ever, used polystyrene can be broken down and remade into food-grade material. True circular recycling becomes reality, not just a concept.",
  },
];

// ─── EPS vs XPS Comparison Data ───
const epsData = {
  name: "EPS",
  fullName: "Expanded Polystyrene",
  tagline: "The white foam you see everywhere",
  traits: [
    { label: "What&apos;s it made of?", value: "95% air, 5% plastic" },
    { label: "What does it look like?", value: "White with tiny beads" },
    { label: "How heavy is it?", value: "Very light (15-30 kg/m\u00B3)" },
    { label: "Used for", value: "Cups, takeout, packaging" },
    { label: "Can you recycle it?", value: "Yes, widely recyclable" },
    { label: "Insulation rating", value: "R-3.6 per inch" },
    { label: "People call it", value: "\"Styrofoam\" (incorrectly)" },
    { label: "Structure", value: "Open/closed cell mix" },
  ],
};

const xpsData = {
  name: "XPS",
  fullName: "Extruded Polystyrene",
  tagline: "The colored boards in construction",
  traits: [
    { label: "What&apos;s it made of?", value: "Dense polymer matrix" },
    { label: "What does it look like?", value: "Blue, pink, or green boards" },
    { label: "How heavy is it?", value: "Heavier (25-45 kg/m\u00B3)" },
    { label: "Used for", value: "Building insulation" },
    { label: "Can you recycle it?", value: "Yes, at specialized spots" },
    { label: "Insulation rating", value: "R-5.0 per inch" },
    { label: "People call it", value: "Styrofoam\u2122 (correctly!)" },
    { label: "Structure", value: "Uniform closed cell" },
  ],
};

// ─── Difficulty badge color helper ───
function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case "easy":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    case "moderate":
      return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    case "difficult":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    default:
      return "";
  }
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero-about.jpg"
          alt="About polystyrene materials and science"
          fill
          className="object-cover -z-20"
          priority
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm -z-10" />

        <SectionReveal className="container mx-auto px-4 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              So, What <span className="text-primary">Is</span> This Stuff?
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              It&apos;s in your coffee cup. Your takeout box. The packaging around your new TV.
              And almost nobody knows the first thing about it. Let&apos;s fix that.
            </p>
          </motion.div>
        </SectionReveal>
      </section>

      {/* ═══════════ WHO IS @POLYSTYRENEGUY ═══════════ */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <SectionReveal>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                Who is <span className="text-primary">@PolystyreneGuy</span>?
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Hi. I&apos;m the person behind @PolystyreneGuy. I started this because I was
                  frustrated by a simple problem: polystyrene is 100% recyclable, but almost
                  nobody knows that.
                </p>
                <p>
                  I kept hearing people say foam &ldquo;can&apos;t be recycled.&rdquo; I watched perfectly good
                  material get tossed in the trash, day after day, because the information just
                  wasn&apos;t getting to regular people. The science was there. The recycling
                  technology was there. The communication? Nowhere.
                </p>
                <p>
                  So I started making content about it. Simple, clear, no-jargon content that
                  anyone can understand. And it turns out, people actually want to know this stuff.
                  They just needed someone to explain it in plain English.
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ═══════════ WHY I STARTED THIS ═══════════ */}
      <section className="py-20 md:py-28 relative">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 70% 40% at 50% 50%, hsla(160, 84%, 39%, 0.05), transparent)",
          }}
        />
        <div className="container mx-auto px-4">
          <SectionReveal>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                Why I Started This
              </h2>
              <GlassCard className="p-8 md:p-10">
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    The moment that changed everything for me was watching a city council meeting
                    where they voted to ban polystyrene. Their reason? &ldquo;It can&apos;t be recycled.&rdquo;
                    That&apos;s not true. It can be recycled. It is being recycled. Over 136 million
                    pounds of it were recycled in the US in a single year.
                  </p>
                  <p>
                    The problem isn&apos;t the material. The problem is that most people, including
                    policymakers, have outdated information. They&apos;re making decisions based on
                    myths from the 1990s.
                  </p>
                  <p>
                    This app, this Instagram account, all of it exists to close that information
                    gap. Not with corporate brochures or academic papers. With content that&apos;s
                    actually fun to read, easy to share, and impossible to forget.
                  </p>
                  <p className="text-foreground font-medium">
                    If you learn one thing here today and share it with one person, we&apos;ve already
                    made progress.
                  </p>
                </div>
              </GlassCard>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ═══════════ POLYSTYRENE TYPES ═══════════ */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <SectionReveal>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">The Two Types You Need to Know</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                There are different kinds of polystyrene, and they&apos;re recycled differently.
                Here&apos;s the quick breakdown.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {polystyreneTypes.map((type, i) => (
              <SectionReveal key={type.id} delay={i * 0.15}>
                <GlassCard className="p-8 h-full">
                  <div className="flex flex-col gap-5">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-primary">{type.name}</h3>
                        <p className="text-sm text-muted-foreground">{type.fullName}</p>
                      </div>
                      <Badge
                        className={cn(
                          "capitalize border",
                          getDifficultyColor(type.recyclingDifficulty)
                        )}
                      >
                        {type.recyclingDifficulty} to recycle
                      </Badge>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed">{type.description}</p>

                    {/* Characteristics */}
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                        Key Traits
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {type.characteristics.map((char) => (
                          <Badge key={char} variant="secondary" className="text-xs">
                            {char}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Common Uses */}
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                        Where You&apos;ll Find It
                      </h4>
                      <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                        {type.commonUses.map((use) => (
                          <li
                            key={use}
                            className="text-sm text-muted-foreground flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                            {use}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </GlassCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TIMELINE ═══════════ */}
      <section className="py-20 md:py-28 relative">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 70% 40% at 50% 50%, hsla(160, 84%, 39%, 0.05), transparent)",
          }}
        />
        <div className="container mx-auto px-4">
          <SectionReveal>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Got Here</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                From an accidental discovery to a recycling revolution. The story of polystyrene
                in six key moments.
              </p>
            </div>
          </SectionReveal>

          {/* Vertical Timeline */}
          <div className="relative max-w-3xl mx-auto">
            {/* Center Line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-px" />

            {timelineEvents.map((event, i) => {
              const isLeft = i % 2 === 0;
              return (
                <SectionReveal key={event.year} delay={i * 0.1}>
                  <div
                    className={cn(
                      "relative flex items-start mb-12 last:mb-0",
                      "pl-16 md:pl-0",
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    )}
                  >
                    {/* Dot on the line */}
                    <div className="absolute left-6 md:left-1/2 top-2 w-3 h-3 rounded-full bg-primary border-2 border-background -translate-x-1/2 z-10" />

                    {/* Content card */}
                    <div
                      className={cn(
                        "w-full md:w-[calc(50%-2rem)]",
                        isLeft ? "md:pr-0" : "md:pl-0"
                      )}
                    >
                      <GlassCard className="p-6">
                        <span className="text-2xl font-bold text-primary">{event.year}</span>
                        <h3 className="text-lg font-semibold mt-1 mb-2">{event.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {event.description}
                        </p>
                      </GlassCard>
                    </div>

                    {/* Spacer for opposite side */}
                    <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ EPS vs XPS COMPARISON ═══════════ */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <SectionReveal>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">EPS vs XPS: What&apos;s the Difference?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                One is the white foam in your coffee cup. The other is the colored board
                in your walls. Here&apos;s how to tell them apart.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* EPS Card */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <GlassCard className="p-8 h-full border-l-4 border-l-emerald-500/50">
                <div className="flex flex-col gap-5">
                  <div>
                    <h3 className="text-2xl font-bold text-emerald-400">{epsData.name}</h3>
                    <p className="text-sm text-muted-foreground">{epsData.fullName}</p>
                    <p className="text-xs text-primary mt-1">{epsData.tagline}</p>
                  </div>
                  <div className="space-y-3">
                    {epsData.traits.map((trait) => (
                      <div key={trait.label} className="flex justify-between items-start gap-4">
                        <span className="text-sm text-muted-foreground font-medium whitespace-nowrap">
                          {trait.label}
                        </span>
                        <span className="text-sm text-foreground text-right">{trait.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="secondary">Coffee Cups</Badge>
                    <Badge variant="secondary">Takeout Containers</Badge>
                    <Badge variant="secondary">Packing Peanuts</Badge>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* XPS Card */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <GlassCard className="p-8 h-full border-l-4 border-l-blue-500/50">
                <div className="flex flex-col gap-5">
                  <div>
                    <h3 className="text-2xl font-bold text-blue-400">{xpsData.name}</h3>
                    <p className="text-sm text-muted-foreground">{xpsData.fullName}</p>
                    <p className="text-xs text-primary mt-1">{xpsData.tagline}</p>
                  </div>
                  <div className="space-y-3">
                    {xpsData.traits.map((trait) => (
                      <div key={trait.label} className="flex justify-between items-start gap-4">
                        <span className="text-sm text-muted-foreground font-medium whitespace-nowrap">
                          {trait.label}
                        </span>
                        <span className="text-sm text-foreground text-right">{trait.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="secondary">Wall Insulation</Badge>
                    <Badge variant="secondary">Foundation Boards</Badge>
                    <Badge variant="secondary">Roof Panels</Badge>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ ENVIRONMENTAL STATS ═══════════ */}
      <section className="py-20 md:py-28 relative">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 50%, hsla(160, 84%, 39%, 0.05), transparent)",
          }}
        />
        <div className="container mx-auto px-4">
          <SectionReveal>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">The Numbers Don&apos;t Lie</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Here&apos;s the real environmental impact of polystyrene, and what happens when
                we actually bother to recycle it.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {environmentalStats.map((stat, i) => (
              <SectionReveal key={stat.id} delay={i * 0.1}>
                <GlassCard className="p-6 h-full">
                  <div className="flex flex-col items-center text-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${stat.color}20` }}
                    >
                      <IconMap
                        name={stat.iconName}
                        className="h-6 w-6"
                        style={{ color: stat.color }}
                      />
                    </div>
                    <div className="text-3xl font-bold" style={{ color: stat.color }}>
                      {stat.value}
                    </div>
                    <h3 className="text-sm font-semibold">{stat.label}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                </GlassCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
