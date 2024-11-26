import type { Metadata } from "next";
import "./globals.css";


// app/layout.tsx

export const metadata: Metadata = {
  title: 'Crypto Sensor | Real-time Cryptocurrency Market Analytics',
  description: 'A comprehensive dashboard for monitoring cryptocurrency market indicators, trends, and metrics in real-time. Built with Next.js and TypeScript.',
  
  openGraph: {
    type: 'website',
    url: 'https://cryptosensor.netlify.app/',
    title: 'Crypto Sensor',
    description: 'Monitor cryptocurrency market indicators, trends, and metrics in real-time',
    siteName: 'Crypto Sensor',
    images: [
      {
        url: 'https://i.ibb.co/W0WHYjj/Capture-d-cran-2024-11-27-000645.png', // Add your OG image path here
        width: 1200,
        height: 630,
        alt: 'Crypto Sensor Dashboard Preview',
      }
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Sensor',
    description: 'Real-time cryptocurrency market analytics dashboard',
    images: ['https://i.ibb.co/W0WHYjj/Capture-d-cran-2024-11-27-000645.png'], // Same image as OG
    creator: '@ilyesabd', // Add your Twitter handle
  },
  
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#000000',
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

