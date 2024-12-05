import { HeartHandshake } from 'lucide-react'
import { Button } from '../button'
import Image from 'next/image'
import Hand1Img from '@/assets/get-started-1.png'
import Hand2Img from '@/assets/get-started-2.png'
import Link from 'next/link'
import { api } from '@/utils/api'
import { cookies } from 'next/headers'

export function GetStarted() {
  const userCookie = cookies().get('user')?.value

  return (
    <section className="flex items-center justify-between gap-5 bg-green-600 py-6 xl:gap-16">
      <Image
        src={Hand1Img}
        alt=""
        quality={80}
        className="hidden w-1/4 sm:flex xl:w-80"
      />

      <div className="mx-4 flex max-w-2xl flex-col items-center gap-7 sm:mx-auto">
        <strong className="text-center text-xl font-bold text-white sm:text-2xl lg:text-4xl">
          Nossa comunidade acolhe a todos, contribua ou encontre apoio. Sua
          participação é valiosa.
        </strong>

        <Link
          href={userCookie ? '/campanhas' : `${api}/login/google`}
          aria-label={userCookie ? 'Ver campanhas' : 'Fazer login'}
        >
          <Button variant="tertiary">
            <span>Participar agora</span>
            <HeartHandshake className="size-5 shrink-0" />
          </Button>
        </Link>
      </div>

      <Image
        src={Hand2Img}
        alt=""
        quality={80}
        className="hidden w-1/4 sm:flex xl:w-80"
      />
    </section>
  )
}
