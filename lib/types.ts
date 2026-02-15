export type TaskCategory = "housework" | "love" | "busytime"

export interface Task {
  id: string
  text: string
  category: TaskCategory
  completed: boolean
  createdAt: number
}

export const CATEGORIES: Record<
  TaskCategory,
  { label: string; color: string; bgColor: string; borderColor: string }
> = {
  housework: {
    label: "Honey-Do List",
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
  },
  love: {
    label: "Oh Baby List",
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
  },
  busytime: {
    label: "Busy Boy List",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
  },
}
