"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { GlassCard } from "@/components/shared/GlassCard";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { ConfettiEffect } from "@/components/shared/ConfettiEffect";
import { useGameification } from "@/hooks/useGameification";
import { XP_VALUES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Recycle,
  Trash2,
  Trophy,
  Flame,
  Zap,
  RotateCcw,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Info,
  Gamepad2,
  Star,
  Share2,
  Copy,
  Check,
  Twitter,
  Instagram,
  Eye,
  Search,
} from "lucide-react";

// ─── Sorting Game Item Data ──────────────────────────────────────────────────

interface GameItem {
  id: string;
  name: string;
  recyclable: boolean;
  hint: string;
}

const GAME_ITEMS: GameItem[] = [
  {
    id: "1",
    name: "EPS Foam Cup",
    recyclable: true,
    hint: "Clean EPS is recyclable at many drop-off locations",
  },
  {
    id: "2",
    name: "Food-Stained Container",
    recyclable: false,
    hint: "Food contamination prevents recycling",
  },
  {
    id: "3",
    name: "Packing Peanuts",
    recyclable: true,
    hint: "EPS packing can be recycled or reused at shipping stores",
  },
  {
    id: "4",
    name: "Polystyrene Meat Tray",
    recyclable: true,
    hint: "Clean meat trays are recyclable  -  rinse them first",
  },
  {
    id: "5",
    name: "Styrofoam with Tape",
    recyclable: false,
    hint: "Tape contaminates the recycling process",
  },
  {
    id: "6",
    name: "EPS Insulation Board",
    recyclable: true,
    hint: "XPS/EPS boards are highly recyclable construction waste",
  },
  {
    id: "7",
    name: "Colored Polystyrene",
    recyclable: true,
    hint: "Color doesn't affect recyclability of polystyrene",
  },
  {
    id: "8",
    name: "Polystyrene with Paint",
    recyclable: false,
    hint: "Paint contaminates the material beyond recycling",
  },
  {
    id: "9",
    name: "CD Jewel Case",
    recyclable: true,
    hint: "GPPS cases can be recycled with other polystyrene",
  },
  {
    id: "10",
    name: "Wet / Moldy Foam",
    recyclable: false,
    hint: "Moisture and mold prevent proper recycling",
  },
  {
    id: "11",
    name: "Clean Take-Out Container",
    recyclable: true,
    hint: "If cleaned thoroughly, it's recyclable",
  },
  {
    id: "12",
    name: "Foam with Glue Residue",
    recyclable: false,
    hint: "Adhesives contaminate the recycling stream",
  },
];

// ─── Spot the Polystyrene Game Data ─────────────────────────────────────────

interface SpotItem {
  id: string;
  name: string;
  description: string;
  isPolystyrene: boolean;
  explanation: string;
}

