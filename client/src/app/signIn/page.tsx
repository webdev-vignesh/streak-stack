'use client';

import GoogleLogo from "@/./../public/google-logo.png";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SignInBtn from "@/components/signInBtn";
import Link from "next/link";

const SignIn = () => {

    const { status } = useSession();
    const router: any = useRouter();

    return(
        <div className='bg-blue-500 flex justify-center items-center h-screen'>
        <div className='absolute top-1/4 md:relative md:top-0 flex flex-col justify-center items-center p-6 bg-white rounded-md shadow-md'>
            <p className='text-2xl font-semibold'>Welcome back!</p>
            <div className='flex flex-col space-y-4 mt-4 '>
                <input type='text' className='p-3 bg-gray-100 placeholder:text-gray-400 rounded-md focus:outline-blue-500 focus:bg-white' placeholder='Email' />
                <input type='text' className='p-3 bg-gray-100 placeholder:text-gray-400 rounded-md focus:outline-blue-500 focus:bg-white' placeholder='Password' />
                <button type='submit' className='bg-blue-500 rounded-md text-white p-2'>Sign In</button>
            </div>
            <div className='flex items-center justify-center my-2'>
                <p className='text-gray-500'>OR</p>
            </div>
            <div>
                <SignInBtn />
            </div>
            <div className='flex mt-3 text-sm font-medium'>
                <p>{"Don't have an account? \u00A0"}</p>
                <Link href={'/signUp'} className='underline text-orange-500'>Sign Up</Link>
            </div>
        </div>
    </div>
    )
}

export default SignIn;
