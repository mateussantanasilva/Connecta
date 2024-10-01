import { CheckSquare, Search, HandHeart, Trophy, X, Check, UserRound } from 'lucide-react'
import StatusCard from '@/components/status-card'
import { HeaderAdmin } from '@/components/sections/header-admin'
import { Button } from '@/components/button'
import { Pagination } from '@/components/pagination'
import { AdminFilter } from '@/components/admin-filter'

export default function Administrador() {
  return (
    <>
      <HeaderAdmin />
      <main className="mx-auto mb-20 mt-16 flex max-w-7xl flex-col gap-14 px-4">
        <header className="flex w-full items-center justify-between">
          <h1 className="text-4xl font-bold text-zinc-800">Início</h1>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatusCard
            title="Campanhas Abertas"
            count={4}
            description="2 nova(s) para analisar"
            icon={<CheckSquare className="h-5 w-5 text-orange-500" />}
          />
          <StatusCard
            title="Donatários Ativos"
            count={17}
            description="1 solicitação(ões) para revisar"
            icon={<Search className="h-5 w-5 text-orange-500" />}
          />
          <StatusCard
            title="Doações Anuais"
            count={140}
            description="1 pendente(s) de confirmação"
            icon={<HandHeart className="h-5 w-5 text-orange-500" />}
          />
          <StatusCard
            title="Campanhas 100%"
            count={5}
            description="7 finalizadas(s) ao total"
            icon={<Trophy className="h-5 w-5 text-orange-500" />}
          />
        </div>

        <AdminFilter />

        <section
          role="table"
          className="divide-y divide-zinc-400 rounded-lg border border-zinc-400"
        >

          <header className="flex h-10 items-center gap-5 px-5 text-sm font-medium uppercase text-zinc-800">
            <div className="flex items-center">
              <div className="not-sr-only" />
              <strong className="w-60">Doador</strong>
            </div>
            <strong className="flex-1">Campanha</strong>
            <strong className="w-56">Item</strong>
            <strong className="w-48">Pendente há</strong>
            <strong className="w-32">Ações</strong>
          </header>

          <div role="row" className="flex h-16 items-center gap-5 px-5 text-sm">
            <div className="flex items-center gap-3 w-60">
              <div className="w-10 h-10 rounded-full bg-orange-600/20 flex items-center justify-center p-3">
                <UserRound className="w-5 h-5 text-orange-600" />
              </div>


              <div className='gap-1 flex flex-col'>
                <span className="w-44 truncate">Maria Oliveira Rocha</span>
                <span className="w-44 truncate">mariaoliveirarocha@gmail.com</span>
              </div>
            </div>


            <span className="flex-1">Multirão de Natal</span>

            <div className="w-56">
              <span className="w-56 truncate">Pacote de arroz</span>
              <span className="block truncate">3kg</span>
            </div>

            <span className="w-48 truncate">há cerca de 2 meses</span>

            <div className="flex items-center gap-2 w-32">
              <Button size="xs" variant="danger">
                <X className="size-5 shrink-0" />
              </Button>

              <Button size="xs">
                <Check className="size-5 shrink-0" />
              </Button>
            </div>

          </div>

          <div role="row" className="flex h-16 items-center gap-5 px-5 text-sm">
            <div className="flex items-center gap-3 w-60">
              <div className="w-10 h-10  rounded-full bg-orange-600/20 flex items-center justify-center p-3">
                <UserRound className="w-5 h-5 text-orange-600" />
              </div>
              <div className='gap-1 flex flex-col'>
                <span className="w-44 truncate">Luciana Cardoso Arlinda</span>
                <span className="w-44 truncate">lucianacarali@gmail.com</span>
              </div>
            </div>



            <span className="flex-1">Multirão de ano novo</span>

            <div className="w-56">
              <span className="w-56 truncate">Pacote de feijão</span>
              <span className="block truncate">2kg</span>
            </div>

            <span className="w-48 truncate">há cerca de 9 meses</span>

            <div className="flex items-center gap-2 w-32">
              <Button size="xs" variant="danger">
                <X className="size-5 shrink-0" />
              </Button>

              <Button size="xs">
                <Check className="size-5 shrink-0" />
              </Button>
            </div>
          </div>


        </section>

        <Pagination />
      </main >
    </>
  )
}
