import { Button } from '@/components/button'
import { CampaignCard } from '@/components/campaign-card'
import { ArrowRight } from 'lucide-react'

export function LatestCampaigns() {
  return (
    <section className="mx-auto my-20 max-w-7xl space-y-20 px-4 2xl:px-0">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <h2 className="text-3xl font-bold text-zinc-800 lg:text-4xl">
          Campanhas Mais Recentes
        </h2>

        <Button>
          <span>Ver mais campanhas</span>
          <ArrowRight className="size-5 shrink-0" />
        </Button>
      </div>

      <div className="grid grid-cols-cards gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <CampaignCard
            key={index}
            campaign={{
              id: '1',
              name: 'Mutirão de Natal',
              startedAt: '2024-10-10T30:15:00.429Z',
              status: 'Aberta',
              participants: 100,
              categories: ['Alimentação', 'Vestuário'],
              collectionPoints: [
                'Av. Águia de Haia, 2983 - Cidade Antônio Estêvão de Carvalho',
                'R. Prof. Alves Pedroso, 600 - Cangaiba',
              ],
              progress: 75,
            }}
          />
        ))}
      </div>
    </section>
  )
}
