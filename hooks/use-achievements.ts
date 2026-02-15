"use client"

import { useState, useEffect, useCallback } from "react"
import type { Task } from "@/lib/types"

const ACHIEVEMENT_KEY = "love-taps-achievements"

interface AchievementState {
  weeklyGoalMet: boolean
  lastCelebrated: number | null
  totalWeeksCompleted: number
  resetAt: number | null
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
  const defaultState: AchievementState = { weeklyGoalMet: false, lastCelebrated: null, totalWeeksCompleted: 0, resetAt: null }
  if (typeof window === "undefined") return defaultState
  try {
    const stored = localStorage.getItem(ACHIEVEMENT_KEY)
    if (!stored) return defaultState
    const parsed = JSON.parse(stored)
    return { ...defaultState, ...parsed }
  } catch {
    return defaultState
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

  const cutoff = achievement.resetAt && achievement.resetAt > weekStart
    ? achievement.resetAt
    : weekStart

  const completedThisWeek = tasks.filter(
    (t) => t.completed && t.createdAt >= cutoff
  )
  const loveCount = completedThisWeek.filter((t) => t.category === "love").length
  const houseworkCount = completedThisWeek.filter((t) => t.category === "housework").length

  const goalMet = loveCount >= 3 && houseworkCount >= 1

  useEffect(() => {
    if (goalMet && (!achievement.lastCelebrated || achievement.lastCelebrated < cutoff)) {
      const newState: AchievementState = {
        weeklyGoalMet: true,
        lastCelebrated: Date.now(),
        totalWeeksCompleted: achievement.totalWeeksCompleted + 1,
      }
      setAchievement(newState)
      saveAchievements(newState)
      setShowCelebration(true)
    }
  }, [goalMet, achievement.lastCelebrated, achievement.totalWeeksCompleted, cutoff])

  const dismissCelebration = useCallback(() => {
    setShowCelebration(false)
  }, [])

  const resetWeeklyGoal = useCallback(() => {
    const newState: AchievementState = {
      weeklyGoalMet: false,
      lastCelebrated: null,
      totalWeeksCompleted: achievement.totalWeeksCompleted,
      resetAt: Date.now(),
    }
    setAchievement(newState)
    saveAchievements(newState)
    setShowCelebration(false)
  }, [achievement.totalWeeksCompleted])

  return {
    goalMet,
    loveCount,
    houseworkCount,
    loveTarget: 3,
    houseworkTarget: 1,
    totalWeeksCompleted: achievement.totalWeeksCompleted,
    showCelebration,
    dismissCelebration,
    resetWeeklyGoal,
  }
}
