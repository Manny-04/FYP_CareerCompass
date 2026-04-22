import { QuizCategory } from './quiz'

export interface CareerRecommendation {
  id: string
  sessionId: string
  rank: number
  careerTitle: string
  description: string
  category: QuizCategory
  requiredSkills: string[]
  salaryRange: string
  industryOutlook: string
  createdAt: string
}

export interface QuizResult {
  sessionId: string
  completedAt: string
  categoryScores: {
    stem: number
    creative: number
    business: number
    healthcare: number
    education: number
    skilledTrades: number
    publicService: number
  }
  recommendations: CareerRecommendation[]
}
