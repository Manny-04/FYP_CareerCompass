'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRoadmap } from '@/hooks/useRoadmap'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ErrorMessage } from '@/components/ui/ErrorMessage'
import { Card } from '@/components/ui/Card'

export function RoadmapForm() {
  const searchParams = useSearchParams()
  const [careerPath, setCareerPath] = useState('')
  const [currentYear, setCurrentYear] = useState<string>('')
  const [university, setUniversity] = useState('')
  const { state, generate } = useRoadmap()

  useEffect(() => {
    const career = searchParams.get('career')
    if (career) setCareerPath(career)
  }, [searchParams])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await generate({
      careerPath: careerPath.trim(),
      currentYear: currentYear ? parseInt(currentYear) : undefined,
      university: university.trim() || undefined,
    })
  }

  return (
    <Card padding="lg">
      <h2 className="mb-2 text-lg font-semibold text-gray-900">Generate your roadmap</h2>
      <p className="mb-6 text-sm text-gray-500">
        Enter your target career and we&apos;ll create a personalized step-by-step plan to get you there.
      </p>

      {state.errorMessage && (
        <ErrorMessage message={state.errorMessage} className="mb-6" />
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input
          id="careerPath"
          label="Target career"
          placeholder="e.g. Software Engineer, Nurse Practitioner, Marketing Manager"
          value={careerPath}
          onChange={e => setCareerPath(e.target.value)}
          required
          minLength={3}
          maxLength={100}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="currentYear" className="text-sm font-medium text-gray-700">
              Current year of study <span className="text-gray-400">(optional)</span>
            </label>
            <select
              id="currentYear"
              value={currentYear}
              onChange={e => setCurrentYear(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select year</option>
              <option value="1">Year 1</option>
              <option value="2">Year 2</option>
              <option value="3">Year 3</option>
              <option value="4">Year 4</option>
              <option value="5">Year 5</option>
              <option value="6">Year 6 (Graduate)</option>
            </select>
          </div>

          <Input
            id="university"
            label={<>University <span className="text-gray-400">(optional)</span></>}
            placeholder="e.g. University of Melbourne"
            value={university}
            onChange={e => setUniversity(e.target.value)}
            maxLength={200}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          loading={state.status === 'generating'}
          className="mt-2"
        >
          {state.status === 'generating' ? 'Generating your roadmap...' : 'Generate roadmap'}
        </Button>
      </form>
    </Card>
  )
}
