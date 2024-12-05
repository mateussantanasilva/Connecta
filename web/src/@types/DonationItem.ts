import { Authentication } from './Authentication'

export interface DonationItem extends Authentication {
  id: string
  item_name: string
  quantity: number
  measure: string
  campaign_id: string
  campaign_name: string
  status: 'pendente' | 'confirmada'
  date: string
}

export interface DonationsDTO {
  page: number
  limit: number
  totalResponses: number
  donations: DonationItem[]
}
