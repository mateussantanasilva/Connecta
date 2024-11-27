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

export interface DoneeRequestsDTO {
  page: number
  limit: number
  totalResponses: number
  doneeRequests: DoneeRequest[]
}

export interface DoneesDTO {
  page: number
  limit: number
  totalResponses: number
  donees: User[]
}
