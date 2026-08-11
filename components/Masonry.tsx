import Image from 'next/image'
import FadeIn from '@/components/FadeIn'

export default function Masonry({ photos }: { photos: string[] }) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-1">
      {photos.map((src, i) => (
        <FadeIn key={src} className="mb-1 break-inside-avoid">
          <Image
            src={src}
            alt={`사진 ${i + 1}`}
            width={800}
            height={1200}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="w-full h-auto"
          />
        </FadeIn>
      ))}
    </div>
  )
}
