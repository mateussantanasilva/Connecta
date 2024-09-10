'use client'

import * as Popover from '@radix-ui/react-popover'
import { LogOut, Settings } from 'lucide-react'

export function SettingsMenu() {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Settings className="size-6 text-zinc-700 transition-colors hover:text-green-600" />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          sideOffset={10}
          className="w-max rounded-2xl bg-white p-5 shadow"
        >
          <button className="flex items-center gap-1.5 font-medium text-red-600 transition-colors hover:text-red-700">
            Encerrar sessão
            <LogOut className="size-5 shrink-0" />
          </button>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
