import { Authentication } from './Authentication'

export interface User extends Authentication {
  address?: string
  telephone?: string
  request?: string
  doneeRequested?: boolean
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

export interface Donee extends DoneeRequest {
  doneeStatus: string
  doneeAccepted: string
}

export interface DoneesDTO {
  page: number
  limit: number
  totalResponses: number
  donees: Donee[]
}
