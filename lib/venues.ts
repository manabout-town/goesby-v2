export type Venue = {
  slug: string
  name: string
  nameKo: string
  cover: string
  photos: string[]
}

export const venues: Venue[] = [
  {
    slug: 'grand-moment',
    name: 'GRAND MOMENT',
    nameKo: '그랜드모먼트',
    cover: '/photos/grand-moment/cover.jpg',
    photos: Array.from({ length: 49 }, (_, i) => `/photos/grand-moment/${String(i + 1).padStart(3, '0')}.jpg`),
  },
  {
    slug: 'lotte-busan',
    name: 'LOTTE BUSAN',
    nameKo: '부산롯데호텔',
    cover: '/photos/lotte-busan/cover.jpg',
    photos: Array.from({ length: 48 }, (_, i) => `/photos/lotte-busan/${String(i + 1).padStart(3, '0')}.jpg`),
  },
  {
    slug: 'signiel',
    name: 'SIGNIEL',
    nameKo: '시그니엘',
    cover: '/photos/signiel/cover.jpg',
    photos: Array.from({ length: 37 }, (_, i) => `/photos/signiel/${String(i + 1).padStart(3, '0')}.jpg`),
  },
]

export function getVenue(slug: string): Venue | undefined {
  return venues.find((v) => v.slug === slug)
}

export function getNextVenue(slug: string): Venue {
  const idx = venues.findIndex((v) => v.slug === slug)
  return venues[(idx + 1) % venues.length]
}
