"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Trophy, Heart, Sparkles } from "lucide-react"

interface AchievementBadgeProps {
  goalMet: boolean
  loveCount: number
  loveTarget: number
  houseworkCount: number
  houseworkTarget: number
  totalWeeksCompleted: number
}

export function AchievementBadge({
  goalMet,
  loveCount,
  loveTarget,
  houseworkCount,
  houseworkTarget,
  totalWeeksCompleted,
}: AchievementBadgeProps) {
  return (
    <div className="mt-6 mb-2">
      <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span className="text-sm font-bold text-foreground">Weekly Goal</span>
          {totalWeeksCompleted > 0 && (
            <span className="ml-auto flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              <Trophy className="w-3 h-3" />
              {totalWeeksCompleted}x
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 min-w-[100px]">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span className="text-xs font-semibold text-muted-foreground">Oh Baby</span>
            </div>
            <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-rose-400"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((loveCount / loveTarget) * 100, 100)}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            <span className="text-xs font-bold text-muted-foreground min-w-[32px] text-right">
              {Math.min(loveCount, loveTarget)}/{loveTarget}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 min-w-[100px]">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              <span className="text-xs font-semibold text-muted-foreground">Honey-Do</span>
            </div>
            <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-pink-400"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((houseworkCount / houseworkTarget) * 100, 100)}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            <span className="text-xs font-bold text-muted-foreground min-w-[32px] text-right">
              {Math.min(houseworkCount, houseworkTarget)}/{houseworkTarget}
            </span>
          </div>
        </div>

        <AnimatePresence>
          {goalMet && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 pt-3 border-t border-border"
            >
              <motion.div
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-50 to-rose-50 rounded-xl py-2.5 px-4 border border-amber-200"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Trophy className="w-5 h-5 text-amber-500" />
                <span className="text-sm font-extrabold text-amber-700">
                  Weekly Goal Achieved!
                </span>
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