const SPOT_ITEMS: SpotItem[] = [
  {
    id: "spot-1",
    name: "Coffee Cup (Foam)",
    description: "A white, lightweight disposable coffee cup from a gas station.",
    isPolystyrene: true,
    explanation: "Foam coffee cups are made from Expanded Polystyrene (EPS), identifiable by the #6 resin code.",
  },
  {
    id: "spot-2",
    name: "Egg Carton (Foam)",
    description: "A molded foam carton that holds a dozen eggs.",
    isPolystyrene: true,
    explanation: "Many egg cartons are made from molded EPS. Look for the #6 code on the bottom.",
  },
  {
    id: "spot-3",
    name: "Packing Peanuts",
    description: "Small, S-shaped pieces used to cushion shipped items.",
    isPolystyrene: true,
    explanation: "Traditional packing peanuts are made from EPS. They are lightweight and static-prone.",
  },
  {
    id: "spot-4",
    name: "Yogurt Container",
    description: "A small, rigid plastic cup that holds flavored yogurt.",
    isPolystyrene: false,
    explanation: "Most yogurt containers are made from polypropylene (#5), not polystyrene.",
  },
  {
    id: "spot-5",
    name: "CD Case",
    description: "A clear, rigid plastic case used to store a compact disc.",
    isPolystyrene: true,
    explanation: "CD jewel cases are made from General Purpose Polystyrene (GPPS), a crystal-clear rigid form.",
  },
  {
    id: "spot-6",
    name: "Disposable Razor",
    description: "A lightweight plastic razor with a handle and blade cartridge.",
    isPolystyrene: false,
    explanation: "Disposable razors are typically made from polypropylene or ABS plastic, not polystyrene.",
  },
  {
    id: "spot-7",
    name: "Takeout Container (Foam)",
    description: "A clamshell-style foam container from a restaurant.",
    isPolystyrene: true,
    explanation: "Foam takeout containers are classic EPS products, widely used in food service.",
  },
  {
    id: "spot-8",
    name: "Insulation Board",
    description: "A rigid, blue or pink board used in building walls and foundations.",
    isPolystyrene: true,
    explanation: "Rigid insulation boards are made from Extruded Polystyrene (XPS), a denser form of polystyrene.",
  },
  {
    id: "spot-9",
    name: "Pool Noodle",
    description: "A long, colorful foam tube used as a swimming flotation device.",
    isPolystyrene: false,
    explanation: "Pool noodles are made from polyethylene foam, not polystyrene.",
  },
  {
    id: "spot-10",
    name: "Bike Helmet Liner",
    description: "The white foam layer inside a bicycle helmet that absorbs impact.",
    isPolystyrene: true,
    explanation: "Bike helmet liners are made from EPS foam. Its energy-absorbing properties make it ideal for safety gear.",
  },
  {
    id: "spot-11",
    name: "Meat Tray",
    description: "A flat foam tray used to package fresh meat at the supermarket.",
    isPolystyrene: true,
    explanation: "Supermarket meat trays are made from EPS. They can be recycled once cleaned thoroughly.",
  },
  {
    id: "spot-12",
    name: "Plant Pot",
    description: "A small, flexible green plastic pot from a garden center.",
    isPolystyrene: false,
    explanation: "Most plant pots are made from polypropylene (#5) or polyethylene, not polystyrene.",
  },
  {
    id: "spot-13",
    name: "Ice Chest (Foam)",
    description: "A lightweight foam cooler used to keep drinks cold at a picnic.",
    isPolystyrene: true,
    explanation: "Foam coolers and ice chests are made from molded EPS, taking advantage of its excellent insulation.",
  },
  {
    id: "spot-14",
    name: "Phone Case",
    description: "A rigid, snap-on protective case for a smartphone.",
    isPolystyrene: false,
    explanation: "Phone cases are usually made from TPU, polycarbonate, or silicone, not polystyrene.",
  },
  {
    id: "spot-15",
    name: "Building Insulation (Foam)",
    description: "Sheets of white beaded foam installed in walls for thermal insulation.",
    isPolystyrene: true,
    explanation: "Building insulation sheets are EPS, composed of 90-95% air, making them superb thermal insulators.",
  },
];

// ─── Shared Helpers ──────────────────────────────────────────────────────────

type GamePhase = "setup" | "playing" | "results";
type ActiveGame = "sorting" | "spot";

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getComboMultiplier(streak: number): number {
  if (streak >= 7) return 4;
  if (streak >= 5) return 3;
  if (streak >= 3) return 2;
  return 1;
}

