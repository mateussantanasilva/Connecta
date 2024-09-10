export interface Campaign {
  title: string
  startedAt: string
  status: 'Aberta' | 'Em breve' | 'Fechada'
  participants: number
  categories: string[]
  progress: number
}
