import { Campaign } from '@/@types/Campaign'
import { Checkbox } from '@/components/checkbox'
import { ReserveDonationModal } from '@/components/modals/reserve-donation-modal'
import { CampaignDetails } from '@/components/sections/campaign-details'
import { DonationItem } from '@/components/sections/donation-item'
import { Footer } from '@/components/sections/footer'
import { Header } from '@/components/sections/header'

export default function Campanha() {
  const campaign: Campaign = {
    id: '1',
    name: 'Mutirão de Natal',
    startedAt: '2024-10-10T30:15:00.429Z',
    status: 'Aberta',
    participants: 100,
    categories: ['Alimentação', 'Vestuário'],
    collectionPoints: [
      'Av. Águia de Haia, 2983 - Cidade Antônio Estêvão de Carvalho',
      'R. Prof. Alves Pedroso, 600 - Cangaiba',
    ],
    progress: 75,
  }

  return (
    <>
      <Header />

      <main className="mx-auto mb-20 mt-16 flex max-w-7xl gap-14">
        <section className="flex-1 space-y-5">
          <header className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-zinc-800">
              {campaign.name}
            </h1>

            <ReserveDonationModal />
          </header>

          <div className="space-y-5">
            <h3 className="text-lg font-bold text-zinc-800">Alimentação</h3>

            <div className="flex items-center gap-14 px-5 text-sm font-medium uppercase text-zinc-800">
              <div className="flex flex-1 items-center gap-5">
                <Checkbox disabled />
                <strong className="font-medium">Nome do item</strong>
              </div>

              <strong className="w-24 text-center font-medium">
                Quantidade
              </strong>

              <strong className="w-24 text-center font-medium">Status</strong>
            </div>

            <div className="space-y-2">
              <DonationItem />
            </div>
          </div>
        </section>

        <CampaignDetails campaign={campaign} />
      </main>

      <Footer />
    </>
  )
}
