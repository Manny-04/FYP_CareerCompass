export type RoadmapStatus = 'PENDING' | 'GENERATING' | 'COMPLETE' | 'FAILED'

export interface GradeThresholds {
  minimumGPA: string
  recommendedGPA: string
  recommendedMajor: string
  relevantMinors: string[]
}

export interface RoadmapPhase {
  id: string
  roadmapId: string
  phaseNumber: number
  title: string
  timeframe: string
  description: string
  skills: string[]
  certifications: string[]
  internships: string[]
  milestones: string[]
}

export interface Roadmap {
  id: string
  userId: string
  careerPath: string
  status: RoadmapStatus
  requiredDegree: string | null
  gradeThresholds: GradeThresholds | null
  totalTimeline: string | null
  createdAt: string
  updatedAt: string
  phases: RoadmapPhase[]
}

export interface RoadmapFormData {
  careerPath: string
  currentYear?: number
  university?: string
}
