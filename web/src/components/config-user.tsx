'use client'

import { Authentication } from '@/@types/Authentication'
import { UserContext } from '@/contexts/UserProvider'
import { useContextSelector } from 'use-context-selector'

interface ConfigUserProps {
  user: Authentication
  userCookie: string
}

export function ConfigUser({ user, userCookie }: ConfigUserProps) {
  const { setUser, setUserCookie } = useContextSelector(
    UserContext,
    (context) => {
      return {
        setUser: context.setUser,
        setUserCookie: context.setUserCookie,
      }
    },
  )

  setUser(user)
  setUserCookie(userCookie)

  return <></>
}
