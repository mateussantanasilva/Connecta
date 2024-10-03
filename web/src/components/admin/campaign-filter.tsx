'use client'

import { Search, X } from 'lucide-react'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { StatusPopover } from './status-popover'

export function CampaignFilter() {
  return (
    <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
      <h3 className="hidden text-lg font-bold text-zinc-800 sm:flex">
        Filtros
      </h3>

      <Input placeholder="Nome da campanha" className="w-80" />

      <StatusPopover status={['Iniciada', 'Fechada', 'Em breve']} className="hidden md:flex"/>

      <Button>
        <span>Filtrar resultados</span>
        <Search className="size-5 shrink-0" />
      </Button>

      <Button variant="outline" className="hidden md:flex">
        <span>Remover filtros</span>
        <X className="size-5 shrink-0" />
      </Button>
    </div>
  )
}
