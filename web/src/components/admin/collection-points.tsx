import React, { useState, useEffect } from 'react'
import { Trash, Plus } from 'lucide-react'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { FieldError, Merge } from 'react-hook-form'

interface CollectionPointsProps {
  initialPoints: string[]
  disabled?: boolean
  errorMessage?: Merge<FieldError, (FieldError | undefined)[]> | undefined
  onPointsChange?: (updatedPoints: string[]) => void
}

export function CollectionPoints({
  initialPoints,
  disabled,
  errorMessage,
  onPointsChange,
}: CollectionPointsProps) {
  const [points, setPoints] = useState(initialPoints)

  function handleAddPoint() {
    setPoints((prevPoints) => [...prevPoints, ''])
  }

  function handlePointChange(index: number, value: string) {
    setPoints((prevPoints) => {
      const updatedPoints = [...prevPoints]
      updatedPoints[index] = value
      return updatedPoints
    })
  }

  function handleRemovePoint(index: number) {
    if (points.length > 1) {
      setPoints((prevPoints) => {
        const updatedPoints = [...prevPoints]
        updatedPoints.splice(index, 1)
        return updatedPoints
      })
    }
  }

  useEffect(() => {
    setPoints(initialPoints)
  }, [initialPoints])

  useEffect(() => {
    onPointsChange && onPointsChange(points)
  }, [points, onPointsChange])

  return (
    <div>
      <label className="mb-1 flex flex-col gap-1 text-sm font-medium text-zinc-800">
        Pontos de coleta
      </label>
      <div className="space-y-4">
        {points.map((point, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              value={point}
              onChange={(e) => handlePointChange(index, e.target.value)}
              errorMessage={errorMessage && errorMessage[index]?.message}
              disabled={disabled}
              className="w-[632px]"
            />

            {!disabled && index > 0 && (
              <Button
                variant="danger"
                size="xxs"
                type="button"
                onClick={() => handleRemovePoint(index)}
              >
                <Trash className="size-4" />
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
