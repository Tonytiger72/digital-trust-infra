import { cn } from '@/lib/utils'

interface Props {
  value: number
  className?: string
  showLabel?: boolean
  size?: 'sm' | 'md'
}

export function ProgressBar({ value, className, showLabel = false, size = 'md' }: Props) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className={cn('flex-1 bg-slate-100 rounded-full overflow-hidden', size === 'sm' ? 'h-1.5' : 'h-2')}>
        <div
          className="h-full bg-[#2E75B6] rounded-full transition-all duration-500"
          style={{ width: `${Math.min(100, value)}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-sm font-semibold text-slate-700 w-10 text-right">{value}%</span>
      )}
    </div>
  )
}
