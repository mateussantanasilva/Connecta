import { Campaign } from '@/@types/Campaign'
import { CampaignDetails } from '@/components/sections/campaign-details'
import { CampaignPresentation } from '@/components/sections/campaign-presentation'
import { Footer } from '@/components/sections/footer'
import { Header } from '@/components/sections/header'
import { api } from '@/utils/api'

interface CampanhaParams {
  params: {
    id: string
  }
}

export default async function Campanha({ params }: CampanhaParams) {
  const data = await fetch(`${api}/public/campaigns/${params.id}`, {
    cache: 'no-cache',
  })
  const campaign: Campaign = await data.json()

  return (
    <>
      <Header />

      <main className="mx-auto mb-20 mt-16 flex max-w-7xl flex-col gap-14 px-4 lg:flex-row 2xl:px-0">
        <CampaignPresentation campaign={campaign} />

        <CampaignDetails campaign={campaign} />
      </main>

      <Footer />
    </>
  )
}
