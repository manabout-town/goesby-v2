'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import GalleryGrid from './GalleryGrid'
import UploadZone from './UploadZone'

type Props = {
  sessionId: string
  selected: string[]
  onSelectedChange: (urls: string[]) => void
}

export default function PhotoPanel({ sessionId, selected, onSelectedChange }: Props) {
  const [tab, setTab] = useState<'gallery' | 'upload'>('gallery')
  const [galleryPhotos, setGalleryPhotos] = useState<string[]>([])
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([])
  const selectedSet = new Set(selected)

  useEffect(() => {
    async function loadGallery() {
      const { data } = await supabase.storage
        .from('album-gallery')
        .list(sessionId, { limit: 200 })
      if (data) {
        const urls = data
          .filter((f) => f.name !== '.emptyFolderPlaceholder')
          .map((f) => supabase.storage.from('album-gallery').getPublicUrl(`${sessionId}/${f.name}`).data.publicUrl)
        setGalleryPhotos(urls)
      }
    }
    loadGallery()
  }, [sessionId])

  const toggle = useCallback((url: string) => {
    const next = selectedSet.has(url)
      ? selected.filter((u) => u !== url)
      : [...selected, url]
    onSelectedChange(next)
  }, [selected, selectedSet, onSelectedChange])

  const handleUpload = useCallback((url: string) => {
    setUploadedPhotos((prev) => [...prev, url])
  }, [])

  const allPhotos = tab === 'gallery' ? galleryPhotos : uploadedPhotos

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex border-b border-[var(--border)]">
        <button
          onClick={() => setTab('gallery')}
          className={`flex-1 py-3 text-[11px] font-[family-name:var(--font-inter)] uppercase tracking-[0.1em] transition-colors ${
            tab === 'gallery' ? 'text-[var(--text)] border-b-2 border-[var(--text)]' : 'text-[var(--text-sub)]'
          }`}
        >
          작가 갤러리
        </button>
        <button
          onClick={() => setTab('upload')}
          className={`flex-1 py-3 text-[11px] font-[family-name:var(--font-inter)] uppercase tracking-[0.1em] transition-colors ${
            tab === 'upload' ? 'text-[var(--text)] border-b-2 border-[var(--text)]' : 'text-[var(--text-sub)]'
          }`}
        >
          내 사진 업로드
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3">
        {tab === 'upload' && (
          <div className="mb-4">
            <UploadZone sessionId={sessionId} onUpload={handleUpload} />
          </div>
        )}
        <GalleryGrid photos={allPhotos} selected={selectedSet} onToggle={toggle} />
      </div>

      {/* Selection count */}
      <div className="border-t border-[var(--border)] px-3 py-2">
        <p className="text-[11px] text-[var(--text-sub)]">
          {selected.length}장 선택됨
        </p>
      </div>
    </div>
  )
}
