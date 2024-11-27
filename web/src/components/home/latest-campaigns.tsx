import { CampaignsDTO } from '@/@types/Campaign'
import { Button } from '@/components/button'
import { CampaignCard } from '@/components/campaign-card'
import { api } from '@/utils/api'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export async function LatestCampaigns() {
  const data = await fetch(`${api}/public/campaigns?limit=4`)
  const { campaigns }: CampaignsDTO = await data.json()

  if (campaigns.length === 0) return

  return (
    <section className="mx-auto mb-20 max-w-7xl space-y-20 px-4 2xl:px-0">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <h2 className="text-3xl font-bold text-zinc-800 lg:text-4xl">
          Campanhas Mais Recentes
        </h2>

        <Link href="/campanhas">
          <Button>
            <span>Ver mais campanhas</span>
            <ArrowRight className="size-5 shrink-0" />
          </Button>
        </Link>
      </div>

      <div className="grid min-h-56 grid-cols-cards gap-6">
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </section>
  )
}
