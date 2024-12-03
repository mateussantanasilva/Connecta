import { ArrowUpRight } from 'lucide-react'
import { CreateCampaignModal } from '@/components/modals/create-campaign-modal'
import { OpenCampaignModal } from '@/components/modals/open-campaign-modal'
import { CloseCampaignModal } from '@/components/modals/close-campaign-modal'
import { ClosedCampaignModal } from '@/components/modals/closed-campaign-modal'
import { StatusIndicator } from '@/components/status-indicator'
import { CampaignFilter } from '@/components/admin/campaign-filter'
import { HeaderAdmin } from '@/components/admin/header-admin'
import { api } from '@/utils/api'
import { CampaignsDTO } from '@/@types/Campaign'
import { cookies } from 'next/headers'

export default async function Campanha() {
  const userCookie = cookies().get('user')?.value

  if (!userCookie) return

  const data = await fetch(`${api}/public/campaigns`)
  const { campaigns }: CampaignsDTO = await data.json()

  return (
    <>
      <HeaderAdmin />
      <main className="mx-auto mb-20 mt-16 max-w-7xl space-y-5 px-4 2xl:px-0">
        <header className="flex w-full flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <h1 className="text-3xl font-bold text-zinc-800 lg:text-4xl">
            Campanhas
          </h1>

          <CreateCampaignModal />
        </header>

        <CampaignFilter />

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
                  <div className="flex items-center gap-5">
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

                  <div className="w-48">
                    <StatusIndicator status={campaign.status} />
                  </div>

                  <span className="flex-1">{campaign.name}</span>

                  <span className="w-48 truncate">
                    {campaign.categories.join(', ')}
                  </span>

                  <div className="flex w-56 items-center gap-5">
                    <span className="w-28">
                      {campaign.progress}%
                      <br />
                      {campaign.NumberDonations} doação(s)
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
                <span className="mx-auto max-w-md text-center text-sm">
                  Nenhuma campanha cadastrada no momento. Adicione novas
                  campanhas para começar o processo de doações.
                </span>
              </div>
            )}
          </section>
        </div>

        {/* <Pagination /> */}
      </main>
    </>
  )
}
