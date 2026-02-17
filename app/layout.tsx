import type { Metadata, Viewport } from 'next'
import { Quicksand, Dancing_Script } from 'next/font/google'

import './globals.css'

const _quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
})
const _dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
})

export const metadata: Metadata = {
  title: 'Love Taps - Shared Task Manager for Couples',
  description: 'A romantic shared task manager to keep love organized and fun.',
  icons: {
    icon: '/favicon.jpg',
  },
}

export const viewport: Viewport = {
  themeColor: '#db2777',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${_quicksand.variable} ${_dancingScript.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
