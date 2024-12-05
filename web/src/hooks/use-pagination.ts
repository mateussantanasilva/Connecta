import { useState } from 'react'

export function usePagination() {
  const [page, setPage] = useState(0)
  const [totalResponses, setTotalResponses] = useState(0)

  function onChangePage(action: 'previous' | 'next') {
    if (!page) return

    if (action === 'previous' && page > 1) return setPage((state) => state - 1)

    const totalPages = Math.ceil((totalResponses || 0) / 8)

    if (action === 'next' && page < totalPages)
      return setPage((state) => state + 1)
  }

  return {
    page,
    setPage,
    totalResponses,
    setTotalResponses,
    onChangePage,
  }
}
