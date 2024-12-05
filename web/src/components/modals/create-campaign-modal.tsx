'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { Button } from '@/components/button'
import { X, Plus } from 'lucide-react'
import { Input } from '../input'
import { CollectionPoints } from '../admin/collection-points'
import { TextArea } from '../text-area'
import { CategoryCheckboxes } from '../admin/category-checkboxes'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { CampaignSectionAdm } from '@/@types/Campaign'
import { api } from '@/utils/api'
import Cookies from 'js-cookie'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { CampaignSchema, campaignSchema } from '@/utils/campaign-creation'
import { ConfirmationModal } from './confirmation-modal'

export function CreateCampaignModal() {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const [collectionPoints, setCollectionPoints] = useState([''])
  const [sectionsToCreate, setSectionsToCreate] = useState<
    CampaignSectionAdm[]
  >([])

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
  } = useForm<CampaignSchema>({
    resolver: zodResolver(campaignSchema),
  })

  function handleChangePoints(updatedPoints: string[]) {
    setCollectionPoints(updatedPoints)
    setValue('collection_point', updatedPoints)
  }

  async function handleCreateCampaign(data: CampaignSchema) {
    const userCookie = Cookies.get('user')

    if (!userCookie) return

    const categories = sectionsToCreate.map((section) => section.category)

    const campaignToCreate = {
      name: data.name,
      collection_point: collectionPoints,
      description: data.description,
      observation: data.observation,
      categories,
      progress: 0,
      status: 'em breve',
      participants: 0,
      section: sectionsToCreate,
    }

    toast.promise(
      async () =>
        await fetch(`${api}/campaigns`, {
          method: 'POST',
          headers: {
            User: userCookie,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(campaignToCreate),
        }),
      {
        success: () => {
          setIsOpenModal(false)
          router.refresh()

          return 'A campanha foi criada com sucesso e está com o status "Em Breve". Você pode anunciá-la assim que estiver pronto.'
        },
        error: 'Erro ao criar a campanha. Tente novamente mais tarde.',
      },
    )
  }

  return (
    <Dialog.Root open={isOpenModal}>
      <Dialog.Trigger asChild>
        <Button onClick={() => setIsOpenModal(!isOpenModal)}>
          <span>Criar campanhas</span>
          <Plus className="size-5 shrink-0" />
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
              Criar Nova Campanha
            </Dialog.Title>

            <Dialog.Description className="text-sm sm:text-base">
              Preencha os detalhes abaixo para anunciar uma nova campanha.
            </Dialog.Description>
          </header>

          <form className="space-y-5">
            <Input
              title="Nome da campanha"
              type="text"
              {...register('name')}
              errorMessage={errors.name?.message}
            />

            <CollectionPoints
              initialPoints={collectionPoints}
              onPointsChange={handleChangePoints}
              errorMessage={errors.collection_point}
            />

            <TextArea
              title="Descrição"
              {...register('description')}
              errorMessage={errors.description?.message}
            />

            <TextArea
              title="Observações"
              {...register('observation')}
              errorMessage={errors.observation?.message}
            />

            <CategoryCheckboxes
              categorySections={sectionsToCreate}
              onSetCategorySections={setSectionsToCreate}
            />
          </form>
          <div className="mt-auto h-px w-full bg-zinc-400" />

          <ConfirmationModal
            title="Criar Campanha"
            description="Deseja confirmar a criação desta campanha? Ela poderá ser aberta para doações mais tarde."
            disabled={isSubmitting}
            onConfirm={() => handleSubmit(handleCreateCampaign)()}
          >
            <Button className="ml-auto">
              <span>Criar campanha</span>
              <Plus className="size-5 shrink-0" />
            </Button>
          </ConfirmationModal>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
