import { CreateCampaignModal } from '@/components/modals/create-campaign-modal'
import { HeaderAdmin } from '@/components/admin/header-admin'
import { cookies } from 'next/headers'
import { CampaignsTable } from '@/components/admin/campaigns-table'

export default async function Campanha() {
  const userCookie = cookies().get('user')?.value

  if (!userCookie) return

  return (
    <>
      <HeaderAdmin />
      <main className="mx-auto mb-20 mt-16 max-w-7xl space-y-5 px-4 2xl:px-0">
        <header className="flex w-full flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <h1 className="text-3xl font-bold text-zinc-800 lg:text-4xl">
            Campanhas
          </h1>

          <CreateCampaignModal />
        </header>

        <CampaignsTable />
      </main>
    </>
  )
}
