'use client'

import { ArrowUpRight } from 'lucide-react'
import { OpenCampaignModal } from '@/components/modals/open-campaign-modal'
import { CloseCampaignModal } from '@/components/modals/close-campaign-modal'
import { ClosedCampaignModal } from '@/components/modals/closed-campaign-modal'
import { StatusIndicator } from '@/components/status-indicator'
import { Campaign, CampaignsDTO } from '@/@types/Campaign'
import { Pagination } from '../pagination'
import { usePagination } from '@/hooks/use-pagination'
import { api } from '@/utils/api'
import { useState, useEffect } from 'react'
import { Filter } from './filter'

export function CampaignsTable() {
  const [campaigns, setCampaigns] = useState<Campaign[]>()
  const [filter, setFilter] = useState('')

  const { page, setPage, totalResponses, setTotalResponses, onChangePage } =
    usePagination()

  async function fetchCampaigns() {
    const data = await fetch(
      `${api}/public/campaigns?limit=10&page=${page || 1}${filter}`,
    )
    const {
      campaigns,
      page: fetchedPage,
      totalResponses,
    }: CampaignsDTO = await data.json()

    setCampaigns(campaigns)
    setPage(fetchedPage)
    setTotalResponses(totalResponses)
  }

  useEffect(() => {
    fetchCampaigns()
  }, [page, filter])

  return (
    <>
      <Filter
        placeholder="Nome da campanha"
        filter={filter}
        onFilter={setFilter}
      />

      <div className="overflow-x-scroll [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar]:bg-transparent">
        <section
          role="table"
          className="w-full min-w-fit divide-y divide-zinc-400 rounded-lg border border-zinc-400"
        >
          <header className="flex h-10 items-center gap-5 px-5 text-sm font-medium uppercase text-zinc-800">
            <div className="flex items-center gap-5">
              <div className="not-sr-only size-9" />
              <strong className="w-48">Identificador</strong>
            </div>
            <strong className="w-48">Status</strong>
            <strong className="flex-1">Nome</strong>
            <strong className="w-48">Categorias</strong>
            <strong className="w-56">Progresso</strong>
          </header>

          {campaigns &&
            campaigns.map((campaign) => (
              <div
                key={campaign.id}
                role="row"
                className="flex h-16 items-center gap-5 px-5 text-sm"
              >
                <div role="cell" className="flex items-center gap-5">
                  {campaign.status === 'em breve' && (
                    <OpenCampaignModal campaign={campaign} />
                  )}
                  {campaign.status === 'aberta' && (
                    <CloseCampaignModal campaign={campaign} />
                  )}
                  {campaign.status === 'fechada' && (
                    <ClosedCampaignModal campaign={campaign} />
                  )}

                  <span className="w-48 truncate">{campaign.id}</span>
                </div>

                <div role="cell" className="w-48">
                  <StatusIndicator status={campaign.status} />
                </div>

                <span role="cell" className="flex-1">
                  {campaign.name}
                </span>

                <span role="cell" className="w-48 truncate">
                  {campaign.categories.join(', ')}
                </span>

                <div role="cell" className="flex w-56 items-center gap-5">
                  <span className="w-28">
                    {campaign.progress}%
                    <br />
                    {campaign.numberDonations} doação(s)
                  </span>
                  <a
                    href={`/campanhas/${campaign.id}`}
                    target="_blank"
                    rel="noopener"
                    className="flex items-center gap-1.5 font-bold text-orange-600 transition-colors hover:text-orange-700"
                  >
                    Detalhes
                    <ArrowUpRight className="size-5 shrink-0" />
                  </a>
                </div>
              </div>
            ))}

          {(!campaigns || campaigns.length === 0) && (
            <div
              role="row"
              className="flex h-48 items-center gap-5 px-5 text-sm"
            >
              <span
                role="cell"
                className="mx-auto max-w-md text-center text-sm"
              >
                Nenhuma campanha cadastrada no momento. Adicione novas campanhas
                para começar o processo de doações.
              </span>
            </div>
          )}
        </section>
      </div>

      <Pagination
        total={totalResponses}
        currentPage={page}
        totalPages={Math.ceil(totalResponses / 10)}
        handlePreviousPage={() => onChangePage('previous')}
        handleNextPage={() => onChangePage('next')}
      />
    </>
  )
}
