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

    const roadmap = await prisma.roadmap.findFirst({
      where: { id, userId: user.id },
      include: { phases: { orderBy: { phaseNumber: 'asc' } } },
    })

    if (!roadmap) {
      return NextResponse.json({ error: 'Roadmap not found' }, { status: 404 })
    }

    return NextResponse.json(roadmap)
  } catch (error) {
    console.error('Roadmap fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
