"use client"

import { motion } from "framer-motion"
import { Trash2, Heart } from "lucide-react"
import type { Task } from "@/lib/types"

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.95, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group"
    >
      <div
        className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300 ${
          task.completed
            ? "bg-muted/50 opacity-60"
            : "bg-card border border-border shadow-sm"
        }`}
      >
        <motion.button
          type="button"
          whileTap={{ scale: 0.85 }}
          onClick={() => onToggle(task.id)}
          className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
            task.completed
              ? "bg-primary border-primary"
              : "border-border hover:border-primary/50"
          }`}
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {task.completed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <Heart className="w-3.5 h-3.5 text-primary-foreground fill-current" />
            </motion.div>
          )}
        </motion.button>

        <span
          className={`flex-1 text-base font-medium transition-all duration-300 ${
            task.completed
              ? "line-through text-muted-foreground"
              : "text-foreground"
          }`}
        >
          {task.text}
        </span>

        <motion.button
          type="button"
          whileTap={{ scale: 0.85 }}
          onClick={() => onDelete(task.id)}
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground opacity-40 md:opacity-0 group-hover:opacity-100 focus:opacity-100 hover:bg-destructive/10 hover:text-destructive active:bg-destructive/10 active:text-destructive transition-all"
          aria-label="Delete task"
        >
          <Trash2 className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}
