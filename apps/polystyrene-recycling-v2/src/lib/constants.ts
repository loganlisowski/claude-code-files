export const XP_VALUES = {
  QUIZ_CORRECT: 10,
  QUIZ_PERFECT: 50,
  GAME_CORRECT: 5,
  GAME_STREAK_BONUS: 15,
  GAME_COMBO_BONUS: 25,
  ARTICLE_READ: 20,
  FACT_VIEWED: 5,
  GUIDE_STEP_COMPLETED: 15,
  MYTH_REVEALED: 10,
  ACHIEVEMENT_BONUS: 100,
} as const;

export const LEVEL_THRESHOLDS: { level: number; xpRequired: number }[] = [
  { level: 1, xpRequired: 0 },
  { level: 2, xpRequired: 50 },
  { level: 3, xpRequired: 120 },
  { level: 4, xpRequired: 220 },
  { level: 5, xpRequired: 350 },
  { level: 6, xpRequired: 500 },
  { level: 7, xpRequired: 700 },
  { level: 8, xpRequired: 950 },
  { level: 9, xpRequired: 1200 },
  { level: 10, xpRequired: 1500 },
];

export const LEVEL_TITLES: Record<number, string> = {
  1: "Beginner",
  2: "Curious Learner",
  3: "Recycling Rookie",
  4: "Eco Explorer",
  5: "Green Guardian",
  6: "Sustainability Scout",
  7: "Recycling Ranger",
  8: "Eco Champion",
  9: "Planet Protector",
  10: "Polystyrene Master",
};
