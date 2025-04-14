import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Alex Berger',
    default: 'Alex Berger | Portfolio', // This is used when no other title is specified
  },
  description: 'Personal portfolio website of Alex Berger',
  icons: {
    icon: '/favicon.ico',  // Add this line for favicon
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ParticleBackground />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}