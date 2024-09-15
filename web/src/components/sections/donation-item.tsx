'use client'

import { useState } from 'react'
import { Checkbox } from '../checkbox'
import { twMerge } from 'tailwind-merge'

export function DonationItem() {
  const [checked, setChecked] = useState<boolean | 'indeterminate'>(false)

  return (
    <div
      className={twMerge(
        'flex min-w-fit items-center gap-14 rounded-2xl p-5 shadow',
        checked && 'ring-1 ring-green-600',
      )}
    >
      <div className="flex min-w-48 flex-1 items-center gap-5">
        <Checkbox
          checked={checked}
          onCheckedChange={(checked) => setChecked(checked)}
        />
        <span>Pacote de arroz</span>
      </div>

      <span className="min-w-24 text-center">10kg</span>

      <span className="min-w-24 rounded-lg border border-zinc-700 px-2 py-1 text-center text-xs font-medium">
        Disponível
      </span>
    </div>
  )
}
