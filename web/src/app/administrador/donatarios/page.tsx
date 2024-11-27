import { DoneeRequestsModal } from '@/components/modals/donee-requests-modal'
import { StatusIndicator } from '@/components/status-indicator'
import { DoneeDetailsModal } from '@/components/modals/donee-details-modal'
import { DoneeFilter } from '@/components/admin/donee-filter'
import { HeaderAdmin } from '@/components/admin/header-admin'
import { api } from '@/utils/api'
import { cookies } from 'next/headers'
import { DoneesDTO } from '@/@types/User'

export default async function Donatario() {
  const userCookie = cookies().get('user')?.value

  if (!userCookie) return

  const data = await fetch(`${api}/admin/donees`, {
    headers: {
      User: userCookie,
    },
  })
  const { donees }: DoneesDTO = await data.json()

  return (
    <>
      <HeaderAdmin />

      <main className="mx-auto mb-20 mt-16 max-w-7xl space-y-5 px-4 2xl:px-0">
        <header className="flex w-full flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <h1 className="text-3xl font-bold text-zinc-800 lg:text-4xl">
            Donatários
          </h1>

          <DoneeRequestsModal />
        </header>

        <DoneeFilter />

        <div className="overflow-x-scroll [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar]:bg-transparent">
          <section
            role="table"
            className="w-full min-w-fit divide-y divide-zinc-400 rounded-lg border border-zinc-400"
          >
            <header className="flex h-10 items-center gap-5 px-5 text-sm font-medium uppercase text-zinc-800">
              <div className="flex items-center gap-5">
                <div className="not-sr-only size-9" />
                <strong className="w-48 min-w-28">Identificador</strong>
              </div>
              <strong className="w-32">Status</strong>
              <strong className="min-w-48 flex-1">Nome</strong>
              <strong className="w-56">Contato</strong>
              <strong className="w-48 min-w-28 truncate">Cadastrado há</strong>
            </header>

            {donees.map((donee) => (
              <div
                key={donee.id}
                role="row"
                className="flex h-16 items-center gap-5 px-5 text-sm"
              >
                <div className="flex items-center gap-5">
                  <DoneeDetailsModal donee={donee} />
                  <span className="w-48 min-w-28 truncate">{donee.id}</span>
                </div>

                <div className="w-32">
                  <StatusIndicator status="apto" />
                </div>

                <span className="min-w-48 flex-1">{donee.name}</span>

                <div className="w-56 truncate">
                  <span className="block truncate">(11) 98765-4321</span>
                  <span className="truncate">{donee.email}</span>
                </div>

                <span className="w-48 min-w-28 truncate">
                  há cerca de 2 meses
                </span>
              </div>
            ))}
          </section>
        </div>

        {/* <Pagination /> */}
      </main>
    </>
  )
}
