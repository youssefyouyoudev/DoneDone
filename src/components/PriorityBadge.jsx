const palette = {
  high: { bg: 'var(--red-soft)', dot: 'var(--red-strong)' },
  medium: { bg: 'var(--amber-soft)', dot: 'var(--amber-strong)' },
  low: { bg: 'var(--green-soft)', dot: 'var(--green-strong)' },
}

export default function PriorityBadge({ level }) {
  const tones = palette[level] || palette.medium
  return (
    <span className="priority-badge" style={{ backgroundColor: tones.bg }}>
      <span className="priority-dot" style={{ backgroundColor: tones.dot }} />
      <span className="priority-text">{level} priority</span>
    </span>
  )
}
