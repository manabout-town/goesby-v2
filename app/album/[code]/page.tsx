import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import AlbumWorkspaceClient from './client'

export default async function AlbumWorkspace({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params

  const { data: session } = await supabase
    .from('album_sessions')
    .select('id, code, bride_name, album_type')
    .eq('code', code.toUpperCase())
    .single()

  if (!session) redirect('/album')

  return <AlbumWorkspaceClient session={session} />
}
