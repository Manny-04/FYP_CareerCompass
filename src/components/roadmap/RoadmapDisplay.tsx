import { Roadmap } from '@/types/roadmap'
import { Card } from '@/components/ui/Card'
import { RoadmapPhase } from './RoadmapPhase'

interface RoadmapDisplayProps {
  roadmap: Roadmap
}

export function RoadmapDisplay({ roadmap }: RoadmapDisplayProps) {
  const { gradeThresholds } = roadmap

  return (
    <div className="flex flex-col gap-6">
      {/* Overview card */}
      <Card>
        <h2 className="mb-4 text-lg font-bold text-gray-900">{roadmap.careerPath} — Overview</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Required Degree</p>
            <p className="mt-1 text-sm font-medium text-gray-900">{roadmap.requiredDegree ?? 'Not specified'}</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Total Timeline</p>
            <p className="mt-1 text-sm font-medium text-gray-900">{roadmap.totalTimeline ?? 'Not specified'}</p>
          </div>
          {gradeThresholds && (
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Recommended Major</p>
              <p className="mt-1 text-sm font-medium text-gray-900">{gradeThresholds.recommendedMajor}</p>
            </div>
          )}
        </div>

        {gradeThresholds && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-gray-200 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">GPA Thresholds</p>
              <p className="mt-1 text-sm text-gray-700">
                Minimum: <span className="font-semibold">{gradeThresholds.minimumGPA}</span> &middot; Recommended: <span className="font-semibold">{gradeThresholds.recommendedGPA}</span>
              </p>
            </div>
            {gradeThresholds.relevantMinors.length > 0 && (
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Relevant Minors</p>
                <p className="mt-1 text-sm text-gray-700">{gradeThresholds.relevantMinors.join(', ')}</p>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Phases */}
      <Card>
        <h2 className="mb-6 text-lg font-bold text-gray-900">Your Roadmap</h2>
        <div className="flex flex-col">
          {roadmap.phases.map((phase, i) => (
            <RoadmapPhase
              key={phase.id}
              phase={phase}
              isLast={i === roadmap.phases.length - 1}
            />
          ))}
        </div>
      </Card>
    </div>
  )
}
