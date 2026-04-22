'use client'

import { useReducer, useCallback } from 'react'
import { QuizState, QuizAction, QuizAnswer } from '@/types/quiz'
import { quizQuestions } from '@/data/quiz-questions'

const initialState: QuizState = {
  currentIndex: 0,
  answers: [],
  status: 'idle',
  sessionId: null,
  errorMessage: null,
}

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'START':
      return { ...state, status: 'in-progress' }

    case 'ANSWER': {
      const existing = state.answers.findIndex(a => a.questionIndex === action.payload.questionIndex)
      const answers = existing >= 0
        ? state.answers.map((a, i) => i === existing ? action.payload : a)
        : [...state.answers, action.payload]

      const nextIndex = Math.min(state.currentIndex + 1, quizQuestions.length - 1)
      return { ...state, answers, currentIndex: nextIndex }
    }

    case 'PREV':
      return { ...state, currentIndex: Math.max(0, state.currentIndex - 1) }

    case 'SUBMIT':
      return { ...state, status: 'submitting' }

    case 'SUCCESS':
      return { ...state, status: 'done', sessionId: action.payload.sessionId }

    case 'ERROR':
      return { ...state, status: 'error', errorMessage: action.payload }

    default:
      return state
  }
}

export function useQuiz() {
  const [state, dispatch] = useReducer(quizReducer, initialState)

  const start = useCallback(() => dispatch({ type: 'START' }), [])
  const goBack = useCallback(() => dispatch({ type: 'PREV' }), [])

  const answerQuestion = useCallback((answer: QuizAnswer) => {
    dispatch({ type: 'ANSWER', payload: answer })
  }, [])

  const submitQuiz = useCallback(async () => {
    if (state.answers.length < quizQuestions.length) return

    dispatch({ type: 'SUBMIT' })

    try {
      const response = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: state.answers }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to submit quiz')
      }

      const data = await response.json()
      dispatch({ type: 'SUCCESS', payload: { sessionId: data.sessionId } })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err instanceof Error ? err.message : 'Something went wrong' })
    }
  }, [state.answers])

  const isComplete = state.answers.length === quizQuestions.length
  const currentQuestion = quizQuestions[state.currentIndex]
  const currentAnswer = state.answers.find(a => a.questionIndex === state.currentIndex)

  return {
    state,
    currentQuestion,
    currentAnswer,
    isComplete,
    start,
    goBack,
    answerQuestion,
    submitQuiz,
  }
}
