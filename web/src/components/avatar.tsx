'use client'

import * as AvatarRdx from '@radix-ui/react-avatar'
import { UserRound } from 'lucide-react'

interface AvatarProps extends AvatarRdx.AvatarImageProps {
  size?: 'md' | 'lg'
}

export function Avatar({ size = 'md', ...props }: AvatarProps) {
  return (
    <AvatarRdx.Root>
      {size === 'lg' ? (
        <AvatarRdx.Image
          {...props}
          className="size-40 rounded-full object-cover"
        />
      ) : (
        <AvatarRdx.Image
          {...props}
          className="size-10 rounded-full object-cover"
        />
      )}

      <AvatarRdx.Fallback>
        {size === 'lg' ? (
          <div className="rounded-full bg-orange-600/20 p-10">
            <UserRound className="size-20 text-orange-600" />
          </div>
        ) : (
          <div className="rounded-full bg-orange-600/20 p-2.5">
            <UserRound className="size-5 shrink-0 text-orange-600" />
          </div>
        )}
      </AvatarRdx.Fallback>
    </AvatarRdx.Root>
  )
}
