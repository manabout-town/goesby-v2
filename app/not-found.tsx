import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-6">
      <h1 className="font-[family-name:var(--font-bodoni)] text-4xl tracking-wide mb-4">404</h1>
      <p className="text-[14px] text-[var(--text-sub)] mb-8">페이지를 찾을 수 없습니다</p>
      <Link href="/" className="text-[11px] uppercase tracking-[0.1em] border-b border-[var(--text)] pb-1">
        홈으로
      </Link>
    </section>
  )
}
