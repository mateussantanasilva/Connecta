'use client'

import * as Dialog from '@radix-ui/react-dialog'
import {
  X,
  Phone,
  MapPin,
  Info,
  Search,
  UserRoundX,
  Calendar,
  UserRoundCheck,
} from 'lucide-react'
import { Button } from '../button'
import { Avatar } from '../avatar'
import { StatusIndicator } from '../status-indicator'

interface DoneeDetailsModalProps {
  status?: 'active' | 'inactive'
}

export function DoneeDetailsModal({
  status = 'active',
}: DoneeDetailsModalProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="xs">
          <Search className="size-5" />
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 bg-black/60" />

        <Dialog.Content className="fixed inset-0 left-4 right-4 z-30 mx-auto my-4 flex max-w-2xl flex-col gap-5 overflow-y-scroll rounded-2xl bg-white p-5 pr-2.5 md:ml-auto md:mr-0 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar]:bg-transparent">
          <Dialog.Close asChild>
            <Button size="xs" variant="outline" className="ml-auto">
              <X className="size-5 shrink-0" />
            </Button>
          </Dialog.Close>

          <header className="max-w-lg space-y-2">
            <Dialog.Title className="text-lg font-bold text-zinc-800 sm:text-2xl">
              Detalhes do Donatário
            </Dialog.Title>

            <Dialog.Description className="text-sm sm:text-base">
              Visualize as informações do donatário e altere o status quando
              necessário.
            </Dialog.Description>
          </header>

          <div className="flex h-full flex-col gap-5">
            <div className="space-y-2">
              <div className="mb-5 flex flex-col justify-between gap-5 sm:mb-0 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <Avatar />

                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium text-zinc-800">
                      Antônio Carlos Braga
                    </span>
                    <span className="text-sm">antoniocarlos@gmail.com</span>
                  </div>
                </div>

                <StatusIndicator
                  status={status === 'active' ? 'apto' : 'inativo'}
                />
              </div>

              <div className="flex items-center gap-1.5 text-sm">
                <Calendar className="size-4 shrink-0" />
                <span>Cadastrado há cerca de 1 ano</span>
              </div>

              <div className="flex items-center gap-1.5 text-sm">
                <Phone className="size-4 shrink-0" />
                <span>(11) 98765-4321</span>
              </div>

              <div className="flex items-start gap-1.5 text-sm">
                <MapPin className="size-4 shrink-0" />
                <span>
                  Rua Árvore da Cera, 20c - Jardim Santo Antonio, São Paulo -
                  SP, 08032-270
                </span>
              </div>

              <div className="flex items-start gap-1.5 text-sm">
                <Info className="size-4 shrink-0" />
                <span>
                  Após enfrentar a perda repentina do meu emprego, minha família
                  e eu estamos passando por um período desafiador. A falta de
                  renda afetou nossa capacidade de suprir as necessidades
                  básicas, como alimentação e outros itens essenciais. Apesar de
                  ser uma situação temporária, o apoio que pudermos receber
                  durante esse momento será fundamental para garantir nossa
                  segurança e bem-estar até que possamos nos reerguer.
                  Agradecemos profundamente por qualquer ajuda que possa ser
                  oferecida.
                </span>
              </div>
            </div>

            <div className="mt-auto h-px w-full bg-zinc-400" />

            {status === 'active' ? (
              <Button variant="danger" className="ml-auto">
                <span>Desativar donatário</span>
                <UserRoundX className="size-5 shrink-0" />
              </Button>
            ) : (
              <Button className="ml-auto">
                <span>Reativar donatário</span>
                <UserRoundCheck className="size-5 shrink-0" />
              </Button>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
