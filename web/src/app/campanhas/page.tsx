import { CampaignCard } from '@/components/campaign-card'
import { Pagination } from '@/components/pagination'
import { Footer } from '@/components/sections/footer'
import { Header } from '@/components/sections/header'

export default function Campanhas() {
  return (
    <>
      <Header />

      <main className="mx-auto mb-20 mt-16 max-w-7xl space-y-6">
        <header className="max-w-xl space-y-5">
          <h1 className="text-4xl font-bold text-zinc-800">Campanhas</h1>
          <p className="max-w-lg">
            Explore todas as nossas campanhas e escolha onde contribuir ou
            buscar apoio. Sua participação é fundamental.
          </p>
        </header>

        <section className="grid grid-cols-4 gap-6">
          {Array.from({ length: 7 }).map((_, index) => (
            <CampaignCard
              key={index}
              campaign={{
                id: '1',
                name: 'Mutirão de Natal',
                startedAt: '2024-10-10T30:15:00.429Z',
                status: 'Aberta',
                participants: 100,
                categories: ['Alimentação', 'Vestuário'],
                progress: 75,
              }}
            />
          ))}
        </section>

        <Pagination />
      </main>

      <Footer />
    </>
  )
}
