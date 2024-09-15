import { CampaignCard } from '@/components/campaign-card'
import { Pagination } from '@/components/pagination'
import { Footer } from '@/components/sections/footer'
import { Header } from '@/components/sections/header'

export default function Campanhas() {
  return (
    <>
      <Header />

      <main className="mx-auto mb-20 mt-10 max-w-7xl space-y-6 px-4 md:mt-16 2xl:px-0">
        <header className="max-w-xl space-y-5">
          <h1 className="text-3xl font-bold text-zinc-800 lg:text-4xl">
            Campanhas
          </h1>
          <p className="max-w-lg">
            Explore todas as nossas campanhas e escolha onde contribuir ou
            buscar apoio. Sua participação é fundamental.
          </p>
        </header>

        <section className="grid grid-cols-cards gap-6">
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
                collectionPoints: [
                  'Av. Águia de Haia, 2983 - Cidade Antônio Estêvão de Carvalho',
                  'R. Prof. Alves Pedroso, 600 - Cangaiba',
                ],
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
