import { ArrowUpRight } from 'lucide-react'
import { HeaderAdmin } from '@/components/sections/header-admin'
import { Pagination } from '@/components/pagination'
import { CreateCampaignModal } from '@/components/modals/create-campaign-modal'
import { OpenCampaignModal } from '@/components/modals/open-campaign-modal'
import { CloseCampaignModal } from '@/components/modals/close-campaign-modal'
import { ClosedCampaignModal } from '@/components/modals/closed-campaign-modal'
import { CampaignFilter } from '@/components/campaign-filter'
import { StatusIndicator } from '@/components/status-indicator'


export default function Campanha() {
  return (
    <>
      <HeaderAdmin />
      <main className="mx-auto mb-20 mt-16 max-w-7xl space-y-5 px-4 2xl:px-0">
        <header className="flex w-full items-center justify-between">
          <h1 className="text-4xl font-bold text-zinc-800">Campanhas</h1>

          <CreateCampaignModal />
        </header>

        <CampaignFilter />

        <section
          role="table"
          className="divide-y divide-zinc-400 rounded-lg border border-zinc-400"
        >
          <header className="flex h-10 items-center gap-5 px-5 text-sm font-medium uppercase text-zinc-800">
            <div className="flex items-center gap-5">
              <div className="not-sr-only size-9" />
              <strong className="w-48">Identificador</strong>
            </div>
            <strong className="w-48">Status</strong>
            <strong className="flex-1">Nome</strong>
            <strong className="w-48">Categorias</strong>
            <strong className="w-56">Progresso</strong>
          </header>

          <div role="row" className="flex h-16 items-center gap-5 px-5 text-sm">
            <div className="flex items-center gap-5">
              <CloseCampaignModal />
              <span className="w-48 truncate">4fugy5b5-9def-48db-575798</span>
            </div>

            <div className="w-48">
              <StatusIndicator status="Iniciada" />
            </div>

            <span className="flex-1">Mutirão de Natal</span>

            <span className="w-48 truncate">Vestuário, Alimentação</span>

            <div className="flex items-center w-56">
              <td className='w-28'>
                72%
                <br />
                13 doação(s)
              </td>
              <a
                href="http://localhost:3000/campanhas/1"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center rounded font-semibold text-[#DD720F] transition duration-300 hover:underline"
              >
                Detalhes
                <ArrowUpRight className="size-5 shrink-0" />
              </a>
            </div>
          </div>

          <div role="row" className="flex h-16 items-center gap-5 px-5 text-sm">
            <div className="flex items-center gap-5">
              <ClosedCampaignModal />
              <span className="w-48 truncate">39uyie39-9wrf-4wg30isi0</span>
            </div>

            <div className="w-48">
              <StatusIndicator status="fechada" />
            </div>

            <span className="flex-1">Mutirão de Aniversário</span>

            <span className="w-48 truncate">Brinquedos, Alimentação</span>

            <div className="flex items-center w-56">
              <td className='w-28'>
                22%
                <br />
                10 doação(s)
              </td>
              <a
                href="http://localhost:3000/campanhas/2"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center rounded font-semibold text-[#DD720F] transition duration-300 hover:underline"
              >
                Detalhes
                <ArrowUpRight className="size-5 shrink-0" />
              </a>
            </div>
          </div>

          <div role="row" className="flex h-16 items-center gap-5 px-5 text-sm">
            <div className="flex items-center gap-5">
              <OpenCampaignModal />
              <span className="w-48 truncate">39u043290ij0-93r5-4fg30ius9</span>
            </div>

            <div className="w-48">
              <StatusIndicator status="em breve" />
            </div>

            <span className="flex-1">Mutirão de Ano novo</span>

            <span className="w-48 truncate">Limpeza, Alimentação</span>

            <div className="flex items-center w-56">
              <td className='w-28'>
                63%
                <br />
                17 doação(s)
              </td>
              <a
                href="http://localhost:3000/campanhas/3"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center rounded font-semibold text-[#DD720F] transition duration-300 hover:underline"
              >
                Detalhes
                <ArrowUpRight className="size-5 shrink-0" />
              </a>
            </div>
          </div>
        </section>

        <Pagination />
      </main>
    </>
  )
}
