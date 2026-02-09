export default function StatsSummary({ created, completed, productivity }) {
  const cards = [
    { label: 'Created', value: created, hint: 'Tasks opened this week' },
    { label: 'Completed', value: completed, hint: 'Shipped to done' },
    { label: 'Productivity', value: `${productivity}%`, hint: 'Completion rate' },
  ]

  return (
    <div className="stats-grid">
      {cards.map((card) => (
        <div key={card.label} className="card">
          <p className="eyebrow">{card.label}</p>
          <h2>{card.value}</h2>
          <p className="muted">{card.hint}</p>
        </div>
      ))}
    </div>
  )
}
