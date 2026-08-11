'use client'

import Image from 'next/image'

type Props = {
  photos: string[]
  selected: Set<string>
  onToggle: (url: string) => void
}

export default function GalleryGrid({ photos, selected, onToggle }: Props) {
  if (photos.length === 0) {
    return <p className="text-[13px] text-[var(--text-sub)] py-8 text-center">갤러리가 비어 있습니다</p>
  }

  return (
    <div className="grid grid-cols-3 gap-1">
      {photos.map((url) => (
        <button
          key={url}
          onClick={() => onToggle(url)}
          className={`relative aspect-square overflow-hidden ${
            selected.has(url) ? 'ring-2 ring-[var(--text)]' : ''
          }`}
        >
          <Image src={url} alt="" fill sizes="120px" className="object-cover" />
          {selected.has(url) && (
            <div className="absolute inset-0 bg-[var(--text)]/20 flex items-center justify-center">
              <span className="w-5 h-5 bg-[var(--text)] text-[var(--ground)] text-[11px] flex items-center justify-center">✓</span>
            </div>
          )}
        </button>
      ))}
    </div>
  )
}
