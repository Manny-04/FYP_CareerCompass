import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { PageHeader } from '@/components/layout/PageHeader'
import { RoadmapDisplay } from '@/components/roadmap/RoadmapDisplay'
import { Card } from '@/components/ui/Card'
import { Roadmap } from '@/types/roadmap'

interface RoadmapViewPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: RoadmapViewPageProps): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { title: 'Roadmap' }

  const roadmap = await prisma.roadmap.findFirst({ where: { id, userId: user.id } })
  return { title: roadmap ? `${roadmap.careerPath} Roadmap` : 'Roadmap' }
}

export default async function RoadmapViewPage({ params }: RoadmapViewPageProps) {
  const { id } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) notFound()

  const roadmap = await prisma.roadmap.findFirst({
    where: { id, userId: user.id },
    include: { phases: { orderBy: { phaseNumber: 'asc' } } },
  })

  if (!roadmap) notFound()

  if (roadmap.status === 'FAILED') {
    return (
      <div className="flex flex-col gap-8">
        <PageHeader title="Roadmap Generation Failed" />
        <Card className="flex flex-col items-center gap-4 py-12 text-center">
          <svg className="h-12 w-12 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="text-gray-600">We couldn&apos;t generate this roadmap. Please try again.</p>
          <Link href="/roadmap" className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
            Try again
          </Link>
        </Card>
      </div>
    )
  }

  const roadmapData: Roadmap = {
    ...roadmap,
    gradeThresholds: roadmap.gradeThresholds as Roadmap['gradeThresholds'],
    createdAt: roadmap.createdAt.toISOString(),
    updatedAt: roadmap.updatedAt.toISOString(),
    phases: roadmap.phases,
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title={roadmap.careerPath}
        description="Your personalized career roadmap"
        action={
          <Link
            href="/roadmap"
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Image src="/icons/map.svg" alt="" width={16} height={16} />
            New roadmap
          </Link>
        }
      />
      <RoadmapDisplay roadmap={roadmapData} />
    </div>
  )
}
