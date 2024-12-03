'use client'

import { SquareCheck, X } from 'lucide-react'
import { Button } from '../button'
import { useState } from 'react'
import { toast } from 'sonner'
import { ConfirmationModal } from '../modals/confirmation-modal'
import { DonationItem } from '@/@types/DonationItem'

interface MyDonationsProps {
  donations: DonationItem[]
}

export function MyDonations({ donations }: MyDonationsProps) {
  const [donationList, setDonationList] = useState<DonationItem[]>(donations)

  function handleCancelDonation(donationId: string) {
    const updatedDonations = donations.filter(
      (donation) => donation.id !== donationId,
    )

    setDonationList(updatedDonations)

    toast.success(
      'Sua doação foi cancelada. Esperamos contar com você em outras oportunidades!',
    )
  }

  return (
    <section className="space-y-5">
      <h2 className="text-2xl font-bold text-zinc-800">Minhas Doações</h2>

      {!donations || donations.length === 0 ? (
        <div className="flex h-56 items-center justify-center">
          <span className="max-w-md text-center text-sm">
            Você ainda não cadastrou nenhuma doação. Participe de uma campanha e
            registre sua primeira doação!
          </span>
        </div>
      ) : (
        <div
          className={`space-y-5 overflow-x-scroll md:overflow-x-visible [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar]:w-1.5 ${donations.length > 4 && 'overflow-y-scroll'}`}
        >
          <header className="flex w-full gap-5 px-5 text-center text-sm uppercase text-zinc-800">
            <strong className="min-w-44 max-w-56 flex-1 text-start font-medium">
              Item
            </strong>
            <strong className="min-w-44 flex-1 font-medium">Campanha</strong>
            <strong className="min-w-44 flex-1 font-medium">Status</strong>
            <strong className="min-w-20 flex-1 font-medium sm:max-w-20">
              Ação
            </strong>
          </header>

          <div className={`max-h-96 space-y-2 pb-1`}>
            {donationList.map((donation) => (
              <div
                key={donation.id}
                className="flex min-w-fit items-center gap-5 rounded-2xl p-5 text-center text-sm shadow"
              >
                <div className="flex min-w-44 max-w-56 flex-1 flex-col text-start">
                  <span>{donation.item_name}</span>
                  <span>{`${donation.quantity} ${donation.measure}`}</span>
                </div>

                <span className="min-w-44 flex-1">
                  {donation.campaign_name}
                </span>

                <div className="flex min-w-44 flex-1 justify-center">
                  <span
                    className={`w-24 rounded-lg border px-2 py-1 text-xs font-medium capitalize ${donation.status === 'confirmada' ? 'border-green-600 text-green-600' : 'border-orange-600 text-orange-600'}`}
                  >
                    {donation.status}
                  </span>
                </div>

                <div className="flex min-w-20 flex-1 justify-center sm:max-w-20">
                  {donation.status === 'confirmada' ? (
                    <SquareCheck className="size-5 shrink-0 text-green-600" />
                  ) : (
                    <ConfirmationModal
                      variant="danger"
                      title="Cancelar Doação"
                      description="Tem certeza de que deseja cancelar esta doação? A ação não poderá ser desfeita."
                      onConfirm={() => handleCancelDonation(donation.id)}
                    >
                      <Button size="xs" variant="danger">
                        <X className="size-5 shrink-0" />
                      </Button>
                    </ConfirmationModal>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
