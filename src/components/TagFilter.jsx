export default function TagFilter({ tags, activeTags, onToggle }) {
  if (!tags.length) return null
  return (
    <div className="filter-group">
      <p className="filter-label">Tags</p>
      <div className="filter-row">
        {tags.map((tag) => (
          <button
            key={tag}
            className={`pill ${activeTags.includes(tag) ? 'pill--active' : ''}`}
            onClick={() => onToggle(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}
