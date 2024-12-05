import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './button'

interface PaginationProps {
  total: number
  currentPage: number
  totalPages: number
  handlePreviousPage: () => void
  handleNextPage: () => void
}

export function Pagination({
  total,
  currentPage,
  totalPages,
  handlePreviousPage,
  handleNextPage,
}: PaginationProps) {
  return (
    <div className="flex flex-col-reverse items-center justify-between gap-5 text-sm sm:flex-row">
      <span>Total de {total} item(s)</span>

      <div className="flex flex-col-reverse items-center gap-5 sm:flex-row">
        <span className="text-sm font-medium">
          Página {totalPages === 0 ? 0 : currentPage} de {totalPages}
        </span>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === 1}
            onClick={handlePreviousPage}
          >
            <ChevronLeft className="size-5 shrink-0" />
            <span>Anterior</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={handleNextPage}
          >
            <span>Próximo</span>
            <ChevronRight className="size-5 shrink-0" />
          </Button>
        </div>
      </div>
    </div>
  )
}
