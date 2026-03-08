import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'GoodMatter — Private Investment Community',
  description: 'GoodMatter is a private investment community connecting accredited investors with curated deal flow, impact-driven founders, and exclusive co-investment opportunities.',
  keywords: ['private investment', 'deal flow', 'accredited investors', 'impact investing', 'startup funding'],
  openGraph: {
    title: 'GoodMatter — Private Investment Community',
    description: 'Good Deals. Good People. Good Matter.',
    type: 'website',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://goodmatter.com',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://goodmatter.com'}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'GoodMatter — Private Investment Community',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
