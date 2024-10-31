import { Footer } from '@/components/sections/footer'
import { Header } from '@/components/sections/header'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  robots: {
    index: false,
  },
}

export default function Acessibilidade() {
  return (
    <>
      <Header />

      <main className="mx-auto mb-20 mt-10 max-w-7xl space-y-6 px-4 md:mt-16 2xl:px-0">
        <header className="max-w-xl space-y-5">
          <h1 className="text-3xl font-bold text-zinc-800 lg:text-4xl">
            Guia de Acessibilidade
          </h1>
          <p className="max-w-lg">
            Descubra como navegar neste site com recursos como aumento de fonte,
            tabulação, e suporte em LIBRAS.
          </p>
        </header>

        <section className="space-y-3">
          <p>
            Este site foi desenvolvido para que pessoas com deficiência visual,
            baixa visão, deficiência auditiva e mobilidade reduzida possam
            navegar por meio de recursos como aumento de fonte, teclas de
            atalho, tradução para a Língua Brasileira de Sinais e navegação por
            teclado.
          </p>
          <p>
            Para aumentar a fonte, você pode usar o zoom nativo do seu
            navegador, pressionando as teclas “Ctrl” e “+” para aumentar todo o
            site e “Ctrl” e “-“ para diminuir. Para voltar ao padrão, pressione
            “Ctrl” e “0”.
          </p>
          <p>
            Este site tem melhor acessibilidade quando acessado nas versões mais
            atualizadas do seu navegador web. Utilize sempre a versão mais
            recente de seu software.
          </p>

          <div>
            <strong>Navegação por tabulação</strong>
            <p>
              Use a tecla Tab para navegar por elementos que recebem ação do
              usuário no site, tais como links, botões, campos de formulário e
              outros na ordem em que eles são apresentados na página, e Shift +
              Tab para retornar. Use as setas direcionais para acessar as
              informações textuais.
            </p>
          </div>

          <div>
            <strong>
              Sugestões de programas disponíveis para pessoas com deficiência
            </strong>
            <ul className="list-inside list-disc">
              <li>
                Nitrous Voice Flux: controla o computador por voz. Gratuito;
              </li>
              <li>
                NVDA: software livre para ler tela - vários idiomas (Windows);
              </li>
              <li>YeoSoft Text: leitor de tela em inglês e português;</li>
              <li>Jaws for Windows: leitor de tela - vários idiomas;</li>
              <li>Virtual Vision: leitor de telas em português do Brasil;</li>
              <li>
                DOSVOX: sistema para deficientes visuais (Windows ou Linux).
              </li>
              <li>
                Talckback: leitor de tela disponível em smartphones Android.
              </li>
              <li>
                Observação: leia no manual do leitor de telas sobre a melhor
                forma de navegação em páginas web.
              </li>
            </ul>
          </div>

          <div>
            <strong>LIBRAS - Língua Brasileira de Sinais</strong>
            <p>
              Este site é acessível em LIBRAS através do{' '}
              <Link
                href="http://www.vlibras.gov.br/"
                target="_blank"
                className="text-green-600 underline underline-offset-4 transition-colors hover:text-green-700"
              >
                VLibras.
              </Link>
            </p>
            <ul className="list-inside list-disc">
              <li>
                Do lado direito de cada página do site existe o ícone de um
                Widget informando que o site é acessível em LIBRAS.
              </li>
              <li>
                Para traduzir, basta clicar sobre o ícone e selecionar o texto
                que deseja traduzir.
              </li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
