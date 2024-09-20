import { ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface TextAreaProps extends ComponentProps<'textarea'> {
  title: string
  errorMessage?: string
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ title, errorMessage, className, ...props }, ref) => {
    return (
      <label
        className={twMerge(
          'flex flex-col gap-1 text-sm font-medium text-zinc-800',
          className,
        )}
      >
        {title}

        <textarea
          className="min-h-20 resize-y rounded-lg border border-zinc-400 bg-white px-2 py-3 text-sm text-zinc-700 outline-green-600"
          ref={ref}
          {...props}
        />

        <span className="text-xs">{errorMessage}</span>
      </label>
    )
  },
)
