import TagFilter from './TagFilter'

const priorities = [
  { value: 'all', label: 'All priorities' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
]

export default function FilterBar({ tags, filters, onFiltersChange }) {
  const update = (patch) => onFiltersChange({ ...filters, ...patch })

  return (
    <div className="filter-card card">
      <div className="filter-row">
        <div className="form-group">
          <label htmlFor="search">Search</label>
          <input
            id="search"
            type="text"
            placeholder="Search title or description"
            value={filters.search}
            onChange={(e) => update({ search: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select id="priority" value={filters.priority} onChange={(e) => update({ priority: e.target.value })}>
            {priorities.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <TagFilter
        tags={tags}
        activeTags={filters.tags}
        onToggle={(tag) =>
          update({ tags: filters.tags.includes(tag) ? filters.tags.filter((t) => t !== tag) : [...filters.tags, tag] })
        }
      />

      <div className="filter-actions">
        <button className="ghost" onClick={() => update({ search: '', priority: 'all', tags: [] })}>
          Reset filters
        </button>
      </div>
    </div>
  )
}
