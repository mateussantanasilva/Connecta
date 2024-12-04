'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { Button } from '@/components/button'
import { X, Search, Lock, ArrowUpRight } from 'lucide-react'
import { Input } from '../input'
import { CollectionPoints } from '../admin/collection-points'
import { TextArea } from '../text-area'
import { Campaign } from '@/@types/Campaign'
import { CategoryCheckboxes } from '../admin/category-checkboxes'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { api } from '@/utils/api'
import { toast } from 'sonner'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ConfirmationModal } from './confirmation-modal'

interface CloseCampaignModalProps {
  campaign: Campaign
}

export function CloseCampaignModal({ campaign }: CloseCampaignModalProps) {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const router = useRouter()

  async function handleCloseCampaign() {
    const userCookie = Cookies.get('user')

    if (!userCookie) return

    toast.promise(
      async () =>
        await fetch(`${api}/campaigns/${campaign.id}`, {
          method: 'PUT',
          headers: {
            User: userCookie,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...campaign,
            status: 'fechada',
          }),
        }),
      {
        success: () => {
          setIsOpenModal(false)
          router.refresh()

          return 'A campanha foi aberta com sucesso. Agora as doações podem ser feitas.'
        },
        error: 'Erro ao tentar abrir a campanha. Tente novamente mais tarde.',
      },
    )
  }

  return (
    <Dialog.Root open={isOpenModal}>
      <Dialog.Trigger asChild>
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
              Detalhes da Campanha
            </Dialog.Title>

            <Dialog.Description className="text-sm sm:text-base">
              Campanha aberta para doações. Você pode fechá-la no momento que
              desejar.
            </Dialog.Description>
          </header>

          <Link
            href={`/campanhas/${campaign.id}`}
            target="_blank"
            rel="noopener"
            className="flex items-center gap-1.5 font-bold text-orange-600 transition-colors hover:text-orange-700"
          >
            Acompanhe os detalhes desta campanha
            <ArrowUpRight className="size-5 shrink-0" />
          </Link>

          <form className="space-y-5">
            <Input
              title="Nome da campanha"
              type="text"
              defaultValue={campaign.name}
              disabled
            />

            <CollectionPoints
              initialPoints={campaign.collection_point}
              disabled
            />

            <TextArea
              title="Descrição"
              defaultValue={campaign.description}
              disabled
            />
            <TextArea
              title="Observações"
              defaultValue={campaign.observation}
              disabled
            />

            <CategoryCheckboxes
              selectedCategories={campaign.categories}
              categorySections={campaign.section}
              disabled
            />
          </form>

          <div className="flex justify-end">
            <ConfirmationModal
              variant="danger"
              title="Fechar Campanha"
              description="Tem certeza de que deseja fechar esta campanha? Não será mais possível realizar doações, mas os resultados poderão ser consultados."
              onConfirm={() => handleCloseCampaign()}
            >
              <Button variant="danger">
                <span>Fechar Campanha</span>
                <Lock className="size-5 shrink-0" />
              </Button>
            </ConfirmationModal>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
