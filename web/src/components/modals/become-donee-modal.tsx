'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { HeartHandshake, Send, X } from 'lucide-react'
import { Button } from '../button'
import { Input } from '../input'
import { TextArea } from '../text-area'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { useState } from 'react'
import { api } from '@/utils/api'
import Cookies from 'js-cookie'

const becomeDoneeSchema = z.object({
  telephone: z.string().regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, {
    message: 'Número de telefone inváido. Use o formato (00) 00000-0000.',
  }),
  address: z
    .string()
    .min(10, { message: 'O endereço deve ter pelo menos 10 caracteres.' }),
  request: z.string().min(180, {
    message:
      'O motivo deve ter pelo menos 180 caracteres. Explique sua situação.',
  }),
})
type BecomeDoneeSchema = z.infer<typeof becomeDoneeSchema>

export function BecomeDoneeModal() {
  const userCookie = Cookies.get('user')

  const [isOpenModal, setIsOpenModal] = useState(false)

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<BecomeDoneeSchema>({
    resolver: zodResolver(becomeDoneeSchema),
  })

  async function handleRequestDoneeRole(data: BecomeDoneeSchema) {
    toast.promise(
      async () =>
        await fetch(`${api}/users/donee-request`, {
          method: 'POST',
          headers: {
            User: String(userCookie),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }),
      {
        success: () => {
          setIsOpenModal(false)

          return 'Sua solicitação foi enviada com sucesso para ser analisada. Aguarde a resposta.'
        },
        error: 'Erro ao solicitar função de donatário. Tente novamente.',
      },
    )
  }

  return (
    <Dialog.Root open={isOpenModal}>
      <Dialog.Trigger asChild>
        <Button
          size="full"
          onClick={() => setIsOpenModal(!isOpenModal)}
          className="md:w-fit lg:w-full"
        >
          <span>Tornar donatário</span>
          <HeartHandshake className="size-5 shrink-0" />
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 bg-black/60" />

        <Dialog.Content className="fixed inset-0 left-4 right-4 z-30 mx-auto my-4 flex max-w-2xl flex-col gap-5 overflow-y-scroll rounded-2xl bg-white p-5 pr-2.5 md:ml-auto md:mr-0 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar]:bg-transparent">
          <Dialog.Close asChild>
            <Button
              size="xs"
              variant="outline"
              onClick={() => setIsOpenModal(false)}
              className="ml-auto"
            >
              <X className="size-5 shrink-0" />
            </Button>
          </Dialog.Close>

          <header className="max-w-lg space-y-2">
            <Dialog.Title className="text-lg font-bold text-zinc-800 sm:text-2xl">
              Solicitar Função de Donatário
            </Dialog.Title>

            <Dialog.Description className="text-sm sm:text-base">
              Envie sua solicitação para receber doações. A aprovação será
              necessária para confirmar a nova função.
            </Dialog.Description>
          </header>

          <form
            onSubmit={handleSubmit(handleRequestDoneeRole)}
            className="flex h-full flex-col gap-5"
          >
            <Input
              title="Telefone"
              mask="(99) 99999-9999"
              {...register('telephone')}
              errorMessage={errors.telephone?.message}
            />
            <Input
              title="Endereço"
              {...register('address')}
              errorMessage={errors.address?.message}
            />
            <TextArea
              title="Motivo da solicitação"
              {...register('request')}
              errorMessage={errors.request?.message}
            />

            <div className="mt-auto h-px w-full bg-zinc-400" />

            <Button className="ml-auto" type="submit" disabled={isSubmitting}>
              <span>Enviar solicitação</span>
              <Send className="size-5 shrink-0" />
            </Button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
