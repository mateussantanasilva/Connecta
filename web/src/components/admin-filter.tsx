'use client'

import { Search, X } from 'lucide-react'
import { Button } from '@/components/button'
import { Input } from '@/components/input'

export function AdminFilter() {
  return (
    <div className="flex items-center gap-4">
      <h3 className="text-lg font-bold text-zinc-800">Filtros</h3>

      <Input placeholder="Nome do Doador" className="w-80" />

      <Button>
        <span>Filtrar resultados</span>
        <Search className="size-5 shrink-0" />
      </Button>

      <Button variant="outline">
        <span>Remover filtros</span>
        <X className="size-5 shrink-0" />
      </Button>
    </div>
  )
}
