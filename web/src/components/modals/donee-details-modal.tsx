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
import { Donee } from '@/@types/User'
import { formatDate } from '@/utils/format-date'
import { api } from '@/utils/api'
import Cookies from 'js-cookie'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ConfirmationModal } from './confirmation-modal'

interface DoneeDetailsModalProps {
  donee: Donee
}

export function DoneeDetailsModal({ donee }: DoneeDetailsModalProps) {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const router = useRouter()

  async function handleSwitchStatus() {
    const userCookie = Cookies.get('user')

    if (!userCookie) return

    toast.promise(
      async () =>
        await fetch(`${api}/admin/donees/${donee.id}/switch-status`, {
          method: 'PUT',
          headers: {
            User: userCookie,
          },
        }),
      {
        success: () => {
          setIsOpenModal(false)
          router.refresh()

          return 'O status do donatário foi alterado com sucesso. Você pode alterar novamente quando necessário.'
        },
        error:
          'Erro ao alterar o status do donatário. Tente novamente mais tarde.',
      },
    )
  }

  return (
    <Dialog.Root open={isOpenModal}>
      <Dialog.Trigger aria-label="Detalhes do donatario" asChild>
        <Button
          variant="outline"
          size="xs"
          onClick={() => setIsOpenModal(!isOpenModal)}
        >
          <Search className="size-5" />
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
                  <Avatar
                    src={donee.avatar}
                    alt={`Foto de perfil de ${donee.name}`}
                  />

                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium text-zinc-800">
                      {donee.name}
                    </span>
                    <span className="text-sm">{donee.email}</span>
                  </div>
                </div>

                <StatusIndicator
                  status={donee.doneeStatus === 'ativo' ? 'ativo' : 'inativo'}
                />
              </div>

              <div className="flex items-center gap-1.5 text-sm">
                <Calendar className="size-4 shrink-0" />
                <span>{formatDate(donee.doneeAccepted)}</span>
              </div>

              <div className="flex items-center gap-1.5 text-sm">
                <Phone className="size-4 shrink-0" />
                <span>{donee.telephone}</span>
              </div>

              <div className="flex items-start gap-1.5 text-sm">
                <MapPin className="size-4 shrink-0" />
                <span>{donee.address}</span>
              </div>

              <div className="flex items-start gap-1.5 text-sm">
                <Info className="size-4 shrink-0" />
                <span>{donee.request}</span>
              </div>
            </div>

            <div className="mt-auto h-px w-full bg-zinc-400" />

            <ConfirmationModal
              variant={donee.doneeStatus === 'ativo' ? 'danger' : 'safe'}
              title={
                donee.doneeStatus === 'ativo'
                  ? 'Desativar Donatário'
                  : 'Reativar Donatário'
              }
              description={
                donee.doneeStatus === 'ativo'
                  ? 'Tem certeza de que deseja desativar este donatário? Ele não poderá mais receber doações.'
                  : 'Tem certeza de que deseja reativar este donatário? Ele poderá começar a receber doações.'
              }
              onConfirm={() => handleSwitchStatus()}
            >
              <Button
                variant={donee.doneeStatus === 'ativo' ? 'danger' : 'primary'}
                className="ml-auto"
              >
                {donee.doneeStatus === 'ativo' ? (
                  <>
                    <span>Desativar donatário</span>
                    <UserRoundX className="size-5 shrink-0" />
                  </>
                ) : (
                  <>
                    <span>Reativar donatário</span>
                    <UserRoundCheck className="size-5 shrink-0" />
                  </>
                )}
              </Button>
            </ConfirmationModal>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
