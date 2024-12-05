'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ComponentProps, ReactNode } from 'react'
import { Button } from '../button'

interface ConfirmationModalProps extends ComponentProps<'button'> {
  children: ReactNode
  variant?: 'safe' | 'danger'
  title: string
  description: string
  onConfirm?: () => void
}

export function ConfirmationModal({
  children,
  variant = 'safe',
  title,
  description,
  onConfirm,
  ...props
}: ConfirmationModalProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger aria-label="" asChild {...props}>
        {children}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 bg-black/60" />

        <Dialog.Content className="fixed inset-4 z-30 m-auto h-fit max-w-lg space-y-5 rounded-2xl border border-zinc-400 bg-white p-5">
          <Dialog.Close asChild>
            <Button size="xs" variant="outline" className="ml-auto">
              <X className="size-5 shrink-0" />
            </Button>
          </Dialog.Close>

          <div className="space-y-2">
            <Dialog.Title className="text-lg font-bold text-zinc-800">
              {title}
            </Dialog.Title>

            <Dialog.Description>{description}</Dialog.Description>
          </div>

          <div className="mt-auto h-px w-full bg-zinc-400" />

          <Button
            variant={variant === 'danger' ? 'danger' : 'primary'}
            onClick={onConfirm}
            className="ml-auto"
          >
            <span>Confirmar</span>
          </Button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
