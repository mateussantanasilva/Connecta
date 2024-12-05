'use client'

import { DonationItem, DonationsDTO } from '@/@types/DonationItem'
import { formatDate } from '@/utils/format-date'
import { toast } from 'sonner'
import { Button } from '@/components/button'
import Cookies from 'js-cookie'
import { api } from '@/utils/api'
import { X, Check } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ConfirmationModal } from '../modals/confirmation-modal'
import { Pagination } from '../pagination'
import { usePagination } from '@/hooks/use-pagination'
import { Filter } from './filter'
import { Avatar } from '../avatar'

export function DonationsTable() {
  const [donations, setDonations] = useState<DonationItem[]>()
  const [filter, setFilter] = useState('')

  const { page, setPage, totalResponses, setTotalResponses, onChangePage } =
    usePagination()

  const userCookie = Cookies.get('user')

  async function handleDeleteDonation(id: string) {
    toast.promise(
      async () =>
        await fetch(`${api}/donations/${id}`, {
          method: 'DELETE',
          headers: {
            User: String(userCookie),
          },
        }),
      {
        success: () => {
          const updatedDonations = donations?.filter(
            (donation) => donation.id !== id,
          )

          setDonations(updatedDonations)

          return 'A reserva de doação pendente foi excluída com sucesso. O item está disponível novamente.'
        },
        error: 'Erro ao excluir a doação pendente. Tente novamente mais tarde.',
      },
    )
  }

  async function handleConfirmDonation(id: string) {
    toast.promise(
      async () =>
        await fetch(`${api}/admin/donations/${id}`, {
          method: 'PUT',
          headers: {
            User: String(userCookie),
          },
        }),
      {
        success: () => {
          const updatedDonations = donations?.filter(
            (donation) => donation.id !== id,
          )

          setDonations(updatedDonations)

          return 'A doação foi confirmada com sucesso. O progresso da campanha foi atualizado.'
        },
        error:
          'Erro ao confirmar a doação pendente. Tente novamente mais tarde.',
      },
    )
  }

  async function fetchDonations() {
    const data = await fetch(
      `${api}/admin/donations?limit=10&page=${page || 1}${filter}`,
      {
        headers: {
          User: String(userCookie),
        },
      },
    )
    const {
      donations,
      page: fetchedPage,
      totalResponses,
    }: DonationsDTO = await data.json()

    setDonations(donations)
    setPage(fetchedPage)
    setTotalResponses(totalResponses)
  }

  useEffect(() => {
    fetchDonations()
  }, [page, filter])

  return (
    <>
      <Filter
        placeholder="Nome do doador"
        filter={filter}
        onFilter={setFilter}
      />

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

          {donations &&
            donations.map((donation) => (
              <div
                key={donation.id}
                role="row"
                className="flex h-16 items-center gap-5 px-5 text-sm"
              >
                <div role="cell" className="flex w-60 items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-600/20 p-3">
                    <Avatar
                      src={donation.avatar}
                      alt={`Foto de perfil de ${donation.name}`}
                    />
                  </div>

                  <div className="flex flex-col">
                    <span className="w-44 truncate font-medium">
                      {donation.name}
                    </span>
                    <span className="w-44 truncate">{donation.email}</span>
                  </div>
                </div>

                <span role="cell" className="flex-1">
                  {donation.campaign_name}
                </span>

                <div role="cell" className="w-56">
                  <span className="w-56 truncate">{donation.item_name}</span>
                  <span className="block truncate">{`${donation.quantity} ${donation.measure}`}</span>
                </div>

                <span role="cell" className="w-48 truncate">
                  {formatDate(donation.date)}
                </span>

                <div role="cell" className="flex w-32 items-center gap-2">
                  <ConfirmationModal
                    variant="danger"
                    title="Deletar Doação"
                    description="Tem certeza de que deseja deletar esta doação? A quantidade do item na campanha será atualizada."
                    onConfirm={() => handleDeleteDonation(donation.id)}
                  >
                    <Button size="xs" variant="danger">
                      <X className="size-5 shrink-0" />
                    </Button>
                  </ConfirmationModal>

                  <ConfirmationModal
                    title="Confirmar Doação"
                    description="Tem certeza de que deseja confirmar esta doação? A ação será registrada e a campanha será atualizada."
                    onConfirm={() => handleConfirmDonation(donation.id)}
                  >
                    <Button size="xs">
                      <Check className="size-5 shrink-0" />
                    </Button>
                  </ConfirmationModal>
                </div>
              </div>
            ))}

          {(!donations || donations.length === 0) && (
            <div
              role="row"
              className="flex h-48 items-center gap-5 px-5 text-sm"
            >
              <span
                role="cell"
                className="mx-auto max-w-md text-center text-sm"
              >
                Nenhuma doação pendente no momento. Aguarde a criação de novas
                reservas.
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
