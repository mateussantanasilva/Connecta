import { ArrowRight } from 'lucide-react'
import { Button } from '../button'
import { CampaignCard } from '../campaign-card'
import { Pagination } from '../pagination'

export function MyCampaigns() {
  return (
    <section className="space-y-5">
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-zinc-800">Minhas Campanhas</h2>

        <Button>
          <span>Ver mais campanhas</span>
          <ArrowRight className="size-5 shrink-0" />
        </Button>
      </header>

      <div className="grid grid-cols-3 gap-5">
        {Array.from({ length: 3 }).map((_, index) => (
          <CampaignCard
            key={index}
            campaign={{
              title: 'Mutirão de Natal',
              startedAt: '2024-10-10T30:15:00.429Z',
              status: 'Aberta',
              participants: 100,
              categories: ['Alimentação', 'Vestuário'],
              progress: 75,
            }}
          />
        ))}
      </div>

      <Pagination />
    </section>
  )
}
