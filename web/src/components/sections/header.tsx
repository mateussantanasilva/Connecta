import Image from 'next/image'
import LogoImg from '@/assets/logo.svg'
import Link from 'next/link'
import { AuthenticationMenu } from '../authentication-menu'

export function Header() {
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

      <AuthenticationMenu />
    </header>
  )
}
