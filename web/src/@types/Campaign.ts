export interface Campaign {
  id: string
  name: string
  collection_point: string[]
  description: string
  observation?: string
  categories: string[]
  progress: number
  goal: number
  status: 'aberta' | 'em breve' | 'fechada'
  participants: number
  started_at?: string
}
