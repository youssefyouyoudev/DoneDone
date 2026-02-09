import { useDispatch, useSelector } from 'react-redux'
import FilterBar from '../components/FilterBar'
import TaskCard from '../components/TaskCard'
import TaskForm from '../components/TaskForm'
import { addTask, removeTask, selectAllTags, selectTasksSorted, toggleComplete } from '../store/tasksSlice'

function applyFilters(tasks, filters) {
  return tasks.filter((task) => {
    if (filters.search && !`${task.title} ${task.description}`.toLowerCase().includes(filters.search.toLowerCase())) return false
    if (filters.priority !== 'all' && task.priority !== filters.priority) return false
    if (filters.tags.length && !filters.tags.every((tag) => task.tags.includes(tag))) return false
    return true
  })
}

export default function Tasks({ filters, onFiltersChange, onEditTask }) {
  const dispatch = useDispatch()
  const tasks = useSelector(selectTasksSorted)
  const allTags = useSelector(selectAllTags)
  const filtered = applyFilters(tasks, filters)

  return (
    <div className="page">
      <div className="card">
        <div className="card-header">
          <div>
            <p className="eyebrow">Tasks</p>
            <h2>Create and manage</h2>
            <p className="muted">Full CRUD powered by Redux Toolkit. Filter, edit, complete, or delete.</p>
          </div>
          <span className="pill">{filtered.length} shown</span>
        </div>
      </div>

      <TaskForm submitLabel="Create task" onAdd={(payload) => dispatch(addTask(payload))} />

      <FilterBar tags={allTags} filters={filters} onFiltersChange={onFiltersChange} />

      <div className="stack">
        {filtered.length === 0 ? <p className="muted">No tasks match your filters.</p> : null}
        {filtered.map((task) => (
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
  )
}
