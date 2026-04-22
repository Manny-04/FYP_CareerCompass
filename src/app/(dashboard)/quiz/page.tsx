import type { Metadata } from 'next'
import { QuizContainer } from '@/components/quiz/QuizContainer'

export const metadata: Metadata = {
  title: 'Career Personality Assessment',
}

export default function QuizPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Career Personality Assessment</h1>
        <p className="mt-2 max-w-2xl text-gray-500">
          Answer these questions thoughtfully to help us generate personalized career recommendations tailored to your unique strengths and interests.
        </p>
      </div>
      <QuizContainer />
    </div>
  )
}
