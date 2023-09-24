import Header from '@/components/header'
import './globals.css'
import { NextAuthProvider } from './Providers'
import Footer from '@/components/footer'
import Script from 'next/script'

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
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
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
