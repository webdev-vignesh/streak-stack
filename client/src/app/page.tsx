import Image from "next/image"
import { Inter } from "next/font/google"
import { AiFillGithub } from "react-icons/ai";
import Link from "next/link";
import Footer from "../components/footer";
import BackImg from "../../public/bg.jpg";

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  return (
    <main className="p-4 bg-gradient-to-r from-blue-800 to-indigo-900" style={{backgroundImage: `url(${BackImg})`}}>
      <nav className="flex justify-between">
        <div>
          <p>Streak⚡Stack</p>
        </div>
        <div className="flex justify-between items-center space-x-4">
          <button>Pricing</button>
          <a href={"https://www.github.com/webdev-vignesh/streak-stack"} target="_blank"><AiFillGithub /></a>
        </div>
      </nav>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col">
        <div>
          <p className="text-5xl text-center font-bold">Build Habits</p>
          <p className="text-5xl text-center mb-8 font-bold text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-red-600">Stack Success!</p>
          <p className="text-lg text-center">Discover your path to success with Streak Stack - the ultimate habit tracking app.</p>
          <p className="text-lg text-center">Transform your life one streak at a time!</p>
        </div>
        <div className="mt-20 text-center">
          <Link href={"/dashboard"} className="border border-green-500 bg-green-500 p-2 rounded-md text-white">Get started for free</Link>
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 trasnform -translate-x-1/2 -translate-y-1/2">
        <Footer />
      </div>
    </main>
  )
}
