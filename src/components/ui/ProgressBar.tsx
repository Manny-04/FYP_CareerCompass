interface ProgressBarProps {
  value: number
  max: number
  label?: string
  color?: string
  className?: string
}

export function ProgressBar({ value, max, label, color = 'bg-green-600', className = '' }: ProgressBarProps) {
  const percentage = Math.round((value / max) * 100)
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <div className="flex justify-between text-xs text-gray-600">
          <span>{label}</span>
          <span>{value}/{max}</span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  )
}
