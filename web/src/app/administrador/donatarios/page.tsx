import { DoneeRequestsModal } from '@/components/modals/donee-requests-modal'
import { HeaderAdmin } from '@/components/admin/header-admin'
import { cookies } from 'next/headers'
import { DoneesTable } from '@/components/admin/donees-table'

export default async function Donatario() {
  const userCookie = cookies().get('user')?.value

  if (!userCookie) return

  return (
    <>
      <HeaderAdmin />

      <main className="mx-auto mb-20 mt-16 max-w-7xl space-y-5 px-4 2xl:px-0">
        <header className="flex w-full flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <h1 className="text-3xl font-bold text-zinc-800 lg:text-4xl">
            Donatários
          </h1>

          <DoneeRequestsModal />
        </header>

        <DoneesTable />
      </main>
    </>
  )
}
