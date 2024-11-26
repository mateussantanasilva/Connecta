import { Be_Vietnam_Pro } from 'next/font/google'
import type { Metadata } from 'next'
import { VLibrasPlugin } from '@/components/vlibras-plugin'
import { Toaster } from 'sonner'
import './globals.css'

const beVieatnamPro = Be_Vietnam_Pro({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: 'Connecta',
  description:
    'Plataforma de controle de doações que conecta doadores e donatários, oferecendo um processo eficiente e organizado para gerenciar campanhas e itens.',
  keywords: [
    'doação',
    'doador',
    'donatário',
    'campanha',
    'alimentação',
    'vestuário',
    'higiene',
    'itens',
  ],
  authors: [
    { name: 'Guilherme Gonçalves', url: 'https://github.com/guilhermegg8' },
    { name: 'Mateus Santana', url: 'https://github.com/mateussantanasilva' },
    { name: 'Matheus de Carvalho', url: 'https://github.com/Matheus3788' },
    { name: 'Pedro Pessina', url: 'https://github.com/Pessinaaa' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${beVieatnamPro.className} bg-white text-zinc-700 antialiased`}
      >
        <Toaster richColors />
        <VLibrasPlugin />
        {children}
      </body>
    </html>
  )
}
