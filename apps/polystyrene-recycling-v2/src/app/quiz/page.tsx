"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/shared/GlassCard";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { ConfettiEffect } from "@/components/shared/ConfettiEffect";
import { useGameification } from "@/hooks/useGameification";
import { XP_VALUES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Brain,
  Clock,
  Trophy,
  Star,
  ArrowRight,
  RotateCcw,
  ChevronUp,
  CheckCircle2,
  XCircle,
  Zap,
  Share2,
  Copy,
  Check,
  Instagram,
  Twitter,
} from "lucide-react";

// ─── Quiz Question Data ──────────────────────────────────────────────────────

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  difficulty: "easy" | "medium" | "hard";
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "What percentage of EPS is air?",
    options: ["50%", "75%", "90-95%", "99%"],
    correct: 2,
    difficulty: "easy",
  },
  {
    question: "What is polystyrene's resin code?",
    options: ["#1", "#4", "#6", "#7"],
    correct: 2,
    difficulty: "easy",
  },
  {
    question: "How many polystyrene cups are used in the US annually?",
    options: ["5 billion", "10 billion", "25 billion", "50 billion"],
    correct: 2,
    difficulty: "easy",
  },
  {
    question: "Who discovered polystyrene?",
    options: [
      "Thomas Edison",
      "Eduard Simon",
      "Leo Baekeland",
      "Charles Goodyear",
    ],
    correct: 1,
    difficulty: "medium",
  },
  {
    question: "What year was polystyrene discovered?",
    options: ["1789", "1839", "1899", "1939"],
    correct: 1,
    difficulty: "medium",
  },
  {
    question: "What does EPS stand for?",
    options: [
      "Elastic Polymer System",
      "Expanded Polystyrene",
      "Enhanced Plastic Sheeting",
      "Extruded Polymer Solid",
    ],
    correct: 1,
    difficulty: "easy",
  },
  {
    question:
      "How much energy is saved by recycling polystyrene vs producing new?",
    options: ["50%", "70%", "88%", "95%"],
    correct: 2,
    difficulty: "medium",
  },
  {
    question: "The brand name 'Styrofoam' belongs to which company?",
    options: ["3M", "Dow Chemical", "DuPont", "BASF"],
    correct: 1,
    difficulty: "hard",
  },
  {
    question: "'Styrofoam' is technically what type of polystyrene?",
    options: ["EPS", "XPS", "HIPS", "GPS"],
    correct: 1,
    difficulty: "hard",
  },
  {
    question: "How long does polystyrene take to decompose in landfills?",
    options: ["50 years", "100 years", "250 years", "500+ years"],
    correct: 3,
    difficulty: "easy",
  },
  {
    question: "Polystyrene can be compacted to what fraction of its volume?",
    options: ["1/5th", "1/10th", "1/25th", "1/50th"],
    correct: 3,
    difficulty: "medium",
  },
  {
    question: "How many EPS drop-off locations exist in the US?",
    options: ["100+", "350+", "680+", "1000+"],
    correct: 2,
    difficulty: "hard",
  },
  {
    question: "Chemical recycling converts polystyrene back to what?",
    options: ["Petroleum", "Styrene monomer", "Natural gas", "Ethylene"],
    correct: 1,
    difficulty: "hard",
  },
  {
    question:
      "Paper alternatives use how much more water to manufacture?",
    options: ["Same amount", "2x more", "3-4x more", "10x more"],
    correct: 2,
    difficulty: "medium",
  },
  {
    question:
      "What percentage of polystyrene waste is currently recycled in the US?",
    options: ["~1%", "~5%", "~15%", "~25%"],
    correct: 1,
    difficulty: "hard",
  },
  {
    question: "Which recycling method is most common for polystyrene?",
    options: ["Pyrolysis", "Compaction", "Chemical dissolution", "Incineration"],
    correct: 1,
    difficulty: "medium",
  },
  {
    question: "Polystyrene is made from which monomer?",
    options: ["Ethylene", "Propylene", "Styrene", "Vinyl chloride"],
    correct: 2,
    difficulty: "easy",
  },
];

type Difficulty = "easy" | "medium" | "hard";
type GamePhase = "setup" | "playing" | "results";

