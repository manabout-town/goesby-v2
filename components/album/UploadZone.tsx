'use client'

import { useCallback, useState } from 'react'

type Props = {
  sessionId: string
  onUpload: (url: string) => void
}

export default function UploadZone({ sessionId, onUpload }: Props) {
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)

  const upload = useCallback(async (files: FileList) => {
    setUploading(true)
    for (const file of Array.from(files)) {
      const form = new FormData()
      form.append('file', file)
      form.append('sessionId', sessionId)
      const res = await fetch('/api/album/upload', { method: 'POST', body: form })
      if (res.ok) {
        const { url } = await res.json()
        onUpload(url)
      }
    }
    setUploading(false)
  }, [sessionId, onUpload])

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); upload(e.dataTransfer.files) }}
      className={`border-2 border-dashed p-8 text-center transition-colors ${
        dragging ? 'border-[var(--text)] bg-[var(--border)]' : 'border-[var(--border)]'
      }`}
    >
      <p className="text-[13px] text-[var(--text-sub)] mb-3">
        {uploading ? '업로드 중...' : '사진을 드래그하거나 클릭하세요'}
      </p>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => e.target.files && upload(e.target.files)}
        className="text-[12px] text-[var(--text-sub)]"
      />
    </div>
  )
}
