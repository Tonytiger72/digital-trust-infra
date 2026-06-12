import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  value: number
  className?: string
  showLabel?: boolean
  size?: 'sm' | 'md'
  animationDelay?: number
}

export function ProgressBar({ value, className, showLabel = false, size = 'md', animationDelay = 0 }: Props) {
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const t = setTimeout(() => setWidth(value), animationDelay)
          observer.disconnect()
          return () => clearTimeout(t)
        }
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, animationDelay])

  return (
    <div ref={ref} className={cn('flex items-center gap-3', className)}>
      <div className={cn('flex-1 bg-slate-100 rounded-full overflow-hidden', size === 'sm' ? 'h-1.5' : 'h-2')}>
        <div
          className="h-full bg-[#2E75B6] rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${Math.min(100, width)}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-sm font-semibold text-slate-700 w-10 text-right">{value}%</span>
      )}
    </div>
  )
}
