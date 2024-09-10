import { SquareCheck } from 'lucide-react'
import { Button } from './button'
import { ProgressBar } from './progress-bar'
import Link from 'next/link'
import { Campaign } from '@/@types/Campaign'

interface CampaignCardProps {
  campaign: Campaign
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  return (
    <article className="space-y-5 rounded-2xl p-5 shadow">
      <strong className="text-lg font-bold text-zinc-800">
        {campaign.title}
      </strong>

      <div className="flex items-center justify-between">
        <span className="text-sm">Iniciada há 20 dias</span>

        <div className="flex items-center gap-1">
          <div className="rounded-full bg-green-600/20 p-0.5">
            <div className="size-1.5 rounded-full bg-green-600" />
          </div>
          <span className="text-xs font-medium text-green-600">
            {campaign.status}
          </span>
        </div>
      </div>

      <span className="text-sm">{campaign.participants} Participantes</span>

      <div className="space-x-1">
        {campaign.categories.map((category) => (
          <span
            key={category}
            className="rounded-lg border border-green-600 px-2 py-1 text-xs font-medium text-green-600"
          >
            {category}
          </span>
        ))}
      </div>

      <ProgressBar progression={campaign.progress} />

      <div className="flex items-center justify-between">
        <Link href={`/campanhas/${campaign.title}`}>
          <Button>
            <span>Ver detalhes</span>
          </Button>
        </Link>

        <SquareCheck className="size-5 shrink-0 text-green-600" />
      </div>
    </article>
  )
}
