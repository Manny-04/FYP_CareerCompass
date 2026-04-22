import { z } from 'zod'

export const QuizAnswerSchema = z.object({
  questionIndex: z.number().int().min(0).max(9),
  selectedOption: z.enum(['A', 'B', 'C', 'D']),
  category: z.enum(['STEM', 'Creative', 'Business', 'Healthcare', 'Education', 'SkilledTrades', 'PublicService']),
})

export const QuizSubmitSchema = z.object({
  answers: z.array(QuizAnswerSchema).length(10),
})

export const RoadmapGenerateSchema = z.object({
  careerPath: z.string().min(3, 'Career path must be at least 3 characters').max(100, 'Career path must be under 100 characters'),
  currentYear: z.number().int().min(1).max(6).optional(),
  university: z.string().max(200).optional(),
})

export const CareerRecommendationAISchema = z.object({
  rank: z.number().int().min(1).max(4),
  careerTitle: z.string(),
  description: z.string(),
  category: z.enum(['STEM', 'Creative', 'Business', 'Healthcare', 'Education', 'SkilledTrades', 'PublicService']),
  requiredSkills: z.array(z.string()),
  salaryRange: z.string(),
  industryOutlook: z.string(),
})

export const QuizAIResponseSchema = z.object({
  recommendations: z.array(CareerRecommendationAISchema).length(4),
})

export const RoadmapPhaseAISchema = z.object({
  phaseNumber: z.number().int().min(1),
  title: z.string(),
  timeframe: z.string(),
  description: z.string(),
  skills: z.array(z.string()),
  certifications: z.array(z.string()),
  internships: z.array(z.string()),
  milestones: z.array(z.string()),
})

export const RoadmapAIResponseSchema = z.object({
  requiredDegree: z.string(),
  gradeThresholds: z.object({
    minimumGPA: z.string(),
    recommendedGPA: z.string(),
    recommendedMajor: z.string(),
    relevantMinors: z.array(z.string()),
  }),
  totalTimeline: z.string(),
  phases: z.array(RoadmapPhaseAISchema).min(4).max(6),
})

export type QuizSubmitInput = z.infer<typeof QuizSubmitSchema>
export type RoadmapGenerateInput = z.infer<typeof RoadmapGenerateSchema>
