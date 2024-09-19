import { Campaign } from '@/@types/Campaign'
import { ProgressBar } from '../progress-bar'
import Link from 'next/link'
import { StatusIndicator } from '../status-indicator'
import { formatCampaignStartedAt } from '@/utils/format-campaign-started-at'

interface CampaignDetailsProps {
  campaign: Campaign
}

export function CampaignDetails({ campaign }: CampaignDetailsProps) {
  const formattedDate = formatCampaignStartedAt(
    campaign.status,
    campaign.started_at,
  )

  const participants =
    campaign.participants > 0
      ? `${campaign.participants} Participantes`
      : `Sem participantes`

  return (
    <aside className="space-y-5 lg:max-w-80">
      <h2 className="text-2xl font-bold text-zinc-800">Detalhes da Campanha</h2>

      <div className="space-y-2">
        <h3 className="text-lg font-bold text-zinc-800">Resumo</h3>

        <StatusIndicator status={campaign.status} size="base" />

        <span className="block">{formattedDate}</span>

        <span>{participants}</span>

        <ProgressBar progression={campaign.progress} />
      </div>

      <div className="h-px w-full bg-zinc-400" />

      <div className="space-y-2">
        <h3 className="text-lg font-bold text-zinc-800">Categorias</h3>

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
      </div>

      <div className="h-px w-full bg-zinc-400" />

      <div className="space-y-2">
        <h3 className="text-lg font-bold text-zinc-800">Pontos de Coleta</h3>

        {campaign.collection_points.map((address) => (
          <Link
            href={`https://www.google.com/maps/search/?api=1&query=${address}`}
            key={address}
            target="_blank"
            className="block truncate transition-colors hover:text-green-600"
          >
            {address}
          </Link>
        ))}
      </div>

      <div className="h-px w-full bg-zinc-400" />

      <div className="space-y-2">
        <h3 className="text-lg font-bold text-zinc-800">Descrição</h3>

        <p>{campaign.description}</p>
      </div>

      {campaign.observation && (
        <>
          <div className="h-px w-full bg-zinc-400" />

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-zinc-800">Observações</h3>

            <p>{campaign.observation}</p>
          </div>
        </>
      )}
    </aside>
  )
}
