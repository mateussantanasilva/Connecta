'use client'

import { Authentication } from '@/@types/Authentication'
import { ReactNode, useState } from 'react'
import { createContext } from 'use-context-selector'

interface UserProviderProps {
  children: ReactNode
}

interface UserType {
  user: null | Authentication
  userCookie: string
  setUser: (user: Authentication) => void
  setUserCookie: (cookie: string) => void
}

export const UserContext = createContext({} as UserType)

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<null | Authentication>(null)
  const [userCookie, setUserCookie] = useState('')

  return (
    <UserContext.Provider value={{ user, setUser, userCookie, setUserCookie }}>
      {children}
    </UserContext.Provider>
  )
}
