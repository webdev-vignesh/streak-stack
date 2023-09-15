import Header from '@/components/header'
import './globals.css'
import { NextAuthProvider } from './Providers'

export const metadata = {
  title: 'Streak⚡Stack',
  description: 'Habit tracking application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='bg-gradient-to-r from-blue-800 to-indigo-900'>
      <body>
          <NextAuthProvider>          
            <div>
              <Header/>
              {children}
            </div>
          </NextAuthProvider>
        </body>
    </html>
  )
}
