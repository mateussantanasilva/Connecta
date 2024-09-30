'use client'

import { Search, X } from 'lucide-react'
import { Button } from '@/components/button'
import StatusPopover from '@/components/status-popover'
import { Input } from '@/components/input'

export function DoneeFilter() {
  return (
    <div className="flex items-center gap-4">
      <h3 className="text-lg font-bold text-zinc-800">Filtros</h3>

      <Input placeholder="Nome do donatário" className="w-80" />

      <StatusPopover />

      <Button
        variant="primary"
        className="flex items-center gap-2 border border-gray-300"
      >
        <span>Filtrar resultados</span>
        <Search className="size-5 shrink-0" />
      </Button>

      <Button
        variant="outline"
        className="text-black-500 flex items-center gap-2 border border-gray-300 bg-transparent hover:bg-gray-100"
      >
        <span>Remover filtros</span>
        <X className="size-5 shrink-0" />
      </Button>
    </div>
  )
}
