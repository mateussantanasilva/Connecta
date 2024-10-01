import React, { useState, useEffect } from 'react'
import { Trash, Plus } from 'lucide-react'
import { Button } from '@/components/button'
import { Input } from '@/components/input'

interface CollectionPointsProps {
  title: string
  initialPoints: { endereco: string }[]
  onPointsChange: (updatedPoints: { endereco: string }[]) => void
  disabled?: boolean
}

export function CollectionPoints({
  title,
  initialPoints,
  onPointsChange,
  disabled,
}: CollectionPointsProps) {
  const [points, setPoints] = useState<{ endereco: string }[]>(
    initialPoints || [],
  )

  useEffect(() => {
    setPoints(initialPoints)
  }, [initialPoints])

  useEffect(() => {
    onPointsChange(points)
  }, [points, onPointsChange])

  const handleAddPoint = () => {
    setPoints((prevPoints) => [...prevPoints, { endereco: '' }])
  }

  const handlePointChange = (index: number, value: string) => {
    setPoints((prevPoints) => {
      const updatedPoints = [...prevPoints]
      updatedPoints[index].endereco = value
      return updatedPoints
    })
  }

  const handleRemovePoint = (index: number) => {
    if (points.length > 1) {
      setPoints((prevPoints) => {
        const updatedPoints = [...prevPoints]
        updatedPoints.splice(index, 1)
        return updatedPoints
      })
    }
  }

  return (
    <div>
      <label className="mb-1 flex flex-col gap-1 text-sm font-medium text-zinc-800">
        {title}
      </label>
      <div className="space-y-4">
        {points.map((point, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Input
              value={point.endereco}
              onChange={(e) => handlePointChange(index, e.target.value)}
              className="w-[632px]"
              disabled={disabled}
            />

            {!disabled && index > 0 && (
              <Button
                variant="danger"
                type="button"
                onClick={() => handleRemovePoint(index)}
              >
                <Trash />
              </Button>
            )}
          </div>
        ))}
        {!disabled && (
          <Button type="button" variant="outline" onClick={handleAddPoint}>
            <span>Adicionar ponto</span>
            <Plus className="size-5 shrink-0" />
          </Button>
        )}
      </div>
    </div>
  )
}
