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
} from "lucide-react";

// ─── Game Item Data ──────────────────────────────────────────────────────────

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
    hint: "Clean meat trays are recyclable — rinse them first",
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

type GamePhase = "setup" | "playing" | "results";

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
  const { progress, isLoaded, recordGameScore } = useGameification();

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

  const currentItem = items[currentIndex] ?? null;
  const combo = getComboMultiplier(streak);
  const remaining = items.length - currentIndex;

  // Previous best scores
  const bestScores = useMemo(() => {
    if (!isLoaded) return [];
    return progress.gameScores
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [progress.gameScores, isLoaded]);

  // Start game
  const startGame = useCallback(() => {
    setItems(shuffleArray(GAME_ITEMS));
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setBestCombo(1);
    setAnswered(null);
    setShowConfetti(false);
    setPhase("playing");
  }, []);

  // Handle user choice
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

      // Auto-advance after delay
      setTimeout(() => {
        if (currentIndex + 1 >= items.length) {
          // Game over — compute final score
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
              Sorting Game
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Polystyrene{" "}
              <span className="text-[hsl(var(--game))]">Sorting Challenge</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Can you tell which polystyrene items are recyclable? Sort them
              correctly to build your streak and earn combo points!
            </p>
          </SectionReveal>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 pb-20">
        <AnimatePresence mode="wait">
          {/* ─── SETUP ─────────────────────────────────────────────── */}
          {phase === "setup" && (
            <motion.div
              key="setup"
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
              key="playing"
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
              key="results"
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
                <div className="mb-8 p-4 rounded-xl bg-[hsl(var(--game))/0.1] border border-[hsl(var(--game))/0.3]">
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
      </div>
    </main>
  );
}
