import { createSelector, createSlice, nanoid } from '@reduxjs/toolkit'
import { loadTasks, saveTasks } from '../services/storage'

export const statusMap = {
  todo: 'To Do',
  'in-progress': 'In Progress',
  done: 'Done',
}

export const statusOrder = ['todo', 'in-progress', 'done']

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

const initialState = {
  items: loadTasks(),
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.items.unshift(action.payload)
      },
      prepare(payload) {
        const id = nanoid()
        const createdAt = normalizeDateString(payload.createdAt) || normalizeDateString(new Date())
        const dueDate = normalizeDateString(payload.dueDate)
        const status = payload.status || 'todo'
        return {
          payload: {
            id,
            title: payload.title.trim(),
            description: payload.description?.trim() || '',
            completed: status === 'done' || false,
            priority: payload.priority || 'medium',
            tags: payload.tags || [],
            dueDate,
            createdAt,
            status,
            completedAt: status === 'done' ? normalizeDateString(new Date()) : null,
          },
        }
      },
    },
    updateTask(state, action) {
      const { id, updates } = action.payload
      const task = state.items.find((item) => item.id === id)
      if (!task) return
      const nextStatus = updates.status || task.status
      task.title = (updates.title ?? task.title).trim()
      task.description = updates.description?.trim() ?? task.description
      task.priority = updates.priority || task.priority
      task.tags = updates.tags || task.tags
      task.dueDate = normalizeDateString(updates.dueDate || task.dueDate)
      task.status = nextStatus
      task.completed = nextStatus === 'done'
      task.completedAt = task.completed ? normalizeDateString(new Date()) : null
    },
    removeTask(state, action) {
      const id = action.payload
      state.items = state.items.filter((task) => task.id !== id)
    },
    toggleComplete(state, action) {
      const id = action.payload
      const task = state.items.find((item) => item.id === id)
      if (!task) return
      task.completed = !task.completed
      task.status = task.completed ? 'done' : 'todo'
      task.completedAt = task.completed ? normalizeDateString(new Date()) : null
    },
    moveTask(state, action) {
      const { id, status } = action.payload
      const task = state.items.find((item) => item.id === id)
      if (!task || !statusOrder.includes(status)) return
      task.status = status
      task.completed = status === 'done'
      task.completedAt = task.completed ? normalizeDateString(new Date()) : null
    },
  },
})

export const { addTask, updateTask, removeTask, toggleComplete, moveTask } = tasksSlice.actions

const selectTaskItems = (state) => state.tasks.items

export const selectTasksSorted = createSelector([selectTaskItems], (items) =>
  [...items].sort((a, b) => {
    const priorityRank = { high: 0, medium: 1, low: 2 }
    if (priorityRank[a.priority] !== priorityRank[b.priority]) return priorityRank[a.priority] - priorityRank[b.priority]
    if (statusOrder.indexOf(a.status) !== statusOrder.indexOf(b.status))
      return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
  }),
)

export const selectAllTags = createSelector([selectTaskItems], (items) => Array.from(new Set(items.flatMap((task) => task.tags || []))))

export const selectWeekStats = createSelector([selectTaskItems], (items) => computeWeekStats(items))

export const selectHighPriorityDueToday = createSelector([selectTaskItems], (items) => {
  const todayKey = normalizeDateString(new Date())
  return items.filter((task) => task.priority === 'high' && task.dueDate === todayKey && !task.completed)
})

export default tasksSlice.reducer

export function persistTasksMiddleware(store) {
  return (next) => (action) => {
    const result = next(action)
    if (action.type.startsWith('tasks/')) {
      const state = store.getState()
      saveTasks(state.tasks.items)
    }
    return result
  }
}
