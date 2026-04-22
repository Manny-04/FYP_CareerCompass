import { CareerRecommendation } from '@/types/career'
import { CareerCard } from './CareerCard'

interface ResultsGridProps {
  recommendations: CareerRecommendation[]
}

const matchPercentages = [92, 88, 85, 82, 79, 75]

export function ResultsGrid({ recommendations }: ResultsGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {recommendations.map((rec, i) => (
        <CareerCard
          key={rec.id}
          recommendation={rec}
          matchPercent={matchPercentages[i] ?? 70}
        />
      ))}
    </div>
  )
}
