'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { RoadmapFormData } from '@/types/roadmap'

interface RoadmapState {
  status: 'idle' | 'generating' | 'done' | 'error'
  errorMessage: string | null
}

export function useRoadmap() {
  const router = useRouter()
  const [state, setState] = useState<RoadmapState>({ status: 'idle', errorMessage: null })

  const generate = useCallback(async (data: RoadmapFormData) => {
    setState({ status: 'generating', errorMessage: null })

    try {
      const response = await fetch('/api/roadmap/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const body = await response.json()
        throw new Error(body.error || 'Failed to generate roadmap')
      }

      const body = await response.json()
      setState({ status: 'done', errorMessage: null })
      router.push(`/roadmap/${body.roadmapId}`)
    } catch (err) {
      setState({
        status: 'error',
        errorMessage: err instanceof Error ? err.message : 'Something went wrong',
      })
    }
  }, [router])

  return { state, generate }
}
