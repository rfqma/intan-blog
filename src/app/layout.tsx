import './globals.css'
import type { Metadata } from 'next'
import NextAuthProvider from '@/lib/providers/next-auth-provider'
import NextThemesProvider from '@/lib/providers/next-themes-provider'
import GlobalState from '@/lib/contexts'
import { Header } from '@/components/Layout/Header'

export const metadata: Metadata = {
  title: 'Our Blog',
  description: 'Our Blog Web App!',
  icons: {
    icon: '/icon.ico'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='dark:bg-black'>
        <NextThemesProvider>
          <NextAuthProvider>
            <GlobalState>
              <Header />
              {children}
            </GlobalState>
          </NextAuthProvider>
        </NextThemesProvider>
      </body>
    </html>
  )
}
