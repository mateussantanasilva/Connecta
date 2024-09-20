'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { Button } from '../button'
import { HandHeart, X } from 'lucide-react'
import { Input } from '../input'
import { QuantityInput } from '../quantity-input'

export function ReserveDonationModal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>
          <span>Reservar doação</span>
          <HandHeart className="size-5 shrink-0" />
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 bg-black/60" />

        <Dialog.Content className="fixed inset-0 left-4 right-4 z-30 mx-auto my-4 flex max-w-2xl flex-col gap-5 overflow-y-scroll rounded-2xl bg-white p-5 md:ml-auto md:mr-0 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar]:bg-transparent">
          <Dialog.Close asChild>
            <Button size="xs" variant="outline" className="ml-auto">
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
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Input
                title="Nome do item"
                type="text"
                defaultValue="Pacote de arroz"
                disabled
                className="flex-1"
              />

              <div className="sm:w-64">
                <QuantityInput
                  unitMeasure="pacotes"
                  type="number"
                  defaultValue={10}
                />
              </div>
            </div>
          </form>

          <div className="mt-auto h-px w-full bg-zinc-400" />

          <Button className="ml-auto">
            <span>Confirmar reserva</span>
            <HandHeart className="size-5 shrink-0" />
          </Button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
