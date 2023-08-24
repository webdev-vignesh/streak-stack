import Image from 'next/image'
import { Inter } from 'next/font/google'
import { AiFillGithub } from "react-icons/ai";
import Link from 'next/link';
import Footer from "../components/Footer";
import BackImg from "../../public/bg.jpg";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="p-4" style={{backgroundImage: `url(${BackImg})`}}>
      <nav className='flex justify-between'>
        <div>
          <p>Streak⚡Stack</p>
        </div>
        <div className='flex justify-between items-center space-x-4'>
          <p>Pricing</p>
          <Link href={'https://www.github.com/webdev-vignesh/streak-stack'}><AiFillGithub /></Link>
        </div>
      </nav>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col'>
        <div>
          <p className='text-5xl text-center mb-8'>Streak⚡Stack</p>
          <p className='text-lg text-center'>Build Habits, Stack Success</p>
          <p className='text-lg text-center'> Elevate Your Life with Streak Stack!</p>
        </div>
        <div className='text-center'>
          <button className='mt-4 border border-blue-500 bg-blue-500 p-2 rounded-md text-white'>Get started for free</button>
        </div>
      </div>
      <div className='absolute bottom-0 left-1/2 trasnform -translate-x-1/2 -translate-y-1/2'>
        <Footer />
      </div>
    </main>
  )
}
