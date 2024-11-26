import { HandHeart, Trophy, SquareCheck, UserRoundCheck } from 'lucide-react'
import { AdminFilter } from '@/components/admin/admin-filter'
import { HeaderAdmin } from '@/components/admin/header-admin'
import { StatusCard } from '@/components/admin/status-card'
import { getAuthentication } from '@/utils/get-authentication'
import { api } from '@/utils/api'
import { AdminMetrics } from '@/@types/Metrics'
import { cookies } from 'next/headers'
import { DonationItem } from '@/@types/DonationItem'
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

  const donationsResponse = await fetch(`${api}/donations`, {
    headers: {
      User: userCookie,
    },
  })
  const donations: DonationItem[] = await donationsResponse.json()

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
            description="2 nova(s) para analisar"
            icon={<SquareCheck className="h-5 w-5 text-orange-500" />}
          />
          <StatusCard
            title="Donatários Ativos"
            count={metrics.activeDonors}
            description="1 solicitação(ões) para revisar"
            icon={<UserRoundCheck className="h-5 w-5 text-orange-500" />}
          />
          <StatusCard
            title="Doações Anuais"
            count={metrics.annualDonations}
            description="1 pendente(s) de confirmação"
            icon={<HandHeart className="h-5 w-5 text-orange-500" />}
          />
          <StatusCard
            title="Campanhas 100%"
            count={metrics.totalCompletedCampaigns}
            description="7 finalizadas(s) ao total"
            icon={<Trophy className="h-5 w-5 text-orange-500" />}
          />
        </div>

        <AdminFilter />

        <DonationsTable fetchedDonations={donations} />

        {/* <Pagination /> */}
      </main>
    </>
  )
}
