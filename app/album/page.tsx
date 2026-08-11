import CodeForm from '@/components/album/CodeForm'

export const metadata = {
  title: 'ALBUM — GOESBY',
  description: '앨범 레이아웃 미리보기',
}

export default function AlbumPage() {
  return (
    <section className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-6">
      <h1 className="font-[family-name:var(--font-bodoni)] text-3xl tracking-wide mb-12">
        ALBUM
      </h1>
      <CodeForm />
    </section>
  )
}
