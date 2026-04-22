import { RoadmapPhase as RoadmapPhaseType } from '@/types/roadmap'
import { Badge } from '@/components/ui/Badge'

interface RoadmapPhaseProps {
  phase: RoadmapPhaseType
  isLast: boolean
}

export function RoadmapPhase({ phase, isLast }: RoadmapPhaseProps) {
  return (
    <div className="flex gap-6">
      {/* Timeline indicator */}
      <div className="flex flex-col items-center">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
          {phase.phaseNumber}
        </div>
        {!isLast && <div className="mt-2 flex-1 w-0.5 bg-green-200" />}
      </div>

      {/* Phase content */}
      <div className={`flex-1 ${isLast ? '' : 'pb-10'}`}>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <h3 className="text-base font-bold text-gray-900">{phase.title}</h3>
          <Badge variant="info">{phase.timeframe}</Badge>
        </div>
        <p className="text-sm text-gray-600 mb-5">{phase.description}</p>

        <div className="grid gap-4 sm:grid-cols-2">
          {phase.skills.length > 0 && (
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Skills to Learn</p>
              <ul className="flex flex-col gap-1">
                {phase.skills.map(skill => (
                  <li key={skill} className="flex items-center gap-2 text-sm text-gray-700">
                    <svg className="h-3.5 w-3.5 shrink-0 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {phase.certifications.length > 0 && (
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Certifications</p>
              <ul className="flex flex-col gap-1">
                {phase.certifications.map(cert => (
                  <li key={cert} className="flex items-center gap-2 text-sm text-gray-700">
                    <svg className="h-3.5 w-3.5 shrink-0 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="8" r="6" />
                      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                    </svg>
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {phase.internships.length > 0 && (
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Internships / Experience</p>
              <ul className="flex flex-col gap-1">
                {phase.internships.map(internship => (
                  <li key={internship} className="flex items-center gap-2 text-sm text-gray-700">
                    <svg className="h-3.5 w-3.5 shrink-0 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                    {internship}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {phase.milestones.length > 0 && (
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Key Milestones</p>
              <ul className="flex flex-col gap-1">
                {phase.milestones.map(milestone => (
                  <li key={milestone} className="flex items-center gap-2 text-sm text-gray-700">
                    <svg className="h-3.5 w-3.5 shrink-0 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    {milestone}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
