import { Authentication } from './Authentication'

export interface User extends Authentication {
  address?: string
  telephone?: string
  request?: string
  id?: string // mudar depois
}

export interface DoneeRequest extends User {
  id: string
}
