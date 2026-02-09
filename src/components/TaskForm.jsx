import { useEffect, useState } from 'react'

const defaults = { title: '', description: '', priority: 'medium', tags: [], dueDate: '', status: 'todo' }

export default function TaskForm({ onAdd, onSubmit, initialValues = defaults, submitLabel = 'Add task' }) {
  const [title, setTitle] = useState(initialValues.title || '')
  const [description, setDescription] = useState(initialValues.description || '')
  const [priority, setPriority] = useState(initialValues.priority || 'medium')
  const [tagsInput, setTagsInput] = useState((initialValues.tags || []).join(', '))
  const [dueDate, setDueDate] = useState(initialValues.dueDate || '')
  const [status, setStatus] = useState(initialValues.status || 'todo')

  useEffect(() => {
    setTitle(initialValues.title || '')
    setDescription(initialValues.description || '')
    setPriority(initialValues.priority || 'medium')
    setTagsInput((initialValues.tags || []).join(', '))
    setDueDate(initialValues.dueDate || '')
    setStatus(initialValues.status || 'todo')
  }, [initialValues])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!title.trim()) return
    const tags = tagsInput
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)

    const payload = { title, description, priority, tags, dueDate, status }

    if (onSubmit) {
      onSubmit(payload)
    } else if (onAdd) {
      onAdd(payload)
    }

    if (!initialValues?.id) {
      setTitle('')
      setDescription('')
      setPriority('medium')
      setTagsInput('')
      setDueDate('')
      setStatus('todo')
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="title">Task title</label>
          <input
            id="title"
            type="text"
            placeholder="Ship onboarding screen"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          rows={3}
          placeholder="Why does this matter? What does success look like?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="tags">Tags (comma separated)</label>
          <input
            id="tags"
            type="text"
            placeholder="work, ux, sprint"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="due">Due date</label>
          <input id="due" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="primary">
          {submitLabel}
        </button>
      </div>
    </form>
  )
}
