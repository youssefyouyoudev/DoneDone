import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext()
const THEME_KEY = 'smarttodo-theme'

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    const stored = localStorage.getItem(THEME_KEY)
    return stored || 'dark'
  })

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const value = useMemo(
    () => ({ theme, toggleTheme: () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')) }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
