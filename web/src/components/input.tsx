import { ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import InputMask, { ReactInputMask } from 'react-input-mask'

interface InputProps extends ComponentProps<'input'> {
  title?: string
  errorMessage?: string
  mask?: string | Array<string | RegExp>
}

export const Input = forwardRef<ReactInputMask, InputProps>(
  ({ title, errorMessage, mask = '', className, ...props }, ref) => {
    return (
      <label
        className={twMerge(
          'flex flex-col text-sm font-medium text-zinc-800',
          title && 'gap-1',
          className,
        )}
      >
        {title}

        <InputMask
          mask={mask}
          className="h-10 rounded-lg border border-zinc-400 bg-white px-2 py-3 text-sm font-normal text-zinc-700 outline-green-600 placeholder:text-zinc-700"
          ref={ref}
          {...props}
        />

        <span className="text-xs">{errorMessage}</span>
      </label>
    )
  },
)
