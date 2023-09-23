'use client';

import { Inter } from "next/font/google"
import { AiFillGithub } from "react-icons/ai";
import Link from "next/link";
import Footer from "../components/footer";
import SignInBtn from "@/components/signInBtn";
import SignModal from "@/components/signInModal";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LandingPageImage from "@/../public/landingImage.svg";

const inter = Inter({ subsets: ["latin"] })

export default function Home() {

  // nextjs router
  const router = useRouter();

  // local state
  // const [showModal, setShowModal] = useState(false);

  // nextAuth session status
  const {status} = useSession();

  // if already logged in, redirecting the user to dashboard
  if (status === 'authenticated') {
    router.push('/dashboard');
  }

  return (
    <div >
      <div className="flex flex-col items-center md:h-full bg-white dark:bg-gray-800">
        <div className="mt-16 md:mt-0 md:h-1/2 md:w-1/2 dark:bg-inherit">
          <Image src={LandingPageImage} alt="landing_image" />
        </div>
        <div className="mt-16 md:mt-0 font-semibold">
          <p className="text-5xl text-center font-bold">Build Habits</p>
          <p className="text-5xl text-center mb-2 font-bold text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-red-600 ">Stack Success!</p>
          <p className="text-lg font-medium p-2 md:p-0 md:font-semibold text-center mt-10 md:mt-0 break-words md:break-normal">Find success with Streak Stack, your ultimate habit tracker.</p>
          <p className="text-lg font-medium p-2 md:p-0 md:font-semibold text-center">Transform your life one streak at a time!</p>
        </div>
        {/* <div className="mt-20 flex justify-center text-center">
          <div onClick={() => setShowModal(true)} className=" cursor-pointer border border-green-500 bg-green-500 w-1/4 p-2 rounded-md text-white">Get started for free</div>
        </div> */}
      </div>
      {/* {showModal && <SignModal showModal={showModal} setShowModal={setShowModal} />} */}
    </div>
  )
}
