import React, { useState } from 'react'; 
import { Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/button';
//import { Input } from '@/components/input'


interface CategoryCheckboxesProps {
    title: string;
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

// Initialize selectedCategories with all categories set to false
const initialSelectedCategories: Record<Category, boolean> = {
    'Alimentação': false,
    'Vestuário': false,
    'Higiene': false,
    'Limpeza': false,
    'Brinquedos': false,
    'Educação': false,
    'Utilidades': false
};

export function CategoryCheckboxes({ title }: CategoryCheckboxesProps) {
    const [selectedCategories, setSelectedCategories] = useState<Record<Category, boolean>>(initialSelectedCategories);
    const [items, setItems] = useState<typeof initialItems>(initialItems);

    const handleCheckboxChange = (category: Category) => {
        setSelectedCategories(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    const handleAddItem = (category: Category) => {
        setItems(prevItems => ({
            ...prevItems,
            [category]: [...prevItems[category], { nome: '', quantidade: '' }]
        }));
    };

    const handleItemChange = (category: Category, index: number, field: 'nome' | 'quantidade', value: string) => {
        setItems(prevItems => {
            const updatedItems = [...prevItems[category]];
            updatedItems[index][field] = value;

            return {
                ...prevItems,
                [category]: updatedItems
            };
        });
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
                                checked={!!selectedCategories[category]}
                                onChange={() => handleCheckboxChange(category)}
                                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                            <label htmlFor={category} className="ml-2 block text-sm text-gray-900">
                                {category}
                            </label>
                        </div>

                        {selectedCategories[category] && (
                            <div className="mt-2 space-y-2">
                                {items[category].map((item, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <input
                                            type="text"
                                            placeholder="Nome do item"
                                            value={item.nome}
                                            onChange={(e) => handleItemChange(category, index, 'nome', e.target.value)}
                                            className="w-[368px] h-[42px] px-[8px] py-[12px] gap-[10px] flex-grow border border-gray-300 rounded p-2"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Ex.: 10kg, 5 pacotes, peças..."
                                            value={item.quantidade}
                                            onChange={(e) => handleItemChange(category, index, 'quantidade', e.target.value)}
                                            className="w-[224px] h-[42px] gap-[8px] border border-gray-300 rounded p-2"
                                        />
                                        <Button
                                            type="button"
                                            onClick={() => handleRemoveItem(category, index)}
                                            className="text-red-500 bg-transparent border border-gray-300 hover:bg-gray-200"
                                        >
                                            <Trash2 />
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    onClick={() => handleAddItem(category)}
                                    className="mt-2 p-2 border rounded flex items-center space-x-1 bg-white text-black border-gray-300 hover:text-white"
                                    >
                                    <span>Adicionar item</span>
                                    <Plus className="shrink-0" />
                                </Button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}