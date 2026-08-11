export type TemplateType = 'full' | 'split' | 'one-two' | 'grid'

export type AlbumPage = {
  template: TemplateType
  photos: string[]
}

const USABLE_PAGES = { main: 90, sub: 80 } as const

export function layoutPhotos(photos: string[], albumType: 'main' | 'sub'): AlbumPage[] {
  if (photos.length === 0) return []

  const maxPages = USABLE_PAGES[albumType]
  const pages: AlbumPage[] = []
  let i = 0

  while (i < photos.length && pages.length < maxPages) {
    const remaining = photos.length - i
    const pagesLeft = maxPages - pages.length
    const ratio = remaining / pagesLeft

    if (ratio <= 1.2) {
      pages.push({ template: 'full', photos: [photos[i]] })
      i += 1
    } else if (ratio <= 2.2) {
      const count = Math.min(2, remaining)
      pages.push({ template: 'split', photos: photos.slice(i, i + count) })
      i += count
    } else if (ratio <= 3.2) {
      const count = Math.min(3, remaining)
      pages.push({ template: 'one-two', photos: photos.slice(i, i + count) })
      i += count
    } else {
      const count = Math.min(4, remaining)
      pages.push({ template: 'grid', photos: photos.slice(i, i + count) })
      i += count
    }
  }

  return pages
}
