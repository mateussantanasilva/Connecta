import { ComponentProps, ReactNode } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'flex items-center justify-center gap-1.5 rounded-lg text-sm font-bold transition-colors',

  variants: {
    variant: {
      primary: 'bg-green-600 text-white hover:bg-green-700',
      secondary: 'bg-orange-600 text-white hover:bg-orange-700',
      outline:
        'border border-zinc-400 bg-white hover:text-zinc-800 hover:border-zinc-800',
      danger:
        'border border-zinc-400 bg-white text-red-600 hover:text-red-700 hover:border-red-700',
    },

    size: {
      xs: 'p-2 size-9',
      sm: 'h-9 py-2 px-4',
      md: 'h-10 px-4 py-3',
      full: 'h-10 w-full py-3',
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof button> {
  children?: ReactNode
}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button className={button({ className, ...props })} {...props}>
      {children}
    </button>
  )
}
