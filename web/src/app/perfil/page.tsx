import { Avatar } from '@/components/avatar'
import { Header } from '@/components/sections/header'
import { BecomeDoneeModal } from '@/components/modals/become-donee-modal'
import { MyCampaigns } from '@/components/sections/my-campaigns'
import { MyDonations } from '@/components/sections/my-donations'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Footer } from '@/components/sections/footer'

export default function Perfil() {
  return (
    <>
      <Header />

      <main className="mx-auto mb-20 mt-16 flex max-w-7xl gap-14">
        <aside className="max-w-80 space-y-5">
          <header className="flex flex-col items-center">
            <Avatar
              src="https://images.unsplash.com/photo-1502323777036-f29e3972d82f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Foto de perfil da Molly Jensen"
              size="lg"
            />

            <strong className="mb-1 mt-6 text-2xl font-bold text-zinc-800">
              Molly Jensen
            </strong>
            <span>Doador(a)</span>
          </header>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-zinc-800">Sobre</h3>

            <div className="flex items-center gap-1.5">
              <Mail className="size-5 shrink-0 text-zinc-700" />
              <span>mollyjensen@gmail.com</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Phone className="size-5 shrink-0 text-zinc-700" />
              <span>(11) 98765-4321</span>
            </div>
          </div>

          <div className="h-px w-full bg-zinc-400" />

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-zinc-800">Endereço</h3>

            <div className="flex gap-1.5">
              <MapPin className="size-5 shrink-0 text-zinc-700" />
              <span>
                Rua Árvore da Cera, 20c - Jardim Santo Antonio, São Paulo - SP,
                08032-270
              </span>
            </div>
          </div>

          <div className="h-px w-full bg-zinc-400" />

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-zinc-800">Função atual</h3>
            <p>
              Você está registrado como doador e pode contribuir com doações.
              Para receber itens, encerre sua função como doador e torne-se
              donatário.
            </p>
          </div>

          <BecomeDoneeModal />
        </aside>

        <div className="flex-1 space-y-5">
          <MyCampaigns />

          <div className="h-px w-full bg-zinc-400" />

          <MyDonations />
        </div>
      </main>

      <Footer />
    </>
  )
}
