'use client'

import { CheckboxProps } from '@radix-ui/react-checkbox'
import * as CheckboxRdx from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'

export function Checkbox(props: CheckboxProps) {
  return (
    <CheckboxRdx.Root
      {...props}
      className="flex size-5 items-center justify-center overflow-hidden rounded-lg border border-zinc-400 bg-white"
    >
      <CheckboxRdx.Indicator className="flex size-5 items-center justify-center border border-green-600 bg-green-600">
        <Check className="size-3 text-white" />
      </CheckboxRdx.Indicator>
    </CheckboxRdx.Root>
  )
}
