export interface QuizScore {
  date: string;
  score: number;
  total: number;
  difficulty: string;
  timeSpent: number;
}

export interface GameScore {
  date: string;
  score: number;
  total: number;
  bestStreak: number;
  bestCombo: number;
}

export interface UserProgress {
  xp: number;
  level: number;
  achievements: string[];
  quizScores: QuizScore[];
  gameScores: GameScore[];
  articlesRead: string[];
  factsViewed: string[];
  guideStepsCompleted: number[];
  mythsRevealed: string[];
  lastActive: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
  condition: (progress: UserProgress) => boolean;
}
