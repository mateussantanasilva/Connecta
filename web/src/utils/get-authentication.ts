import { Authentication } from '@/@types/Authentication'
import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'

export function getAuthentication() {
  const token = cookies().get('token')?.value

  if (!token) return { user: null }

  const user: Authentication = jwtDecode(token)

  return { user }
}
