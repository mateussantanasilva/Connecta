import Image from 'next/image'
import LogoImg from '@/assets/logo.svg'
import Link from 'next/link'
import { Avatar } from '../avatar'
import { SettingsMenuAdmin } from '../settings-menu-admin'

export function HeaderAdmin() {
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

          <Link href="/perfil" className="group flex items-center gap-3">
            <Avatar
              src="https://images.unsplash.com/photo-1502323777036-f29e3972d82f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Foto de perfil da Molly Jensen"
            />

            <span className="hidden font-medium text-zinc-800 group-hover:text-orange-600 md:block">
              Molly Jensen
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
}
