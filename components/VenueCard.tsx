import Link from 'next/link'
import Image from 'next/image'
import type { Venue } from '@/lib/venues'

export default function VenueCard({ venue }: { venue: Venue }) {
  return (
    <Link href={`/venues/${venue.slug}`} className="group block">
      <div className="overflow-hidden aspect-[3/4] bg-[var(--border)] relative">
        <Image
          src={venue.cover}
          alt={`${venue.nameKo} 웨딩 포트폴리오`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <div className="mt-4">
        <p className="text-[13px] font-[family-name:var(--font-inter)] uppercase tracking-[0.1em]">{venue.name}</p>
        <p className="text-[12px] text-[var(--text-sub)] mt-1">{venue.nameKo}</p>
      </div>
    </Link>
  )
}
