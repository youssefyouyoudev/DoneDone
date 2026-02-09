import { useSelector } from 'react-redux'
import TaskBoard from '../components/TaskBoard'
import { selectTasksSorted } from '../store/tasksSlice'

export default function Board({ filters, onEditTask }) {
  const tasks = useSelector(selectTasksSorted)
  const count = tasks.length

  return (
    <div className="page">
      <div className="card">
        <div className="card-header">
          <div>
            <p className="eyebrow">Kanban</p>
            <h2>Flow your work</h2>
          </div>
          <span className="pill">{count} tasks</span>
        </div>
      </div>
      <TaskBoard filters={filters} onEditTask={onEditTask} />
    </div>
  )
}
