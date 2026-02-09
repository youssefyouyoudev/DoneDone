import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { loadTasks, saveTasks } from '../services/storage'

const TaskContext = createContext()

const statusMap = {
  todo: 'To Do',
  'in-progress': 'In Progress',
  done: 'Done',
}

const statusOrder = ['todo', 'in-progress', 'done']

function normalizeDateString(date) {
  if (!date) return null
  return new Date(date).toISOString().slice(0, 10)
}

function computeWeekStats(tasks) {
  const today = new Date()
  const windowStart = new Date()
  windowStart.setDate(today.getDate() - 6)
  const days = []

  for (let i = 0; i < 7; i += 1) {
    const day = new Date(windowStart)
    day.setDate(windowStart.getDate() + i)
    const label = day.toLocaleDateString('en-US', { weekday: 'short' })
    const key = day.toISOString().slice(0, 10)
    days.push({ key, label, created: 0, completed: 0 })
  }

  const dataByKey = Object.fromEntries(days.map((d) => [d.key, d]))

  tasks.forEach((task) => {
    const createdKey = normalizeDateString(task.createdAt)
    if (createdKey && dataByKey[createdKey]) dataByKey[createdKey].created += 1
    const completedKey = normalizeDateString(task.completedAt)
    if (task.completed && completedKey && dataByKey[completedKey]) dataByKey[completedKey].completed += 1
  })

  const createdTotal = days.reduce((acc, d) => acc + d.created, 0)
  const completedTotal = days.reduce((acc, d) => acc + d.completed, 0)
  const productivity = createdTotal === 0 ? 0 : Math.round((completedTotal / createdTotal) * 100)

  return {
    trend: days,
    createdTotal,
    completedTotal,
    productivity,
  }
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => loadTasks())

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const addTask = (payload) => {
    const id = crypto.randomUUID ? crypto.randomUUID() : String(Date.now())
    const createdAt = normalizeDateString(payload.createdAt) || normalizeDateString(new Date())
    const dueDate = normalizeDateString(payload.dueDate)
    const nextTask = {
      id,
      title: payload.title.trim(),
      description: payload.description?.trim() || '',
      completed: false,
      priority: payload.priority || 'medium',
      tags: payload.tags || [],
      dueDate,
      createdAt,
      status: payload.status || 'todo',
      completedAt: null,
    }
    setTasks((prev) => [nextTask, ...prev])
  }

  const updateTask = (id, updates) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates, dueDate: normalizeDateString(updates.dueDate || task.dueDate) } : task)),
    )
  }

  const removeTask = (id) => setTasks((prev) => prev.filter((task) => task.id !== id))

  const moveTask = (id, nextStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status: nextStatus,
              completed: nextStatus === 'done' ? true : task.completed,
              completedAt: nextStatus === 'done' ? normalizeDateString(new Date()) : task.completed ? task.completedAt : null,
            }
          : task,
      ),
    )
  }

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              status: !task.completed ? 'done' : 'todo',
              completedAt: !task.completed ? normalizeDateString(new Date()) : null,
            }
          : task,
      ),
    )
  }

  const allTags = useMemo(() => Array.from(new Set(tasks.flatMap((task) => task.tags || []))), [tasks])
  const weekStats = useMemo(() => computeWeekStats(tasks), [tasks])

  const highPriorityDueToday = useMemo(() => {
    const todayKey = normalizeDateString(new Date())
    return tasks.filter((task) => task.priority === 'high' && task.dueDate === todayKey && !task.completed)
  }, [tasks])

  const sortedTasks = useMemo(
    () =>
      [...tasks].sort((a, b) => {
        const priorityRank = { high: 0, medium: 1, low: 2 }
        if (priorityRank[a.priority] !== priorityRank[b.priority]) return priorityRank[a.priority] - priorityRank[b.priority]
        if (statusOrder.indexOf(a.status) !== statusOrder.indexOf(b.status))
          return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      }),
    [tasks],
  )

  const value = {
    tasks: sortedTasks,
    rawTasks: tasks,
    statusMap,
    statusOrder,
    weekStats,
    allTags,
    highPriorityDueToday,
    addTask,
    updateTask,
    removeTask,
    toggleComplete,
    moveTask,
  }

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

export function useTasks() {
  const ctx = useContext(TaskContext)
  if (!ctx) throw new Error('useTasks must be used inside TaskProvider')
  return ctx
}
