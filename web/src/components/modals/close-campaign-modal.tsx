'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import { Button } from '@/components/button'
import { X, Search, Lock, ArrowUpRight } from 'lucide-react'
import { Input } from '../input'
import { CollectionPoints } from '../admin/collection-points'
import { TextArea } from '../text-area'
import { CategoryCheckboxes } from '../admin/category-checkboxes'

export function CloseCampaignModal() {
  const initialCampaignName = 'Mutirão de Natal 2024'
  const initialCampaignDescription =
    'Campanha aberta para doações. Você pode fechá-la no momento que desejar.'
  const initialCampaignObservation =
    'Certifique-se de que os itens doados estejam dentro do prazo de validade e em boas condições.'
  const initialCollectionPoints = [
    { endereco: 'Rua das Flores, 123 - São Paulo' },
    { endereco: 'Av. Brasil, 789 - Rio de Janeiro' },
  ]
  const initialCategories = ['Vestuário', 'Alimentação']

  const initialItems = {
    Alimentação: [
      { nome: 'Carne seca', quantidade: '10 Kg' },
      { nome: 'Pão', quantidade: '2 Pacotes' },
    ],
    Vestuário: [{ nome: 'Calça de frio', quantidade: '5' }],
  }

  const [collectionPoints, setCollectionPoints] = useState(
    initialCollectionPoints,
  )
  const isDisabled = true

  const handlePointsChange = (updatedPoints: { endereco: string }[]) => {
    setCollectionPoints(updatedPoints)
  }

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
              Detalhes da Campanha
            </Dialog.Title>

            <Dialog.Description className="text-sm sm:text-base">
              Campanha aberta para doações. Você pode fechá-la no momento que
              desejar.
            </Dialog.Description>
          </header>

          <a
            href="http://localhost:3000/campanhas/1"
            target="_blank"
            rel="noopener"
            className="flex items-center gap-1.5 font-bold text-orange-600 transition-colors hover:text-orange-700"
          >
            Acompanhe os detalhes desta campanha
            <ArrowUpRight className="size-5 shrink-0" />
          </a>

          <form className="space-y-5">
            <Input
              title="Nome da campanha"
              type="text"
              defaultValue={initialCampaignName}
              disabled={isDisabled}
            />

            <CollectionPoints
              title="Pontos de coleta"
              initialPoints={collectionPoints}
              onPointsChange={handlePointsChange}
              disabled={isDisabled}
            />

            <TextArea
              title="Descrição"
              defaultValue={initialCampaignDescription}
              disabled={isDisabled}
            />
            <TextArea
              title="Observações"
              defaultValue={initialCampaignObservation}
              disabled={isDisabled}
            />

            <CategoryCheckboxes
              title="Categorias"
              selectedCategories={initialCategories}
              initialItems={initialItems}
              disabled={isDisabled}
            />
          </form>

          <div className="flex justify-end">
            <Button variant="danger">
              <span>Fechar Campanha</span>
              <Lock className="size-5 shrink-0" />
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
