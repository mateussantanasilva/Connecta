'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import { Button } from '@/components/button'
import { X, Search, Trash, Pencil, Megaphone, ArrowUpRight } from 'lucide-react'
import { Input } from '../input'
import { CollectionPoints } from '../admin/collection-points'
import { TextArea } from '../text-area'
import { Campaign, CampaignSectionAdm } from '@/@types/Campaign'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { campaignSchema, CampaignSchema } from '@/utils/campaign-creation'
import Link from 'next/link'
import { CategoryCheckboxes } from '../admin/category-checkboxes'
import { api } from '@/utils/api'
import Cookies from 'js-cookie'
import { toast } from 'sonner'
import { ConfirmationModal } from './confirmation-modal'

interface OpenCampaignModalProps {
  campaign: Campaign
}

export function OpenCampaignModal({ campaign }: OpenCampaignModalProps) {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const [collectionPoints, setCollectionPoints] = useState(
    campaign.collection_point,
  )
  const [sectionsToCreate, setSectionsToCreate] = useState<
    CampaignSectionAdm[]
  >(campaign.section)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
  } = useForm<CampaignSchema>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      name: campaign.name,
      description: campaign.description,
      observation: campaign.observation,
    },
  })

  function handleChangePoints(updatedPoints: string[]) {
    setCollectionPoints(updatedPoints)
    setValue('collection_point', updatedPoints)
  }

  async function handleUpdateCampaign(data: CampaignSchema) {
    const userCookie = Cookies.get('user')

    if (!userCookie) return

    const campaignToUpdate = {
      ...campaign,
      ...data,
      collection_point: collectionPoints,
      section: sectionsToCreate,
    }

    toast.promise(
      async () =>
        await fetch(`${api}/campaigns/${campaign.id}`, {
          method: 'PUT',
          headers: {
            User: userCookie,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(campaignToUpdate),
        }),
      {
        success: () => {
          setIsOpenModal(false)
          router.refresh()

          return 'A campanha foi atualizada com sucesso. Você pode anunciá-la assim que estiver pronto.'
        },
        error: 'Erro ao atualizar a campanha. Tente novamente mais tarde.',
      },
    )
  }

  async function handleDeleteCampaign() {
    const userCookie = Cookies.get('user')

    if (!userCookie) return

    toast.promise(
      async () =>
        await fetch(`${api}/admin/campaigns/${campaign.id}`, {
          method: 'DELETE',
          headers: {
            User: userCookie,
          },
        }),
      {
        success: () => {
          setIsOpenModal(false)
          router.refresh()

          return 'A campanha foi deletada com sucesso. Crie outras campanhas sempre que desejar.'
        },
        error: 'Erro ao deletar a campanha. Tente novamente mais tarde.',
      },
    )
  }

  async function handleOpenCampaign() {
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
            status: 'aberta',
          }),
        }),
      {
        success: () => {
          setIsOpenModal(false)
          router.refresh()

          return 'A campanha foi atualizada com sucesso. Você pode anunciá-la assim que estiver pronto.'
        },
        error: 'Erro ao atualizar a campanha. Tente novamente mais tarde.',
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
              Revise as informações da campanha antes de iniciá-la. Edite ou
              exclua, conforme necessário.
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
              selectedCategories={sectionsToCreate.map(
                (section) => section.category,
              )}
              categorySections={sectionsToCreate}
              onSetCategorySections={setSectionsToCreate}
            />
          </form>

          <div className="mt-auto h-px w-full bg-zinc-400" />

          <div className="flex flex-col justify-between gap-5 sm:flex-row">
            <div className="flex items-center gap-2">
              <ConfirmationModal
                variant="danger"
                title="Deletar Campanha"
                description="Tem certeza de que deseja excluir esta campanha? Ela será apagada permanentemente e não poderá ser recuperada."
                disabled={isSubmitting}
                onConfirm={() => handleDeleteCampaign()}
              >
                <Button variant="danger">
                  <span>Excluir</span>
                  <Trash className="size-5 shrink-0" />
                </Button>
              </ConfirmationModal>

              <ConfirmationModal
                title="Atualizar Campanha"
                description="Deseja confirmar a atualização das informações desta campanha? Você poderá reavaliar antes de iniciar."
                disabled={isSubmitting}
                onConfirm={() => handleSubmit(handleUpdateCampaign)()}
              >
                <Button variant="outline">
                  <span>Editar</span>
                  <Pencil className="size-5 shrink-0" />
                </Button>
              </ConfirmationModal>
            </div>

            <ConfirmationModal
              title="Iniciar Campanha"
              description="Deseja confirmar o início desta campanha? Ela será aberta para doações e não poderá ser revertida."
              disabled={isSubmitting}
              onConfirm={() => handleOpenCampaign()}
            >
              <Button>
                <span>Iniciar Campanha</span>
                <Megaphone className="size-5 shrink-0" />
              </Button>
            </ConfirmationModal>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
