'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { HeartHandshake, Send, X } from 'lucide-react'
import { Button } from '../button'
import { Input } from '../input'

export function BecomeDoneeModal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button size="full" className="md:w-fit lg:w-full">
          <span>Tornar donatário</span>
          <HeartHandshake className="size-5 shrink-0" />
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
              Solicitar Função de Donatário
            </Dialog.Title>

            <Dialog.Description className="text-sm sm:text-base">
              Envie sua solicitação para receber doações. A aprovação será
              necessária para confirmar a nova função.
            </Dialog.Description>
          </header>

          <form className="space-y-5">
            <Input title="Telefone" type="text" />
            <Input title="Endereço" type="text" />
            <Input title="Motivo da solicitação" type="text" isMultiline />
          </form>

          <div className="mt-auto h-px w-full bg-zinc-400" />

          <Button className="ml-auto">
            <span>Enviar solicitação</span>
            <Send className="size-5 shrink-0" />
          </Button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
