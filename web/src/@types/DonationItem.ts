export interface DonationItem {
  id: string
  item_name: string
  quantity: number
  measure: string
  campaign_id: string
  status: 'pendente' | 'confirmada'
  date: string
}
