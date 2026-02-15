"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Flame, BriefcaseBusiness } from "lucide-react"
import type { Task, TaskCategory } from "@/lib/types"
import { CATEGORIES } from "@/lib/types"
import { TaskItem } from "./task-item"

const categoryIcons: Record<TaskCategory, React.ReactNode> = {
  housework: <Sparkles className="w-5 h-5" />,
  love: <Flame className="w-5 h-5" />,
  busytime: <BriefcaseBusiness className="w-5 h-5" />,
}

const throbAnimation = {
  initial: { opacity: 0, y: 15, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: [0.95, 1.04, 0.98, 1],
    transition: {
      duration: 0.6,
      ease: "easeOut",
      scale: { duration: 0.7, times: [0, 0.4, 0.7, 1] },
    },
  },
}

const badgeThrobAnimation = {
  animate: {
    scale: [1, 1.08, 1, 1.05, 1],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      repeatDelay: 3,
      ease: "easeInOut",
    },
  },
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
      variants={throbAnimation}
      initial="initial"
      animate="animate"
    >
      <div className="flex items-center justify-between mb-3">
        <motion.div
          className="flex items-center gap-3"
          variants={badgeThrobAnimation}
          animate="animate"
        >
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl ${config.bgColor} ${config.color} ${config.borderColor} border-2 shadow-sm`}
          >
            {categoryIcons[category]}
            <span className="font-extrabold text-base tracking-tight">{config.label}</span>
          </div>
        </motion.div>
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
