'use client'

import { useState } from 'react'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Search, X } from 'lucide-react'

interface FilterProps {
  placeholder: string
  filter?: string
  onFilter: (filter: string) => void
}

export function Filter({ placeholder, filter, onFilter }: FilterProps) {
  const [name, setName] = useState<string>('')

  async function handleFilterByName() {
    const newFilter = `&filterBy=name&filterValue=${name}`

    if (newFilter === filter) return

    if (String(name).trim().length === 0) {
      onFilter('')
    } else {
      onFilter(newFilter)
    }

    return setName('')
  }

  return (
    <form className="flex flex-wrap gap-4 sm:flex-nowrap">
      <h3 className="hidden h-10 items-center text-lg font-bold text-zinc-800 sm:flex">
        Filtro
      </h3>

      <Input
        placeholder={placeholder}
        value={name}
        onChange={(event) => setName(event.target.value)}
        className="w-80"
      />

      <Button type="button" onClick={handleFilterByName}>
        <span>Filtrar resultados</span>
        <Search className="size-5 shrink-0" />
      </Button>

      <Button
        variant="outline"
        type="button"
        onClick={() => setName('')}
        className="hidden md:flex"
      >
        <span>Remover filtro</span>
        <X className="size-5 shrink-0" />
      </Button>
    </form>
  )
}
