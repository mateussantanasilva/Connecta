import { Pagination } from '@/components/pagination'
import { HeaderAdmin } from '@/components/sections/header-admin'
import { DoneeRequestsModal } from '@/components/modals/donee-requests-modal'
import { ActiveDoneeModal } from '@/components/modals/active-donee-modal'
import { DoneeFilter } from '@/components/donee-filter'
import { StatusIndicator } from '@/components/status-indicator'

export default function Donatario() {
  return (
    <>
      <HeaderAdmin />

      <main className="mx-auto mb-20 mt-16 max-w-7xl space-y-5 px-4 2xl:px-0">
        <header className="flex w-full items-center justify-between">
          <h1 className="text-4xl font-bold text-zinc-800">Donatários</h1>

          <DoneeRequestsModal />
        </header>

        <DoneeFilter />

        <section
          role="table"
          className="divide-y divide-zinc-400 rounded-lg border border-zinc-400"
        >
          <header className="flex h-10 items-center gap-5 px-5 text-sm font-medium uppercase text-zinc-800">
            <div className="flex items-center gap-5">
              <div className="not-sr-only size-9" />
              <strong className="w-48">Identificador</strong>
            </div>
            <strong className="w-32">Status</strong>
            <strong className="flex-1">Nome</strong>
            <strong className="w-56">Contato</strong>
            <strong className="w-48">Cadastrado há</strong>
          </header>

          <div role="row" className="flex h-16 items-center gap-5 px-5 text-sm">
            <div className="flex items-center gap-5">
              <ActiveDoneeModal />
              <span className="w-48 truncate">4f3846b5-9def-48db-587398</span>
            </div>

            <div className="w-32">
              <StatusIndicator status="apto" />
            </div>

            <span className="flex-1">Maria Oliveira Rocha</span>

            <div className="w-56">
              <span className="block truncate">(11) 98765-4321</span>
              <span className="truncate">mariaoliveirarochar@gmail.com</span>
            </div>

            <span className="w-48 truncate">há cerca de 2 meses</span>
          </div>

          <div role="row" className="flex h-16 items-center gap-5 px-5 text-sm">
            <div className="flex items-center gap-5">
              <ActiveDoneeModal />
              <span className="w-48 truncate">4f3846b5-9def-48db-587398</span>
            </div>

            <div className="w-32">
              <StatusIndicator status="inativo" />
            </div>

            <span className="flex-1">Maria Oliveira Rocha</span>

            <div className="w-56">
              <span className="block truncate">(11) 98765-4321</span>
              <span className="truncate">mariaoliveirarochar@gmail.com</span>
            </div>

            <span className="w-48 truncate">há cerca de 2 meses</span>
          </div>
        </section>

        <Pagination />
      </main>
    </>
  )
}
