import { Authentication } from '@/@types/Authentication'
import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'

export function getAuthentication() {
  const userCookie = cookies().get('user')?.value

  if (!userCookie) return { user: null, userCookie: '' }

  const user: Authentication = jwtDecode(userCookie)

  return {
    user,
    userCookie: userCookie.toString(),
  }
}
