import { useEffect, useState } from 'react'

import type { LocalStorage } from '@/domain/storage/local-storage'
import { Registry } from '@/infra/dependency-injection/registry'
import { DarkModeContext } from '@/presentation/contexts/dark-mode-context'
import { globalStyles } from '@/presentation/styles/global'
import { darkTheme, theme as defaultTheme } from '@/presentation/styles/theme'

interface DarkModeProviderProps {
  children: React.ReactNode
}

export const DarkModeProvider = ({ children }: DarkModeProviderProps) => {
  const localStorage = Registry.getInstance().inject('localStorage') as LocalStorage
  const [darkMode, setDarkMode] = useState(localStorage.get('darkMode') ?? false)

  useEffect(() => {
    const applyDarkMode = (isDark: boolean) => {
      document.documentElement.classList.remove(isDark ? defaultTheme : darkTheme)
      document.documentElement.classList.add(isDark ? darkTheme : defaultTheme)
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
      localStorage.set('darkMode', isDark)
    }

    applyDarkMode(darkMode)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkMode])

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {globalStyles()}
      {children}
    </DarkModeContext.Provider>
  )
}
