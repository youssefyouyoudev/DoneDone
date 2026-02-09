import { useSelector } from 'react-redux'
import ThemeToggle from '../components/ThemeToggle'
import { useTheme } from '../context/ThemeContext'
import { selectTasksSorted } from '../store/tasksSlice'

export default function Settings() {
  const { theme, accent, accents, setAccent } = useTheme()
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
            <p className="eyebrow">Accent</p>
            <p className="muted">Pick your highlight color. Stored in localStorage.</p>
            <div className="accent-grid">
              {Object.entries(accents).map(([key, palette]) => (
                <button
                  key={key}
                  className={`accent-swatch ${accent === key ? 'accent-swatch--active' : ''}`}
                  style={{ '--swatch-accent': palette.accent, '--swatch-strong': palette.accentStrong }}
                  onClick={() => setAccent(key)}
                  aria-label={`Use ${key} accent`}
                  type="button"
                >
                  <span className="accent-swatch__dot" />
                  <span className="accent-swatch__label">{key}</span>
                </button>
              ))}
            </div>
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
