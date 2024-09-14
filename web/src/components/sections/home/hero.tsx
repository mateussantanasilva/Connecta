import Image from 'next/image'
import { Button } from '../../button'
import Msg1Img from '@/assets/hero-message-1.png'
import Msg2Img from '@/assets/hero-message-2.png'
import Grid1Img from '@/assets/hero-grid-1.png'
import Grid2Img from '@/assets/hero-grid-2.png'
import { HeartHandshake } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative mx-auto mt-10 max-w-7xl px-4 md:mt-16 xl:px-0">
      <h1 className="mx-auto mb-5 max-w-4xl text-center text-5xl font-bold text-zinc-800">
        Apoie quem precisa e transforme vidas com sua doação
      </h1>

      <p className="mx-auto max-w-[37.625rem] text-center">
        Nosso compromisso em fazer a diferença é guiado pela compaixão,
        integridade e colaboração. Faça parte da mudança.
      </p>

      <div className="mt-14 grid grid-cols-hero items-end justify-center gap-6">
        <div className="relative overflow-clip rounded-2xl">
          <Image src={Msg1Img} alt="object-cover" quality={100} priority />
          <strong className="absolute bottom-7 left-6 right-6 text-2xl font-bold text-white">
            Sua doação faz a diferença
          </strong>
        </div>

        <div className="space-y-6">
          <Image
            src={Grid1Img}
            alt=""
            quality={100}
            priority
            className="rounded-2xl"
          />

          <div className="h-48 space-y-3 rounded-2xl bg-orange-600 p-5 text-white">
            <span className="block text-2xl font-bold">100%</span>
            <strong className="block text-lg font-bold">Nossa Missão</strong>

            <p className="text-sm">
              Todos os itens doados são usados para ajudar diretamente quem
              precisa.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <Image
            src={Grid2Img}
            alt=""
            quality={100}
            priority
            className="rounded-2xl"
          />

          <div className="h-48 space-y-3 rounded-2xl bg-green-600 p-5 text-white">
            <p className="text-sm">
              Sua doação faz a diferença na vida de quem está em necessidade.
              Contribua e ajude a mudar vidas agora mesmo.
            </p>

            <Button variant="tertiary">
              <span>Doar agora</span>
            </Button>
          </div>
        </div>

        <div className="relative overflow-clip rounded-2xl">
          <Image src={Msg2Img} alt="" quality={100} priority />
          <strong className="absolute bottom-7 left-6 right-6 text-2xl font-bold text-white">
            Sua doação faz a diferença
          </strong>
        </div>
      </div>

      <HeartHandshake
        strokeWidth={0.5}
        className="absolute left-0 top-44 size-24 text-green-600 opacity-5"
      />

      <HeartHandshake
        strokeWidth={0.5}
        className="absolute left-36 top-20 size-12 text-green-600 opacity-10"
      />

      <HeartHandshake
        strokeWidth={0.5}
        className="absolute right-28 top-12 size-12 text-green-600 opacity-10"
      />

      <HeartHandshake
        strokeWidth={0.5}
        className="absolute right-48 top-52 size-12 text-green-600 opacity-10"
      />

      <HeartHandshake
        strokeWidth={0.5}
        className="absolute right-0 top-32 size-24 text-green-600 opacity-5"
      />
    </section>
  )
}
