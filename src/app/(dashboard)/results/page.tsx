import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { ResultsGrid } from '@/components/results/ResultsGrid'

export const metadata: Metadata = {
  title: 'Your Recommended Career Paths',
}

interface ResultsPageProps {
  searchParams: Promise<{ session?: string }>
}

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const { session: sessionId } = await searchParams

  if (!sessionId) {
    notFound()
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) notFound()

  const session = await prisma.quizSession.findFirst({
    where: { id: sessionId, userId: user.id },
    include: { recommendations: { orderBy: { rank: 'asc' } } },
  })

  if (!session) notFound()

  const recommendations = session.recommendations.map(r => ({
    ...r,
    requiredSkills: r.requiredSkills,
    createdAt: r.createdAt.toISOString(),
  }))

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Your Recommended Career Paths</h1>
        <p className="mt-2 max-w-2xl text-gray-500">
          These careers best match your interests, personality, and academic profile based on your recent assessment.
        </p>
      </div>

      <ResultsGrid recommendations={recommendations as any} />

      {/* Retake CTA */}
      <div className="rounded-xl border border-gray-200 bg-white px-6 py-10 text-center">
        <h2 className="text-lg font-bold text-gray-900">Not finding what you&apos;re looking for?</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-gray-500">
          Retake the career assessment to refine your interests and get updated recommendations tailored to your evolving goals.
        </p>
        <Link
          href="/quiz"
          className="mt-6 inline-flex rounded-full bg-green-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-green-800 transition-colors"
        >
          Retake Assessment
        </Link>
      </div>
    </div>
  )
}
