export interface Campaign {
  id: string
  name: string
  startedAt: string
  status: 'Aberta' | 'Em breve' | 'Fechada'
  participants: number
  categories: string[]
  collectionPoints: string[]
  progress: number
}
