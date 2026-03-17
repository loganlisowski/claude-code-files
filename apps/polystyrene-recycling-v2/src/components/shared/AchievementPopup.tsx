"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IconMap } from "@/components/shared/IconMap";
import type { Achievement } from "@/types/gamification";

interface AchievementPopupProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export function AchievementPopup({
  achievement,
  onClose,
}: AchievementPopupProps) {
  useEffect(() => {
    if (!achievement) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [achievement, onClose]);

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed right-4 top-20 z-[100] w-80 glass rounded-xl p-4 shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute right-2 top-2 rounded-sm p-1 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Close achievement popup"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/20">
              <IconMap
                name={achievement.icon}
                className="h-6 w-6 text-primary"
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-primary uppercase tracking-wider mb-1">
                Achievement Unlocked!
              </p>
              <h4 className="font-semibold text-foreground truncate">
                {achievement.name}
              </h4>
              <p className="text-sm text-muted-foreground mt-0.5">
                {achievement.description}
              </p>
              <Badge className="mt-2">+{achievement.xpReward} XP</Badge>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
