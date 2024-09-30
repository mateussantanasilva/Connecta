'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { Button } from '@/components/button';
import { X, Search } from 'lucide-react';
import { Input } from '../input';
import { CategoryCheckboxes } from '@/components/category-checkboxes';
import { CollectionPoints } from '../collection-points';
import { TextArea } from '../text-area';

export function ClosedCampaignModal() {
    const initialCampaignName = 'Mutirão de Aniversário';
    const initialCampaignDescription = 'Ajude-nos a arrecadar brinquedos e comida para famílias carentes da cidade. Sua contribuição será boa!';
    const initialCampaignObservation = 'Esta campanha foi finalizada. Consulte os detalhes para mais informações.';
    const initialCollectionPoints = [
        { endereco: 'Rua das Flores, 123 - São Paulo' },
        { endereco: 'Av. Brasil, 789 - Rio de Janeiro' }
    ];
    const initialCategories = ['Brinquedos', 'Alimentação'];

    const initialItems = {
        'Alimentação': [{ nome: 'Bolacha', quantidade: '5 Pacotes' }],
        'Brinquedos': [{ nome: 'Boneca', quantidade: '3 Caixas' }]
    };

    const [collectionPoints, setCollectionPoints] = useState(initialCollectionPoints);

    const handlePointsChange = (updatedPoints: { endereco: string }[]) => {
        setCollectionPoints(updatedPoints);
    };

    const isDisabled = true;

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
            <Button variant="outline" className="flex items-center gap-2 border border-zinc-300 bg-transparent p-2 rounded-md hover:bg-zinc-200">
                    <Search className="w-5 h-5 text-black hover:text-black" />
                </Button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-20 bg-black/60" />

                <Dialog.Content className="fixed inset-0 left-4 right-4 z-30 mx-auto my-4 flex max-w-2xl flex-col gap-5 overflow-y-scroll rounded-2xl bg-white p-5 md:ml-auto md:mr-0 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar]:bg-transparent">
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
                            Esta campanha foi finalizada. Consulte os detalhes para mais informações.
                        </Dialog.Description>
                    </header>

                    <form className="space-y-5">
                        <Input
                            title="Nome da campanha"
                            type="text"
                            defaultValue={initialCampaignName}
                            disabled={isDisabled}
                        />

                        <CollectionPoints
                            title='Pontos de coleta'
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
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