function getComboLabel(multiplier: number): string {
  if (multiplier >= 4) return "INSANE";
  if (multiplier >= 3) return "ON FIRE";
  if (multiplier >= 2) return "NICE";
  return "";
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function GamesPage() {
  const { progress, isLoaded, recordGameScore, addXP } = useGameification();

  const [activeGame, setActiveGame] = useState<ActiveGame>("sorting");

  // Sorting game state
  const [phase, setPhase] = useState<GamePhase>("setup");
  const [items, setItems] = useState<GameItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [bestCombo, setBestCombo] = useState(1);
  const [answered, setAnswered] = useState<boolean | null>(null);
  const [exitDirection, setExitDirection] = useState<"left" | "right">("right");
  const [showConfetti, setShowConfetti] = useState(false);
  const [copied, setCopied] = useState(false);

  // Spot the Polystyrene state
  const [spotPhase, setSpotPhase] = useState<GamePhase>("setup");
  const [spotItems, setSpotItems] = useState<SpotItem[]>([]);
  const [spotIndex, setSpotIndex] = useState(0);
  const [spotScore, setSpotScore] = useState(0);
  const [spotAnswered, setSpotAnswered] = useState<boolean | null>(null);
  const [spotShowConfetti, setSpotShowConfetti] = useState(false);
  const [spotCopied, setSpotCopied] = useState(false);

  const currentItem = items[currentIndex] ?? null;
  const combo = getComboMultiplier(streak);
  const remaining = items.length - currentIndex;

  const currentSpotItem = spotItems[spotIndex] ?? null;

  // Previous best scores
  const bestScores = useMemo(() => {
    if (!isLoaded) return [];
    return progress.gameScores
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [progress.gameScores, isLoaded]);

  // ─── Sorting Game Logic ────────────────────────────────────────────────────

  const startGame = useCallback(() => {
    setItems(shuffleArray(GAME_ITEMS));
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setBestCombo(1);
    setAnswered(null);
    setShowConfetti(false);
    setCopied(false);
    setPhase("playing");
  }, []);

  const handleChoice = useCallback(
    (choosedRecyclable: boolean) => {
      if (answered !== null || !currentItem) return;

      const correct = choosedRecyclable === currentItem.recyclable;
      setAnswered(correct);
      setExitDirection(choosedRecyclable ? "right" : "left");

      if (correct) {
        const points = 1 * combo;
        setScore((s) => s + points);
        const newStreak = streak + 1;
        setStreak(newStreak);
        if (newStreak > bestStreak) setBestStreak(newStreak);
        const newCombo = getComboMultiplier(newStreak);
        if (newCombo > bestCombo) setBestCombo(newCombo);

        toast.success(
          `Correct! +${points} point${points > 1 ? "s" : ""}${combo > 1 ? ` (${combo}x combo)` : ""}`,
          { icon: <CheckCircle2 className="h-4 w-4 text-green-400" /> }
        );
      } else {
        setStreak(0);
        toast.error("Wrong!", {
          description: currentItem.hint,
          icon: <Info className="h-4 w-4" />,
        });
      }

      setTimeout(() => {
        if (currentIndex + 1 >= items.length) {
          const finalScore = correct
            ? score + 1 * combo
            : score;
          const finalBestStreak = correct
            ? Math.max(bestStreak, streak + 1)
            : bestStreak;
          const finalBestCombo = correct
            ? Math.max(bestCombo, getComboMultiplier(streak + 1))
            : bestCombo;

          const isPerfect = finalScore >= items.length;
          if (isPerfect) setShowConfetti(true);

          recordGameScore({
            date: new Date().toISOString(),
            score: finalScore,
            total: items.length,
            bestStreak: finalBestStreak,
            bestCombo: finalBestCombo,
          });

          setPhase("results");
        } else {
          setCurrentIndex((i) => i + 1);
          setAnswered(null);
        }
      }, 1200);
    },
    [
      answered,
      currentItem,
      combo,
      streak,
      bestStreak,
      bestCombo,
      currentIndex,
      items.length,
      score,
      recordGameScore,
    ]
  );

  // ─── Spot the Polystyrene Logic ────────────────────────────────────────────

  const startSpotGame = useCallback(() => {
    setSpotItems(shuffleArray(SPOT_ITEMS));
    setSpotIndex(0);
    setSpotScore(0);
    setSpotAnswered(null);
    setSpotShowConfetti(false);
    setSpotCopied(false);
    setSpotPhase("playing");
  }, []);

  const handleSpotChoice = useCallback(
    (chosenIsPolystyrene: boolean) => {
      if (spotAnswered !== null || !currentSpotItem) return;

      const correct = chosenIsPolystyrene === currentSpotItem.isPolystyrene;
      setSpotAnswered(correct);

      if (correct) {
        setSpotScore((s) => s + 1);
        toast.success("Correct! +5 XP", {
          icon: <CheckCircle2 className="h-4 w-4 text-green-400" />,
        });
      } else {
        toast.error("Not quite!", {
          description: currentSpotItem.explanation,
          icon: <Info className="h-4 w-4" />,
        });
      }

      setTimeout(() => {
        if (spotIndex + 1 >= spotItems.length) {
          const finalSpotScore = correct ? spotScore + 1 : spotScore;
          const isPerfect = finalSpotScore === spotItems.length;
          if (isPerfect) setSpotShowConfetti(true);

          // Award XP
          const xpEarned = finalSpotScore * 5;
          addXP(xpEarned);

          setSpotPhase("results");
        } else {
          setSpotIndex((i) => i + 1);
          setSpotAnswered(null);
        }
      }, 1500);
    },
    [spotAnswered, currentSpotItem, spotIndex, spotItems.length, spotScore, addXP]
  );

  // Sorting share text
  const sortingShareText = `I sorted ${score}/${GAME_ITEMS.length} items correctly on @PolystyreneGuy's recycling game! #PolyRecycle #Recycling`;

  // Spot share text
  const spotFinalScore = spotPhase === "results" ? (spotAnswered === null ? spotScore : spotScore) : spotScore;
  const spotShareText = `I identified ${spotFinalScore}/${SPOT_ITEMS.length} polystyrene items correctly on @PolystyreneGuy's Spot the Polystyrene game! #PolyRecycle #Recycling`;

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--game))/0.15] via-transparent to-primary/10" />
        <div className="relative max-w-4xl mx-auto text-center">
          <SectionReveal>
            <Badge className="mb-4 bg-[hsl(var(--game))/0.2] text-[hsl(var(--game))] border-[hsl(var(--game))/0.3]">
              <Gamepad2 className="h-3 w-3 mr-1" />
              Recycling Games
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Polystyrene{" "}
              <span className="text-[hsl(var(--game))]">Game Center</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Test your recycling knowledge with interactive games. Sort items,
              spot polystyrene, and earn XP along the way!
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Game Tabs */}
      <div className="max-w-2xl mx-auto px-4 mb-8">
        <div className="flex gap-2 p-1 rounded-xl bg-muted/50 border border-border/50">
          <button
            onClick={() => {
              setActiveGame("sorting");
              setPhase("setup");
            }}
            className={cn(
              "flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2",
              activeGame === "sorting"
                ? "bg-[hsl(var(--game))] text-white shadow-lg"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <Recycle className="h-4 w-4" />
            Sorting Challenge
          </button>
          <button
            onClick={() => {
              setActiveGame("spot");
              setSpotPhase("setup");
            }}
            className={cn(
              "flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2",
              activeGame === "spot"
                ? "bg-[hsl(var(--game))] text-white shadow-lg"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <Search className="h-4 w-4" />
            Spot the Polystyrene
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-20">
        {/* ═══════════ SORTING GAME ═══════════ */}
        {activeGame === "sorting" && (
          <AnimatePresence mode="wait">
            {/* ─── SETUP ─────────────────────────────────────────────── */}
            {phase === "setup" && (
              <motion.div
                key="sorting-setup"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-center">
                    How to Play
                  </h2>
                  <div className="space-y-3 mb-8">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Recycle className="h-4 w-4 text-green-400" />
                      </div>
                      <div>
                        <div className="font-medium">Recyclable Items</div>
                        <div className="text-sm text-muted-foreground">
                          Tap &quot;Recyclable&quot; for clean polystyrene that can
                          be recycled
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </div>
                      <div>
                        <div className="font-medium">Not Recyclable</div>
                        <div className="text-sm text-muted-foreground">
                          Tap &quot;Not Recyclable&quot; for contaminated or
                          damaged items
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                        <Flame className="h-4 w-4 text-yellow-400" />
                      </div>
                      <div>
                        <div className="font-medium">Build Combos</div>
                        <div className="text-sm text-muted-foreground">
                          Consecutive correct answers increase your combo
                          multiplier up to 4x!
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      size="lg"
                      onClick={startGame}
                      className="bg-[hsl(var(--game))] hover:bg-[hsl(var(--game))/0.9] text-white px-8"
                    >
                      Start Game
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </GlassCard>

                {/* Previous Scores */}
                {bestScores.length > 0 && (
                  <GlassCard>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-yellow-400" />
                      Your Best Scores
                    </h3>
                    <div className="space-y-3">
                      {bestScores.map((s, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-bold text-muted-foreground">
                              #{i + 1}
                            </span>
                            <div>
                              <div className="font-medium">
                                {s.score} points ({s.score}/{s.total} items)
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Best streak: {s.bestStreak} | Best combo:{" "}
                                {s.bestCombo}x
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(s.date).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                )}
              </motion.div>
            )}

            {/* ─── PLAYING ───────────────────────────────────────────── */}
            {phase === "playing" && currentItem && (
              <motion.div
                key="sorting-playing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Stats bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Item {currentIndex + 1} of {items.length}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground">
                      {remaining} remaining
                    </span>
                  </div>
                  <Progress
                    value={((currentIndex + 1) / items.length) * 100}
                    className="h-2 mb-4"
                  />

                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 rounded-xl bg-muted/50">
                      <div className="text-2xl font-bold text-[hsl(var(--game))]">
                        {score}
                      </div>
                      <div className="text-xs text-muted-foreground">Score</div>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-muted/50">
                      <div className="text-2xl font-bold flex items-center justify-center gap-1">
                        <Flame
                          className={cn(
                            "h-5 w-5",
                            streak >= 3
                              ? "text-orange-400"
                              : "text-muted-foreground"
                          )}
                        />
                        {streak}
                      </div>
                      <div className="text-xs text-muted-foreground">Streak</div>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-muted/50">
                      <div
                        className={cn(
                          "text-2xl font-bold",
                          combo >= 3
                            ? "text-orange-400"
                            : combo >= 2
                              ? "text-yellow-400"
                              : "text-foreground"
                        )}
                      >
                        {combo}x
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {getComboLabel(combo) || "Combo"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Item Card */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentItem.id}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{
                      opacity: 0,
                      x: exitDirection === "right" ? 200 : -200,
                      rotate: exitDirection === "right" ? 10 : -10,
                    }}
                    transition={{ duration: 0.35 }}
                  >
                    <GlassCard
                      className={cn(
                        "mb-6 text-center transition-all duration-300",
                        answered === true && "ring-2 ring-green-500",
                        answered === false && "ring-2 ring-red-500"
                      )}
                    >
                      <div className="py-8">
                        <div className="w-20 h-20 rounded-2xl bg-muted mx-auto mb-6 flex items-center justify-center">
                          <Recycle
                            className={cn(
                              "h-10 w-10 transition-colors",
                              answered === true
                                ? "text-green-400"
                                : answered === false
                                  ? "text-red-400"
                                  : "text-muted-foreground"
                            )}
                          />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">
                          {currentItem.name}
                        </h2>
                        <p className="text-muted-foreground text-sm">
                          Is this item recyclable?
                        </p>

                        {/* Feedback */}
                        {answered !== null && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                              "mt-4 p-3 rounded-lg text-sm",
                              answered
                                ? "bg-green-500/20 text-green-300"
                                : "bg-red-500/20 text-red-300"
                            )}
                          >
                            {answered ? (
                              <div className="flex items-center justify-center gap-2">
                                <CheckCircle2 className="h-4 w-4" />
                                Correct! {currentItem.hint}
                              </div>
                            ) : (
                              <div className="flex items-center justify-center gap-2">
                                <XCircle className="h-4 w-4" />
                                {currentItem.hint}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </div>
                    </GlassCard>
                  </motion.div>
                </AnimatePresence>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => handleChoice(false)}
                      disabled={answered !== null}
                      className={cn(
                        "w-full h-16 text-lg border-2 border-red-500/50 hover:bg-red-500/10 hover:border-red-500",
                        answered !== null && "opacity-50 cursor-default"
                      )}
                    >
                      <Trash2 className="mr-2 h-5 w-5 text-red-400" />
                      Not Recyclable
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => handleChoice(true)}
                      disabled={answered !== null}
                      className={cn(
                        "w-full h-16 text-lg border-2 border-green-500/50 hover:bg-green-500/10 hover:border-green-500",
                        answered !== null && "opacity-50 cursor-default"
                      )}
                    >
                      <Recycle className="mr-2 h-5 w-5 text-green-400" />
                      Recyclable
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* ─── RESULTS ───────────────────────────────────────────── */}
            {phase === "results" && (
              <motion.div
                key="sorting-results"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <ConfettiEffect trigger={showConfetti} />

                <GlassCard className="text-center">
                  <div className="mb-6">
                    <Trophy className="h-16 w-16 mx-auto mb-4 text-yellow-400" />
                    <h2 className="text-3xl font-bold mb-2">Game Complete!</h2>
                    <p className="text-muted-foreground">
                      Polystyrene Sorting Challenge
                    </p>
                  </div>

                  {/* Score display */}
                  <div className="mb-8">
                    <AnimatedCounter
                      value={score}
                      suffix=" pts"
                      className="text-6xl text-[hsl(var(--game))]"
                    />
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="p-4 rounded-xl bg-muted/50">
                      <Star className="h-6 w-6 mx-auto mb-2 text-yellow-400" />
                      <div className="text-2xl font-bold">{score}</div>
                      <div className="text-xs text-muted-foreground">
                        Total Score
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50">
                      <Flame className="h-6 w-6 mx-auto mb-2 text-orange-400" />
                      <div className="text-2xl font-bold">{bestStreak}</div>
                      <div className="text-xs text-muted-foreground">
                        Best Streak
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50">
                      <Zap className="h-6 w-6 mx-auto mb-2 text-purple-400" />
                      <div className="text-2xl font-bold">{bestCombo}x</div>
                      <div className="text-xs text-muted-foreground">
                        Best Combo
                      </div>
                    </div>
                  </div>

                  {/* XP earned */}
                  <div className="mb-6 p-4 rounded-xl bg-[hsl(var(--game))/0.1] border border-[hsl(var(--game))/0.3]">
                    <div className="flex items-center justify-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-400" />
                      <span className="font-semibold">
                        +
                        {score * XP_VALUES.GAME_CORRECT +
                          (bestStreak >= 5 ? XP_VALUES.GAME_STREAK_BONUS : 0) +
                          (bestCombo >= 3 ? XP_VALUES.GAME_COMBO_BONUS : 0)}{" "}
                        XP earned!
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-2 mt-2 text-xs text-muted-foreground">
                      <span>{score} correct x {XP_VALUES.GAME_CORRECT} XP</span>
                      {bestStreak >= 5 && (
                        <span>+ {XP_VALUES.GAME_STREAK_BONUS} streak bonus</span>
                      )}
                      {bestCombo >= 3 && (
                        <span>+ {XP_VALUES.GAME_COMBO_BONUS} combo bonus</span>
                      )}
                    </div>
                  </div>

                  {/* Share Buttons */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center justify-center gap-2">
                      <Share2 className="h-4 w-4" />
                      Share Your Results
                    </h3>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(sortingShareText)}`;
                          window.open(url, "_blank", "noopener,noreferrer");
                        }}
                        className="w-full sm:w-auto gap-2"
                      >
                        <Twitter className="h-4 w-4" />
                        Share on X
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(sortingShareText).then(() => {
                            setCopied(true);
                            toast.success("Copied to clipboard!");
                            setTimeout(() => setCopied(false), 2000);
                          }).catch(() => {
                            toast.error("Could not copy to clipboard");
                          });
                        }}
                        className="w-full sm:w-auto gap-2"
                      >
                        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        {copied ? "Copied!" : "Copy to Clipboard"}
                      </Button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-center">
                    <Button
                      size="lg"
                      onClick={() => {
                        setShowConfetti(false);
                        startGame();
                      }}
                      className="bg-[hsl(var(--game))] hover:bg-[hsl(var(--game))/0.9] text-white px-8"
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Play Again
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* ═══════════ SPOT THE POLYSTYRENE GAME ═══════════ */}
        {activeGame === "spot" && (
          <AnimatePresence mode="wait">
            {/* ─── SETUP ─────────────────────────────────────────────── */}
            {spotPhase === "setup" && (
              <motion.div
                key="spot-setup"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-center">
                    Spot the Polystyrene
                  </h2>
                  <p className="text-muted-foreground text-center mb-6">
                    Can you identify which everyday items contain polystyrene? You will see
                    15 common items. Decide if each one is made from polystyrene or not.
                  </p>
                  <div className="space-y-3 mb-8">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                      </div>
                      <div>
                        <div className="font-medium">Contains Polystyrene</div>
                        <div className="text-sm text-muted-foreground">
                          Tap &quot;Polystyrene&quot; if the item is made from EPS, XPS, or GPPS
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                        <XCircle className="h-4 w-4 text-red-400" />
                      </div>
                      <div>
                        <div className="font-medium">Not Polystyrene</div>
                        <div className="text-sm text-muted-foreground">
                          Tap &quot;Not Polystyrene&quot; if the item is made from a different material
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <Zap className="h-4 w-4 text-purple-400" />
                      </div>
                      <div>
                        <div className="font-medium">Earn XP</div>
                        <div className="text-sm text-muted-foreground">
                          Each correct answer earns you 5 XP. Learn from the explanations!
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      size="lg"
                      onClick={startSpotGame}
                      className="bg-[hsl(var(--game))] hover:bg-[hsl(var(--game))/0.9] text-white px-8"
                    >
                      Start Game
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* ─── PLAYING ───────────────────────────────────────────── */}
            {spotPhase === "playing" && currentSpotItem && (
              <motion.div
                key="spot-playing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Stats bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Item {spotIndex + 1} of {spotItems.length}
                    </span>
                    <span className="text-sm font-medium flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      {spotScore}/{spotItems.length}
                    </span>
                  </div>
                  <Progress
                    value={((spotIndex + 1) / spotItems.length) * 100}
                    className="h-2"
                  />
                </div>

                {/* Item Card */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSpotItem.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <GlassCard
                      className={cn(
                        "mb-6 text-center transition-all duration-300",
                        spotAnswered === true && "ring-2 ring-green-500",
                        spotAnswered === false && "ring-2 ring-red-500"
                      )}
                    >
                      <div className="py-8">
                        <div className="w-20 h-20 rounded-2xl bg-muted mx-auto mb-6 flex items-center justify-center">
                          <Eye
                            className={cn(
                              "h-10 w-10 transition-colors",
                              spotAnswered === true
                                ? "text-green-400"
                                : spotAnswered === false
                                  ? "text-red-400"
                                  : "text-[hsl(var(--game))]"
                            )}
                          />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">
                          {currentSpotItem.name}
                        </h2>
                        <p className="text-muted-foreground text-sm max-w-md mx-auto">
                          {currentSpotItem.description}
                        </p>

                        {/* Feedback */}
                        {spotAnswered !== null && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                              "mt-4 p-3 rounded-lg text-sm",
                              spotAnswered
                                ? "bg-green-500/20 text-green-300"
                                : "bg-red-500/20 text-red-300"
                            )}
                          >
                            <div className="flex items-center justify-center gap-2 mb-1">
                              {spotAnswered ? (
                                <CheckCircle2 className="h-4 w-4" />
                              ) : (
                                <XCircle className="h-4 w-4" />
                              )}
                              {spotAnswered ? "Correct!" : "Not quite!"}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {currentSpotItem.explanation}
                            </p>
                          </motion.div>
                        )}
                      </div>
                    </GlassCard>
                  </motion.div>
                </AnimatePresence>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => handleSpotChoice(false)}
                      disabled={spotAnswered !== null}
                      className={cn(
                        "w-full h-16 text-lg border-2 border-red-500/50 hover:bg-red-500/10 hover:border-red-500",
                        spotAnswered !== null && "opacity-50 cursor-default"
                      )}
                    >
                      <XCircle className="mr-2 h-5 w-5 text-red-400" />
                      Not Polystyrene
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => handleSpotChoice(true)}
                      disabled={spotAnswered !== null}
                      className={cn(
                        "w-full h-16 text-lg border-2 border-green-500/50 hover:bg-green-500/10 hover:border-green-500",
                        spotAnswered !== null && "opacity-50 cursor-default"
                      )}
                    >
                      <CheckCircle2 className="mr-2 h-5 w-5 text-green-400" />
                      Polystyrene
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* ─── RESULTS ───────────────────────────────────────────── */}
            {spotPhase === "results" && (
              <motion.div
                key="spot-results"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <ConfettiEffect trigger={spotShowConfetti} />

                {/* Shareable Result Card */}
                <div className="relative rounded-2xl overflow-hidden mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--game))] via-emerald-600 to-teal-700 opacity-90" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
                  <div className="relative p-8 md:p-10 text-center text-white">
                    <Eye className="h-14 w-14 mx-auto mb-3 text-white/80 drop-shadow-lg" />
                    <h2 className="text-2xl font-bold mb-1">Spot the Polystyrene</h2>
                    <p className="text-white/60 text-sm mb-6">Game Complete</p>

                    <div className="text-7xl md:text-8xl font-extrabold tracking-tight drop-shadow-md mb-2">
                      {spotScore}/{SPOT_ITEMS.length}
                    </div>
                    <div className="text-lg text-white/70">
                      {Math.round((spotScore / SPOT_ITEMS.length) * 100)}% correct
                    </div>

                    <div className="text-sm text-white/40 mt-6">
                      @PolystyreneGuy
                    </div>
                  </div>
                </div>

                <GlassCard className="text-center">
                  {/* XP earned */}
                  <div className="mb-6 p-4 rounded-xl bg-[hsl(var(--game))/0.1] border border-[hsl(var(--game))/0.3]">
                    <div className="flex items-center justify-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-400" />
                      <span className="font-semibold">
                        +{spotScore * 5} XP earned!
                      </span>
                    </div>
                  </div>

                  {/* Share Buttons */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center justify-center gap-2">
                      <Share2 className="h-4 w-4" />
                      Share Your Results
                    </h3>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(spotShareText)}`;
                          window.open(url, "_blank", "noopener,noreferrer");
                        }}
                        className="w-full sm:w-auto gap-2"
                      >
                        <Twitter className="h-4 w-4" />
                        Share on X
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(spotShareText).then(() => {
                            toast.success("Share text copied for Instagram Story!");
                          }).catch(() => {
                            toast.error("Could not copy to clipboard");
                          });
                        }}
                        className="w-full sm:w-auto gap-2"
                      >
                        <Instagram className="h-4 w-4" />
                        Share on Instagram
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(spotShareText).then(() => {
                            setSpotCopied(true);
                            toast.success("Copied to clipboard!");
                            setTimeout(() => setSpotCopied(false), 2000);
                          }).catch(() => {
                            toast.error("Could not copy to clipboard");
                          });
                        }}
                        className="w-full sm:w-auto gap-2"
                      >
                        {spotCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        {spotCopied ? "Copied!" : "Copy Text"}
                      </Button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-center">
                    <Button
                      size="lg"
                      onClick={() => {
                        setSpotShowConfetti(false);
                        startSpotGame();
                      }}
                      className="bg-[hsl(var(--game))] hover:bg-[hsl(var(--game))/0.9] text-white px-8"
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Play Again
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </main>
  );
}
