interface CategoryScoreBarProps {
  category: string
  score: number
  max: number
  color: string
}

export function CategoryScoreBar({ category, score, max, color }: CategoryScoreBarProps) {
  const percentage = Math.round((score / max) * 100)
  return (
    <div className="flex items-center gap-4">
      <span className="w-28 shrink-0 text-right text-sm font-medium text-gray-700">{category}</span>
      <div className="flex-1">
        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className={`h-full rounded-full transition-all duration-700 ${color}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      <span className="w-6 shrink-0 text-right text-sm text-gray-500">{score}</span>
    </div>
  )
}
