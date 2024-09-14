import Image from 'next/image'
import Grid1Img from '@/assets/choose-1.png'
import Grid2Img from '@/assets/choose-2.png'
import Grid3Img from '@/assets/choose-3.png'

export function Choose() {
  return (
    <section className="mx-auto my-20 flex max-w-7xl items-start justify-between px-4 xl:px-0">
      <div className="space-y-5">
        <h2 className="max-w-lg text-4xl font-bold text-zinc-800">
          Escolha seu Papel
        </h2>

        <p className="max-w-2xl">
          Facilitamos a doação e o recebimento de itens essenciais de forma
          simples e organizada. Para doar, registre seus itens em uma campanha.
          Se precisar de ajuda, faça uma solicitação para receber o que precisa.
          A plataforma conecta doadores e donatários, permitindo que todos
          contribuam e recebam conforme necessário.
        </p>

        <ul className="max-w-lg list-inside list-disc space-y-3">
          <li>Cadastre-se e crie seu perfil para começar</li>
          <li>Participe de campanhas e registre os itens para doar</li>
          <li>
            Acompanhe o progresso das campanhas e atualizações sobre suas
            doações ou solicitações
          </li>
        </ul>
      </div>

      <div className="flex items-start gap-6">
        <Image src={Grid1Img} alt="" className="rounded-2xl" />
        <Image src={Grid2Img} alt="" className="mt-6 rounded-2xl" />
        <Image src={Grid3Img} alt="" className="mt-12 rounded-2xl" />
      </div>
    </section>
  )
}
