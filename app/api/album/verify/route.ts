import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { code } = await req.json()

  if (!code || typeof code !== 'string') {
    return NextResponse.json({ valid: false }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('album_sessions')
    .select('id, code, bride_name, album_type')
    .eq('code', code.trim().toUpperCase())
    .single()

  if (error || !data) {
    return NextResponse.json({ valid: false }, { status: 404 })
  }

  return NextResponse.json({ valid: true, session: data })
}
