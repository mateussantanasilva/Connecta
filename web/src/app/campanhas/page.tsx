'use client'

import { Campaign, CampaignsDTO } from '@/@types/Campaign'
import { CampaignCard } from '@/components/campaign-card'
import { Pagination } from '@/components/pagination'
import { Footer } from '@/components/sections/footer'
import { Header } from '@/components/sections/header'
import { usePagination } from '@/hooks/use-pagination'
import { api } from '@/utils/api'
import { useEffect, useState } from 'react'

export default function Campanhas() {
  const [campaigns, setCampaigns] = useState<Campaign[]>()

  const { page, setPage, totalResponses, setTotalResponses, onChangePage } =
    usePagination()

  async function fetchCampaigns() {
    const data = await fetch(`${api}/public/campaigns?page=${page || 1}`)
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
  }, [page])

  return (
    <>
      <Header />

      <main className="mx-auto mb-20 mt-10 max-w-7xl space-y-6 px-4 md:mt-16 2xl:px-0">
        <header className="max-w-xl space-y-5">
          <h1 className="text-3xl font-bold text-zinc-800 lg:text-4xl">
            Campanhas
          </h1>
          <p className="max-w-lg">
            Explore todas as nossas campanhas e escolha onde contribuir ou
            buscar apoio. Sua participação é fundamental.
          </p>
        </header>

        {!campaigns || campaigns.length === 0 ? (
          <div className="flex h-80 items-center justify-center">
            <span className="max-w-md text-center text-sm">
              Nenhuma campanha disponível no momento. Por favor, volte em breve
              para conferir novidades!
            </span>
          </div>
        ) : (
          <>
            <section className="grid grid-cols-cards gap-6">
              {campaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </section>

            <Pagination
              total={totalResponses}
              currentPage={page}
              totalPages={Math.ceil(totalResponses / 8)}
              handlePreviousPage={() => onChangePage('previous')}
              handleNextPage={() => onChangePage('next')}
            />
          </>
        )}
      </main>

      <Footer />
    </>
  )
}