const DIFFICULTY_CONFIG: Record<Difficulty, { label: string; count: number; color: string }> = {
  easy: { label: "Easy", count: 5, color: "bg-green-500" },
  medium: { label: "Medium", count: 8, color: "bg-yellow-500" },
  hard: { label: "Hard", count: 10, color: "bg-red-500" },
};

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getGrade(percentage: number): { grade: string; color: string } {
  if (percentage >= 90) return { grade: "A+", color: "text-green-400" };
  if (percentage >= 80) return { grade: "A", color: "text-green-400" };
  if (percentage >= 70) return { grade: "B", color: "text-blue-400" };
  if (percentage >= 60) return { grade: "C", color: "text-yellow-400" };
  if (percentage >= 50) return { grade: "D", color: "text-orange-400" };
  return { grade: "F", color: "text-red-400" };
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function QuizPage() {
  const { progress, isLoaded, recordQuizScore } = useGameification();

  const [phase, setPhase] = useState<GamePhase>("setup");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [copied, setCopied] = useState(false);

  // Timer
  useEffect(() => {
    if (!timerActive) return;
    const id = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [timerActive]);

  // High scores for current difficulty
  const highScores = useMemo(() => {
    if (!isLoaded) return [];
    return progress.quizScores
      .filter((s) => s.difficulty === difficulty)
      .sort((a, b) => b.score / b.total - a.score / a.total)
      .slice(0, 3);
  }, [progress.quizScores, difficulty, isLoaded]);

  // Start quiz
  const startQuiz = useCallback(() => {
    const count = DIFFICULTY_CONFIG[difficulty].count;
    // Filter questions by difficulty or below, shuffle and pick
    let pool: QuizQuestion[];
    if (difficulty === "easy") {
      pool = QUIZ_QUESTIONS.filter((q) => q.difficulty === "easy");
    } else if (difficulty === "medium") {
      pool = QUIZ_QUESTIONS.filter(
        (q) => q.difficulty === "easy" || q.difficulty === "medium"
      );
    } else {
      pool = [...QUIZ_QUESTIONS];
    }
    const shuffled = shuffleArray(pool).slice(0, count);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);

    setTimer(0);
    setTimerActive(true);
    setShowConfetti(false);
    setPhase("playing");
  }, [difficulty]);

  // Handle answer selection
  const handleAnswer = useCallback(
    (index: number) => {
      if (selectedAnswer !== null) return; // Already answered
      setSelectedAnswer(index);
      const correct = index === questions[currentIndex].correct;

      if (correct) {
        setScore((s) => s + 1);
        toast.success(`Correct! +${XP_VALUES.QUIZ_CORRECT} XP`, {
          icon: <Zap className="h-4 w-4 text-yellow-400" />,
        });
      } else {
        toast.error("Incorrect!", {
          description: `The correct answer was: ${questions[currentIndex].options[questions[currentIndex].correct]}`,
        });
      }
    },
    [selectedAnswer, questions, currentIndex]
  );

  // Next question or finish
  const nextQuestion = useCallback(() => {
    if (currentIndex + 1 >= questions.length) {
      // Quiz complete
      setTimerActive(false);
      const isPerfect = score === questions.length;
      if (isPerfect) setShowConfetti(true);

      recordQuizScore({
        date: new Date().toISOString(),
        score,
        total: questions.length,
        difficulty,
        timeSpent: timer,
      });

      setPhase("results");
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
  
    }
  }, [currentIndex, questions.length, score, difficulty, timer, recordQuizScore]);

  const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
  const gradeInfo = getGrade(percentage);

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--quiz))/0.15] via-transparent to-primary/10" />
        <div className="relative max-w-4xl mx-auto text-center">
          <SectionReveal>
            <Badge className="w-fit mb-4 bg-[hsl(var(--quiz))/0.15] text-[hsl(var(--quiz))] border-[hsl(var(--quiz))/0.3] hover:bg-[hsl(var(--quiz))/0.2]">
              <Brain className="h-3 w-3 mr-1" />
              Knowledge Quiz
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Test Your{" "}
              <span className="text-[hsl(var(--quiz))]">Knowledge</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              How much do you know about polystyrene recycling? Choose your
              difficulty and find out!
            </p>
          </SectionReveal>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 pb-20">
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
                <h2 className="text-2xl font-bold mb-6 text-center">
                  Choose Difficulty
                </h2>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  {(Object.keys(DIFFICULTY_CONFIG) as Difficulty[]).map((d) => {
                    const cfg = DIFFICULTY_CONFIG[d];
                    const isSelected = difficulty === d;
                    return (
                      <button
                        key={d}
                        onClick={() => setDifficulty(d)}
                        className={cn(
                          "relative rounded-xl border-2 p-6 text-center transition-all duration-200",
                          isSelected
                            ? "border-[hsl(var(--quiz))] bg-[hsl(var(--quiz))/0.1] scale-105"
                            : "border-border hover:border-muted-foreground/50 hover:bg-muted/50"
                        )}
                      >
                        <div
                          className={cn(
                            "w-3 h-3 rounded-full mx-auto mb-3",
                            cfg.color
                          )}
                        />
                        <div className="font-bold text-lg">{cfg.label}</div>
                        <div className="text-sm text-muted-foreground">
                          {cfg.count} Questions
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-center">
                  <Button
                    size="lg"
                    onClick={startQuiz}
                    className="bg-[hsl(var(--quiz))] hover:bg-[hsl(var(--quiz))/0.9] text-white px-8"
                  >
                    Start Quiz
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </GlassCard>

              {/* Previous Scores */}
              {highScores.length > 0 && (
                <GlassCard>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-400" />
                    Your Best Scores ({DIFFICULTY_CONFIG[difficulty].label})
                  </h3>
                  <div className="space-y-3">
                    {highScores.map((s, i) => (
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
                              {s.score}/{s.total} (
                              {Math.round((s.score / s.total) * 100)}%)
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(s.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatTime(s.timeSpent)}
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}
            </motion.div>
          )}

          {/* ─── PLAYING ───────────────────────────────────────────── */}
          {phase === "playing" && questions.length > 0 && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Top bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      {score}/{questions.length}
                    </span>
                    <span className="text-sm font-medium flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {formatTime(timer)}
                    </span>
                  </div>
                </div>
                <Progress
                  value={((currentIndex + 1) / questions.length) * 100}
                  className="h-2"
                />
              </div>

              {/* Question Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <GlassCard className="mb-6">
                    <div className="text-center mb-8">
                      <Badge
                        className={cn(
                          "mb-4",
                          questions[currentIndex].difficulty === "easy" &&
                            "bg-green-500/20 text-green-400 border-green-500/30",
                          questions[currentIndex].difficulty === "medium" &&
                            "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
                          questions[currentIndex].difficulty === "hard" &&
                            "bg-red-500/20 text-red-400 border-red-500/30"
                        )}
                      >
                        {questions[currentIndex].difficulty.charAt(0).toUpperCase() +
                          questions[currentIndex].difficulty.slice(1)}
                      </Badge>
                      <h2 className="text-xl md:text-2xl font-bold">
                        {questions[currentIndex].question}
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {questions[currentIndex].options.map((option, i) => {
                        const isSelected = selectedAnswer === i;
                        const isCorrectAnswer =
                          i === questions[currentIndex].correct;
                        const hasAnswered = selectedAnswer !== null;

                        let stateClass = "";
                        if (hasAnswered) {
                          if (isCorrectAnswer) {
                            stateClass =
                              "border-green-500 bg-green-500/20 text-green-300";
                          } else if (isSelected && !isCorrectAnswer) {
                            stateClass =
                              "border-red-500 bg-red-500/20 text-red-300";
                          } else {
                            stateClass = "opacity-50";
                          }
                        }

                        return (
                          <motion.button
                            key={i}
                            whileHover={!hasAnswered ? { scale: 1.02 } : {}}
                            whileTap={!hasAnswered ? { scale: 0.98 } : {}}
                            onClick={() => handleAnswer(i)}
                            disabled={hasAnswered}
                            className={cn(
                              "p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-3",
                              !hasAnswered &&
                                "border-border hover:border-[hsl(var(--quiz))] hover:bg-[hsl(var(--quiz))/0.05] cursor-pointer",
                              hasAnswered && "cursor-default",
                              stateClass
                            )}
                          >
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold">
                              {String.fromCharCode(65 + i)}
                            </span>
                            <span className="font-medium">{option}</span>
                            {hasAnswered && isCorrectAnswer && (
                              <CheckCircle2 className="ml-auto h-5 w-5 text-green-400 flex-shrink-0" />
                            )}
                            {hasAnswered && isSelected && !isCorrectAnswer && (
                              <XCircle className="ml-auto h-5 w-5 text-red-400 flex-shrink-0" />
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  </GlassCard>

                  {/* Next button */}
                  {selectedAnswer !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-center"
                    >
                      <Button
                        size="lg"
                        onClick={nextQuestion}
                        className="bg-[hsl(var(--quiz))] hover:bg-[hsl(var(--quiz))/0.9] text-white px-8"
                      >
                        {currentIndex + 1 >= questions.length
                          ? "See Results"
                          : "Next Question"}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
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

              {/* Shareable Result Card */}
              <div className="relative rounded-2xl overflow-hidden mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--quiz))] via-purple-600 to-blue-600 opacity-90" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
                <div className="relative p-8 md:p-10 text-center text-white">
                  <Trophy className="h-14 w-14 mx-auto mb-3 text-yellow-300 drop-shadow-lg" />
                  <h2 className="text-2xl font-bold mb-1">Quiz Complete!</h2>
                  <p className="text-white/70 text-sm mb-6">
                    {DIFFICULTY_CONFIG[difficulty].label} Difficulty
                  </p>

                  {/* Large Score Display */}
                  <div className="mb-6">
                    <div className="text-7xl md:text-8xl font-extrabold tracking-tight drop-shadow-md">
                      {percentage}%
                    </div>
                    <div className={cn(
                      "text-3xl font-bold mt-2",
                      percentage >= 90 ? "text-yellow-300" :
                      percentage >= 70 ? "text-blue-200" :
                      percentage >= 50 ? "text-orange-200" : "text-red-200"
                    )}>
                      Grade: {gradeInfo.grade}
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="flex items-center justify-center gap-6 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{score}/{questions.length}</div>
                      <div className="text-xs text-white/60">Correct</div>
                    </div>
                    <div className="w-px h-10 bg-white/20" />
                    <div className="text-center">
                      <div className="text-2xl font-bold flex items-center gap-1 justify-center">
                        <Clock className="h-5 w-5" />
                        {formatTime(timer)}
                      </div>
                      <div className="text-xs text-white/60">Time</div>
                    </div>
                  </div>

                  <div className="text-sm text-white/50 mt-4">
                    @PolystyreneGuy Polystyrene Quiz
                  </div>
                </div>
              </div>

              <GlassCard className="text-center">
                {/* XP earned */}
                <div className="mb-6 p-4 rounded-xl bg-[hsl(var(--quiz))/0.1] border border-[hsl(var(--quiz))/0.3]">
                  <div className="flex items-center justify-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-400" />
                    <span className="font-semibold">
                      +
                      {score === questions.length
                        ? XP_VALUES.QUIZ_PERFECT
                        : score * XP_VALUES.QUIZ_CORRECT}{" "}
                      XP earned!
                    </span>
                  </div>
                  {score === questions.length && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Perfect score bonus applied!
                    </p>
                  )}
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
                        const text = `I scored ${percentage}% (Grade: ${gradeInfo.grade}) on the @PolystyreneGuy Polystyrene Quiz! Can you beat my score? #PolyRecycle #Recycling`;
                        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
                        window.open(url, "_blank", "noopener,noreferrer");
                      }}
                      className="w-full sm:w-auto gap-2"
                    >
                      <Twitter className="h-4 w-4" />
                      Share on X / Twitter
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const text = `I scored ${percentage}% (Grade: ${gradeInfo.grade}) on the @PolystyreneGuy Polystyrene Quiz! Test your knowledge too. #PolyRecycle #Recycling`;
                        navigator.clipboard.writeText(text).then(() => {
                          toast.success("Share text copied for Instagram Story!");
                        }).catch(() => {
                          toast.error("Could not copy to clipboard");
                        });
                      }}
                      className="w-full sm:w-auto gap-2"
                    >
                      <Instagram className="h-4 w-4" />
                      Share on Instagram Story
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const text = `I scored ${percentage}% (Grade: ${gradeInfo.grade}) on the @PolystyreneGuy Polystyrene Quiz! #PolyRecycle #Recycling`;
                        navigator.clipboard.writeText(text).then(() => {
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
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      setShowConfetti(false);
                      setPhase("setup");
                    }}
                    className="w-full sm:w-auto"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Try Again
                  </Button>
                  {difficulty !== "hard" && (
                    <Button
                      size="lg"
                      onClick={() => {
                        setShowConfetti(false);
                        const nextDiff =
                          difficulty === "easy" ? "medium" : "hard";
                        setDifficulty(nextDiff);
                        setPhase("setup");
                      }}
                      className="bg-[hsl(var(--quiz))] hover:bg-[hsl(var(--quiz))/0.9] text-white w-full sm:w-auto"
                    >
                      <ChevronUp className="mr-2 h-4 w-4" />
                      Try {difficulty === "easy" ? "Medium" : "Hard"} Difficulty
                    </Button>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
