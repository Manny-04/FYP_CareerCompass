import type { Metadata } from 'next'
import { Suspense } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { RoadmapForm } from '@/components/roadmap/RoadmapForm'

export const metadata: Metadata = {
  title: 'Generate Roadmap',
}

export default function RoadmapPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Career Roadmap Generator"
        description="Enter a career goal and get a personalized step-by-step plan to achieve it."
      />
      <Suspense>
        <RoadmapForm />
      </Suspense>
    </div>
  )
}
