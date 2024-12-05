'use client'

import { ArrowRight } from 'lucide-react'
import { Button } from '../button'
import { CampaignCard } from '../campaign-card'
import Link from 'next/link'
import { Campaign, CampaignsDTO } from '@/@types/Campaign'
import Cookies from 'js-cookie'
import { getAuthentication } from '@/utils/get-authentication'
import { api } from '@/utils/api'
import { useState, useEffect } from 'react'
import { Pagination } from '../pagination'
import { usePagination } from '@/hooks/use-pagination'

export function MyCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>()

  const { page, setPage, totalResponses, setTotalResponses, onChangePage } =
    usePagination()

  async function fetchCampaigns() {
    const userCookie = Cookies.get('user')
    const { user } = getAuthentication(userCookie)

    if (!userCookie || !user) return

    const data = await fetch(
      `${api}/users/${user.userID}/campaigns?limit=3&page=${page || 1}`,
      {
        headers: {
          User: userCookie,
        },
      },
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
  }, [page])

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

      {!campaigns || campaigns.length === 0 ? (
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

          <Pagination
            total={totalResponses}
            currentPage={page}
            totalPages={Math.ceil(totalResponses / 3)}
            handlePreviousPage={() => onChangePage('previous')}
            handleNextPage={() => onChangePage('next')}
          />
        </>
      )}
    </section>
  )
}
