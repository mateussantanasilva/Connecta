import Image from 'next/image'
import HandsImg from '@/assets/about-hands.png'
import ArrowImg from '@/assets/about-arrow.svg'

export function About() {
  return (
    <section className="mx-auto mt-20 max-w-7xl space-y-16 px-4 xl:px-0">
      <div className="flex justify-between">
        <h2 className="max-w-lg text-4xl font-bold text-zinc-800">
          A Diferença que Fazemos Juntos
        </h2>

        <p className="max-w-2xl">
          O Connecta facilita a doação de itens essenciais como alimentos,
          roupas e calçados, conectando quem doa e quem precisa. Todos podem
          tanto contribuir quanto solicitar doações, fortalecendo comunidades e
          transformando vidas.
        </p>
      </div>

      <div className="grid-cols-about grid items-center justify-center gap-9">
        <div className="space-y-40">
          <div className="relative space-y-2 text-center">
            <strong className="text-3xl font-bold text-green-600">+200</strong>
            <p>Itens arrecadados para quem precisa</p>

            <Image
              src={ArrowImg}
              alt=""
              className="absolute -right-28 top-14"
            />
          </div>

          <div className="relative space-y-2 text-center">
            <strong className="text-3xl font-bold text-green-600">50</strong>
            <p>Famílias ajudadas com doações essenciais</p>

            <Image
              src={ArrowImg}
              alt=""
              className="absolute -right-28 -top-14 -scale-y-100"
            />
          </div>
        </div>

        <Image src={HandsImg} alt="" quality={100} />

        <div className="space-y-40">
          <div className="relative space-y-2 text-center">
            <strong className="text-3xl font-bold text-green-600">15</strong>
            <p>Campanhas realizadas para diversas causas</p>

            <Image
              src={ArrowImg}
              alt=""
              className="absolute -left-32 top-14 -scale-x-100"
            />
          </div>

          <div className="relative space-y-2 text-center">
            <strong className="text-3xl font-bold text-green-600">100%</strong>
            <p>Compromisso com a eficácia de cada doação</p>

            <Image
              src={ArrowImg}
              alt=""
              className="absolute -left-32 -top-14 -scale-x-100 -scale-y-100"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
