'use client'

import Link from 'next/link'
import { useState } from 'react'

const venues = [
  { slug: 'grand-moment', name: 'GRAND MOMENT' },
  { slug: 'lotte-busan', name: 'LOTTE BUSAN' },
  { slug: 'signiel', name: 'SIGNIEL' },
]

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [venuesOpen, setVenuesOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--ground)]">
      <nav className="mx-auto max-w-[1200px] flex items-center justify-between px-6 h-16">
        {/* Left: Venues */}
        <div className="hidden md:flex items-center gap-8">
          <div className="relative">
            <button
              onClick={() => setVenuesOpen(!venuesOpen)}
              className="text-[11px] font-[family-name:var(--font-inter)] uppercase tracking-[0.1em] text-[var(--text)] hover:text-[var(--text-sub)] transition-colors"
            >
              VENUES
            </button>
            {venuesOpen && (
              <div className="absolute top-full left-0 mt-2 bg-[var(--ground)] border border-[var(--border)] py-2 min-w-[180px]">
                {venues.map((v) => (
                  <Link
                    key={v.slug}
                    href={`/venues/${v.slug}`}
                    onClick={() => setVenuesOpen(false)}
                    className="block px-4 py-2 text-[11px] uppercase tracking-[0.1em] text-[var(--text-sub)] hover:text-[var(--text)] transition-colors"
                  >
                    {v.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center: Logo */}
        <Link href="/" className="font-[family-name:var(--font-bodoni)] text-2xl tracking-wide text-[var(--text)]">
          GOESBY
        </Link>

        {/* Right: Album + Contact */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/album" className="text-[11px] font-[family-name:var(--font-inter)] uppercase tracking-[0.1em] text-[var(--text)] hover:text-[var(--text-sub)] transition-colors">
            ALBUM
          </Link>
          <a href="https://pf.kakao.com/" target="_blank" rel="noopener noreferrer" className="text-[11px] font-[family-name:var(--font-inter)] uppercase tracking-[0.1em] text-[var(--text)] hover:text-[var(--text-sub)] transition-colors">
            CONTACT
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="메뉴"
        >
          <span className={`block w-5 h-px bg-[var(--text)] transition-transform ${menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
          <span className={`block w-5 h-px bg-[var(--text)] transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-[var(--text)] transition-transform ${menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--ground)] px-6 py-6 space-y-4">
          <p className="text-[11px] uppercase tracking-[0.1em] text-[var(--text-sub)]">VENUES</p>
          {venues.map((v) => (
            <Link
              key={v.slug}
              href={`/venues/${v.slug}`}
              onClick={() => setMenuOpen(false)}
              className="block pl-4 text-[13px] text-[var(--text)]"
            >
              {v.name}
            </Link>
          ))}
          <Link href="/album" onClick={() => setMenuOpen(false)} className="block text-[11px] uppercase tracking-[0.1em] text-[var(--text)] pt-2">
            ALBUM
          </Link>
          <a href="https://pf.kakao.com/" target="_blank" rel="noopener noreferrer" className="block text-[11px] uppercase tracking-[0.1em] text-[var(--text)]">
            CONTACT
          </a>
        </div>
      )}
    </header>
  )
}
