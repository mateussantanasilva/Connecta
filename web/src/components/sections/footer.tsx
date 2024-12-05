import Image from 'next/image'
import LogoWhiteImg from '@/assets/logo-white.svg'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-green-600 px-4 py-20 2xl:px-0">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 sm:flex-row md:justify-between">
        <div className="max-w-lg space-y-6 text-sm text-white md:max-w-sm">
          <Link href="/">
            <Image src={LogoWhiteImg} alt="Logo Connecta" />
          </Link>

          <p>
            Connecta é a plataforma que une pessoas por meio da doação e
            recebimento de itens essenciais.
          </p>

          <div>
            <span className="block">Conectando pessoas, mudando vidas.</span>
            <span>© 2024 Connecta. Todos os direitos reservados.</span>
          </div>
        </div>

        <nav className="flex flex-col gap-8 text-white xs:flex-row xl:gap-36">
          <ul className="space-y-6">
            <li className="font-bold uppercase">Menu</li>
            <li className="font-medium underline-offset-8 transition-all hover:text-zinc-100 hover:underline">
              <Link href="/">Página inicial</Link>
            </li>
            <li className="font-medium underline-offset-8 transition-all hover:text-zinc-100 hover:underline">
              <Link href="/campanhas">Campanhas</Link>
            </li>
            <li className="font-medium underline-offset-8 transition-all hover:text-zinc-100 hover:underline">
              <Link href="/acessibilidade">Guia de acessibilidade</Link>
            </li>
          </ul>

          <ul className="space-y-6">
            <li className="font-bold uppercase">Contato</li>
            <li>(11) 91234-5678</li>
            <li>connecta.donate@gmail.com</li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
