import { NavLink } from 'react-router-dom'
import logo from '../assets/donedone-logo.svg'

const highlights = [
  {
    title: 'Prioritize smartly',
    body: 'High/medium/low with tags, filters, and smart suggestions keep you focused on what matters.',
  },
  {
    title: 'Visual flow',
    body: 'Kanban drag-and-drop, quick edits, and a fast board that mirrors real product workflows.',
  },
  {
    title: 'Insights built-in',
    body: 'Weekly charts, completion rate, and urgency callouts turn todos into a productivity system.',
  },
]

export default function Landing() {
  return (
    <div className="landing">
      <header className="landing__hero card">
        <div className="landing__badge">
          <img src={logo} alt="DoneDone logo" />
          <span>DoneDone</span>
        </div>
        <h1>Ship faster with Smart To-Do 2.0</h1>
        <p className="muted">
          A productivity dashboard with Kanban, analytics, and persistence. Built like a real SaaS so you can plan,
          execute, and learn—fast.
        </p>
        <div className="landing__actions">
          <NavLink to="/dashboard" className="primary">
            Enter the app
          </NavLink>
          <NavLink to="/tasks" className="ghost">
            View tasks
          </NavLink>
        </div>
      </header>

      <section className="landing__features">
        {highlights.map((item) => (
          <div key={item.title} className="card">
            <p className="eyebrow">{item.title}</p>
            <p className="strong">{item.body}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
