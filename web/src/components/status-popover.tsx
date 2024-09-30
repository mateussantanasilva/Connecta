'use client'

import * as Popover from '@radix-ui/react-popover'
import { ChevronDown } from 'lucide-react'

export default function StatusPopover() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="flex h-10 items-center gap-2 rounded-lg border border-zinc-400 bg-white px-2 py-3 text-sm text-zinc-700 focus:outline-none enabled:hover:border-zinc-800 enabled:hover:text-zinc-800">
          <span>Todos os status</span>
          <ChevronDown className="h-5 w-5" />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          sideOffset={5}
        >
          <div className="p-2">
            <button className="w-full px-4 py-2 text-left text-sm hover:bg-zinc-100">
              Apto
            </button>
            <button className="w-full px-4 py-2 text-left text-sm hover:bg-zinc-100">
              Inativo
            </button>
            <button className="w-full px-4 py-2 text-left text-sm hover:bg-zinc-100">
              Em análise
            </button>
          </div>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
