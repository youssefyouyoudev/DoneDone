import { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import Board from './pages/Board'
import Settings from './pages/Settings'
import ThemeToggle from './components/ThemeToggle'
import Tasks from './pages/Tasks'
import TaskModal from './components/TaskModal'
import { updateTask } from './store/tasksSlice'
import logo from './assets/donedone-logo.svg'
import Landing from './pages/Landing'

const views = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'tasks', label: 'Tasks' },
  { key: 'board', label: 'Board' },
  { key: 'settings', label: 'Settings' },
]

export default function App() {
  const [filters, setFilters] = useState({ search: '', priority: 'all', tags: [] })
  const [editingTask, setEditingTask] = useState(null)
  const dispatch = useDispatch()
  const location = useLocation()

  const activeKey = useMemo(() => {
    if (location.pathname.startsWith('/tasks')) return 'tasks'
    if (location.pathname.startsWith('/board')) return 'board'
    if (location.pathname.startsWith('/settings')) return 'settings'
    return 'dashboard'
  }, [location.pathname])

  const handleSaveTask = (updates) => {
    if (!editingTask) return
    dispatch(updateTask({ id: editingTask.id, updates }))
    setEditingTask(null)
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <NavLink to="/dashboard" className="brand__link">
            <img src={logo} alt="DoneDone logo" className="brand__logo" />
          </NavLink>
          <div>
            <p className="eyebrow">DoneDone</p>
            {/* <h2>Smart To-Do</h2> */}
          </div>
        </div>
        <nav className="nav">
          {views.map((view) => (
            <NavLink key={view.key} to={`/${view.key}`} className={({ isActive }) => `nav__item ${isActive ? 'active' : ''}`}>
              {view.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar__footer">
          <ThemeToggle />
        </div>
      </aside>

      <main className="content">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard filters={filters} onFiltersChange={setFilters} onEditTask={setEditingTask} />} />
          <Route path="/tasks" element={<Tasks filters={filters} onFiltersChange={setFilters} onEditTask={setEditingTask} />} />
          <Route path="/board" element={<Board filters={filters} onEditTask={setEditingTask} />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to={`/${activeKey}`} replace />} />
        </Routes>
      </main>

      <div className="floating-toggle" aria-hidden="false">
        <ThemeToggle />
      </div>

      <TaskModal task={editingTask} onClose={() => setEditingTask(null)} onSave={handleSaveTask} />
    </div>
  )
}
