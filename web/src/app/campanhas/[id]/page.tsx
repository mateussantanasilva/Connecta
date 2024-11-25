import { Checkbox } from '@/components/checkbox'
import { ReserveDonationModal } from '@/components/modals/reserve-donation-modal'
import { CampaignDetails } from '@/components/sections/campaign-details'
import { DonationItem } from '@/components/sections/donation-item'
import { Footer } from '@/components/sections/footer'
import { Header } from '@/components/sections/header'
import { CAMPAIGN_ITEMS } from '@/constants/campaign-items'
import { CAMPAIGNS } from '@/constants/campaigns'
import { api } from '@/utils/api'

interface CampanhaParams {
  params: {
    id: string
  }
}

export default async function Campanha({ params }: CampanhaParams) {
  const data = await fetch(`${api}/public/campaigns/${params.id}`)
  const campaign = await data.json()

  console.log(campaign)

  return (
    <>
      <Header />

      <main className="mx-auto mb-20 mt-16 flex max-w-7xl flex-col gap-14 px-4 lg:flex-row 2xl:px-0">
        <section className="flex-1 space-y-5">
          <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <h1 className="text-3xl font-bold text-zinc-800 lg:text-4xl">
              {campaign.name}
            </h1>

            {campaign.status !== 'fechada' && <ReserveDonationModal />}
          </header>

          {campaignItems.map((section) => (
            <div
              key={section.category}
              className="space-y-5 overflow-x-scroll sm:overflow-x-visible [&::-webkit-scrollbar]:h-1.5"
            >
              <h3 className="text-lg font-bold text-zinc-800">
                {section.category}
              </h3>

              <div className="flex items-center gap-14 px-5 text-sm font-medium uppercase text-zinc-800">
                <div className="flex min-w-48 flex-1 items-center gap-5">
                  <Checkbox
                    checked={
                      !section.items.some((item) => item.status !== 'concluído')
                    }
                    disabled
                  />
                  <strong className="font-medium">Nome do item</strong>
                </div>

                <strong className="min-w-24 text-center font-medium">
                  Quantidade
                </strong>

                <strong className="min-w-24 text-center font-medium">
                  Status
                </strong>
              </div>

              <div className="space-y-2">
                {section.items.map((item) => (
                  <DonationItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))}
        </section>

        <CampaignDetails campaign={campaign} />
      </main>

      <Footer />
    </>
  )
}
