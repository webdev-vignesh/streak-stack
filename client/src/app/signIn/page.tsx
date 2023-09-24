'use client';

import GoogleLogo from "@/./../public/google-logo.png";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SignInBtn from "@/components/signInBtn";
import Link from "next/link";
import { useState } from "react";

const SignIn = () => {

    const { status } = useSession();
    const router: any = useRouter();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        console.log('handling submit');

        signIn('credentials', {email, password, redirect: true, callbackUrl: "/dashboard"})

        // try {
        //     console.log('entering try block');
        //     const res = await signIn("credentials", {
        //         email, password, redirect: false,   
        //     });
        //     console.log(res)
        //     if(res?.ok == true) {
        //         console.log(res);
        //         setMessage("Invalid credentials");
        //         return;
        //     }
        //     router.replace('dashboard');
        // } catch (error) {
        //     console.log(error);
        // }

    }

    return(
        <div className='bg-blue-500 flex justify-center items-center h-screen'>
        <div className='absolute top-1/4 md:relative md:top-0 flex flex-col justify-center items-center p-6 bg-white rounded-md shadow-md w-72'>
            <p className='text-2xl font-semibold'>Welcome back!</p>
            <form onSubmit={handleSubmit} className='flex flex-col space-y-4 mt-4 '>
                <input 
                    type='text' 
                    placeholder='Email' 
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    className='p-3 bg-gray-100 placeholder:text-gray-400 rounded-md focus:outline-blue-500 focus:bg-white' 
                />
                <input 
                    type='password' 
                    placeholder='Password' 
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    className='p-3 bg-gray-100 placeholder:text-gray-400 rounded-md focus:outline-blue-500 focus:bg-white' 
                />
                <button 
                    type='submit'
                    disabled={!email || !password}  
                    className='bg-blue-500 rounded-md text-white p-2'
                >
                    Sign In
                </button>
            </form>
            <div className="h-2 mt-1">
                {   message 
                    &&
                    <div className={` text-xs font-semibold`}>
                        {message}
                    </div> 
                }
            </div>
            <div className='flex items-center justify-center my-2'>
                <p className='text-gray-500'>OR</p>
            </div>
            <div className="mt-1">
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
