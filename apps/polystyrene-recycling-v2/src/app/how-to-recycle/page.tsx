"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  Search,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { GlassCard } from "@/components/shared/GlassCard";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { IconMap } from "@/components/shared/IconMap";
import { recyclingMethods, policyData } from "@/data/polystyrene-data";
import { stateMapPaths } from "@/data/us-map-paths";
import { cn } from "@/lib/utils";

// ─── Step-by-Step Wizard Data ───
const wizardSteps = [
  {
    id: 1,
    title: "Identify",
    shortTitle: "Identify",
    description: "Determine what type of polystyrene you have",
    content:
      "Start by locating the recycling symbol on your polystyrene item. Look for the number 6 inside the triangular recycling arrows, usually stamped on the bottom of containers. This identifies the item as polystyrene (PS). Next, determine whether it is Expanded Polystyrene (EPS) -- the white, beaded foam used in cups and packaging -- or solid polystyrene, which is rigid and clear or colored. Packing peanuts, foam trays, and foam cups are EPS. Yogurt containers and disposable cutlery are typically solid PS.",
    tips: [
      "Look for the #6 resin code on the bottom of containers",
      "EPS foam is white and has a beaded or granular texture",
      "Solid polystyrene is rigid, often clear or colored",
      "Packing peanuts are almost always EPS and recyclable",
      "Remove any labels or tape if possible before recycling",
    ],
    icon: "Search",
  },
  {
    id: 2,
    title: "Clean",
    shortTitle: "Clean",
    description: "Remove all food residue and contaminants",
    content:
      "Contamination is the number one reason polystyrene loads are rejected at recycling facilities. Rinse all food containers thoroughly with warm water to remove grease, sauces, and food particles. Allow items to dry completely before storing them for recycling. If a container is heavily soiled and cannot be cleaned -- such as a foam tray that has absorbed meat juices -- it may not be recyclable and should go in the trash instead.",
    tips: [
      "Rinse containers with warm water immediately after use",
      "Food residue causes entire recycling loads to be rejected",
      "Let items air-dry completely before storing",
      "Heavily soiled items that cannot be cleaned should go in trash",
      "A quick rinse is usually sufficient -- no soap needed",
    ],
    icon: "Droplets",
  },
  {
    id: 3,
    title: "Sort",
    shortTitle: "Sort",
    description: "Separate polystyrene by type for proper processing",
    content:
      "Different types of polystyrene are processed differently, so sorting matters. Keep EPS foam (cups, food containers, packaging) separate from solid polystyrene (cutlery, yogurt cups). Packing peanuts should be collected in a bag by themselves, as many shipping stores accept them for reuse. Break larger foam pieces into smaller sections to save storage space, but do not compress EPS into a tight ball as this can make it harder for facilities to process.",
    tips: [
      "Keep EPS foam and solid PS separate",
      "Collect packing peanuts in a separate bag",
      "Break large foam into manageable pieces",
      "Do not crush EPS into compressed balls",
      "Store clean sorted items in a dry place until drop-off",
    ],
    icon: "Layers",
  },
  {
    id: 4,
    title: "Find Location",
    shortTitle: "Locate",
    description: "Locate a recycling drop-off point near you",
    content:
      "Since most curbside recycling programs do not accept polystyrene, you will need to find a dedicated drop-off location. The EPS Industry Alliance maintains an online recycling locator at www.epspackaging.org that maps collection sites across the United States. Many UPS Store locations, packaging retailers, and dedicated recycling centers accept clean EPS. Some municipalities also hold special recycling events that include polystyrene collection.",
    tips: [
      "Check the EPS Industry Alliance recycling locator online",
      "Many shipping and packaging stores accept clean EPS",
      "Call ahead to confirm what types and conditions are accepted",
      "Look for community recycling events in your area",
      "Over 1,000 dedicated drop-off locations exist across the US",
    ],
    icon: "Map",
  },
  {
    id: 5,
    title: "Drop Off",
    shortTitle: "Drop Off",
    description: "Deliver your sorted polystyrene for recycling",
    content:
      "Gather your clean, sorted polystyrene and transport it to the drop-off location. If possible, consolidate multiple trips worth of material into a single visit to reduce your carbon footprint. Some drop-off centers provide collection bins or bags. When dropping off, confirm that your items are properly sorted and meet the facility's requirements. Consider making recycling a regular routine by designating a storage spot at home for clean polystyrene until you have a full load.",
    tips: [
      "Batch multiple trips worth of material into one visit",
      "Confirm the facility's accepted materials before arriving",
      "Keep a dedicated bin at home for clean polystyrene",
      "Some stores offer collection bins you can use anytime",
      "Encourage neighbors to combine loads for efficiency",
    ],
    icon: "Truck",
  },
];

