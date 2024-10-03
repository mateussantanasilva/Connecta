'use client'

import * as Progress from '@radix-ui/react-progress'
import { useEffect, useState } from 'react'

interface ProgressBarProps {
  progression: number
}

export function ProgressBar({ progression }: ProgressBarProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(progression), 500)

    return () => clearTimeout(timer)
  }, [progression])

  return (
    <Progress.Root
      className="h-1 w-full rounded-lg bg-zinc-100"
      value={progress}
    >
      <Progress.Indicator
        className="h-1 rounded-lg bg-green-600 transition-all"
        style={{ width: `${progress}%` }}
      />
    </Progress.Root>
  )
}
