import { Card } from '@/components/ui/Card'
import { Spinner } from '@/components/ui/Spinner'

export function RoadmapSkeleton() {
  return (
    <Card className="flex flex-col items-center gap-4 py-16 text-center">
      <Spinner size="lg" />
      <h2 className="text-xl font-semibold text-gray-900">Generating your roadmap...</h2>
      <p className="max-w-sm text-sm text-gray-600">
        Our AI is building a personalized step-by-step plan for your career. This may take a moment.
      </p>
    </Card>
  )
}
