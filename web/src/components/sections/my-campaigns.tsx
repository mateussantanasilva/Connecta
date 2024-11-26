'use client'

import { ArrowRight } from 'lucide-react'
import { Button } from '../button'
import { CampaignCard } from '../campaign-card'
import Link from 'next/link'
import { Campaign } from '@/@types/Campaign'

interface MyCampaignsProps {
  campaigns: Campaign[]
}

export function MyCampaigns({ campaigns }: MyCampaignsProps) {
  return (
    <section className="space-y-5">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-bold text-zinc-800">Minhas Campanhas</h2>

        <Link href="/campanhas">
          <Button>
            <span>Ver mais campanhas</span>
            <ArrowRight className="size-5 shrink-0" />
          </Button>
        </Link>
      </header>

      {campaigns.length === 0 ? (
        <div className="flex h-56 items-center justify-center">
          <span className="max-w-md text-center text-sm">
            Você ainda não está participando de nenhuma campanha. Participe de
            uma campanha para começar a fazer a diferença!
          </span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-cards gap-6">
            {campaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>

          {/* <Pagination /> */}
        </>
      )}
    </section>
  )
}
