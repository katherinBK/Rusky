import type { Metadata } from 'next'
import { Nunito, Nunito_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const nunito = Nunito({ subsets: ["latin", "cyrillic"] });
const nunitoSans = Nunito_Sans({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: 'Rusky - Learn Russian with AI',
  description: 'Master Russian through AI-powered conversations, grammar exercises, and engaging stories. Your friendly Husky companion guides your learning journey.',
  keywords: ['Russian', 'language learning', 'AI tutor', 'grammar', 'vocabulary', 'stories'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
