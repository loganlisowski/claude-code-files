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
    title: "Discovery",
    description:
      "German apothecary Eduard Simon first isolates polystyrene from a natural resin called storax. The material is a curiosity with no practical application yet, but its unique properties are noted by European chemists.",
  },
  {
    year: "1941",
    title: "Mass Production",
    description:
      "Dow Chemical begins commercial mass production of polystyrene for military applications during World War II. Its lightweight strength and insulating properties make it ideal for radar components and military packaging.",
  },
  {
    year: "1960s",
    title: "EPS Packaging Era",
    description:
      "Expanded Polystyrene (EPS) foam packaging becomes widespread for food service and product protection. Foam cups, takeout containers, and protective packaging transform the retail and food industries worldwide.",
  },
  {
    year: "1988",
    title: "Resin Code #6",
    description:
      "The Society of the Plastics Industry introduces the resin identification coding system. Polystyrene receives code #6, establishing a standardized way for consumers and recyclers to identify and sort the material.",
  },
  {
    year: "2000s",
    title: "Recycling Technology Advances",
    description:
      "Mechanical recycling technologies mature with the development of industrial compactors and densifiers that compress EPS by 50:1. Specialized recycling facilities open across North America, creating viable collection networks.",
  },
  {
    year: "2020s",
    title: "Chemical Recycling Revolution",
    description:
      "Breakthrough chemical recycling technologies including pyrolysis and depolymerization achieve commercial scale. In 2025, food-grade recycled polystyrene is produced for the first time, enabling true circular recycling.",
  },
];

// ─── EPS vs XPS Comparison Data ───
const epsData = {
  name: "EPS",
  fullName: "Expanded Polystyrene",
  traits: [
    { label: "Composition", value: "95% air, 5% plastic" },
    { label: "Appearance", value: "White, beaded texture" },
    { label: "Density", value: "Low (15-30 kg/m\u00B3)" },
    { label: "Primary Use", value: "Food packaging, cups" },
    { label: "Recyclability", value: "Widely recyclable" },
    { label: "Insulation", value: "R-3.6 per inch" },
    { label: "Brand Name", value: "Generic foam" },
    { label: "Structure", value: "Open/closed cell mix" },
  ],
};

const xpsData = {
  name: "XPS",
  fullName: "Extruded Polystyrene",
  traits: [
    { label: "Composition", value: "Denser polymer matrix" },
    { label: "Appearance", value: "Colored (blue/pink/green)" },
    { label: "Density", value: "High (25-45 kg/m\u00B3)" },
    { label: "Primary Use", value: "Building insulation" },
    { label: "Recyclability", value: "Specialized facilities" },
    { label: "Insulation", value: "R-5.0 per inch" },
    { label: "Brand Name", value: 'Styrofoam\u2122 (Dow)' },
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
              About <span className="text-primary">Polystyrene</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              From its discovery in 1839 to cutting-edge recycling breakthroughs, explore the
              science, history, and future of this ubiquitous material.
            </p>
          </motion.div>
        </SectionReveal>
      </section>

      {/* ═══════════ POLYSTYRENE TYPES ═══════════ */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <SectionReveal>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Types of Polystyrene</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Polystyrene comes in different forms, each with unique properties and recycling
                considerations.
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
                        Characteristics
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
                        Common Uses
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

      {/* ═══════════ MANUFACTURING TIMELINE ═══════════ */}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">The Polystyrene Timeline</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Key milestones in the history of polystyrene, from discovery to modern recycling
                breakthroughs.
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">EPS vs XPS</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Understanding the differences between Expanded and Extruded Polystyrene is essential
                for proper recycling and disposal.
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
                    <Badge variant="secondary">Food Packaging</Badge>
                    <Badge variant="secondary">Cups & Containers</Badge>
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
                    <Badge variant="secondary">Building Insulation</Badge>
                    <Badge variant="secondary">Foundation Boards</Badge>
                    <Badge variant="secondary">Roofing Panels</Badge>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Environmental Impact</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                The numbers behind polystyrene waste -- and the enormous potential of expanded
                recycling infrastructure.
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
