export interface Campaign {
  id: string
  name: string
  collection_points: string[]
  description: string
  observation?: string
  categories: string[]
  progress: number
  status: 'aberta' | 'em breve' | 'fechada'
  participants: number
  started_at?: string
}
