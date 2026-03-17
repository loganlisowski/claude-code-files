"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { IconMap } from "@/components/shared/IconMap";
import { ConfettiEffect } from "@/components/shared/ConfettiEffect";
import { useGameification } from "@/hooks/useGameification";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { mythsFacts } from "@/data/polystyrene-data";

// ---- Vote types ----
interface Votes {
  [mythId: string]: { up: number; down: number; userVote: "up" | "down" | null };
}

// ---- Flip Card ----
function MythFlipCard({
  myth,
  index,
  isFlipped,
  onFlip,
  votes,
  onVote,
}: {
  myth: (typeof mythsFacts)[0];
  index: number;
  isFlipped: boolean;
  onFlip: (id: string) => void;
  votes: Votes[string] | undefined;
  onVote: (id: string, direction: "up" | "down") => void;
}) {
  const currentVotes = votes || { up: 0, down: 0, userVote: null };

  return (
    <SectionReveal delay={index * 0.08}>
      <div style={{ perspective: "1200px" }} className="h-full">
        <motion.div
          className="relative w-full cursor-pointer"
          style={{
            transformStyle: "preserve-3d",
          }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          onClick={() => onFlip(myth.id)}
        >
          {/* Front Face - Myth */}
          <div
            className="w-full"
            style={{
              backfaceVisibility: "hidden",
            }}
          >
            <div className="glass rounded-xl p-6 h-full min-h-[320px] flex flex-col border border-red-500/20 hover:border-red-500/40 transition-colors">
              {/* Icon */}
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-red-500/10 mb-5">
                <IconMap name={myth.iconName} className="h-7 w-7 text-red-400" />
              </div>

              {/* Badge */}
              <Badge className="w-fit mb-4 bg-red-500/15 text-red-400 border-red-500/30 hover:bg-red-500/20">
                <ShieldAlert className="h-3 w-3 mr-1" />
                Myth
              </Badge>

              {/* Myth Text */}
              <p className="text-lg font-medium leading-relaxed flex-1">
                &ldquo;{myth.myth}&rdquo;
              </p>

              {/* Tap to flip */}
              <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <RotateCcw className="h-4 w-4" />
                <span>Click to reveal the truth</span>
              </div>
            </div>
          </div>

          {/* Back Face - Fact */}
          <div
            className="absolute inset-0 w-full"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="glass rounded-xl p-6 h-full min-h-[320px] flex flex-col border border-green-500/20">
              {/* Icon */}
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-green-500/10 mb-5">
                <IconMap
                  name={myth.iconName}
                  className="h-7 w-7 text-green-400"
                />
              </div>

              {/* Badge */}
              <Badge className="w-fit mb-4 bg-green-500/15 text-green-400 border-green-500/30 hover:bg-green-500/20">
                <ShieldCheck className="h-3 w-3 mr-1" />
                Fact
              </Badge>

              {/* Fact Text */}
              <p className="text-base font-medium text-green-300/90 mb-3">
                {myth.fact}
              </p>

              {/* Explanation */}
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {myth.explanation}
              </p>

              {/* Voting Section */}
              <div
                className="mt-4 pt-4 border-t border-border/50"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-xs text-muted-foreground mb-2">
                  Was this helpful?
                </p>
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "gap-1.5 rounded-full h-8",
                      currentVotes.userVote === "up" &&
                        "bg-green-500/15 text-green-400"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      onVote(myth.id, "up");
                    }}
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                    <span className="text-xs">{currentVotes.up}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "gap-1.5 rounded-full h-8",
                      currentVotes.userVote === "down" &&
                        "bg-red-500/15 text-red-400"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      onVote(myth.id, "down");
                    }}
                  >
                    <ThumbsDown className="h-3.5 w-3.5" />
                    <span className="text-xs">{currentVotes.down}</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionReveal>
  );
}

