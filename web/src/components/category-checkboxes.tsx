import React, { useState } from 'react';
import { Trash, Plus } from 'lucide-react';
import { Button } from '@/components/button';
import { Input } from '@/components/input';

interface CategoryCheckboxesProps {
    title: string;
    selectedCategories: string[];
    initialItems?: Record<string, { nome: string; quantidade: string }[]>;
    disabled?: boolean;
}

const categories = [
    'Alimentação',
    'Vestuário',
    'Higiene',
    'Limpeza',
    'Brinquedos',
    'Educação',
    'Utilidades'
] as const;

type Category = typeof categories[number];

const initialItems: Record<Category, { nome: string; quantidade: string }[]> = {
    'Alimentação': [],
    'Vestuário': [],
    'Higiene': [],
    'Limpeza': [],
    'Brinquedos': [],
    'Educação': [],
    'Utilidades': []
};

export function CategoryCheckboxes({ title, selectedCategories, initialItems = {}, disabled }: CategoryCheckboxesProps) {
    const initialSelectedCategories: Record<Category, boolean> = categories.reduce((acc, category) => {
        acc[category] = selectedCategories.includes(category);
        return acc;
    }, {} as Record<Category, boolean>);

    const [selectedCategoriesState, setSelectedCategories] = useState<Record<Category, boolean>>(initialSelectedCategories);
    const [items, setItems] = useState<typeof initialItems>(initialItems);

    const handleCheckboxChange = (category: Category) => {
        if (!disabled) {
            setSelectedCategories(prev => ({
                ...prev,
                [category]: !prev[category]
            }));
        }
    };

    const handleItemChange = (category: Category, index: number, field: 'nome' | 'quantidade', value: string) => {
        if (!disabled) {
            setItems(prevItems => {
                const updatedItems = [...prevItems[category]];
                updatedItems[index][field] = value;

                return {
                    ...prevItems,
                    [category]: updatedItems
                };
            });
        }
    };

    const handleAddItem = (category: Category) => {
        setItems(prevItems => ({
            ...prevItems,
            [category]: [...(prevItems[category] || []), { nome: '', quantidade: '' }]
        }));
    };

    const handleRemoveItem = (category: Category, index: number) => {
        setItems(prevItems => {
            const updatedItems = [...prevItems[category]];
            updatedItems.splice(index, 1);

            return {
                ...prevItems,
                [category]: updatedItems
            };
        });
    };

    return (
        <div>
            <label className="block font-medium text-gray-700 mb-2">{title}</label>
            <div className="space-y-4">
                {categories.map((category) => (
                    <div key={category}>
                        <div className="flex items-center">
                            <input
                                id={category}
                                type="checkbox"
                                checked={!!selectedCategoriesState[category]}
                                onChange={() => handleCheckboxChange(category)}
                                className="h-4 w-4 border-gray-300 rounded" 
                                disabled={disabled}

                            />
                            <label htmlFor={category} className="ml-2 block text-sm text-gray-900">
                                {category}
                            </label>
                        </div>

                        {selectedCategoriesState[category] && (
                            <div className="mt-2 space-y-2">
                                <label className="flex flex-col gap-1 text-sm font-medium text-zinc-800 mb-1">Nome do item</label>
                                {items[category]?.map((item, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <Input
                                            type="text"
                                            value={item.nome}
                                            onChange={(e) => handleItemChange(category, index, 'nome', e.target.value)}
                                            className="flex-grow"
                                            disabled={disabled} 
                                        />
                                        <Input
                                            type="text"
                                            placeholder="Ex.: 10kg, 5 pacotes, peças..."
                                            value={item.quantidade}
                                            onChange={(e) => handleItemChange(category, index, 'quantidade', e.target.value)}
                                            disabled={disabled} 
                                        />
                                        
                                        {!disabled && (
                                            <Button
                                                variant="outline"
                                                type="button"
                                                onClick={() => handleRemoveItem(category, index)}
                                                className="text-red-500 bg-transparent border border-gray-300 hover:bg-gray-200"
                                            >
                                                <Trash />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                {!disabled && (
                                    <Button
                                        type="button"
                                        onClick={() => handleAddItem(category)}
                                        className="mt-2 p-2 border rounded flex items-center space-x-1 bg-white text-black border-gray-300 hover:text-white"
                                    >
                                        <span>Adicionar item</span>
                                        <Plus className="shrink-0" />
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}