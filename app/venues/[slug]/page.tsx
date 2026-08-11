import { notFound } from 'next/navigation'
import Link from 'next/link'
import { venues, getVenue, getNextVenue } from '@/lib/venues'
import Masonry from '@/components/Masonry'

export function generateStaticParams() {
  return venues.map((v) => ({ slug: v.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const venue = getVenue(slug)
  if (!venue) return {}
  return {
    title: `${venue.name} — GOESBY`,
    description: `${venue.nameKo} 호텔 웨딩 본식스냅 포트폴리오`,
  }
}

export default async function VenuePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const venue = getVenue(slug)
  if (!venue) notFound()

  const next = getNextVenue(slug)

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24">
      {/* Header */}
      <div className="mb-16 text-center">
        <h1 className="text-[28px] font-[family-name:var(--font-inter)] uppercase tracking-[0.15em]">
          {venue.name}
        </h1>
        <p className="text-[14px] text-[var(--text-sub)] mt-2">{venue.nameKo}</p>
      </div>

      {/* Masonry */}
      <Masonry photos={venue.photos} />

      {/* Next venue */}
      <div className="mt-24 text-center">
        <p className="text-[11px] font-[family-name:var(--font-inter)] uppercase tracking-[0.1em] text-[var(--text-sub)] mb-2">Next</p>
        <Link
          href={`/venues/${next.slug}`}
          className="text-[20px] font-[family-name:var(--font-inter)] uppercase tracking-[0.1em] hover:text-[var(--text-sub)] transition-colors"
        >
          {next.name}
        </Link>
      </div>
    </section>
  )
}
