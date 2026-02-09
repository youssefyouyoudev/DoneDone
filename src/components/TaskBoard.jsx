import { DndContext, PointerSensor, useDraggable, useSensor, useSensors } from '@dnd-kit/core'
import { useDispatch, useSelector } from 'react-redux'
import BoardColumn from './BoardColumn'
import TaskCard from './TaskCard'
import { moveTask, removeTask, selectTasksSorted, statusMap, toggleComplete } from '../store/tasksSlice'

function DraggableCard({ task, onToggleComplete, onRemove, onEdit }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: { status: task.status },
  })

  const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`draggable ${isDragging ? 'is-dragging' : ''}`}
      {...attributes}
      {...listeners}
    >
      <TaskCard task={task} onToggleComplete={onToggleComplete} onRemove={onRemove} onEdit={onEdit} />
    </div>
  )
}

export default function TaskBoard({ filters, onEditTask }) {
  const dispatch = useDispatch()
  const tasks = useSelector(selectTasksSorted)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  )

  const filtered = tasks.filter((task) => {
    if (filters.search && !`${task.title} ${task.description}`.toLowerCase().includes(filters.search.toLowerCase())) return false
    if (filters.priority && filters.priority !== 'all' && task.priority !== filters.priority) return false
    if (filters.tags.length && !filters.tags.every((tag) => task.tags.includes(tag))) return false
    return true
  })

  const grouped = {
    todo: filtered.filter((task) => task.status === 'todo'),
    'in-progress': filtered.filter((task) => task.status === 'in-progress'),
    done: filtered.filter((task) => task.status === 'done'),
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over || active.data.current?.status === over.id) return
    dispatch(moveTask({ id: active.id, status: over.id }))
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="board-grid">
        {Object.entries(grouped).map(([status, items]) => (
          <BoardColumn key={status} status={status} title={statusMap[status]} count={items.length}>
            {items.map((task) => (
              <DraggableCard
                key={task.id}
                task={task}
                onToggleComplete={() => dispatch(toggleComplete(task.id))}
                onRemove={() => dispatch(removeTask(task.id))}
                onEdit={() => onEditTask(task)}
              />
            ))}
          </BoardColumn>
        ))}
      </div>
    </DndContext>
  )
}
