"use client"

import { useState, useEffect, useCallback } from "react"
import type { Task, TaskCategory } from "@/lib/types"

const STORAGE_KEY = "love-taps-tasks"

function loadTasks(): Task[] {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveTasks(tasks: Task[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setTasks(loadTasks())
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      saveTasks(tasks)
    }
  }, [tasks, isLoaded])

  const addTask = useCallback((text: string, category: TaskCategory) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      category,
      completed: false,
      createdAt: Date.now(),
    }
    setTasks((prev) => [newTask, ...prev])
  }, [])

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }, [])

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }, [])

  const getTasksByCategory = useCallback(
    (category: TaskCategory) => {
      return tasks.filter((task) => task.category === category)
    },
    [tasks]
  )

  return { tasks, isLoaded, addTask, toggleTask, deleteTask, getTasksByCategory }
}
