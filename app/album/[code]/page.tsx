import { supabase } from '@/lib/supabase'
import PhotoPanelDemo from '@/components/album/PhotoPanelDemo'

export default async function AlbumWorkspace({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params

  const { data: session } = await supabase
    .from('album_sessions')
    .select('id')
    .eq('code', code.toUpperCase())
    .single()

  if (!session) {
    return (
      <section className="mx-auto max-w-[1200px] px-6 py-24">
        <p className="text-[14px] text-[var(--text-sub)]">앨범 워크스페이스: {code} (세션을 찾을 수 없습니다)</p>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-12">
      {/* TEMP: Task 7 verification mount. Replace with full workspace layout in later tasks. */}
      <div className="w-[320px] h-[600px] border border-[var(--border)]">
        <PhotoPanelDemo sessionId={session.id} />
      </div>
    </section>
  )
}
