import { ComponentProps } from 'react'

interface InputProps extends ComponentProps<'input'> {
  title: string
  isMultiline?: boolean
}

export function Input({ title, isMultiline = false, ...props }: InputProps) {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium text-zinc-800">
      {title}
      {isMultiline ? (
        <textarea className="min-h-20 resize-y rounded-lg border border-zinc-400 bg-white px-2 py-3 text-sm text-zinc-700 outline-green-600" />
      ) : (
        <input
          className="h-10 rounded-lg border border-zinc-400 bg-white px-2 py-3 text-sm text-zinc-700 outline-green-600"
          {...props}
        />
      )}
    </label>
  )
}
