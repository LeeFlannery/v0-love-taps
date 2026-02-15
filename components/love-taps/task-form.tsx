"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Heart, Sparkles, Flame, BriefcaseBusiness } from "lucide-react"
import type { TaskCategory } from "@/lib/types"

const categoryOptions: { value: TaskCategory; label: string; desc: string; icon: React.ReactNode }[] = [
  { value: "housework", label: "Honey-Do", desc: "Chores & errands", icon: <Sparkles className="w-4 h-4" /> },
  { value: "love", label: "Oh Baby", desc: "Romance & sweet stuff", icon: <Flame className="w-4 h-4" /> },
  { value: "busytime", label: "Busy Boy", desc: "Work & appointments", icon: <BriefcaseBusiness className="w-4 h-4" /> },
]

interface TaskFormProps {
  onAddTask: (text: string, category: TaskCategory) => void
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [text, setText] = useState("")
  const [category, setCategory] = useState<TaskCategory>("housework")
  const [isExpanded, setIsExpanded] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!text.trim()) return
    onAddTask(text.trim(), category)
    setText("")
    setIsExpanded(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-card rounded-2xl border border-border shadow-sm p-4"
      >
        <div
          className="flex items-center gap-3 cursor-text"
          onClick={() => setIsExpanded(true)}
        >
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Plus className="w-5 h-5 text-primary" />
          </div>
          <input
            type="text"
            placeholder="Add a love tap..."
            value={text}
            onChange={(e) => {
              setText(e.target.value)
              if (!isExpanded) setIsExpanded(true)
            }}
            onFocus={() => setIsExpanded(true)}
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-base outline-none font-medium"
          />
        </div>

        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="pt-4 flex flex-col gap-3">
            <div className="flex gap-2">
              {categoryOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setCategory(opt.value)}
                  className={`flex-1 flex flex-col items-center gap-1 py-3 px-2 rounded-xl text-sm font-semibold transition-all ${
                    category === opt.value
                      ? opt.value === "housework"
                        ? "bg-pink-100 text-pink-700 border-2 border-pink-300"
                        : opt.value === "love"
                        ? "bg-rose-100 text-rose-700 border-2 border-rose-300"
                        : "bg-amber-100 text-amber-700 border-2 border-amber-300"
                      : "bg-secondary text-muted-foreground border-2 border-transparent"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {opt.icon}
                    {opt.label}
                  </span>
                  <span className={`text-[11px] font-medium leading-tight ${
                    category === opt.value ? "opacity-80" : "opacity-50"
                  }`}>
                    {opt.desc}
                  </span>
                </button>
              ))}
            </div>

            <motion.button
              type="submit"
              whileTap={{ scale: 0.97 }}
              disabled={!text.trim()}
              className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-base disabled:opacity-40 disabled:cursor-not-allowed transition-opacity shadow-lg shadow-primary/25"
            >
              <span className="flex items-center justify-center gap-2">
                <Heart className="w-4 h-4 fill-current" />
                Add Love Tap
              </span>
            </motion.button>
          </div>
        </motion.div>
      </form>
    </motion.div>
  )
}
