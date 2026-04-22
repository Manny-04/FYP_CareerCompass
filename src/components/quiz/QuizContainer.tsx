'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useQuiz } from '@/hooks/useQuiz'
import { quizQuestions } from '@/data/quiz-questions'
import { ErrorMessage } from '@/components/ui/ErrorMessage'
import { Spinner } from '@/components/ui/Spinner'
import { QuizProgress } from './QuizProgress'
import { QuizQuestion } from './QuizQuestion'

export function QuizContainer() {
  const router = useRouter()
  const { state, currentQuestion, currentAnswer, isComplete, start, goBack, answerQuestion, submitQuiz } = useQuiz()

  useEffect(() => {
    start()
  }, [start])

  useEffect(() => {
    if (state.status === 'done' && state.sessionId) {
      router.push(`/results?session=${state.sessionId}`)
    }
  }, [state.status, state.sessionId, router])

  if (state.status === 'submitting') {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-gray-200 bg-white py-20 text-center">
        <Spinner size="lg" />
        <h2 className="text-xl font-semibold text-gray-900">Analyzing your answers...</h2>
        <p className="text-sm text-gray-500">Our AI is generating personalized career recommendations for you.</p>
      </div>
    )
  }

  if (state.status === 'error') {
    return (
      <div className="flex flex-col gap-4">
        <ErrorMessage message={state.errorMessage ?? 'An unexpected error occurred'} />
        <button
          onClick={start}
          className="w-fit rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Try again
        </button>
      </div>
    )
  }

  if (!currentQuestion) return null

  const isLastQuestion = state.currentIndex === quizQuestions.length - 1

  return (
    <div className="flex flex-col gap-6">
      <QuizProgress
        current={state.currentIndex + 1}
        total={quizQuestions.length}
      />

      <QuizQuestion
        question={currentQuestion}
        currentAnswer={currentAnswer}
        onAnswer={answerQuestion}
      />

      <div className="flex items-center justify-between">
        <button
          onClick={goBack}
          disabled={state.currentIndex === 0}
          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Previous Question
        </button>

        {isLastQuestion && isComplete ? (
          <button
            onClick={submitQuiz}
            className="flex items-center gap-2 rounded-full bg-red-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-600"
          >
            Get my results
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        ) : (
          <button
            onClick={() => {
              if (currentAnswer && state.currentIndex < quizQuestions.length - 1) {
                // Auto-advance already handled by answerQuestion, this is just a visual next button
              }
            }}
            disabled={!currentAnswer}
            className="flex items-center gap-2 rounded-full bg-green-700 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
          >
            Next Question
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        )}
      </div>
    </div>
  )
}
