"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CustomSliderProps {
  value: number
  onChange: (value: number) => void
  className?: string
}

export function CustomSlider({ value, onChange, className }: CustomSliderProps) {
  const [isDragging, setIsDragging] = React.useState(false)
  const sliderRef = React.useRef<HTMLDivElement>(null)

  const handleMove = React.useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return

      const rect = sliderRef.current.getBoundingClientRect()
      const width = rect.width
      const left = rect.left
      const newPosition = Math.max(0, Math.min(clientX - left, width))
      const percentage = Math.round((newPosition / width) * 100)
      onChange(percentage)
    },
    [onChange],
  )

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    handleMove(e.clientX)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    handleMove(e.touches[0].clientX)
  }

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      handleMove(e.clientX)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return
      handleMove(e.touches[0].clientX)
    }

    const handleEnd = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleEnd)
      window.addEventListener("touchmove", handleTouchMove)
      window.addEventListener("touchend", handleEnd)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleEnd)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleEnd)
    }
  }, [isDragging, handleMove])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const step = 5
    switch (e.key) {
      case "ArrowLeft":
      case "ArrowDown":
        e.preventDefault()
        onChange(Math.max(0, value - step))
        break
      case "ArrowRight":
      case "ArrowUp":
        e.preventDefault()
        onChange(Math.min(100, value + step))
        break
      case "Home":
        e.preventDefault()
        onChange(0)
        break
      case "End":
        e.preventDefault()
        onChange(100)
        break
    }
  }

  return (
    <div className={cn("relative w-full h-12 select-none touch-none", className)}>
      <div
        ref={sliderRef}
        className="absolute top-1/2 left-0 w-full h-2 -mt-1 rounded-full cursor-pointer"
        style={{
          background: "linear-gradient(to right, #22c55e 0%, #ef4444 100%)",
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div
          role="slider"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Severity"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className={cn(
            "absolute top-1/2 w-6 h-6 -mt-3 -ml-3 rounded-full bg-white border-2 border-primary",
            "shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
            isDragging && "shadow-xl scale-110",
          )}
          style={{
            left: `${value}%`,
          }}
        />
      </div>
    </div>
  )
}

