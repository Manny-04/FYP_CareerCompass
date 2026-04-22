import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { openai } from '@/lib/openai'
import { tallyScores } from '@/lib/quiz-scoring'
import { QuizSubmitSchema, QuizAIResponseSchema } from '@/lib/validation'
import { quizQuestions } from '@/data/quiz-questions'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const parsed = QuizSubmitSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request body', details: parsed.error.issues }, { status: 400 })
    }

    const { answers } = parsed.data
    const scores = tallyScores(answers)

    // Build answer text for AI prompt
    const answerSummary = answers.map(answer => {
      const question = quizQuestions[answer.questionIndex]
      const option = question?.options.find(o => o.label === answer.selectedOption)
      return `Q${answer.questionIndex + 1}: ${question?.text}\nAnswer: ${option?.text} (${answer.category})`
    }).join('\n\n')

    const systemPrompt = `You are CareerCompass, an expert career counselor specializing in guiding university students.
You analyze quiz responses and provide exactly 4 ranked career recommendations in JSON format.
Return ONLY valid JSON matching the specified schema, no markdown, no commentary.`

    const userPrompt = `Based on the following quiz results, provide 4 ranked career recommendations.

Category Scores (out of 10):
- STEM: ${scores.STEM}
- Creative: ${scores.Creative}
- Business: ${scores.Business}
- Healthcare: ${scores.Healthcare}
- Education: ${scores.Education}
- Skilled Trades: ${scores.SkilledTrades}
- Public Service: ${scores.PublicService}

Individual Answers:
${answerSummary}

Return exactly this JSON structure:
{
  "recommendations": [
    {
      "rank": 1,
      "careerTitle": "string",
      "description": "2-3 sentences about the career and why it fits this person",
      "category": "STEM|Creative|Business|Healthcare|Education|SkilledTrades|PublicService",
      "requiredSkills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
      "salaryRange": "$XX,000 - $XX,000",
      "industryOutlook": "1-2 sentences about growth prospects"
    }
  ]
}`

    async function callAI() {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
        max_tokens: 2000,
      })
      return completion.choices[0].message.content
    }

    let aiContent = await callAI()
    let aiParsed = QuizAIResponseSchema.safeParse(JSON.parse(aiContent ?? '{}'))

    if (!aiParsed.success) {
      // Retry once
      aiContent = await callAI()
      aiParsed = QuizAIResponseSchema.safeParse(JSON.parse(aiContent ?? '{}'))
      if (!aiParsed.success) {
        return NextResponse.json({ error: 'AI response parsing failed' }, { status: 502 })
      }
    }

    const { recommendations } = aiParsed.data

    // Ensure user exists in public.users (may not exist if trigger hasn't fired yet)
    await prisma.user.upsert({
      where: { id: user.id },
      create: {
        id: user.id,
        email: user.email!,
        fullName: user.user_metadata?.full_name ?? null,
      },
      update: {},
    })

    const session = await prisma.quizSession.create({
      data: {
        userId: user.id,
        completedAt: new Date(),
        stemScore: scores.STEM,
        creativeScore: scores.Creative,
        businessScore: scores.Business,
        healthcareScore: scores.Healthcare,
        educationScore: scores.Education,
        skilledTradesScore: scores.SkilledTrades,
        publicServiceScore: scores.PublicService,
        answers: {
          createMany: {
            data: answers.map(a => ({
              questionIndex: a.questionIndex,
              selectedOption: a.selectedOption,
              category: a.category,
            })),
          },
        },
        recommendations: {
          createMany: {
            data: recommendations.map(r => ({
              rank: r.rank,
              careerTitle: r.careerTitle,
              description: r.description,
              category: r.category,
              requiredSkills: r.requiredSkills,
              salaryRange: r.salaryRange,
              industryOutlook: r.industryOutlook,
            })),
          },
        },
      },
    })

    return NextResponse.json({
      sessionId: session.id,
      categoryScores: scores,
      recommendations,
    })
  } catch (error) {
    console.error('Quiz submit error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
