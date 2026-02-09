import { useDispatch, useSelector } from 'react-redux'
import FilterBar from '../components/FilterBar'
import QuickInsights from '../components/QuickInsights'
import StatsChart from '../components/StatsChart'
import StatsSummary from '../components/StatsSummary'
import TaskCard from '../components/TaskCard'
import TaskForm from '../components/TaskForm'
import {
  addTask,
  removeTask,
  selectAllTags,
  selectHighPriorityDueToday,
  selectTasksSorted,
  selectWeekStats,
  toggleComplete,
} from '../store/tasksSlice'

function applyFilters(tasks, filters) {
  return tasks.filter((task) => {
    if (filters.search && !`${task.title} ${task.description}`.toLowerCase().includes(filters.search.toLowerCase())) return false
    if (filters.priority !== 'all' && task.priority !== filters.priority) return false
    if (filters.tags.length && !filters.tags.every((tag) => task.tags.includes(tag))) return false
    return true
  })
}

export default function Dashboard({ filters, onFiltersChange, onEditTask }) {
  const dispatch = useDispatch()
  const weekStats = useSelector(selectWeekStats)
  const tasks = useSelector(selectTasksSorted)
  const highPriorityDueToday = useSelector(selectHighPriorityDueToday)
  const allTags = useSelector(selectAllTags)
  const filtered = applyFilters(tasks, filters)
  const focus = filtered.filter((task) => task.status !== 'done').slice(0, 4)

  return (
    <div className="page">
      <section className="hero card">
        <div>
          <p className="eyebrow">Smart To-Do 2.0</p>
          <h1>Plan, execute, and see momentum.</h1>
          <p className="muted">Tags, priority, Kanban, analytics, and local persistence. Built like a real SaaS, not a toy.</p>
        </div>
      </section>

      <StatsSummary created={weekStats.createdTotal} completed={weekStats.completedTotal} productivity={weekStats.productivity} />

      <div className="grid two">
        <StatsChart data={weekStats.trend} />
        <QuickInsights items={highPriorityDueToday} />
      </div>

      <FilterBar tags={allTags} filters={filters} onFiltersChange={onFiltersChange} />

      <div className="grid two">
        <TaskForm onAdd={(payload) => dispatch(addTask(payload))} />
        <div className="card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Focus queue</p>
              <h3>Next up</h3>
            </div>
            <span className="pill">{focus.length}</span>
          </div>
          <div className="stack">
            {focus.length === 0 ? <p className="muted">No tasks match your filters.</p> : null}
            {focus.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={() => dispatch(toggleComplete(task.id))}
                onRemove={() => dispatch(removeTask(task.id))}
                onEdit={() => onEditTask(task)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
