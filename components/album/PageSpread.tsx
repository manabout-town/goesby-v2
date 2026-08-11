import Image from 'next/image'
import type { AlbumPage } from '@/lib/album-layout'

export default function PageSpread({ page }: { page: AlbumPage }) {
  const { template, photos } = page

  if (template === 'full') {
    return (
      <div className="relative w-full aspect-[3/4]">
        <Image src={photos[0]} alt="" fill sizes="400px" className="object-cover" />
      </div>
    )
  }

  if (template === 'split') {
    return (
      <div className="grid grid-cols-2 gap-px w-full aspect-[3/4]">
        {photos.map((src) => (
          <div key={src} className="relative">
            <Image src={src} alt="" fill sizes="200px" className="object-cover" />
          </div>
        ))}
      </div>
    )
  }

  if (template === 'one-two') {
    return (
      <div className="grid grid-rows-2 gap-px w-full aspect-[3/4]">
        <div className="relative">
          <Image src={photos[0]} alt="" fill sizes="400px" className="object-cover" />
        </div>
        <div className="grid grid-cols-2 gap-px">
          {photos.slice(1).map((src) => (
            <div key={src} className="relative">
              <Image src={src} alt="" fill sizes="200px" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // grid (4 photos)
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-px w-full aspect-[3/4]">
      {photos.map((src) => (
        <div key={src} className="relative">
          <Image src={src} alt="" fill sizes="200px" className="object-cover" />
        </div>
      ))}
    </div>
  )
}
