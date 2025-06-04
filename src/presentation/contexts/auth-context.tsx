import { createContext } from 'react'

import type { User } from '@/domain/models/user.model'

export interface Login {
  token: string
  user: Omit<User, 'isAdmin'>
}

export const AuthContext = createContext(
  {} as {
    token: string | null
    user: User | null
    login: ({ token, user }: Login) => void
    logout: () => void
    updateAvatar: (avatar?: string) => void
  }
)
