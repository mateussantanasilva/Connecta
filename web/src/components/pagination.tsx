import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './button'

export function Pagination() {
  return (
    <div className="flex items-center justify-between">
      <span>Total de 4 item(s)</span>

      <div className="flex items-center gap-5">
        <span className="font-medium">Página 1 de 2</span>

        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <ChevronLeft className="size-5 shrink-0" />
            <span>Anterior</span>
          </Button>
          <Button size="sm" variant="outline">
            <span>Próximo</span>
            <ChevronRight className="size-5 shrink-0" />
          </Button>
        </div>
      </div>
    </div>
  )
}
