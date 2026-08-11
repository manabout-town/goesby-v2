import Image from 'next/image'
import { venues } from '@/lib/venues'
import VenueCard from '@/components/VenueCard'
import FadeIn from '@/components/FadeIn'

export default function Home() {
  const heroVenue = venues[0]

  return (
    <>
      {/* Hero */}
      <section className="relative w-full h-[80vh] min-h-[500px]">
        <Image
          src={heroVenue.cover}
          alt="GOESBY 웨딩 포트폴리오"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </section>

      {/* Venue Grid */}
      <section className="mx-auto max-w-[1200px] px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {venues.map((venue) => (
            <FadeIn key={venue.slug}>
              <VenueCard venue={venue} />
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  )
}
