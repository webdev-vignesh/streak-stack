import Header from '@/components/header'
import './globals.css'
import { NextAuthProvider } from './Providers'
import Footer from '@/components/footer'

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
    <html lang="en" className=''>
      <body>
          <NextAuthProvider>          
            <div>
              <Header/>
              {children}
              <Footer />
            </div>
          </NextAuthProvider>
        </body>
    </html>
  )
}
