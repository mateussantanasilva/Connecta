'use client'

import { DonationItem } from '@/@types/DonationItem'
import { formatDate } from '@/utils/format-date'
import { toast } from 'sonner'
import { Button } from '@/components/button'
import Cookies from 'js-cookie'
import { api } from '@/utils/api'
import { UserRound, X, Check } from 'lucide-react'
import { useState } from 'react'

interface DonationsTableProps {
  fetchedDonations: DonationItem[]
}

export function DonationsTable({ fetchedDonations }: DonationsTableProps) {
  const [donations, setDonations] = useState(fetchedDonations)

  const userCookie = Cookies.get('user')

  async function deleteDonation(id: string) {
    toast.promise(
      async () =>
        await fetch(`${api}/admin/donations/${id}`, {
          method: 'DELETE',
          headers: {
            User: String(userCookie),
          },
        }),
      {
        success: () => {
          const updatedDonations = donations.filter(
            (donation) => donation.id !== id,
          )

          setDonations(updatedDonations)

          return 'A reserva de doação pendente foi excluída com sucesso. O item está disponível novamente.'
        },
        error: 'Erro ao excluir a doação pendente. Tente novamente mais tarde.',
      },
    )
  }

  async function confirmDonation(id: string) {
    toast.promise(
      async () =>
        await fetch(`${api}/donations/${id}`, {
          method: 'PUT',
          headers: {
            User: String(userCookie),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'confirmada' }),
        }),
      {
        success: () => {
          const updatedDonations = donations.filter(
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

  return (
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

        {donations.map((donation) => (
          <div
            key={donation.id}
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

            <span className="flex-1">{donation.campaign_id}</span>

            <div className="w-56">
              <span className="w-56 truncate">{donation.item_name}</span>
              <span className="block truncate">{`${donation.quantity} ${donation.measure}`}</span>
            </div>

            <span className="w-48 truncate">{formatDate(donation.date)}</span>

            <div className="flex w-32 items-center gap-2">
              <Button
                size="xs"
                variant="danger"
                onClick={() => deleteDonation(donation.id)}
              >
                <X className="size-5 shrink-0" />
              </Button>

              <Button size="xs" onClick={() => confirmDonation(donation.id)}>
                <Check className="size-5 shrink-0" />
              </Button>
            </div>
          </div>
        ))}

        {donations.length === 0 && (
          <div role="row" className="flex h-48 items-center gap-5 px-5 text-sm">
            <span className="mx-auto max-w-md text-center text-sm">
              Nenhuma doação pendente no momento. Aguarde a criação de novas
              reservas.
            </span>
          </div>
        )}
      </section>
    </div>
  )
}
