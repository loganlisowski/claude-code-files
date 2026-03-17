import { Achievement } from "@/types/gamification";

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-quiz",
    name: "First Quiz",
    description: "Complete your first recycling quiz",
    icon: "HelpCircle",
    xpReward: 10,
    condition: (p) => p.quizScores.length >= 1,
  },
  {
    id: "perfect-score",
    name: "Perfect Score",
    description: "Score 10/10 on any quiz",
    icon: "Trophy",
    xpReward: 50,
    condition: (p) => p.quizScores.some((s) => s.score === s.total),
  },
  {
    id: "sorting-pro",
    name: "Sorting Pro",
    description: "Get 100% on the sorting game",
    icon: "Gamepad2",
    xpReward: 30,
    condition: (p) => p.gameScores.some((s) => s.score === s.total),
  },
  {
    id: "fact-finder",
    name: "Fact Finder",
    description: "View 25 or more fun facts",
    icon: "Brain",
    xpReward: 20,
    condition: (p) => p.factsViewed.length >= 25,
  },
  {
    id: "guide-graduate",
    name: "Guide Graduate",
    description: "Complete all 4 recycling guide steps",
    icon: "GraduationCap",
    xpReward: 15,
    condition: (p) => p.guideStepsCompleted.length >= 4,
  },
  {
    id: "blog-reader",
    name: "Blog Reader",
    description: "Read 5 or more blog articles",
    icon: "BookOpen",
    xpReward: 20,
    condition: (p) => p.articlesRead.length >= 5,
  },
  {
    id: "myth-buster",
    name: "Myth Buster",
    description: "Reveal all 8 myth facts",
    icon: "ShieldCheck",
    xpReward: 25,
    condition: (p) => p.mythsRevealed.length >= 8,
  },
  {
    id: "quiz-master",
    name: "Quiz Master",
    description: "Complete quizzes on all difficulty levels",
    icon: "Star",
    xpReward: 30,
    condition: (p) => {
      const difficulties = new Set(p.quizScores.map((s) => s.difficulty));
      return difficulties.has("easy") && difficulties.has("medium") && difficulties.has("hard");
    },
  },
  {
    id: "streak-king",
    name: "Streak King",
    description: "Get a 5+ streak in the sorting game",
    icon: "Flame",
    xpReward: 15,
    condition: (p) => p.gameScores.some((s) => s.bestStreak >= 5),
  },
  {
    id: "dedicated",
    name: "Dedicated Learner",
    description: "Earn 200+ total XP",
    icon: "Award",
    xpReward: 25,
    condition: (p) => p.xp >= 200,
  },
];
