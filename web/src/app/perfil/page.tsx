import { Avatar } from '@/components/avatar'
import { Header } from '@/components/sections/header'
import { BecomeDoneeModal } from '@/components/modals/become-donee-modal'
import { MyCampaigns } from '@/components/sections/my-campaigns'
import { MyDonations } from '@/components/sections/my-donations'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Footer } from '@/components/sections/footer'
import { DONOR_USER } from '@/constants/users'

export default function Perfil() {
  const user = DONOR_USER

  return (
    <>
      <Header />

      <main className="mx-auto mb-20 mt-16 flex max-w-7xl flex-col gap-14 px-4 lg:flex-row 2xl:px-0">
        <aside className="mx-auto space-y-5 lg:max-w-80">
          <header className="flex flex-col items-center">
            <Avatar
              src={user.picture}
              alt={`Foto de perfil de ${user.full_name}`}
              size="lg"
            />

            <strong className="mb-1 mt-6 text-2xl font-bold text-zinc-800">
              {user.full_name}
            </strong>
            <span>
              {user.user_type === 'doador' ? 'Doador(a)' : 'Donatário(a)'}
            </span>
          </header>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-zinc-800">Sobre</h3>

            <div className="flex items-center gap-1.5">
              <Mail className="size-5 shrink-0" />
              <span>{user.email}</span>
            </div>

            {user.telephone && (
              <div className="flex items-center gap-1.5">
                <Phone className="size-5 shrink-0" />
                <span>{user.telephone}</span>
              </div>
            )}
          </div>

          <div className="h-px w-full bg-zinc-400" />

          {user.address && (
            <>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-zinc-800">Endereço</h3>

                <div className="flex gap-1.5">
                  <MapPin className="size-5 shrink-0" />
                  <span>{user.address}</span>
                </div>
              </div>

              <div className="h-px w-full bg-zinc-400" />
            </>
          )}

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-zinc-800">Função atual</h3>
            <p>
              {user.user_type === 'doador'
                ? 'Você está registrado como doador e pode contribuir com doações. Para receber itens, encerre sua função como doador e torne-se donatário.'
                : 'Você está registrado como donatário e pode receber doações conforme sua necessidade. Para doar itens, encerre sua participação como donatário e torne-se doador.'}
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
