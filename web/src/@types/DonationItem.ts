import { Campaign } from './Campaign'

export interface DonationItem {
  id: string
  name: string
  quantity: number
  measure: string
  status: 'pendente' | 'confirmada'
  campaign: Campaign
}
