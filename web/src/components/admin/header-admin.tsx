import Image from 'next/image'
import LogoImg from '@/assets/logo.svg'
import Link from 'next/link'
import { Avatar } from '../avatar'
import { SettingsMenuAdmin } from '../admin/settings-menu-admin'
import { getAuthentication } from '@/utils/get-authentication'
import { cookies } from 'next/headers'

export function HeaderAdmin() {
  const userCookie = cookies().get('user')?.value
  const { user } = getAuthentication(userCookie)

  return (
    <header className="border-b border-zinc-400">
      <div className="mx-auto flex max-w-7xl items-center justify-between bg-transparent p-4 2xl:px-0">
        <nav className="flex items-center gap-4">
          <Link href="/">
            <Image src={LogoImg} alt="Logo Connecta" />
          </Link>

          <div className="hidden h-5 w-px bg-zinc-400 md:block" />

          <ul className="hidden gap-6 font-medium transition-colors md:flex">
            <li className="hover:text-green-600">
              <Link href="/administrador">Início</Link>
            </li>
            <li className="hover:text-green-600">
              <Link href="/administrador/campanhas">Campanhas</Link>
            </li>
            <li className="hover:text-green-600">
              <Link href="/administrador/donatarios">Donatários</Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-6">
          <SettingsMenuAdmin />

          <Link href="/administrador" className="group flex items-center gap-3">
            <Avatar
              src={user?.avatar}
              alt={`Foto de perfil de ${user?.name}`}
            />

            <span className="hidden font-medium text-zinc-800 group-hover:text-orange-600 md:block">
              {user?.name}
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
}
