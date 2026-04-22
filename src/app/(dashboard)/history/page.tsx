import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: 'History',
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-10 text-center">
      <svg className="h-10 w-10 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
        <path d="M12 7v5l4 2" />
      </svg>
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  )
}

export default async function HistoryPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [quizSessions, roadmaps] = await Promise.all([
    user
      ? prisma.quizSession.findMany({
          where: { userId: user.id, completedAt: { not: null } },
          include: { recommendations: { orderBy: { rank: 'asc' }, take: 1 } },
          orderBy: { createdAt: 'desc' },
          take: 10,
        })
      : [],
    user
      ? prisma.roadmap.findMany({
          where: { userId: user.id },
          orderBy: { createdAt: 'desc' },
          take: 10,
        })
      : [],
  ])

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="History"
        description="Review your past career assessments and roadmaps."
      />

      <section>
        <h2 className="mb-4 text-base font-semibold text-gray-900">Quiz Sessions</h2>
        {quizSessions.length === 0 ? (
          <Card>
            <EmptyState message="No quiz sessions yet. Take the career quiz to get started." />
          </Card>
        ) : (
          <div className="flex flex-col gap-3">
            {quizSessions.map(session => {
              const topCareer = session.recommendations[0]
              return (
                <Link key={session.id} href={`/results?session=${session.id}`}>
                  <Card className="flex items-center justify-between gap-4 hover:border-green-200 hover:bg-green-50/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="rounded-lg bg-green-50 p-2.5">
                        <Image src="/icons/brain.svg" alt="" width={20} height={20} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {topCareer ? `Top match: ${topCareer.careerTitle}` : 'Quiz session'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {session.completedAt ? new Date(session.completedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : ''}
                        </p>
                      </div>
                    </div>
                    <Image src="/icons/chevron-right.svg" alt="" width={16} height={16} className="shrink-0 text-gray-400" />
                  </Card>
                </Link>
              )
            })}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-base font-semibold text-gray-900">Roadmaps</h2>
        {roadmaps.length === 0 ? (
          <Card>
            <EmptyState message="No roadmaps generated yet. Create one to plan your career path." />
          </Card>
        ) : (
          <div className="flex flex-col gap-3">
            {roadmaps.map(roadmap => (
              <Link key={roadmap.id} href={`/roadmap/${roadmap.id}`}>
                <Card className="flex items-center justify-between gap-4 hover:border-green-200 hover:bg-green-50/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-emerald-50 p-2.5">
                      <Image src="/icons/map.svg" alt="" width={20} height={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{roadmap.careerPath}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(roadmap.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={roadmap.status === 'COMPLETE' ? 'success' : roadmap.status === 'FAILED' ? 'warning' : 'default'}>
                      {roadmap.status.toLowerCase()}
                    </Badge>
                    <Image src="/icons/chevron-right.svg" alt="" width={16} height={16} className="shrink-0 text-gray-400" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
