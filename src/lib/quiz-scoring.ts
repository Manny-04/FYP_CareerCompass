import { QuizAnswer, CategoryScores, QuizCategory } from '@/types/quiz'

export function tallyScores(answers: QuizAnswer[]): CategoryScores {
  const scores: CategoryScores = {
    STEM: 0,
    Creative: 0,
    Business: 0,
    Healthcare: 0,
    Education: 0,
    SkilledTrades: 0,
    PublicService: 0,
  }

  for (const answer of answers) {
    if (answer.category in scores) {
      scores[answer.category as QuizCategory]++
    }
  }

  return scores
}

export function getTopCategories(scores: CategoryScores, count = 3): QuizCategory[] {
  return (Object.entries(scores) as [QuizCategory, number][])
    .sort(([, a], [, b]) => b - a)
    .slice(0, count)
    .map(([category]) => category)
}
