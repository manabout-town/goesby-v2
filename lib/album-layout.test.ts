import { describe, it, expect } from 'vitest'
import { layoutPhotos, type AlbumPage } from './album-layout'

describe('layoutPhotos', () => {
  it('returns empty pages for no photos', () => {
    const pages = layoutPhotos([], 'main')
    expect(pages).toEqual([])
  })

  it('uses full template when photos < usable pages', () => {
    const photos = Array.from({ length: 10 }, (_, i) => `photo-${i}.jpg`)
    const pages = layoutPhotos(photos, 'main')
    expect(pages.length).toBe(10)
    expect(pages.every((p) => p.template === 'full')).toBe(true)
  })

  it('mixes templates when photos > usable pages', () => {
    const photos = Array.from({ length: 120 }, (_, i) => `photo-${i}.jpg`)
    const pages = layoutPhotos(photos, 'main') // 90 usable pages
    expect(pages.length).toBeLessThanOrEqual(90)
    const totalPhotos = pages.reduce((sum, p) => sum + p.photos.length, 0)
    expect(totalPhotos).toBe(120)
  })

  it('respects sub album page count', () => {
    const photos = Array.from({ length: 100 }, (_, i) => `photo-${i}.jpg`)
    const pages = layoutPhotos(photos, 'sub') // 80 usable pages
    expect(pages.length).toBeLessThanOrEqual(80)
    const totalPhotos = pages.reduce((sum, p) => sum + p.photos.length, 0)
    expect(totalPhotos).toBe(100)
  })

  it('preserves photo order', () => {
    const photos = ['a.jpg', 'b.jpg', 'c.jpg']
    const pages = layoutPhotos(photos, 'main')
    const flat = pages.flatMap((p) => p.photos)
    expect(flat).toEqual(photos)
  })
})
