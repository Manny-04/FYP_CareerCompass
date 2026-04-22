export type QuizCategory =
  | 'STEM'
  | 'Creative'
  | 'Business'
  | 'Healthcare'
  | 'Education'
  | 'SkilledTrades'
  | 'PublicService'

export interface QuizOption {
  label: 'A' | 'B' | 'C' | 'D'
  text: string
  category: QuizCategory
}

export interface QuizQuestion {
  index: number
  text: string
  options: QuizOption[]
}

export interface QuizAnswer {
  questionIndex: number
  selectedOption: 'A' | 'B' | 'C' | 'D'
  category: QuizCategory
}

export interface CategoryScores {
  STEM: number
  Creative: number
  Business: number
  Healthcare: number
  Education: number
  SkilledTrades: number
  PublicService: number
}

export interface QuizState {
  currentIndex: number
  answers: QuizAnswer[]
  status: 'idle' | 'in-progress' | 'submitting' | 'done' | 'error'
  sessionId: string | null
  errorMessage: string | null
}

export type QuizAction =
  | { type: 'START' }
  | { type: 'ANSWER'; payload: QuizAnswer }
  | { type: 'PREV' }
  | { type: 'SUBMIT' }
  | { type: 'SUCCESS'; payload: { sessionId: string } }
  | { type: 'ERROR'; payload: string }
