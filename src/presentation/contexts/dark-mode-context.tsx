import { createContext } from 'react'

export const DarkModeContext = createContext(
  {} as {
    darkMode: boolean
    setDarkMode: (mode: boolean) => void
  }
)