// ─── Policy type color helpers ───
function getPolicyColor(type: string) {
  switch (type) {
    case "ban":
      return "border-red-500/30 bg-red-500/5";
    case "restriction":
      return "border-amber-500/30 bg-amber-500/5";
    case "no-ban":
      return "border-emerald-500/30 bg-emerald-500/5";
    default:
      return "";
  }
}

function getPolicyBadgeColor(type: string) {
  switch (type) {
    case "ban":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    case "restriction":
      return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    case "no-ban":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    default:
      return "";
  }
}

function getPolicyLabel(type: string) {
  switch (type) {
    case "ban":
      return "Banned";
    case "restriction":
      return "Restricted";
    case "no-ban":
      return "No Ban";
    default:
      return type;
  }
}

// ─── Recycling Method Card ───
function MethodCard({
  method,
}: {
  method: (typeof recyclingMethods)[number];
}) {
  return (
    <GlassCard className="p-6 md:p-8 h-full">
      <div className="flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <IconMap name={method.iconName} className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold">{method.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{method.description}</p>
          </div>
        </div>

        {/* Steps */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Process Steps
          </h4>
          <ol className="space-y-2">
            {method.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Pros & Cons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-semibold text-emerald-400 mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" />
              Advantages
            </h4>
            <ul className="space-y-1.5">
              {method.pros.map((pro) => (
                <li key={pro} className="text-xs text-muted-foreground flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-red-400 mb-2 flex items-center gap-1.5">
              <XCircle className="h-4 w-4" />
              Challenges
            </h4>
            <ul className="space-y-1.5">
              {method.cons.map((con) => (
                <li key={con} className="text-xs text-muted-foreground flex items-start gap-2">
                  <XCircle className="h-3.5 w-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

// ─── Interactive US Map ───
function InteractiveUSMap() {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const getStateColor = (stateId: string) => {
    const policy = policyData.find((p) => p.abbreviation === stateId);
    if (!policy) return "fill-muted-foreground/20";
    switch (policy.type) {
      case "ban":
        return "fill-red-500/60 hover:fill-red-500/80";
      case "restriction":
        return "fill-amber-500/60 hover:fill-amber-500/80";
      case "no-ban":
        return "fill-emerald-500/60 hover:fill-emerald-500/80";
      default:
        return "fill-muted-foreground/20";
    }
  };

  const selectedPolicy = selectedState
    ? policyData.find((p) => p.abbreviation === selectedState)
    : null;
  const hoveredPolicy = hoveredState
    ? policyData.find((p) => p.abbreviation === hoveredState)
    : null;

  const displayPolicy = selectedPolicy || hoveredPolicy;

  return (
    <div className="max-w-5xl mx-auto">
      <GlassCard className="p-6 md:p-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Map */}
          <div className="flex-1 min-w-0">
            <svg
              viewBox="0 0 960 600"
              className="w-full h-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              {stateMapPaths.map((state) => (
                <path
                  key={state.id}
                  d={state.d}
                  className={cn(
                    "stroke-border/60 stroke-[1] cursor-pointer transition-all duration-200",
                    selectedState === state.id
                      ? "stroke-primary stroke-[2.5] brightness-125"
                      : getStateColor(state.id)
                  )}
                  onMouseEnter={() => setHoveredState(state.id)}
                  onMouseLeave={() => setHoveredState(null)}
                  onClick={() =>
                    setSelectedState(selectedState === state.id ? null : state.id)
                  }
                >
                  <title>{state.name}</title>
                </path>
              ))}
            </svg>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <span className="text-muted-foreground">Banned</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                <span className="text-muted-foreground">Restricted</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                <span className="text-muted-foreground">No Ban</span>
              </div>
            </div>
          </div>

          {/* State Info Panel */}
          <div className="lg:w-72 flex-shrink-0">
            <AnimatePresence mode="wait">
              {displayPolicy ? (
                <motion.div
                  key={displayPolicy.abbreviation}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-black text-primary">
                      {displayPolicy.abbreviation}
                    </span>
                    <div>
                      <h3 className="font-bold text-lg leading-tight">
                        {displayPolicy.state}
                      </h3>
                      <Badge
                        className={cn(
                          "text-[10px] border mt-1",
                          getPolicyBadgeColor(displayPolicy.type)
                        )}
                      >
                        {getPolicyLabel(displayPolicy.type)}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {displayPolicy.description}
                  </p>
                  {displayPolicy.year > 0 && (
                    <p className="text-xs text-muted-foreground/60">
                      Policy since {displayPolicy.year}
                    </p>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center py-8"
                >
                  <IconMap name="Map" className="h-10 w-10 text-muted-foreground/30 mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Hover over or click a state to see its polystyrene policy
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

// ─── Main Page ───
export default function HowToRecyclePage() {
  const [currentWizardStep, setCurrentWizardStep] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter policies
  const filteredPolicies = useMemo(() => {
    if (!searchQuery.trim()) return policyData;
    const q = searchQuery.toLowerCase();
    return policyData.filter(
      (p) =>
        p.state.toLowerCase().includes(q) ||
        p.abbreviation.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Filter methods by category
  const mechanicalMethods = recyclingMethods.filter((m) => m.category === "mechanical");
  const chemicalMethods = recyclingMethods.filter((m) => m.category === "chemical");

  const goNextStep = () => {
    if (currentWizardStep < wizardSteps.length - 1) {
      setCurrentWizardStep((prev) => prev + 1);
    }
  };

  const goPrevStep = () => {
    if (currentWizardStep > 0) {
      setCurrentWizardStep((prev) => prev - 1);
    }
  };

  const progressPercent = ((currentWizardStep + 1) / wizardSteps.length) * 100;

  return (
    <main className="min-h-screen">
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero-recycling.jpg"
          alt="Polystyrene recycling process"
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
              How to <span className="text-primary">Recycle</span> Polystyrene
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              From mechanical compaction to cutting-edge chemical processes, discover every method
              available for recycling polystyrene and find your nearest drop-off location.
            </p>
          </motion.div>
        </SectionReveal>
      </section>

      {/* ═══════════ RECYCLING METHODS ═══════════ */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <SectionReveal>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Recycling Methods</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Polystyrene can be recycled through both mechanical and chemical processes. Each
                method has distinct advantages depending on the material condition and desired
                output.
              </p>
            </div>
          </SectionReveal>

          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="mechanical" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="h-12">
                  <TabsTrigger value="mechanical" className="px-6 py-2.5 text-sm font-medium">
                    Mechanical Recycling
                  </TabsTrigger>
                  <TabsTrigger value="chemical" className="px-6 py-2.5 text-sm font-medium">
                    Chemical Recycling
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="mechanical">
                <div className="grid grid-cols-1 gap-8">
                  {mechanicalMethods.map((method, i) => (
                    <SectionReveal key={method.id} delay={i * 0.1}>
                      <MethodCard method={method} />
                    </SectionReveal>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="chemical">
                <div className="grid grid-cols-1 gap-8">
                  {chemicalMethods.map((method, i) => (
                    <SectionReveal key={method.id} delay={i * 0.1}>
                      <MethodCard method={method} />
                    </SectionReveal>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* ═══════════ STEP-BY-STEP WIZARD ═══════════ */}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Your Step-by-Step Recycling Guide
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Follow these five steps to properly recycle your polystyrene items, from
                identification to drop-off.
              </p>
            </div>
          </SectionReveal>

          <div className="max-w-3xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between mb-3">
                {wizardSteps.map((step, i) => (
                  <button
                    key={step.id}
                    onClick={() => setCurrentWizardStep(i)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 transition-colors duration-300",
                      i <= currentWizardStep ? "text-primary" : "text-muted-foreground/50"
                    )}
                  >
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300",
                        i === currentWizardStep
                          ? "bg-primary text-primary-foreground border-primary scale-110"
                          : i < currentWizardStep
                          ? "bg-primary/20 border-primary/50 text-primary"
                          : "bg-muted border-border text-muted-foreground"
                      )}
                    >
                      {i < currentWizardStep ? (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        step.id
                      )}
                    </div>
                    <span className="text-[10px] sm:text-xs font-medium hidden sm:block">
                      {step.shortTitle}
                    </span>
                  </button>
                ))}
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: "20%" }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </div>
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentWizardStep}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <GlassCard className="p-8 md:p-10">
                  <div className="flex flex-col gap-5">
                    {/* Step Header */}
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <IconMap
                          name={wizardSteps[currentWizardStep].icon}
                          className="h-7 w-7 text-primary"
                        />
                      </div>
                      <div>
                        <div className="text-sm text-primary font-medium mb-1">
                          Step {wizardSteps[currentWizardStep].id} of {wizardSteps.length}
                        </div>
                        <h3 className="text-2xl font-bold">
                          {wizardSteps[currentWizardStep].title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {wizardSteps[currentWizardStep].description}
                        </p>
                      </div>
                    </div>

                    {/* Main Content */}
                    <p className="text-muted-foreground leading-relaxed">
                      {wizardSteps[currentWizardStep].content}
                    </p>

                    {/* Tips */}
                    <div className="bg-primary/5 rounded-lg p-5 border border-primary/10">
                      <h4 className="text-sm font-semibold text-primary mb-3">Quick Tips</h4>
                      <ul className="space-y-2">
                        {wizardSteps[currentWizardStep].tips.map((tip, i) => (
                          <li
                            key={i}
                            className="text-sm text-muted-foreground flex items-start gap-2.5"
                          >
                            <ArrowRight className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between items-center pt-2">
                      <Button
                        onClick={goPrevStep}
                        variant="outline"
                        disabled={currentWizardStep === 0}
                        className="gap-2"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Back
                      </Button>
                      <span className="text-sm text-muted-foreground">
                        {currentWizardStep + 1} / {wizardSteps.length}
                      </span>
                      <Button
                        onClick={goNextStep}
                        disabled={currentWizardStep === wizardSteps.length - 1}
                        className="gap-2"
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ═══════════ SEE RECYCLING IN ACTION ═══════════ */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <SectionReveal>
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-xs font-semibold uppercase tracking-wider">
                Real-World Example
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                See Recycling in Action
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Watch how Chick-fil-A recycles their polystyrene cups through an innovative
                closed-loop recycling process.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <div className="max-w-4xl mx-auto">
              <GlassCard className="p-0 overflow-hidden">
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/JxO_601oru8?rel=0&modestbranding=1"
                    title="Chick-fil-A Polystyrene Cup Recycling Process"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </GlassCard>
              <p className="text-center text-sm text-muted-foreground mt-4">
                Chick-fil-A Polystyrene Cup Recycling Process
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ═══════════ FIND RECYCLING LOCATIONS ═══════════ */}
      <section className="py-20 md:py-28 relative">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 70% 40% at 50% 50%, hsl(var(--primary) / 0.05), transparent)",
          }}
        />
        <div className="container mx-auto px-4">
          <SectionReveal>
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-xs font-semibold uppercase tracking-wider">
                680+ Locations
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Find Recycling Locations Near You
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                The EPS Industry Alliance maintains 680+ foam-specific drop-off and recycling
                locations across North America. Click a state to see its policy, or use the
                interactive map below.
              </p>
            </div>
          </SectionReveal>

          {/* Interactive SVG Map */}
          <SectionReveal delay={0.1}>
            <InteractiveUSMap />
          </SectionReveal>

          {/* BatchGeo embed */}
          <SectionReveal delay={0.2}>
            <div className="max-w-5xl mx-auto mt-12">
              <GlassCard className="p-0 overflow-hidden">
                <div className="relative w-full" style={{ paddingBottom: "60%" }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://batchgeo.com/map/EPSRecyclingMap"
                    title="EPS Recycling Drop-off Locations"
                    style={{ border: 0 }}
                  />
                </div>
              </GlassCard>
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <a
                  href="https://www.epspackaging.org/recycling-locator"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="gap-2">
                    <Search className="h-4 w-4" />
                    EPS Industry Alliance Locator
                  </Button>
                </a>
                <a
                  href="https://search.earth911.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="gap-2">
                    <Search className="h-4 w-4" />
                    Earth911 (100,000+ Locations)
                  </Button>
                </a>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ═══════════ STATE POLICIES ═══════════ */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <SectionReveal>
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Polystyrene Policies by State
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Explore the current regulatory landscape across all 50 states. Filter by state name
                or policy type.
              </p>
            </div>
          </SectionReveal>

          {/* Search */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by state name, abbreviation, or policy type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-muted-foreground">Banned ({policyData.filter((p) => p.type === "ban").length})</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-muted-foreground">
                Restricted ({policyData.filter((p) => p.type === "restriction").length})
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-muted-foreground">
                No Ban ({policyData.filter((p) => p.type === "no-ban").length})
              </span>
            </div>
          </div>

          {/* Results count */}
          {searchQuery && (
            <p className="text-center text-sm text-muted-foreground mb-6">
              Showing {filteredPolicies.length} of {policyData.length} states
            </p>
          )}

          {/* Policy Grid */}
          <SectionReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto">
              {filteredPolicies.map((policy) => (
                <motion.div
                  key={policy.abbreviation}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className={cn(
                      "rounded-xl border p-4 h-full transition-colors duration-200 hover:border-opacity-60",
                      getPolicyColor(policy.type)
                    )}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold text-sm">{policy.state}</h3>
                        <span className="text-xs text-muted-foreground">{policy.abbreviation}</span>
                      </div>
                      <Badge className={cn("text-[10px] border", getPolicyBadgeColor(policy.type))}>
                        {getPolicyLabel(policy.type)}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      {policy.description}
                    </p>
                    {policy.year > 0 && (
                      <p className="text-[10px] text-muted-foreground/60 mt-2">
                        Since {policy.year}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionReveal>

          {filteredPolicies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No states found matching &quot;{searchQuery}&quot;. Try a different search term.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
