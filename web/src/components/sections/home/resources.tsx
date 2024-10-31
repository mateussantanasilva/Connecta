import { Button } from '@/components/button'
import { HandHeart, Megaphone, PackageOpen, UsersRound } from 'lucide-react'

export function Resources() {
  return (
    <section className="mx-auto my-20 flex max-w-7xl flex-col-reverse justify-evenly gap-14 px-4 lg:flex-row lg:items-center xl:justify-between 2xl:px-0">
      <div className="grid grid-cols-cards gap-6 lg:w-1/2 lg:max-w-[33.5rem] lg:grid-cols-2">
        <div className="space-y-3 rounded-2xl p-5 text-center shadow">
          <div className="mx-auto w-fit rounded-full bg-orange-600/20 p-3">
            <UsersRound className="size-6 shrink-0 text-orange-600" />
          </div>

          <h4 className="text-lg font-bold text-zinc-800">Funções</h4>

          <p className="text-sm">
            Escolha seu papel na plataforma, seja doador ou recebedor.
          </p>
        </div>

        <div className="space-y-3 rounded-2xl p-5 text-center shadow">
          <div className="mx-auto w-fit rounded-full bg-orange-600/20 p-3">
            <PackageOpen className="size-6 shrink-0 text-orange-600" />
          </div>

          <h4 className="text-lg font-bold text-zinc-800">Tipos de Itens</h4>

          <p className="text-sm">
            Trabalhamos com alimentos, roupas e calçados, garantindo itens
            essenciais.
          </p>
        </div>

        <div className="space-y-3 rounded-2xl p-5 text-center shadow">
          <div className="mx-auto w-fit rounded-full bg-orange-600/20 p-3">
            <Megaphone className="size-6 shrink-0 text-orange-600" />
          </div>

          <h4 className="text-lg font-bold text-zinc-800">Campanhas</h4>

          <p className="text-sm">
            Participe de campanhas ativas e contribua diretamente com as ações.
          </p>
        </div>

        <div className="space-y-3 rounded-2xl p-5 text-center shadow">
          <div className="mx-auto w-fit rounded-full bg-orange-600/20 p-3">
            <HandHeart className="size-6 shrink-0 text-orange-600" />
          </div>

          <h4 className="text-lg font-bold text-zinc-800">Doações</h4>

          <p className="text-sm">
            Registre as doações a serem feitas e acompanhe todo o processo.
          </p>
        </div>
      </div>

      <div className="space-y-5 lg:max-w-md xl:max-w-xl">
        <h2 className="text-3xl font-bold text-zinc-800 lg:text-4xl">
          Conheça as Funcionalidades que Facilitam seu Acesso
        </h2>

        <p className="lg:max-w-lg">
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
