'use client'

import * as Popover from '@radix-ui/react-popover'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

interface StatusPopoverProps {
  status: string[]
  className?: string
}

export function StatusPopover({ status, className }: StatusPopoverProps) {
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])

  const handleStatusClick = (status: string) => {
    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(selectedStatuses.filter((s) => s !== status))
    } else {
      setSelectedStatuses([...selectedStatuses, status])
    }
  }

  const getButtonLabel = () => {
    if (selectedStatuses.length === 0) {
      return 'Todos os status'
    } else {
      return selectedStatuses.join(', ')
    }
  }

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className={twMerge(
            'flex h-10 w-48 items-center justify-between gap-2 rounded-lg border border-zinc-400 bg-white px-2 py-3 text-sm focus:outline-none enabled:hover:border-zinc-800 enabled:hover:text-zinc-800',
            className,
          )}
        >
          <span className="truncate">{getButtonLabel()}</span>
          <ChevronDown className="h-5 w-5" />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          sideOffset={5}
        >
          <div className="p-2">
            {status.map((status, index) => (
              <button
                key={index}
                onClick={() => handleStatusClick(status)}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-zinc-100 ${
                  selectedStatuses.includes(status) ? 'bg-zinc-200' : ''
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
