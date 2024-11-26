'use client'

import { Trash } from 'lucide-react'
import { Button } from './button'
import { ComponentProps } from 'react'

interface QuantityInputProps extends ComponentProps<'input'> {
  unitMeasure: string
}

export function QuantityInput({ unitMeasure, ...props }: QuantityInputProps) {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium text-zinc-800">
      Quantidade
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <input
            title="Quantidade"
            className="h-10 max-w-24 rounded-lg border border-zinc-400 bg-white px-2 py-3 text-sm text-zinc-700 outline-green-600"
            {...props}
          />
          <span className="text-sm">{unitMeasure.toLocaleLowerCase()}</span>
        </div>

        <Button variant="danger" size="xxs">
          <Trash className="size-4 shrink-0" />
        </Button>
      </div>
    </label>
  )
}
