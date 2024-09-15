import { Campaign } from '@/@types/Campaign'
import { ProgressBar } from '../progress-bar'
import Link from 'next/link'

interface CampaignDetailsProps {
  campaign: Campaign
}

export function CampaignDetails({ campaign }: CampaignDetailsProps) {
  return (
    <aside className="space-y-5 lg:max-w-80">
      <h2 className="text-2xl font-bold text-zinc-800">Detalhes da Campanha</h2>

      <div className="space-y-2">
        <h3 className="text-lg font-bold text-zinc-800">Resumo</h3>

        <div className="flex items-center gap-1">
          <div className="rounded-full bg-green-600/20 p-1">
            <div className="size-2 rounded-full bg-green-600" />
          </div>
          <strong className="font-medium text-green-600">
            {campaign.status}
          </strong>
        </div>

        <span className="block">Iniciada há 20 dias</span>

        <span>180 Participantes</span>

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

        {campaign.collectionPoints.map((point) => (
          <Link href="/" key={point} className="block truncate">
            {point}
          </Link>
        ))}
      </div>

      <div className="h-px w-full bg-zinc-400" />

      <div className="space-y-2">
        <h3 className="text-lg font-bold text-zinc-800">Descrição</h3>

        <p>
          Ajude-nos a arrecadar alimentos e roupas de inverno para famílias
          carentes neste Natal. Sua contribuição será boa!
        </p>
      </div>

      <div className="h-px w-full bg-zinc-400" />

      <div className="space-y-2">
        <h3 className="text-lg font-bold text-zinc-800">Observações</h3>

        <p>
          Certifique-se de que os itens doados estejam dentro do prazo de
          validade e em boas condições.
        </p>
      </div>
    </aside>
  )
}
