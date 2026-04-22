import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [quizCount, roadmapCount] = await Promise.all([
    user ? prisma.quizSession.count({ where: { userId: user.id, completedAt: { not: null } } }) : 0,
    user ? prisma.roadmap.count({ where: { userId: user.id, status: 'COMPLETE' } }) : 0,
  ])

  const displayName = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.split(' ')[0]
    : user?.email?.split('@')[0] ?? 'there'

  return (
    <div className="flex flex-col gap-8">
      {/* Welcome */}
      <div className="rounded-2xl bg-green-700 px-8 py-10 text-white">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
            <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <div>
            <p className="text-sm text-green-200">Welcome back</p>
            <h1 className="text-2xl font-bold">{displayName}</h1>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-xs font-medium text-gray-500">Assessments Taken</p>
          <p className="mt-1 text-3xl font-bold text-gray-900">{quizCount}</p>
          <p className="mt-1 text-xs text-green-600">Completed</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-xs font-medium text-gray-500">Roadmaps Generated</p>
          <p className="mt-1 text-3xl font-bold text-gray-900">{roadmapCount}</p>
          <p className="mt-1 text-xs text-green-600">Active plans</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-xs font-medium text-gray-500">Profile Strength</p>
          <p className="mt-1 text-3xl font-bold text-gray-900">{quizCount > 0 ? 'Advanced' : 'Beginner'}</p>
          <p className="mt-1 text-xs text-gray-400">{quizCount > 0 ? 'Looking good' : 'Take a quiz to start'}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-base font-bold text-gray-900">Take Career Assessment</h2>
          <p className="mt-1.5 text-sm text-gray-500">
            Answer our personality quiz to get AI-powered career recommendations matched to your strengths.
          </p>
          <Link
            href="/quiz"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-green-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-800 transition-colors"
          >
            Start Assessment
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-base font-bold text-gray-900">Generate Career Roadmap</h2>
          <p className="mt-1.5 text-sm text-gray-500">
            Already know your target career? Get a detailed step-by-step roadmap to get there.
          </p>
          <Link
            href="/roadmap"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Create Roadmap
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
