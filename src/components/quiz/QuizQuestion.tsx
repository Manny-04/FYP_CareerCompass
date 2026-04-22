import { QuizQuestion as QuizQuestionType, QuizOption as QuizOptionType, QuizAnswer } from '@/types/quiz'
import { QuizOption } from './QuizOption'

interface QuizQuestionProps {
  question: QuizQuestionType
  currentAnswer: QuizAnswer | undefined
  onAnswer: (answer: QuizAnswer) => void
}

const sectionForQuestion: Record<number, string> = {
  0: 'Section 1: Interests',
  1: 'Section 1: Interests',
  2: 'Section 1: Interests',
  3: 'Section 2: Preferences',
  4: 'Section 2: Preferences',
  5: 'Section 2: Preferences',
  6: 'Section 3: Impact',
  7: 'Section 3: Impact',
  8: 'Section 4: Skills',
  9: 'Section 4: Skills',
}

export function QuizQuestion({ question, currentAnswer, onAnswer }: QuizQuestionProps) {
  function handleSelect(option: QuizOptionType) {
    onAnswer({
      questionIndex: question.index,
      selectedOption: option.label,
      category: option.category,
    })
  }

  const section = sectionForQuestion[question.index] ?? ''

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
      <div className="flex flex-col gap-5">
        {section && (
          <span className="w-fit rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-500">
            {section}
          </span>
        )}
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">{question.text}</h2>
        <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label={question.text}>
          {question.options.map(option => (
            <QuizOption
              key={option.label}
              option={option}
              isSelected={currentAnswer?.selectedOption === option.label}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
