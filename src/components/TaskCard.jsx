import PriorityBadge from './PriorityBadge'

export default function TaskCard({ task, onToggleComplete, onRemove, onEdit }) {
  const { title, description, tags = [], dueDate, priority, completed, status } = task

  return (
    <article className={`task-card ${completed ? 'is-complete' : ''}`}>
      <header className="task-card__header">
        <div className="task-card__title-row">
          <input type="checkbox" checked={completed} onChange={onToggleComplete} aria-label={`Mark ${title} as complete`} />
          <div>
            <p className="task-card__status">{status === 'done' ? 'Done' : status === 'in-progress' ? 'In Progress' : 'To Do'}</p>
            <h3>{title}</h3>
          </div>
        </div>
        <PriorityBadge level={priority} />
      </header>

      {description ? <p className="task-card__description">{description}</p> : null}

      <footer className="task-card__footer">
        <div className="task-card__tags">
          {tags.map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>
        <div className="task-card__meta">
          {dueDate ? <span className="pill">Due {dueDate}</span> : null}
          <button className="ghost" onClick={onToggleComplete}>
            {completed ? 'Reopen' : 'Complete'}
          </button>
          {onEdit ? (
            <button className="ghost" onClick={onEdit}>
              Edit
            </button>
          ) : null}
          {onRemove ? (
            <button className="ghost danger" onClick={onRemove}>
              Remove
            </button>
          ) : null}
        </div>
      </footer>
    </article>
  )
}
