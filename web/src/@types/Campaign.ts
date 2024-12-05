export interface CampaignItemAdm {
  id?: number
  name?: string
  goal?: number
  measure?: string
}

export interface CampaignSectionAdm {
  category: string
  items: CampaignItemAdm[]
}

export interface CampaignItem {
  id?: number
  name: string
  goal: number
  measure: string
  amount_donated: number
  status: 'disponível' | 'reservado' | 'concluído'
}

export interface CampaignSection {
  category: string
  items: CampaignItem[]
}

export interface Campaign {
  id: string
  name: string
  collection_point: string[]
  description: string
  observation?: string
  categories: string[]
  section: CampaignSection[]
  progress: number
  numberDonations: number
  status: 'aberta' | 'em breve' | 'fechada'
  participants: number
  participants_ids: string[]
  started_at?: string
}

export interface CampaignsDTO {
  page: number
  limit: number
  totalResponses: number
  campaigns: Campaign[]
}
