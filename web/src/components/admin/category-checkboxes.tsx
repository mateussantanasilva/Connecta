import { Trash, Plus } from 'lucide-react'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Checkbox } from '../checkbox'
import {
  CampaignItemAdm,
  CampaignSection,
  CampaignSectionAdm,
} from '@/@types/Campaign'
import { CATEGORIES } from '@/utils/campaign-creation'

interface CategoryCheckboxesProps {
  disabled?: boolean
  selectedCategories?: string[]
  categorySections: CampaignSection[] | CampaignSectionAdm[]
  onSetCategorySections?: (section: CampaignSectionAdm[]) => void
}

export function CategoryCheckboxes({
  disabled,
  selectedCategories,
  categorySections,
  onSetCategorySections,
}: CategoryCheckboxesProps) {
  function handleCheck(category: string) {
    if (!onSetCategorySections) return

    const isSelectedSection = categorySections.find(
      (section) => section.category === category,
    )

    if (isSelectedSection) {
      const updatedSections = categorySections.filter(
        (section) => section.category !== category,
      )

      return onSetCategorySections(updatedSections)
    }

    return onSetCategorySections([
      ...categorySections,
      {
        category,
        items: [{ id: Date.now(), name: '', goal: 0, measure: '' }],
      },
    ])
  }

  function handleAddItem(category: string) {
    if (!onSetCategorySections) return

    const updatedSections = categorySections.map((section) =>
      section.category === category
        ? {
            ...section,
            items: [
              ...section.items,
              { id: Date.now(), name: '', goal: 0, measure: '' },
            ],
          }
        : section,
    )

    onSetCategorySections(updatedSections)
  }

  function handleRemoveItem(category: string, item: CampaignItemAdm) {
    if (!onSetCategorySections) return

    const updatedSections = categorySections
      .map((section) =>
        section.category === category
          ? {
              ...section,
              items: section.items.filter(
                (storedItem) => storedItem.name !== item.name,
              ),
            }
          : section,
      )
      .filter((section) => section.items.length > 0)

    onSetCategorySections(updatedSections)
  }

  function handleChangeItemName(category: string, index: number, name: string) {
    if (!onSetCategorySections) return

    const updatedSections = categorySections.map((section) => {
      if (section.category !== category) return section

      const updatedItems = section.items.map((item, itemIndex) =>
        itemIndex === index ? { ...item, name } : item,
      )

      return {
        ...section,
        items: updatedItems,
      }
    })

    onSetCategorySections(updatedSections)
  }

  function handleChangeItemQuantity(
    category: string,
    index: number,
    value: string,
  ) {
    if (!onSetCategorySections) return

    const [goal, ...measureParts] = value.split(' ')
    const measure = measureParts.join(' ')

    const updatedSections = categorySections.map((section) => {
      if (section.category !== category) return section

      const updatedItems = section.items.map((item, itemIndex) =>
        itemIndex === index
          ? { ...item, goal: isNaN(Number(goal)) ? 0 : Number(goal), measure }
          : item,
      )

      return {
        ...section,
        items: updatedItems,
      }
    })

    onSetCategorySections(updatedSections)
  }

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-zinc-800">
        Campanhas
      </label>

      <div className="space-y-4">
        {CATEGORIES.map((category) => (
          <div key={category}>
            <div className="flex items-center">
              <Checkbox
                checked={
                  !!categorySections.find(
                    (section) =>
                      section.category === category ||
                      selectedCategories?.includes(category),
                  )
                }
                onCheckedChange={() => handleCheck(category)}
                disabled={disabled}
              />

              <label
                htmlFor={category}
                className="ml-2 block text-sm text-zinc-900"
              >
                {category}
              </label>
            </div>

            {categorySections
              .find((section) => section.category === category)
              ?.items.map((item, index) => (
                <div key={item.id} className="mt-2 space-y-5 sm:space-y-2">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
                    <div className="flex flex-1 flex-col gap-1">
                      <label className="mb-1 text-sm font-medium text-zinc-800">
                        Nome do item
                      </label>
                      <Input
                        type="text"
                        defaultValue={item.name !== String(0) ? item.name : ''}
                        disabled={disabled}
                        onChange={(event) =>
                          handleChangeItemName(
                            category,
                            index,
                            event.target.value,
                          )
                        }
                      />
                    </div>

                    <div className="flex flex-col sm:min-w-64">
                      <label className="mb-1 text-sm font-medium text-zinc-800">
                        Quantidade
                      </label>

                      <div className="flex items-center gap-2">
                        <Input
                          type="text"
                          placeholder="Ex.: 10 kg, 5 pacotes, peças..."
                          defaultValue={
                            item.goal ? `${item.goal} ${item.measure}` : ''
                          }
                          disabled={disabled}
                          onChange={(event) =>
                            handleChangeItemQuantity(
                              category,
                              index,
                              event.target.value,
                            )
                          }
                          className="w-full xs:w-fit sm:flex-1"
                        />

                        {!disabled && (
                          <Button
                            variant="danger"
                            size="xxs"
                            type="button"
                            onClick={() => handleRemoveItem(category, item)}
                          >
                            <Trash className="size-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            {!disabled &&
              categorySections.find(
                (section) => section.category === category,
              ) && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleAddItem(category)}
                  className="mt-2"
                >
                  <span>Adicionar item</span>
                  <Plus className="size-5 shrink-0" />
                </Button>
              )}
          </div>
        ))}
      </div>
    </div>
  )
}
