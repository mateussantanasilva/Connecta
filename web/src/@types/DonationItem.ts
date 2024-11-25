export interface DonationItem {
  id: string
  name: string
  measure: string
  goal: number
  amount_donated: number
  status: 'pendente' | 'confirmada'
}
