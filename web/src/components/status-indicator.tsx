import { twMerge } from 'tailwind-merge'

interface StatusIndicatorProps {
  status: string
  size?: 'xs' | 'sm' | 'base'
}

export function StatusIndicator({ status, size = 'sm' }: StatusIndicatorProps) {
  return (
    <div className="flex min-w-fit items-center gap-1">
      <div
        className={twMerge(
          'rounded-full bg-green-600/20 p-1',

          status === 'em breve' && 'bg-sky-700/20',
          status === 'fechada' && 'bg-zinc-500/20',
          status === 'inativo' && 'bg-zinc-500/20',

          size === 'xs' && 'p-0.5',
        )}
      >
        <div
          className={twMerge(
            'size-2 rounded-full bg-green-600',

            status === 'em breve' && 'bg-sky-700',
            status === 'fechada' && 'bg-zinc-500',
            status === 'inativo' && 'bg-zinc-500',

            size === 'xs' && 'size-1.5',
          )}
        />
      </div>
      <span
        className={twMerge(
          'text-sm font-medium capitalize text-green-600',

          status === 'em breve' && 'text-sky-700',
          status === 'fechada' && 'text-zinc-500',
          status === 'inativo' && 'text-zinc-500',

          size === 'base' && 'text-base',
          size === 'xs' && 'text-xs',
        )}
      >
        {status}
      </span>
    </div>
  )
}