// ---- Main Page ----
export default function MythsVsFactsPage() {
  const [flippedCards, setFlippedCards] = useLocalStorage<
    string[]
  >("polystyrene-myths-flipped", []);
  const [votes, setVotes] = useLocalStorage<Votes>(
    "polystyrene-myths-votes",
    {}
  );
  const { progress, isLoaded, recordMythRevealed } = useGameification();

  // Track XP toasts per session
  const toastedRef = useRef<Set<string>>(new Set());

  const handleFlip = useCallback(
    (id: string) => {
      const alreadyFlipped = flippedCards.includes(id);
      if (!alreadyFlipped) {
        setFlippedCards((prev) => [...prev, id]);
        // Record gamification
        if (isLoaded && !progress.mythsRevealed.includes(id)) {
          recordMythRevealed(id);
          if (!toastedRef.current.has(id)) {
            toastedRef.current.add(id);
            toast.success("+10 XP", {
              description: "Myth debunked!",
              duration: 2000,
            });
          }
        }
      } else {
        // Allow toggling back
        setFlippedCards((prev) => prev.filter((c) => c !== id));
      }
    },
    [
      flippedCards,
      setFlippedCards,
      isLoaded,
      progress.mythsRevealed,
      recordMythRevealed,
    ]
  );

  const handleVote = useCallback(
    (mythId: string, direction: "up" | "down") => {
      setVotes((prev) => {
        const current = prev[mythId] || { up: 0, down: 0, userVote: null };

        // If already voted the same direction, remove vote
        if (current.userVote === direction) {
          return {
            ...prev,
            [mythId]: {
              ...current,
              [direction]: Math.max(0, current[direction] - 1),
              userVote: null,
            },
          };
        }

        // If changing vote
        const updated = { ...current };
        if (current.userVote) {
          updated[current.userVote] = Math.max(
            0,
            current[current.userVote] - 1
          );
        }
        updated[direction] = current[direction] + 1;
        updated.userVote = direction;

        return { ...prev, [mythId]: updated };
      });
    },
    [setVotes]
  );

  // Debunked count and confetti trigger
  const debunkedCount = flippedCards.length;
  const totalMyths = mythsFacts.length;
  const allDebunked = debunkedCount >= totalMyths;
  const progressPercent = totalMyths > 0 ? (debunkedCount / totalMyths) * 100 : 0;

  return (
    <div className="min-h-screen">
      {/* Confetti */}
      <ConfettiEffect trigger={allDebunked} />

      {/* Hero */}
      <section className="relative overflow-hidden py-24 px-4">
        <div className="absolute inset-0">
          <Image
            src="/images/myths-debunked.jpg"
            alt="Myths vs Facts background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glass">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">
                {totalMyths} myths to debunk
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Myths{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-500">
                vs
              </span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-300">
                Facts
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Separating truth from fiction about polystyrene. Click each card to
              reveal the real story behind common misconceptions.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-24">
        {/* Progress indicator */}
        <SectionReveal className="mb-12">
          <div className="glass rounded-xl p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-lg font-semibold">
                  {allDebunked
                    ? "All myths debunked!"
                    : `You've debunked ${debunkedCount} of ${totalMyths} myths`}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {allDebunked
                    ? "Congratulations, you are a polystyrene expert!"
                    : "Click cards to flip them and reveal the facts"}
                </p>
              </div>
              {allDebunked && (
                <Badge className="bg-green-500/15 text-green-400 border-green-500/30 text-sm px-4 py-1.5">
                  <ShieldCheck className="h-4 w-4 mr-1.5" />
                  Fact Master
                </Badge>
              )}
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                className={cn(
                  "h-full rounded-full transition-colors",
                  allDebunked
                    ? "bg-gradient-to-r from-green-500 to-green-400"
                    : "bg-gradient-to-r from-primary to-green-400"
                )}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        </SectionReveal>

        {/* Myth Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mythsFacts.map((myth, i) => (
            <MythFlipCard
              key={myth.id}
              myth={myth}
              index={i}
              isFlipped={flippedCards.includes(myth.id)}
              onFlip={handleFlip}
              votes={votes[myth.id]}
              onVote={handleVote}
            />
          ))}
        </div>

        {/* Stats Section */}
        {isLoaded && (
          <SectionReveal className="mt-16">
            <div className="glass rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-sm text-muted-foreground">
                  Myths Debunked
                </p>
                <p className="text-2xl font-bold">
                  {progress.mythsRevealed.length}{" "}
                  <span className="text-base font-normal text-muted-foreground">
                    / {totalMyths}
                  </span>
                </p>
              </div>
              <div className="w-full sm:w-64 h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-green-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(progress.mythsRevealed.length / totalMyths) * 100}%`,
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <div className="text-center sm:text-right">
                <p className="text-sm text-muted-foreground">XP Earned</p>
                <p className="text-2xl font-bold text-primary">
                  {progress.xp} XP
                </p>
              </div>
            </div>
          </SectionReveal>
        )}
      </div>
    </div>
  );
}
