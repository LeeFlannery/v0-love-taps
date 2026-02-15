"use client"

import { useTasks } from "@/hooks/use-tasks"
import { useAchievements } from "@/hooks/use-achievements"
import { Header } from "./header"
import { TaskForm } from "./task-form"
import { CategorySection } from "./category-section"
import { EmptyState } from "./empty-state"
import { AchievementBadge } from "./achievement-badge"
import { Fireworks } from "./fireworks"
import { LoveBlobs } from "./love-blobs"
import type { TaskCategory } from "@/lib/types"

const categoryOrder: TaskCategory[] = ["love", "housework", "busytime"]

export function LoveTaps() {
  const { tasks, isLoaded, addTask, toggleTask, deleteTask, getTasksByCategory } =
    useTasks()

  const {
    goalMet,
    loveCount,
    houseworkCount,
    loveTarget,
    houseworkTarget,
    totalWeeksCompleted,
    showCelebration,
    dismissCelebration,
    resetWeeklyGoal,
  } = useAchievements(tasks)

  const completedCount = tasks.filter((t) => t.completed).length

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  const hasTasks = tasks.length > 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-200 via-rose-100 to-pink-50">
      <Fireworks show={showCelebration} onDone={dismissCelebration} />

      <div className="max-w-lg mx-auto px-4 pb-12">
        <Header />

        <LoveBlobs taskCount={completedCount} goalMet={goalMet} />

        <TaskForm onAddTask={addTask} />

        <AchievementBadge
          goalMet={goalMet}
          loveCount={loveCount}
          loveTarget={loveTarget}
          houseworkCount={houseworkCount}
          houseworkTarget={houseworkTarget}
          totalWeeksCompleted={totalWeeksCompleted}
        />

        <div className="mt-6 flex flex-col gap-8">
          {hasTasks ? (
            categoryOrder.map((cat) => {
              const catTasks = getTasksByCategory(cat)
              return (
                <CategorySection
                  key={cat}
                  category={cat}
                  tasks={catTasks}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
              )
            })
          ) : (
            <EmptyState />
          )}
        </div>

        {hasTasks && (
          <p className="text-center text-sm text-muted-foreground mt-10 font-medium">
            {"Made with love for you & yours"}
          </p>
        )}

        <div className="mt-8 flex justify-center">
          <button
            onClick={resetWeeklyGoal}
            className="text-xs text-muted-foreground/40 hover:text-muted-foreground/70 active:text-muted-foreground transition-colors py-2 px-3"
          >
            reset weekly goal
          </button>
        </div>
      </div>
    </div>
  )
}
