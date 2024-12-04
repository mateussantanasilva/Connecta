import { StatusIndicator } from '@/components/status-indicator'
import { DoneeDetailsModal } from '@/components/modals/donee-details-modal'
import { DoneeFilter } from '@/components/admin/donee-filter'
import { api } from '@/utils/api'
import { Donee, DoneesDTO } from '@/@types/User'
import { formatDate } from '@/utils/format-date'
import { usePagination } from '@/hooks/use-pagination'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { Pagination } from '../pagination'

export function DoneesTable() {
  const [donees, setDonees] = useState<Donee[]>()

  const { page, setPage, totalResponses, setTotalResponses, onChangePage } =
    usePagination()

  async function fetchDonees() {
    const userCookie = Cookies.get('user')

    if (!userCookie) return

    const data = await fetch(`${api}/admin/donees?limit=10&page=${page || 1}`, {
      headers: {
        User: userCookie,
      },
    })

    const {
      donees,
      page: fetchedPage,
      totalResponses,
    }: DoneesDTO = await data.json()

    setDonees(donees)
    setPage(fetchedPage)
    setTotalResponses(totalResponses)
  }

  useEffect(() => {
    fetchDonees()
  }, [page])

  return (
    <>
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

          {donees &&
            donees.map((donee) => (
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
                  <StatusIndicator status={donee.doneeStatus} />
                </div>

                <span className="min-w-48 flex-1">{donee.name}</span>

                <div className="w-56 truncate">
                  <span className="block truncate">{donee.telephone}</span>
                  <span className="truncate">{donee.email}</span>
                </div>

                <span className="w-48 min-w-28 truncate">
                  {formatDate(donee.doneeAccepted)}
                </span>
              </div>
            ))}

          {(!donees || donees.length === 0) && (
            <div
              role="row"
              className="flex h-48 items-center gap-5 px-5 text-sm"
            >
              <span className="mx-auto max-w-md text-center text-sm">
                Nenhum donatário cadastrado no momento. Aprove solicitações
                pendentes para registrar novos donatários.
              </span>
            </div>
          )}
        </section>
      </div>

      <Pagination
        total={totalResponses}
        currentPage={page}
        totalPages={Math.ceil(totalResponses / 8)}
        handlePreviousPage={() => onChangePage('previous')}
        handleNextPage={() => onChangePage('next')}
      />
    </>
  )
}
