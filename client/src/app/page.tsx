'use client';

import { Inter } from "next/font/google"
import { AiFillGithub } from "react-icons/ai";
import Link from "next/link";
import Footer from "../components/footer";
import BackImg from "../../public/bg.jpg";
import SignInBtn from "@/components/signInBtn";
import SignModal from "@/components/signInModal";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] })

export default function Home() {

  // nextjs router
  const router = useRouter();

  // local state
  const [showModal, setShowModal] = useState(false);

  // nextAuth session status
  const {status} = useSession();

  // if already logged in, redirecting the user to dashboard
  if (status === 'authenticated') {
    router.push('/dashboard');
  }

  return (
    <main className="p-4 bg-gradient-to-r from-blue-800 to-indigo-900" style={{backgroundImage: `url(${BackImg})`}}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col">
        <div>
          <p className="text-5xl text-center font-bold">Build Habits</p>
          <p className="text-5xl text-center mb-8 font-bold text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-red-600">Stack Success!</p>
          <p className="text-lg text-center">Discover your path to success with Streak Stack - the ultimate habit tracking app.</p>
          <p className="text-lg text-center">Transform your life one streak at a time!</p>
        </div>
        <div className="mt-20 flex justify-center text-center">
          <div onClick={() => setShowModal(true)} className=" cursor-pointer border border-green-500 bg-green-500 w-1/4 p-2 rounded-md text-white">Get started for free</div>
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 trasnform -translate-x-1/2 -translate-y-1/2">
        <Footer />
      </div>
      {showModal && <SignModal showModal={showModal} setShowModal={setShowModal} />}
    </main>
  )
}
