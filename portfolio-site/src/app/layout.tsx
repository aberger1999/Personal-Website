import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';  // Updated import path

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Alex Berger | Portfolio',
  description: 'Personal portfolio website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}