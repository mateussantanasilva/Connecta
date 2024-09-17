import Image from 'next/image'
import HandsImg from '@/assets/about-hands.png'
import ArrowImg from '@/assets/about-arrow.svg'

export function About() {
  return (
    <section className="mx-auto mb-20 mt-20 max-w-7xl space-y-10 px-4 md:mb-0 md:space-y-16 2xl:px-0">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:gap-16">
        <h2 className="max-w-lg text-3xl font-bold text-zinc-800 lg:text-4xl">
          A Diferença que Fazemos Juntos
        </h2>

        <p className="lg:w-1/2 lg:max-w-xl xl:max-w-2xl">
          O Connecta facilita a doação de itens essenciais como alimentos,
          roupas e calçados, conectando quem doa e quem precisa. Todos podem
          tanto contribuir quanto solicitar doações, fortalecendo comunidades e
          transformando vidas.
        </p>
      </div>

      <div className="grid grid-cols-1 items-center justify-center gap-6 xs:grid-cols-2 xs:gap-9 md:grid-cols-about">
        <div className="space-y-6 xs:space-y-20 lg:space-y-40">
          <div className="relative min-h-24 space-y-2 text-center">
            <strong className="text-3xl font-bold text-green-600">+200</strong>
            <p>Itens arrecadados para quem precisa</p>

            <Image
              src={ArrowImg}
              alt=""
              className="absolute -right-16 top-14 hidden w-1/3 md:flex lg:-right-28 lg:w-auto"
            />
          </div>

          <div className="relative min-h-24 space-y-2 text-center">
            <strong className="text-3xl font-bold text-green-600">50</strong>
            <p>Famílias ajudadas com doações essenciais</p>

            <Image
              src={ArrowImg}
              alt=""
              className="absolute -right-16 top-5 hidden w-1/3 -scale-y-100 md:flex lg:-right-28 lg:-top-14 lg:w-auto"
            />
          </div>
        </div>

        <Image
          src={HandsImg}
          alt=""
          quality={100}
          className="mx-auto mt-32 hidden md:flex lg:mt-0"
        />

        <div className="space-y-6 xs:space-y-20 lg:space-y-40">
          <div className="relative min-h-24 space-y-2 text-center">
            <strong className="text-3xl font-bold text-green-600">15</strong>
            <p>Campanhas realizadas para diversas causas</p>

            <Image
              src={ArrowImg}
              alt=""
              className="absolute -left-20 top-14 hidden w-1/3 -scale-x-100 md:flex lg:-left-32 lg:w-auto"
            />
          </div>

          <div className="relative min-h-24 space-y-2 text-center">
            <strong className="text-3xl font-bold text-green-600">100%</strong>
            <p>Compromisso com a eficácia de cada doação</p>

            <Image
              src={ArrowImg}
              alt=""
              className="absolute -left-20 top-5 hidden w-1/3 -scale-x-100 -scale-y-100 md:flex lg:-left-32 lg:-top-14 lg:w-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
