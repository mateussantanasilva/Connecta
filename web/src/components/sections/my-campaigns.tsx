import { ArrowRight } from 'lucide-react'
import { Button } from '../button'
import { CampaignCard } from '../campaign-card'
import { Pagination } from '../pagination'

export function MyCampaigns() {
  return (
    <section className="space-y-5">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-bold text-zinc-800">Minhas Campanhas</h2>

        <Button>
          <span>Ver mais campanhas</span>
          <ArrowRight className="size-5 shrink-0" />
        </Button>
      </header>

      <div className="grid grid-cols-cards gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
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

      <Pagination />
    </section>
  )
}
