'use client'

import { useState, useMemo, useEffect } from 'react'
import { layoutPhotos } from '@/lib/album-layout'
import PageSpread from './PageSpread'

type Props = {
  photos: string[]
  albumType: 'main' | 'sub'
  onAlbumTypeChange: (type: 'main' | 'sub') => void
}

export default function AlbumPreview({ photos, albumType, onAlbumTypeChange }: Props) {
  const [currentPage, setCurrentPage] = useState(0)

  const pages = useMemo(() => layoutPhotos(photos, albumType), [photos, albumType])

  useEffect(() => {
    const maxSpread = Math.ceil(pages.length / 2) - 1
    if (currentPage > maxSpread && maxSpread >= 0) {
      setCurrentPage(maxSpread)
    }
  }, [pages.length, currentPage])

  const spreadCount = Math.ceil(pages.length / 2)
  const leftPage = pages[currentPage * 2]
  const rightPage = pages[currentPage * 2 + 1]

  return (
    <div className="flex flex-col h-full">
      {/* Album type toggle */}
      <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
        <div className="flex gap-4">
          <button
            onClick={() => { onAlbumTypeChange('main'); setCurrentPage(0) }}
            className={`text-[11px] font-[family-name:var(--font-inter)] uppercase tracking-[0.1em] ${albumType === 'main' ? 'text-[var(--text)]' : 'text-[var(--text-sub)]'}`}
          >
            메인 (94p)
          </button>
          <button
            onClick={() => { onAlbumTypeChange('sub'); setCurrentPage(0) }}
            className={`text-[11px] font-[family-name:var(--font-inter)] uppercase tracking-[0.1em] ${albumType === 'sub' ? 'text-[var(--text)]' : 'text-[var(--text-sub)]'}`}
          >
            서브 (84p)
          </button>
        </div>
        <p className="text-[11px] text-[var(--text-sub)]">
          {photos.length}장 · {pages.length}페이지
        </p>
      </div>

      {/* Book spread */}
      <div className="flex-1 flex items-center justify-center p-6 bg-[var(--border)]/30">
        {pages.length === 0 ? (
          <p className="text-[13px] text-[var(--text-sub)]">사진을 선택하세요</p>
        ) : (
          <div className="flex gap-1 max-w-[700px] w-full">
            <div className="flex-1 bg-[var(--ground)] shadow-sm">
              {leftPage ? <PageSpread page={leftPage} /> : <div className="aspect-[3/4]" />}
            </div>
            <div className="flex-1 bg-[var(--ground)] shadow-sm">
              {rightPage ? <PageSpread page={rightPage} /> : <div className="aspect-[3/4]" />}
            </div>
          </div>
        )}
      </div>

      {/* Page navigation */}
      {spreadCount > 0 && (
        <div className="flex items-center justify-center gap-4 border-t border-[var(--border)] py-3">
          <button
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className="text-[12px] text-[var(--text-sub)] disabled:opacity-30"
          >
            ← 이전
          </button>
          <span className="text-[11px] text-[var(--text-sub)]">
            {currentPage + 1} / {spreadCount}
          </span>
          <button
            onClick={() => setCurrentPage(Math.min(spreadCount - 1, currentPage + 1))}
            disabled={currentPage >= spreadCount - 1}
            className="text-[12px] text-[var(--text-sub)] disabled:opacity-30"
          >
            다음 →
          </button>
        </div>
      )}
    </div>
  )
}
