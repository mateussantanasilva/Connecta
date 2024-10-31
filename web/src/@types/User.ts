import { Authentication } from './Authentication'

export interface User extends Authentication {
  address?: string
  telephone?: string
}
