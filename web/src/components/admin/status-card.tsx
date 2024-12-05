import { ReactNode } from 'react'

interface CardProps {
  title: string
  count: number | string
  description: string
  icon: ReactNode
}

export function StatusCard({ title, count, description, icon }: CardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-zinc-400 p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{title}</h3>
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <strong className="text-2xl font-bold text-zinc-800">{count}</strong>
        <span className="text-xs">{description}</span>
      </div>
    </div>
  )
}
