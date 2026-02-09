import { useSelector } from 'react-redux'
import ThemeToggle from '../components/ThemeToggle'
import { useTheme } from '../context/ThemeContext'
import { selectTasksSorted } from '../store/tasksSlice'

export default function Settings() {
  const { theme } = useTheme()
  const tasks = useSelector(selectTasksSorted)

  return (
    <div className="page">
      <div className="card">
        <div className="card-header">
          <div>
            <p className="eyebrow">Preferences</p>
            <h2>Personalize your workspace</h2>
            <p className="muted">Theme, persistence, and quick stats about your data footprint.</p>
          </div>
          <ThemeToggle />
        </div>
        <div className="settings-grid">
          <div>
            <p className="eyebrow">Theme</p>
            <p className="strong">{theme === 'dark' ? 'Dark' : 'Light'} mode</p>
            <p className="muted">Stored locally so the app opens the way you left it.</p>
          </div>
          <div>
            <p className="eyebrow">Data</p>
            <p className="strong">{tasks.length} tasks in localStorage</p>
            <p className="muted">Switch to Firebase later to sync across devices.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
