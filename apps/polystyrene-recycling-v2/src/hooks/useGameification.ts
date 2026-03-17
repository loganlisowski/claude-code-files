"use client";

import { useCallback, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { UserProgress, QuizScore, GameScore } from "@/types/gamification";
import { ACHIEVEMENTS } from "@/data/achievements";
import { XP_VALUES, LEVEL_THRESHOLDS, LEVEL_TITLES } from "@/lib/constants";

const DEFAULT_PROGRESS: UserProgress = {
  xp: 0,
  level: 1,
  achievements: [],
  quizScores: [],
  gameScores: [],
  articlesRead: [],
  factsViewed: [],
  guideStepsCompleted: [],
  mythsRevealed: [],
  lastActive: new Date().toISOString(),
};

function calculateLevel(xp: number): number {
  let level = 1;
  for (const t of LEVEL_THRESHOLDS) {
    if (xp >= t.xpRequired) level = t.level;
  }
  return level;
}

export function useGameification() {
  const [progress, setProgress, isLoaded] = useLocalStorage<UserProgress>(
    "polystyrene-v2-progress",
    DEFAULT_PROGRESS
  );

  const checkAchievements = useCallback(
    (updated: UserProgress): string[] => {
      const newAchievements: string[] = [];
      for (const achievement of ACHIEVEMENTS) {
        if (
          !updated.achievements.includes(achievement.id) &&
          achievement.condition(updated)
        ) {
          newAchievements.push(achievement.id);
        }
      }
      return newAchievements;
    },
    []
  );

  const addXP = useCallback(
    (amount: number) => {
      setProgress((prev) => {
        const newXP = prev.xp + amount;
        const newLevel = calculateLevel(newXP);
        const updated = {
          ...prev,
          xp: newXP,
          level: newLevel,
          lastActive: new Date().toISOString(),
        };
        const newAchievements = checkAchievements(updated);
        if (newAchievements.length > 0) {
          updated.achievements = [...updated.achievements, ...newAchievements];
          const bonusXP = newAchievements.reduce((sum, id) => {
            const a = ACHIEVEMENTS.find((ach) => ach.id === id);
            return sum + (a?.xpReward ?? 0);
          }, 0);
          updated.xp += bonusXP;
          updated.level = calculateLevel(updated.xp);
        }
        return updated;
      });
    },
    [setProgress, checkAchievements]
  );

  const recordQuizScore = useCallback(
    (score: QuizScore) => {
      setProgress((prev) => {
        const updated = {
          ...prev,
          quizScores: [...prev.quizScores, score],
          lastActive: new Date().toISOString(),
        };
        return updated;
      });
      const xp =
        score.score === score.total
          ? XP_VALUES.QUIZ_PERFECT
          : score.score * XP_VALUES.QUIZ_CORRECT;
      addXP(xp);
    },
    [setProgress, addXP]
  );

  const recordGameScore = useCallback(
    (score: GameScore) => {
      setProgress((prev) => {
        const updated = {
          ...prev,
          gameScores: [...prev.gameScores, score],
          lastActive: new Date().toISOString(),
        };
        return updated;
      });
      let xp = score.score * XP_VALUES.GAME_CORRECT;
      if (score.bestStreak >= 5) xp += XP_VALUES.GAME_STREAK_BONUS;
      if (score.bestCombo >= 3) xp += XP_VALUES.GAME_COMBO_BONUS;
      addXP(xp);
    },
    [setProgress, addXP]
  );

  const recordArticleRead = useCallback(
    (articleId: string) => {
      setProgress((prev) => {
        if (prev.articlesRead.includes(articleId)) return prev;
        return {
          ...prev,
          articlesRead: [...prev.articlesRead, articleId],
          lastActive: new Date().toISOString(),
        };
      });
      addXP(XP_VALUES.ARTICLE_READ);
    },
    [setProgress, addXP]
  );

  const recordFactViewed = useCallback(
    (factId: string) => {
      setProgress((prev) => {
        if (prev.factsViewed.includes(factId)) return prev;
        return {
          ...prev,
          factsViewed: [...prev.factsViewed, factId],
          lastActive: new Date().toISOString(),
        };
      });
      addXP(XP_VALUES.FACT_VIEWED);
    },
    [setProgress, addXP]
  );

  const recordGuideStep = useCallback(
    (step: number) => {
      setProgress((prev) => {
        if (prev.guideStepsCompleted.includes(step)) return prev;
        return {
          ...prev,
          guideStepsCompleted: [...prev.guideStepsCompleted, step],
          lastActive: new Date().toISOString(),
        };
      });
      addXP(XP_VALUES.GUIDE_STEP_COMPLETED);
    },
    [setProgress, addXP]
  );

  const recordMythRevealed = useCallback(
    (mythId: string) => {
      setProgress((prev) => {
        if (prev.mythsRevealed.includes(mythId)) return prev;
        return {
          ...prev,
          mythsRevealed: [...prev.mythsRevealed, mythId],
          lastActive: new Date().toISOString(),
        };
      });
      addXP(XP_VALUES.MYTH_REVEALED);
    },
    [setProgress, addXP]
  );

  const levelTitle = useMemo(
    () => LEVEL_TITLES[progress.level] ?? "Unknown",
    [progress.level]
  );

  const xpToNextLevel = useMemo(() => {
    const next = LEVEL_THRESHOLDS.find((t) => t.level === progress.level + 1);
    return next ? next.xpRequired - progress.xp : 0;
  }, [progress.xp, progress.level]);

  const levelProgress = useMemo(() => {
    const current = LEVEL_THRESHOLDS.find((t) => t.level === progress.level);
    const next = LEVEL_THRESHOLDS.find((t) => t.level === progress.level + 1);
    if (!current || !next) return 100;
    const range = next.xpRequired - current.xpRequired;
    const earned = progress.xp - current.xpRequired;
    return Math.min(Math.round((earned / range) * 100), 100);
  }, [progress.xp, progress.level]);

  return {
    progress,
    isLoaded,
    addXP,
    recordQuizScore,
    recordGameScore,
    recordArticleRead,
    recordFactViewed,
    recordGuideStep,
    recordMythRevealed,
    levelTitle,
    xpToNextLevel,
    levelProgress,
    checkAchievements,
  };
}
