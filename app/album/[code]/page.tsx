export default async function AlbumWorkspace({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24">
      <p className="text-[14px] text-[var(--text-sub)]">앨범 워크스페이스: {code}</p>
    </section>
  )
}
