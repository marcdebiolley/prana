import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Portée de Prana — Chiots Border Collie',
  description: 'Portée imminente de Prana, Border Collie brun de 6 ans. Découvrez les parents et soumettez votre candidature d\'adoption.',
  openGraph: {
    title: 'Portée de Prana — Chiots Border Collie',
    description: 'Portée imminente de Prana, Border Collie brun de 6 ans.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Prana, Border Collie brun — Portée Printemps 2026' }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
