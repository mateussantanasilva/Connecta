import {
  HandHeart,
  Trophy,
  X,
  Check,
  UserRound,
  SquareCheck,
  UserRoundCheck,
} from 'lucide-react'
import { Button } from '@/components/button'
import { AdminFilter } from '@/components/admin/admin-filter'
import { HeaderAdmin } from '@/components/admin/header-admin'
import { StatusCard } from '@/components/admin/status-card'
import { getAuthentication } from '@/utils/get-authentication'
import { api } from '@/utils/api'
import { ConfigUser } from '@/components/config-user'
import { AdminMetrics } from '@/@types/Metrics'

export default async function Administrador() {
  const { user, userCookie } = getAuthentication()

  if (!user) return

  const data = await fetch(`${api}/admin/metrics`, {
    headers: {
      User: userCookie,
    },
  })
  const metrics: AdminMetrics = await data.json()

  return (
    <>
      <HeaderAdmin />
      <main className="mx-auto mb-20 mt-16 max-w-7xl space-y-5 px-4 2xl:px-0">
        <ConfigUser user={user} userCookie={userCookie} />

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

        <div className="overflow-x-scroll [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar]:bg-transparent">
          <section
            role="table"
            className="w-full min-w-fit divide-y divide-zinc-400 rounded-lg border border-zinc-400"
          >
            <header className="flex h-10 items-center gap-5 px-5 text-sm font-medium uppercase text-zinc-800">
              <div className="flex items-center">
                <div className="not-sr-only" />
                <strong className="w-60">Doador</strong>
              </div>
              <strong className="flex-1">Campanha</strong>
              <strong className="w-56">Item</strong>
              <strong className="w-48">Pendente há</strong>
              <strong className="w-32">Ações</strong>
            </header>

            <div
              role="row"
              className="flex h-16 items-center gap-5 px-5 text-sm"
            >
              <div className="flex w-60 items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-600/20 p-3">
                  <UserRound className="h-5 w-5 text-orange-600" />
                </div>

                <div className="flex flex-col">
                  <span className="w-44 truncate font-medium">
                    Maria Oliveira Rocha
                  </span>
                  <span className="w-44 truncate">
                    mariaoliveirarocha@gmail.com
                  </span>
                </div>
              </div>

              <span className="flex-1">Multirão de Natal</span>

              <div className="w-56">
                <span className="w-56 truncate">Pacote de arroz</span>
                <span className="block truncate">3kg</span>
              </div>

              <span className="w-48 truncate">há cerca de 2 meses</span>

              <div className="flex w-32 items-center gap-2">
                <Button size="xs" variant="danger">
                  <X className="size-5 shrink-0" />
                </Button>

                <Button size="xs">
                  <Check className="size-5 shrink-0" />
                </Button>
              </div>
            </div>

            <div
              role="row"
              className="flex h-16 items-center gap-5 px-5 text-sm"
            >
              <div className="flex w-60 items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-600/20 p-3">
                  <UserRound className="h-5 w-5 text-orange-600" />
                </div>
                <div className="flex flex-col">
                  <span className="w-44 truncate font-medium">
                    Luciana Cardoso Arlinda
                  </span>
                  <span className="w-44 truncate">lucianacarali@gmail.com</span>
                </div>
              </div>

              <span className="flex-1">Multirão de ano novo</span>

              <div className="w-56">
                <span className="w-56 truncate">Pacote de feijão</span>
                <span className="block truncate">2kg</span>
              </div>

              <span className="w-48 truncate">há cerca de 9 meses</span>

              <div className="flex w-32 items-center gap-2">
                <Button size="xs" variant="danger">
                  <X className="size-5 shrink-0" />
                </Button>

                <Button size="xs">
                  <Check className="size-5 shrink-0" />
                </Button>
              </div>
            </div>
          </section>
        </div>
        {/* <Pagination /> */}
      </main>
    </>
  )
}
