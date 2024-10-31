import React, { useState } from 'react'
import { Trash, Plus } from 'lucide-react'
import { Button } from '@/components/button'
import { Input } from '@/components/input'

interface CategoryCheckboxesProps {
  title: string
  selectedCategories: string[]
  initialItems?: Record<string, { nome: string; quantidade: string }[]>
  disabled?: boolean
}

const categories = [
  'Alimentação',
  'Vestuário',
  'Higiene',
  'Limpeza',
  'Brinquedos',
  'Educação',
  'Utilidades',
] as const

type Category = (typeof categories)[number]

export function CategoryCheckboxes({
  title,
  selectedCategories,
  initialItems = {},
  disabled,
}: CategoryCheckboxesProps) {
  const initialSelectedCategories: Record<Category, boolean> =
    categories.reduce(
      (acc, category) => {
        acc[category] = selectedCategories.includes(category)
        return acc
      },
      {} as Record<Category, boolean>,
    )

  const [selectedCategoriesState, setSelectedCategories] = useState<
    Record<Category, boolean>
  >(initialSelectedCategories)
  const [items, setItems] = useState<typeof initialItems>(initialItems)

  const handleCheckboxChange = (category: Category) => {
    if (!disabled) {
      setSelectedCategories((prev) => ({
        ...prev,
        [category]: !prev[category],
      }))
    }
  }

  const handleItemChange = (
    category: Category,
    index: number,
    field: 'nome' | 'quantidade',
    value: string,
  ) => {
    if (!disabled) {
      setItems((prevItems) => {
        const updatedItems = [...prevItems[category]]
        updatedItems[index][field] = value

        return {
          ...prevItems,
          [category]: updatedItems,
        }
      })
    }
  }

  const handleAddItem = (category: Category) => {
    setItems((prevItems) => ({
      ...prevItems,
      [category]: [
        ...(prevItems[category] || []),
        { nome: '', quantidade: '' },
      ],
    }))
  }

  const handleRemoveItem = (category: Category, index: number) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems[category]]
      updatedItems.splice(index, 1)

      return {
        ...prevItems,
        [category]: updatedItems,
      }
    })
  }

  return (
    <div>
      <label className="mb-2 block font-medium text-zinc-700">{title}</label>
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category}>
            <div className="flex items-center">
              <input
                id={category}
                type="checkbox"
                checked={!!selectedCategoriesState[category]}
                onChange={() => handleCheckboxChange(category)}
                className="h-4 w-4 rounded border-zinc-300"
                disabled={disabled}
              />
              <label
                htmlFor={category}
                className="ml-2 block text-sm text-zinc-900"
              >
                {category}
              </label>
            </div>

            {selectedCategoriesState[category] && (
              <div className="mt-2 space-y-5 sm:space-y-2">
                <label className="mb-1 flex flex-col gap-1 text-sm font-medium text-zinc-800">
                  Nome do item
                </label>
                {items[category]?.map((item, index) => (
                  <div key={index} className="flex flex-col gap-2 sm:flex-row">
                    <Input
                      type="text"
                      value={item.nome}
                      onChange={(e) =>
                        handleItemChange(
                          category,
                          index,
                          'nome',
                          e.target.value,
                        )
                      }
                      className="flex-grow"
                      disabled={disabled}
                    />

                    <div className="flex items-center gap-2">
                      <Input
                        type="text"
                        placeholder="Ex.: 10kg, 5 pacotes, peças..."
                        value={item.quantidade}
                        onChange={(e) =>
                          handleItemChange(
                            category,
                            index,
                            'quantidade',
                            e.target.value,
                          )
                        }
                        disabled={disabled}
                      />

                      {!disabled && (
                        <Button
                          variant="danger"
                          size="xxs"
                          type="button"
                          onClick={() => handleRemoveItem(category, index)}
                        >
                          <Trash className="size-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                {!disabled && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleAddItem(category)}
                  >
                    <span>Adicionar item</span>
                    <Plus className="size-5 shrink-0" />
                  </Button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
