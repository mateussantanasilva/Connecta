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
import { api } from '@/utils/api'
import { useState } from 'react'
import { DoneeRequest, DoneeRequestsDTO } from '@/@types/User'
import Cookies from 'js-cookie'
import { toast } from 'sonner'
import { ConfirmationModal } from './confirmation-modal'
import { formatDate } from '@/utils/format-date'

export function DoneeRequestsModal() {
  const [requests, setRequests] = useState<DoneeRequest[]>([])

  const userCookie = Cookies.get('user')

  async function fecthRequests() {
    const data = await fetch(`${api}/admin/donee-requests`, {
      headers: {
        User: String(userCookie),
      },
    })
    const { doneeRequests }: DoneeRequestsDTO = await data.json()

    setRequests(doneeRequests)
  }

  async function handleDeleteRequest(requestId: string) {
    toast.promise(
      async () =>
        await fetch(`${api}/admin/donee-requests/${requestId}`, {
          method: 'DELETE',
          headers: {
            User: String(userCookie),
          },
        }),
      {
        success: () => {
          const updatedRequests = requests.filter(
            (request) => request.id !== requestId,
          )

          setRequests(updatedRequests)

          return 'A solicitação foi excluída com sucesso. O usuário será notificado.'
        },
        error:
          'Erro ao deletar requisição para donatário. Tente novamente mais tarde.',
      },
    )
  }

  async function handleAcceptRequest(requestId: string) {
    toast.promise(
      async () =>
        await fetch(`${api}/admin/donee-requests/${requestId}/accept`, {
          headers: {
            User: String(userCookie),
          },
        }),
      {
        success: () => {
          const updatedRequests = requests.filter(
            (request) => request.id !== requestId,
          )

          setRequests(updatedRequests)

          return 'A solicitação foi aceita com sucesso. O usuário será notificado do seu cadastrado como donatário.'
        },
        error:
          'Erro ao aceitar requisição para donatário. Tente novamente mais tarde.',
      },
    )
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

          {requests &&
            requests.map((request) => (
              <div key={request.id}>
                <article className="space-y-2">
                  <div className="mb-5 flex flex-col justify-between gap-5 sm:mb-0 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={request.avatar}
                        alt={`Foto de perfil de ${request.name}`}
                      />

                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium text-zinc-800">
                          {request.name}
                        </span>
                        <span className="text-sm">{request.email}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 sm:items-end">
                      <span className="text-sm">
                        {formatDate(request.createdAt)}
                      </span>

                      <div className="flex gap-2">
                        <ConfirmationModal
                          variant="danger"
                          title="Recusar Solicitação"
                          description="Tem certeza de que deseja recusar a solicitação para donatário? A ação não poderá ser desfeita."
                          onConfirm={() => handleDeleteRequest(request.id)}
                        >
                          <Button variant="danger" size="xs">
                            <Trash className="size-5" />
                          </Button>
                        </ConfirmationModal>

                        <ConfirmationModal
                          title="Aceitar Solicitação"
                          description="Tem certeza de que deseja aceitar a solicitação para donatário? Ele poderá começar a receber doações."
                          onConfirm={() => handleAcceptRequest(request.id)}
                        >
                          <Button size="xs">
                            <UserRoundPlus className="size-5" />
                          </Button>
                        </ConfirmationModal>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-sm">
                    <Phone className="size-4 shrink-0" />
                    <span>{request.telephone}</span>
                  </div>

                  <div className="flex items-start gap-1.5 text-sm">
                    <MapPin className="size-4 shrink-0" />
                    <span>{request.address}</span>
                  </div>

                  <div className="flex items-start gap-1.5 text-sm">
                    <Info className="size-4 shrink-0" />
                    <span className="line-clamp-3 break-words">
                      {request.request}
                    </span>
                  </div>
                </article>

                <div className="mt-5 h-px w-full bg-zinc-400" />
              </div>
            ))}

          {(!requests || requests.length === 0) && (
            <span className="mx-auto mt-10 max-w-md text-center text-sm">
              Nenhuma solicitação de donatário no momento. Aguarde novas
              solicitações.
            </span>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
