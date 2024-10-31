import { formatDate } from './format-date'

export function formatCampaignStartedAt(
  campaignStatus: 'em breve' | 'aberta' | 'fechada',
  date?: string,
) {
  if (!date) return 'Não iniciada'

  const formattedDate = formatDate(date)

  if (campaignStatus === 'fechada') return `Fechada ${formattedDate}`

  return `Iniciada ${formattedDate}`
}
