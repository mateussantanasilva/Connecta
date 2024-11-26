import { Authentication } from '@/@types/Authentication'
import { jwtDecode } from 'jwt-decode'

export function getAuthentication(userCookie: string | undefined) {
  if (!userCookie) return { user: null }

  const user: Authentication = jwtDecode(userCookie)

  return {
    user,
  }
}
