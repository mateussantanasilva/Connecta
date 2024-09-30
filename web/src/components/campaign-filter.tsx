'use client'

import { Search, X } from 'lucide-react'
import { Button } from '@/components/button'
import StatusPopoverAdmin from '@/components/status-popover-admin'
import { Input } from '@/components/input'

export function CampaignFilter() {
    return (
        < div className="flex items-center gap-4" >
            <h3 className="text-lg font-bold text-zinc-800">Filtros</h3>

            <Input placeholder="Nome da campanha" className="w-80" />


            <StatusPopoverAdmin />

            <Button
                variant="primary"
                className="flex items-center gap-2 border border-zinc-300"
            >
                <span>Filtrar resultados</span>
                <Search className="size-5 shrink-0" />
            </Button>

            <Button
                variant="outline"
                className="text-black-500 flex items-center gap-2 border border-zinc-300 bg-transparent hover:bg-zinc-100"
            >
                <span>Remover filtros</span>
                <X className="size-5 shrink-0" />
            </Button>
        </div >
    )
}
