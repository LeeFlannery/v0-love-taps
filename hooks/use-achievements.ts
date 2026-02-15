"use client"

import { useState, useEffect, useCallback } from "react"
import type { Task } from "@/lib/types"

const ACHIEVEMENT_KEY = "love-taps-achievements"

interface AchievementState {
  weeklyGoalMet: boolean
  lastCelebrated: number | null
  totalWeeksCompleted: number
}

function getStartOfWeek(): number {
  const now = new Date()
  const day = now.getDay()
  const diff = now.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(now.setHours(0, 0, 0, 0))
  monday.setDate(diff)
  return monday.getTime()
}

function loadAchievements(): AchievementState {
  if (typeof window === "undefined")
    return { weeklyGoalMet: false, lastCelebrated: null, totalWeeksCompleted: 0 }
  try {
    const stored = localStorage.getItem(ACHIEVEMENT_KEY)
    return stored
      ? JSON.parse(stored)
      : { weeklyGoalMet: false, lastCelebrated: null, totalWeeksCompleted: 0 }
  } catch {
    return { weeklyGoalMet: false, lastCelebrated: null, totalWeeksCompleted: 0 }
  }
}

function saveAchievements(state: AchievementState) {
  if (typeof window === "undefined") return
  localStorage.setItem(ACHIEVEMENT_KEY, JSON.stringify(state))
}

export function useAchievements(tasks: Task[]) {
  const [achievement, setAchievement] = useState<AchievementState>(loadAchievements)
  const [showCelebration, setShowCelebration] = useState(false)

  const weekStart = getStartOfWeek()

  const completedThisWeek = tasks.filter(
    (t) => t.completed && t.createdAt >= weekStart
  )
  const loveCount = completedThisWeek.filter((t) => t.category === "love").length
  const houseworkCount = completedThisWeek.filter((t) => t.category === "housework").length

  const goalMet = loveCount >= 3 && houseworkCount >= 1

  useEffect(() => {
    if (goalMet && (!achievement.lastCelebrated || achievement.lastCelebrated < weekStart)) {
      const newState: AchievementState = {
        weeklyGoalMet: true,
        lastCelebrated: Date.now(),
        totalWeeksCompleted: achievement.totalWeeksCompleted + 1,
      }
      setAchievement(newState)
      saveAchievements(newState)
      setShowCelebration(true)
    }
  }, [goalMet, achievement.lastCelebrated, achievement.totalWeeksCompleted, weekStart])

  const dismissCelebration = useCallback(() => {
    setShowCelebration(false)
  }, [])

  return {
    goalMet,
    loveCount,
    houseworkCount,
    loveTarget: 3,
    houseworkTarget: 1,
    totalWeeksCompleted: achievement.totalWeeksCompleted,
    showCelebration,
    dismissCelebration,
  }
}
