'use client'

import Link from 'next/link'
import { SettingsMenu } from './settings-menu'
import { Button } from './button'
import { Avatar } from './avatar'
import { api } from '@/utils/api'
import Cookies from 'js-cookie'
import { getAuthentication } from '@/utils/get-authentication'
import { useEffect, useState } from 'react'
import { Authentication } from '@/@types/Authentication'

export function AuthenticationMenu() {
  const [user, setUser] = useState<Authentication | null>()

  useEffect(() => {
    const userCookie = Cookies.get('user')
    const { user } = getAuthentication(userCookie)

    setUser(user)
  }, [])

  return (
    <div className="flex flex-row-reverse items-center gap-6 md:flex-row">
      <SettingsMenu isAuthenticated={!!user} />

      {user ? (
        <Link
          href={user.role === 'administrador' ? '/administrador' : '/perfil'}
          className="group flex items-center gap-3"
        >
          <Avatar src={user.avatar} alt={`Foto de perfil de ${user.name}`} />

          <span className="hidden font-medium text-zinc-800 group-hover:text-orange-600 md:block">
            {user.name}
          </span>
        </Link>
      ) : (
        <Link href={`${api}/login/google`}>
          <Button variant="secondary" className="hidden md:flex">
            <span>Faça sua doação</span>
          </Button>
        </Link>
      )}
    </div>
  )
}
