import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function formatDate(date: string) {
  const formattedDate = formatDistanceToNow(new Date(date), {
    locale: ptBR,
    addSuffix: true,
  })

  return formattedDate
}
