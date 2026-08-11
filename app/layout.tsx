import type { Metadata } from 'next'
import { Bodoni_Moda, Inter } from 'next/font/google'
import './globals.css'

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-bodoni',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'GOESBY — Hotel Wedding Photography',
  description: '호텔 웨딩 본식스냅 포트폴리오',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${bodoni.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
