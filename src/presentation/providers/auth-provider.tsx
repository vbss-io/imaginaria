import { useEffect, useState } from 'react'

import type { User } from '@/domain/models/user.model'
import type { LocalStorage } from '@/domain/storage/local-storage'
import { Registry } from '@/infra/dependency-injection/registry'
import { AuthContext, type Login } from '@/presentation/contexts/auth-context'

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const localStorage = Registry.getInstance().inject('localStorage') as LocalStorage
  const [token, setToken] = useState<string | null>(localStorage.get('token'))
  const [user, setUser] = useState<User | null>(localStorage.get('user'))

  useEffect(() => {
    window.addEventListener('Logout', logout)
    return () => {
      window.removeEventListener('Logout', logout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const login = ({ token, user }: Login) => {
    const isAdmin = user.role === 'administrator'
    setToken(token)
    localStorage.set('token', token)
    setUser({ ...user, isAdmin })
    localStorage.set('user', { ...user, isAdmin })
  }

  const logout = () => {
    localStorage.clear()
    setToken(null)
    setUser(null)
    window.location.assign('/')
  }

  const updateAvatar = (newAvatar?: string) => {
    const updatedUser = { ...(user as User), avatar: newAvatar }
    setUser(updatedUser)
    localStorage.set('user', {
      ...updatedUser,
      avatar: updatedUser.avatar
    })
  }

  return <AuthContext.Provider value={{ token, user, login, logout, updateAvatar }}>{children}</AuthContext.Provider>
}
