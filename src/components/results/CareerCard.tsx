import Link from 'next/link'
import { CareerRecommendation } from '@/types/career'

interface CareerCardProps {
  recommendation: CareerRecommendation
  matchPercent: number
}

const categoryIcons: Record<string, React.ReactNode> = {
  STEM: <svg className="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  Creative: <svg className="h-5 w-5 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="m2 2 7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>,
  Business: <svg className="h-5 w-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  Healthcare: <svg className="h-5 w-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  Education: <svg className="h-5 w-5 text-teal-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  SkilledTrades: <svg className="h-5 w-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  PublicService: <svg className="h-5 w-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
}

export function CareerCard({ recommendation, matchPercent }: CareerCardProps) {
  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white">
      <div className="flex-1 p-5">
        {/* Header */}
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="text-base font-bold text-gray-900">{recommendation.careerTitle}</h3>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-50">
            {categoryIcons[recommendation.category] ?? categoryIcons.STEM}
          </div>
        </div>

        {/* Match badge */}
        <div className="mb-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            Match {matchPercent}%
          </span>
        </div>

        {/* Description */}
        <p className="mb-4 text-sm leading-relaxed text-gray-500">{recommendation.description}</p>

        {/* Salary + Outlook */}
        <div className="mb-3 flex flex-col gap-2 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            <span className="font-medium text-gray-700">{recommendation.salaryRange}</span>
          </span>
          <span className="flex items-start gap-1.5">
            <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
            <span>{recommendation.industryOutlook.split('.')[0]}</span>
          </span>
        </div>

        {/* Skills */}
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
          <span>{recommendation.requiredSkills.slice(0, 3).join(', ')}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 px-5 py-3">
        <Link
          href={`/roadmap?career=${encodeURIComponent(recommendation.careerTitle)}`}
          className="flex w-full items-center justify-center rounded-lg bg-green-700 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-800"
        >
          View Pathway
        </Link>
      </div>
    </div>
  )
}
