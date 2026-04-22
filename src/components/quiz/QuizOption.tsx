import { QuizOption as QuizOptionType } from '@/types/quiz'

interface QuizOptionProps {
  option: QuizOptionType
  isSelected: boolean
  onSelect: (option: QuizOptionType) => void
}

export function QuizOption({ option, isSelected, onSelect }: QuizOptionProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(option)}
      className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
        isSelected
          ? 'border-green-300 bg-green-50'
          : 'border-gray-200 bg-white hover:border-green-200 hover:bg-green-50/30'
      }`}
      aria-pressed={isSelected}
    >
      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
        isSelected
          ? 'border-green-600 bg-green-600'
          : 'border-gray-300 bg-white'
      }`}>
        {isSelected && (
          <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
      <span className={`text-sm leading-relaxed ${isSelected ? 'font-medium text-green-900' : 'text-gray-700'}`}>
        {option.text}
      </span>
    </button>
  )
}
