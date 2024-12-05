'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { Button } from '../button'
import { HandHeart, X } from 'lucide-react'
import { Input } from '../input'
import { QuantityInput } from '../quantity-input'
import { CampaignItem } from '@/@types/Campaign'
import { api } from '@/utils/api'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { ConfirmationModal } from './confirmation-modal'

interface ReserveDonationModalProps {
  items: CampaignItem[]
  campaignId: string
}

export function ReserveDonationModal({
  items,
  campaignId,
}: ReserveDonationModalProps) {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const router = useRouter()

  async function handleReserve() {
    const userCookie = Cookies.get('user')

    if (!userCookie) return

    const maxQuantity = items[0].goal - items[0].amount_donated

    if (quantity < 1 || quantity > maxQuantity)
      return toast.error(
        'A quantidade está inválida. Digite a quantidade a ser doada corretamente.',
      )

    const donation = {
      item_name: items[0].name,
      quantity,
      measure: items[0].measure,
      campaign_id: campaignId,
    }

    toast.promise(
      async () =>
        await fetch(`${api}/donations`, {
          method: 'POST',
          headers: {
            User: userCookie,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([donation]),
        }),
      {
        success: () => {
          setIsOpenModal(false)

          router.push('/perfil')

          return 'Reserva realizada com sucesso! Leve sua doação a um ponto de coleta. Você pode acompanhar sua reserva no perfil.'
        },
        error:
          'Erro ao realizar uma reserva de doação. Tente novamente mais tarde.',
      },
    )
  }

  return (
    <Dialog.Root open={isOpenModal}>
      <Dialog.Trigger asChild>
        <Button onClick={() => setIsOpenModal(!isOpenModal)}>
          <span>Reservar doação</span>
          <HandHeart className="size-5 shrink-0" />
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 bg-black/60" />

        <Dialog.Content className="fixed inset-0 left-4 right-4 z-30 mx-auto my-4 flex max-w-2xl flex-col gap-5 overflow-y-scroll rounded-2xl bg-white p-5 pr-2.5 md:ml-auto md:mr-0 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar]:bg-transparent">
          <Dialog.Close asChild>
            <Button
              size="xs"
              variant="outline"
              onClick={() => setIsOpenModal(false)}
              className="ml-auto"
            >
              <X className="size-5 shrink-0" />
            </Button>
          </Dialog.Close>

          <header className="max-w-lg space-y-2">
            <Dialog.Title className="text-lg font-bold text-zinc-800 sm:text-2xl">
              Reservar Nova Doação
            </Dialog.Title>

            <Dialog.Description className="text-sm sm:text-base">
              Após confirmar a reserva, leve os itens ao ponto de coleta para
              que a doação seja validada.
            </Dialog.Description>
          </header>

          <form className="space-y-5">
            {items &&
              items.map((item) => (
                <div
                  key={item.name}
                  className="flex flex-col gap-2 sm:flex-row sm:items-center"
                >
                  <Input
                    title="Nome do item"
                    type="text"
                    defaultValue={item.name}
                    disabled
                    className="flex-1"
                  />

                  <div className="sm:w-64">
                    <QuantityInput
                      unitMeasure={item.measure}
                      min={1}
                      max={item.goal - item.amount_donated}
                      type="number"
                      defaultValue={quantity}
                      onChange={(event) =>
                        setQuantity(Number(event.target.value))
                      }
                    />
                  </div>
                </div>
              ))}

            {(!items || items.length === 0) && (
              <span className="mt-10 flex max-w-md justify-self-center text-center text-sm">
                Nenhum item selecionado para doação. Por favor, escolha algo
                para continuar.
              </span>
            )}
          </form>

          <div className="mt-auto h-px w-full bg-zinc-400" />

          <ConfirmationModal
            title="Confirmar Reserva de Doação"
            description="Deseja confirmar os itens selecionados para doação? Verifique se as informações estão corretas."
            disabled={items.length === 0}
            onConfirm={() => handleReserve()}
          >
            <Button className="ml-auto">
              <span>Confirmar reserva</span>
              <HandHeart className="size-5 shrink-0" />
            </Button>
          </ConfirmationModal>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
