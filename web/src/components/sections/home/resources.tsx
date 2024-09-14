import { Button } from '@/components/button'
import { HandHeart, Megaphone, PackageOpen, UsersRound } from 'lucide-react'

export function Resources() {
  return (
    <section className="mx-auto mt-20 flex max-w-7xl items-center justify-between px-4 xl:px-0">
      <div className="flex flex-wrap gap-6">
        <div className="max-w-64 space-y-3 rounded-2xl p-5 text-center shadow">
          <div className="mx-auto w-fit rounded-full bg-orange-600/20 p-3">
            <UsersRound className="size-6 shrink-0 text-orange-600" />
          </div>

          <h4 className="text-lg font-bold text-zinc-800">Funções</h4>

          <p className="text-sm">
            Escolha seu papel na plataforma, seja doador ou recebedor.
          </p>
        </div>

        <div className="max-w-64 space-y-3 rounded-2xl p-5 text-center shadow">
          <div className="mx-auto w-fit rounded-full bg-orange-600/20 p-3">
            <PackageOpen className="size-6 shrink-0 text-orange-600" />
          </div>

          <h4 className="text-lg font-bold text-zinc-800">Tipos de Itens</h4>

          <p className="text-sm">
            Trabalhamos com alimentos, roupas e calçados, garantindo itens
            essenciais.
          </p>
        </div>

        <div className="max-w-64 space-y-3 rounded-2xl p-5 text-center shadow">
          <div className="mx-auto w-fit rounded-full bg-orange-600/20 p-3">
            <Megaphone className="size-6 shrink-0 text-orange-600" />
          </div>

          <h4 className="text-lg font-bold text-zinc-800">Campanhas</h4>

          <p className="text-sm">
            Participe de campanhas ativas e contribua diretamente com as ações.
          </p>
        </div>

        <div className="max-w-64 space-y-3 rounded-2xl p-5 text-center shadow">
          <div className="mx-auto w-fit rounded-full bg-orange-600/20 p-3">
            <HandHeart className="size-6 shrink-0 text-orange-600" />
          </div>

          <h4 className="text-lg font-bold text-zinc-800">Doações</h4>

          <p className="text-sm">
            Registre as doações a serem feitas e acompanhe todo o processo.
          </p>
        </div>
      </div>

      <div className="max-w-xl space-y-5">
        <h2 className="text-4xl font-bold text-zinc-800">
          Conheça as Funcionalidades que Facilitam seu Acesso
        </h2>

        <p className="max-w-lg">
          Com nossos recursos, você pode gerenciar doações e receber itens
          essenciais com facilidade, garantindo que todos possam participar, se
          beneficiar e contribuir para uma comunidade mais forte e solidária.
        </p>

        <Button variant="secondary">
          <span>Explorar recursos</span>
        </Button>
      </div>
    </section>
  )
}
