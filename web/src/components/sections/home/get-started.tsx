import { HeartHandshake } from 'lucide-react'
import { Button } from '../../button'
import Image from 'next/image'
import Hand1Img from '@/assets/get-started-1.png'
import Hand2Img from '@/assets/get-started-2.png'

export function GetStarted() {
  return (
    <section className="flex items-center justify-between gap-16 bg-green-600 py-6">
      <Image src={Hand1Img} alt="" />

      <div className="mx-auto flex max-w-2xl flex-col items-center gap-7">
        <strong className="text-center text-4xl font-bold text-white">
          Nossa comunidade acolhe a todos, contribua ou encontre apoio. Sua
          participação é valiosa.
        </strong>

        <Button variant="tertiary">
          <span>Participar agora</span>
          <HeartHandshake className="size-5 shrink-0" />
        </Button>
      </div>

      <Image src={Hand2Img} alt="" />
    </section>
  )
}
