import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import "./globals.css";
import GoogleAnalytics from './components/analytics/GoogleAnalytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Crypto Sensor',
  description: 'Real-time crypto market sentiment analysis',
  
  applicationName: 'Crypto Sensor',
  authors: [{ name: 'Ilyomix', url: 'https://github.com/Ilyomix' }],
  
  keywords: [
    'crypto',
    'cryptocurrency',
    'bitcoin',
    'ethereum',
    'market sentiment',
    'crypto analysis',
    'crypto metrics',
    'real-time crypto',
    'crypto dashboard'
  ],
  
  creator: 'Ilyomix',
  publisher: 'Ilyomix',
  
  openGraph: {
    type: 'website',
    title: 'Crypto Sensor',
    description: 'Real-time crypto market sentiment analysis',
    siteName: 'Crypto Sensor',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Sensor',
    description: 'Real-time crypto market sentiment analysis',
    creator: '@Ilyomix',
  },
  
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
