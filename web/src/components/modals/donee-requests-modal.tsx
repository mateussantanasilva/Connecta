'use client'

import * as Dialog from '@radix-ui/react-dialog'
import {
  TextSearch,
  Trash,
  X,
  UserRoundPlus,
  Phone,
  MapPin,
  Info,
  UserRound,
} from 'lucide-react'
import { Button } from '../button'

export function DoneeRequestsModal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>
          <span>Ver solicitações</span>
          <TextSearch className="size-5 shrink-0" />
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 bg-black/60" />

        <Dialog.Content className="fixed inset-0 left-4 right-4 z-30 mx-auto my-4 flex max-w-2xl flex-col gap-5 overflow-y-scroll rounded-2xl bg-white p-5 md:ml-auto md:mr-0 [&::-webkit-scrollbar]:hidden">
          <Dialog.Close asChild>
            <Button size="xs" variant="outline" className="ml-auto">
              <X className="size-5 shrink-0" />
            </Button>
          </Dialog.Close>

          <header className="max-w-lg space-y-2">
            <Dialog.Title className="text-lg font-bold text-zinc-800 sm:text-2xl">
              Revisar Solicitações
            </Dialog.Title>

            <Dialog.Description className="text-sm sm:text-base">
              Avalie e aprove ou recuse cada solicitação. Aprovados serão
              adicionados aos donatários ativos.
            </Dialog.Description>
          </header>

          <div className="flex w-[632px] items-center justify-between gap-0 px-4 pt-3">
            <div className="flex items-center gap-[12px]">
              <div className="h-[46px] w-[46px] rounded-full bg-orange-600/20 p-3">
                <UserRound className="size-6 shrink-0 text-orange-600" />
              </div>

              <div className="flex w-[235px] flex-col justify-between">
                <span className="font-semibold">Antônio Carlos Braga</span>
                <span className="text-sm text-zinc-600">
                  antoniocarlos@gmail.com
                </span>
              </div>
            </div>

            <div className="flex h-auto w-[300.5px] flex-col items-end gap-[2px]">
              <span className="mb-2 text-sm text-zinc-500">
                há cerca de 1 hora
              </span>

              <div className="flex items-center space-x-2">
                <Button variant="outline">
                  <Trash className="size-5" />
                </Button>
                <Button>
                  <UserRoundPlus className="size-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-4">
            <Phone className="size-5 shrink-0 text-zinc-700" />
            <span>(11) 98765-4321</span>
          </div>

          <div className="flex items-start gap-1.5 px-4">
            <MapPin className="size-5 shrink-0 text-zinc-700" />
            <span>
              Rua Árvore da Cera, 20c - Jardim Santo Antonio, São Paulo - SP,
              08032-270
            </span>
          </div>

          <div className="flex items-start gap-1.5 px-4">
            <Info className="size-5 shrink-0 text-zinc-700" />
            <span>
              Após enfrentar a perda repentina do meu emprego, minha família e
              eu estamos passando por um período desafiador. A falta de renda
              afetou nossa capacidade de suprir as necessidades básicas, como
              alimentação e outros itens essenciais.
            </span>
          </div>
          <div className="h-px w-full bg-zinc-400" />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
