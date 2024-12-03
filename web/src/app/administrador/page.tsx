import { HandHeart, Trophy, SquareCheck, UserRoundCheck } from 'lucide-react'
import { AdminFilter } from '@/components/admin/admin-filter'
import { HeaderAdmin } from '@/components/admin/header-admin'
import { StatusCard } from '@/components/admin/status-card'
import { getAuthentication } from '@/utils/get-authentication'
import { api } from '@/utils/api'
import { AdminMetrics } from '@/@types/Metrics'
import { cookies } from 'next/headers'
import { DonationsDTO } from '@/@types/DonationItem'
import { DonationsTable } from '@/components/admin/donations-table'

export default async function Administrador() {
  const userCookie = cookies().get('user')?.value
  const { user } = getAuthentication(userCookie)

  if (!user || !userCookie) return

  const metricsResponse = await fetch(`${api}/admin/metrics`, {
    headers: {
      User: userCookie,
    },
  })
  const metrics: AdminMetrics = await metricsResponse.json()

  const donationsResponse = await fetch(`${api}/admin/donations`, {
    headers: {
      User: userCookie,
    },
  })
  const { donations }: DonationsDTO = await donationsResponse.json()

  return (
    <>
      <HeaderAdmin />
      <main className="mx-auto mb-20 mt-16 max-w-7xl space-y-5 px-4 2xl:px-0">
        <header className="flex w-full flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <h1 className="text-3xl font-bold text-zinc-800 lg:text-4xl">
            Início
          </h1>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatusCard
            title="Campanhas Abertas"
            count={metrics.openCampaigns}
            description={
              metrics.soonCampaigns > 0
                ? `${metrics.soonCampaigns} nova(s) para anunciar`
                : 'Nenhuma nova para anunciar'
            }
            icon={<SquareCheck className="h-5 w-5 text-orange-500" />}
          />
          <StatusCard
            title="Donatários Ativos"
            count={metrics.activeDonors}
            description={
              metrics.doneeRequests > 0
                ? `${metrics.doneeRequests} solicitação(ões) para revisar`
                : 'Nenhuma solicitação para revisar'
            }
            icon={<UserRoundCheck className="h-5 w-5 text-orange-500" />}
          />
          <StatusCard
            title="Doações Anuais"
            count={metrics.annualDonations}
            description={
              metrics.unconfirmedDonations > 0
                ? `${metrics.unconfirmedDonations} pendente(s) de confirmação`
                : 'Nenhuma pendente de confirmação'
            }
            icon={<HandHeart className="h-5 w-5 text-orange-500" />}
          />
          <StatusCard
            title="Campanhas 100%"
            count={metrics.totalCompletedCampaigns}
            description={
              metrics.totalEndedCampaigns > 0
                ? `${metrics.totalEndedCampaigns} finalizadas(s) ao total`
                : 'Nenhuma finalizada'
            }
            icon={<Trophy className="h-5 w-5 text-orange-500" />}
          />
        </div>

        <AdminFilter />

        <DonationsTable fetchedDonations={donations || []} />

        {/* <Pagination /> */}
      </main>
    </>
  )
}
