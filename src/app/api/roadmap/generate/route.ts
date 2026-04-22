import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { openai } from '@/lib/openai'
import { RoadmapGenerateSchema, RoadmapAIResponseSchema } from '@/lib/validation'

export async function POST(request: NextRequest) {
  let roadmapId: string | null = null

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const parsed = RoadmapGenerateSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request body', details: parsed.error.issues }, { status: 400 })
    }

    const { careerPath, currentYear, university } = parsed.data

    // Ensure user exists
    await prisma.user.upsert({
      where: { id: user.id },
      create: {
        id: user.id,
        email: user.email!,
        fullName: user.user_metadata?.full_name ?? null,
      },
      update: {},
    })

    const roadmap = await prisma.roadmap.create({
      data: { userId: user.id, careerPath, status: 'GENERATING' },
    })
    roadmapId = roadmap.id

    const systemPrompt = `You are an expert academic and career advisor specializing in university student career development.
Generate detailed, actionable career roadmaps. Return ONLY valid JSON matching the specified schema, no markdown, no commentary.`

    const contextDetails = [
      currentYear ? `Currently in Year ${currentYear} of university` : '',
      university ? `Attending: ${university}` : '',
    ].filter(Boolean).join('. ')

    const userPrompt = `Generate a detailed career roadmap for: ${careerPath}
${contextDetails ? `Context: ${contextDetails}` : ''}

Return exactly this JSON structure with 4-6 phases:
{
  "requiredDegree": "string - the degree needed",
  "gradeThresholds": {
    "minimumGPA": "string e.g. 2.5/4.0",
    "recommendedGPA": "string e.g. 3.5/4.0",
    "recommendedMajor": "string",
    "relevantMinors": ["string"]
  },
  "totalTimeline": "string e.g. 4-6 years",
  "phases": [
    {
      "phaseNumber": 1,
      "title": "string",
      "timeframe": "string e.g. Year 1-2",
      "description": "2-3 sentences describing what to focus on",
      "skills": ["skill1", "skill2", "skill3"],
      "certifications": ["cert1"],
      "internships": ["internship target"],
      "milestones": ["milestone1", "milestone2"]
    }
  ]
}`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.5,
      max_tokens: 3000,
    })

    const aiContent = completion.choices[0].message.content
    const aiParsed = RoadmapAIResponseSchema.safeParse(JSON.parse(aiContent ?? '{}'))

    if (!aiParsed.success) {
      await prisma.roadmap.update({
        where: { id: roadmapId },
        data: { status: 'FAILED' },
      })
      return NextResponse.json({ error: 'AI response parsing failed' }, { status: 502 })
    }

    const { requiredDegree, gradeThresholds, totalTimeline, phases } = aiParsed.data

    await prisma.roadmap.update({
      where: { id: roadmapId },
      data: {
        status: 'COMPLETE',
        requiredDegree,
        gradeThresholds,
        totalTimeline,
        phases: {
          createMany: {
            data: phases.map(p => ({
              phaseNumber: p.phaseNumber,
              title: p.title,
              timeframe: p.timeframe,
              description: p.description,
              skills: p.skills,
              certifications: p.certifications,
              internships: p.internships,
              milestones: p.milestones,
            })),
          },
        },
      },
    })

    return NextResponse.json({ roadmapId })
  } catch (error) {
    console.error('Roadmap generate error:', error)

    if (roadmapId) {
      await prisma.roadmap.update({
        where: { id: roadmapId },
        data: { status: 'FAILED' },
      }).catch(() => {})
    }

    return NextResponse.json({ error: 'Failed to generate roadmap. Please try again.' }, { status: 502 })
  }
}
