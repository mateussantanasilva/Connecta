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
} from 'lucide-react'
import { Button } from '../button'
import { Avatar } from '../avatar'
import { useContextSelector } from 'use-context-selector'
import { UserContext } from '@/contexts/UserProvider'
import { api } from '@/utils/api'

export function DoneeRequestsModal() {
  const userCookie = useContextSelector(UserContext, (context) => {
    return context.userCookie
  })

  async function fecthRequests() {
    const data = await fetch(`${api}/admin/donee-requests`, {
      headers: {
        User: userCookie,
      },
    })
    const requests = await data.json()

    console.log(requests)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button onClick={fecthRequests}>
          <span>Ver solicitações</span>
          <TextSearch className="size-5 shrink-0" />
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
              Revisar Solicitações
            </Dialog.Title>

            <Dialog.Description className="text-sm sm:text-base">
              Avalie e aprove ou recuse cada solicitação. Aprovados serão
              adicionados aos donatários ativos.
            </Dialog.Description>
          </header>

          <article className="space-y-2">
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

              <div className="flex flex-col gap-1 sm:items-end">
                <span className="text-sm">há cerca de 1 hora</span>

                <div className="flex gap-2">
                  <Button variant="danger" size="xs">
                    <Trash className="size-5" />
                  </Button>
                  <Button size="xs">
                    <UserRoundPlus className="size-5" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-sm">
              <Phone className="size-4 shrink-0" />
              <span>(11) 98765-4321</span>
            </div>

            <div className="flex items-start gap-1.5 text-sm">
              <MapPin className="size-4 shrink-0" />
              <span>
                Rua Árvore da Cera, 20c - Jardim Santo Antonio, São Paulo - SP,
                08032-270
              </span>
            </div>

            <div className="flex items-start gap-1.5 text-sm">
              <Info className="size-4 shrink-0" />
              <span className="line-clamp-3">
                Após enfrentar a perda repentina do meu emprego, minha família e
                eu estamos passando por um período desafiador. A falta de renda
                afetou nossa capacidade de suprir as necessidades básicas, como
                alimentação e outros itens essenciais.
              </span>
            </div>
          </article>

          <div className="h-px w-full bg-zinc-400" />

          <article className="space-y-2">
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

              <div className="flex flex-col gap-1 sm:items-end">
                <span className="text-sm">há cerca de 1 hora</span>

                <div className="flex gap-2">
                  <Button variant="danger" size="xs">
                    <Trash className="size-5" />
                  </Button>
                  <Button size="xs">
                    <UserRoundPlus className="size-5" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-sm">
              <Phone className="size-4 shrink-0" />
              <span>(11) 98765-4321</span>
            </div>

            <div className="flex items-start gap-1.5 text-sm">
              <MapPin className="size-4 shrink-0" />
              <span>
                Rua Árvore da Cera, 20c - Jardim Santo Antonio, São Paulo - SP,
                08032-270
              </span>
            </div>

            <div className="flex items-start gap-1.5 text-sm">
              <Info className="size-4 shrink-0" />
              <span className="line-clamp-3">
                Após enfrentar a perda repentina do meu emprego, minha família e
                eu estamos passando por um período desafiador. A falta de renda
                afetou nossa capacidade de suprir as necessidades básicas, como
                alimentação e outros itens essenciais.
              </span>
            </div>
          </article>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
