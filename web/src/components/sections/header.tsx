import Image from 'next/image'
import LogoImg from '@/assets/logo.svg'
import Link from 'next/link'
import { Avatar } from '../avatar'
import { SettingsMenu } from '../settings-menu'
import { getAuthentication } from '@/utils/get-authentication'
import { Button } from '../button'

export function Header() {
  const { user } = getAuthentication()

  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between bg-transparent p-4 2xl:px-0">
      <nav className="flex items-center gap-4">
        <Link href="/">
          <Image src={LogoImg} alt="Logo Connecta" />
        </Link>

        <div className="hidden h-5 w-px bg-zinc-400 md:block" />

        <ul className="hidden gap-6 font-medium transition-colors md:flex">
          <li className="hover:text-green-600">
            <Link href="/">Página inicial</Link>
          </li>
          <li className="hover:text-green-600">
            <Link href="/campanhas">Campanhas</Link>
          </li>
        </ul>
      </nav>

      <div className="flex flex-row-reverse items-center gap-6 md:flex-row">
        <SettingsMenu isAuthenticated={!!user} />

        {user ? (
          <Link href="/perfil" className="group flex items-center gap-3">
            <Avatar
              src="https://images.unsplash.com/photo-1502323777036-f29e3972d82f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Foto de perfil da Molly Jensen"
            />

            <span className="hidden font-medium text-zinc-800 group-hover:text-orange-600 md:block">
              {user.full_name}
            </span>
          </Link>
        ) : (
          <Button variant="secondary" className="hidden md:flex">
            <span>Faça sua doação</span>
          </Button>
        )}
      </div>
    </header>
  )
}
