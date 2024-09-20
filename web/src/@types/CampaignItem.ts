import { Campaign } from './Campaign'

export interface CampaignItem {
  id: string
  name: string
  goal: number
  measure: string
  status: 'disponível' | 'reservado' | 'concluído'
  campaign: Campaign
}

export interface CampaignSection {
  category: string
  items: CampaignItem[]
}
