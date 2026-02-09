import { useDroppable } from '@dnd-kit/core'

export default function BoardColumn({ status, title, count, children }) {
  const { setNodeRef, isOver } = useDroppable({ id: status })

  return (
    <section ref={setNodeRef} className={`board-column ${isOver ? 'board-column--active' : ''}`}>
      <header className="board-column__header">
        <div>
          <p className="eyebrow">{title}</p>
          <h3>{title}</h3>
        </div>
        <span className="pill">{count}</span>
      </header>
      <div className="board-column__body">{children}</div>
    </section>
  )
}
