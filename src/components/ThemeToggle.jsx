import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button className="ghost toggle" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'dark' ? (
        <>
          <MoonIcon />
          <span>Dark</span>
        </>
      ) : (
        <>
          <SunIcon />
          <span>Light</span>
        </>
      )}
    </button>
  )
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.657-7.657-1.414 1.414M7.757 16.243l-1.414 1.414m0-12.728 1.414 1.414m10.486 10.486 1.414 1.414"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 14.5A9.5 9.5 0 0 1 10.5 4a9.4 9.4 0 0 0-4.5 8.1A9.5 9.5 0 0 0 15.9 21 9.4 9.4 0 0 1 21 14.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
