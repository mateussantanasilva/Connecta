import { Authentication } from './Authentication'

export interface User extends Authentication {
  address?: string
  telephone?: string
  request?: string
}

export interface DoneeRequest extends User {
  id: string
}
