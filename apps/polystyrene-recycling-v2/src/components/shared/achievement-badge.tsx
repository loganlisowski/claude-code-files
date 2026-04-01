"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconMap } from "@/components/shared/IconMap";
import { Lock } from "lucide-react";

export interface BadgeDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  gradient: string;
  borderColor: string;
  glowColor: string;
}

const BADGE_DEFINITIONS: BadgeDefinition[] = [
  {
    id: "quiz-master",
    name: "Quiz Master",
    description: "Score 90%+ on any quiz",
    icon: "Star",
    gradient: "from-yellow-500 to-amber-600",
    borderColor: "border-yellow-500/50",
    glowColor: "shadow-yellow-500/25",
  },
  {
    id: "sorting-pro",
    name: "Sorting Pro",
    description: "Get a perfect score on the sorting game",
    icon: "Gamepad2",
    gradient: "from-green-500 to-emerald-600",
    borderColor: "border-green-500/50",
    glowColor: "shadow-green-500/25",
  },
  {
    id: "fact-hunter",
    name: "Fact Hunter",
    description: "View all 30+ fun facts",
    icon: "BookOpen",
    gradient: "from-blue-500 to-cyan-600",
    borderColor: "border-blue-500/50",
    glowColor: "shadow-blue-500/25",
  },
  {
    id: "myth-buster-badge",
    name: "Myth Buster",
    description: "Debunk all myths",
    icon: "ShieldCheck",
    gradient: "from-purple-500 to-violet-600",
    borderColor: "border-purple-500/50",
    glowColor: "shadow-purple-500/25",
  },
  {
    id: "seven-day-streak",
    name: "7-Day Streak",
    description: "Visit 7 days in a row",
    icon: "Flame",
    gradient: "from-orange-500 to-red-600",
    borderColor: "border-orange-500/50",
    glowColor: "shadow-orange-500/25",
  },
  {
    id: "recycling-champion",
    name: "Recycling Champion",
    description: "Complete all activities",
    icon: "Award",
    gradient: "from-pink-500 to-rose-600",
    borderColor: "border-pink-500/50",
    glowColor: "shadow-pink-500/25",
  },
];

interface AchievementBadgeProps {
  badge: BadgeDefinition;
  earned: boolean;
  index?: number;
}

export function AchievementBadge({ badge, earned, index = 0 }: AchievementBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={cn(
        "relative rounded-2xl border-2 p-5 text-center transition-all duration-300",
        earned
          ? cn("bg-gradient-to-br from-card to-muted/50", badge.borderColor, "shadow-lg", badge.glowColor)
          : "border-border/30 bg-muted/20 opacity-60"
      )}
    >
      {/* Badge Icon */}
      <div
        className={cn(
          "w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center",
          earned
            ? cn("bg-gradient-to-br", badge.gradient)
            : "bg-muted/50"
        )}
      >
        {earned ? (
          <IconMap name={badge.icon} className="h-8 w-8 text-white" />
        ) : (
          <Lock className="h-7 w-7 text-muted-foreground/50" />
        )}
      </div>

      {/* Badge Name */}
      <h3 className={cn(
        "font-bold text-sm mb-1",
        earned ? "text-foreground" : "text-muted-foreground"
      )}>
        {badge.name}
      </h3>

      {/* Description */}
      <p className="text-xs text-muted-foreground leading-snug">
        {badge.description}
      </p>

      {/* Earned indicator */}
      {earned && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 15, delay: index * 0.08 + 0.3 }}
          className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-green-500 flex items-center justify-center shadow-md"
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
}

interface AchievementBadgeGridProps {
  earnedBadgeIds: string[];
  className?: string;
}

export function AchievementBadgeGrid({ earnedBadgeIds, className }: AchievementBadgeGridProps) {
  return (
    <div className={cn("grid grid-cols-2 sm:grid-cols-3 gap-4", className)}>
      {BADGE_DEFINITIONS.map((badge, i) => (
        <AchievementBadge
          key={badge.id}
          badge={badge}
          earned={earnedBadgeIds.includes(badge.id)}
          index={i}
        />
      ))}
    </div>
  );
}

export { BADGE_DEFINITIONS };
