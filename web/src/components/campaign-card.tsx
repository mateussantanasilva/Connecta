'use client'

import { Hourglass, Lock, SquareCheck } from 'lucide-react'
import { Button } from './button'
import { ProgressBar } from './progress-bar'
import Link from 'next/link'
import { Campaign } from '@/@types/Campaign'
import { formatCampaignStartedAt } from '@/utils/format-campaign-started-at'
import { StatusIndicator } from './status-indicator'

interface CampaignCardProps {
  campaign: Campaign
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const formattedDate = formatCampaignStartedAt(
    campaign.status,
    campaign.started_at,
  )

  const participants =
    campaign.participants > 0
      ? `${campaign.participants} Participantes`
      : `Sem participantes`

  return (
    <article className="space-y-4 truncate rounded-2xl p-5 shadow">
      <strong className="text-lg font-bold text-zinc-800">
        {campaign.name}
      </strong>

      <div className="flex items-center justify-between gap-3">
        <span className="truncate text-sm">{formattedDate}</span>

        <StatusIndicator status={campaign.status} size="xs" />
      </div>

      <span className="text-sm">{participants}</span>

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

      {campaign.status === 'em breve' ? (
        <div className="flex items-center justify-between">
          <Link href={`/campanhas/${campaign.id}`}>
            <Button>
              <span>Ver detalhes</span>
            </Button>
          </Link>

          <Hourglass className="size-5 shrink-0 text-sky-700" />
        </div>
      ) : campaign.status === 'aberta' ? (
        <div className="flex items-center justify-between">
          <Link href={`/campanhas/${campaign.id}`}>
            <Button>
              <span>Ver detalhes</span>
            </Button>
          </Link>

          <SquareCheck className="size-5 shrink-0 text-green-600" />
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <Link href={`/campanhas/${campaign.id}`}>
            <Button variant="lock">
              <span>Já encerrada</span>
            </Button>
          </Link>

          <Lock className="size-5 shrink-0 text-zinc-500" />
        </div>
      )}
    </article>
  )
}
