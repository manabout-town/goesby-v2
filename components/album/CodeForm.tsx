'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CodeForm() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!code.trim()) return
    setLoading(true)
    setError('')

    const res = await fetch('/api/album/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: code.trim() }),
    })

    if (res.ok) {
      router.push(`/album/${code.trim().toUpperCase()}`)
    } else {
      setError('유효하지 않은 코드입니다')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
      <label className="block text-[11px] uppercase tracking-[0.1em] text-[var(--text-sub)] mb-3">
        접근 코드
      </label>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="코드를 입력하세요"
        className="w-full border border-[var(--border)] bg-[var(--ground)] px-4 py-3 text-[14px] text-[var(--text)] placeholder:text-[var(--text-sub)] outline-none focus:border-[var(--text-sub)] transition-colors"
        autoFocus
      />
      {error && <p className="text-[12px] text-red-600 mt-2">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="mt-4 w-full bg-[var(--text)] text-[var(--ground)] py-3 text-[11px] uppercase tracking-[0.1em] hover:opacity-80 transition-opacity disabled:opacity-50"
      >
        {loading ? '확인 중...' : '확인'}
      </button>
    </form>
  )
}
