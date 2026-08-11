'use client'

import { useState, useCallback } from 'react'
import PhotoPanel from '@/components/album/PhotoPanel'
import AlbumPreview from '@/components/album/AlbumPreview'

type Session = {
  id: string
  code: string
  bride_name: string
  album_type: 'main' | 'sub'
}

export default function AlbumWorkspaceClient({ session }: { session: Session }) {
  const [selected, setSelected] = useState<string[]>([])
  const [albumType, setAlbumType] = useState<'main' | 'sub'>(session.album_type)

  const handleSelectedChange = useCallback((urls: string[]) => {
    setSelected(urls)
  }, [])

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col md:flex-row">
      {/* Left: Photo source */}
      <div className="w-full md:w-[360px] border-r border-[var(--border)] flex-shrink-0">
        <div className="px-4 py-3 border-b border-[var(--border)]">
          <p className="text-[13px]">{session.bride_name}</p>
          <p className="text-[11px] text-[var(--text-sub)]">{session.code}</p>
        </div>
        <PhotoPanel
          sessionId={session.id}
          selected={selected}
          onSelectedChange={handleSelectedChange}
        />
      </div>

      {/* Right: Album preview */}
      <div className="flex-1 min-w-0">
        <AlbumPreview
          photos={selected}
          albumType={albumType}
          onAlbumTypeChange={setAlbumType}
        />
      </div>
    </div>
  )
}
