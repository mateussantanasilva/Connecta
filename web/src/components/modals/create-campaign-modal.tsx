'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import { Button } from '@/components/button'
import { X, Plus } from 'lucide-react'
import { Input } from '../input'
import { CollectionPoints } from '../admin/collection-points'
import { TextArea } from '../text-area'
import { CategoryCheckboxes } from '../admin/category-checkboxes'

export function CreateCampaignModal() {
  const [collectionPoints, setCollectionPoints] = useState([{ endereco: '' }])

  const handlePointsChange = (updatedPoints: { endereco: string }[]) => {
    setCollectionPoints(updatedPoints)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>
          <span>Criar campanhas</span>
          <Plus className="size-5 shrink-0" />
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
              Criar Nova Campanha
            </Dialog.Title>

            <Dialog.Description className="text-sm sm:text-base">
              Preencha os detalhes abaixo para anunciar uma nova campanha.
            </Dialog.Description>
          </header>

          <form className="space-y-5">
            <Input title="Nome da campanha" type="text" />

            <CollectionPoints
              title="Pontos de coleta"
              initialPoints={collectionPoints}
              onPointsChange={handlePointsChange}
            />

            <TextArea title="Descrição" />
            <TextArea title="Observações" />
            <CategoryCheckboxes title="Categorias" selectedCategories={[]} />
          </form>
          <div className="mt-auto h-px w-full bg-zinc-400" />

          <Button className="ml-auto">
            <span>Criar campanha</span>
            <Plus className="size-5 shrink-0" />
          </Button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
