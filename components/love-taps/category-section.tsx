"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Home, Heart, Calendar } from "lucide-react"
import type { Task, TaskCategory } from "@/lib/types"
import { CATEGORIES } from "@/lib/types"
import { TaskItem } from "./task-item"

const categoryIcons: Record<TaskCategory, React.ReactNode> = {
  housework: <Home className="w-5 h-5" />,
  love: <Heart className="w-5 h-5 fill-current" />,
  busytime: <Calendar className="w-5 h-5" />,
}

interface CategorySectionProps {
  category: TaskCategory
  tasks: Task[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function CategorySection({
  category,
  tasks,
  onToggle,
  onDelete,
}: CategorySectionProps) {
  const config = CATEGORIES[category]
  const completedCount = tasks.filter((t) => t.completed).length
  const totalCount = tasks.length

  if (totalCount === 0) return null

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-9 h-9 rounded-xl ${config.bgColor} flex items-center justify-center ${config.color}`}
          >
            {categoryIcons[category]}
          </div>
          <h2 className="text-lg font-bold text-foreground">{config.label}</h2>
        </div>
        <span className="text-sm font-semibold text-muted-foreground">
          {completedCount}/{totalCount}
        </span>
      </div>

      {totalCount > 0 && (
        <div className="mb-3 h-1.5 rounded-full bg-secondary overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{
              width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%`,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <AnimatePresence mode="popLayout">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.section>
  )
}
