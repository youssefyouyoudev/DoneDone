export default function QuickInsights({ items }) {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <p className="eyebrow">Smart suggestions</p>
          <h3>High priority due today</h3>
        </div>
        <span className="pill">{items.length}</span>
      </div>
      {items.length === 0 ? <p className="muted">No urgent tasks left today. Nice.</p> : null}
      <ul className="insights-list">
        {items.map((task) => (
          <li key={task.id}>
            <div>
              <p className="eyebrow">{task.tags.join(', ') || 'untagged'}</p>
              <p className="strong">{task.title}</p>
            </div>
            <span className="pill pill--accent">Due {task.dueDate}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
