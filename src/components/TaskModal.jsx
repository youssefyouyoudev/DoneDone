import TaskForm from './TaskForm'

export default function TaskModal({ task, onClose, onSave }) {
  if (!task) return null

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card card">
        <div className="card-header">
          <div>
            <p className="eyebrow">Edit task</p>
            <h3>{task.title}</h3>
          </div>
          <button className="ghost" onClick={onClose}>
            Close
          </button>
        </div>
        <TaskForm
          initialValues={task}
          submitLabel="Save changes"
          onSubmit={(values) => {
            onSave(values)
          }}
        />
      </div>
    </div>
  )
}
