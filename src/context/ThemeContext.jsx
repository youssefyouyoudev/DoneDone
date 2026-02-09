import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext()
const THEME_KEY = 'smarttodo-theme'
const ACCENT_KEY = 'smarttodo-accent'

const ACCENTS = {
  grape: { accent: '#7c6bff', accentStrong: '#9c8cff' },
  ocean: { accent: '#45b7ff', accentStrong: '#1f8fff' },
  amber: { accent: '#ffb347', accentStrong: '#ff9800' },
  emerald: { accent: '#3ac98a', accentStrong: '#22a56d' },
  rose: { accent: '#ff6b9c', accentStrong: '#ff3f7f' },
}

function applyAccent(accentKey) {
  if (typeof document === 'undefined') return
  const palette = ACCENTS[accentKey] || ACCENTS.grape
  document.documentElement.style.setProperty('--accent', palette.accent)
  document.documentElement.style.setProperty('--accent-strong', palette.accentStrong)
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    return localStorage.getItem(THEME_KEY) || 'dark'
  })

  const [accent, setAccent] = useState(() => {
    if (typeof window === 'undefined') return 'grape'
    return localStorage.getItem(ACCENT_KEY) || 'grape'
  })

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  useEffect(() => {
    applyAccent(accent)
    localStorage.setItem(ACCENT_KEY, accent)
  }, [accent])

  const value = useMemo(
    () => ({
      theme,
      accent,
      toggleTheme: () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')),
      setTheme,
      setAccent,
      accents: ACCENTS,
    }),
    [theme, accent],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
