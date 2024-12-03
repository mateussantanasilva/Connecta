import { Avatar } from '@/components/avatar'
import { Header } from '@/components/sections/header'
import { MyCampaigns } from '@/components/sections/my-campaigns'
import { MyDonations } from '@/components/sections/my-donations'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Footer } from '@/components/sections/footer'
import { getAuthentication } from '@/utils/get-authentication'
import { api } from '@/utils/api'
import { User } from '@/@types/User'
import { cookies } from 'next/headers'
import { ProfileRole } from '@/components/sections/profile-role'
import { DonationsDTO } from '@/@types/DonationItem'
import { CampaignsDTO } from '@/@types/Campaign'

export default async function Perfil() {
  const userCookie = cookies().get('user')?.value
  const { user } = getAuthentication(userCookie)

  if (!user || !userCookie) return

  const profileResponse = await fetch(`${api}/users/${user.userID}`, {
    headers: {
      User: userCookie,
    },
  })
  const profile: User = await profileResponse.json()

  const campaignsResponse = await fetch(
    `${api}/users/${user.userID}/campaigns?limit=3`,
    {
      headers: {
        User: userCookie,
      },
    },
  )
  const { campaigns }: CampaignsDTO = await campaignsResponse.json()

  const donationsResponse = await fetch(
    `${api}/donations/user/${user.userID}`,
    {
      headers: {
        User: userCookie,
      },
    },
  )
  const { donations }: DonationsDTO = await donationsResponse.json()

  return (
    <>
      <Header />

      <main className="mx-auto mb-20 mt-16 flex max-w-7xl flex-col gap-14 px-4 lg:flex-row 2xl:px-0">
        <aside className="mx-auto space-y-5 lg:max-w-80">
          <header className="flex flex-col items-center">
            <Avatar
              src={user.avatar}
              alt={`Foto de perfil de ${user.name}`}
              size="lg"
            />

            <strong className="mb-1 mt-6 text-2xl font-bold text-zinc-800">
              {user.name}
            </strong>
            <span>
              {profile.role === 'doador' ? 'Doador(a)' : 'Donatário(a)'}
            </span>
          </header>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-zinc-800">Sobre</h3>

            <div className="flex items-center gap-1.5">
              <Mail className="size-5 shrink-0" />
              <span>{user.email}</span>
            </div>

            {profile.telephone && (
              <div className="flex items-center gap-1.5">
                <Phone className="size-5 shrink-0" />
                <span>{profile.telephone}</span>
              </div>
            )}
          </div>

          <div className="h-px w-full bg-zinc-400" />

          {profile.address && (
            <>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-zinc-800">Endereço</h3>

                <div className="flex gap-1.5">
                  <MapPin className="size-5 shrink-0" />
                  <span>{profile.address}</span>
                </div>
              </div>

              <div className="h-px w-full bg-zinc-400" />
            </>
          )}

          <ProfileRole profile={profile} />
        </aside>

        <div className="flex-1 space-y-5">
          <MyCampaigns campaigns={campaigns} />

          <div className="h-px w-full bg-zinc-400" />

          <MyDonations donations={donations} />
        </div>
      </main>

      <Footer />
    </>
  )
}
