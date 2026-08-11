import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File
  const sessionId = formData.get('sessionId') as string

  if (!file || !sessionId) {
    return NextResponse.json({ error: 'Missing file or sessionId' }, { status: 400 })
  }

  const ext = file.name.split('.').pop()
  const path = `${sessionId}/${Date.now()}.${ext}`

  const { error } = await supabase.storage
    .from('album-uploads')
    .upload(path, file, { contentType: file.type })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const { data: urlData } = supabase.storage
    .from('album-uploads')
    .getPublicUrl(path)

  return NextResponse.json({ url: urlData.publicUrl })
}
