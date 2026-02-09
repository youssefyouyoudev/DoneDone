import { configureStore } from '@reduxjs/toolkit'
import tasksReducer, { persistTasksMiddleware } from './tasksSlice'

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistTasksMiddleware),
})
