import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const session = await prisma.quizSession.findFirst({
      where: { id, userId: user.id },
      include: { recommendations: { orderBy: { rank: 'asc' } } },
    })

    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    return NextResponse.json({
      sessionId: session.id,
      completedAt: session.completedAt,
      categoryScores: {
        stem: session.stemScore,
        creative: session.creativeScore,
        business: session.businessScore,
        healthcare: session.healthcareScore,
        education: session.educationScore,
        skilledTrades: session.skilledTradesScore,
        publicService: session.publicServiceScore,
      },
      recommendations: session.recommendations,
    })
  } catch (error) {
    console.error('Quiz results error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
