"use client";

import { useGameification } from "@/hooks/useGameification";
import { ACHIEVEMENTS } from "@/data/achievements";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconMap } from "@/components/shared/IconMap";
import { Trophy, Zap, Star, Target } from "lucide-react";

export function ProgressDashboard() {
  const {
    progress,
    isLoaded,
    levelTitle,
    xpToNextLevel,
    levelProgress,
  } = useGameification();

  if (!isLoaded) return null;

  const earnedAchievements = ACHIEVEMENTS.filter((a) =>
    progress.achievements.includes(a.id)
  );

  const recentQuizScores = [...progress.quizScores]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const recentGameScores = [...progress.gameScores]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Trophy className="h-4 w-4 text-yellow-500" />
          <Badge variant="secondary" className="text-xs font-mono">
            {progress.xp} XP
          </Badge>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Your Progress
          </DialogTitle>
          <DialogDescription>
            Track your learning journey and achievements
          </DialogDescription>
        </DialogHeader>

        {/* Level & XP Section */}
        <div className="space-y-4">
          <div className="rounded-lg bg-muted/50 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                <span className="font-semibold">
                  Level {progress.level}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                {levelTitle}
              </span>
            </div>
            <Progress value={levelProgress} className="h-3 mb-2" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                {progress.xp} XP total
              </span>
              {xpToNextLevel > 0 && (
                <span>{xpToNextLevel} XP to next level</span>
              )}
            </div>
          </div>

          {/* Achievements Section */}
          <div>
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Achievements ({earnedAchievements.length}/{ACHIEVEMENTS.length})
            </h3>
            {earnedAchievements.length === 0 ? (
              <p className="text-sm text-muted-foreground py-2">
                No achievements yet. Keep exploring to unlock them!
              </p>
            ) : (
              <div className="grid gap-2">
                {earnedAchievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex items-center gap-3 rounded-lg bg-muted/30 p-3"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20">
                      <IconMap
                        name={achievement.icon}
                        className="h-4 w-4 text-primary"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {achievement.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {achievement.description}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-xs shrink-0">
                      +{achievement.xpReward}
                    </Badge>
                  </div>
                ))}
              </div>
            )}

            {/* Locked achievements preview */}
            {earnedAchievements.length < ACHIEVEMENTS.length && (
              <div className="mt-3">
                <p className="text-xs text-muted-foreground mb-2">
                  Locked ({ACHIEVEMENTS.length - earnedAchievements.length} remaining)
                </p>
                <div className="grid gap-1">
                  {ACHIEVEMENTS.filter(
                    (a) => !progress.achievements.includes(a.id)
                  ).map((achievement) => (
                    <div
                      key={achievement.id}
                      className="flex items-center gap-3 rounded-lg bg-muted/10 p-2 opacity-50"
                    >
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted">
                        <IconMap
                          name={achievement.icon}
                          className="h-3 w-3 text-muted-foreground"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {achievement.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Recent Scores Section */}
          {(recentQuizScores.length > 0 || recentGameScores.length > 0) && (
            <div>
              <h3 className="text-sm font-semibold mb-3">Recent Scores</h3>

              {recentQuizScores.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
                    Quizzes
                  </p>
                  <div className="grid gap-1.5">
                    {recentQuizScores.map((score, i) => (
                      <div
                        key={`quiz-${i}`}
                        className="flex items-center justify-between rounded-md bg-muted/20 px-3 py-2 text-sm"
                      >
                        <span className="capitalize text-muted-foreground">
                          {score.difficulty}
                        </span>
                        <span className="font-mono font-medium">
                          {score.score}/{score.total}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {recentGameScores.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
                    Sorting Game
                  </p>
                  <div className="grid gap-1.5">
                    {recentGameScores.map((score, i) => (
                      <div
                        key={`game-${i}`}
                        className="flex items-center justify-between rounded-md bg-muted/20 px-3 py-2 text-sm"
                      >
                        <span className="text-muted-foreground">
                          Streak: {score.bestStreak}
                        </span>
                        <span className="font-mono font-medium">
                          {score.score}/{score.total}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
