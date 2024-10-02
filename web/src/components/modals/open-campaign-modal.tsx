'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import { Button } from '@/components/button'
import { X, Search, Trash, Pencil, Megaphone } from 'lucide-react'
import { Input } from '../input'
import { CollectionPoints } from '../admin/collection-points'
import { TextArea } from '../text-area'
import { CategoryCheckboxes } from '../admin/category-checkboxes'

export function OpenCampaignModal() {
  const initialCampaignName = 'Mutirão de Ano novo'
  const initialCampaignDescription =
    'Ajude-nos a arrecadar alimentos e itens de limpeza para famílias carentes neste Ano Novo. Sua contribuição será boa!'
  const initialCampaignObservation =
    'Certifique-se de que os itens doados estejam dentro do prazo de validade e em boas condições.'
  const initialCollectionPoints = [
    { endereco: 'Rua das Flores, 123 - São Paulo' },
    { endereco: 'Av. Brasil, 789 - Rio de Janeiro' },
  ]
  const initialCategories = ['Limpeza', 'Alimentação']

  const initialItems = {
    Alimentação: [{ nome: 'Panettone', quantidade: '10' }],
    Limpeza: [{ nome: 'Veja', quantidade: '2' }],
  }

  const [collectionPoints, setCollectionPoints] = useState(
    initialCollectionPoints,
  )

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
              Revise as informações da campanha antes de iniciá-la. Edite ou
              exclua, conforme necessário.
            </Dialog.Description>
          </header>

          <form className="space-y-5">
            <Input
              title="Nome da campanha"
              type="text"
              defaultValue={initialCampaignName}
            />

            <CollectionPoints
              title="Pontos de coleta"
              initialPoints={collectionPoints}
              onPointsChange={handlePointsChange}
            />

            <TextArea
              title="Descrição"
              defaultValue={initialCampaignDescription}
            />
            <TextArea
              title="Observações"
              defaultValue={initialCampaignObservation}
            />

            <CategoryCheckboxes
              title="Categorias"
              selectedCategories={initialCategories}
              initialItems={initialItems}
            />
          </form>

          <div className="mt-auto h-px w-full bg-zinc-400" />

          <div className="flex flex-col justify-between gap-5 sm:flex-row">
            <div className="flex items-center gap-2">
              <Button variant="danger">
                <span>Excluir</span>
                <Trash className="size-5 shrink-0" />
              </Button>
              <Button variant="outline">
                <span>Editar</span>
                <Pencil className="size-5 shrink-0" />
              </Button>
            </div>

            <Button>
              <span>Iniciar Campanha</span>
              <Megaphone className="size-5 shrink-0" />
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
